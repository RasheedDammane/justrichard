#!/bin/bash

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║   🧪 TEST CRUD COMPLET - COUNTRIES                         ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

API_URL="http://localhost:3100/api/admin"
TEST_COUNTRY_CODE="JP"
TEST_COUNTRY_ID=""

# 1. Récupérer une devise pour le test
echo -e "${BLUE}1. Récupération d'une devise pour le test...${NC}"
CURRENCY_ID=$(curl -s "$API_URL/currencies" | jq -r '.data[0].id')
CURRENCY_CODE=$(curl -s "$API_URL/currencies" | jq -r '.data[0].code')

if [ -z "$CURRENCY_ID" ] || [ "$CURRENCY_ID" = "null" ]; then
  echo -e "${RED}✗ Aucune devise trouvée${NC}"
  exit 1
fi

echo -e "${GREEN}✓ Devise: $CURRENCY_CODE ($CURRENCY_ID)${NC}"
echo ""

# 2. Créer un nouveau pays (Japon)
echo -e "${BLUE}2. Création d'un nouveau pays (Japon)...${NC}"

CREATE_RESPONSE=$(curl -s -X POST "$API_URL/countries" \
  -H "Content-Type: application/json" \
  -d "{
    \"code\": \"$TEST_COUNTRY_CODE\",
    \"name\": \"Japan\",
    \"slug\": \"japan\",
    \"description\": \"Japan is an island nation in East Asia known for its rich culture, technology, and beautiful landscapes.\",
    \"dialCode\": \"+81\",
    \"currencyId\": \"$CURRENCY_ID\",
    \"flag\": \"🇯🇵\",
    \"icon\": \"🗾\",
    \"thumbnail\": \"/images/countries/japan-thumb.jpg\",
    \"images\": [\"/images/countries/japan-tokyo.jpg\", \"/images/countries/japan-fuji.jpg\"],
    \"metaTitle\": \"Japan - Travel Guide\",
    \"metaDescription\": \"Discover Japan, land of the rising sun.\",
    \"keywords\": [\"Japan\", \"Tokyo\", \"Asia\"],
    \"isActive\": true
  }")

CREATE_SUCCESS=$(echo "$CREATE_RESPONSE" | jq -r '.success')

if [ "$CREATE_SUCCESS" = "true" ]; then
  TEST_COUNTRY_ID=$(echo "$CREATE_RESPONSE" | jq -r '.data.id')
  echo -e "${GREEN}✓ Pays créé avec succès !${NC}"
  echo -e "   ID: $TEST_COUNTRY_ID"
  echo -e "   Code: $TEST_COUNTRY_CODE"
  echo -e "   Name: Japan"
else
  ERROR=$(echo "$CREATE_RESPONSE" | jq -r '.error')
  echo -e "${RED}✗ Erreur lors de la création${NC}"
  echo -e "   $ERROR"
  exit 1
fi
echo ""

# 3. Vérifier que le pays existe
echo -e "${BLUE}3. Vérification de l'existence du pays...${NC}"

GET_RESPONSE=$(curl -s "$API_URL/countries/$TEST_COUNTRY_ID")
GET_SUCCESS=$(echo "$GET_RESPONSE" | jq -r '.success')

if [ "$GET_SUCCESS" = "true" ]; then
  COUNTRY_NAME=$(echo "$GET_RESPONSE" | jq -r '.data.name')
  COUNTRY_SLUG=$(echo "$GET_RESPONSE" | jq -r '.data.slug')
  COUNTRY_CURRENCY=$(echo "$GET_RESPONSE" | jq -r '.data.currencyId')
  
  echo -e "${GREEN}✓ Pays trouvé !${NC}"
  echo -e "   Name: $COUNTRY_NAME"
  echo -e "   Slug: $COUNTRY_SLUG"
  echo -e "   Currency: $COUNTRY_CURRENCY"
else
  echo -e "${RED}✗ Pays non trouvé${NC}"
  exit 1
fi
echo ""

# 4. Mettre à jour le pays
echo -e "${BLUE}4. Mise à jour du pays...${NC}"

UPDATE_RESPONSE=$(curl -s -X PUT "$API_URL/countries/$TEST_COUNTRY_ID" \
  -H "Content-Type: application/json" \
  -d "{
    \"code\": \"$TEST_COUNTRY_CODE\",
    \"name\": \"Japan (Updated)\",
    \"slug\": \"japan\",
    \"description\": \"Updated description for Japan.\",
    \"dialCode\": \"+81\",
    \"currencyId\": \"$CURRENCY_ID\",
    \"flag\": \"🇯🇵\",
    \"icon\": \"🗾\",
    \"thumbnail\": \"/images/countries/japan-thumb.jpg\",
    \"images\": [\"/images/countries/japan-tokyo.jpg\"],
    \"metaTitle\": \"Japan - Updated\",
    \"metaDescription\": \"Updated meta description.\",
    \"keywords\": [\"Japan\", \"Tokyo\"],
    \"isActive\": true
  }")

UPDATE_SUCCESS=$(echo "$UPDATE_RESPONSE" | jq -r '.success')

if [ "$UPDATE_SUCCESS" = "true" ]; then
  UPDATED_NAME=$(echo "$UPDATE_RESPONSE" | jq -r '.data.name')
  echo -e "${GREEN}✓ Pays mis à jour !${NC}"
  echo -e "   New Name: $UPDATED_NAME"
else
  ERROR=$(echo "$UPDATE_RESPONSE" | jq -r '.error')
  echo -e "${RED}✗ Erreur lors de la mise à jour${NC}"
  echo -e "   $ERROR"
fi
echo ""

# 5. Supprimer le pays
echo -e "${BLUE}5. Suppression du pays...${NC}"

DELETE_RESPONSE=$(curl -s -X DELETE "$API_URL/countries/$TEST_COUNTRY_ID")
DELETE_SUCCESS=$(echo "$DELETE_RESPONSE" | jq -r '.success')

if [ "$DELETE_SUCCESS" = "true" ]; then
  echo -e "${GREEN}✓ Pays supprimé avec succès !${NC}"
else
  ERROR=$(echo "$DELETE_RESPONSE" | jq -r '.error')
  echo -e "${RED}✗ Erreur lors de la suppression${NC}"
  echo -e "   $ERROR"
  exit 1
fi
echo ""

# 6. Vérifier que le pays n'existe plus
echo -e "${BLUE}6. Vérification de la suppression...${NC}"

VERIFY_RESPONSE=$(curl -s "$API_URL/countries/$TEST_COUNTRY_ID")
VERIFY_SUCCESS=$(echo "$VERIFY_RESPONSE" | jq -r '.success')

if [ "$VERIFY_SUCCESS" = "false" ]; then
  echo -e "${GREEN}✓ Pays bien supprimé !${NC}"
else
  echo -e "${RED}✗ Le pays existe encore${NC}"
  exit 1
fi
echo ""

echo "╔══════════════════════════════════════════════════════════════╗"
echo -e "║   ${GREEN}✅ TOUS LES TESTS RÉUSSIS !${NC}                             ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo -e "${GREEN}Résumé:${NC}"
echo -e "  ✓ Création d'un pays"
echo -e "  ✓ Lecture du pays"
echo -e "  ✓ Mise à jour du pays"
echo -e "  ✓ Suppression du pays"
echo -e "  ✓ Vérification de la suppression"
echo ""
