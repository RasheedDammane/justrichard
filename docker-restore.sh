#!/bin/bash

# ===================================================
# SCRIPT DE RESTORATION DOCKER - JUSTRICHARD PREPROD
# ===================================================

RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m'

BACKUP_DIR="./backups"

echo "📥 Restauration de la base de données"
echo ""

# Lister les backups disponibles
if [ ! -d "$BACKUP_DIR" ] || [ -z "$(ls -A $BACKUP_DIR/*.sql.gz 2>/dev/null)" ]; then
    echo -e "${RED}❌ Aucun backup trouvé dans $BACKUP_DIR${NC}"
    exit 1
fi

echo "Backups disponibles:"
echo ""

select backup_file in $BACKUP_DIR/*.sql.gz; do
    if [ -n "$backup_file" ]; then
        echo ""
        echo "Backup sélectionné: $backup_file"
        break
    fi
done

echo ""
echo -e "${YELLOW}⚠️  ATTENTION: Cette action va REMPLACER toutes les données actuelles!${NC}"
echo ""
read -p "Continuer? (yes/no) " -r
echo

if [ "$REPLY" != "yes" ]; then
    echo "Restauration annulée."
    exit 0
fi

# Vérifier que PostgreSQL est démarré
if ! docker exec justrichard-preprod-db pg_isready -U postgres &> /dev/null; then
    echo "❌ PostgreSQL n'est pas démarré!"
    echo "Démarrez d'abord Docker: ./docker-start.sh"
    exit 1
fi

echo ""
echo "🔄 Suppression de la base de données actuelle..."
docker exec justrichard-preprod-db psql -U postgres -c "DROP DATABASE IF EXISTS preprod_justrichard;"

echo "🔄 Création d'une nouvelle base..."
docker exec justrichard-preprod-db psql -U postgres -c "CREATE DATABASE preprod_justrichard;"

echo "🔄 Restauration du backup..."
gunzip -c "$backup_file" | docker exec -i justrichard-preprod-db psql -U postgres -d preprod_justrichard

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ Restauration terminée avec succès!${NC}"
    echo ""
else
    echo ""
    echo -e "${RED}❌ Erreur lors de la restauration${NC}"
    exit 1
fi
