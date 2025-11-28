#!/bin/bash

echo "🚀 Configuration de JustRichard - Base de Données Docker"
echo "========================================================="
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DOCKER_CONTAINER="justlife-db"
DB_NAME="preprod_justrichard"
DB_USER="preprod_justrichard"
DB_PASSWORD="preprod_justrichard123"
DB_HOST="localhost"
DB_PORT="5432"
APP_PORT="3100"

echo "📋 Configuration:"
echo "   Container Docker : $DOCKER_CONTAINER"
echo "   Base de données  : $DB_NAME"
echo "   Utilisateur      : $DB_USER"
echo "   Host             : $DB_HOST:$DB_PORT"
echo "   Port App         : $APP_PORT"
echo ""

# Vérifier si Docker est installé
echo "🔍 Vérification de Docker..."
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker n'est pas installé${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Docker trouvé${NC}"
echo ""

# Vérifier si le container existe et est actif
echo "🔍 Vérification du container PostgreSQL..."
if ! docker ps | grep -q $DOCKER_CONTAINER; then
    echo -e "${RED}❌ Le container '$DOCKER_CONTAINER' n'est pas actif${NC}"
    echo "   Démarrez-le avec: docker start $DOCKER_CONTAINER"
    exit 1
fi
echo -e "${GREEN}✅ Container '$DOCKER_CONTAINER' actif${NC}"
echo ""

# Vérifier si la base existe déjà
echo "🔍 Vérification de la base de données..."
DB_EXISTS=$(docker exec $DOCKER_CONTAINER psql -U justlife -lqt | cut -d \| -f 1 | grep -w $DB_NAME | wc -l)

if [ "$DB_EXISTS" -gt 0 ]; then
    echo -e "${YELLOW}⚠️  La base '$DB_NAME' existe déjà${NC}"
    read -p "   Voulez-vous la supprimer et la recréer? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "   Suppression de la base existante..."
        docker exec $DOCKER_CONTAINER psql -U justlife -c "DROP DATABASE IF EXISTS $DB_NAME;" 2>/dev/null
        docker exec $DOCKER_CONTAINER psql -U justlife -c "DROP USER IF EXISTS $DB_USER;" 2>/dev/null
        echo -e "${GREEN}✅ Base supprimée${NC}"
    else
        echo "   Conservation de la base existante"
        echo ""
        echo -e "${BLUE}ℹ️  Passage à la configuration de l'application...${NC}"
        echo ""
    fi
else
    echo -e "${BLUE}ℹ️  La base '$DB_NAME' n'existe pas, création...${NC}"
fi

# Créer l'utilisateur
echo "🔧 Création de l'utilisateur $DB_USER..."
docker exec $DOCKER_CONTAINER psql -U justlife -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';" 2>/dev/null || {
    echo "   Utilisateur existe déjà, mise à jour du mot de passe..."
    docker exec $DOCKER_CONTAINER psql -U justlife -c "ALTER USER $DB_USER WITH PASSWORD '$DB_PASSWORD';"
}
echo -e "${GREEN}✅ Utilisateur configuré${NC}"

# Créer la base de données
echo "🔧 Création de la base $DB_NAME..."
docker exec $DOCKER_CONTAINER psql -U justlife -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;" 2>/dev/null || {
    echo "   Base existe déjà"
}

# Donner les privilèges
echo "🔧 Attribution des privilèges..."
docker exec $DOCKER_CONTAINER psql -U justlife -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;"
docker exec $DOCKER_CONTAINER psql -U justlife -d $DB_NAME -c "GRANT ALL ON SCHEMA public TO $DB_USER;"

echo -e "${GREEN}✅ Base de données créée avec succès${NC}"
echo ""

# Créer le fichier .env
echo "📝 Création du fichier .env..."

# Backup de l'ancien .env si existe
if [ -f .env ]; then
    cp .env .env.backup.$(date +%Y%m%d_%H%M%S)
    echo "   Backup de l'ancien .env créé"
fi

cat > .env << EOF
# Database (PostgreSQL Docker) - INDÉPENDANT
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
npm run db:generate 2>&1 | grep -v "warn"

echo -e "${GREEN}✅ Client Prisma généré${NC}"
echo ""

# Appliquer le schéma
echo "🔧 Application du schéma Prisma..."
npm run db:push 2>&1 | grep -v "warn"

echo -e "${GREEN}✅ Schéma appliqué${NC}"
echo ""

# Seeder les données
echo "🌱 Seed des données initiales..."

echo "   → Données CMS..."
npm run db:seed:cms 2>&1 | tail -5

echo "   → Liens navbar..."
npm run db:update:navbar 2>&1 | tail -5

echo -e "${GREEN}✅ Données seedées${NC}"
echo ""

# Vérifier la connexion
echo "🔍 Vérification de la connexion..."
TABLES=$(docker exec $DOCKER_CONTAINER psql -U $DB_USER -d $DB_NAME -c "\dt" 2>/dev/null | grep -c "public |")

if [ "$TABLES" -gt 0 ]; then
    echo -e "${GREEN}✅ Connexion réussie - $TABLES tables créées${NC}"
else
    echo -e "${YELLOW}⚠️  Impossible de vérifier les tables${NC}"
fi
echo ""

# Résumé
echo "=============================================================="
echo -e "${GREEN}🎉 CONFIGURATION TERMINÉE AVEC SUCCÈS !${NC}"
echo "=============================================================="
echo ""
echo "📊 Informations de connexion:"
echo "   Container Docker : $DOCKER_CONTAINER"
echo "   Base de données  : postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME"
echo "   Application      : http://localhost:$APP_PORT"
echo ""
echo "🚀 Pour démarrer l'application:"
echo -e "   ${BLUE}npm run dev${NC}"
echo ""
echo "🔍 Pour ouvrir Prisma Studio:"
echo -e "   ${BLUE}npm run db:studio${NC}"
echo ""
echo "🐳 Pour accéder à la base via Docker:"
echo -e "   ${BLUE}docker exec -it $DOCKER_CONTAINER psql -U $DB_USER -d $DB_NAME${NC}"
echo ""
echo "📖 Documentation:"
echo "   - MIGRATION_BASE_INDEPENDANTE.md"
echo "   - docs/CONVENTIONS_NOMMAGE.md"
echo ""
