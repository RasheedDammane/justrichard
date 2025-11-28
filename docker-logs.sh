#!/bin/bash

# ===================================================
# SCRIPT DE LOGS DOCKER - JUSTRICHARD PREPROD
# ===================================================

echo "📋 JustRichard Preprod Docker Logs"
echo ""
echo "Choisissez un service:"
echo "  1) PostgreSQL"
echo "  2) Adminer"
echo "  3) PgAdmin"
echo "  4) Redis"
echo "  5) Tous les services"
echo ""

read -p "Votre choix (1-5): " choice

case $choice in
    1)
        echo ""
        echo "📊 PostgreSQL Logs (Ctrl+C pour quitter):"
        echo ""
        docker logs -f justrichard-preprod-db
        ;;
    2)
        echo ""
        echo "📊 Adminer Logs (Ctrl+C pour quitter):"
        echo ""
        docker logs -f justrichard-preprod-adminer
        ;;
    3)
        echo ""
        echo "📊 PgAdmin Logs (Ctrl+C pour quitter):"
        echo ""
        docker logs -f justrichard-preprod-pgadmin
        ;;
    4)
        echo ""
        echo "📊 Redis Logs (Ctrl+C pour quitter):"
        echo ""
        docker logs -f justrichard-preprod-redis
        ;;
    5)
        echo ""
        echo "📊 All Services Logs (Ctrl+C pour quitter):"
        echo ""
        docker-compose -f docker-compose.preprod.yml logs -f
        ;;
    *)
        echo "Choix invalide"
        exit 1
        ;;
esac
