#!/bin/bash

# ===================================================
# SCRIPT DE BACKUP DOCKER - JUSTRICHARD PREPROD
# ===================================================

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Créer le dossier de backup
BACKUP_DIR="./backups"
mkdir -p $BACKUP_DIR

# Nom du fichier de backup avec timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/preprod_justrichard_${TIMESTAMP}.sql"

echo -e "${BLUE}📦 Backup de la base de données JustRichard Preprod${NC}"
echo ""

# Vérifier que PostgreSQL est en cours d'exécution
if ! docker exec justrichard-preprod-db pg_isready -U postgres &> /dev/null; then
    echo "❌ PostgreSQL n'est pas démarré!"
    echo "Démarrez d'abord Docker: ./docker-start.sh"
    exit 1
fi

echo "🔄 Création du backup..."

# Créer le backup
docker exec justrichard-preprod-db pg_dump -U postgres -d preprod_justrichard > "$BACKUP_FILE"

# Vérifier le succès
if [ $? -eq 0 ]; then
    # Compresser
    echo "📦 Compression du backup..."
    gzip "$BACKUP_FILE"
    BACKUP_FILE_GZ="${BACKUP_FILE}.gz"
    
    # Taille
    SIZE=$(du -h "$BACKUP_FILE_GZ" | cut -f1)
    
    echo ""
    echo -e "${GREEN}✅ Backup créé avec succès!${NC}"
    echo ""
    echo "📁 Fichier: $BACKUP_FILE_GZ"
    echo "📊 Taille: $SIZE"
    echo ""
    echo "Pour restaurer ce backup:"
    echo "  gunzip -c $BACKUP_FILE_GZ | docker exec -i justrichard-preprod-db psql -U postgres -d preprod_justrichard"
    echo ""
    
    # Nettoyer les vieux backups (> 30 jours)
    find $BACKUP_DIR -name "preprod_justrichard_*.sql.gz" -mtime +30 -delete
    
else
    echo "❌ Erreur lors de la création du backup"
    rm -f "$BACKUP_FILE"
    exit 1
fi
