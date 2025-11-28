# 🚀 COMMANDES RAPIDES - JUSTRICHARD PREPROD

## ⚡ DÉMARRAGE RAPIDE

```bash
# Démarrer Docker + Serveur en 1 commande
./docker-start.sh && npm run dev
```

**Votre site:** http://localhost:3254  
**PostgreSQL:** localhost:3100  
**Adminer:** http://localhost:8081  

---

## 📦 EXPORT/IMPORT DES DONNÉES

### Exporter TOUTES les données (CSV + JSON)
```bash
npx tsx scripts/export-all-data.ts
```
📁 **Résultat:** `exports/csv/` et `exports/json/`

### Importer les données
```bash
npx tsx scripts/import-all-data.ts
```
✅ **Restaure tout depuis le dernier export**

---

## 🗄️ DOCKER

```bash
./docker-start.sh       # Démarrer PostgreSQL + Redis
./docker-status.sh      # Vérifier l'état
./docker-backup.sh      # Backup de la base
./docker-stop.sh        # Arrêter tout
./docker-restart.sh     # Redémarrer
```

---

## 🌱 SEEDS

### Food & Grocery (fonctionne!)
```bash
npx tsx prisma/seeds/food-products.ts
```

### Autres modules
```bash
# À créer selon vos besoins
npx tsx prisma/seed-yachts.ts
npx tsx prisma/seed-rental-cars.ts
# etc...
```

---

## 🔧 PRISMA

```bash
npx prisma studio          # Interface graphique DB
npx prisma migrate dev     # Appliquer migrations
npx prisma generate        # Regénérer le client
npx prisma db push         # Push sans migration
```

---

## 💾 BACKUP & RESTORE

### Backup auto (recommandé avant changements)
```bash
./docker-backup.sh
# Crée: backups/preprod_justrichard_YYYYMMDD_HHMMSS.sql.gz
```

### Restore un backup
```bash
./docker-restore.sh
# Liste les backups disponibles et restaure au choix
```

### Export données en CSV/JSON
```bash
npx tsx scripts/export-all-data.ts
# Exporte dans exports/csv/ et exports/json/
```

### Import données
```bash
npx tsx scripts/import-all-data.ts
# Importe depuis exports/json/all-data-*.json
```

---

## 🌐 URLS IMPORTANTES

| Service | URL |
|---------|-----|
| **Site** | http://localhost:3254 |
| **Food Shop** | http://localhost:3254/en/food |
| **Admin** | http://localhost:3254/en/admin |
| **Adminer** | http://localhost:8081 |
| **PgAdmin** | http://localhost:5050 |
| **Prisma Studio** | http://localhost:5555 |

---

## 🔄 WORKFLOW QUOTIDIEN

### Matin
```bash
./docker-start.sh    # Démarrer Docker
npm run dev          # Démarrer l'app
```

### Avant de quitter
```bash
# Optionnel: Exporter les données
npx tsx scripts/export-all-data.ts

# Optionnel: Arrêter Docker (ou laisser tourner)
./docker-stop.sh
```

### Après redémarrage PC
```bash
# 1. Démarrer Docker
./docker-start.sh

# 2. Si besoin, réimporter les données
npx tsx scripts/import-all-data.ts

# 3. Démarrer l'app
npm run dev
```

---

## 🆘 EN CAS DE PROBLÈME

### Base de données vide
```bash
# Option 1: Importer les données sauvegardées
npx tsx scripts/import-all-data.ts

# Option 2: Re-seed Food
npx tsx prisma/seeds/food-products.ts
```

### Erreur de connexion
```bash
./docker-status.sh     # Vérifier l'état
./docker-restart.sh    # Redémarrer
```

### Port déjà utilisé
```bash
# Trouver qui utilise le port
lsof -i :3254

# Tuer le processus
kill -9 <PID>
```

### Reset complet
```bash
./docker-reset.sh      # ⚠️ Efface TOUT!
./docker-start.sh      # Redémarrer
npx tsx scripts/import-all-data.ts  # Restaurer
```

---

## 📊 ÉTAT ACTUEL DE LA BASE

**Données exportées (dernier export):**
- ✅ 6 catégories Food
- ✅ 5 marques Food
- ✅ 16 produits Food
- ✅ 2 zones de livraison
- ✅ 2 coupons

**Modules vides (à remplir):**
- ⏳ Countries / Cities
- ⏳ Yachts
- ⏳ Rental Cars / Motorbikes
- ⏳ Maids
- ⏳ Properties
- ⏳ Doctors / Lawyers / Coaches
- ⏳ Transfers

---

## 🎯 COMMANDES LES PLUS UTILES

```bash
# Démarrer tout
./docker-start.sh && npm run dev

# Exporter les données
npx tsx scripts/export-all-data.ts

# Importer les données
npx tsx scripts/import-all-data.ts

# Backup DB
./docker-backup.sh

# Status
./docker-status.sh
```

---

**Créé le:** 28 novembre 2024  
**Version:** 1.0.0  
**Status:** ✅ OPÉRATIONNEL
