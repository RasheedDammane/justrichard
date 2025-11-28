#!/bin/bash

echo "🚀 Configuration de JustRichard - Base de Données Indépendante"
echo "=============================================================="
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
DB_NAME="justrichard"
DB_USER="justrichard"
DB_PASSWORD="justrichard123"
DB_HOST="localhost"
DB_PORT="5432"
APP_PORT="3100"

echo "📋 Configuration:"
echo "   Base de données : $DB_NAME"
echo "   Utilisateur     : $DB_USER"
echo "   Host            : $DB_HOST:$DB_PORT"
echo "   Port App        : $APP_PORT"
echo ""

# Vérifier si PostgreSQL est installé
echo "🔍 Vérification de PostgreSQL..."
if ! command -v psql &> /dev/null; then
    echo -e "${RED}❌ PostgreSQL n'est pas installé${NC}"
    echo "   Installez PostgreSQL avec: brew install postgresql"
    exit 1
fi
echo -e "${GREEN}✅ PostgreSQL trouvé${NC}"
echo ""

# Vérifier si PostgreSQL est actif
echo "🔍 Vérification du service PostgreSQL..."
if ! pg_isready -h $DB_HOST -p $DB_PORT &> /dev/null; then
    echo -e "${YELLOW}⚠️  PostgreSQL n'est pas actif${NC}"
    echo "   Démarrage de PostgreSQL..."
    brew services start postgresql@14 || brew services start postgresql
    sleep 2
fi

if pg_isready -h $DB_HOST -p $DB_PORT &> /dev/null; then
    echo -e "${GREEN}✅ PostgreSQL est actif${NC}"
else
    echo -e "${RED}❌ Impossible de démarrer PostgreSQL${NC}"
    exit 1
fi
echo ""

# Créer l'utilisateur et la base de données
echo "🔧 Création de la base de données..."

# Vérifier si la base existe déjà
if psql -U postgres -lqt | cut -d \| -f 1 | grep -qw $DB_NAME; then
    echo -e "${YELLOW}⚠️  La base '$DB_NAME' existe déjà${NC}"
    read -p "   Voulez-vous la supprimer et la recréer? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "   Suppression de la base existante..."
        psql -U postgres -c "DROP DATABASE IF EXISTS $DB_NAME;" 2>/dev/null
        psql -U postgres -c "DROP USER IF EXISTS $DB_USER;" 2>/dev/null
    else
        echo "   Conservation de la base existante"
        echo ""
        echo -e "${GREEN}✅ Base de données déjà configurée${NC}"
        exit 0
    fi
fi

# Créer l'utilisateur
echo "   Création de l'utilisateur $DB_USER..."
psql -U postgres -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';" 2>/dev/null || {
    echo "   Utilisateur existe déjà, mise à jour du mot de passe..."
    psql -U postgres -c "ALTER USER $DB_USER WITH PASSWORD '$DB_PASSWORD';"
}

# Créer la base de données
echo "   Création de la base $DB_NAME..."
psql -U postgres -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;" || {
    echo -e "${RED}❌ Erreur lors de la création de la base${NC}"
    exit 1
}

# Donner les privilèges
echo "   Attribution des privilèges..."
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;"

echo -e "${GREEN}✅ Base de données créée avec succès${NC}"
echo ""

# Créer le fichier .env
echo "📝 Création du fichier .env..."

cat > .env << EOF
# Database (PostgreSQL) - INDÉPENDANT
DATABASE_URL="postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:$APP_PORT"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"

# App
NEXT_PUBLIC_APP_URL="http://localhost:$APP_PORT"
PORT=$APP_PORT

# Stripe (optionnel - à configurer plus tard)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""

# Email (optionnel - à configurer plus tard)
RESEND_API_KEY=""
EMAIL_FROM="noreply@justrichard.com"
EOF

echo -e "${GREEN}✅ Fichier .env créé${NC}"
echo ""

# Mettre à jour package.json pour le port
echo "📝 Mise à jour du port dans package.json..."

# Backup du package.json
cp package.json package.json.backup

# Utiliser node pour modifier le JSON proprement
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.scripts.dev = 'next dev -p $APP_PORT';
pkg.scripts.start = 'next start -p $APP_PORT';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
"

echo -e "${GREEN}✅ Port mis à jour dans package.json${NC}"
echo ""

# Générer le client Prisma
echo "🔧 Génération du client Prisma..."
npm run db:generate

echo -e "${GREEN}✅ Client Prisma généré${NC}"
echo ""

# Appliquer le schéma
echo "🔧 Application du schéma Prisma..."
npm run db:push

echo -e "${GREEN}✅ Schéma appliqué${NC}"
echo ""

# Seeder les données
echo "🌱 Seed des données initiales..."

echo "   → Données CMS..."
npm run db:seed:cms

echo "   → Liens navbar..."
npm run db:update:navbar

echo -e "${GREEN}✅ Données seedées${NC}"
echo ""

# Résumé
echo "=============================================================="
echo -e "${GREEN}🎉 CONFIGURATION TERMINÉE AVEC SUCCÈS !${NC}"
echo "=============================================================="
echo ""
echo "📊 Informations de connexion:"
echo "   Base de données : postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME"
echo "   Application     : http://localhost:$APP_PORT"
echo ""
echo "🚀 Pour démarrer l'application:"
echo "   npm run dev"
echo ""
echo "🔍 Pour ouvrir Prisma Studio:"
echo "   npm run db:studio"
echo ""
echo "📖 Documentation:"
echo "   - MIGRATION_BASE_INDEPENDANTE.md"
echo "   - docs/CONVENTIONS_NOMMAGE.md"
echo ""
