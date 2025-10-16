# Guide de Démarrage Rapide

## 🚀 Installation et Lancement

### Prérequis
- **Node.js 18+** (https://nodejs.org)
- **PostgreSQL** (ou utiliser Docker)

### Installation de Node.js (si nécessaire)

#### Sur macOS avec Homebrew
```bash
brew install node
```

#### Ou télécharger depuis
https://nodejs.org/en/download/

### Étape 1 : Installer les dépendances
```bash
cd /Users/richard/justrichard
npm install
```

### Étape 2 : Démarrer PostgreSQL

#### Option A : Avec Docker (Recommandé)
```bash
docker-compose up -d postgres
```

#### Option B : PostgreSQL local
Assurez-vous que PostgreSQL est démarré sur votre machine.

### Étape 3 : Configurer l'environnement
```bash
# Copier le fichier d'exemple
cp .env.example .env

# Éditer .env si nécessaire (DATABASE_URL, etc.)
```

### Étape 4 : Initialiser la base de données
```bash
# Générer le client Prisma
npm run db:generate

# Créer les tables
npm run db:push

# Insérer les données de test
npm run db:seed
```

### Étape 5 : Lancer le serveur
```bash
npm run dev
```

Le serveur démarre sur **http://localhost:3000**

## 🎭 Page de Démonstration

### Accéder à la page de démo
```
http://localhost:3000/en/demo
```

### Comptes de test disponibles

#### 👑 Admin (Accès complet)
- **Email** : admin@communityhub.com
- **Password** : admin123
- **Accès** : Dashboard admin complet, gestion de tout

#### 👤 Client (Utilisateur standard)
- **Email** : customer@test.com
- **Password** : customer123
- **Accès** : Réserver des services, gérer son profil

#### 🏢 Partenaire (Prestataire)
- **Email** : partner@example.com
- **Password** : partner123
- **Accès** : Dashboard partenaire, gérer ses services

#### 👥 Manager (Gestionnaire)
- **Email** : manager@communityhub.com
- **Password** : manager123
- **Accès** : Admin limité (pas de gestion users/partners)

## 📍 URLs Importantes

### Pages Publiques
- **Accueil** : http://localhost:3000/en
- **Services** : http://localhost:3000/en/services
- **Login** : http://localhost:3000/en/auth/login
- **Signup** : http://localhost:3000/en/auth/signup
- **Demo** : http://localhost:3000/en/demo

### Pages Admin (Nécessite connexion Admin/Manager)
- **Dashboard** : http://localhost:3000/en/admin
- **Services** : http://localhost:3000/en/admin/services
- **Utilisateurs** : http://localhost:3000/en/admin/users
- **Réservations** : http://localhost:3000/en/admin/bookings
- **Catégories** : http://localhost:3000/en/admin/categories
- **Partenaires** : http://localhost:3000/en/admin/partners
- **Chatbots** : http://localhost:3000/en/admin/chatbots

### Import JSON
- **Import Partenaires** : http://localhost:3000/en/admin/partners/import
- **Import Chatbots** : http://localhost:3000/en/admin/chatbots/import

### Pages Utilisateur (Nécessite connexion)
- **Profil** : http://localhost:3000/en/profile
- **Réservations** : http://localhost:3000/en/bookings

### Multilingue
- **Anglais** : /en/*
- **Arabe** : /ar/* (RTL)
- **Français** : /fr/*
- **Thaï** : /th/*

## 🧪 Tester les Fonctionnalités

### 1. Tester l'Admin
```
1. Aller sur /en/demo
2. Cliquer "Se connecter" sur la carte Admin
3. Vous êtes redirigé vers le dashboard admin
4. Explorer : Services, Users, Bookings, Categories, Partners, Chatbots
```

### 2. Tester l'Import de Partenaires
```
1. Se connecter en tant qu'Admin
2. Aller sur /en/admin/partners
3. Cliquer "Importer JSON"
4. Upload le fichier data/partners-example.json
5. Cliquer "Importer les Partenaires"
6. Voir le rapport d'import
```

### 3. Tester l'Import de Chatbots
```
1. Se connecter en tant qu'Admin
2. Aller sur /en/admin/chatbots
3. Cliquer "Importer JSON"
4. Upload le fichier data/chatbots-cleaning.json
5. Optionnel : Sélectionner un partenaire
6. Cliquer "Importer le Chatbot"
```

### 4. Tester le Client
```
1. Aller sur /en/demo
2. Cliquer "Se connecter" sur la carte Client
3. Parcourir les services
4. Créer une réservation
5. Voir son profil et ses réservations
```

## 🗄️ Base de Données

### Accéder à Prisma Studio
```bash
npm run db:studio
```
Ouvre une interface graphique sur http://localhost:5555

### Réinitialiser la base de données
```bash
npm run db:push
npm run db:seed
```

## 🐛 Dépannage

### Port 3000 déjà utilisé
```bash
# Tuer le processus
lsof -ti:3000 | xargs kill -9

# Ou utiliser un autre port
PORT=3001 npm run dev
```

### Erreur de connexion PostgreSQL
```bash
# Vérifier que PostgreSQL est démarré
docker-compose ps

# Redémarrer
docker-compose restart postgres
```

### Erreur Prisma Client
```bash
npm run db:generate
```

### Erreur de dépendances
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📦 Commandes Utiles

```bash
# Développement
npm run dev              # Démarrer le serveur de dev
npm run build            # Build pour production
npm start                # Démarrer en production

# Base de données
npm run db:generate      # Générer Prisma Client
npm run db:push          # Pousser le schéma
npm run db:migrate       # Créer une migration
npm run db:seed          # Seed les données
npm run db:studio        # Ouvrir Prisma Studio

# Tests
npm test                 # Tests unitaires
npm run test:e2e         # Tests E2E

# Code
npm run lint             # Linter
```

## 🎯 Prochaines Étapes

1. ✅ Serveur lancé
2. ✅ Base de données initialisée
3. ✅ Comptes de test créés
4. 🎭 Tester la page /demo
5. 🔐 Se connecter avec différents comptes
6. 📦 Importer des partenaires
7. 🤖 Importer des chatbots
8. 🎨 Personnaliser le design
9. 🚀 Déployer en production

## 📚 Documentation

- **README.md** - Documentation générale
- **QUICKSTART.md** - Guide rapide 5 minutes
- **DEPLOYMENT.md** - Guide de déploiement
- **FEATURES.md** - Liste des fonctionnalités
- **UPDATES.md** - Mises à jour récentes
- **IMPORT_SYSTEM.md** - Système d'import JSON
- **SETUP.md** - Ce fichier

## 🆘 Support

Si vous rencontrez des problèmes :
1. Vérifier que Node.js 18+ est installé
2. Vérifier que PostgreSQL est démarré
3. Vérifier le fichier .env
4. Consulter la documentation

Bon développement ! 🚀
