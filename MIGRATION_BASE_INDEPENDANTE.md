# 🔄 MIGRATION VERS BASE DE DONNÉES INDÉPENDANTE

**Date** : 20 Novembre 2025  
**Objectif** : Créer une base de données et un port complètement indépendants de OuiBooking  
**Status** : À faire

---

## 🎯 PROBLÈME ACTUEL

### Configuration Actuelle (INCORRECTE)
```
Application : JustRichard
Port        : 3000 (conflit potentiel)
Database    : justrichard_preprod (sur port 5434 de OuiBooking)
Host        : localhost:5434 (PARTAGÉ avec OuiBooking)
```

**Problème** : Dépendance à l'infrastructure OuiBooking

---

## ✅ NOUVELLE CONFIGURATION (INDÉPENDANTE)

### Configuration Cible
```
Application : JustRichard
Port        : 3100 (UNIQUE)
Database    : justrichard
Host        : localhost:5432 (PostgreSQL standard)
User        : justrichard
Password    : justrichard123
```

---

## 📋 ÉTAPES DE MIGRATION

### 1. Créer la Nouvelle Base de Données

```bash
# Se connecter à PostgreSQL
psql -U postgres

# Créer l'utilisateur
CREATE USER justrichard WITH PASSWORD 'justrichard123';

# Créer la base de données
CREATE DATABASE justrichard OWNER justrichard;

# Donner tous les privilèges
GRANT ALL PRIVILEGES ON DATABASE justrichard TO justrichard;

# Quitter
\q
```

### 2. Mettre à Jour .env

```bash
# Copier l'exemple
cp .env.example .env

# Éditer .env
nano .env
```

**Nouveau contenu .env** :
```env
# Database (PostgreSQL) - INDÉPENDANT
DATABASE_URL="postgresql://justrichard:justrichard123@localhost:5432/justrichard?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3100"
NEXTAUTH_SECRET="votre-secret-genere-avec-openssl"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3100"
PORT=3100

# Stripe (optionnel)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""

# Email (optionnel)
RESEND_API_KEY=""
EMAIL_FROM="noreply@justrichard.com"
```

### 3. Modifier package.json pour le Port

```json
{
  "scripts": {
    "dev": "next dev -p 3100",
    "start": "next start -p 3100"
  }
}
```

### 4. Appliquer le Schéma Prisma

```bash
# Générer le client Prisma
npm run db:generate

# Appliquer le schéma à la nouvelle base
npm run db:push

# Vérifier
npx prisma studio
```

### 5. Seeder les Données Initiales

```bash
# Seeder les données CMS
npm run db:seed:cms

# Seeder les liens navbar
npm run db:update:navbar

# (Optionnel) Seeder d'autres données
npm run db:seed
```

### 6. Tester l'Application

```bash
# Démarrer le serveur
npm run dev

# Ouvrir dans le navigateur
http://localhost:3100/en
```

---

## 🗂️ STRUCTURE FINALE

```
/Users/richard/preprod/justrichard/
├── .env (PORT=3100, DB=justrichard)
├── package.json (port 3100)
├── prisma/
│   └── schema.prisma (DATABASE_URL depuis .env)
└── app/ (application Next.js)

Base de données PostgreSQL:
├── localhost:5432 (PostgreSQL standard)
│   └── justrichard (base indépendante)
│       ├── User
│       ├── BlogPost
│       ├── NavbarLink
│       ├── FooterContent
│       └── ... (tous les modèles)
```

---

## 🔍 VÉRIFICATIONS

### Vérifier que tout est indépendant

```bash
# 1. Vérifier le port de l'application
npm run dev
# → Doit afficher: http://localhost:3100

# 2. Vérifier la connexion DB
npx prisma studio
# → Doit ouvrir sur la base justrichard

# 3. Vérifier les données
psql -U justrichard -d justrichard -c "\dt"
# → Doit lister toutes les tables

# 4. Tester l'application
curl http://localhost:3100/en
# → Doit retourner 200 OK
```

---

## ⚠️ IMPORTANT

### Avant de Migrer

1. **Sauvegarder** les données actuelles si nécessaire
2. **Arrêter** le serveur actuel
3. **Vérifier** que PostgreSQL est installé et actif
4. **Tester** la connexion à la nouvelle base

### Après Migration

1. **Ne plus utiliser** le port 5434 (OuiBooking)
2. **Ne plus utiliser** la base justrichard_preprod
3. **Utiliser uniquement** :
   - Port : 3100
   - Base : justrichard (localhost:5432)

---

## 🚀 COMMANDES RAPIDES

### Créer la Base (Une Seule Fois)

```bash
# Script automatique
cat > setup-db.sh << 'EOF'
#!/bin/bash
echo "🔧 Création de la base de données JustRichard..."

# Créer l'utilisateur et la base
psql -U postgres << SQL
CREATE USER justrichard WITH PASSWORD 'justrichard123';
CREATE DATABASE justrichard OWNER justrichard;
GRANT ALL PRIVILEGES ON DATABASE justrichard TO justrichard;
\q
SQL

echo "✅ Base de données créée!"
echo "📊 Connexion: postgresql://justrichard:justrichard123@localhost:5432/justrichard"
EOF

chmod +x setup-db.sh
./setup-db.sh
```

### Migrer Complètement

```bash
# 1. Créer la base
./setup-db.sh

# 2. Mettre à jour .env
echo 'DATABASE_URL="postgresql://justrichard:justrichard123@localhost:5432/justrichard?schema=public"' > .env
echo 'NEXTAUTH_URL="http://localhost:3100"' >> .env
echo 'NEXT_PUBLIC_APP_URL="http://localhost:3100"' >> .env
echo 'PORT=3100' >> .env

# 3. Appliquer le schéma
npm run db:generate
npm run db:push

# 4. Seeder les données
npm run db:seed:cms
npm run db:update:navbar

# 5. Démarrer
npm run dev
```

---

## 📊 COMPARAISON

### Avant (Dépendant)
```
┌─────────────────────────────────┐
│      OuiBooking (Port 3002)     │
│  PostgreSQL localhost:5434      │
│  ├── ouibooking                 │
│  └── justrichard_preprod ❌     │
└─────────────────────────────────┘
```

### Après (Indépendant)
```
┌─────────────────────────────────┐
│   PostgreSQL localhost:5432     │
│   (Standard PostgreSQL)         │
│                                 │
│   ├── justrichard ✅            │
│   │   (Port 3100)               │
│   │                             │
│   └── (autres bases...)         │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│   PostgreSQL localhost:5434     │
│   (OuiBooking uniquement)       │
│                                 │
│   └── ouibooking                │
│       (Port 3002)               │
└─────────────────────────────────┘
```

---

## ✅ AVANTAGES

1. **Indépendance totale** : Pas de dépendance à OuiBooking
2. **Port unique** : 3100 (pas de conflit)
3. **Base dédiée** : justrichard sur port standard 5432
4. **Maintenance facile** : Chaque app a sa propre base
5. **Déploiement simple** : Pas de configuration partagée

---

## 🎯 RÉSULTAT FINAL

```
JustRichard
├── Port : 3100 ✅
├── Base : justrichard (localhost:5432) ✅
├── User : justrichard ✅
└── Complètement indépendant ✅

OuiBooking
├── Port : 3002 ✅
├── Base : ouibooking (localhost:5434) ✅
└── Pas d'impact ✅
```

---

**Prêt à migrer ? Suivez les étapes ci-dessus !**
