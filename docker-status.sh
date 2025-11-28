#!/bin/bash

# ===================================================
# SCRIPT DE STATUS DOCKER - JUSTRICHARD PREPROD
# ===================================================

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}   JUSTRICHARD PREPROD - DOCKER STATUS${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Vérifier Docker
if ! docker info &> /dev/null; then
    echo -e "${RED}❌ Docker n'est pas démarré!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker est actif${NC}"
echo ""

# Status des conteneurs
echo "📦 CONTENEURS:"
echo ""
docker-compose -f docker-compose.preprod.yml ps

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Vérifier PostgreSQL
echo "🗄️  POSTGRESQL:"
if docker exec justrichard-preprod-db pg_isready -U postgres -d preprod_justrichard &> /dev/null; then
    echo -e "   Status: ${GREEN}✅ Running${NC}"
    
    # Nombre de connexions
    conn_count=$(docker exec justrichard-preprod-db psql -U postgres -d preprod_justrichard -t -c "SELECT count(*) FROM pg_stat_activity WHERE datname='preprod_justrichard';" 2>/dev/null | tr -d ' ')
    echo "   Connexions actives: $conn_count"
    
    # Taille de la base
    db_size=$(docker exec justrichard-preprod-db psql -U postgres -d preprod_justrichard -t -c "SELECT pg_size_pretty(pg_database_size('preprod_justrichard'));" 2>/dev/null | tr -d ' ')
    echo "   Taille: $db_size"
    
    # Nombre de tables
    table_count=$(docker exec justrichard-preprod-db psql -U postgres -d preprod_justrichard -t -c "SELECT count(*) FROM information_schema.tables WHERE table_schema='public';" 2>/dev/null | tr -d ' ')
    echo "   Tables: $table_count"
else
    echo -e "   Status: ${RED}❌ Not running${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Vérifier Redis
echo "🔴 REDIS:"
if docker exec justrichard-preprod-redis redis-cli ping &> /dev/null; then
    echo -e "   Status: ${GREEN}✅ Running${NC}"
    
    # Nombre de clés
    key_count=$(docker exec justrichard-preprod-redis redis-cli -a redis123 DBSIZE 2>/dev/null | grep -oE '[0-9]+')
    echo "   Clés en cache: $key_count"
    
    # Mémoire utilisée
    mem_used=$(docker exec justrichard-preprod-redis redis-cli -a redis123 INFO memory 2>/dev/null | grep used_memory_human | cut -d: -f2 | tr -d '\r')
    echo "   Mémoire: $mem_used"
else
    echo -e "   Status: ${RED}❌ Not running${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Volumes
echo "💾 VOLUMES:"
docker volume ls | grep justrichard-preprod

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Utilisation disque
echo "💿 UTILISATION DISQUE:"
docker system df

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "🔗 URLS:"
echo "   Adminer:  http://localhost:8081"
echo "   PgAdmin:  http://localhost:5050"
echo "   App:      http://localhost:3001"
echo ""
