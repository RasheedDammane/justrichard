#!/bin/bash

# ===================================================
# SCRIPT D'ARRÊT DOCKER - JUSTRICHARD PREPROD
# ===================================================

echo "🛑 Stopping JustRichard Preprod Docker Environment..."
echo ""

# Arrêter les conteneurs
docker-compose -f docker-compose.preprod.yml down

echo ""
echo "✅ All containers stopped!"
echo ""
echo "Pour redémarrer: ./docker-start.sh"
