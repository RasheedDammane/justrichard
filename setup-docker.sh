#!/bin/bash

# ===================================================
# SETUP AUTOMATIQUE DOCKER - JUSTRICHARD PREPROD
# Configuration initiale en une seule commande!
# ===================================================

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}   SETUP DOCKER - JUSTRICHARD PREPROD${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# 1. Rendre tous les scripts exécutables
echo -e "${BLUE}📝 Étape 1/6: Configuration des scripts...${NC}"
chmod +x docker-start.sh
chmod +x docker-stop.sh
chmod +x docker-restart.sh
chmod +x docker-reset.sh
chmod +x docker-logs.sh
chmod +x docker-status.sh
chmod +x docker-backup.sh
chmod +x docker-restore.sh
echo -e "${GREEN}✅ Scripts configurés${NC}"
echo ""

# 2. Créer les dossiers nécessaires
echo -e "${BLUE}📁 Étape 2/6: Création des dossiers...${NC}"
mkdir -p docker/postgres/init
mkdir -p docker/pgadmin
mkdir -p backups
mkdir -p logs
mkdir -p public/images/products
mkdir -p public/images/brands
echo -e "${GREEN}✅ Dossiers créés${NC}"
echo ""

# 3. Copier la configuration Docker vers .env
echo -e "${BLUE}⚙️  Étape 3/6: Configuration de l'environnement...${NC}"
if [ ! -f .env ]; then
    cp .env.docker .env
    echo -e "${GREEN}✅ Fichier .env créé${NC}"
else
    echo -e "${YELLOW}⚠️  .env existe déjà, conservation de votre configuration${NC}"
    read -p "Voulez-vous le remplacer par .env.docker? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        cp .env.docker .env
        echo -e "${GREEN}✅ .env remplacé${NC}"
    fi
fi
echo ""

# 4. Vérifier Docker
echo -e "${BLUE}🐳 Étape 4/6: Vérification de Docker...${NC}"
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}❌ Docker n'est pas installé!${NC}"
    echo "Installez Docker depuis: https://docs.docker.com/get-docker/"
    exit 1
fi

if ! docker info &> /dev/null; then
    echo -e "${YELLOW}❌ Docker n'est pas démarré!${NC}"
    echo "Veuillez démarrer Docker Desktop et relancer ce script."
    exit 1
fi
echo -e "${GREEN}✅ Docker est prêt${NC}"
echo ""

# 5. Démarrer les conteneurs
echo -e "${BLUE}🚀 Étape 5/6: Démarrage des conteneurs Docker...${NC}"
./docker-start.sh

# 6. Vérifier le statut
echo ""
echo -e "${BLUE}📊 Étape 6/6: Vérification finale...${NC}"
sleep 5
./docker-status.sh

# Afficher les instructions finales
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}   🎉 SETUP TERMINÉ AVEC SUCCÈS!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "📝 PROCHAINES ÉTAPES:"
echo ""
echo "  1️⃣  Appliquer les migrations Prisma:"
echo "      npx prisma migrate dev --name add_food_grocery_system"
echo ""
echo "  2️⃣  Charger les données de démo:"
echo "      npx ts-node prisma/seeds/food-products.ts"
echo ""
echo "  3️⃣  Démarrer l'application:"
echo "      npm run dev"
echo ""
echo "🔗 URLS UTILES:"
echo "  • Application: http://localhost:3001"
echo "  • Adminer: http://localhost:8081"
echo "  • PgAdmin: http://localhost:5050"
echo ""
echo "📚 DOCUMENTATION:"
echo "  • Guide complet: DOCKER_SETUP_GUIDE.md"
echo "  • Food system: FOOD_FINAL_SUMMARY.md"
echo ""
echo "🛠️  COMMANDES UTILES:"
echo "  • Statut: ./docker-status.sh"
echo "  • Logs: ./docker-logs.sh"
echo "  • Backup: ./docker-backup.sh"
echo "  • Arrêter: ./docker-stop.sh"
echo ""
echo -e "${GREEN}✨ Tout est prêt! Bon développement!${NC}"
echo ""
