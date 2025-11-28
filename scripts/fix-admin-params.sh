#!/bin/bash

# Script pour corriger tous les params dans les pages admin pour Next.js 15

echo "🔧 Fixing admin pages params for Next.js 15..."

# Liste des fichiers à corriger
files=(
  "app/[locale]/admin/lawyers/new/page.tsx"
  "app/[locale]/admin/lawyers/page.tsx"
  "app/[locale]/admin/suppliers/new/page.tsx"
  "app/[locale]/admin/suppliers/page.tsx"
  "app/[locale]/admin/rental-cars/new/page.tsx"
  "app/[locale]/admin/rental-cars/page.tsx"
  "app/[locale]/admin/bookings/new/page.tsx"
  "app/[locale]/admin/bookings/page.tsx"
  "app/[locale]/admin/yachts/new/page.tsx"
  "app/[locale]/admin/yachts/page.tsx"
  "app/[locale]/admin/coaches/new/page.tsx"
  "app/[locale]/admin/coaches/page.tsx"
)

count=0

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "  Fixing: $file"
    
    # Backup
    cp "$file" "$file.bak"
    
    # Fix params destructuring
    sed -i '' 's/{ params: { locale } }: { params: { locale: string } }/{ params }: { params: Promise<{ locale: string }> }/g' "$file"
    
    # Add await params after function declaration
    # This is more complex, we'll do it manually for critical files
    
    ((count++))
  fi
done

echo "✅ Fixed $count files!"
echo "⚠️  Note: You need to manually add 'const { locale } = await params;' after each function declaration"
