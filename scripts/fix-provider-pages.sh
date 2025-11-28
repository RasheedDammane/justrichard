#!/bin/bash

# Script pour corriger les pages admin qui utilisent Provider
# Le modèle Provider n'a pas de champ 'type'

echo "🔧 Correction des pages Provider..."

# Liste des fichiers à corriger
FILES=(
  "app/[locale]/admin/coaches/page.tsx"
  "app/[locale]/admin/transfers/page.tsx"
  "app/[locale]/admin/activities/page.tsx"
  "app/[locale]/admin/suppliers/page.tsx"
)

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "📝 Correction de $file..."
    
    # Remplacer la requête avec filtrage par type
    sed -i '' 's/where: {$/where: {\n      isActive: true,\n    },\n    \/* Ancien filtrage par type supprimé - le modèle Provider n'\''a pas de champ type *\//g' "$file"
    
    # Supprimer les lignes OR avec type
    sed -i '' '/OR: \[/,/\],/d' "$file"
    
    # Remplacer Appointment par rien dans _count
    sed -i '' '/Appointment: true,/d' "$file"
    
    # Remplacer item.type par item.email
    sed -i '' 's/{item\.type}/{item.email}/g' "$file"
    
    echo "✅ $file corrigé"
  else
    echo "⚠️  $file n'existe pas"
  fi
done

echo "🎉 Correction terminée!"
