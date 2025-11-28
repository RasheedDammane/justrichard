# 📦 NPM Scripts pour Food & Grocery System

## Scripts à Ajouter dans package.json

Ajoutez ces scripts dans votre `package.json` pour faciliter la gestion du système Food & Grocery:

```json
{
  "scripts": {
    // Scripts existants...
    
    // Food & Grocery Scripts
    "food:migrate": "npx prisma migrate dev --name add_food_grocery_system",
    "food:seed": "npx ts-node prisma/seeds/food-products.ts",
    "food:images": "node scripts/create-food-placeholder-images.js",
    "food:setup": "npm run food:migrate && npm run food:seed && npm run food:images",
    "food:reset": "npx prisma migrate reset --skip-seed && npm run food:seed",
    
    // Database Scripts
    "db:backup": "./scripts/backup-database.sh",
    "db:studio": "npx prisma studio",
    "db:push": "npx prisma db push",
    "db:generate": "npx prisma generate",
    
    // Development Scripts
    "dev:clean": "rm -rf .next && npm run dev",
    "dev:fresh": "npm run food:reset && npm run dev",
    
    // Production Scripts
    "build:prod": "npx prisma generate && next build",
    "start:prod": "next start"
  }
}
```

---

## 🎯 Utilisation des Scripts

### Configuration Initiale (1ère fois)
```bash
# Setup complet du système Food
npm run food:setup
```
Ce script:
1. Applique la migration Prisma
2. Charge les données de seed
3. Génère les images placeholder

### Développement Quotidien

```bash
# Démarrer l'application
npm run dev

# Démarrer avec cache nettoyé
npm run dev:clean

# Reset DB et redémarrer
npm run dev:fresh
```

### Gestion Base de Données

```bash
# Interface graphique Prisma
npm run db:studio

# Backup de la DB
npm run db:backup

# Générer le client Prisma
npm run db:generate

# Push schema sans migration
npm run db:push
```

### Gestion Food Système

```bash
# Appliquer migration Food
npm run food:migrate

# Charger les produits
npm run food:seed

# Créer images placeholder
npm run food:images

# Reset Food system
npm run food:reset
```

### Production

```bash
# Build pour production
npm run build:prod

# Démarrer en production
npm run start:prod
```

---

## 📋 Workflows Courants

### Premier Déploiement
```bash
# 1. Setup initial
npm install
npm run food:setup

# 2. Tester
npm run dev

# 3. Vérifier dans le navigateur
# http://localhost:3001/en/food
```

### Ajout de Nouveaux Produits (via Code)
```bash
# 1. Modifier prisma/seeds/food-products.ts
# 2. Recharger les données
npm run food:seed

# 3. Vérifier
npm run db:studio
```

### Reset Complet du Système
```bash
# ⚠️ ATTENTION: Efface toutes les données!
npm run food:reset

# Ou reset complet de la DB
npx prisma migrate reset
npm run food:seed
```

### Backup Avant Modifications
```bash
# 1. Backup
npm run db:backup

# 2. Faire vos modifications...

# 3. Si problème, restaurer:
# gunzip -c backups/justrichard_backup_XXXXXX.sql.gz | psql $DATABASE_URL
```

---

## 🔧 Scripts Avancés (Optionnels)

Ajoutez ces scripts pour des opérations avancées:

```json
{
  "scripts": {
    // Import/Export
    "food:export": "npx prisma-json-schema-generator && node scripts/export-food-data.js",
    "food:import": "node scripts/import-food-data.js",
    
    // Tests
    "test:food": "jest tests/food --coverage",
    "test:food:watch": "jest tests/food --watch",
    
    // Maintenance
    "food:cleanup": "node scripts/cleanup-old-orders.js",
    "food:stats": "node scripts/food-statistics.js",
    "food:low-stock": "node scripts/check-low-stock.js",
    
    // Migrations
    "migrate:create": "npx prisma migrate dev --create-only",
    "migrate:deploy": "npx prisma migrate deploy",
    "migrate:status": "npx prisma migrate status",
    
    // Format & Lint
    "format": "prettier --write \"**/*.{ts,tsx,js,jsx,json,md}\"",
    "lint": "next lint",
    "lint:fix": "next lint --fix"
  }
}
```

---

## 🎨 Aliases Shell (Optionnel)

Ajoutez dans votre `~/.zshrc` ou `~/.bashrc`:

```bash
# Food & Grocery Aliases
alias food-dev="cd /Users/richard/preprod/justrichard && npm run dev"
alias food-studio="cd /Users/richard/preprod/justrichard && npm run db:studio"
alias food-seed="cd /Users/richard/preprod/justrichard && npm run food:seed"
alias food-reset="cd /Users/richard/preprod/justrichard && npm run food:reset"
alias food-backup="cd /Users/richard/preprod/justrichard && npm run db:backup"

# Rechargez votre shell
source ~/.zshrc  # ou source ~/.bashrc
```

Puis utilisez:
```bash
food-dev      # Démarre l'app
food-studio   # Ouvre Prisma Studio
food-seed     # Recharge les données
food-reset    # Reset le système
food-backup   # Backup la DB
```

---

## 📊 Monitoring Scripts (Production)

```json
{
  "scripts": {
    // Health Checks
    "health:check": "node scripts/health-check.js",
    "health:db": "node scripts/check-db-connection.js",
    
    // Logs
    "logs:error": "tail -f logs/error.log",
    "logs:access": "tail -f logs/access.log",
    "logs:food": "grep 'FOOD' logs/app.log | tail -f",
    
    // Performance
    "perf:analyze": "next build --profile",
    "perf:bundle": "npx @next/bundle-analyzer"
  }
}
```

---

## 🚀 CI/CD Scripts (GitHub Actions)

```json
{
  "scripts": {
    // CI/CD
    "ci:install": "npm ci",
    "ci:test": "npm run test:food && npm run lint",
    "ci:build": "npm run build:prod",
    "ci:migrate": "npx prisma migrate deploy",
    
    // Deployment
    "deploy:staging": "npm run ci:test && npm run ci:build && vercel --prod=false",
    "deploy:production": "npm run ci:test && npm run ci:build && vercel --prod"
  }
}
```

---

## 📖 Documentation des Scripts

### `food:setup`
**Usage:** Configuration initiale du système  
**Quand:** Première installation  
**Effet:** Migration + Seed + Images  
**Durée:** ~30 secondes  

### `food:seed`
**Usage:** Recharger les données de demo  
**Quand:** Après modifications du seed  
**Effet:** Insère produits, catégories, marques  
**Durée:** ~5 secondes  

### `food:reset`
**Usage:** Reset complet du système Food  
**Quand:** Nettoyage complet  
**Effet:** Supprime et recrée toutes les tables  
**Durée:** ~10 secondes  
**⚠️ ATTENTION:** Efface toutes les données!

### `db:studio`
**Usage:** Interface graphique de la DB  
**Quand:** Inspection/modification manuelle  
**Effet:** Ouvre navigateur avec GUI  
**Port:** http://localhost:5555  

### `db:backup`
**Usage:** Sauvegarde de la base de données  
**Quand:** Avant modifications importantes  
**Effet:** Crée fichier .sql.gz dans /backups  
**Durée:** ~5 secondes  

---

## ✅ Checklist Scripts

Après avoir ajouté les scripts, vérifiez:

- [ ] Scripts ajoutés dans package.json
- [ ] `npm install` exécuté
- [ ] `npm run food:setup` fonctionne
- [ ] `npm run dev` démarre l'app
- [ ] `npm run db:studio` ouvre Prisma Studio
- [ ] `npm run db:backup` crée un backup

---

## 🎉 C'est Prêt!

Vous pouvez maintenant utiliser ces commandes simplifiées pour gérer votre système Food & Grocery!

**Commande la plus utile:**
```bash
npm run food:setup    # Setup complet en une commande!
```

---

**Créé le:** 28 novembre 2024  
**Version:** 1.0.0  
**Compatibilité:** Node.js 18+, npm 9+
