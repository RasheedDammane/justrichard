# 📋 SPÉCIFICATIONS COMPLÈTES – MODULE PROPERTIES

**Module** : Gestion avancée des Biens Immobiliers (Properties)  
**Date** : 23 Novembre 2025  
**Objectif** : Avoir un module Properties **ultra complet** mais **très simple à gérer en admin**, avec un maximum d’options (features, media, plans, sous-listings, etc.) et une excellente ergonomie.

---

## 1. Objectifs & Principes

- **Richesse fonctionnelle maximale** (toutes les infos possibles sur un bien) sans rendre l’admin ingérable.
- **Organisation claire** par sections (comme tes captures Create A Listing / WP) :
  - Information, Location, Details, Pricing, Features, Media, Floor Plans, Sub Listings, Contact, Documents, SEO, Settings, Notes
- **Tout configurable sans dev** : features, labels, catégories, unités, etc. gérées via tables de configuration.
- **Intégration forte avec les autres modules** :
  - Media Library (images, documents, plans, vidéos)
  - Currencies & Exchange Rates (prix multi-devises)
  - Routes & Pages (SEO, slug, menus)
  - i18n admin déjà en place
- **Préparation multi-langues** côté contenu (titres, descriptions, meta) via le système i18n existant.

---

## 2. Modèle de Données (Prisma / Concept)

> Ici on décrit les modèles conceptuels. L’implémentation concrète pourra adapter certains champs en `Json` pour rester souple.

### 2.1. Modèle principal `Property`

Champs principaux :

- **Identité & base**
  - `id: String @id @default(cuid())`
  - `slug: String @unique` – utilisé pour l’URL `/properties/[slug]`
  - `title: String` – titre principal
  - `subtitle: String?` – sous-titre / tagline
  - `description: String?` – description longue (rich text côté front)
  - `status: PropertyStatus` – `DRAFT | PUBLISHED | ARCHIVED`
  - `type: PropertyType` – `RENT | SALE | DAILY | HOURLY | INVESTMENT` (enum ou ref config)
  - `isFeatured: Boolean @default(false)` – bien mis en avant
  - `visibility: PropertyVisibility` – `PUBLIC | LOGGED_IN | PRIVATE`

- **Localisation**
  - `addressLine1: String` – adresse
  - `addressLine2: String?`
  - `zipCode: String?`
  - `countryId: String?` → `Country`
  - `stateId: String?` → `State`
  - `cityId: String?` → `City`
  - `areaId: String?` → `Area`
  - `latitude: Float?`
  - `longitude: Float?`
  - `mapZoom: Int?`

- **Détails physiques**
  - `bedrooms: Int?`
  - `bathrooms: Int?`
  - `parkingSpaces: Int?`
  - `garages: Int?`
  - `garageSize: Float?`
  - `garageSizeUnit: String?` (sqft, m²…)
  - `areaSize: Float?`
  - `areaUnit: String?` (sqft, m², etc.)
  - `landArea: Float?`
  - `landAreaUnit: String?`
  - `yearBuilt: Int?`
  - `propertyCode: String?` – ID interne agence (HZ-01…)

- **Prix & Monnaies**
  - `price: Float?`
  - `priceCurrencyId: String?` → `Currency`
  - `pricePostfix: String?` – ex: `per month`, `per day`
  - `oldPrice: Float?` – pour afficher un prix barré
  - `secondaryPriceLabel: String?` – ex: “Promo”, “Starting from”
  - `rentalDetails: Json?` – ex :
    ```json
    {
      "minStay": 3,
      "minStayUnit": "nights",
      "deposit": 1000,
      "depositCurrency": "USD",
      "included": ["Water", "WiFi"],
      "notIncluded": ["Electricity"]
    }
    ```

- **Taxonomie & classification**
  - `propertyTypeId: String?` → `PropertyTypeConfig` (ex: Apartment, Villa…)
  - `categoryIds` via pivot (Residential, Commercial…)
  - `labelIds` via pivot (Featured, New, Hot, OpenHouse…)
  - `tagIds` via pivot (Sea view, Near beach, Luxury…)

- **Meta & options avancées**
  - `expirationDate: DateTime?` – option “Enable Property Expiration”
  - `energyClass: String?` – A+, A, B…
  - `layout: Json?` – infos layout spécifiques (nombre d’étages, orientation, etc.)
  - `privateNote: String?` – note interne (non affichée sur le front)
  - `disclaimer: String?` – texte légal bas de page pour ce bien

- **Relations techniques**
  - `coverImageId: String?` → `Media` (image principale)
  - `authorId: String?` → `User` (agent / propriétaire)
  - `createdAt`, `updatedAt`


### 2.2. Media & Documents

#### 2.2.1. `PropertyMedia`

- `id`
- `propertyId` → `Property`
- `mediaId` → `Media`
- `order: Int` – ordre dans la galerie (drag & drop)
- `label: String?` – ex: “Living Room”, “Kitchen”
- `isCover: Boolean @default(false)` – pour marquer la cover facilement (même si on a aussi `coverImageId` pour optimisation)

#### 2.2.2. `PropertyDocument`

- `id`
- `propertyId`
- `mediaId` (PDF, image plan, contrat…)
- `type: String` – `PLAN | BROCHURE | CONTRACT | MAP | OTHER`
- `title: String?`
- `description: String?`


### 2.3. Features & Amenities

#### 2.3.1. `PropertyFeature`

Catalogue global des features (multi-langue via i18n):

- `id`
- `key: String @unique` – ex: `air-conditioning`, `pool`, `gym`
- `icon: String?` – nom d’icône (Lucide / custom)
- `group: String?` – `INDOOR`, `OUTDOOR`, `SECURITY`, `WELLNESS`…
- `order: Int` – pour afficher dans un ordre précis
- `isActive: Boolean`

#### 2.3.2. Pivot `PropertyPropertyFeature`

- `propertyId`
- `featureId`
- (clé composite unique)


### 2.4. Floor Plans

#### 2.4.1. `FloorPlan`

- `id`
- `propertyId`
- `title: String`
- `bedrooms: Int?`
- `bathrooms: Int?`
- `price: Float?`
- `priceCurrencyId: String?`
- `size: Float?`
- `sizeUnit: String?`
- `imageId: String?` → `Media`
- `description: String?`
- `order: Int`


### 2.5. Sub Listings / Related

#### 2.5.1. Hiérarchie Property

- `parentPropertyId: String?` → `Property`
- `children: Property[]` – unités d’un même building


### 2.6. Contact / Owner

- `ownerId: String?` → `User/Provider`
- `contactPhone: String?`
- `contactEmail: String?`
- `contactWhatsapp: String?`
- `showOwnerOnFront: Boolean @default(true)`


### 2.7. SEO & Routes

On s’appuie sur le module Routes & Pages, mais Property garde ses propres méta:

- `seoTitle: String?`
- `seoDescription: String?`
- `seoMeta: Json?` – pour stocker d’autres balises meta si besoin


---

## 3. API – Admin & Front

### 3.1. Admin – CRUD Properties

Base : `/api/admin/properties`

- `GET /api/admin/properties`
  - **Query params** :
    - `page`, `pageSize`
    - `status` (draft, published, archived)
    - `type`
    - `cityId`, `countryId`, `areaId`
    - `minPrice`, `maxPrice`
    - `featured` (true/false)
    - `agentId`
    - `search` (titre, code, adresse)
  - **Réponse** :
    - `items: PropertyListItem[]`
    - `total`, `page`, `pageSize`

- `POST /api/admin/properties`
  - Crée un nouveau bien (souvent en **Draft** par défaut).

- `GET /api/admin/properties/:id`
  - Charge **toutes les sections** :
    - property
    - media (gallery + documents)
    - features
    - floorPlans
    - subProperties (light)

- `PUT /api/admin/properties/:id`
  - Met à jour toutes les données principales.

- `DELETE /api/admin/properties/:id`
  - Soft delete recommandé (flag) ou hard delete selon stratégie.


### 3.2. Admin – Actions spécifiques

- `POST /api/admin/properties/:id/publish`
  - Change `status` → `PUBLISHED` + set `publishedAt`.

- `POST /api/admin/properties/:id/archive`
  - Change `status` → `ARCHIVED`.

- `POST /api/admin/properties/:id/duplicate`
  - Clone la property + media + features + floorPlans (sans stats ni slug, on régénère un slug).

- `POST /api/admin/properties/:id/feature`
  - Toggle `isFeatured`.

- `POST /api/admin/properties/:id/reorder-media`
  - Reçoit un tableau d’IDs de `PropertyMedia` ou `mediaId` et met à jour `order` + `isCover`.


### 3.3. Admin – Config / Catalogue

- `GET /api/admin/property-features`
- `POST /api/admin/property-features` (création d’une nouvelle feature)
- `PUT /api/admin/property-features/:id`
- `DELETE /api/admin/property-features/:id`

Même logique possible pour :
- Property types
- Property labels
- Property categories


### 3.4. Front – Listing & Détails

Base front :

- `GET /api/properties` – liste publique
  - Filtres : type, city, price, bedrooms, features[], etc.
  - Tri : newest, priceAsc, priceDesc, featuredFirst…

- `GET /api/properties/:slug` – détail complet
  - property
  - media (gallery)
  - features
  - floorPlans
  - relatedProperties


---

## 4. UI Admin – Page Create/Edit Property

### 4.1. Layout général

- **Header** :
  - Title de la property (inline editable)
  - Status (badge) + bouton “Change status”
  - Boutons principaux : `Save Draft`, `Publish`, `Preview`, `Duplicate`

- **Content** :
  - Layout **2 colonnes** inspiré WordPress :
    - **Gauche** : grandes sections (Information, Location, Details, Pricing…)
    - **Droite** : panneaux latéraux (Status, Type, Labels, Country/City, Expiration…)


### 4.2. Navigation par sections (colonne gauche)

1. **Information**
   - Titre, Sous-titre
   - Type (vente / location…) + Status
   - Description (éditeur riche)

2. **Location**
   - Adresse complète (Address, Country, State, City, Area, Zip)
   - Carte (Leaflet / Map)
   - Bouton : *“Place the pin in address above”* (comme ta capture)

3. **Property Details**
   - Bedrooms, Bathrooms
   - Area Size + unit
   - Land Area + unit
   - Garages, Garage Size (+ unit)
   - Property ID (code agence)
   - Year Built
   - **Additional Details** (liste dynamique Title/Value – comme sur ta capture)

4. **Pricing & Rental**
   - Prix + monnaie + postfix (month/day/year)
   - Old price / Promo
   - Section Rental (min stay, deposit, fees…)
   - Intégration Currencies (affichage prix converti info-only si besoin)

5. **Features & Amenities**
   - Grille de checkboxes (comme ta capture “Air Conditioning, Balcony…”)
   - Possibilité de filtrer par nom / groupe
   - Groupes collapsibles: Inside, Outside, Security, Wellness…

6. **Media**
   - Intégration totale Media Library
   - Drag & drop de 1 à N images (comme “Drag and drop the gallery images here”)
   - Icône étoile pour la cover
   - Limite configurable (ex: 50 images)
   - Section Video URL (YouTube, Vimeo…)

7. **Floor Plans**
   - Liste répétable (comme ta capture Floor Plans)
   - Pour chaque plan :
     - Title
     - Bedrooms, Bathrooms
     - Price (+ postfix, monnaie)
     - Plan Size + unit
     - Image (via Media Picker)
     - Description

8. **Sub Listings**
   - Tableau des unités enfants (ex : appartements dans un building)
   - Colonnes : Title, Type, Bedrooms, Price, Status
   - Bouton “Add Sub Listing” qui ouvre un mini-form / redirige vers un create pré-rempli avec `parentPropertyId`.

9. **Contact Information**
   - Agent / Owner (select User/Provider)
   - Téléphone / Email / WhatsApp spécifiques au bien
   - Toggle “Show contact on property page”

10. **Documents**
    - Section Property Documents (comme ta capture WordPress)
    - Bouton **Add Media** (Media Library) – upload PDF/plans/contrats
    - Table : Title, Type (Plan/Brochure/Contract…), Action (download/remove)

11. **SEO**
    - Slug (editable)
    - Meta title / description
    - Preview snippet (Google-style)

12. **Settings & Notes**
    - Featured (Yes/No)
    - User must be logged in to view (Yes/No) – comme ta capture “The user must be logged in to view this property?”
    - Property Expiration (enable + date)
    - Disclaimer
    - Private Note (texte interne pour l’équipe)


### 4.3. Panneau latéral (colonne droite)

- **Type** (select / radio)
- **Status** (Draft / Pending / Published / Archived)
- **Labels** (chips multi-selection)
- **Country / City / Area** (liens rapides vers les sélecteurs de l’onglet Location)
- **Expiration** (Enable + date, comme ta capture en bas à droite)
- **Owner / Author** (select User)


### 4.4. UX & Ergonomie

- **Auto-save draft** toutes les X secondes (optionnel mais souhaitable)
- **Validation progressive** :
  - champs obligatoires marqués (Address, Price, City…)
  - bloc “Errors” en haut si on tente de publier sans les champs nécessaires.
- **Actions rapides** dans la liste des properties :
  - Toggle Featured
  - Changer Status
  - Dupliquer
  - Supprimer


---

## 5. Règles Métier

- Un bien **PUBLISHED** doit avoir au minimum :
  - Titre, Type, City, Price, au moins 1 image.
- Slug doit être unique : auto-généré depuis le titre + suffixe si déjà pris.
- Un bien expiré (`expirationDate < now`) :
  - reste en base mais n’est plus listé en front (ou passe automatiquement en `ARCHIVED` selon paramétrage).
- Si un `Property` a des `children` :
  - On peut choisir d’afficher sur la page parent un résumé des unités (cards ou tableau).
- On ne peut pas supprimer un bien s’il est utilisé comme parent de sub listings (sauf si on set une option “cascade delete”).


---

## 6. Intégration avec les autres modules

### 6.1. Media Library

- Tous les uploads (gallery, floor plan images, documents) passent par la Media Library existante.
- Utilisation du composant `MediaPicker` (déjà créé) :
  - Single select (cover, floor plan image)
  - Multi select (gallery, documents)

### 6.2. Currencies & Exchange Rates

- `priceCurrencyId` pointe sur `Currency`.
- L’admin peut voir un **tooltip** avec conversions rapides (ex : MAD → EUR, USD) selon les `ExchangeRate`.

### 6.3. Routes & Pages

- Les URLs properties suivent `/[locale]/properties/[slug]`.
- On peut plus tard brancher la navigation (module Routes) pour ajouter un lien vers /properties dans le menu principal.

### 6.4. i18n

- L’admin utilise déjà les hooks `useAdminTranslation` etc.
- Les labels/texte UI pour Properties sont dans les fichiers i18n existants.
- Le contenu property (title, description, seo) :
  - soit 1 langue principale au début
  - soit, plus tard, structure multi-langue (via JSON ou tables séparées).


---

## 7. Plan d’Implémentation

1. **Valider ces specs** (ce document).
2. **Aligner le schema Prisma** avec ces modèles (en réutilisant ce qui existe déjà pour Property si présent).
3. Créer/mettre à jour les **API admin** `/api/admin/properties`.
4. Implémenter la page admin Properties :
   - Liste + filtres
   - Page Create/Edit avec la structure de sections décrite.
5. Intégrer la **Media Library** dans toutes les parties (gallery, docs, floor plans).
6. Brancher Currencies pour le champ Price.
7. Ajouter la page front `/properties` + `/properties/[slug]` (si pas déjà fait).
8. Tests fonctionnels (création, édition, duplication, suppression, publication).

---

## 8. Résumé

Ce module Properties doit devenir :

- **Ultra complet** : toutes les infos d’un bien, comme sur un thème WP pro (ce que montrent tes captures).
- **Ultra gérable** : sections claires, formulaire structuré, actions rapides.
- **Connecté** au reste du système : Media, Currencies, Routes, i18n.

Une fois ces specs validées, on pourra passer à l’implémentation concrète (schema, API, UI admin) en suivant ce document comme référence.
