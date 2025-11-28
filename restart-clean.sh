#!/bin/bash

echo "🧹 Nettoyage du cache Next.js..."
rm -rf .next

echo "🧹 Nettoyage du cache TypeScript..."
rm -rf .tsbuildinfo

echo "✅ Nettoyage terminé!"
echo ""
echo "🚀 Redémarrez maintenant avec:"
echo "   npm run dev"
echo ""
echo "Puis testez:"
echo "   http://localhost:3100/en/admin/properties"
