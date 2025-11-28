#!/bin/bash

# Script pour remplacer les imports et utilisations de Role enum par des strings

echo "🔧 Fixing Role imports in admin pages..."

# Trouver tous les fichiers TypeScript dans app/[locale]/admin
find /Users/richard/preprod/justrichard/app/\[locale\]/admin -name "*.tsx" -type f | while read file; do
  echo "Processing: $file"
  
  # Supprimer l'import de Role
  sed -i '' '/import.*Role.*from.*@prisma\/client/d' "$file"
  
  # Remplacer Role.ADMIN par 'ADMIN'
  sed -i '' "s/Role\.ADMIN/'ADMIN'/g" "$file"
  
  # Remplacer Role.MANAGER par 'MANAGER'
  sed -i '' "s/Role\.MANAGER/'MANAGER'/g" "$file"
  
  # Remplacer Role.PROVIDER par 'PROVIDER'
  sed -i '' "s/Role\.PROVIDER/'PROVIDER'/g" "$file"
  
  # Remplacer Role.CUSTOMER par 'CUSTOMER'
  sed -i '' "s/Role\.CUSTOMER/'CUSTOMER'/g" "$file"
done

echo "✅ Done! All Role references have been replaced with strings."
