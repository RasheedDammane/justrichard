#!/bin/bash

# Script d'automatisation de traduction des pages admin
# Ce script liste toutes les pages à traduire

echo "🌍 AUTO-TRANSLATION SCRIPT - Admin Pages"
echo "========================================"
echo ""

ADMIN_DIR="/Users/richard/preprod/justrichard/app/[locale]/admin"

echo "📋 Scanning admin pages..."
echo ""

# Liste des pages trouvées
PAGES=(
  "users"
  "services" 
  "bookings"
  "categories"
  "partners"
  "doctors"
  "lawyers"
  "coaches"
  "activities"
  "suppliers"
  "transfers"
  "blog"
  "chatbots"
  "notifications"
  "analytics"
  "promotions"
  "cms-pages"
  "media"
  "data"
  "simulators"
  "crypto-payments"
  "logs"
  "currencies"
  "geography"
  "exchange-rates"
  "styles"
  "routes"
)

echo "✅ Found ${#PAGES[@]} pages to translate"
echo ""

for page in "${PAGES[@]}"; do
  if [ -d "$ADMIN_DIR/$page" ]; then
    echo "  📁 $page - EXISTS"
  else
    echo "  ❌ $page - NOT FOUND"
  fi
done

echo ""
echo "🚀 Ready to translate all pages!"
