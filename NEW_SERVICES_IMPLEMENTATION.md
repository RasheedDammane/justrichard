# 🚀 IMPLÉMENTATION COMPLÈTE - Moving, Parcel & Events

**Date**: 26 Nov 2025, 01:10 UTC+07:00
**Objectif**: Système complet CRUD avec CTA devis pour Moving & Parcel, amélioration Events

---

## 📦 ÉTAPE 1: MODÈLES PRISMA

### **Relations à ajouter au modèle User**
```prisma
model User {
  // ... champs existants
  
  // Moving relations
  movingQuotes      MovingQuote[]   @relation("MovingQuotes")
  movingBookings    MovingBooking[] @relation("MovingBookings")
  
  // Parcel relations
  parcelQuotes      ParcelQuote[]   @relation("ParcelQuotes")
  sentParcels       ParcelDelivery[] @relation("SentParcels")
}
```

### **Relations à ajouter au modèle Partner**
```prisma
model Partner {
  // ... champs existants
  
  // Moving services
  movingServices    MovingService[] @relation("MovingPartner")
  
  // Parcel services
  parcelServices    ParcelService[] @relation("ParcelPartner")
}
```

### **Amélioration du modèle Event**
```prisma
model Event {
  // ... champs existants
  
  // Ajouter ces champs:
  isPaid            Boolean  @default(false)
  ticketPrice       Float?
  currency          String   @default("AED")
  
  // Dress code
  dressCode         String?  // "Casual", "Business", "Formal", "Black Tie"
  
  // Organizer
  organizerName     String?
  organizerEmail    String?
  organizerPhone    String?
  organizerWebsite  String?
  
  // Venue details améliorés
  venueDetails      Json?    // {parking, accessibility, facilities}
  
  // Registration
  requiresApproval  Boolean  @default(false)
  maxAttendees      Int?
  registrationDeadline DateTime?
}
```

---

## 🎯 ÉTAPE 2: EXÉCUTION DU SCRIPT

```bash
# 1. Ajouter les modèles
node scripts/add-new-services.js

# 2. Formater le schema
npx prisma format

# 3. Créer la migration
npx prisma migrate dev --name add_moving_parcel_services

# 4. Générer le client Prisma
npx prisma generate
```

---

## 📄 ÉTAPE 3: STRUCTURE DES FICHIERS

### **Moving Services**
```
app/[locale]/services/moving/
├── page.tsx                    # Liste services
├── [slug]/
│   └── page.tsx                # Détail service
├── quote/
│   ├── page.tsx                # Formulaire devis (CTA)
│   └── confirmation/page.tsx   # Confirmation devis
└── booking/
    ├── page.tsx                # Réservation
    └── confirmation/page.tsx   # Confirmation réservation

app/[locale]/admin/moving/
├── page.tsx                    # Liste services (CRUD)
├── new/page.tsx                # Créer service
├── edit/[id]/page.tsx          # Éditer service
├── MovingServiceForm.tsx       # Formulaire service
├── quotes/
│   ├── page.tsx                # Liste devis
│   └── [id]/page.tsx           # Détail devis
└── bookings/
    ├── page.tsx                # Liste réservations
    └── [id]/page.tsx           # Détail réservation

components/moving/
├── MovingServiceCard.tsx       # Card service
├── MovingQuoteForm.tsx         # Formulaire devis (CTA)
├── MovingCalculator.tsx        # Calculateur prix
├── MovingBookingForm.tsx       # Formulaire réservation
├── MovingTracker.tsx           # Suivi déménagement
└── ItemsChecklist.tsx          # Liste items

api/moving/
├── route.ts                    # GET/POST services
├── [id]/route.ts               # GET/PUT/DELETE service
├── quotes/
│   ├── route.ts                # GET/POST devis
│   └── [id]/route.ts           # GET/PUT/DELETE devis
└── bookings/
    ├── route.ts                # GET/POST réservations
    └── [id]/route.ts           # GET/PUT/DELETE réservation
```

### **Parcel Services**
```
app/[locale]/services/parcel/
├── page.tsx                    # Liste services
├── [slug]/page.tsx             # Détail service
├── quote/
│   ├── page.tsx                # Formulaire devis (CTA)
│   └── confirmation/page.tsx   # Confirmation
├── send/
│   ├── page.tsx                # Envoi colis
│   └── confirmation/page.tsx   # Confirmation
└── track/
    └── page.tsx                # Suivi colis

app/[locale]/admin/parcel/
├── page.tsx                    # Liste services (CRUD)
├── new/page.tsx                # Créer service
├── edit/[id]/page.tsx          # Éditer service
├── ParcelServiceForm.tsx       # Formulaire service
├── quotes/
│   ├── page.tsx                # Liste devis
│   └── [id]/page.tsx           # Détail devis
└── deliveries/
    ├── page.tsx                # Liste livraisons
    └── [id]/page.tsx           # Détail livraison

components/parcel/
├── ParcelServiceCard.tsx       # Card service
├── ParcelQuoteForm.tsx         # Formulaire devis (CTA)
├── ParcelCalculator.tsx        # Calculateur prix
├── ParcelSendForm.tsx          # Formulaire envoi
├── ParcelTracker.tsx           # Suivi colis
└── ParcelTimeline.tsx          # Timeline tracking

api/parcel/
├── route.ts                    # GET/POST services
├── [id]/route.ts               # GET/PUT/DELETE service
├── quotes/
│   ├── route.ts                # GET/POST devis
│   └── [id]/route.ts           # GET/PUT/DELETE devis
└── deliveries/
    ├── route.ts                # GET/POST livraisons
    └── [id]/route.ts           # GET/PUT/DELETE livraison
```

### **Events (Amélioration)**
```
app/[locale]/events/
├── page.tsx                    # Liste événements
├── [slug]/
│   ├── page.tsx                # Détail événement
│   └── register/page.tsx       # Inscription
├── categories/
│   └── [slug]/page.tsx         # Par catégorie
└── my-events/page.tsx          # Mes événements

app/[locale]/admin/events/
├── page.tsx                    # Liste événements (CRUD)
├── new/page.tsx                # Créer événement
├── edit/[id]/page.tsx          # Éditer événement
├── EventForm.tsx               # Formulaire événement
├── categories/page.tsx         # Catégories
├── registrations/
│   ├── page.tsx                # Liste inscriptions
│   └── [id]/page.tsx           # Détail inscription
└── analytics/page.tsx          # Analytics

components/events/
├── EventCard.tsx               # Card événement
├── EventCalendar.tsx           # Calendrier
├── EventRegistrationForm.tsx   # Formulaire inscription
├── EventSchedule.tsx           # Programme
├── EventSpeakers.tsx           # Intervenants
├── EventTickets.tsx            # Billets
├── EventCountdown.tsx          # Compte à rebours
└── EventDressCode.tsx          # Dress code badge

api/events/
├── route.ts                    # GET/POST événements
├── [id]/route.ts               # GET/PUT/DELETE événement
├── register/route.ts           # Inscription
└── [id]/
    ├── schedule/route.ts       # Programme
    ├── speakers/route.ts       # Intervenants
    └── tickets/route.ts        # Billets
```

---

## 🎨 ÉTAPE 4: COMPOSANTS CLÉS

### **MovingQuoteForm.tsx** (CTA Devis)
```tsx
'use client';

import { useState } from 'react';
import { Truck, MapPin, Calendar, Package } from 'lucide-react';

export default function MovingQuoteForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Contact
    name: '',
    email: '',
    phone: '',
    
    // From
    fromAddress: '',
    fromCity: '',
    fromCountry: 'UAE',
    fromFloor: 0,
    fromElevator: false,
    
    // To
    toAddress: '',
    toCity: '',
    toCountry: 'UAE',
    toFloor: 0,
    toElevator: false,
    
    // Details
    preferredDate: '',
    preferredTime: 'morning',
    numberOfRooms: 1,
    estimatedVolume: 0,
    
    // Services
    needPacking: false,
    needUnpacking: false,
    needAssembly: false,
    needStorage: false,
    
    // Vehicle
    vehicleType: 'small_van',
    
    // Notes
    specialInstructions: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await fetch('/api/moving/quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      const data = await response.json();
      // Redirect to confirmation
      window.location.href = `/services/moving/quote/confirmation?id=${data.id}`;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
      {/* Multi-step form */}
      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Contact Information</h2>
          {/* Contact fields */}
        </div>
      )}
      
      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Moving Details</h2>
          {/* From/To addresses */}
        </div>
      )}
      
      {step === 3 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Additional Services</h2>
          {/* Services checkboxes */}
        </div>
      )}
      
      {step === 4 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Review & Submit</h2>
          {/* Summary */}
        </div>
      )}
      
      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        {step > 1 && (
          <button type="button" onClick={() => setStep(step - 1)}>
            Previous
          </button>
        )}
        {step < 4 ? (
          <button type="button" onClick={() => setStep(step + 1)}>
            Next
          </button>
        ) : (
          <button type="submit">
            Request Quote
          </button>
        )}
      </div>
    </form>
  );
}
```

### **ParcelQuoteForm.tsx** (CTA Devis)
```tsx
'use client';

import { useState } from 'react';
import { Package, MapPin, Weight, Ruler } from 'lucide-react';

export default function ParcelQuoteForm() {
  const [formData, setFormData] = useState({
    // Sender
    senderName: '',
    senderEmail: '',
    senderPhone: '',
    senderAddress: '',
    senderCity: '',
    
    // Recipient
    recipientName: '',
    recipientPhone: '',
    recipientAddress: '',
    recipientCity: '',
    recipientCountry: '',
    
    // Parcel
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
    parcelType: 'package',
    contents: '',
    declaredValue: 0,
    
    // Delivery
    deliveryType: 'standard',
    
    // Notes
    specialInstructions: ''
  });

  const calculatePrice = () => {
    // Calcul automatique du prix estimé
    const basePrice = 50;
    const weightPrice = formData.weight * 5;
    const volumePrice = (formData.length * formData.width * formData.height) / 1000;
    
    return basePrice + weightPrice + volumePrice;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const estimatedPrice = calculatePrice();
    
    const response = await fetch('/api/parcel/quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        estimatedPrice,
        volume: formData.length * formData.width * formData.height
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      window.location.href = `/services/parcel/quote/confirmation?id=${data.id}`;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
      {/* Sender section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Sender Information</h2>
        {/* Sender fields */}
      </div>
      
      {/* Recipient section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Recipient Information</h2>
        {/* Recipient fields */}
      </div>
      
      {/* Parcel details */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Parcel Details</h2>
        {/* Parcel fields */}
        
        {/* Price estimate */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="text-lg font-bold">
            Estimated Price: {calculatePrice()} AED
          </div>
        </div>
      </div>
      
      <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg">
        Request Quote
      </button>
    </form>
  );
}
```

---

## 🔧 ÉTAPE 5: MENU ADMIN

Ajouter dans `/components/admin/AdminLayout.tsx`:

```tsx
import { Truck, Package, Calendar } from 'lucide-react';

const navigation: NavItem[] = [
  // ... items existants
  
  { name: 'Moving Services', href: `/${locale}/admin/moving`, icon: Truck },
  { name: 'Parcel Delivery', href: `/${locale}/admin/parcel`, icon: Package },
  { name: 'Events', href: `/${locale}/admin/events`, icon: Calendar },
];
```

---

## 📊 ESTIMATION

### **Temps de développement**
- **Modèles Prisma**: 30 min ✅
- **Moving Services**: 1 jour
- **Parcel Services**: 1 jour
- **Events amélioration**: 1 jour
- **TOTAL**: **3 jours**

### **Fichiers à créer**
- **Moving**: ~25 fichiers
- **Parcel**: ~20 fichiers
- **Events**: ~15 fichiers
- **TOTAL**: **~60 fichiers**

---

## 🚀 PROCHAINE ÉTAPE

**Exécuter le script pour ajouter les modèles:**

```bash
node scripts/add-new-services.js
npx prisma format
npx prisma migrate dev --name add_moving_parcel_services
npx prisma generate
```

**Puis je créerai les fichiers dans cet ordre:**
1. API routes (CRUD)
2. Pages admin (CRUD)
3. Composants (Forms, Cards, Calculators)
4. Pages frontend (avec CTA devis)

**Prêt à démarrer ? 🚀**
