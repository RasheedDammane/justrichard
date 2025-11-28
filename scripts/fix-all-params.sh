#!/bin/bash

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔧 CORRECTION AUTOMATIQUE DE TOUS LES PARAMS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd "$(dirname "$0")/.."

# Trouver tous les fichiers page.tsx dans admin
find app/\[locale\]/admin -name "page.tsx" -type f | while read file; do
    # Vérifier si le fichier contient le pattern problématique
    if grep -q "params: { locale }" "$file"; then
        echo "📝 Correction: $file"
        
        # Correction 1: params: { locale } => params }: { params: Promise<{ locale
        sed -i '' 's/params: { locale }/params }: { params: Promise<{ locale/g' "$file"
        
        # Correction 2: Ajouter await params si nécessaire
        if ! grep -q "await params" "$file"; then
            # Chercher la ligne avec export default async function
            sed -i '' '/export default async function/,/^  const/ {
                /export default async function/a\
  const { locale } = await params;\
  \
  // La protection est gérée par le layout admin
            }' "$file"
        fi
        
        echo "   ✅ Corrigé"
    fi
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ TERMINÉ"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
