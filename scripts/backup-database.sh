#!/bin/bash

# Script de backup de la base de données PostgreSQL
# Usage: ./scripts/backup-database.sh

# Créer le dossier de backup s'il n'existe pas
BACKUP_DIR="./backups"
mkdir -p $BACKUP_DIR

# Nom du fichier de backup avec timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/justrichard_backup_$TIMESTAMP.sql"

echo "🔄 Démarrage du backup de la base de données..."
echo "📁 Fichier de backup: $BACKUP_FILE"

# Exécuter pg_dump en utilisant DATABASE_URL du fichier .env
# Le script utilisera automatiquement les variables d'environnement
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Extraire les informations de connexion depuis DATABASE_URL
# Format: postgresql://user:password@host:port/database
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL n'est pas défini dans le fichier .env"
    exit 1
fi

# Exécuter le backup
pg_dump "$DATABASE_URL" > "$BACKUP_FILE"

# Vérifier si le backup a réussi
if [ $? -eq 0 ]; then
    # Compresser le fichier de backup
    gzip "$BACKUP_FILE"
    BACKUP_FILE_GZ="$BACKUP_FILE.gz"
    
    # Calculer la taille du fichier
    SIZE=$(du -h "$BACKUP_FILE_GZ" | cut -f1)
    
    echo "✅ Backup réussi!"
    echo "📦 Fichier: $BACKUP_FILE_GZ"
    echo "📊 Taille: $SIZE"
    echo ""
    echo "Pour restaurer ce backup, utilisez:"
    echo "gunzip -c $BACKUP_FILE_GZ | psql \$DATABASE_URL"
else
    echo "❌ Erreur lors du backup"
    rm -f "$BACKUP_FILE"
    exit 1
fi

# Optionnel: Supprimer les backups de plus de 30 jours
echo ""
echo "🧹 Nettoyage des anciens backups (>30 jours)..."
find $BACKUP_DIR -name "justrichard_backup_*.sql.gz" -mtime +30 -delete
echo "✅ Nettoyage terminé"
