#!/bin/bash

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║   🔄 NETTOYAGE ET REDÉMARRAGE DU SERVEUR                   ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# 1. Arrêter le serveur s'il tourne
echo -e "${YELLOW}1. Arrêt du serveur Next.js...${NC}"
pkill -f "next dev" 2>/dev/null
sleep 2
echo -e "${GREEN}   ✓ Serveur arrêté${NC}"
echo ""

# 2. Nettoyer le cache Next.js
echo -e "${YELLOW}2. Nettoyage du cache Next.js...${NC}"
if [ -d ".next" ]; then
  rm -rf .next
  echo -e "${GREEN}   ✓ Cache .next supprimé${NC}"
else
  echo -e "${BLUE}   ℹ Cache .next déjà propre${NC}"
fi
echo ""

# 3. Nettoyer node_modules/.cache (optionnel)
echo -e "${YELLOW}3. Nettoyage du cache node_modules...${NC}"
if [ -d "node_modules/.cache" ]; then
  rm -rf node_modules/.cache
  echo -e "${GREEN}   ✓ Cache node_modules supprimé${NC}"
else
  echo -e "${BLUE}   ℹ Cache node_modules déjà propre${NC}"
fi
echo ""

# 4. Régénérer le client Prisma
echo -e "${YELLOW}4. Régénération du client Prisma...${NC}"
npx prisma generate > /dev/null 2>&1
echo -e "${GREEN}   ✓ Client Prisma régénéré${NC}"
echo ""

# 5. Redémarrer le serveur
echo -e "${YELLOW}5. Redémarrage du serveur...${NC}"
echo -e "${BLUE}   → Démarrage de npm run dev...${NC}"
echo ""

# Démarrer le serveur en arrière-plan
npm run dev &
SERVER_PID=$!

# Attendre que le serveur soit prêt
echo -e "${BLUE}   ⏳ Attente du démarrage du serveur...${NC}"
sleep 5

# Vérifier si le serveur répond
MAX_ATTEMPTS=10
ATTEMPT=0
while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
  if curl -s http://localhost:3100 > /dev/null 2>&1; then
    echo -e "${GREEN}   ✓ Serveur démarré avec succès !${NC}"
    echo ""
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo -e "║   ${GREEN}✅ SERVEUR PRÊT${NC}                                          ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo ""
    echo -e "${BLUE}📍 URL: http://localhost:3100${NC}"
    echo -e "${BLUE}📍 Admin: http://localhost:3100/en/admin/data${NC}"
    echo -e "${BLUE}🔧 PID: $SERVER_PID${NC}"
    echo ""
    echo -e "${YELLOW}Pour arrêter le serveur:${NC}"
    echo -e "   kill $SERVER_PID"
    echo -e "   ou Ctrl+C dans ce terminal"
    echo ""
    
    # Garder le script actif pour voir les logs
    echo -e "${BLUE}📋 Logs du serveur (Ctrl+C pour quitter):${NC}"
    echo "─────────────────────────────────────────────────────────────"
    wait $SERVER_PID
    exit 0
  fi
  
  ATTEMPT=$((ATTEMPT + 1))
  sleep 2
done

echo -e "${RED}   ✗ Le serveur n'a pas démarré correctement${NC}"
echo -e "${YELLOW}   Vérifiez les logs ci-dessus${NC}"
exit 1
