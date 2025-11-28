# 🎯 PLAN D'AMÉLIORATION - CLEANING SERVICES

**Date**: 26 Nov 2025, 17:30 UTC+07:00
**Objectif**: Compléter les formulaires avec TOUS les champs du schéma Prisma

---

## 📊 ÉTAT ACTUEL

### **Formulaire actuel** : 3/11 sections ❌
1. ✅ **Basic** - Nom, slug, description, catégorie
2. ✅ **Pricing** - Prix de base, devise, prix/sqm, minimum
3. ✅ **Details** - Durée, services inclus/exclus, équipement, produits, politiques

### **Sections manquantes** : 8/11 ❌
4. ❌ **Options** - Options supplémentaires avec prix
5. ❌ **Packages** - Packages de services
6. ❌ **Availability** - Jours disponibles, horaires, réservation anticipée
7. ❌ **Location** - Pays, ville, zones de service, coordonnées GPS
8. ❌ **Media** - Image principale, galerie d'images, vidéo
9. ❌ **SEO** - Meta title, meta description, keywords
10. ❌ **Contact** - Téléphone, email, WhatsApp
11. ❌ **Status** - Active, Featured, Verified, Available

---

## 🔍 ANALYSE DU SCHÉMA PRISMA

### **Champs disponibles** : 60+ champs

#### **1. Basic Information** (8 champs)
```prisma
id               String  @id @default(cuid())
type             String  // home, furniture, laundry
name             String
slug             String  @unique
description      String? @db.Text
shortDescription String?
category         String?
subCategory      String?
```

#### **2. Pricing** (6 champs)
```prisma
basePrice     Float
currency      String @default("AED")
pricePerSqm   Float? // Pour home cleaning
pricePerItem  Float? // Pour furniture/laundry
minimumCharge Float?
```

#### **3. Service Details** (6 champs)
```prisma
duration         String? // "2-3 hours", "1 day", etc.
serviceArea      Json?   // Areas covered
includedServices Json?   // What's included
excludedServices Json?   // What's not included
equipment        Json?   // Equipment used
products         Json?   // Cleaning products used
```

#### **4. Options & Add-ons** (3 champs) ❌ MANQUANT
```prisma
options  Json? // [{name, price, description}]
addons   Json? // Additional services
packages Json? // Service packages
```

**Exemple de structure** :
```json
{
  "options": [
    {"name": "Deep Carpet Cleaning", "price": 50, "description": "Professional carpet cleaning"},
    {"name": "Window Cleaning", "price": 30, "description": "Interior & exterior windows"}
  ],
  "addons": [
    {"name": "Ironing Service", "price": 20, "description": "Iron up to 10 items"}
  ],
  "packages": [
    {
      "name": "Basic Package",
      "price": 200,
      "description": "Standard cleaning",
      "includes": ["Dusting", "Vacuuming", "Mopping"]
    }
  ]
}
```

#### **5. Availability** (3 champs) ❌ MANQUANT
```prisma
availableDays  Json? // Days of week
availableHours Json? // Time slots
advanceBooking Int?  // Days in advance
```

**Exemple de structure** :
```json
{
  "availableDays": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  "availableHours": ["08:00-10:00", "10:00-12:00", "14:00-16:00", "16:00-18:00"],
  "advanceBooking": 1
}
```

#### **6. Location** (6 champs) ❌ MANQUANT
```prisma
cityId       String
countryId    String
serviceAreas Json?  // Specific areas/zones
latitude     Float?
longitude    Float?
```

**Exemple de structure** :
```json
{
  "serviceAreas": ["Dubai Marina", "Downtown Dubai", "JBR", "Business Bay"]
}
```

#### **7. Media** (4 champs) ❌ MANQUANT
```prisma
image  String? // Main image URL
images Json?   // Gallery of images
video  String? // Video URL
```

**Exemple de structure** :
```json
{
  "images": [
    "/images/cleaning/home-1.jpg",
    "/images/cleaning/home-2.jpg",
    "/images/cleaning/home-3.jpg"
  ]
}
```

#### **8. Tags & Categories** (3 champs)
```prisma
tags        Json?
category    String?
subCategory String?
```

**Exemple de structure** :
```json
{
  "tags": ["home-cleaning", "professional", "eco-friendly", "deep-cleaning"]
}
```

#### **9. Requirements** (2 champs)
```prisma
requirements Json? // Customer requirements
restrictions Json? // Service restrictions
```

#### **10. Policies** (3 champs)
```prisma
cancellationPolicy String? @db.Text
refundPolicy       String? @db.Text
termsConditions    String? @db.Text
```

#### **11. Contact** (3 champs) ❌ MANQUANT
```prisma
phone    String?
email    String?
whatsapp String?
```

#### **12. SEO** (3 champs) ❌ MANQUANT
```prisma
metaTitle       String?
metaDescription String?
keywords        Json?
```

**Exemple de structure** :
```json
{
  "keywords": ["home cleaning dubai", "house cleaning", "maid service", "professional cleaning"]
}
```

#### **13. Status** (4 champs) ❌ MANQUANT
```prisma
isActive    Boolean @default(true)
isFeatured  Boolean @default(false)
isVerified  Boolean @default(true)
isAvailable Boolean @default(true)
```

#### **14. Stats** (4 champs) - READ ONLY
```prisma
views       Int   @default(0)
bookings    Int   @default(0)
rating      Float @default(0)
reviewCount Int   @default(0)
```

---

## 🎯 PLAN D'ACTION

### **Phase 1 : Compléter le formulaire Home Cleaning** ✅

#### **Sections à ajouter** :

**Section 4 : Options** ❌
- Liste dynamique d'options
- Champs : name, price, description
- Boutons Add/Remove

**Section 5 : Packages** ❌
- Liste dynamique de packages
- Champs : name, price, description, includes (array)
- Boutons Add/Remove

**Section 6 : Availability** ❌
- Checkboxes pour jours de la semaine
- Liste dynamique de créneaux horaires
- Input pour jours de réservation anticipée

**Section 7 : Location** ❌
- Dropdown pays (avec relation)
- Dropdown ville (filtré par pays)
- Liste dynamique de zones de service
- Inputs latitude/longitude (optionnel)

**Section 8 : Media** ❌
- Input URL image principale
- Liste dynamique d'URLs d'images (galerie)
- Input URL vidéo

**Section 9 : SEO** ❌
- Input meta title
- Textarea meta description (160 chars)
- Liste dynamique de keywords

**Section 10 : Contact** ❌
- Input téléphone
- Input email
- Input WhatsApp

**Section 11 : Status** ❌
- Checkbox isActive
- Checkbox isFeatured
- Checkbox isVerified
- Checkbox isAvailable

---

### **Phase 2 : Copier vers Furniture & Laundry** ✅

Une fois le formulaire Home Cleaning complet :
1. Copier vers `FurnitureCleaningFormComplete.tsx`
2. Copier vers `LaundryFormComplete.tsx`
3. Adapter les types (`furniture`, `laundry`)
4. Adapter les URLs API
5. Adapter les textes

---

## 📝 CODE À AJOUTER

### **Section 4 : Options**

```typescript
{activeTab === 'options' && (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Options</h3>
    
    {options.map((option, index) => (
      <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
        <div className="flex justify-between items-start">
          <h4 className="font-medium text-gray-900">Option #{index + 1}</h4>
          <button
            type="button"
            onClick={() => removeItem(setOptions, options, index)}
            className="text-red-600 hover:bg-red-50 p-2 rounded"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Option Name *
            </label>
            <input
              type="text"
              required
              value={option.name}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index] = {...option, name: e.target.value};
                setOptions(newOptions);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="e.g., Deep Carpet Cleaning"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price *
            </label>
            <input
              type="number"
              required
              step="0.01"
              value={option.price}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index] = {...option, price: parseFloat(e.target.value)};
                setOptions(newOptions);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="50.00"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            rows={2}
            value={option.description}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[index] = {...option, description: e.target.value};
              setOptions(newOptions);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Describe this option..."
          />
        </div>
      </div>
    ))}
    
    <button
      type="button"
      onClick={() => setOptions([...options, {name: '', price: 0, description: ''}])}
      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
    >
      <Plus className="w-4 h-4" />
      Add Option
    </button>
  </div>
)}
```

### **Section 6 : Availability**

```typescript
{activeTab === 'availability' && (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Availability</h3>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Available Days
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
          <label key={day} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={availableDays.includes(day)}
              onChange={(e) => {
                if (e.target.checked) {
                  setAvailableDays([...availableDays, day]);
                } else {
                  setAvailableDays(availableDays.filter(d => d !== day));
                }
              }}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="text-sm text-gray-700">{day}</span>
          </label>
        ))}
      </div>
    </div>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Available Time Slots
      </label>
      {availableHours.map((slot, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            type="text"
            value={slot}
            onChange={(e) => updateItem(setAvailableHours, availableHours, index, e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="e.g., 08:00-10:00"
          />
          <button
            type="button"
            onClick={() => removeItem(setAvailableHours, availableHours, index)}
            className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => addItem(setAvailableHours, availableHours, '')}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
      >
        <Plus className="w-4 h-4" />
        Add Time Slot
      </button>
    </div>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Advance Booking (days)
      </label>
      <input
        type="number"
        min="0"
        value={formData.advanceBooking}
        onChange={(e) => setFormData({...formData, advanceBooking: parseInt(e.target.value)})}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        placeholder="1"
      />
      <p className="text-xs text-gray-500 mt-1">
        Minimum days in advance customers must book
      </p>
    </div>
  </div>
)}
```

### **Section 11 : Status**

```typescript
{activeTab === 'status' && (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Status</h3>
    
    <div className="space-y-4">
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={formData.isActive}
          onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
          className="w-5 h-5 text-blue-600 rounded"
        />
        <div>
          <span className="font-medium text-gray-900">Active</span>
          <p className="text-sm text-gray-600">Service is visible and bookable</p>
        </div>
      </label>
      
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={formData.isFeatured}
          onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
          className="w-5 h-5 text-blue-600 rounded"
        />
        <div>
          <span className="font-medium text-gray-900">Featured</span>
          <p className="text-sm text-gray-600">Show in featured section</p>
        </div>
      </label>
      
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={formData.isVerified}
          onChange={(e) => setFormData({...formData, isVerified: e.target.checked})}
          className="w-5 h-5 text-blue-600 rounded"
        />
        <div>
          <span className="font-medium text-gray-900">Verified</span>
          <p className="text-sm text-gray-600">Service has been verified by admin</p>
        </div>
      </label>
      
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={formData.isAvailable}
          onChange={(e) => setFormData({...formData, isAvailable: e.target.checked})}
          className="w-5 h-5 text-blue-600 rounded"
        />
        <div>
          <span className="font-medium text-gray-900">Available</span>
          <p className="text-sm text-gray-600">Currently accepting bookings</p>
        </div>
      </label>
    </div>
  </div>
)}
```

---

## 📊 RÉSUMÉ

### **Travail à faire** :

1. ✅ Ajouter 8 sections manquantes au formulaire
2. ✅ Ajouter ~40 champs manquants
3. ✅ Gérer les états pour les nouveaux champs
4. ✅ Mettre à jour la soumission du formulaire
5. ✅ Copier vers Furniture & Laundry
6. ✅ Tester tous les champs
7. ✅ Vérifier la sauvegarde en base de données

### **Estimation** :
- Temps : 30-45 minutes
- Lignes de code : ~1500 lignes supplémentaires
- Fichiers modifiés : 3 (Home, Furniture, Laundry)

---

## 🎯 PROCHAINES ÉTAPES

1. **Compléter HomeCleaningFormComplete.tsx** avec les 8 sections manquantes
2. **Tester** le formulaire complet
3. **Copier** vers Furniture et Laundry
4. **Vérifier** la sauvegarde en base de données
5. **Documenter** les changements

---

**🚀 OBJECTIF : FORMULAIRE 100% COMPLET AVEC TOUS LES CHAMPS DU SCHÉMA PRISMA !**
