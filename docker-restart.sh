#!/bin/bash

# ===================================================
# SCRIPT DE REDÉMARRAGE DOCKER - JUSTRICHARD PREPROD
# ===================================================

echo "🔄 Restarting JustRichard Preprod Docker Environment..."
echo ""

# Arrêter les conteneurs
echo "Stopping containers..."
docker-compose -f docker-compose.preprod.yml down

echo ""
echo "Starting containers..."
./docker-start.sh
