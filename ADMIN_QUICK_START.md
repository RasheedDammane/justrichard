# 🚀 Guide de Démarrage Rapide - Admin Panel

## Démarrage du Serveur

```bash
cd /Users/richard/preprod/justrichard
npm run dev
```

Le serveur démarre sur **http://localhost:3100**

---

## 🔑 Accès Admin

### URL de Connexion:
```
http://localhost:3100/en/auth/login
```

### Identifiants Requis:
- **Rôle**: ADMIN ou MANAGER
- Utilisez vos identifiants configurés dans la base de données

---

## 📍 Navigation Rapide

### Dashboard Principal
```
http://localhost:3100/en/admin
```
**Affiche**:
- 4 statistiques principales (Users, Bookings, Services, Revenue)
- Répartition des réservations par type
- Répartition des réservations par statut
- Tableau des 10 dernières réservations
- Alertes d'erreurs non résolues

---

### Settings → Currencies (Devises)
```
http://localhost:3100/en/admin/currencies
```
**Actions disponibles**:
1. **Ajouter une devise**: Cliquez sur "Ajouter une devise"
2. **Mettre à jour les taux**: Cliquez sur "Mettre à jour les taux"
3. **Définir par défaut**: Icône étoile
4. **Activer/Désactiver**: Cliquez sur le badge de statut
5. **Modifier**: Icône crayon
6. **Supprimer**: Icône poubelle

---

### Settings → Countries/Cities (Géographie)
```
http://localhost:3100/en/admin/geography
```
**Fonctionnalités**:
1. Vue d'ensemble des pays avec statistiques
2. Cliquez sur une carte pays pour voir les détails
3. Modal avec toutes les régions et villes

---

## 🎨 Utilisation du Sidebar

### Menu Principal:
- **Dashboard**: Vue d'ensemble
- **Users**: Gestion des utilisateurs
- **Services**: Gestion des services
- **Bookings**: Gestion des réservations
- **Categories**: Catégories de services
- **Partners**: Partenaires
- **Blog**: Articles de blog
- **Analytics**: Statistiques avancées
- **Logs**: Journaux système

### Menu Settings (déroulant):
Cliquez sur **Settings** pour afficher:
- **Currencies**: Gestion des devises
- **Countries**: Pays et régions
- **Cities**: Villes

### Collapse/Expand:
- Cliquez sur l'icône hamburger (☰) en haut à gauche
- Le sidebar se réduit/agrandit

---

## 📊 Comprendre le Dashboard

### Cartes de Statistiques:

#### 1. Total Users (Bleu)
- Nombre total d'utilisateurs inscrits
- Tous rôles confondus

#### 2. Total Bookings (Vert)
- Nombre total de réservations
- Tous statuts confondus

#### 3. Active Services (Violet)
- Services actuellement actifs
- Disponibles à la réservation

#### 4. Total Revenue (Orange)
- Revenu total des réservations
- Uniquement statuts: confirmed + completed

---

### Graphiques de Répartition:

#### Réservations par Type:
Affiche la distribution des réservations selon leur type
- Service booking
- Event booking
- Property rental
- Etc.

#### Réservations par Statut:
Affiche la distribution selon le statut
- 🟡 **Pending**: En attente
- 🟢 **Confirmed**: Confirmées
- 🔵 **Completed**: Terminées
- 🔴 **Cancelled**: Annulées

---

### Tableau des Réservations:

**Colonnes**:
1. **Client**: Avatar + Nom + Email
2. **Type**: Type de réservation + ID court
3. **Date Début**: Date de début de la réservation
4. **Statut**: Badge coloré selon le statut
5. **Total**: Montant en USD

**Actions**:
- Cliquez sur "Voir tout →" pour accéder à la page complète des réservations

---

## 💰 Gestion des Devises

### Ajouter une Devise:

1. Cliquez sur **"Ajouter une devise"**
2. Remplissez le formulaire:
   - **Code ISO 4217**: 3 lettres (ex: USD, EUR, MAD)
   - **Nom**: Nom complet (ex: US Dollar, Euro, Dirham)
   - **Symbole**: Symbole monétaire (ex: $, €, DH)
   - **Décimales**: 0 à 4 (généralement 2)
   - **Active**: Cochez si la devise est active
   - **Par défaut**: Cochez pour définir comme devise par défaut
3. Cliquez sur **"Créer"**

### Mettre à Jour les Taux de Change:

1. **Prérequis**: Une devise par défaut doit être définie
2. Cliquez sur **"Mettre à jour les taux"**
3. Le système récupère les taux depuis une API externe
4. Notification avec le nombre de taux créés/mis à jour

### Définir une Devise par Défaut:

1. Trouvez la devise dans le tableau
2. Cliquez sur l'icône **étoile** (⭐)
3. La devise devient la devise par défaut
4. L'ancienne devise par défaut perd ce statut

---

## 🌍 Gestion Géographique

### Consulter les Pays:

1. Accédez à **Settings → Countries**
2. Vue en grille avec cartes pays
3. Chaque carte affiche:
   - Drapeau emoji
   - Nom du pays (FR + AR si disponible)
   - Code pays (ISO 2 lettres)
   - Indicatif téléphonique
   - Devise utilisée
   - Nombre de régions
   - Nombre de villes

### Voir les Détails d'un Pays:

1. Cliquez sur une carte pays
2. Modal avec:
   - Nom du pays
   - Liste des régions
   - Pour chaque région:
     - Nom (FR + AR)
     - Liste des villes
     - Icônes distinctives

---

## 🔍 Recherche et Filtres

### Tableau des Devises:
- Recherche par code, nom ou symbole
- Tri par colonne (cliquez sur l'en-tête)
- Filtrage par statut (actif/inactif)

### Tableau des Réservations:
- Filtrage par statut
- Filtrage par type
- Tri par date
- Recherche par client

---

## ⚠️ Alertes et Notifications

### Erreurs Non Résolues:
- Affichées en haut du dashboard
- Fond rouge avec icône d'alerte
- Liste des 3 dernières erreurs
- Lien vers la page complète des logs

### Messages de Confirmation:
- Succès: Fond vert
- Erreur: Fond rouge
- Avertissement: Fond jaune
- Info: Fond bleu

---

## 🎯 Raccourcis Clavier (À venir)

```
Ctrl/Cmd + K    → Recherche globale
Ctrl/Cmd + B    → Toggle sidebar
Ctrl/Cmd + D    → Dashboard
Ctrl/Cmd + U    → Users
Ctrl/Cmd + S    → Services
```

---

## 📱 Version Mobile

### Navigation:
1. Menu hamburger en haut à gauche
2. Sidebar en overlay
3. Cliquez en dehors pour fermer

### Tableaux:
- Scroll horizontal automatique
- Colonnes essentielles visibles
- Actions accessibles

---

## 🆘 Support et Aide

### En cas de problème:

1. **Vérifier les logs**:
   ```
   Admin → Logs
   ```

2. **Vérifier la console navigateur**:
   ```
   F12 → Console
   ```

3. **Redémarrer le serveur**:
   ```bash
   Ctrl+C
   npm run dev
   ```

4. **Vérifier la base de données**:
   ```bash
   npm run db:studio
   ```

---

## 📚 Documentation Complète

Pour plus de détails, consultez:
- **ADMIN_PANEL_DOCUMENTATION.md**: Documentation technique complète
- **README.md**: Documentation générale du projet

---

**Bon travail! 🎉**
