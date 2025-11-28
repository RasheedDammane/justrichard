# 🧪 Test des Pages Legal - Guide Complet

## ✅ Fichiers vérifiés

Tous les fichiers sont présents et correctement structurés :

### Admin (5 fichiers)
- ✅ `/app/[locale]/admin/legal/page.tsx` - Liste server
- ✅ `/app/[locale]/admin/legal/LegalProfessionalsClient.tsx` - Liste client
- ✅ `/app/[locale]/admin/legal/LegalProfessionalForm.tsx` - Formulaire
- ✅ `/app/[locale]/admin/legal/new/page.tsx` - Création
- ✅ `/app/[locale]/admin/legal/[id]/page.tsx` - Édition

### Public (4 fichiers)
- ✅ `/app/[locale]/services/legal/page.tsx` - Liste server
- ✅ `/app/[locale]/services/legal/LegalListClient.tsx` - Liste client avec filtres
- ✅ `/app/[locale]/services/legal/LegalFilters.tsx` - Composant filtres
- ✅ `/app/[locale]/services/legal/[slug]/page.tsx` - Page détail

---

## 🧪 TESTS À EFFECTUER

### Prérequis
```bash
# 1. Assure-toi que le serveur tourne
npm run dev

# 2. Vérifie que tu es connecté en tant qu'ADMIN
```

---

## 📋 TEST 1 : Page Admin Liste

### URL
```
http://localhost:3100/fr/admin/legal
```

### Ce qui doit s'afficher
1. **Header** : "Professionnels Légaux"
2. **5 KPI Cards** :
   - Total
   - Publiés
   - Mis en avant (Featured)
   - Brouillons
   - Pays
3. **Bouton** : "Ajouter un Professionnel"
4. **Table** avec colonnes :
   - Nom (+ slug + badge featured si applicable)
   - Type (Avocat / Cabinet / etc.)
   - Localisation (ville, pays)
   - Domaines (2 premiers)
   - Langues
   - Status (badge coloré)
   - Actions (View / Edit)

### Actions à tester
- ✅ Clique "Ajouter un Professionnel" → redirige vers `/fr/admin/legal/new`
- ✅ Clique "Edit" sur un professionnel → redirige vers `/fr/admin/legal/[id]`
- ✅ Clique "View" → ouvre la page publique dans un nouvel onglet

### Résultat attendu
- Si aucun professionnel : table vide avec message
- Si professionnels existent : affichage dans la table
- Stats correctes dans les KPI cards

---

## 📋 TEST 2 : Page Admin Création

### URL
```
http://localhost:3100/fr/admin/legal/new
```

### Ce qui doit s'afficher
1. **Header** : "Nouveau Professionnel Légal"
2. **Instructions** : Texte explicatif sur les champs requis
3. **Formulaire avec 3 onglets** :
   - Base
   - Profil
   - Expertise

### Test du formulaire

#### Onglet "Base"
Champs à remplir :
- **Type** : Avocat / Cabinet / Conseiller / Notaire
- **Status** : Brouillon / Publié / Archivé
- **Nom complet** * : "Maître Sophie Martin"
- **Slug** * : "maitre-sophie-martin" (auto-généré)
- **Email** : "sophie.martin@example.com"
- **Téléphone** : "+33 1 23 45 67 89"
- **Ville** * : "Paris"
- **Pays** * : "France"

#### Onglet "Profil"
- **Bio** : Texte libre
- **Langues** * : Clique FR, EN (multi-select)
- **Années d'expérience** : 15
- **Tarif horaire (min)** : 300
- **Devise** : EUR

#### Onglet "Expertise"
- **Domaines de pratique** * : Clique "Droit des affaires", "Droit fiscal"
- **Featured** : ✓ (checkbox)
- **Actif** : ✓ (checkbox)

### Actions à tester
1. **Validation** :
   - Essaye de sauvegarder sans nom → voir erreur "Le nom est requis"
   - Essaye slug avec espaces → voir erreur format
   - Essaye PUBLISHED sans domaines → voir erreur

2. **Auto-génération slug** :
   - Tape "Maître Jean Dupont" dans Nom
   - Vérifie que slug devient "maitre-jean-dupont"

3. **Sauvegarde** :
   - Remplis tous les champs requis
   - Clique "Sauvegarder"
   - Vérifie redirection vers `/fr/admin/legal`
   - Vérifie que le professionnel apparaît dans la liste

### Résultat attendu
- ✅ Formulaire s'affiche correctement
- ✅ Onglets fonctionnent
- ✅ Validation fonctionne
- ✅ Auto-génération slug fonctionne
- ✅ Sauvegarde réussie
- ✅ Redirection vers liste

---

## 📋 TEST 3 : Page Publique Liste

### URL
```
http://localhost:3100/fr/services/legal
```

### Ce qui doit s'afficher
1. **Hero Section** :
   - Titre : "Expert Lawyers & Legal Consultation"
   - Breadcrumb : Home / Services / Legal Services
   - 4 stats cards (50+ Lawyers, 1,200+ Cases, 4.8★, 24/7)

2. **Section Services** :
   - 6 cards de services (Legal Consultation, Contract Drafting, etc.)

3. **Section "Trouvez Votre Professionnel Légal"** :
   - **Filtres** :
     - Barre de recherche
     - Bouton "Filtres avancés"
   - **Compteur de résultats** : "X professionnels trouvés"
   - **Grid de cards professionnels**

### Test des filtres

#### Filtres de base
1. **Recherche** :
   - Tape "Sophie" → voir résultats filtrés
   - Tape "Martin" → voir résultats filtrés
   - Efface → voir tous les résultats

2. **Filtres avancés** :
   - Clique "Filtres avancés" → panneau s'ouvre
   - **Type** : Sélectionne "Avocat" → voir résultats
   - **Domaine** : Sélectionne "Droit des affaires" → voir résultats
   - **Langue** : Sélectionne "FR" → voir résultats
   - **Ville** : Tape "Paris" → voir résultats
   - **Pays** : Tape "France" → voir résultats

3. **Combinaison de filtres** :
   - Active plusieurs filtres en même temps
   - Vérifie que le compteur de filtres actifs s'affiche
   - Vérifie que les résultats correspondent

4. **Réinitialiser** :
   - Clique "Réinitialiser" → tous les filtres se vident
   - Vérifie que tous les résultats réapparaissent

### Test des cards professionnels

Chaque card doit afficher :
- Photo de profil (ou icône ⚖️ par défaut)
- Nom du professionnel
- Type (Avocat / Cabinet / etc.)
- Badge "★ Featured" si featured
- Domaines de pratique (2 premiers)
- Années d'expérience
- Langues
- Localisation (ville, pays)
- Headline (si présent)
- Bouton "Voir le profil"

### Actions à tester
- ✅ Clique sur une card → redirige vers page détail
- ✅ Hover sur card → effet shadow
- ✅ Responsive : teste sur mobile (grid s'adapte)

### Résultat attendu
- ✅ Filtres fonctionnent en temps réel
- ✅ Compteur de résultats correct
- ✅ Cards s'affichent correctement
- ✅ Message "Aucun résultat" si filtres trop restrictifs
- ✅ Responsive

---

## 📋 TEST 4 : Page Détail Professionnel

### URL (exemple)
```
http://localhost:3100/fr/services/legal/maitre-sophie-martin
```

### Ce qui doit s'afficher

#### 1. Hero Section
- **Cover image** (si définie) ou gradient bleu
- **Breadcrumb** : Home / Services / Legal / [Nom]
- **Profile card** :
  - Photo de profil (ou icône)
  - Nom
  - Type
  - Badge "Featured" si applicable
  - Headline
  - Quick info : localisation, expérience, langues
  - Badges domaines de pratique

#### 2. Contenu principal (2 colonnes)

**Colonne gauche** :
- **À propos** : Bio complète
- **Domaines d'expertise** : Grid avec icônes
- **Services proposés** : Liste des services (si définis)
- **Qualifications** : Licence, Barreau, Année

**Colonne droite (sidebar sticky)** :
- **Bouton réservation** : "Prendre rendez-vous" (si bookingUrl)
- **Contact** :
  - Email (lien mailto:)
  - Téléphone (lien tel:)
  - Site web (lien externe)
- **Adresse** : Adresse complète
- **Infos** :
  - Temps de réponse
  - "Accepte de nouveaux clients" (si true)

### Actions à tester
1. **Navigation** :
   - Clique breadcrumb → retour aux pages précédentes
   
2. **Contact** :
   - Clique email → ouvre client email
   - Clique téléphone → ouvre dialer (mobile)
   - Clique site web → ouvre dans nouvel onglet

3. **Réservation** :
   - Si bookingUrl défini : clique bouton → ouvre URL booking

4. **Responsive** :
   - Desktop : 2 colonnes
   - Mobile : 1 colonne, sidebar en bas

### Résultat attendu
- ✅ Toutes les sections s'affichent
- ✅ Données correctes
- ✅ Liens fonctionnent
- ✅ Sidebar sticky sur desktop
- ✅ Responsive
- ✅ 404 si slug invalide

---

## 🎯 Checklist complète

### Admin
- [ ] Page liste s'affiche avec stats
- [ ] Bouton "Ajouter" fonctionne
- [ ] Formulaire création s'affiche
- [ ] Validation fonctionne
- [ ] Auto-génération slug fonctionne
- [ ] Sauvegarde réussie
- [ ] Professionnel apparaît dans liste
- [ ] Bouton "Edit" fonctionne
- [ ] Formulaire édition pré-rempli

### Public Liste
- [ ] Hero s'affiche
- [ ] Services s'affichent
- [ ] Filtres s'affichent
- [ ] Recherche fonctionne
- [ ] Filtres avancés fonctionnent
- [ ] Compteur de résultats correct
- [ ] Cards professionnels s'affichent
- [ ] Badges featured visibles
- [ ] Bouton "Voir le profil" fonctionne
- [ ] Responsive

### Public Détail
- [ ] Hero s'affiche
- [ ] Breadcrumb fonctionne
- [ ] Profile card complète
- [ ] Bio s'affiche
- [ ] Domaines d'expertise s'affichent
- [ ] Services s'affichent (si définis)
- [ ] Qualifications s'affichent
- [ ] Sidebar contact s'affiche
- [ ] Liens contact fonctionnent
- [ ] Bouton réservation fonctionne (si défini)
- [ ] Responsive
- [ ] 404 si slug invalide

---

## 🐛 Problèmes potentiels

### Si page admin ne s'affiche pas
1. Vérifie que tu es connecté en tant qu'ADMIN
2. Vérifie la console navigateur pour erreurs
3. Vérifie que le modèle Prisma est bien migré : `npx prisma db push`

### Si page publique vide
1. Vérifie qu'il y a des professionnels avec status=PUBLISHED et isActive=true
2. Vérifie la console pour erreurs

### Si filtres ne fonctionnent pas
1. Ouvre la console navigateur
2. Vérifie les erreurs React
3. Vérifie que LegalListClient est bien importé

### Si page détail 404
1. Vérifie que le slug existe en DB
2. Vérifie que status=PUBLISHED et isActive=true
3. Vérifie l'URL (pas d'espaces, lowercase)

---

## ✅ Résultat attendu final

Après tous les tests, tu devrais avoir :
- ✅ Admin fonctionnel pour gérer les professionnels
- ✅ Page publique avec filtres avancés
- ✅ Page détail complète et responsive
- ✅ Validation robuste
- ✅ Aucune erreur console

---

## 🎉 Si tout fonctionne

**Le module Legal est 100% opérationnel ! 🚀**

Tu peux maintenant :
1. Créer des professionnels réels
2. Les publier sur le site
3. Partager les liens aux clients

---

**Date**: 2025-11-24  
**Version**: 2.0.0  
**Status**: ✅ READY TO TEST
