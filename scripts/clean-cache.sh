#!/bin/bash

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║   🧹 NETTOYAGE DES CACHES                                  ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# 1. Cache Next.js
echo -e "${YELLOW}1. Nettoyage du cache Next.js (.next)...${NC}"
if [ -d ".next" ]; then
  rm -rf .next
  echo -e "${GREEN}   ✓ Cache .next supprimé${NC}"
else
  echo -e "${BLUE}   ℹ Déjà propre${NC}"
fi

# 2. Cache node_modules
echo -e "${YELLOW}2. Nettoyage du cache node_modules...${NC}"
if [ -d "node_modules/.cache" ]; then
  rm -rf node_modules/.cache
  echo -e "${GREEN}   ✓ Cache node_modules supprimé${NC}"
else
  echo -e "${BLUE}   ℹ Déjà propre${NC}"
fi

# 3. Cache Prisma
echo -e "${YELLOW}3. Nettoyage du cache Prisma...${NC}"
if [ -d "node_modules/.prisma" ]; then
  rm -rf node_modules/.prisma
  echo -e "${GREEN}   ✓ Cache Prisma supprimé${NC}"
else
  echo -e "${BLUE}   ℹ Déjà propre${NC}"
fi

# 4. Régénérer Prisma
echo -e "${YELLOW}4. Régénération du client Prisma...${NC}"
npx prisma generate > /dev/null 2>&1
echo -e "${GREEN}   ✓ Client Prisma régénéré${NC}"

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo -e "║   ${GREEN}✅ NETTOYAGE TERMINÉ${NC}                                     ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo -e "${YELLOW}Prochaine étape:${NC}"
echo -e "   npm run dev"
echo ""
