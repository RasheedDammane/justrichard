# 🚀 ROADMAP - Prochaines Fonctionnalités JustRichard

**Date**: 26 Nov 2025, 00:55 UTC+07:00
**Objectif**: Plan d'action complet pour les fonctionnalités manquantes
**Priorité**: Haute

---

## 📋 ÉTAT DES LIEUX

### ✅ **CE QUI EXISTE DÉJÀ**

#### **Services de nettoyage** 🧹
- ✅ `/home-cleaning/` - Page principale
- ✅ `/home-cleaning/home/` - Nettoyage maison
- ✅ `/home-cleaning/furniture/` - Nettoyage meubles
- ✅ `/home-cleaning/laundry/` - Blanchisserie
- ✅ `/home-cleaning/booking/` - Réservation
- ✅ `/home-cleaning/confirmation/` - Confirmation
- ✅ Modèle Prisma `Maid` existe

#### **Événements** 🎉
- ✅ Modèle Prisma `Event` complet
- ✅ Modèle `EventCategory`
- ✅ Modèle `EventRegistration`
- ✅ Modèle `EventSchedule`
- ✅ Modèle `EventSpeaker`
- ✅ Modèle `EventTicket`
- ❌ **MAIS pas de pages frontend ni admin**

#### **Location** 🚗
- ✅ Rental Cars (formulaire amélioré)
- ✅ Motorbikes (formulaire créé)
- ✅ Yachts (système complet)

---

## 🎯 FONCTIONNALITÉS À DÉVELOPPER

### **PRIORITÉ 1 : Services de déménagement & colis** 🚚

#### **1.1 Moving Services (Déménagement)** 🏠➡️🏠
**Besoin**:
- Service de déménagement avec partenaires
- Calcul de volume/poids
- Devis en ligne
- Réservation avec créneau horaire
- Suivi en temps réel

**À créer**:
```
📦 MODÈLE PRISMA
model MovingService {
  id                String   @id @default(cuid())
  name              String
  slug              String   @unique
  description       String   @db.Text
  shortDescription  String?
  
  // Partenaire
  partnerId         String
  partner           Partner  @relation(fields: [partnerId], references: [id])
  
  // Pricing
  basePrice         Float    // Prix de base
  pricePerKm        Float    // Prix par km
  pricePerCubicM    Float    // Prix par m³
  pricePerHour      Float?   // Prix par heure
  
  // Services inclus
  packingIncluded   Boolean  @default(false)
  unpackingIncluded Boolean  @default(false)
  assemblyIncluded  Boolean  @default(false)
  storageAvailable  Boolean  @default(false)
  
  // Véhicules disponibles
  vehicleTypes      Json     // ["Small Van", "Large Van", "Truck", "Container"]
  
  // Zones couvertes
  coverageAreas     Json     // ["Dubai", "Abu Dhabi", "Sharjah"]
  
  // Disponibilité
  availableDays     Json     // [1,2,3,4,5,6,0] (0=dimanche)
  workingHours      Json     // {"start": "08:00", "end": "20:00"}
  
  // Images & Media
  images            Json?
  logo              String?
  
  // SEO
  metaTitle         String?
  metaDescription   String?
  
  // Stats
  totalBookings     Int      @default(0)
  rating            Float    @default(0)
  reviewCount       Int      @default(0)
  
  // Status
  isActive          Boolean  @default(true)
  isFeatured        Boolean  @default(false)
  
  // Relations
  bookings          MovingBooking[]
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@index([slug])
  @@index([partnerId])
  @@index([isActive])
  @@index([isFeatured])
}

model MovingBooking {
  id                String   @id @default(cuid())
  bookingNumber     String   @unique
  
  // Service
  serviceId         String
  service           MovingService @relation(fields: [serviceId], references: [id])
  
  // Client
  userId            String
  user              User     @relation(fields: [userId], references: [id])
  
  // Détails du déménagement
  fromAddress       String
  fromCity          String
  fromCountry       String
  fromFloor         Int?
  fromElevator      Boolean  @default(false)
  
  toAddress         String
  toCity            String
  toCountry         String
  toFloor           Int?
  toElevator        Boolean  @default(false)
  
  distance          Float?   // km
  
  // Date & Heure
  movingDate        DateTime
  preferredTime     String   // "morning", "afternoon", "evening"
  estimatedDuration Int?     // heures
  
  // Volume & Items
  estimatedVolume   Float?   // m³
  numberOfRooms     Int?
  itemsList         Json?    // Liste détaillée des items
  
  // Services additionnels
  needPacking       Boolean  @default(false)
  needUnpacking     Boolean  @default(false)
  needAssembly      Boolean  @default(false)
  needStorage       Boolean  @default(false)
  storageDuration   Int?     // jours
  
  // Véhicule
  vehicleType       String
  numberOfVehicles  Int      @default(1)
  
  // Pricing
  basePrice         Float
  distancePrice     Float
  volumePrice       Float
  additionalServices Float   @default(0)
  totalPrice        Float
  currency          String   @default("AED")
  
  // Payment
  paymentStatus     String   @default("pending") // pending, paid, refunded
  paymentMethod     String?
  
  // Status
  status            String   @default("pending") // pending, confirmed, in_progress, completed, cancelled
  
  // Notes
  specialInstructions String? @db.Text
  adminNotes        String?  @db.Text
  
  // Tracking
  currentLocation   String?
  estimatedArrival  DateTime?
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@index([bookingNumber])
  @@index([userId])
  @@index([serviceId])
  @@index([status])
  @@index([movingDate])
}

📄 PAGES FRONTEND
/services/moving/
  ├── page.tsx                    # Liste des services de déménagement
  ├── [slug]/
  │   └── page.tsx                # Détail du service
  └── booking/
      ├── page.tsx                # Formulaire de réservation
      ├── quote/page.tsx          # Calculateur de devis
      └── confirmation/page.tsx   # Confirmation

🎨 COMPOSANTS
/components/moving/
  ├── MovingCalculator.tsx        # Calculateur de volume/prix
  ├── MovingBookingForm.tsx       # Formulaire de réservation
  ├── MovingServiceCard.tsx       # Card service
  ├── MovingTracker.tsx           # Suivi en temps réel
  └── ItemsChecklist.tsx          # Liste d'items à déménager

🔧 ADMIN
/admin/moving/
  ├── page.tsx                    # Liste des services
  ├── new/page.tsx                # Nouveau service
  ├── edit/[id]/page.tsx          # Éditer service
  └── bookings/
      ├── page.tsx                # Liste des réservations
      └── [id]/page.tsx           # Détail réservation

📡 API ROUTES
/api/moving/
  ├── route.ts                    # GET/POST services
  ├── [id]/route.ts               # GET/PUT/DELETE service
  ├── quote/route.ts              # POST calculer devis
  └── bookings/
      ├── route.ts                # GET/POST bookings
      └── [id]/route.ts           # GET/PUT/DELETE booking
```

---

#### **1.2 Parcel Delivery (Envoi de colis)** 📦

**Besoin**:
- Service d'envoi de colis avec partenaires
- Calcul de prix selon poids/dimensions
- Suivi de colis
- Points de collecte/livraison

**À créer**:
```
📦 MODÈLE PRISMA
model ParcelService {
  id                String   @id @default(cuid())
  name              String
  slug              String   @unique
  description       String   @db.Text
  
  // Partenaire
  partnerId         String
  partner           Partner  @relation(fields: [partnerId], references: [id])
  
  // Pricing
  basePrice         Float
  pricePerKg        Float
  pricePerKm        Float?
  
  // Limites
  maxWeight         Float    // kg
  maxLength         Float    // cm
  maxWidth          Float    // cm
  maxHeight         Float    // cm
  
  // Services
  expressAvailable  Boolean  @default(false)
  sameDay           Boolean  @default(false)
  nextDay           Boolean  @default(false)
  international     Boolean  @default(false)
  
  // Tracking
  trackingAvailable Boolean  @default(true)
  insuranceAvailable Boolean @default(true)
  
  // Zones
  coverageAreas     Json
  
  // Images
  logo              String?
  
  // Stats
  totalDeliveries   Int      @default(0)
  rating            Float    @default(0)
  
  isActive          Boolean  @default(true)
  isFeatured        Boolean  @default(false)
  
  deliveries        ParcelDelivery[]
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@index([slug])
  @@index([partnerId])
}

model ParcelDelivery {
  id                String   @id @default(cuid())
  trackingNumber    String   @unique
  
  // Service
  serviceId         String
  service           ParcelService @relation(fields: [serviceId], references: [id])
  
  // Expéditeur
  senderId          String
  sender            User     @relation("SentParcels", fields: [senderId], references: [id])
  senderName        String
  senderPhone       String
  senderAddress     String
  senderCity        String
  
  // Destinataire
  recipientName     String
  recipientPhone    String
  recipientAddress  String
  recipientCity     String
  recipientCountry  String
  
  // Colis
  weight            Float    // kg
  length            Float    // cm
  width             Float    // cm
  height            Float    // cm
  volume            Float    // cm³
  
  // Type
  parcelType        String   // "document", "package", "fragile", "valuable"
  contents          String
  declaredValue     Float?
  
  // Service type
  deliveryType      String   // "standard", "express", "same_day", "next_day"
  
  // Pricing
  basePrice         Float
  weightPrice       Float
  distancePrice     Float?
  insurancePrice    Float    @default(0)
  totalPrice        Float
  currency          String   @default("AED")
  
  // Dates
  pickupDate        DateTime?
  estimatedDelivery DateTime?
  actualDelivery    DateTime?
  
  // Status & Tracking
  status            String   @default("pending") // pending, picked_up, in_transit, out_for_delivery, delivered, failed
  currentLocation   String?
  trackingHistory   Json?    // [{timestamp, location, status, note}]
  
  // Payment
  paymentStatus     String   @default("pending")
  paymentMethod     String?
  
  // Notes
  specialInstructions String? @db.Text
  deliveryNotes     String?  @db.Text
  
  // Proof of delivery
  signature         String?
  deliveryPhoto     String?
  receivedBy        String?
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@index([trackingNumber])
  @@index([senderId])
  @@index([serviceId])
  @@index([status])
}

📄 PAGES FRONTEND
/services/parcel/
  ├── page.tsx                    # Services de livraison
  ├── [slug]/page.tsx             # Détail service
  ├── send/
  │   ├── page.tsx                # Formulaire envoi
  │   └── quote/page.tsx          # Calculateur prix
  ├── track/
  │   └── page.tsx                # Suivi de colis
  └── confirmation/page.tsx       # Confirmation

🎨 COMPOSANTS
/components/parcel/
  ├── ParcelCalculator.tsx        # Calculateur prix
  ├── ParcelSendForm.tsx          # Formulaire envoi
  ├── ParcelTracker.tsx           # Suivi colis
  ├── ParcelTimeline.tsx          # Timeline tracking
  └── ParcelServiceCard.tsx       # Card service

🔧 ADMIN
/admin/parcel/
  ├── page.tsx                    # Services
  ├── deliveries/
  │   ├── page.tsx                # Liste livraisons
  │   └── [id]/page.tsx           # Détail livraison
  └── tracking/page.tsx           # Tableau de bord tracking

📡 API ROUTES
/api/parcel/
  ├── route.ts                    # Services
  ├── quote/route.ts              # Calculer prix
  ├── send/route.ts               # Créer livraison
  └── track/[trackingNumber]/route.ts  # Tracking
```

---

### **PRIORITÉ 2 : Gestion des événements** 🎉

**État**: Modèles Prisma existent mais **pas de frontend ni admin**

**À créer**:
```
📄 PAGES FRONTEND
/events/
  ├── page.tsx                    # Liste des événements
  ├── [slug]/
  │   ├── page.tsx                # Détail événement
  │   └── register/page.tsx       # Inscription
  ├── categories/
  │   └── [slug]/page.tsx         # Événements par catégorie
  └── my-events/page.tsx          # Mes événements

🎨 COMPOSANTS
/components/events/
  ├── EventCard.tsx               # Card événement
  ├── EventCalendar.tsx           # Calendrier
  ├── EventRegistrationForm.tsx   # Formulaire inscription
  ├── EventSchedule.tsx           # Programme
  ├── EventSpeakers.tsx           # Intervenants
  ├── EventTickets.tsx            # Billets
  └── EventCountdown.tsx          # Compte à rebours

🔧 ADMIN
/admin/events/
  ├── page.tsx                    # Liste événements
  ├── new/page.tsx                # Nouvel événement
  ├── edit/[id]/page.tsx          # Éditer événement
  ├── categories/page.tsx         # Catégories
  ├── registrations/
  │   ├── page.tsx                # Liste inscriptions
  │   └── [id]/page.tsx           # Détail inscription
  └── analytics/page.tsx          # Analytics événements

📡 API ROUTES
/api/events/
  ├── route.ts                    # GET/POST événements
  ├── [id]/route.ts               # GET/PUT/DELETE
  ├── categories/route.ts         # Catégories
  ├── register/route.ts           # Inscription
  └── [id]/
      ├── schedule/route.ts       # Programme
      ├── speakers/route.ts       # Intervenants
      └── tickets/route.ts        # Billets
```

---

### **PRIORITÉ 3 : Amélioration Home Cleaning** 🧹

**État**: Pages existent mais **à améliorer**

**Améliorations**:
```
✅ CE QUI EXISTE
- Pages frontend basiques
- Modèle Maid dans Prisma
- Formulaire admin (MaidForm)

🔄 À AMÉLIORER
1. **Système de réservation complet**
   - Calendrier de disponibilité
   - Sélection de créneaux horaires
   - Services additionnels
   - Pricing dynamique

2. **Profils de Maids détaillés**
   - Photos
   - Expérience
   - Spécialités
   - Avis clients
   - Disponibilité

3. **Packages de nettoyage**
   - Nettoyage régulier (quotidien, hebdo, mensuel)
   - Nettoyage profond
   - Nettoyage après événement
   - Nettoyage de bureaux

4. **Suivi des réservations**
   - Statut en temps réel
   - Notifications
   - Historique
   - Facturation

📦 MODÈLES À AJOUTER
model CleaningBooking {
  id                String   @id @default(cuid())
  bookingNumber     String   @unique
  
  maidId            String
  maid              Maid     @relation(fields: [maidId], references: [id])
  
  userId            String
  user              User     @relation(fields: [userId], references: [id])
  
  // Service
  serviceType       String   // "home", "furniture", "laundry", "deep_clean"
  packageType       String?  // "one_time", "weekly", "monthly"
  
  // Détails
  address           String
  cityId            String
  city              City     @relation(fields: [cityId], references: [id])
  
  numberOfRooms     Int?
  squareMeters      Float?
  
  // Date & Heure
  bookingDate       DateTime
  startTime         String
  duration          Int      // heures
  
  // Services additionnels
  additionalServices Json?   // ["windows", "balcony", "oven", "fridge"]
  
  // Pricing
  basePrice         Float
  additionalPrice   Float    @default(0)
  totalPrice        Float
  currency          String   @default("AED")
  
  // Status
  status            String   @default("pending")
  paymentStatus     String   @default("pending")
  
  // Notes
  specialInstructions String? @db.Text
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@index([bookingNumber])
  @@index([maidId])
  @@index([userId])
  @@index([status])
}
```

---

## 🎯 PLAN D'ACTION RECOMMANDÉ

### **PHASE 1 : Services de déménagement & colis** (Priorité HAUTE)
**Durée estimée**: 3-4 jours
**Impact**: ÉLEVÉ - Services très demandés

**Jour 1-2 : Moving Services**
- [ ] Créer modèles Prisma (MovingService, MovingBooking)
- [ ] Migration base de données
- [ ] Créer API routes
- [ ] Créer pages frontend
- [ ] Créer composants (Calculator, BookingForm, Tracker)
- [ ] Créer pages admin
- [ ] Tests

**Jour 3-4 : Parcel Delivery**
- [ ] Créer modèles Prisma (ParcelService, ParcelDelivery)
- [ ] Migration base de données
- [ ] Créer API routes
- [ ] Créer pages frontend
- [ ] Créer composants (Calculator, SendForm, Tracker)
- [ ] Créer pages admin
- [ ] Tests

---

### **PHASE 2 : Gestion des événements** (Priorité MOYENNE)
**Durée estimée**: 2-3 jours
**Impact**: MOYEN - Modèles existent déjà

**Jour 1-2 : Frontend & Composants**
- [ ] Créer pages frontend (/events/)
- [ ] Créer composants (EventCard, Calendar, Registration)
- [ ] Créer API routes
- [ ] Tests

**Jour 3 : Admin**
- [ ] Créer pages admin
- [ ] Formulaire EventForm
- [ ] Gestion des inscriptions
- [ ] Analytics
- [ ] Tests

---

### **PHASE 3 : Amélioration Home Cleaning** (Priorité BASSE)
**Durée estimée**: 2 jours
**Impact**: MOYEN - Amélioration de l'existant

**Jour 1 : Système de réservation**
- [ ] Créer modèle CleaningBooking
- [ ] Migration base de données
- [ ] Créer API routes
- [ ] Créer composants de réservation

**Jour 2 : Profils & Packages**
- [ ] Améliorer profils Maids
- [ ] Créer packages de nettoyage
- [ ] Améliorer pages frontend
- [ ] Tests

---

## 📊 ESTIMATION TOTALE

### **Temps de développement**
- **Phase 1** : 3-4 jours (Moving + Parcel)
- **Phase 2** : 2-3 jours (Events)
- **Phase 3** : 2 jours (Home Cleaning)
- **TOTAL** : **7-9 jours**

### **Fichiers à créer**
- **Modèles Prisma** : 4-5 nouveaux modèles
- **Pages frontend** : ~30 pages
- **Composants** : ~25 composants
- **API routes** : ~20 routes
- **Pages admin** : ~15 pages
- **TOTAL** : **~90 fichiers**

### **Lignes de code estimées**
- **Modèles** : ~500 lignes
- **Frontend** : ~3000 lignes
- **Composants** : ~2500 lignes
- **API** : ~1500 lignes
- **Admin** : ~2000 lignes
- **TOTAL** : **~9500 lignes**

---

## 🎯 MA RECOMMANDATION

### **Option 1 : Approche Progressive** (RECOMMANDÉ)
Développer fonctionnalité par fonctionnalité, tester et déployer progressivement.

**Avantages** :
- ✅ Livraison rapide de valeur
- ✅ Tests approfondis
- ✅ Feedback utilisateur rapide
- ✅ Moins de risques

**Ordre recommandé** :
1. **Moving Services** (2 jours) - Fort impact business
2. **Parcel Delivery** (2 jours) - Complément logique
3. **Events Management** (2 jours) - Modèles déjà prêts
4. **Home Cleaning** (1 jour) - Amélioration

---

### **Option 2 : Approche Complète**
Développer tout en une fois.

**Avantages** :
- ✅ Vision globale
- ✅ Cohérence maximale
- ✅ Moins de déploiements

**Inconvénients** :
- ❌ Temps de livraison plus long
- ❌ Tests plus complexes
- ❌ Plus de risques

---

## 🚀 DÉMARRAGE IMMÉDIAT

**Je vous propose de commencer par** :

### **1. Moving Services** 🚚
**Pourquoi** :
- ✅ Service très demandé à Dubai
- ✅ Fort potentiel de revenus
- ✅ Différenciateur concurrentiel
- ✅ Complète bien votre offre

**Ce que je peux faire maintenant** :
1. Créer les modèles Prisma complets
2. Générer la migration
3. Créer les API routes
4. Créer le calculateur de devis
5. Créer le formulaire de réservation
6. Créer les pages admin

**Temps estimé** : 2 jours

---

## ❓ VOTRE DÉCISION

**Que voulez-vous que je fasse maintenant ?**

**Option A** : Commencer par Moving Services (déménagement) 🚚
**Option B** : Commencer par Parcel Delivery (colis) 📦
**Option C** : Commencer par Events Management (événements) 🎉
**Option D** : Améliorer Home Cleaning d'abord 🧹
**Option E** : Tout développer en parallèle (approche complète)

**Dites-moi votre choix et je démarre immédiatement ! 🚀**
