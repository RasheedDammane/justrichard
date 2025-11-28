#!/bin/bash

# ===================================================
# SCRIPT DE RESET DOCKER - JUSTRICHARD PREPROD
# ⚠️  ATTENTION: Supprime toutes les données!
# ===================================================

RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${RED}⚠️  ATTENTION: RESET COMPLET DE LA BASE DE DONNÉES${NC}"
echo ""
echo "Cette action va:"
echo "  • Arrêter tous les conteneurs Docker"
echo "  • Supprimer tous les volumes (données)"
echo "  • Supprimer tous les réseaux"
echo "  • Supprimer toutes les données de la base"
echo ""
echo -e "${YELLOW}Cette action est IRRÉVERSIBLE!${NC}"
echo ""

read -p "Êtes-vous sûr de vouloir continuer? (tapez 'yes' pour confirmer) " -r
echo

if [ "$REPLY" != "yes" ]; then
    echo "Reset annulé."
    exit 0
fi

echo ""
echo "🗑️  Arrêt et suppression des conteneurs..."
docker-compose -f docker-compose.preprod.yml down -v

echo ""
echo "🗑️  Suppression des volumes..."
docker volume rm justrichard-preprod-postgres-data 2>/dev/null || true
docker volume rm justrichard-preprod-pgadmin-data 2>/dev/null || true
docker volume rm justrichard-preprod-redis-data 2>/dev/null || true

echo ""
echo "🗑️  Nettoyage des réseaux..."
docker network prune -f

echo ""
echo "🗑️  Nettoyage des images inutilisées..."
docker image prune -f

echo ""
echo -e "${GREEN}✅ Reset terminé!${NC}"
echo ""
echo "Pour redémarrer avec une base propre:"
echo "  ./docker-start.sh"
