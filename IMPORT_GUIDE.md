# 📥 GUIDE D'IMPORT DE DONNÉES

## 🚀 Utilisation

### Import Interactif

```bash
npx tsx scripts/import-interactive.ts
```

Le script vous guidera étape par étape:
1. **Choix du type** (Property, Yacht, Doctor, etc.)
2. **Format de fichier** (JSON ou CSV)
3. **Chemin du fichier**
4. **Options** (images, prix, bookings)
5. **Confirmation et import**

---

## 📁 Templates JSON Disponibles

### 1. Properties (`import-templates/properties.json`)
```json
{
  "title": "Luxury Villa",
  "slug": "luxury-villa-palm",
  "type": "VILLA",
  "status": "FOR_SALE",
  "bedrooms": 5,
  "price": 15000000,
  "cityId": "dubai",
  "images": [...]
}
```

### 2. Yachts (`import-templates/yachts.json`)
```json
{
  "name": "Sunseeker 74",
  "brand": "Sunseeker",
  "capacity": 12,
  "pricePerHour": 3500,
  "cityId": "dubai"
}
```

### 3. Rental Cars (`import-templates/rental-cars.json`)
```json
{
  "name": "BMW 7 Series",
  "brand": "BMW",
  "category": "LUXURY",
  "pricePerDay": 800,
  "color": "Black"
}
```

### 4. Doctors (`import-templates/doctors.json`)
```json
{
  "firstName": "Ahmed",
  "lastName": "Hassan",
  "specialty": "Cardiology",
  "consultationFee": 500,
  "licenseNumber": "DHA-12345"
}
```

### 5. Lawyers (`import-templates/lawyers.json`)
```json
{
  "name": "John Smith",
  "title": "Senior Partner",
  "specialization": "Corporate Law",
  "hourlyRate": 1500
}
```

### 6. Coaches (`import-templates/coaches.json`)
```json
{
  "name": "Mike Johnson",
  "title": "Personal Trainer",
  "mainCategory": "FITNESS",
  "hourlyRate": 300
}
```

### 7. Users (`import-templates/users.json`)
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

---

## 🎨 Format CSV

Pour CSV, utilisez les mêmes colonnes que JSON:

```csv
title,slug,type,status,bedrooms,price,cityId
Luxury Villa,luxury-villa,VILLA,FOR_SALE,5,15000000,dubai
Modern Apartment,modern-apt,APARTMENT,FOR_RENT,2,120000,dubai
```

---

## ⚙️ Options d'Import

### 🖼️ Include Images
- **Yes**: Import les URLs des images
- **No**: Ignore le champ images

### 💰 Include Prices
- **Yes**: Import tous les prix (pricePerDay, hourlyRate, etc.)
- **No**: Ignore les prix

### 📅 Include Bookings
- **Yes**: Crée aussi les bookings/rendez-vous associés
- **No**: Import uniquement les entités principales

---

## 📝 Champs Obligatoires par Type

### Property
- `title`, `slug`, `type`, `status`, `bedrooms`, `bathrooms`, `area`, `cityId`, `countryId`

### Yacht
- `name`, `slug`, `cityId`, `countryId`

### RentalCar
- `name`, `slug`, `brand`, `model`, `year`, `category`, `transmission`, `fuelType`, `color`, `seats`, `pricePerDay`, `cityId`, `countryId`

### Doctor
- `slug`, `firstName`, `lastName`, `title`, `gender`, `specialty`, `licenseNumber`, `yearsOfExperience`, `phone`, `email`, `cityId`, `countryId`

### Lawyer
- `slug`, `name`, `title`, `specialization`, `experience`, `cityId`, `countryId`

### Coach
- `slug`, `name`, `title`, `mainCategory`, `experience`, `cityId`, `countryId`

### User
- `email`, `firstName`, `lastName`

---

## 🔧 Exemples d'Utilisation

### Import de 10 propriétés
```bash
npx tsx scripts/import-interactive.ts
# Choisir: 6 (Property)
# Format: 1 (JSON)
# File: import-templates/properties.json
# Images: y
# Prices: y
# Bookings: n
```

### Import de yachts avec prix
```bash
npx tsx scripts/import-interactive.ts
# Choisir: 7 (Yacht)
# Prices: y
```

### Import de doctors sans bookings
```bash
npx tsx scripts/import-interactive.ts
# Choisir: 9 (Doctor)
# Bookings: n
```

---

## 🎯 Conseils

1. **Testez d'abord** avec 1-2 enregistrements
2. **Vérifiez les IDs** (cityId, countryId doivent exister)
3. **Sauvegardez avant** d'importer en masse
4. **Utilisez des slugs uniques** pour éviter les doublons

---

## 📦 Prochaines Étapes

Après l'import:
```bash
# Vérifier les données
npx tsx scripts/test-crud-complete.ts

# Exporter pour backup
npx tsx scripts/export-all-data.ts
```

---

## 🆘 Troubleshooting

### Erreur: "File not found"
→ Vérifiez le chemin du fichier

### Erreur: "cityId does not exist"
→ Créez d'abord les cities avec `import-templates/cities.json`

### Erreur: "Unique constraint failed"
→ Le slug existe déjà, changez-le

---

**Bon import!** 🚀
