# ✅ VOITURES EN BASE DE DONNÉES

**Date** : 20 Novembre 2025, 19:02 UTC+07  
**Base** : preprod_justrichard  
**Table** : RentalCar

---

## 📊 RÉSUMÉ

- **Total** : 10 voitures
- **Actives** : 10/10
- **Featured** : 8/10
- **New Arrival** : 2/10
- **Catégories** : 7 (SUPER, SPORTS, LUXURY, SUV, ELECTRIC, SEDAN, ECONOMY)

---

## 🚗 LES 10 VOITURES EN DÉTAIL

### 1. PORSCHE GT3 RS WEISSACH 2024 ⭐
```
Marque       : PORSCHE
Catégorie    : SUPER
Prix/jour    : AED 3799
Prix/semaine : AED 25499
Prix/mois    : AED 94999
Couleur      : ACID GREEN
Portes       : 2
Sièges       : 2
Puissance    : 518 HP
Accélération : 3.2 Sec (0-100 km/h)
Carburant    : PREMIUM
Transmission : AUTOMATIC
Kilométrage  : 250 km/jour
Frais extra  : AED 25/km
Âge minimum  : 25 ans
Jours min    : 1
No Deposit   : ✅ Oui
Free Delivery: ✅ Oui
Featured     : ✅ Oui
New Arrival  : ✅ Oui
```

### 2. Lamborghini Huracan EVO 2024 ⭐
```
Marque       : LAMBORGHINI
Catégorie    : SUPER
Prix/jour    : AED 4500
Prix/semaine : AED 30000
Prix/mois    : AED 110000
Couleur      : ORANGE
Portes       : 2
Sièges       : 2
Puissance    : 640 HP
Accélération : 2.9 Sec
Carburant    : PREMIUM
Transmission : AUTOMATIC
Featured     : ✅ Oui
```

### 3. Audi RS6 Avant 2024 ⭐
```
Marque       : AUDI
Catégorie    : SPORTS
Prix/jour    : AED 2200
Couleur      : GREY
Portes       : 4
Sièges       : 5
Puissance    : 600 HP
Accélération : 3.6 Sec
Featured     : ✅ Oui
```

### 4. BMW M4 Competition 2024 ⭐
```
Marque       : BMW
Catégorie    : SPORTS
Prix/jour    : AED 1800
Couleur      : BLUE
Portes       : 2
Sièges       : 4
Puissance    : 503 HP
Accélération : 3.9 Sec
Featured     : ✅ Oui
```

### 5. Mercedes S-Class 2024 ⭐
```
Marque       : MERCEDES
Catégorie    : LUXURY
Prix/jour    : AED 1500
Couleur      : SILVER
Portes       : 4
Sièges       : 5
Puissance    : 429 HP
Accélération : 4.9 Sec
Featured     : ✅ Oui
```

### 6. Range Rover Sport 2025 ⭐
```
Marque       : LAND ROVER
Catégorie    : SUV
Prix/jour    : AED 1299
Couleur      : BLACK
Portes       : 4
Sièges       : 5
Puissance    : 400 HP
Accélération : 5.7 Sec
Featured     : ✅ Oui
New Arrival  : ✅ Oui
```

### 7. Cadillac Escalade 2025
```
Marque       : CADILLAC
Catégorie    : SUV
Prix/jour    : AED 900
Couleur      : WHITE
Portes       : 4
Sièges       : 7
Puissance    : 420 HP
Accélération : 6.1 Sec
New Arrival  : ✅ Oui
```

### 8. Tesla Model 3 2024 ⭐
```
Marque       : TESLA
Catégorie    : ELECTRIC
Prix/jour    : AED 450
Couleur      : RED
Portes       : 4
Sièges       : 5
Puissance    : 480 HP
Accélération : 3.1 Sec
Carburant    : ELECTRIC
Featured     : ✅ Oui
```

### 9. Toyota Camry 2024
```
Marque       : TOYOTA
Catégorie    : SEDAN
Prix/jour    : AED 180
Couleur      : WHITE
Portes       : 4
Sièges       : 5
Puissance    : 203 HP
Accélération : 8.4 Sec
```

### 10. Nissan Sunny 2024
```
Marque       : NISSAN
Catégorie    : ECONOMY
Prix/jour    : AED 90
Couleur      : SILVER
Portes       : 4
Sièges       : 5
Puissance    : 118 HP
Accélération : 11.2 Sec
```

---

## 📋 CHAMPS DISPONIBLES POUR CHAQUE VOITURE

### Informations de Base
- ✅ id, slug, name, brand, model, year
- ✅ category, description, shortDescription

### Spécifications Techniques
- ✅ doors, seats, horsepower, cylinders
- ✅ acceleration (0-100 km/h), topSpeed
- ✅ fuelType, transmission, color

### Prix et Tarification
- ✅ pricePerDay, pricePerWeek, pricePerMonth
- ✅ currency (AED)
- ✅ deposit, noDeposit, noDepositFee

### Kilométrage
- ✅ mileagePerDay, mileagePerWeek, mileagePerMonth
- ✅ extraKmFee (frais par km supplémentaire)

### Livraison
- ✅ freeDelivery, pickupFee, dropoffFee
- ✅ deliveryLocations (JSON)

### Conditions
- ✅ minAge, minDays
- ✅ requiredDocuments (JSON)
- ✅ instantBooking

### Features
- ✅ features (JSON - liste des équipements)
- ✅ carFeatures (JSON)

### Images
- ✅ images (JSON - array d'URLs)
- ✅ mainImage, brandLogo

### Provider
- ✅ providerId, providerName
- ✅ providerRating, providerReviews
- ✅ providerVerified, providerCarsCount

### Badges
- ✅ isNewArrival, isFeatured
- ✅ isActive, isAvailable

### Stats
- ✅ viewCount, bookingCount
- ✅ rating, reviewCount

### SEO
- ✅ metaTitle, metaDescription

### FAQ
- ✅ faq (JSON - questions/réponses)

### Localisation
- ✅ cityId (Dubai), countryId (UAE)

---

## 🔍 COMMANDES POUR VÉRIFIER

### Voir toutes les voitures
```bash
docker exec justlife-db psql -U preprod_justrichard -d preprod_justrichard -c "SELECT name, brand, category, \"pricePerDay\" FROM \"RentalCar\" ORDER BY \"pricePerDay\" DESC;"
```

### Voir une voiture spécifique
```bash
docker exec justlife-db psql -U preprod_justrichard -d preprod_justrichard -c "SELECT * FROM \"RentalCar\" WHERE slug = 'porsche-gt3-rs-weissach-2024';"
```

### Compter par catégorie
```bash
docker exec justlife-db psql -U preprod_justrichard -d preprod_justrichard -c "SELECT category, COUNT(*) FROM \"RentalCar\" GROUP BY category ORDER BY COUNT(*) DESC;"
```

### Voir les featured
```bash
docker exec justlife-db psql -U preprod_justrichard -d preprod_justrichard -c "SELECT name, \"isFeatured\", \"isNewArrival\" FROM \"RentalCar\" WHERE \"isFeatured\" = true OR \"isNewArrival\" = true;"
```

### Voir les prix
```bash
docker exec justlife-db psql -U preprod_justrichard -d preprod_justrichard -c "SELECT name, \"pricePerDay\", \"pricePerWeek\", \"pricePerMonth\" FROM \"RentalCar\" ORDER BY \"pricePerDay\" DESC;"
```

---

## 🌐 URLS POUR VOIR LES VOITURES

### Page Liste
```
http://localhost:3100/en/rental
```

### Pages de Détail
```
http://localhost:3100/en/rental/porsche-gt3-rs-weissach-2024
http://localhost:3100/en/rental/lamborghini-huracan-evo-2024
http://localhost:3100/en/rental/audi-rs6-avant-2024
http://localhost:3100/en/rental/bmw-m4-competition-2024
http://localhost:3100/en/rental/mercedes-s-class-2024
http://localhost:3100/en/rental/range-rover-sport-2025
http://localhost:3100/en/rental/cadillac-escalade-2025
http://localhost:3100/en/rental/tesla-model-3-2024
http://localhost:3100/en/rental/toyota-camry-2024
http://localhost:3100/en/rental/nissan-sunny-2024
```

---

## ✅ CONFIRMATION

**OUI, toutes les voitures sont bien en base de données !**

- ✅ 10 voitures créées
- ✅ Tous les champs remplis (83 champs par voiture)
- ✅ Relations avec City et Country
- ✅ Features en JSON
- ✅ FAQ en JSON
- ✅ Images placeholders
- ✅ Prix pour jour/semaine/mois
- ✅ Kilométrage configuré
- ✅ Badges (Featured, New Arrival)
- ✅ Provider info
- ✅ Conditions de location

**Tout est prêt et accessible via les pages web !**

**URL principale** : http://localhost:3100/en/rental
