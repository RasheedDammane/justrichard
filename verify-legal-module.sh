#!/bin/bash

echo "🔍 Vérification du module Legal..."
echo ""

# Vérifier que les fichiers existent
echo "📁 Vérification des fichiers..."
files=(
  "app/[locale]/legal/page.tsx"
  "app/[locale]/legal/LegalListClient.tsx"
  "app/[locale]/legal/LegalFilters.tsx"
  "app/[locale]/legal/[slug]/page.tsx"
  "app/[locale]/admin/legal/page.tsx"
  "app/[locale]/admin/legal/LegalProfessionalsClient.tsx"
  "app/[locale]/admin/legal/LegalProfessionalForm.tsx"
  "app/[locale]/admin/legal/new/page.tsx"
  "app/[locale]/admin/legal/[id]/page.tsx"
)

all_exist=true
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ $file"
  else
    echo "❌ $file - MANQUANT"
    all_exist=false
  fi
done

echo ""

# Vérifier qu'il n'y a pas de dossier /services/legal
echo "🗑️  Vérification suppression ancien dossier..."
if [ -d "app/[locale]/services/legal" ]; then
  echo "❌ app/[locale]/services/legal existe encore - À SUPPRIMER"
else
  echo "✅ Ancien dossier supprimé"
fi

echo ""

# Vérifier le modèle Prisma
echo "🗄️  Vérification modèle Prisma..."
if grep -q "model LegalProfessional" prisma/schema.prisma; then
  echo "✅ Modèle LegalProfessional existe"
else
  echo "❌ Modèle LegalProfessional manquant"
fi

echo ""

# Vérifier les imports
echo "🔗 Vérification des imports..."
if grep -q "import LegalListClient from './LegalListClient'" app/\[locale\]/legal/page.tsx; then
  echo "✅ Import LegalListClient correct"
else
  echo "❌ Import LegalListClient incorrect"
fi

if grep -q "import LegalFilters from './LegalFilters'" app/\[locale\]/legal/LegalListClient.tsx; then
  echo "✅ Import LegalFilters correct"
else
  echo "❌ Import LegalFilters incorrect"
fi

echo ""

# Résumé
echo "📊 RÉSUMÉ"
echo "========="
if [ "$all_exist" = true ]; then
  echo "✅ Tous les fichiers sont présents"
  echo ""
  echo "🚀 PROCHAINES ÉTAPES:"
  echo "1. Redémarre le serveur: npm run dev"
  echo "2. Teste l'URL: http://localhost:3100/en/legal"
  echo "3. Teste l'admin: http://localhost:3100/fr/admin/legal"
else
  echo "❌ Certains fichiers manquent"
  echo "Vérifie les fichiers marqués ❌ ci-dessus"
fi

echo ""
echo "📝 URLs à tester:"
echo "  - Public EN: http://localhost:3100/en/legal"
echo "  - Public FR: http://localhost:3100/fr/legal"
echo "  - Admin: http://localhost:3100/fr/admin/legal"
echo "  - Détail: http://localhost:3100/en/legal/[slug]"
