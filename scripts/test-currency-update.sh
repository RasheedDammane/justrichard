#!/bin/bash

echo "=========================================="
echo "TEST: Mise à jour Currency pour Countries"
echo "=========================================="
echo ""

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Récupérer les devises
echo "1. Récupération des devises..."
CURRENCIES=$(curl -s http://localhost:3100/api/admin/currencies | jq -r '.data[] | "\(.id)|\(.code)|\(.name)"')
echo -e "${GREEN}✓ Devises récupérées${NC}"
echo "$CURRENCIES" | head -5
echo ""

# 2. Récupérer les pays
echo "2. Récupération des pays..."
COUNTRIES=$(curl -s http://localhost:3100/api/admin/countries | jq -r '.data[] | "\(.id)|\(.code)|\(.name)|\(.currencyId // "null")"')
echo -e "${GREEN}✓ Pays récupérés${NC}"
echo "$COUNTRIES" | head -5
echo ""

# 3. Test de mise à jour: Bahrain -> AED
echo "3. Test: Mise à jour Bahrain avec devise AED..."
BAHRAIN_ID=$(echo "$COUNTRIES" | grep "|BH|" | cut -d'|' -f1)
AED_ID=$(echo "$CURRENCIES" | grep "|AED|" | cut -d'|' -f1)

if [ -z "$BAHRAIN_ID" ]; then
  echo -e "${RED}✗ Bahrain non trouvé${NC}"
  exit 1
fi

if [ -z "$AED_ID" ]; then
  echo -e "${RED}✗ Devise AED non trouvée${NC}"
  exit 1
fi

echo "Bahrain ID: $BAHRAIN_ID"
echo "AED ID: $AED_ID"
echo ""

RESULT=$(curl -s -X PUT "http://localhost:3100/api/admin/countries/$BAHRAIN_ID" \
  -H "Content-Type: application/json" \
  -d "{
    \"code\": \"BH\",
    \"name\": \"Bahrain\",
    \"slug\": \"bahrain\",
    \"currencyId\": \"$AED_ID\",
    \"dialCode\": \"+973\",
    \"flag\": \"🇧🇭\",
    \"isActive\": true
  }")

SUCCESS=$(echo "$RESULT" | jq -r '.success')

if [ "$SUCCESS" = "true" ]; then
  echo -e "${GREEN}✓ Mise à jour réussie !${NC}"
  echo "$RESULT" | jq '{success, data: {id: .data.id, name: .data.name, currencyId: .data.currencyId}}'
else
  echo -e "${RED}✗ Erreur lors de la mise à jour${NC}"
  echo "$RESULT" | jq '.error' | head -10
  echo ""
  echo -e "${YELLOW}⚠️  Le serveur doit être redémarré !${NC}"
  echo "   Commande: npm run dev"
  exit 1
fi

echo ""

# 4. Vérification
echo "4. Vérification de la mise à jour..."
VERIFY=$(curl -s "http://localhost:3100/api/admin/countries/$BAHRAIN_ID" | jq '{id: .data.id, name: .data.name, currencyId: .data.currencyId}')
echo "$VERIFY"

CURRENCY_ID=$(echo "$VERIFY" | jq -r '.currencyId')
if [ "$CURRENCY_ID" = "$AED_ID" ]; then
  echo -e "${GREEN}✓ Vérification réussie !${NC}"
else
  echo -e "${RED}✗ La devise n'a pas été mise à jour${NC}"
  exit 1
fi

echo ""
echo "=========================================="
echo -e "${GREEN}✓ TOUS LES TESTS RÉUSSIS !${NC}"
echo "=========================================="
