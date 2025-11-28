# 📥 SYSTÈME D'IMPORT COMPLET - CRÉÉ AVEC SUCCÈS!

**Date:** 28 novembre 2024  
**Status:** ✅ **OPÉRATIONNEL**

---

## 🎉 CE QUI A ÉTÉ CRÉÉ

### 1. ✅ Templates JSON (7 fichiers)

Tous dans le dossier `import-templates/`:

| Template | Fichier | Exemples |
|----------|---------|----------|
| **Properties** | `properties.json` | 2 propriétés |
| **Yachts** | `yachts.json` | 2 yachts |
| **Rental Cars** | `rental-cars.json` | 2 voitures |
| **Doctors** | `doctors.json` | 2 docteurs |
| **Lawyers** | `lawyers.json` | 2 avocats |
| **Coaches** | `coaches.json` | 2 coachs |
| **Users** | `users.json` | 3 utilisateurs |

### 2. ✅ Script d'Import Interactif

**Fichier:** `scripts/import-interactive.ts`

**Fonctionnalités:**
- ✅ Import JSON et CSV
- ✅ Choix du type (Property, Yacht, Doctor, etc.)
- ✅ Options configurables (images, prix, bookings)
- ✅ Validation des données
- ✅ Rapports détaillés
- ✅ Gestion des erreurs

### 3. ✅ Guide Complet

**Fichier:** `IMPORT_GUIDE.md`

Contient:
- Instructions détaillées
- Exemples pour chaque type
- Champs obligatoires
- Troubleshooting

---

## 🚀 UTILISATION RAPIDE

### Import Interactif (RECOMMANDÉ)

```bash
npx tsx scripts/import-interactive.ts
```

Le script vous guide:
1. **Choisir le type** → Properties, Yachts, Doctors, etc.
2. **Format** → JSON ou CSV
3. **Fichier** → Chemin du fichier à importer
4. **Options:**
   - 🖼️ Images (oui/non)
   - 💰 Prix (oui/non)
   - 📅 Bookings (oui/non)
5. **Confirmation** → Vérifier avant d'importer
6. **Import!** → Création automatique

---

## 📋 EXEMPLES CONCRETS

### 1. Importer 2 Properties

```bash
npx tsx scripts/import-interactive.ts
```

Réponses:
- Type: `6` (Property)
- Format: `1` (JSON)
- File: `import-templates/properties.json` (appuyez Entrée)
- Images: `y`
- Prices: `y`
- Bookings: `n`
- Confirm: `y`

**Résultat:** 2 propriétés créées! ✅

### 2. Importer 2 Yachts avec prix

```bash
npx tsx scripts/import-interactive.ts
```

Réponses:
- Type: `7` (Yacht)
- Format: `1`
- File: `import-templates/yachts.json`
- Images: `y`
- Prices: `y`
- Confirm: `y`

**Résultat:** 2 yachts créés avec tous leurs prix! ✅

### 3. Importer 2 Doctors

```bash
npx tsx scripts/import-interactive.ts
```

Réponses:
- Type: `9` (Doctor)
- File: `import-templates/doctors.json`
- Prices: `y`
- Confirm: `y`

**Résultat:** 2 docteurs avec consultations! ✅

---

## 📁 STRUCTURE DES TEMPLATES

### Property Template

```json
{
  "title": "Luxury Villa",
  "slug": "luxury-villa-palm",
  "type": "VILLA",
  "status": "FOR_SALE",
  "bedrooms": 5,
  "bathrooms": 6,
  "area": 5000,
  "price": 15000000,
  "currency": "AED",
  "cityId": "dubai",
  "countryId": "uae",
  "images": ["url1", "url2"],
  "features": ["Pool", "Garden"]
}
```

### Yacht Template

```json
{
  "name": "Sunseeker 74",
  "slug": "sunseeker-74",
  "brand": "Sunseeker",
  "capacity": 12,
  "pricePerHour": 3500,
  "pricePerDay": 25000,
  "cityId": "dubai"
}
```

### Doctor Template

```json
{
  "firstName": "Ahmed",
  "lastName": "Hassan",
  "specialty": "Cardiology",
  "licenseNumber": "DHA-12345",
  "consultationFee": 500,
  "cityId": "dubai"
}
```

---

## ⚙️ OPTIONS DISPONIBLES

### 🖼️ Include Images
- **YES**: Import les URLs/chemins des images
- **NO**: Crée les entités sans images

### 💰 Include Prices
- **YES**: Import tous les prix (hourlyRate, pricePerDay, etc.)
- **NO**: Crée les entités sans prix

### 📅 Include Bookings
- **YES**: Crée aussi les rendez-vous/bookings
- **NO**: Import uniquement les entités principales

---

## 🎯 TYPES D'IMPORT DISPONIBLES

| # | Type | Template | Status |
|---|------|----------|--------|
| 1 | User | users.json | ✅ |
| 2 | Country | - | ⏳ |
| 3 | City | - | ⏳ |
| 4 | Currency | - | ⏳ |
| 5 | Language | - | ⏳ |
| 6 | Property | properties.json | ✅ |
| 7 | Yacht | yachts.json | ✅ |
| 8 | RentalCar | rental-cars.json | ✅ |
| 9 | Doctor | doctors.json | ✅ |
| 10 | Lawyer | lawyers.json | ✅ |
| 11 | Coach | coaches.json | ✅ |
| 12 | Maid | - | ⏳ |
| 13 | Transfer | - | ⏳ |
| 14 | FoodCategory | - | ⏳ |
| 15 | FoodBrand | - | ⏳ |
| 16 | FoodProduct | - | ⏳ |

✅ = Implémenté  
⏳ = À implémenter (facile à ajouter)

---

## 🔧 MODIFIER UN TEMPLATE

1. Ouvrez le fichier template:
```bash
code import-templates/properties.json
```

2. Ajoutez/modifiez les données:
```json
[
  {
    "title": "MA NOUVELLE PROPRIÉTÉ",
    "slug": "ma-propriete",
    ...
  }
]
```

3. Sauvegardez et importez!

---

## 📊 APRÈS L'IMPORT

### Vérifier les données

```bash
# Compter les enregistrements
docker exec justrichard-preprod-db psql -U postgres -d preprod_justrichard -c "SELECT COUNT(*) FROM \"Property\";"

# Voir les données
docker exec justrichard-preprod-db psql -U postgres -d preprod_justrichard -c "SELECT title, price FROM \"Property\" LIMIT 5;"
```

### Exporter pour backup

```bash
npx tsx scripts/export-all-data.ts
```

---

## 🆘 TROUBLESHOOTING

### ❌ "File not found"
**Solution:** Vérifiez le chemin. Utilisez les templates fournis:
```bash
ls import-templates/
```

### ❌ "cityId does not exist"
**Solution:** Créez d'abord les cities nécessaires. Dubai et Abu Dhabi existent déjà (IDs: `dubai`, `abu-dhabi`)

### ❌ "Unique constraint failed on slug"
**Solution:** Le slug existe déjà. Changez-le dans votre JSON

### ❌ "Invalid enum value"
**Solution:** Vérifiez les valeurs (ex: type doit être VILLA, APARTMENT, etc.)

---

## 🎨 CRÉER VOS PROPRES TEMPLATES

1. **Copiez un template existant:**
```bash
cp import-templates/properties.json import-templates/my-properties.json
```

2. **Modifiez avec vos données**

3. **Importez:**
```bash
npx tsx scripts/import-interactive.ts
# File: import-templates/my-properties.json
```

---

## 📝 CHAMPS OBLIGATOIRES

### Pour Properties
- title, slug, type, status, bedrooms, bathrooms, area, cityId, countryId

### Pour Yachts
- name, slug, cityId, countryId

### Pour Doctors
- firstName, lastName, title, gender, specialty, licenseNumber, yearsOfExperience, phone, email, cityId, countryId

### Pour tous
- Le `slug` doit être **unique**
- Les `cityId` et `countryId` doivent **exister** dans la base

---

## 🚀 PROCHAINES ÉTAPES

1. **Testez** avec les templates fournis
2. **Créez** vos propres templates
3. **Importez** vos données
4. **Vérifiez** dans la base
5. **Exportez** pour backup

---

## 📦 FICHIERS CRÉÉS

```
import-templates/
├── properties.json      ✅ 2 exemples
├── yachts.json         ✅ 2 exemples
├── rental-cars.json    ✅ 2 exemples
├── doctors.json        ✅ 2 exemples
├── lawyers.json        ✅ 2 exemples
├── coaches.json        ✅ 2 exemples
└── users.json          ✅ 3 exemples

scripts/
└── import-interactive.ts  ✅ Script complet

Documentation/
├── IMPORT_GUIDE.md           ✅ Guide détaillé
└── IMPORT_SYSTEM_COMPLETE.md ✅ Ce fichier
```

---

**SYSTÈME PRÊT À L'EMPLOI!** 🎉

Vous pouvez maintenant importer autant de données que vous voulez en quelques secondes!
