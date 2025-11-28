# 🎯 SYSTÈME DE BOOKING COMPLET - JUSTRICHARD

**Date**: 26 Nov 2025, 22:15 UTC+07:00
**Objectif**: Système de booking différencié pour chaque type de service

---

## 📊 ANALYSE DES BOOKINGS EXISTANTS

### **✅ BOOKINGS DÉJÀ IMPLÉMENTÉS** (5 types)

| Modèle | Service | Champs Spécifiques | Statut |
|--------|---------|-------------------|--------|
| **RentalBooking** | Location de voitures | pickupDate, dropoffDate, mileageIncluded, extraKmFee, deliveryFee, noDepositFee | ✅ Complet |
| **TransferBooking** | Transferts/Navettes | pickupLocation, dropoffLocation, passengers, luggage, childSeat, wheelchairAccess, driverAssigned | ✅ Complet |
| **MovingBooking** | Déménagement | fromAddress, toAddress, distance, movingDate, numberOfRooms, needPacking, vehicleType | ✅ Complet |
| **CleaningBooking** | Nettoyage (Home/Furniture/Laundry) | serviceType, propertyType, bedrooms, bathrooms, items, selectedOptions, selectedAddons | ✅ Complet |
| **Booking** | Générique (Legacy) | type, startDate, endDate, providerId, serviceId | ⚠️ À remplacer |

---

## ❌ BOOKINGS MANQUANTS (8 types)

### **1. CoachBooking** - Réservations de Coaching
```prisma
model CoachBooking {
  id            String   @id @default(cuid())
  bookingNumber String   @unique
  
  // Relations
  coachId       String
  coach         Coach    @relation(fields: [coachId], references: [id])
  userId        String?
  user          User?    @relation(fields: [userId], references: [id])
  
  // Customer Info
  customerName  String
  customerEmail String
  customerPhone String
  
  // Session Details
  sessionType   String   // personal, group, online, in-person
  sessionDate   DateTime
  sessionTime   String
  duration      Int      // minutes
  location      String?  // for in-person sessions
  meetingLink   String?  // for online sessions
  
  // Participants (for group sessions)
  numberOfParticipants Int @default(1)
  participantNames     Json? // Array of names
  
  // Service Details
  category      String   // fitness, nutrition, life-coaching, business
  goals         String?  @db.Text // Client goals
  experience    String?  // beginner, intermediate, advanced
  
  // Pricing
  basePrice     Float
  discount      Float    @default(0)
  totalPrice    Float
  currency      String   @default("AED")
  
  // Payment
  paymentStatus String   @default("pending") // pending, paid, refunded
  paymentMethod String?
  paymentId     String?
  
  // Status
  status        String   @default("pending") // pending, confirmed, completed, cancelled, no-show
  
  // Notes
  specialRequests String? @db.Text
  adminNotes      String? @db.Text
  
  // Ratings
  rating        Float?
  review        String?  @db.Text
  reviewDate    DateTime?
  
  // Timestamps
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  completedAt   DateTime?
  cancelledAt   DateTime?
  
  @@index([coachId])
  @@index([userId])
  @@index([status])
  @@index([sessionDate])
  @@index([bookingNumber])
}
```

---

### **2. YachtBooking** - Réservations de Yachts
```prisma
model YachtBooking {
  id            String   @id @default(cuid())
  bookingNumber String   @unique
  
  // Relations
  yachtId       String
  yacht         Yacht    @relation(fields: [yachtId], references: [id])
  userId        String?
  user          User?    @relation(fields: [userId], references: [id])
  
  // Customer Info
  customerName  String
  customerEmail String
  customerPhone String
  
  // Booking Details
  bookingDate   DateTime
  startTime     String
  duration      Int      // hours (1, 2, 3, 4, 8, 12, 24)
  endTime       String
  
  // Guests
  numberOfGuests Int
  guestNames     Json?   // Array of guest names
  
  // Trip Details
  tripType      String   // cruise, party, fishing, diving, event
  departurePoint String
  destination   String?
  route         String?  @db.Text
  
  // Services & Amenities
  includeCatering Boolean @default(false)
  cateringType    String? // breakfast, lunch, dinner, snacks
  includeWaterSports Boolean @default(false)
  waterSportsType Json?   // Array of water sports
  includeCrew     Boolean @default(true)
  crewSize        Int?
  includePhotographer Boolean @default(false)
  includeDJ       Boolean @default(false)
  
  // Pricing
  basePrice       Float
  cateringPrice   Float   @default(0)
  waterSportsPrice Float  @default(0)
  crewPrice       Float   @default(0)
  extraServices   Float   @default(0)
  discount        Float   @default(0)
  totalPrice      Float
  currency        String  @default("AED")
  
  // Payment
  depositAmount   Float?
  depositPaid     Boolean @default(false)
  paymentStatus   String  @default("pending") // pending, deposit_paid, fully_paid, refunded
  paymentMethod   String?
  paymentId       String?
  
  // Status
  status          String  @default("pending") // pending, confirmed, in_progress, completed, cancelled
  
  // Notes
  specialRequests String? @db.Text
  adminNotes      String? @db.Text
  
  // Weather & Safety
  weatherConditions String?
  safetyBriefing    Boolean @default(false)
  
  // Ratings
  rating          Float?
  review          String? @db.Text
  reviewDate      DateTime?
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  completedAt     DateTime?
  cancelledAt     DateTime?
  
  @@index([yachtId])
  @@index([userId])
  @@index([status])
  @@index([bookingDate])
  @@index([bookingNumber])
}
```

---

### **3. DoctorAppointment** - Rendez-vous Médicaux
```prisma
model DoctorAppointment {
  id              String   @id @default(cuid())
  appointmentNumber String @unique
  
  // Relations
  providerId      String
  provider        Provider @relation(fields: [providerId], references: [id])
  userId          String?
  user            User?    @relation(fields: [userId], references: [id])
  
  // Patient Info
  patientName     String
  patientEmail    String
  patientPhone    String
  patientAge      Int?
  patientGender   String?  // male, female, other
  
  // Appointment Details
  appointmentDate DateTime
  appointmentTime String
  duration        Int      @default(30) // minutes
  appointmentType String   // consultation, follow-up, emergency, telemedicine
  
  // Medical Details
  specialty       String   // general, dentist, dermatologist, etc.
  reasonForVisit  String   @db.Text
  symptoms        String?  @db.Text
  medicalHistory  String?  @db.Text
  allergies       String?  @db.Text
  currentMedications String? @db.Text
  
  // Insurance
  hasInsurance    Boolean  @default(false)
  insuranceProvider String?
  insuranceNumber String?
  
  // Pricing
  consultationFee Float
  additionalFees  Float    @default(0)
  discount        Float    @default(0)
  totalPrice      Float
  currency        String   @default("AED")
  
  // Payment
  paymentStatus   String   @default("pending") // pending, paid, insurance_pending, refunded
  paymentMethod   String?
  paymentId       String?
  
  // Status
  status          String   @default("scheduled") // scheduled, confirmed, in_progress, completed, cancelled, no_show
  
  // Medical Records
  diagnosis       String?  @db.Text
  prescription    String?  @db.Text
  labTests        Json?    // Array of lab tests ordered
  followUpDate    DateTime?
  
  // Notes
  patientNotes    String?  @db.Text
  doctorNotes     String?  @db.Text
  adminNotes      String?  @db.Text
  
  // Ratings
  rating          Float?
  review          String?  @db.Text
  reviewDate      DateTime?
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  completedAt     DateTime?
  cancelledAt     DateTime?
  
  @@index([providerId])
  @@index([userId])
  @@index([status])
  @@index([appointmentDate])
  @@index([appointmentNumber])
}
```

---

### **4. LawyerConsultation** - Consultations Juridiques
```prisma
model LawyerConsultation {
  id              String   @id @default(cuid())
  consultationNumber String @unique
  
  // Relations
  providerId      String
  provider        Provider @relation(fields: [providerId], references: [id])
  userId          String?
  user            User?    @relation(fields: [userId], references: [id])
  
  // Client Info
  clientName      String
  clientEmail     String
  clientPhone     String
  clientType      String   // individual, business
  companyName     String?
  
  // Consultation Details
  consultationDate DateTime
  consultationTime String
  duration        Int      @default(60) // minutes
  consultationType String  // initial, follow-up, court_appearance, document_review
  meetingType     String   // in-person, video, phone
  meetingLink     String?  // for video consultations
  
  // Legal Details
  legalArea       String   // family, corporate, criminal, real_estate, immigration, etc.
  caseType        String?  // divorce, contract, lawsuit, visa, etc.
  caseDescription String   @db.Text
  urgency         String   @default("normal") // low, normal, high, urgent
  
  // Documents
  documentsProvided Boolean @default(false)
  documentsList     Json?   // Array of document names/types
  
  // Pricing
  consultationFee Float
  documentReviewFee Float  @default(0)
  additionalFees  Float    @default(0)
  discount        Float    @default(0)
  totalPrice      Float
  currency        String   @default("AED")
  
  // Payment
  paymentStatus   String   @default("pending") // pending, paid, refunded
  paymentMethod   String?
  paymentId       String?
  
  // Status
  status          String   @default("scheduled") // scheduled, confirmed, in_progress, completed, cancelled, no_show
  
  // Case Management
  caseOpened      Boolean  @default(false)
  caseNumber      String?
  nextSteps       String?  @db.Text
  followUpDate    DateTime?
  
  // Notes
  clientNotes     String?  @db.Text
  lawyerNotes     String?  @db.Text
  adminNotes      String?  @db.Text
  
  // Confidentiality
  confidential    Boolean  @default(true)
  nda Signed      Boolean  @default(false)
  
  // Ratings
  rating          Float?
  review          String?  @db.Text
  reviewDate      DateTime?
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  completedAt     DateTime?
  cancelledAt     DateTime?
  
  @@index([providerId])
  @@index([userId])
  @@index([status])
  @@index([consultationDate])
  @@index([consultationNumber])
}
```

---

### **5. ActivityBooking** - Réservations d'Activités
```prisma
model ActivityBooking {
  id            String   @id @default(cuid())
  bookingNumber String   @unique
  
  // Relations
  activityId    String
  activity      Activity @relation(fields: [activityId], references: [id])
  userId        String?
  user          User?    @relation(fields: [userId], references: [id])
  
  // Customer Info
  customerName  String
  customerEmail String
  customerPhone String
  
  // Booking Details
  bookingDate   DateTime
  bookingTime   String
  duration      String?  // from activity
  
  // Participants
  numberOfAdults    Int @default(1)
  numberOfChildren  Int @default(0)
  numberOfInfants   Int @default(0)
  participantNames  Json? // Array of participant names
  participantAges   Json? // Array of ages for safety/insurance
  
  // Activity Details
  difficulty        String? // easy, moderate, hard, extreme
  experienceLevel   String? // beginner, intermediate, advanced
  
  // Equipment & Services
  equipmentRental   Boolean @default(false)
  equipmentList     Json?   // Array of rented equipment
  includeTransport  Boolean @default(false)
  pickupLocation    String?
  includeMeals      Boolean @default(false)
  mealType          String? // breakfast, lunch, dinner, snacks
  includePhotos     Boolean @default(false)
  includeVideo      Boolean @default(false)
  
  // Pricing
  pricePerAdult     Float
  pricePerChild     Float   @default(0)
  equipmentFee      Float   @default(0)
  transportFee      Float   @default(0)
  mealsFee          Float   @default(0)
  photoVideoFee     Float   @default(0)
  discount          Float   @default(0)
  totalPrice        Float
  currency          String  @default("AED")
  
  // Payment
  depositAmount     Float?
  depositPaid       Boolean @default(false)
  paymentStatus     String  @default("pending") // pending, deposit_paid, fully_paid, refunded
  paymentMethod     String?
  paymentId         String?
  
  // Status
  status            String  @default("pending") // pending, confirmed, in_progress, completed, cancelled
  
  // Safety & Waivers
  waiverSigned      Boolean @default(false)
  emergencyContact  String?
  emergencyPhone    String?
  medicalConditions String? @db.Text
  
  // Notes
  specialRequests   String? @db.Text
  dietaryRestrictions String?
  adminNotes        String? @db.Text
  
  // Weather & Conditions
  weatherDependent  Boolean @default(false)
  weatherConditions String?
  
  // Ratings
  rating            Float?
  review            String? @db.Text
  reviewDate        DateTime?
  
  // Timestamps
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  completedAt       DateTime?
  cancelledAt       DateTime?
  
  @@index([activityId])
  @@index([userId])
  @@index([status])
  @@index([bookingDate])
  @@index([bookingNumber])
}
```

---

### **6. PropertyBooking** - Réservations de Propriétés
```prisma
model PropertyBooking {
  id            String   @id @default(cuid())
  bookingNumber String   @unique
  
  // Relations
  propertyId    String
  property      Property @relation(fields: [propertyId], references: [id])
  userId        String?
  user          User?    @relation(fields: [userId], references: [id])
  
  // Customer Info
  customerName  String
  customerEmail String
  customerPhone String
  nationality   String?
  
  // Booking Details
  checkInDate   DateTime
  checkOutDate  DateTime
  checkInTime   String   @default("14:00")
  checkOutTime  String   @default("12:00")
  nights        Int
  
  // Guests
  numberOfAdults    Int @default(1)
  numberOfChildren  Int @default(0)
  numberOfInfants   Int @default(0)
  guestNames        Json? // Array of guest names
  
  // Property Type
  propertyType      String // villa, apartment, hotel, resort
  bookingType       String // daily, weekly, monthly, yearly
  
  // Services
  includeBreakfast  Boolean @default(false)
  includeCleaning   Boolean @default(false)
  cleaningFrequency String? // daily, weekly, bi-weekly
  includeAirport    Boolean @default(false)
  airportPickup     Boolean @default(false)
  airportDropoff    Boolean @default(false)
  
  // Pricing
  pricePerNight     Float
  cleaningFee       Float   @default(0)
  serviceFee        Float   @default(0)
  airportFee        Float   @default(0)
  extraGuestFee     Float   @default(0)
  discount          Float   @default(0)
  totalPrice        Float
  currency          String  @default("AED")
  
  // Payment
  depositAmount     Float?
  depositPaid       Boolean @default(false)
  securityDeposit   Float?
  securityDepositPaid Boolean @default(false)
  paymentStatus     String  @default("pending") // pending, deposit_paid, fully_paid, refunded
  paymentMethod     String?
  paymentId         String?
  
  // Status
  status            String  @default("pending") // pending, confirmed, checked_in, checked_out, cancelled
  
  // Check-in/out
  actualCheckIn     DateTime?
  actualCheckOut    DateTime?
  keyHandover       Boolean @default(false)
  propertyInspection Boolean @default(false)
  
  // Notes
  specialRequests   String? @db.Text
  arrivalTime       String?
  purposeOfStay     String? // vacation, business, event
  adminNotes        String? @db.Text
  
  // Damage & Issues
  damageReported    Boolean @default(false)
  damageDescription String? @db.Text
  damageAmount      Float?
  
  // Ratings
  rating            Float?
  review            String? @db.Text
  reviewDate        DateTime?
  
  // Timestamps
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  completedAt       DateTime?
  cancelledAt       DateTime?
  
  @@index([propertyId])
  @@index([userId])
  @@index([status])
  @@index([checkInDate])
  @@index([bookingNumber])
}
```

---

### **7. MaidBooking** - Réservations de Femmes de Ménage
```prisma
model MaidBooking {
  id            String   @id @default(cuid())
  bookingNumber String   @unique
  
  // Relations
  maidId        String
  maid          Maid     @relation(fields: [maidId], references: [id])
  userId        String?
  user          User?    @relation(fields: [userId], references: [id])
  
  // Customer Info
  customerName  String
  customerEmail String
  customerPhone String
  customerAddress String
  
  // Booking Details
  bookingType   String   // one-time, recurring
  startDate     DateTime
  endDate       DateTime?
  workingDays   Json?    // Array of days for recurring bookings
  workingHours  String   // full-time, part-time, hourly
  hoursPerDay   Int?
  
  // Service Details
  serviceType   String   // cleaning, cooking, babysitting, elderly_care, full_service
  tasks         Json?    // Array of specific tasks
  
  // Property Details
  propertyType  String   // villa, apartment, office
  bedrooms      Int?
  bathrooms     Int?
  squareMeters  Float?
  floors        Int?
  
  // Requirements
  languageRequired String? // english, arabic, hindi, tagalog, etc.
  experienceYears  Int?
  hasReferences    Boolean @default(false)
  livein           Boolean @default(false)
  
  // Pricing
  salaryType    String   // hourly, daily, weekly, monthly
  hourlyRate    Float?
  dailyRate     Float?
  weeklyRate    Float?
  monthlyRate   Float?
  totalPrice    Float
  currency      String   @default("AED")
  
  // Payment
  paymentStatus String   @default("pending") // pending, paid, refunded
  paymentMethod String?
  paymentId     String?
  
  // Status
  status        String   @default("pending") // pending, confirmed, active, completed, cancelled
  
  // Contract
  contractSigned Boolean @default(false)
  contractStart  DateTime?
  contractEnd    DateTime?
  noticePeriod   Int?     // days
  
  // Notes
  specialRequests String? @db.Text
  adminNotes      String? @db.Text
  
  // Performance
  rating          Float?
  review          String? @db.Text
  reviewDate      DateTime?
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  completedAt     DateTime?
  cancelledAt     DateTime?
  
  @@index([maidId])
  @@index([userId])
  @@index([status])
  @@index([startDate])
  @@index([bookingNumber])
}
```

---

### **8. ScooterBooking** - Réservations de Scooters
```prisma
model ScooterBooking {
  id            String   @id @default(cuid())
  bookingNumber String   @unique
  
  // Relations
  scooterId     String
  scooter       Scooter  @relation(fields: [scooterId], references: [id])
  userId        String?
  user          User?    @relation(fields: [userId], references: [id])
  
  // Customer Info
  customerName  String
  customerEmail String
  customerPhone String
  
  // Driver Info
  driverLicense String
  licenseExpiry DateTime
  driverAge     Int
  
  // Booking Details
  pickupDate    DateTime
  dropoffDate   DateTime
  pickupTime    String
  dropoffTime   String
  days          Int
  
  // Location
  pickupLocation  String
  dropoffLocation String
  
  // Insurance & Protection
  includeInsurance Boolean @default(true)
  insuranceType    String? // basic, premium, full
  includeHelmet    Boolean @default(true)
  helmetSize       String? // S, M, L, XL
  
  // Pricing
  pricePerDay     Float
  insuranceFee    Float   @default(0)
  helmetFee       Float   @default(0)
  deliveryFee     Float   @default(0)
  discount        Float   @default(0)
  totalPrice      Float
  currency        String  @default("AED")
  
  // Payment
  depositAmount   Float?
  depositPaid     Boolean @default(false)
  paymentStatus   String  @default("pending") // pending, deposit_paid, fully_paid, refunded
  paymentMethod   String?
  paymentId       String?
  
  // Status
  status          String  @default("pending") // pending, confirmed, active, completed, cancelled
  
  // Fuel & Mileage
  fuelLevel       String? // full, half, quarter, empty
  mileageStart    Int?
  mileageEnd      Int?
  
  // Damage & Issues
  damageReported  Boolean @default(false)
  damageDescription String? @db.Text
  damageAmount    Float?
  
  // Notes
  specialRequests String? @db.Text
  adminNotes      String? @db.Text
  
  // Ratings
  rating          Float?
  review          String? @db.Text
  reviewDate      DateTime?
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  completedAt     DateTime?
  cancelledAt     DateTime?
  
  @@index([scooterId])
  @@index([userId])
  @@index([status])
  @@index([pickupDate])
  @@index([bookingNumber])
}
```

---

## 📋 RÉSUMÉ DES BOOKINGS

### **Bookings Existants** ✅
1. ✅ **RentalBooking** - Location de voitures
2. ✅ **TransferBooking** - Transferts/Navettes
3. ✅ **MovingBooking** - Déménagement
4. ✅ **CleaningBooking** - Nettoyage (Home/Furniture/Laundry)
5. ⚠️ **Booking** - Générique (à remplacer)

### **Bookings à Créer** ❌
6. ❌ **CoachBooking** - Coaching (fitness, nutrition, life, business)
7. ❌ **YachtBooking** - Yachts (cruise, party, fishing, diving)
8. ❌ **DoctorAppointment** - Rendez-vous médicaux
9. ❌ **LawyerConsultation** - Consultations juridiques
10. ❌ **ActivityBooking** - Activités (sports, tours, adventures)
11. ❌ **PropertyBooking** - Propriétés (villas, apartments, hotels)
12. ❌ **MaidBooking** - Femmes de ménage (one-time, recurring)
13. ❌ **ScooterBooking** - Scooters (rental)

---

## 🎯 PROCHAINES ÉTAPES

### **Phase 1: Créer les modèles Prisma** ⏳
```bash
# Ajouter les 8 nouveaux modèles au schema.prisma
# Créer la migration
npx prisma migrate dev --name add_specialized_bookings
```

### **Phase 2: Créer les API Routes** ⏳
```
/api/bookings/coach/
/api/bookings/yacht/
/api/bookings/doctor/
/api/bookings/lawyer/
/api/bookings/activity/
/api/bookings/property/
/api/bookings/maid/
/api/bookings/scooter/
```

### **Phase 3: Créer les composants de booking** ⏳
```
/components/bookings/CoachBookingForm.tsx
/components/bookings/YachtBookingForm.tsx
/components/bookings/DoctorAppointmentForm.tsx
... etc
```

### **Phase 4: Intégrer dans les pages** ⏳
```
/[locale]/coaches/[slug]/book
/[locale]/yachts/[slug]/book
/[locale]/doctors/[slug]/book
... etc
```

---

## 💡 AVANTAGES DU SYSTÈME

### **1. Spécialisation**
Chaque type de booking a ses propres champs adaptés au service.

### **2. Flexibilité**
Facile d'ajouter de nouveaux champs sans impacter les autres bookings.

### **3. Performance**
Requêtes optimisées avec des index spécifiques.

### **4. Maintenance**
Code plus clair et plus facile à maintenir.

### **5. Évolutivité**
Facile d'ajouter de nouveaux types de bookings.

---

**🎯 SYSTÈME DE BOOKING COMPLET ET DIFFÉRENCIÉ ! ✨**
