# 🧪 TEST DES PAGES DE BOOKING & APPOINTMENTS

**Date**: 26 Nov 2025, 22:50 UTC+07:00
**Statut**: 🔍 TEST EN COURS

---

## 📊 RÉSULTATS DES TESTS

### **Pages de Booking Frontend**

| Service | URL | Status | Formulaire | API Route |
|---------|-----|--------|------------|-----------|
| **Coach** | `/coaches/[slug]/book` | ✅ 200 | ✅ Créé | ❌ Manquant |
| **Yacht** | `/yachts/[slug]/book` | ❌ 404 | ❌ Manquant | ❌ Manquant |
| **Rental Car** | `/rental-cars/[slug]/book` | ❌ 404 | ❌ Manquant | ❌ Manquant |
| **Doctor** | `/doctors/[slug]/book` | ❓ À tester | ❌ Manquant | ❌ Manquant |
| **Lawyer** | `/lawyers/[slug]/book` | ❓ À tester | ❌ Manquant | ❌ Manquant |
| **Activity** | `/activities/[slug]/book` | ❓ À tester | ❌ Manquant | ❌ Manquant |
| **Property** | `/properties/[slug]/book` | ❓ À tester | ❌ Manquant | ❌ Manquant |
| **Maid** | `/maids/[slug]/book` | ❓ À tester | ❌ Manquant | ❌ Manquant |
| **Scooter** | `/scooters/[slug]/book` | ❓ À tester | ❌ Manquant | ❌ Manquant |
| **Home Cleaning** | `/home-cleaning/booking` | ✅ Existe | ✅ Existe | ✅ Existe |
| **Handyman** | `/handyman/booking` | ✅ Existe | ✅ Existe | ✅ Existe |

### **API Routes Existantes**

| Route | Méthodes | Status | Notes |
|-------|----------|--------|-------|
| `/api/bookings` | GET, POST | ✅ Existe | Générique |
| `/api/coaching/bookings` | GET, POST | ✅ Existe | Coaching (ancien) |
| `/api/bookings/coach` | - | ❌ Manquant | Nouveau modèle |
| `/api/bookings/yacht` | - | ❌ Manquant | Nouveau modèle |
| `/api/bookings/doctor` | - | ❌ Manquant | Nouveau modèle |
| `/api/bookings/lawyer` | - | ❌ Manquant | Nouveau modèle |
| `/api/bookings/activity` | - | ❌ Manquant | Nouveau modèle |
| `/api/bookings/property` | - | ❌ Manquant | Nouveau modèle |
| `/api/bookings/maid` | - | ❌ Manquant | Nouveau modèle |
| `/api/bookings/scooter` | - | ❌ Manquant | Nouveau modèle |

---

## 🔍 PAGES EXISTANTES DÉTECTÉES

### **1. Coach Booking** ✅
- **Page**: `/app/[locale]/coaches/[slug]/book/page.tsx`
- **Form**: `/app/[locale]/coaches/[slug]/book/CoachBookingForm.tsx`
- **Status**: ✅ Créé (vient d'être créé)
- **Test**: http://localhost:3100/en/coaches/layla-hassan-mindset-coach/book → **200 OK**

### **2. Home Cleaning Booking** ✅
- **Page**: `/app/[locale]/home-cleaning/booking/`
- **Status**: ✅ Existe déjà
- **Model**: CleaningBooking (serviceType: "home")

### **3. Handyman Booking** ✅
- **Page**: `/app/[locale]/handyman/booking/`
- **Status**: ✅ Existe déjà

### **4. Admin Bookings** ✅
- **Page**: `/app/[locale]/admin/bookings/`
- **Status**: ✅ Existe (gestion admin)

### **5. User Bookings** ✅
- **Page**: `/app/[locale]/bookings/`
- **Status**: ✅ Existe (liste des bookings utilisateur)

---

## ❌ PAGES MANQUANTES À CRÉER

### **Priorité Haute** 🔴

1. **Yacht Booking**
   - Page: `/app/[locale]/yachts/[slug]/book/page.tsx`
   - Form: `YachtBookingForm.tsx`
   - API: `/app/api/bookings/yacht/route.ts`

2. **Rental Car Booking**
   - Page: `/app/[locale]/rental-cars/[slug]/book/page.tsx`
   - Form: `RentalCarBookingForm.tsx`
   - API: `/app/api/bookings/rental-car/route.ts`

3. **Doctor Appointment**
   - Page: `/app/[locale]/doctors/[slug]/book/page.tsx`
   - Form: `DoctorAppointmentForm.tsx`
   - API: `/app/api/bookings/doctor/route.ts`

### **Priorité Moyenne** 🟡

4. **Lawyer Consultation**
   - Page: `/app/[locale]/lawyers/[slug]/book/page.tsx`
   - Form: `LawyerConsultationForm.tsx`
   - API: `/app/api/bookings/lawyer/route.ts`

5. **Activity Booking**
   - Page: `/app/[locale]/activities/[slug]/book/page.tsx`
   - Form: `ActivityBookingForm.tsx`
   - API: `/app/api/bookings/activity/route.ts`

6. **Property Booking**
   - Page: `/app/[locale]/properties/[slug]/book/page.tsx`
   - Form: `PropertyBookingForm.tsx`
   - API: `/app/api/bookings/property/route.ts`

### **Priorité Basse** 🟢

7. **Maid Booking**
   - Page: `/app/[locale]/maids/[slug]/book/page.tsx`
   - Form: `MaidBookingForm.tsx`
   - API: `/app/api/bookings/maid/route.ts`

8. **Scooter Booking**
   - Page: `/app/[locale]/scooters/[slug]/book/page.tsx`
   - Form: `ScooterBookingForm.tsx`
   - API: `/app/api/bookings/scooter/route.ts`

---

## 🔧 API ROUTES À CRÉER

### **Structure Standard**
```typescript
// /app/api/bookings/[type]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Générer bookingNumber unique
    const bookingNumber = `${TYPE}-${Date.now()}`;
    
    // Créer le booking
    const booking = await prisma.[typeBooking].create({
      data: {
        bookingNumber,
        ...data,
        status: 'pending',
        paymentStatus: 'pending',
      },
    });
    
    return NextResponse.json(booking);
  } catch (error) {
    return NextResponse.json({ error: 'Booking failed' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  // Liste des bookings
}
```

---

## 📋 CRUD À TESTER

### **Pour Chaque Type de Booking**

#### **CREATE** ✅
- [ ] Coach Booking
- [ ] Yacht Booking
- [ ] Doctor Appointment
- [ ] Lawyer Consultation
- [ ] Activity Booking
- [ ] Property Booking
- [ ] Maid Booking
- [ ] Scooter Booking

#### **READ** ✅
- [ ] Liste des bookings par utilisateur
- [ ] Détail d'un booking
- [ ] Bookings par statut
- [ ] Bookings par date

#### **UPDATE** ✅
- [ ] Modifier un booking
- [ ] Changer le statut
- [ ] Annuler un booking
- [ ] Confirmer un booking

#### **DELETE** ✅
- [ ] Supprimer un booking (soft delete)
- [ ] Annuler définitivement

---

## 🎯 PLAN D'ACTION

### **Phase 1: API Routes** (30 min)
1. ✅ Coach → `/api/bookings/coach`
2. ⏳ Yacht → `/api/bookings/yacht`
3. ⏳ Doctor → `/api/bookings/doctor`
4. ⏳ Lawyer → `/api/bookings/lawyer`
5. ⏳ Activity → `/api/bookings/activity`
6. ⏳ Property → `/api/bookings/property`
7. ⏳ Maid → `/api/bookings/maid`
8. ⏳ Scooter → `/api/bookings/scooter`

### **Phase 2: Pages de Booking** (1h)
1. ✅ Coach → Page + Form créés
2. ⏳ Yacht → À créer
3. ⏳ Rental Car → À créer
4. ⏳ Doctor → À créer
5. ⏳ Lawyer → À créer
6. ⏳ Activity → À créer
7. ⏳ Property → À créer
8. ⏳ Maid → À créer
9. ⏳ Scooter → À créer

### **Phase 3: Tests CRUD** (30 min)
- Test CREATE pour chaque type
- Test READ (liste + détail)
- Test UPDATE (statut, annulation)
- Test DELETE (soft delete)

---

## 🚀 PROCHAINES ÉTAPES

1. **Créer toutes les API routes** (8 routes)
2. **Créer toutes les pages de booking** (8 pages + forms)
3. **Ajouter les liens "Book" sur chaque page de détail**
4. **Tester le CRUD complet**
5. **Exécuter la migration Prisma**

---

**⏳ TEST EN COURS - CRÉATION DES PAGES ET API ROUTES...**
