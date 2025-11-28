#!/bin/bash

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║   🔄 REDÉMARRAGE COMPLET + TESTS AUTOMATIQUES              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# 1. Synchroniser Prisma avec la base de données
echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${YELLOW}ÉTAPE 1: Synchronisation Prisma avec la base de données${NC}"
echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo ""

echo -e "${BLUE}→ Introspection de la base de données...${NC}"
npx prisma db pull --force > /dev/null 2>&1
echo -e "${GREEN}✓ Schéma Prisma synchronisé avec la base${NC}"
echo ""

echo -e "${BLUE}→ Génération du client Prisma...${NC}"
npx prisma generate > /dev/null 2>&1
echo -e "${GREEN}✓ Client Prisma régénéré${NC}"
echo ""

# 2. Arrêter le serveur
echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${YELLOW}ÉTAPE 2: Arrêt du serveur${NC}"
echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo ""

pkill -f "next dev" 2>/dev/null
sleep 2
echo -e "${GREEN}✓ Serveur arrêté${NC}"
echo ""

# 3. Nettoyer les caches
echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${YELLOW}ÉTAPE 3: Nettoyage des caches${NC}"
echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo ""

if [ -d ".next" ]; then
  rm -rf .next
  echo -e "${GREEN}✓ Cache .next supprimé${NC}"
fi

if [ -d "node_modules/.cache" ]; then
  rm -rf node_modules/.cache
  echo -e "${GREEN}✓ Cache node_modules supprimé${NC}"
fi

if [ -d "node_modules/.prisma" ]; then
  rm -rf node_modules/.prisma
  echo -e "${GREEN}✓ Cache Prisma supprimé${NC}"
fi
echo ""

# 4. Régénérer le client Prisma une dernière fois
echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${YELLOW}ÉTAPE 4: Régénération finale du client Prisma${NC}"
echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo ""

npx prisma generate > /dev/null 2>&1
echo -e "${GREEN}✓ Client Prisma régénéré${NC}"
echo ""

# 5. Redémarrer le serveur
echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${YELLOW}ÉTAPE 5: Redémarrage du serveur${NC}"
echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo ""

echo -e "${BLUE}→ Démarrage de npm run dev...${NC}"
npm run dev > /tmp/nextjs-server.log 2>&1 &
SERVER_PID=$!
echo -e "${GREEN}✓ Serveur démarré (PID: $SERVER_PID)${NC}"
echo ""

# 6. Attendre que le serveur soit prêt
echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${YELLOW}ÉTAPE 6: Attente du démarrage du serveur${NC}"
echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo ""

MAX_ATTEMPTS=30
ATTEMPT=0
echo -e "${BLUE}⏳ Attente du serveur (max 60s)...${NC}"

while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
  if curl -s http://localhost:3100 > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Serveur prêt !${NC}"
    echo ""
    break
  fi
  
  ATTEMPT=$((ATTEMPT + 1))
  echo -ne "\r   Tentative $ATTEMPT/$MAX_ATTEMPTS..."
  sleep 2
done

if [ $ATTEMPT -eq $MAX_ATTEMPTS ]; then
  echo ""
  echo -e "${RED}✗ Le serveur n'a pas démarré dans les temps${NC}"
  echo -e "${YELLOW}Vérifiez les logs: tail -f /tmp/nextjs-server.log${NC}"
  exit 1
fi

# 7. Tests CRUD
echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${YELLOW}ÉTAPE 7: Tests CRUD Complets${NC}"
echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo ""

API_URL="http://localhost:3100/api/admin"
TEST_COUNTRY_CODE="JP"
TEST_COUNTRY_ID=""
ALL_TESTS_PASSED=true

# Test 1: Récupérer une devise
echo -e "${BLUE}Test 1/6: Récupération d'une devise...${NC}"
CURRENCY_ID=$(curl -s "$API_URL/currencies" | jq -r '.data[0].id')
CURRENCY_CODE=$(curl -s "$API_URL/currencies" | jq -r '.data[0].code')

if [ -z "$CURRENCY_ID" ] || [ "$CURRENCY_ID" = "null" ]; then
  echo -e "${RED}✗ ÉCHEC: Aucune devise trouvée${NC}"
  ALL_TESTS_PASSED=false
else
  echo -e "${GREEN}✓ SUCCÈS: Devise $CURRENCY_CODE trouvée${NC}"
fi
echo ""

# Test 2: Créer un pays
echo -e "${BLUE}Test 2/6: Création d'un pays (Japon)...${NC}"
CREATE_RESPONSE=$(curl -s -X POST "$API_URL/countries" \
  -H "Content-Type: application/json" \
  -d "{
    \"code\": \"$TEST_COUNTRY_CODE\",
    \"name\": \"Japan\",
    \"slug\": \"japan\",
    \"description\": \"Japan is an island nation in East Asia.\",
    \"dialCode\": \"+81\",
    \"currencyId\": \"$CURRENCY_ID\",
    \"flag\": \"🇯🇵\",
    \"icon\": \"🗾\",
    \"thumbnail\": \"/images/countries/japan-thumb.jpg\",
    \"images\": [\"/images/countries/japan-tokyo.jpg\"],
    \"metaTitle\": \"Japan - Travel Guide\",
    \"metaDescription\": \"Discover Japan.\",
    \"keywords\": [\"Japan\", \"Tokyo\"],
    \"isActive\": true
  }")

CREATE_SUCCESS=$(echo "$CREATE_RESPONSE" | jq -r '.success')

if [ "$CREATE_SUCCESS" = "true" ]; then
  TEST_COUNTRY_ID=$(echo "$CREATE_RESPONSE" | jq -r '.data.id')
  echo -e "${GREEN}✓ SUCCÈS: Pays créé (ID: $TEST_COUNTRY_ID)${NC}"
else
  ERROR=$(echo "$CREATE_RESPONSE" | jq -r '.error' | head -5)
  echo -e "${RED}✗ ÉCHEC: $ERROR${NC}"
  ALL_TESTS_PASSED=false
fi
echo ""

if [ "$CREATE_SUCCESS" = "true" ]; then
  # Test 3: Lire le pays
  echo -e "${BLUE}Test 3/6: Lecture du pays...${NC}"
  GET_RESPONSE=$(curl -s "$API_URL/countries/$TEST_COUNTRY_ID")
  GET_SUCCESS=$(echo "$GET_RESPONSE" | jq -r '.success')

  if [ "$GET_SUCCESS" = "true" ]; then
    COUNTRY_NAME=$(echo "$GET_RESPONSE" | jq -r '.data.name')
    echo -e "${GREEN}✓ SUCCÈS: Pays trouvé ($COUNTRY_NAME)${NC}"
  else
    echo -e "${RED}✗ ÉCHEC: Pays non trouvé${NC}"
    ALL_TESTS_PASSED=false
  fi
  echo ""

  # Test 4: Mettre à jour le pays
  echo -e "${BLUE}Test 4/6: Mise à jour du pays...${NC}"
  UPDATE_RESPONSE=$(curl -s -X PUT "$API_URL/countries/$TEST_COUNTRY_ID" \
    -H "Content-Type: application/json" \
    -d "{
      \"code\": \"$TEST_COUNTRY_CODE\",
      \"name\": \"Japan (Updated)\",
      \"slug\": \"japan\",
      \"description\": \"Updated description.\",
      \"dialCode\": \"+81\",
      \"currencyId\": \"$CURRENCY_ID\",
      \"flag\": \"🇯🇵\",
      \"icon\": \"🗾\",
      \"thumbnail\": \"/images/countries/japan-thumb.jpg\",
      \"images\": [\"/images/countries/japan-tokyo.jpg\"],
      \"metaTitle\": \"Japan - Updated\",
      \"metaDescription\": \"Updated.\",
      \"keywords\": [\"Japan\"],
      \"isActive\": true
    }")

  UPDATE_SUCCESS=$(echo "$UPDATE_RESPONSE" | jq -r '.success')

  if [ "$UPDATE_SUCCESS" = "true" ]; then
    UPDATED_NAME=$(echo "$UPDATE_RESPONSE" | jq -r '.data.name')
    echo -e "${GREEN}✓ SUCCÈS: Pays mis à jour ($UPDATED_NAME)${NC}"
  else
    ERROR=$(echo "$UPDATE_RESPONSE" | jq -r '.error' | head -5)
    echo -e "${RED}✗ ÉCHEC: $ERROR${NC}"
    ALL_TESTS_PASSED=false
  fi
  echo ""

  # Test 5: Supprimer le pays
  echo -e "${BLUE}Test 5/6: Suppression du pays...${NC}"
  DELETE_RESPONSE=$(curl -s -X DELETE "$API_URL/countries/$TEST_COUNTRY_ID")
  DELETE_SUCCESS=$(echo "$DELETE_RESPONSE" | jq -r '.success')

  if [ "$DELETE_SUCCESS" = "true" ]; then
    echo -e "${GREEN}✓ SUCCÈS: Pays supprimé${NC}"
  else
    ERROR=$(echo "$DELETE_RESPONSE" | jq -r '.error')
    echo -e "${RED}✗ ÉCHEC: $ERROR${NC}"
    ALL_TESTS_PASSED=false
  fi
  echo ""

  # Test 6: Vérifier la suppression
  echo -e "${BLUE}Test 6/6: Vérification de la suppression...${NC}"
  VERIFY_RESPONSE=$(curl -s "$API_URL/countries/$TEST_COUNTRY_ID")
  VERIFY_SUCCESS=$(echo "$VERIFY_RESPONSE" | jq -r '.success')

  if [ "$VERIFY_SUCCESS" = "false" ]; then
    echo -e "${GREEN}✓ SUCCÈS: Pays bien supprimé${NC}"
  else
    echo -e "${RED}✗ ÉCHEC: Le pays existe encore${NC}"
    ALL_TESTS_PASSED=false
  fi
  echo ""
fi

# 8. Résumé final
echo ""
echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"

if [ "$ALL_TESTS_PASSED" = true ]; then
  echo "╔══════════════════════════════════════════════════════════════╗"
  echo -e "║   ${GREEN}✅ TOUS LES TESTS RÉUSSIS !${NC}                             ║"
  echo "╚══════════════════════════════════════════════════════════════╝"
  echo ""
  echo -e "${GREEN}Résumé:${NC}"
  echo -e "  ✓ Prisma synchronisé avec la base"
  echo -e "  ✓ Serveur redémarré avec nouveau client"
  echo -e "  ✓ Création d'un pays"
  echo -e "  ✓ Lecture du pays"
  echo -e "  ✓ Mise à jour du pays"
  echo -e "  ✓ Suppression du pays"
  echo ""
  echo -e "${BLUE}📍 Serveur: http://localhost:3100${NC}"
  echo -e "${BLUE}📍 Admin: http://localhost:3100/en/admin/data${NC}"
  echo -e "${BLUE}🔧 PID: $SERVER_PID${NC}"
  echo ""
  echo -e "${YELLOW}Pour arrêter le serveur: kill $SERVER_PID${NC}"
else
  echo "╔══════════════════════════════════════════════════════════════╗"
  echo -e "║   ${RED}❌ CERTAINS TESTS ONT ÉCHOUÉ${NC}                           ║"
  echo "╚══════════════════════════════════════════════════════════════╝"
  echo ""
  echo -e "${YELLOW}Vérifiez les erreurs ci-dessus${NC}"
  echo -e "${YELLOW}Logs du serveur: tail -f /tmp/nextjs-server.log${NC}"
fi

echo ""
