# 🏷️ TEMPLATES MARQUES & CATÉGORIES

**Date:** 28 novembre 2024  
**Total:** 6 nouveaux templates de références

---

## ✅ TEMPLATES CRÉÉS

### 1. 🚗 **Car Brands** (`car-brands.json`)
**10 marques automobiles:**

#### Luxury Brands:
- **BMW** 🇩🇪 - German luxury (3 Series, 5 Series, X5, X7)
- **Mercedes-Benz** 🇩🇪 - German luxury (C-Class, E-Class, S-Class)
- **Lamborghini** 🇮🇹 - Italian supercars (Huracan, Aventador, Urus)
- **Ferrari** 🇮🇹 - Italian supercars (F8 Tributo, SF90, Roma)
- **Porsche** 🇩🇪 - German sports cars (911, Cayenne, Macan)
- **Audi** 🇩🇪 - German luxury (A3, A4, A6, Q5, Q7)
- **Lexus** 🇯🇵 - Japanese luxury (ES, LS, RX, LX)

#### Standard Brands:
- **Toyota** 🇯🇵 - Japanese reliability (Camry, Corolla, Land Cruiser)
- **Nissan** 🇯🇵 - Japanese (Patrol, Altima, X-Trail)
- **Honda** 🇯🇵 - Japanese (Accord, Civic, CR-V)

---

### 2. ⛵ **Yacht Brands** (`yacht-brands.json`)
**8 marques de yachts:**

- **Sunseeker** 🇬🇧 - British luxury (Predator, Manhattan, Portofino)
- **Azimut** 🇮🇹 - Italian luxury (Flybridge, S Collection, Grande)
- **Ferretti** 🇮🇹 - Italian luxury (550, 670, 780, 920)
- **Princess** 🇬🇧 - British (F45, V60, Y85)
- **Gulf Craft** 🇦🇪 - UAE manufacturer (Majesty, Nomad, Silvercraft)
- **Benetti** 🇮🇹 - Italian mega yachts (Oasis, B.Yond, Tradition)
- **Pershing** 🇮🇹 - Sport yachts (6X, 7X, 8X, 9X)
- **Riva** 🇮🇹 - Classic luxury (76 Bahamas, 88 Florida, 100 Corsaro)

---

### 3. 🏍️ **Motorbike Brands** (`motorbike-brands.json`)
**8 marques de motos:**

- **Harley-Davidson** 🇺🇸 - Cruisers (Street, Sportster, Softail, Touring)
- **Ducati** 🇮🇹 - Sport bikes (Panigale, Monster, Multistrada, Scrambler)
- **BMW Motorrad** 🇩🇪 - Adventure (R 1250 GS, S 1000 RR, F 900 R)
- **Yamaha** 🇯🇵 - All types (YZF-R1, MT-09, TMAX, Tracer)
- **Honda Motorcycles** 🇯🇵 - All types (CBR1000RR, Africa Twin, Gold Wing)
- **Kawasaki** 🇯🇵 - Sport (Ninja, Z series, Versys)
- **Suzuki** 🇯🇵 - Sport (GSX-R, Hayabusa, V-Strom)
- **KTM** 🇦🇹 - Off-road (Duke, RC, Adventure)

---

### 4. 🛴 **Scooter Brands** (`scooter-brands.json`)
**6 marques de scooters:**

- **Vespa** 🇮🇹 - Classic Italian (Primavera, Sprint, GTS, Elettrica)
- **Honda Scooters** 🇯🇵 - Urban mobility (PCX, Forza, SH, ADV)
- **Yamaha Scooters** 🇯🇵 - Performance (NMAX, XMAX, TMAX, Aerox)
- **Piaggio** 🇮🇹 - Urban (Liberty, Medley, Beverly)
- **Aprilia** 🇮🇹 - Sport scooters (SR GT, SRV, Scarabeo)
- **NIU** 🇨🇳 - Electric (NQi, MQi, UQi)

---

### 5. 🏗️ **Property Developers** (`property-developers.json`)
**7 promoteurs immobiliers:**

#### Major UAE Developers:
- **Emaar Properties** - Burj Khalifa, Dubai Mall, Downtown Dubai, Emirates Hills
- **Dubai Properties** - JBR, Business Bay, Dubai Wharf
- **Nakheel** - Palm Jumeirah, The World Islands, Deira Islands
- **DAMAC Properties** - DAMAC Hills, DAMAC Lagoons, Versace residences
- **Meraas** - Bluewaters Island, La Mer, City Walk
- **Sobha Realty** - Sobha Hartland, District One
- **Azizi Developments** - Azizi Riviera, Azizi Venice

**Champs:**
- name, slug, description
- country, yearFounded, headquarters
- specialization, majorProjects
- isVerified, isFeatured

---

### 6. 🏢 **Buildings** (`buildings.json`)
**6 immeubles iconiques:**

- **Burj Khalifa** - 163 floors, 828m, Downtown Dubai
- **Princess Tower** - 101 floors, 414m, Dubai Marina
- **Address Downtown** - 63 floors, Luxury hotel + residences
- **JBR** - 6000 units, Beachfront community
- **Emirates Towers** - 54 floors, Sheikh Zayed Road
- **Marina 101** - 101 floors, 425m, Dubai Marina

**Champs:**
- name, slug, description
- developer, location, address
- yearCompleted, floors, height, units
- buildingType, amenities
- isIconic, isFeatured

---

## 📊 STRUCTURE DES TEMPLATES

### Car/Yacht/Motorbike/Scooter Brands

```json
{
  "name": "Brand Name",
  "slug": "brand-slug",
  "description": "Brand description",
  "country": "Country",
  "yearFounded": 2000,
  "specialization": "Type",
  "website": "https://...",
  "logo": "/images/brands/logo.svg",
  "isLuxury": true,
  "isActive": true,
  "isFeatured": true,
  "popularModels": ["Model 1", "Model 2", "Model 3"]
}
```

### Property Developer

```json
{
  "name": "Developer Name",
  "slug": "developer-slug",
  "description": "Description",
  "country": "UAE",
  "yearFounded": 1997,
  "headquarters": "Dubai",
  "website": "https://...",
  "specialization": "Residential & Commercial",
  "majorProjects": ["Project 1", "Project 2"],
  "totalProjects": 100,
  "isVerified": true,
  "isFeatured": true
}
```

### Building

```json
{
  "name": "Building Name",
  "slug": "building-slug",
  "description": "Description",
  "developer": "Developer Name",
  "location": "Area",
  "cityId": "dubai",
  "countryId": "uae",
  "yearCompleted": 2010,
  "floors": 163,
  "height": 828,
  "units": 900,
  "buildingType": "RESIDENTIAL_COMMERCIAL",
  "amenities": ["Pool", "Gym", "Spa"],
  "isIconic": true,
  "isFeatured": true
}
```

---

## 🎯 UTILISATION

### Importer toutes les marques de voitures:

```bash
npx tsx scripts/import-interactive.ts
```

Choix:
- File: `import-templates/car-brands.json`

**→ 10 marques de voitures créées!**

### Importer les promoteurs immobiliers:

```bash
npx tsx scripts/import-interactive.ts
```

- File: `import-templates/property-developers.json`

**→ 7 promoteurs créés!**

### Importer les immeubles:

```bash
npx tsx scripts/import-interactive.ts
```

- File: `import-templates/buildings.json`

**→ 6 immeubles iconiques créés!**

---

## 📈 POURQUOI CES TEMPLATES?

### Marques de Véhicules
✅ **Filtrer** les voitures/yachts/motos par marque  
✅ **Afficher** le logo de la marque  
✅ **Trier** par marque de luxe  
✅ **Rechercher** par fabricant  

### Promoteurs Immobiliers
✅ **Filtrer** les propriétés par promoteur  
✅ **Afficher** tous les projets d'un promoteur  
✅ **Badge** "Promoteur vérifié"  
✅ **Lien** vers le site du promoteur  

### Immeubles
✅ **Filtrer** les appartements par immeuble  
✅ **Afficher** les amenities de l'immeuble  
✅ **Badge** "Immeuble iconique"  
✅ **Info** sur le développeur  

---

## 🔗 RELATIONS AVEC VOS DONNÉES

### Pour les Properties:
```json
{
  "title": "Luxury Apartment",
  "buildingName": "Burj Khalifa",
  "developer": "Emaar Properties",
  ...
}
```

### Pour les Cars:
```json
{
  "name": "BMW 7 Series",
  "brand": "BMW",  // Référence à car-brands
  ...
}
```

### Pour les Yachts:
```json
{
  "name": "Sunseeker Predator 74",
  "brand": "Sunseeker",  // Référence à yacht-brands
  ...
}
```

---

## 📝 PERSONNALISATION

### Ajouter vos propres marques:

1. **Copiez un template:**
```bash
cp import-templates/car-brands.json import-templates/my-car-brands.json
```

2. **Ajoutez vos marques:**
```json
[
  {
    "name": "Tesla",
    "slug": "tesla",
    "country": "United States",
    "isLuxury": true,
    "specialization": "Electric Vehicles",
    "popularModels": ["Model S", "Model 3", "Model X", "Model Y"]
  }
]
```

3. **Importez:**
```bash
npx tsx scripts/import-interactive.ts
```

---

## 📦 RÉSUMÉ DES TEMPLATES

**19 Templates au total:**

### Véhicules & Transport (4):
- ✅ Car Brands (10)
- ✅ Yacht Brands (8)
- ✅ Motorbike Brands (8)
- ✅ Scooter Brands (6)

### Immobilier (2):
- ✅ Property Developers (7)
- ✅ Buildings (6)

### Produits & Services (7):
- ✅ Properties (2)
- ✅ Yachts (2)
- ✅ Rental Cars (2)
- ✅ Doctors (2)
- ✅ Lawyers (2)
- ✅ Coaches (2)
- ✅ Users (3)

### Personnel & Fournisseurs (2):
- ✅ Maids (2)
- ✅ Suppliers (2)

### Alimentaire (2):
- ✅ Food Categories (5)
- ✅ Food Products (3)

### Services (2):
- ✅ Home Services (8)
- ✅ Transfers (3)

**Total: 90+ exemples prêts à importer!** 🎉

---

## 🚀 PROCHAINES ÉTAPES

1. **Importez les marques** pour organiser vos données
2. **Ajoutez vos propres marques** selon vos besoins
3. **Liez les marques** à vos produits/services
4. **Utilisez les filtres** par marque dans votre interface

---

**Votre système de catégorisation est maintenant complet!** 🎊

Vous pouvez organiser TOUTES vos données par marques, promoteurs, et immeubles!
