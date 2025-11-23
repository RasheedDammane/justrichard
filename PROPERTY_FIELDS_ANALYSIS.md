# 📋 ANALYSE DES CHAMPS PROPERTY

## 🔍 Comparaison: Prisma vs Formulaire vs Traductions

### ✅ Champs dans Prisma (schema.prisma)
```prisma
model Property {
  id              String
  name            String
  slug            String
  description     String?
  type            String              // Type de propriété
  bedrooms        Int?                // Chambres ✅
  bathrooms       Int?                // Salles de bain ✅
  area            Float?              // Surface ✅
  floor           Int?                // Étage
  furnished       Boolean
  pricePerNight   Float?
  pricePerWeek    Float?
  pricePerMonth   Float?
  currency        String              // Devise ❌ MANQUANT
  cityId          String
  countryId       String
  address         String?             // Adresse ✅
  latitude        Float?
  longitude       Float?
  features        Json?               // Caractéristiques
  amenities       Json?               // Équipements
  images          Json?               // Images ✅
  video           String?             // Vidéo ❌ MANQUANT
  virtualTour     String?
  metaTitle       String?
  metaDescription String?
  views           Int
  bookings        Int
  rating          Float?
  isActive        Boolean
  isFeatured      Boolean             // Mise en avant ✅
  isAvailable     Boolean
  createdAt       DateTime
  updatedAt       DateTime
}
```

### 📝 Champs dans le formulaire (d'après votre description)

#### Section Prix & Devise
- ❌ **Currency** (Devise) - THB, AED, etc.
- ❌ **Sale or Rent Price** (Prix de vente ou location)
- ❌ **Second Price** (Prix secondaire optionnel)
- ❌ **Price Placeholder** (Placeholder de prix)
- ❌ **Price Prefix** (Préfixe de prix - ex: "À partir de")
- ❌ **After The Price** (Après le prix - ex: "Mensuel")

#### Section Surface
- ✅ **Area Size** (Surface) - EXISTE: `area`
- ❌ **Size Postfix** (Suffixe de surface - ex: "m²", "Sq Ft")
- ❌ **Land Area** (Surface du terrain)
- ❌ **Land Area Size Postfix** (Suffixe surface terrain)

#### Section Pièces
- ✅ **Bedrooms** (Chambres) - EXISTE: `bedrooms`
- ❌ **Rooms** (Pièces totales)
- ✅ **Bathrooms** (Salles de bain) - EXISTE: `bathrooms`
- ❌ **Garages** (Garages)
- ❌ **Garage Size** (Taille du garage)

#### Section Informations
- ❌ **Year Built** (Année de construction)
- ❌ **Property ID** (ID de la propriété - ex: HZ-01)
- ❌ **Street Address** (Adresse de rue)
- ❌ **Zip/Postal Code** (Code postal)

#### Section Options
- ✅ **Featured** (Mise en avant) - EXISTE: `isFeatured`
- ❌ **Login Required** (Connexion requise pour voir)

#### Section Média
- ✅ **Images** - EXISTE: `images` (JSON)
- ❌ **Video URL** (URL vidéo) - EXISTE mais pas dans traductions: `video`
- ❌ **Slider Image** (Image slider)

#### Section Plans d'étage
- ❌ **Floor Plans** (Plans d'étage)
  - Plan Title
  - Bedrooms
  - Bathrooms
  - Price
  - Plan Size
  - Plan Image
  - Description

#### Section Documents
- ❌ **Property Documents** (Documents de propriété)

#### Section Classification
- ❌ **Type** (Type de propriété)
- ❌ **Status** (Statut - Draft, Published, Sold, Rented)
- ❌ **Features** (Caractéristiques)
- ❌ **Labels** (Étiquettes)
- ❌ **Country** (Pays)
- ❌ **State** (État/Province)
- ❌ **City** (Ville)
- ❌ **Area** (Quartier)

---

## 🎯 CHAMPS MANQUANTS DANS LES TRADUCTIONS

### Groupe 1: Prix & Devise (7 champs)
1. `currency` - Devise
2. `salePrice` - Prix de vente
3. `rentPrice` - Prix de location
4. `secondPrice` - Prix secondaire
5. `pricePlaceholder` - Placeholder de prix
6. `pricePrefix` - Préfixe de prix
7. `pricePostfix` - Suffixe de prix

### Groupe 2: Surface étendue (4 champs)
1. `areaPostfix` - Suffixe de surface
2. `landArea` - Surface du terrain
3. `landAreaPostfix` - Suffixe surface terrain
4. `floor` - Étage

### Groupe 3: Pièces étendues (3 champs)
1. `rooms` - Pièces totales
2. `garages` - Garages
3. `garageSize` - Taille du garage

### Groupe 4: Informations étendues (4 champs)
1. `yearBuilt` - Année de construction
2. `propertyId` - ID de la propriété
3. `streetAddress` - Adresse de rue
4. `zipCode` - Code postal

### Groupe 5: Options (2 champs)
1. `loginRequired` - Connexion requise
2. `customSlider` - Slider personnalisé

### Groupe 6: Média étendu (3 champs)
1. `videoUrl` - URL vidéo
2. `sliderImage` - Image slider
3. `virtualTour` - Visite virtuelle

### Groupe 7: Plans & Documents (2 champs)
1. `floorPlans` - Plans d'étage
2. `documents` - Documents

### Groupe 8: Classification (8 champs)
1. `propertyType` - Type (déjà existe)
2. `propertyStatus` - Statut
3. `features` - Caractéristiques
4. `labels` - Étiquettes
5. `country` - Pays
6. `state` - État/Province
7. `city` - Ville
8. `neighborhood` - Quartier

---

## ✅ TRADUCTIONS ACTUELLES (11 champs de base)

Les traductions actuelles couvrent seulement:
1. `title` - Titre
2. `description` - Description
3. `propertyType` - Type de propriété
4. `listingType` - Type d'annonce
5. `status` - Statut
6. `price` - Prix
7. `area` - Surface
8. `bedrooms` - Chambres
9. `bathrooms` - Salles de bain
10. `featured` - Mise en avant
11. `images` - Images

---

## 🚀 RECOMMANDATION

### Option 1: Traductions minimales (11 champs actuels)
✅ Déjà fait - Couvre les champs de base

### Option 2: Traductions complètes (40+ champs)
❌ À faire - Ajouter tous les champs du formulaire

### Option 3: Traductions par sections
📋 Recommandé - Ajouter progressivement par groupes:
1. Prix & Devise (7 champs)
2. Surface étendue (4 champs)
3. Pièces étendues (3 champs)
4. Informations (4 champs)
5. Média (3 champs)
6. Classification (8 champs)

---

## 💡 PROPOSITION

**Voulez-vous que j'ajoute TOUS les champs du formulaire dans les traductions (40+ champs) pour les 18 langues?**

Cela inclurait:
- Prix détaillés (vente, location, devise, préfixes/suffixes)
- Surfaces étendues (terrain, étage, garages)
- Informations complètes (année, ID, code postal)
- Média complet (vidéo, slider, visite virtuelle)
- Plans d'étage
- Documents
- Classification complète

**Total estimé: ~40 nouvelles clés × 18 langues = 720 traductions supplémentaires**
