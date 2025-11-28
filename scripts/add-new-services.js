#!/usr/bin/env node

/**
 * Script pour ajouter les nouveaux modèles Moving, Parcel et améliorer Events
 * Usage: node scripts/add-new-services.js
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Ajout des nouveaux services...\n');

const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');
let schema = fs.readFileSync(schemaPath, 'utf8');

// Modèles à ajouter
const newModels = `

// ============================================
// MOVING SERVICES - Services de déménagement
// ============================================

model MovingService {
  id                String   @id @default(cuid())
  name              String
  slug              String   @unique
  description       String   @db.Text
  shortDescription  String?
  
  partnerId         String?
  partner           Partner? @relation("MovingPartner", fields: [partnerId], references: [id])
  
  basePrice         Float
  pricePerKm        Float
  pricePerCubicM    Float
  pricePerHour      Float?
  currency          String   @default("AED")
  
  packingIncluded   Boolean  @default(false)
  unpackingIncluded Boolean  @default(false)
  assemblyIncluded  Boolean  @default(false)
  storageAvailable  Boolean  @default(false)
  
  vehicleTypes      Json
  coverageAreas     Json
  availableDays     Json
  workingHours      Json
  
  images            Json?
  logo              String?
  
  metaTitle         String?
  metaDescription   String?
  
  totalBookings     Int      @default(0)
  rating            Float    @default(0)
  reviewCount       Int      @default(0)
  
  isActive          Boolean  @default(true)
  isFeatured        Boolean  @default(false)
  
  bookings          MovingBooking[]
  quotes            MovingQuote[]
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@index([slug])
  @@index([partnerId])
  @@index([isActive])
  @@index([isFeatured])
}

model MovingQuote {
  id                String   @id @default(cuid())
  quoteNumber       String   @unique
  
  serviceId         String?
  service           MovingService? @relation(fields: [serviceId], references: [id])
  
  userId            String?
  user              User?    @relation("MovingQuotes", fields: [userId], references: [id])
  
  name              String
  email             String
  phone             String
  
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
  
  distance          Float?
  
  preferredDate     DateTime?
  preferredTime     String?
  
  estimatedVolume   Float?
  numberOfRooms     Int?
  itemsList         Json?
  
  needPacking       Boolean  @default(false)
  needUnpacking     Boolean  @default(false)
  needAssembly      Boolean  @default(false)
  needStorage       Boolean  @default(false)
  storageDuration   Int?
  
  vehicleType       String?
  
  estimatedPrice    Float?
  currency          String   @default("AED")
  
  status            String   @default("pending")
  
  specialInstructions String? @db.Text
  adminNotes        String?  @db.Text
  
  quotedPrice       Float?
  quotedBy          String?
  quotedAt          DateTime?
  validUntil        DateTime?
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@index([quoteNumber])
  @@index([userId])
  @@index([serviceId])
  @@index([status])
  @@index([email])
}

model MovingBooking {
  id                String   @id @default(cuid())
  bookingNumber     String   @unique
  
  serviceId         String
  service           MovingService @relation(fields: [serviceId], references: [id])
  
  userId            String
  user              User     @relation("MovingBookings", fields: [userId], references: [id])
  
  quoteId           String?
  
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
  
  distance          Float?
  
  movingDate        DateTime
  preferredTime     String
  estimatedDuration Int?
  
  estimatedVolume   Float?
  numberOfRooms     Int?
  itemsList         Json?
  
  needPacking       Boolean  @default(false)
  needUnpacking     Boolean  @default(false)
  needAssembly      Boolean  @default(false)
  needStorage       Boolean  @default(false)
  storageDuration   Int?
  
  vehicleType       String
  numberOfVehicles  Int      @default(1)
  
  basePrice         Float
  distancePrice     Float
  volumePrice       Float
  additionalServices Float   @default(0)
  totalPrice        Float
  currency          String   @default("AED")
  
  paymentStatus     String   @default("pending")
  paymentMethod     String?
  
  status            String   @default("pending")
  
  specialInstructions String? @db.Text
  adminNotes        String?  @db.Text
  
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

// ============================================
// PARCEL DELIVERY - Envoi de colis
// ============================================

model ParcelService {
  id                String   @id @default(cuid())
  name              String
  slug              String   @unique
  description       String   @db.Text
  shortDescription  String?
  
  partnerId         String?
  partner           Partner? @relation("ParcelPartner", fields: [partnerId], references: [id])
  
  basePrice         Float
  pricePerKg        Float
  pricePerKm        Float?
  currency          String   @default("AED")
  
  maxWeight         Float
  maxLength         Float
  maxWidth          Float
  maxHeight         Float
  
  expressAvailable  Boolean  @default(false)
  sameDay           Boolean  @default(false)
  nextDay           Boolean  @default(false)
  international     Boolean  @default(false)
  
  trackingAvailable Boolean  @default(true)
  insuranceAvailable Boolean @default(true)
  
  coverageAreas     Json
  
  logo              String?
  
  metaTitle         String?
  metaDescription   String?
  
  totalDeliveries   Int      @default(0)
  rating            Float    @default(0)
  reviewCount       Int      @default(0)
  
  isActive          Boolean  @default(true)
  isFeatured        Boolean  @default(false)
  
  deliveries        ParcelDelivery[]
  quotes            ParcelQuote[]
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@index([slug])
  @@index([partnerId])
  @@index([isActive])
  @@index([isFeatured])
}

model ParcelQuote {
  id                String   @id @default(cuid())
  quoteNumber       String   @unique
  
  serviceId         String?
  service           ParcelService? @relation(fields: [serviceId], references: [id])
  
  userId            String?
  user              User?    @relation("ParcelQuotes", fields: [userId], references: [id])
  
  senderName        String
  senderEmail       String
  senderPhone       String
  senderAddress     String
  senderCity        String
  senderCountry     String
  
  recipientName     String
  recipientPhone    String
  recipientAddress  String
  recipientCity     String
  recipientCountry  String
  
  weight            Float
  length            Float
  width             Float
  height            Float
  volume            Float
  
  parcelType        String
  contents          String
  declaredValue     Float?
  
  deliveryType      String
  
  estimatedPrice    Float?
  currency          String   @default("AED")
  
  status            String   @default("pending")
  
  specialInstructions String? @db.Text
  adminNotes        String?  @db.Text
  
  quotedPrice       Float?
  quotedBy          String?
  quotedAt          DateTime?
  validUntil        DateTime?
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@index([quoteNumber])
  @@index([userId])
  @@index([serviceId])
  @@index([status])
  @@index([senderEmail])
}

model ParcelDelivery {
  id                String   @id @default(cuid())
  trackingNumber    String   @unique
  
  serviceId         String
  service           ParcelService @relation(fields: [serviceId], references: [id])
  
  senderId          String
  sender            User     @relation("SentParcels", fields: [senderId], references: [id])
  
  quoteId           String?
  
  senderName        String
  senderPhone       String
  senderAddress     String
  senderCity        String
  senderCountry     String
  
  recipientName     String
  recipientPhone    String
  recipientAddress  String
  recipientCity     String
  recipientCountry  String
  
  weight            Float
  length            Float
  width             Float
  height            Float
  volume            Float
  
  parcelType        String
  contents          String
  declaredValue     Float?
  
  deliveryType      String
  
  basePrice         Float
  weightPrice       Float
  distancePrice     Float?
  insurancePrice    Float    @default(0)
  totalPrice        Float
  currency          String   @default("AED")
  
  pickupDate        DateTime?
  estimatedDelivery DateTime?
  actualDelivery    DateTime?
  
  status            String   @default("pending")
  currentLocation   String?
  trackingHistory   Json?
  
  paymentStatus     String   @default("pending")
  paymentMethod     String?
  
  specialInstructions String? @db.Text
  deliveryNotes     String?  @db.Text
  
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
`;

// Ajouter les modèles à la fin du schema
schema += newModels;

// Sauvegarder
fs.writeFileSync(schemaPath, schema);

console.log('✅ Modèles ajoutés au schema.prisma');
console.log('\n📝 Prochaines étapes:');
console.log('1. Vérifier le schema: npx prisma format');
console.log('2. Créer la migration: npx prisma migrate dev --name add_moving_parcel');
console.log('3. Générer le client: npx prisma generate');
