# 📅 TEMPLATE ÉVÉNEMENTS

**Fichier:** `import-templates/events.json`  
**Exemples:** 8 événements variés

---

## ✅ ÉVÉNEMENTS INCLUS

### 1. 🍽️ Dubai Food Festival
- **Catégorie:** FOOD_DRINK
- **Type:** FESTIVAL
- **Dates:** 1-15 Mars 2025
- **Capacité:** 5000 personnes
- **Prix:** 50 AED (VIP: 200 AED)
- **Lieu:** Dubai Festival City

### 2. 🎵 Dubai Jazz Festival
- **Catégorie:** MUSIC
- **Type:** CONCERT
- **Dates:** 20-22 Février 2025
- **Capacité:** 3000 personnes
- **Prix:** 150 AED (VIP: 500 AED)
- **Âge:** 21+

### 3. 🏃 Dubai Marathon 2025
- **Catégorie:** SPORTS
- **Type:** SPORTS
- **Date:** 26 Janvier 2025
- **Capacité:** 10,000 coureurs
- **Prix:** 100 AED
- **Âge:** 16+

### 4. 🎨 Art Dubai 2025
- **Catégorie:** ART_CULTURE
- **Type:** EXHIBITION
- **Dates:** 10-13 Mars 2025
- **Prix:** 75 AED (VIP: 300 AED)
- **Lieu:** DIFC

### 5. 🛍️ Dubai Shopping Festival
- **Catégorie:** SHOPPING
- **Type:** FESTIVAL
- **Dates:** 26 Déc - 31 Jan
- **Prix:** GRATUIT
- **Lieu:** Divers malls

### 6. 💼 Tech Summit Dubai 2025
- **Catégorie:** BUSINESS
- **Type:** CONFERENCE
- **Dates:** 15-17 Avril 2025
- **Prix:** 500 AED (VIP: 2000 AED)
- **Lieu:** Dubai World Trade Centre

### 7. 👨‍👩‍👧 Kids Fun Day
- **Catégorie:** FAMILY_KIDS
- **Type:** FAMILY
- **Date:** 14 Février 2025
- **Prix:** GRATUIT
- **Lieu:** Zabeel Park

### 8. 🎉 Yacht Party - Sunset Cruise
- **Catégorie:** ENTERTAINMENT
- **Type:** PARTY
- **Date:** 8 Mars 2025
- **Prix:** 300 AED (VIP: 800 AED)
- **Capacité:** 150 personnes
- **Âge:** 21+

---

## 📋 CATÉGORIES DISPONIBLES

- **FOOD_DRINK** - Festivals culinaires, dégustations
- **MUSIC** - Concerts, festivals musicaux
- **SPORTS** - Compétitions sportives, marathons
- **ART_CULTURE** - Expositions, galeries, culture
- **SHOPPING** - Festivals shopping, ventes
- **BUSINESS** - Conférences, salons professionnels
- **FAMILY_KIDS** - Événements familiaux, pour enfants
- **ENTERTAINMENT** - Fêtes, soirées, divertissement

---

## 📝 TYPES D'ÉVÉNEMENTS

- **FESTIVAL** - Festivals multi-jours
- **CONCERT** - Concerts, spectacles
- **SPORTS** - Événements sportifs
- **EXHIBITION** - Expositions, salons
- **CONFERENCE** - Conférences, séminaires
- **FAMILY** - Événements familiaux
- **PARTY** - Soirées, fêtes

---

## 🎯 STRUCTURE DU TEMPLATE

```json
{
  "title": "Event Name",
  "slug": "event-slug",
  "description": "Event description",
  "category": "MUSIC|SPORTS|ART_CULTURE|etc",
  "eventType": "FESTIVAL|CONCERT|CONFERENCE|etc",
  "startDate": "2025-03-01T10:00:00Z",
  "endDate": "2025-03-15T23:00:00Z",
  "venue": "Venue Name",
  "address": "Full Address",
  "cityId": "dubai",
  "countryId": "uae",
  "latitude": 25.2048,
  "longitude": 55.2708,
  
  // Organisateur
  "organizerName": "Organizer Name",
  "organizerEmail": "contact@email.com",
  "organizerPhone": "+971501234567",
  
  // Tarification
  "ticketPrice": 100,
  "ticketPriceVIP": 500,
  "currency": "AED",
  
  // Détails
  "capacity": 5000,
  "ageRestriction": 18,
  "tags": ["Tag1", "Tag2"],
  "images": ["/path/to/image.jpg"],
  
  // Paramètres
  "isActive": true,
  "isFeatured": true,
  "isFree": false,
  "requiresBooking": true,
  "allowsOnlineBooking": true
}
```

---

## 🚀 UTILISATION

### Importer tous les événements:

```bash
npx tsx scripts/import-interactive.ts
```

Choix:
- File: `import-templates/events.json`
- Prices: `y`
- Images: `y`

**Résultat:** 8 événements créés! ✅

---

## 🎨 PERSONNALISATION

### Créer vos propres événements:

1. **Copiez le template:**
```bash
cp import-templates/events.json import-templates/my-events.json
```

2. **Modifiez les données:**
```json
[
  {
    "title": "Mon Événement",
    "slug": "mon-evenement",
    "category": "MUSIC",
    "eventType": "CONCERT",
    "startDate": "2025-06-01T20:00:00Z",
    "endDate": "2025-06-01T23:00:00Z",
    "ticketPrice": 200,
    "capacity": 1000
  }
]
```

3. **Importez:**
```bash
npx tsx scripts/import-interactive.ts
# File: import-templates/my-events.json
```

---

## 💡 EXEMPLES D'UTILISATION

### Événement Gratuit:
```json
{
  "ticketPrice": 0,
  "isFree": true,
  "requiresBooking": false
}
```

### Événement Premium:
```json
{
  "ticketPrice": 500,
  "ticketPriceVIP": 2000,
  "ageRestriction": 21,
  "isFeatured": true
}
```

### Événement Multi-Jours:
```json
{
  "startDate": "2025-03-01T10:00:00Z",
  "endDate": "2025-03-15T23:00:00Z",
  "eventType": "FESTIVAL"
}
```

---

## 📊 CHAMPS OBLIGATOIRES

- `title` - Titre de l'événement
- `slug` - URL-friendly slug (unique)
- `category` - Catégorie (MUSIC, SPORTS, etc.)
- `eventType` - Type (CONCERT, FESTIVAL, etc.)
- `startDate` - Date/heure de début (ISO 8601)
- `endDate` - Date/heure de fin
- `cityId` - ID de la ville
- `countryId` - ID du pays

---

## 🎯 CHAMPS OPTIONNELS

- `venue` - Nom du lieu
- `address` - Adresse complète
- `latitude`, `longitude` - Coordonnées GPS
- `organizerName`, `organizerEmail`, `organizerPhone`
- `ticketPrice`, `ticketPriceVIP` - Prix des billets
- `capacity` - Capacité max
- `ageRestriction` - Âge minimum
- `tags` - Tags pour recherche
- `images` - URLs des images
- `isFeatured` - Mettre en avant
- `isFree` - Événement gratuit
- `requiresBooking` - Réservation requise
- `allowsOnlineBooking` - Réservation en ligne

---

## 🔗 INTÉGRATION

Les événements peuvent être liés à:
- **Bookings** - Réservations/Inscriptions
- **Payments** - Paiements de billets
- **Reviews** - Avis des participants
- **Notifications** - Rappels avant l'événement

---

**Vos événements sont maintenant prêts à être importés!** 🎉

**8 exemples couvrant toutes les catégories:** Music, Sports, Art, Food, Business, Family, Shopping, Entertainment!
