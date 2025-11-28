# 📦 TEMPLATES D'IMPORT COMPLETS

**Date:** 28 novembre 2024  
**Total:** 12 Templates JSON

---

## ✅ TOUS LES TEMPLATES DISPONIBLES

| # | Template | Fichier | Exemples | Description |
|---|----------|---------|----------|-------------|
| 1 | **Properties** | `properties.json` | 2 | Villas, Appartements |
| 2 | **Yachts** | `yachts.json` | 2 | Yachts de luxe |
| 3 | **Rental Cars** | `rental-cars.json` | 2 | Voitures de location |
| 4 | **Doctors** | `doctors.json` | 2 | Médecins/Dentistes |
| 5 | **Lawyers** | `lawyers.json` | 2 | Avocats |
| 6 | **Coaches** | `coaches.json` | 2 | Coachs sportifs |
| 7 | **Users** | `users.json` | 3 | Utilisateurs |
| 8 | **Maids** | `maids.json` | 2 | Femmes de ménage |
| 9 | **Suppliers** | `suppliers.json` | 2 | Fournisseurs |
| 10 | **Food Categories** | `food-categories.json` | 5 | Catégories alimentaires |
| 11 | **Food Products** | `food-products.json` | 3 | Produits alimentaires |
| 12 | **Home Services** | `home-services.json` | 8 | Services à domicile |
| 13 | **Transfers** | `transfers.json` | 3 | Transferts/Transports |

**Total: 13 types de templates** ✅

---

## 🏠 HOME SERVICES (8 Services)

Le template `home-services.json` contient tous les services:

### 🧹 Cleaning Services
1. **Professional Home Cleaning**
   - Deep cleaning complet
   - Prix: 200 AED/service ou 60 AED/heure

2. **Furniture Deep Cleaning**
   - Nettoyage sofas et tapis
   - Prix: 150 AED/service

3. **Laundry & Dry Cleaning**
   - Service pressing
   - Prix: 15 AED/kg

### 🔧 Handyman Services
4. **Plumbing Repair**
   - Réparations plomberie
   - Prix: 100 AED/heure + 50 AED frais déplacement

5. **Electrical Services**
   - Électricien professionnel
   - Prix: 120 AED/heure

6. **AC Repair & Maintenance**
   - Réparation climatisation
   - Prix: 150 AED/service

7. **Carpentry Services**
   - Menuiserie
   - Prix: 80 AED/heure

8. **Painting Services**
   - Peinture intérieur/extérieur
   - Prix: 300 AED/pièce ou 15 AED/m²

---

## 🍽️ FOOD SYSTEM

### Categories (5)
- Fresh Fruits 🍎
- Fresh Vegetables 🥗
- Dairy Products 🥛
- Bakery 🍞
- Beverages 🥤

### Products (3 exemples)
- Fresh Red Apples (8 AED/kg)
- Fresh Tomatoes (6 AED/kg)
- Fresh Milk 1L (7 AED)

---

## 👩‍🦰 MAIDS (2 exemples)

```json
{
  "name": "Maria Santos",
  "nationality": "Philippines",
  "age": 28,
  "monthlyFee": 2500,
  "yearsOfExperience": 5,
  "elderlyCare": true,
  "cookingGulf": true
}
```

**Champs disponibles:**
- Informations personnelles (nom, âge, nationalité)
- Expérience et qualifications
- Compétences (cooking, babysitting, elderly care)
- Langues (English, Arabic)
- Prix mensuel

---

## 🏭 SUPPLIERS (2 exemples)

```json
{
  "name": "Premium Furniture Co.",
  "category": "FURNITURE",
  "email": "contact@company.com",
  "servicesOffered": ["Supply", "Installation"],
  "minimumOrder": 5000,
  "isVerified": true
}
```

**Catégories:**
- FURNITURE
- AC_PARTS
- CONSTRUCTION
- FOOD_SUPPLY
- etc.

---

## 🚗 TRANSFERS (3 exemples)

```json
{
  "name": "Airport Transfer - Sedan",
  "transferType": "AIRPORT",
  "vehicleType": "SEDAN",
  "fromLocation": "Dubai Airport",
  "toLocation": "Downtown",
  "price": 120,
  "maxPassengers": 4
}
```

**Types:**
- AIRPORT (aéroport)
- HOURLY (location horaire)
- CITY (city transfer)
- INTERCITY (entre villes)

---

## 🎯 UTILISATION

### Importer des Home Services

```bash
npx tsx scripts/import-interactive.ts
```

Réponses:
1. Type: Choisir le numéro correspondant
2. Format: `1` (JSON)
3. File: `import-templates/home-services.json`
4. Images: `n` (pas d'images pour services)
5. Prices: `y` (inclure les prix)
6. Confirm: `y`

**Résultat:** 8 services créés! ✅

### Importer des Food Products

```bash
npx tsx scripts/import-interactive.ts
```

1. Type: FoodProduct
2. File: `import-templates/food-products.json`
3. Prices: `y`

**Résultat:** 3 produits créés! ✅

### Importer des Maids

```bash
npx tsx scripts/import-interactive.ts
```

1. Type: Maid
2. File: `import-templates/maids.json`
3. Prices: `y`

**Résultat:** 2 maids créées! ✅

---

## 📝 STRUCTURE DES SERVICES

### Home Service Template

```json
{
  "name": "Service Name",
  "slug": "service-slug",
  "category": "PLUMBING|ELECTRICAL|AC_REPAIR|etc",
  "serviceType": "HANDYMAN|CLEANING",
  "description": "Description",
  "pricePerHour": 100,
  "pricePerService": 200,
  "currency": "AED",
  "servicesOffered": ["Service 1", "Service 2"],
  "cityId": "dubai",
  "countryId": "uae",
  "isActive": true
}
```

### Catégories disponibles:
- `HOME_CLEANING`
- `FURNITURE_CLEANING`
- `LAUNDRY`
- `PLUMBING`
- `ELECTRICAL`
- `AC_REPAIR`
- `CARPENTRY`
- `PAINTING`

---

## 🎨 PERSONNALISATION

### Ajouter vos propres services

1. **Copiez le template:**
```bash
cp import-templates/home-services.json import-templates/my-services.json
```

2. **Modifiez les données:**
```json
[
  {
    "name": "Mon Service Personnalisé",
    "category": "PLUMBING",
    "pricePerHour": 150,
    ...
  }
]
```

3. **Importez:**
```bash
npx tsx scripts/import-interactive.ts
# File: import-templates/my-services.json
```

---

## 📊 RÉSUMÉ

**13 Templates disponibles:**
- ✅ 7 Templates existants (Property, Yacht, Doctor, etc.)
- ✅ 6 Nouveaux templates (Maids, Suppliers, Food, Services, Transfers)

**Total d'exemples:** 40+ enregistrements prêts à importer!

**Catégories couvertes:**
- 🏠 Immobilier
- ⛵ Yachts
- 🚗 Location voitures
- 👨‍⚕️ Professionnels (Doctors, Lawyers, Coaches)
- 👩‍🦰 Maids
- 🏭 Suppliers
- 🍽️ Food & Grocery
- 🧹 Home Services (8 types)
- 🚐 Transfers

---

## 🚀 PROCHAINES ÉTAPES

1. **Testez les nouveaux templates:**
```bash
npx tsx scripts/import-interactive.ts
```

2. **Personnalisez selon vos besoins**

3. **Importez en masse!**

---

**Votre site peut maintenant être alimenté avec TOUTES les données nécessaires!** 🎉
