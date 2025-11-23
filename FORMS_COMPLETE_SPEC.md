# 📝 Spécifications Complètes des Formulaires Admin

## 🎯 Objectif
Créer des formulaires multi-tabs exhaustifs pour chaque entité en base de données, avec tous les champs du modèle Prisma.

---

## 1. 🚢 Yacht Form (6 onglets)

### Onglet 1: Informations de base
- name* (text)
- slug* (text, auto-généré)
- brand (text)
- model (text)
- year (number)
- manufacturer (text)
- countryId* (select)
- cityId* (select)
- location (text)
- isActive (checkbox)
- isFeatured (checkbox)
- isAvailable (checkbox)

### Onglet 2: Spécifications
- length (number)
- lengthUnit (select: ft/m)
- capacity (number)
- cabins (number)
- bathrooms (number)
- crew (number)
- speed (number)
- fuelType (text)
- engineType (text)

### Onglet 3: Tarification
- currency (select: AED/USD/EUR/GBP)
- minBookingHours (number)
- pricePerHour (number)
- priceFor2Hours (number)
- priceFor3Hours (number)
- priceFor4Hours (number)
- priceFor6Hours (number)
- priceFor8Hours (number)
- pricePerDay (number)

### Onglet 4: Description
- shortDescription (textarea, 2 lignes)
- description (textarea, 8 lignes)
- cancellationPolicy (textarea, 4 lignes)

### Onglet 5: Équipements
- features (textarea, une par ligne)
- amenities (textarea, une par ligne)
- included (textarea, une par ligne)
- notIncluded (textarea, une par ligne)

### Onglet 6: Images & SEO
- mainImage (url)
- images (textarea, URLs une par ligne)
- metaTitle (text)
- metaDescription (textarea)

---

## 2. 🚗 RentalCar Form (9 onglets)

### Onglet 1: Informations de base
- name* (text)
- slug* (text, auto-généré)
- brand* (text)
- model* (text)
- year* (number)
- category* (select: ECONOMY/COMPACT/SEDAN/SUV/LUXURY/SPORTS/VAN)
- color* (text)
- countryId* (select)
- cityId* (select)
- isActive (checkbox)
- isFeatured (checkbox)
- isNewArrival (checkbox)
- isAvailable (checkbox)

### Onglet 2: Spécifications
- doors (number, default: 4)
- seats (number, default: 5)
- horsepower (number)
- cylinders (number)
- acceleration (text)
- topSpeed (number)
- fuelType* (select: PETROL/DIESEL/ELECTRIC/HYBRID)
- transmission (select: AUTOMATIC/MANUAL, default: AUTOMATIC)

### Onglet 3: Tarification
- currency (select, default: AED)
- pricePerDay* (number)
- pricePerWeek (number)
- pricePerMonth (number)
- deposit (number, default: 0)
- noDeposit (checkbox)
- noDepositFee (number)

### Onglet 4: Kilométrage
- mileagePerDay (number, default: 250)
- mileagePerWeek (number, default: 1500)
- mileagePerMonth (number, default: 4500)
- extraKmFee (number, default: 25)

### Onglet 5: Livraison
- freeDelivery (checkbox)
- pickupFee (number, default: 0)
- dropoffFee (number, default: 0)
- deliveryLocations (textarea JSON)

### Onglet 6: Conditions
- minAge (number, default: 25)
- minDays (number, default: 1)
- requiredDocuments (textarea JSON)
- instantBooking (checkbox, default: true)

### Onglet 7: Équipements
- features (textarea JSON)
- carFeatures (textarea JSON)

### Onglet 8: Description
- shortDescription (textarea)
- description* (textarea)
- faq (textarea JSON)

### Onglet 9: Images & SEO
- mainImage (url)
- images (textarea JSON)
- brandLogo (url)
- metaTitle (text)
- metaDescription (textarea)

---

## 3. 🏍️ Motorbike Form (6 onglets)

### Onglet 1: Informations de base
- brand* (text)
- model* (text)
- year* (number)
- category* (text)
- slug* (text, auto-généré)
- countryId* (select)
- cityId (select)
- available (checkbox, default: true)

### Onglet 2: Spécifications
- seats (number, default: 2)
- transmission (text, default: "Automatic")
- fuelType (text, default: "Petrol")
- engineSize* (number)

### Onglet 3: Tarification
- currency (select, default: THB)
- pricePerDay* (number)
- pricePerWeek (number)
- pricePerMonth (number)

### Onglet 4: Description
- description* (textarea)

### Onglet 5: Équipements
- features (textarea JSON)

### Onglet 6: Images
- images (textarea JSON)

---

## 4. 👩‍🔧 Maid Form (9 onglets)

### Onglet 1: Informations personnelles
- name* (text)
- slug* (text, auto-généré)
- refNo (text, unique)
- nationality* (text)
- dateOfBirth (date)
- age* (number)
- sex (select: Male/Female, default: Female)
- height (number)
- weight (number)
- complexion (text)
- religion (text)
- maritalStatus (text)
- numberOfChildren (number, default: 0)

### Onglet 2: Documents
- passportNo (text)
- passportExpiry (date)
- passportIssuePlace (text)
- qualification (text)

### Onglet 3: Langues
- englishLevel (select: None/Basic/Good/Fluent)
- arabicLevel (select: None/Basic/Good/Fluent)
- otherLanguages (textarea JSON)

### Onglet 4: Expérience
- yearsOfExperience (number, default: 0)
- experienceCountry (text)
- currentLocation (text)
- duties (textarea JSON)

### Onglet 5: Compétences
- elderlyCare (checkbox)
- specialNeedsCare (checkbox)
- babysittingOlderThan1Year (checkbox)
- babysittingYoungerThan1Year (checkbox)
- cookingSyrianLebanese (checkbox)
- cookingGulf (checkbox)
- cookingInternational (checkbox)
- cookingOther (textarea JSON)

### Onglet 6: Contrat
- contractType (select: Full-time/Part-time/Live-in/Live-out)
- monthlyFee (number)
- currency (select, default: AED)
- availableFrom (date)
- privateRoom (checkbox)
- liveOut (checkbox)
- workingOnDayOff (checkbox)
- hasCat (checkbox)
- hasDog (checkbox)

### Onglet 7: Localisation
- countryId* (select)
- cityId* (select)
- latitude (number)
- longitude (number)

### Onglet 8: Contact
- phone (tel)
- email (email)
- whatsapp (tel)
- notes (textarea)

### Onglet 9: Médias & SEO
- image (url)
- images (textarea JSON)
- video (url)
- cv (url)
- metaTitle (text)
- metaDescription (textarea)
- isActive (checkbox, default: true)
- isFeatured (checkbox)

---

## 5. 🏠 Property Form (Amélioration)

### Onglet 1: Informations de base
- title* (text)
- slug* (text, auto-généré)
- type* (select: APARTMENT/VILLA/TOWNHOUSE/PENTHOUSE/STUDIO/DUPLEX)
- listingType* (select: FOR_SALE/FOR_RENT/BOTH)
- countryId* (select)
- cityId* (select)
- address (text)
- latitude (number)
- longitude (number)

### Onglet 2: Détails
- bedrooms* (number)
- bathrooms* (number)
- area* (number)
- areaUnit (select: sqft/sqm, default: sqft)
- furnished (select: FURNISHED/UNFURNISHED/SEMI_FURNISHED)
- floor (number)
- totalFloors (number)
- parkingSpaces (number)
- yearBuilt (number)

### Onglet 3: Tarification
- salePrice (number)
- rentPrice (number)
- rentFrequency (select: MONTHLY/YEARLY)
- currency (select, default: AED)
- deposit (number)
- maintenanceFee (number)
- serviceCharge (number)

### Onglet 4: Description
- shortDescription (textarea)
- description* (textarea)

### Onglet 5: Équipements & Caractéristiques
- features (textarea, une par ligne)
- amenities (textarea, une par ligne)
- nearbyPlaces (textarea, une par ligne)

### Onglet 6: Images & Vidéos
- mainImage (url)
- images (textarea, URLs une par ligne)
- video (url)
- virtualTour (url)

### Onglet 7: SEO & Visibilité
- metaTitle (text)
- metaDescription (textarea)
- isFeatured (checkbox)
- isActive (checkbox, default: true)
- isVerified (checkbox)

---

## 6. 👨‍⚕️ Provider Form (Amélioration - Doctors, Lawyers, Coaches, etc.)

### Onglet 1: Informations de base
- name* (text)
- slug* (text, auto-généré)
- type (select: doctor/lawyer/coach/transfer/activity/supplier)
- email* (email)
- phone (tel)
- website (url)

### Onglet 2: Localisation
- countryId* (select)
- cityId (select)
- address (text)
- latitude (number)
- longitude (number)

### Onglet 3: Description & Services
- shortDescription (textarea)
- description (textarea)
- services (textarea, un par ligne)
- specializations (textarea, un par ligne)

### Onglet 4: Tarification
- hourlyRate (number)
- sessionRate (number)
- currency (select, default: AED)
- acceptsInsurance (checkbox)

### Onglet 5: Disponibilité
- workingHours (textarea JSON)
- availableDays (checkboxes: Mon-Sun)
- bookingAdvance (number, jours)

### Onglet 6: Médias & SEO
- logo (url)
- images (textarea, URLs une par ligne)
- video (url)
- metaTitle (text)
- metaDescription (textarea)
- isActive (checkbox, default: true)
- isVerified (checkbox)
- isFeatured (checkbox)

---

## 🎨 Design Pattern Commun

### Structure de base
```typescript
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, [Icons] } from 'lucide-react';

interface FormProps {
  locale: string;
  item?: any;
}

export default function Form({ locale, item }: FormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('tab1');
  const [countries, setCountries] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [formData, setFormData] = useState({ /* all fields */ });

  // Fetch countries/cities
  // Handle submit
  // Handle change
  // Render tabs
  // Render form fields by tab
  
  return <form>...</form>;
}
```

### Conventions
- Tous les champs requis marqués avec *
- Auto-génération du slug depuis le nom
- Chargement dynamique des villes selon le pays
- Textarea pour les champs JSON (une entrée par ligne)
- Checkboxes pour les booléens
- Select pour les enums
- Date picker pour les dates
- Number input pour les nombres
- URL input pour les URLs
- Tel input pour les téléphones
- Email input pour les emails

---

**Date**: 22 novembre 2024  
**Version**: 4.0.0  
**Statut**: 📝 SPÉCIFICATIONS COMPLÈTES - Prêt pour implémentation
