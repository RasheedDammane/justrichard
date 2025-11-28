#!/bin/bash

echo "🔄 Redémarrage du serveur Next.js..."

# Trouver et tuer le processus Next.js
echo "🛑 Arrêt du serveur actuel..."
pkill -f "next dev" || echo "Aucun serveur Next.js trouvé"
sleep 2

# Redémarrer le serveur
echo "🚀 Démarrage du serveur..."
cd /Users/richard/preprod/justrichard
npm run dev

echo "✅ Serveur redémarré!"
