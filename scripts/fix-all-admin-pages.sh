#!/bin/bash

echo "🔧 Fixing all admin pages for UserRole relations..."

# Trouver tous les fichiers qui utilisent prisma.user.findMany ou findUnique
find /Users/richard/preprod/justrichard/app/\[locale\]/admin -name "*.tsx" -type f | while read file; do
  
  # Vérifier si le fichier contient des références à user.findMany ou user.findUnique
  if grep -q "prisma\.user\.find" "$file"; then
    echo "Processing: $file"
    
    # Remplacer profile: true par UserRole avec Role
    sed -i '' 's/profile: true/UserRole: { include: { Role: true } }/g' "$file"
    
    # Remplacer bookings par Booking
    sed -i '' 's/bookings: true/Booking: true/g' "$file"
    
    # Remplacer reviews par Review
    sed -i '' 's/reviews: true/Review: true/g' "$file"
    
    # Remplacer addresses par (rien car n'existe pas)
    sed -i '' 's/addresses: true,//g' "$file"
    sed -i '' 's/addresses: true//g' "$file"
    
    # Remplacer user.role par user.roleName dans les conditions
    sed -i '' "s/user\.role === /user.roleName === /g" "$file"
    
    # Remplacer user.name par firstName + lastName
    sed -i '' "s/user\.name/(\`\${user.firstName || ''} \${user.lastName || ''}\`.trim() || user.email)/g" "$file"
  fi
done

echo "✅ Done! All admin pages have been fixed."
