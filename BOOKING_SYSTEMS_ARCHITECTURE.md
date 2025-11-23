# 🎯 ARCHITECTURE DES SYSTÈMES DE BOOKING SPÉCIFIQUES

## Vue d'ensemble

Chaque type de service nécessite un système de booking **SPÉCIFIQUE** adapté à ses besoins particuliers. Voici l'architecture détaillée pour chaque type.

---

## 1. 🏥 DOCTEURS & DENTISTES - Medical Booking

### Caractéristiques spécifiques :
- **Rendez-vous par créneaux horaires** (30-45 min)
- **Calendrier avec disponibilités**
- **Types de consultation** : Présentiel, Vidéo, Téléphone
- **Informations patient** : Nom, âge, genre, symptômes
- **Assurance** : Acceptée ou non
- **Rappels automatiques** : Email/SMS 24h avant
- **Confirmation** : Code unique de confirmation
- **Prescriptions** : Après consultation

### Modèle de données :
```prisma
model DoctorAppointment {
  id                    String   @id
  doctorId              String
  
  // Patient Info
  patientName           String
  patientEmail          String
  patientPhone          String
  patientAge            Int?
  patientGender         String?
  
  // Appointment Details
  appointmentDate       DateTime
  appointmentTime       String   // "09:00"
  duration              Int      @default(30)
  consultationType      String   // in-person, video, phone
  reason                String
  symptoms              String?
  
  // Payment
  fee                   Float
  paymentStatus         String   @default("pending")
  paymentMethod         String?
  
  // Status
  status                String   @default("pending")
  confirmationCode      String?  @unique
  
  // Notes
  doctorNotes           String?
  prescriptions         Json?
  
  // Reminders
  reminderSent          Boolean  @default(false)
}
```

### Flow de réservation :
1. Sélection du docteur/dentiste
2. Choix de la date dans le calendrier
3. Sélection du créneau horaire disponible
4. Choix type de consultation (présentiel/vidéo)
5. Remplissage formulaire patient
6. Confirmation et paiement
7. Email de confirmation avec code
8. Rappel automatique 24h avant

---

## 2. 🚗 LOCATION DE VOITURES - Car Rental Booking

### Caractéristiques spécifiques :
- **Réservation par jours/semaines**
- **Date de début et fin**
- **Lieu de prise en charge et retour**
- **Kilométrage** : Limité ou illimité
- **Assurance** : Basique, complète, premium
- **Conducteur additionnel**
- **Équipements** : GPS, siège bébé, etc.
- **Caution** : Montant et mode de paiement

### Modèle de données :
```prisma
model CarRentalBooking {
  id                    String   @id
  carId                 String
  
  // Rental Period
  pickupDate            DateTime
  returnDate            DateTime
  numberOfDays          Int
  
  // Location
  pickupLocation        String
  returnLocation        String
  pickupTime            String   // "10:00"
  returnTime            String   // "10:00"
  
  // Driver Info
  driverName            String
  driverEmail           String
  driverPhone           String
  driverLicense         String
  driverAge             Int
  additionalDrivers     Json?    // array of additional drivers
  
  // Options
  mileageType           String   // limited, unlimited
  insuranceType         String   // basic, full, premium
  extras                Json?    // GPS, baby seat, etc.
  
  // Payment
  dailyRate             Float
  totalDays             Int
  subtotal              Float
  insuranceFee          Float
  extrasFee             Float
  deposit               Float
  totalAmount           Float
  paymentStatus         String   @default("pending")
  
  // Status
  status                String   @default("pending")
  confirmationCode      String?  @unique
}
```

### Flow de réservation :
1. Sélection de la voiture
2. Choix dates début/fin
3. Choix lieux prise en charge/retour
4. Sélection type d'assurance
5. Ajout d'extras (GPS, siège bébé)
6. Informations conducteur + permis
7. Calcul prix total (jours × tarif + assurance + extras)
8. Paiement + caution
9. Confirmation avec voucher

---

## 3. ⛵ YACHTS - Yacht Charter Booking

### Caractéristiques spécifiques :
- **Réservation par heures/jours/semaines**
- **Itinéraire** : Points de départ et d'arrivée
- **Nombre de passagers**
- **Équipage** : Avec ou sans capitaine
- **Services** : Catering, activités nautiques
- **Période haute/basse saison**
- **Contrat de location**

### Modèle de données :
```prisma
model YachtBooking {
  id                    String   @id
  yachtId               String
  
  // Charter Period
  startDate             DateTime
  endDate               DateTime
  duration              Int      // hours or days
  durationType          String   // hourly, daily, weekly
  
  // Itinerary
  departurePort         String
  destinationPort       String?
  itinerary             Json?    // array of stops
  
  // Passengers
  numberOfPassengers    Int
  passengersList        Json?    // names of passengers
  
  // Crew
  withCaptain           Boolean  @default(true)
  withCrew              Boolean  @default(false)
  crewSize              Int?
  
  // Services
  catering              Boolean  @default(false)
  cateringType          String?  // breakfast, lunch, dinner, full
  waterSports           Json?    // jet ski, snorkeling, etc.
  specialRequests       String?
  
  // Contact
  customerName          String
  customerEmail         String
  customerPhone         String
  
  // Payment
  baseRate              Float
  cateringFee           Float?
  waterSportsFee        Float?
  crewFee               Float?
  fuelSurcharge         Float?
  totalAmount           Float
  deposit               Float
  paymentStatus         String   @default("pending")
  
  // Status
  status                String   @default("pending")
  confirmationCode      String?  @unique
  contractSigned        Boolean  @default(false)
}
```

### Flow de réservation :
1. Sélection du yacht
2. Choix période (heures/jours/semaines)
3. Définition itinéraire
4. Nombre de passagers
5. Options équipage (capitaine, crew)
6. Services additionnels (catering, sports nautiques)
7. Calcul prix (base + services + carburant)
8. Paiement + dépôt
9. Signature contrat électronique
10. Confirmation avec itinéraire

---

## 4. 🏠 MAIDS - Domestic Service Booking

### Caractéristiques spécifiques :
- **Contrat court/long terme**
- **Horaires de travail**
- **Tâches spécifiques**
- **Période d'essai**
- **Visa et documents**
- **Salaire mensuel**

### Modèle de données :
```prisma
model MaidBooking {
  id                    String   @id
  maidId                String
  
  // Contract Type
  contractType          String   // full-time, part-time, live-in, live-out
  startDate             DateTime
  endDate               DateTime?
  duration              String   // 1 month, 6 months, 1 year, etc.
  
  // Work Schedule
  workingDays           Json     // array of days
  workingHours          Json     // {start: "08:00", end: "17:00"}
  
  // Tasks
  tasks                 Json     // cleaning, cooking, childcare, etc.
  specialRequirements   String?
  
  // Trial Period
  trialPeriod           Boolean  @default(true)
  trialDuration         Int?     // days
  
  // Employer Info
  employerName          String
  employerEmail         String
  employerPhone         String
  employerAddress       String
  numberOfFamilyMembers Int
  hasChildren           Boolean
  hasPets               Boolean
  
  // Salary & Benefits
  monthlySalary         Float
  accommodation         String   // provided, not-provided
  food                  String   // provided, allowance
  transportation        String   // provided, allowance
  
  // Documents
  visaSponsorship       Boolean  @default(false)
  medicalInsurance      Boolean  @default(false)
  
  // Payment
  firstMonthSalary      Float
  deposit               Float?
  agencyFee             Float?
  totalAmount           Float
  paymentStatus         String   @default("pending")
  
  // Status
  status                String   @default("pending")
  confirmationCode      String?  @unique
}
```

### Flow de réservation :
1. Sélection de la maid
2. Type de contrat (full-time, part-time, live-in)
3. Dates début/fin
4. Horaires de travail
5. Tâches spécifiques
6. Informations employeur
7. Salaire et avantages
8. Documents (visa, assurance)
9. Paiement (1er mois + frais agence)
10. Confirmation avec contrat

---

## 5. 🏨 PROPRIÉTÉS - Property Booking

### Caractéristiques spécifiques :
- **Réservation par nuits**
- **Check-in/Check-out**
- **Nombre de guests**
- **Prix variable par saison**
- **Frais de nettoyage**
- **Caution**

### Modèle de données :
```prisma
model PropertyBooking {
  id                    String   @id
  propertyId            String
  
  // Stay Period
  checkInDate           DateTime
  checkOutDate          DateTime
  numberOfNights        Int
  
  // Guests
  numberOfGuests        Int
  numberOfAdults        Int
  numberOfChildren      Int
  
  // Guest Info
  guestName             String
  guestEmail            String
  guestPhone            String
  guestCountry          String
  
  // Special Requests
  earlyCheckIn          Boolean  @default(false)
  lateCheckOut          Boolean  @default(false)
  specialRequests       String?
  
  // Payment
  pricePerNight         Float
  numberOfNights        Int
  subtotal              Float
  cleaningFee           Float
  serviceFee            Float
  taxes                 Float
  deposit               Float
  totalAmount           Float
  paymentStatus         String   @default("pending")
  
  // Status
  status                String   @default("pending")
  confirmationCode      String?  @unique
}
```

---

## 6. 🎯 ACTIVITÉS - Activity Booking

### Caractéristiques spécifiques :
- **Réservation par créneaux**
- **Nombre de participants**
- **Équipement inclus**
- **Niveau requis**

### Modèle de données :
```prisma
model ActivityBooking {
  id                    String   @id
  activityId            String
  
  // Session
  activityDate          DateTime
  timeSlot              String
  duration              Int      // minutes
  
  // Participants
  numberOfParticipants  Int
  participantsList      Json?
  
  // Requirements
  skillLevel            String?  // beginner, intermediate, advanced
  ageRestriction        Boolean
  minimumAge            Int?
  
  // Contact
  customerName          String
  customerEmail         String
  customerPhone         String
  
  // Payment
  pricePerPerson        Float
  numberOfParticipants  Int
  equipmentFee          Float?
  totalAmount           Float
  paymentStatus         String   @default("pending")
  
  // Status
  status                String   @default("pending")
  confirmationCode      String?  @unique
}
```

---

## 7. 🎫 ÉVÉNEMENTS - Event Booking

### Caractéristiques spécifiques :
- **Billets par catégorie**
- **Places assises**
- **QR Code**
- **Check-in**

### Modèle de données :
```prisma
model EventBooking {
  id                    String   @id
  eventId               String
  
  // Tickets
  ticketType            String   // VIP, Standard, Early Bird
  numberOfTickets       Int
  seatNumbers           Json?
  
  // Attendee Info
  attendeeName          String
  attendeeEmail         String
  attendeePhone         String
  additionalAttendees   Json?
  
  // Payment
  ticketPrice           Float
  numberOfTickets       Int
  serviceFee            Float
  totalAmount           Float
  paymentStatus         String   @default("pending")
  
  // Status
  status                String   @default("confirmed")
  confirmationCode      String?  @unique
  qrCode                String?  @unique
  checkedIn             Boolean  @default(false)
  checkInTime           DateTime?
}
```

---

## 📊 RÉSUMÉ DES DIFFÉRENCES

| Type | Unité de temps | Durée typique | Paiement | Spécificités |
|------|---------------|---------------|----------|--------------|
| **Docteurs** | Créneaux horaires | 30-45 min | Par consultation | Symptômes, assurance, prescriptions |
| **Voitures** | Jours | 1-30 jours | Par jour + assurance | Kilométrage, caution, extras |
| **Yachts** | Heures/Jours | 4h - 7 jours | Par heure/jour | Équipage, catering, itinéraire |
| **Maids** | Contrat mensuel | 1-24 mois | Mensuel | Visa, tâches, logement |
| **Propriétés** | Nuits | 1-30 nuits | Par nuit | Check-in/out, guests, nettoyage |
| **Activités** | Sessions | 1-4 heures | Par personne | Équipement, niveau, participants |
| **Événements** | Billets | 1 jour | Par billet | Places, QR code, check-in |

---

## 🎯 RECOMMANDATIONS D'IMPLÉMENTATION

### 1. **Créer des modèles séparés**
Chaque type de booking doit avoir son propre modèle Prisma avec ses champs spécifiques.

### 2. **API Routes dédiées**
```
/api/doctor-appointments
/api/car-rentals
/api/yacht-charters
/api/maid-contracts
/api/property-bookings
/api/activity-bookings
/api/event-tickets
```

### 3. **Composants UI spécifiques**
Chaque type doit avoir son propre composant de booking avec son interface adaptée.

### 4. **Validation spécifique**
Les règles de validation doivent être adaptées à chaque type (ex: âge minimum pour conduire, nombre max de passagers sur yacht, etc.)

### 5. **Workflow de confirmation**
Chaque type peut avoir un workflow différent :
- Docteurs : Confirmation immédiate
- Voitures : Vérification permis
- Yachts : Signature contrat
- Maids : Période d'essai
- Propriétés : Approbation propriétaire

---

## ✅ CONCLUSION

**Chaque type de service nécessite un système de booking UNIQUE et SPÉCIFIQUE.**

Ne pas essayer de créer un système générique qui couvre tous les cas - cela deviendrait trop complexe et peu efficace.

**Approche recommandée :**
1. Créer un modèle de base commun (id, status, payment, confirmation)
2. Étendre avec des champs spécifiques pour chaque type
3. Créer des API et composants dédiés
4. Adapter le workflow à chaque besoin

---

**Version**: 1.0.0  
**Date**: November 2025  
**Status**: 📋 Documentation Architecture
