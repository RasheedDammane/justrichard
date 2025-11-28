#!/bin/bash

# ===================================================
# SCRIPT DE DÉMARRAGE DOCKER - JUSTRICHARD PREPROD
# ===================================================

set -e

echo "🐳 Starting JustRichard Preprod Docker Environment..."
echo ""

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Vérifier si Docker est installé
if ! command -v docker &> /dev/null; then
    error "Docker n'est pas installé!"
    echo "Installez Docker depuis: https://docs.docker.com/get-docker/"
    exit 1
fi

# Vérifier si Docker est en cours d'exécution
if ! docker info &> /dev/null; then
    error "Docker n'est pas démarré!"
    echo "Veuillez démarrer Docker Desktop et réessayer."
    exit 1
fi

success "Docker est installé et en cours d'exécution"

# Charger les variables d'environnement
if [ -f .env.docker ]; then
    info "Chargement de .env.docker..."
    export $(cat .env.docker | grep -v '^#' | xargs)
    success "Variables d'environnement chargées"
else
    warning ".env.docker non trouvé, utilisation des valeurs par défaut"
fi

# Arrêter les conteneurs existants si nécessaire
info "Vérification des conteneurs existants..."
if [ "$(docker ps -q -f name=justrichard-preprod)" ]; then
    warning "Arrêt des conteneurs existants..."
    docker-compose -f docker-compose.preprod.yml down
fi

# Nettoyer les volumes orphelins (optionnel)
read -p "Voulez-vous nettoyer les volumes orphelins? (y/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    info "Nettoyage des volumes orphelins..."
    docker volume prune -f
fi

# Créer les dossiers nécessaires
info "Création des dossiers nécessaires..."
mkdir -p docker/postgres/init
mkdir -p docker/pgadmin
mkdir -p backups
mkdir -p logs

# Démarrer les services
info "Démarrage des services Docker..."
docker-compose -f docker-compose.preprod.yml up -d

# Attendre que PostgreSQL soit prêt
info "Attente du démarrage de PostgreSQL..."
max_attempts=30
attempt=0

while [ $attempt -lt $max_attempts ]; do
    if docker exec justrichard-preprod-db pg_isready -U postgres -d preprod_justrichard &> /dev/null; then
        success "PostgreSQL est prêt!"
        break
    fi
    
    echo -n "."
    sleep 1
    ((attempt++))
done

echo ""

if [ $attempt -eq $max_attempts ]; then
    error "PostgreSQL n'a pas démarré après ${max_attempts} secondes"
    echo ""
    echo "Logs de PostgreSQL:"
    docker logs justrichard-preprod-db --tail 50
    exit 1
fi

# Vérifier que Redis est prêt
info "Vérification de Redis..."
if docker exec justrichard-preprod-redis redis-cli ping &> /dev/null; then
    success "Redis est prêt!"
else
    warning "Redis n'a pas démarré correctement"
fi

# Afficher l'état des conteneurs
echo ""
info "État des conteneurs:"
docker-compose -f docker-compose.preprod.yml ps

# Afficher les informations de connexion
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
success "🎉 Docker containers started successfully!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 SERVICES DISPONIBLES:"
echo ""
echo "  🗄️  PostgreSQL:"
echo "     Host: localhost"
echo "     Port: ${POSTGRES_PORT:-3100}"
echo "     Database: ${POSTGRES_DB:-preprod_justrichard}"
echo "     User: ${POSTGRES_USER:-postgres}"
echo "     Password: ${POSTGRES_PASSWORD:-postgres}"
echo ""
echo "  🌐 Adminer (Web UI):"
echo "     URL: http://localhost:${ADMINER_PORT:-8081}"
echo ""
echo "  🐘 PgAdmin (Advanced UI):"
echo "     URL: http://localhost:${PGADMIN_PORT:-5050}"
echo "     Email: ${PGADMIN_EMAIL:-admin@justrichard.com}"
echo "     Password: ${PGADMIN_PASSWORD:-admin123}"
echo ""
echo "  🔴 Redis:"
echo "     Host: localhost"
echo "     Port: ${REDIS_PORT:-6379}"
echo "     Password: ${REDIS_PASSWORD:-redis123}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📝 PROCHAINES ÉTAPES:"
echo ""
echo "  1. Copier .env.docker vers .env:"
echo "     cp .env.docker .env"
echo ""
echo "  2. Appliquer les migrations Prisma:"
echo "     npx prisma migrate dev"
echo ""
echo "  3. Charger les données de seed:"
echo "     npx ts-node prisma/seeds/food-products.ts"
echo ""
echo "  4. Démarrer l'application:"
echo "     npm run dev"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
info "Commandes utiles:"
echo "  • Voir les logs: ./docker-logs.sh"
echo "  • Arrêter: ./docker-stop.sh"
echo "  • Redémarrer: ./docker-restart.sh"
echo "  • Reset complet: ./docker-reset.sh"
echo ""
success "Done! ✨"
