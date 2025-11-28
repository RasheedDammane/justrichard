# 🧹 CLEANING SERVICES - SPECIFICATIONS COMPLÈTES

**Date**: 26 Nov 2025, 11:30 UTC+07:00
**Modules**: Home Cleaning, Furniture Cleaning, Laundry, Maids

---

## 📋 MODULES À CRÉER

### **1. Home Cleaning** 🏠
**Services** :
- Basic Cleaning (nettoyage basique)
- Deep Cleaning (nettoyage en profondeur)
- Move In/Out Cleaning (déménagement)
- Post Construction Cleaning (après construction)
- Spring Cleaning (grand nettoyage)

**Options de prix** :
- Prix par m² (per square meter)
- Prix par pièce (per room)
- Prix par heure (per hour)
- Forfaits (packages)

**Détails requis** :
- Type de propriété (Villa, Apartment, Office, etc.)
- Nombre de chambres
- Nombre de salles de bain
- Surface en m²
- Nombre d'étages
- Fréquence (One-time, Weekly, Bi-weekly, Monthly)

**Add-ons** :
- Window cleaning (intérieur/extérieur)
- Balcony cleaning
- Kitchen deep clean
- Bathroom deep clean
- Carpet cleaning
- Upholstery cleaning
- Oven cleaning
- Fridge cleaning
- Laundry service
- Ironing service

---

### **2. Furniture Cleaning** 🛋️
**Services** :
- Sofa Cleaning
- Carpet Cleaning
- Mattress Cleaning
- Curtain Cleaning
- Chair Cleaning
- Rug Cleaning

**Options de prix** :
- Prix par pièce (per item)
- Prix par set (sofa set, dining set)
- Prix par m² (pour tapis/carpets)

**Détails requis** :
- Type de meuble
- Matériau (Fabric, Leather, Velvet, etc.)
- Dimensions
- Nombre de pièces
- État (Normal, Heavily soiled, Stained)
- Type de tache (si applicable)

**Add-ons** :
- Stain protection
- Deodorizing
- Sanitization
- Scotchgard protection
- Express service (same day)

---

### **3. Laundry & Dry Cleaning** 👔
**Services** :
- Wash & Fold
- Wash & Iron
- Dry Cleaning
- Steam Ironing
- Shoe Cleaning
- Bag Cleaning
- Curtain Cleaning
- Bedding Cleaning

**Options de prix** :
- Prix par kg (per kilogram)
- Prix par pièce (per item)
- Forfaits mensuels (monthly packages)

**Détails requis** :
- Type de vêtement
- Matériau
- Poids total (kg)
- Service requis (Wash, Iron, Dry clean)
- Urgence (Standard, Express, Same day)

**Add-ons** :
- Express service (24h)
- Same day service
- Pickup & delivery
- Stain removal
- Alterations
- Packaging

---

### **4. Maids** 👩‍🦰
**Déjà existant mais à améliorer** :

**Services** :
- Live-in Maid
- Live-out Maid
- Part-time Maid
- Hourly Maid
- Temporary Maid

**Détails requis** (déjà dans le modèle) :
- Nationalité
- Âge
- Expérience
- Langues
- Compétences (cooking, babysitting, elderly care)
- Type de contrat
- Salaire mensuel
- Disponibilité

**À ajouter** :
- Packages (Monthly, Quarterly, Yearly)
- Trial period option
- Replacement guarantee
- Training included
- Uniform provided

---

## 🎨 FORMULAIRE ADMIN - STRUCTURE COMPLÈTE

### **Section 1: Basic Information**
- Service Name
- Slug (auto-generated)
- Service Type (dropdown)
- Category
- Sub-category
- Short Description (160 chars)
- Full Description (rich text)

### **Section 2: Pricing**
- Base Price
- Currency (AED, USD, EUR)
- Pricing Model (per sqm, per item, per hour, flat rate)
- Minimum Charge
- Price per SQM (if applicable)
- Price per Item (if applicable)
- Price Calculator (interactive)

### **Section 3: Service Details**
- Duration (estimated time)
- Service Areas (what's included)
- Included Services (checklist)
- Excluded Services (checklist)
- Equipment Used (list)
- Products Used (eco-friendly, etc.)

### **Section 4: Options & Add-ons**
**Dynamic list with** :
- Option Name
- Option Price
- Option Description
- Is Required (checkbox)
- Display Order

### **Section 5: Packages**
**Multiple packages** :
- Package Name
- Package Price
- Package Description
- Included Services
- Discount Percentage
- Validity Period

### **Section 6: Availability**
- Available Days (Mon-Sun checkboxes)
- Available Hours (time slots)
- Advance Booking (days required)
- Same Day Available (checkbox)
- Express Service Available (checkbox)

### **Section 7: Location**
- Country (dropdown)
- City (dropdown)
- Service Areas (multi-select zones)
- Latitude/Longitude (map picker)

### **Section 8: Media**
- Cover Image (upload)
- Gallery Images (multiple upload)
- Video URL (YouTube/Vimeo)
- Before/After Photos

### **Section 9: Requirements & Restrictions**
- Customer Requirements (checklist)
- Service Restrictions (text)
- Age Restrictions
- Property Type Restrictions

### **Section 10: Policies**
- Cancellation Policy (rich text)
- Refund Policy (rich text)
- Terms & Conditions (rich text)
- Privacy Policy (checkbox to use default)

### **Section 11: Tags & SEO**
- Tags (multi-input)
- Meta Title
- Meta Description
- Keywords
- Schema Markup (auto-generated)

### **Section 12: Contact & Support**
- Phone Number
- Email
- WhatsApp Number
- Support Hours

### **Section 13: Status & Settings**
- Is Active (toggle)
- Is Featured (toggle)
- Is Verified (toggle)
- Is Available (toggle)
- Show on Homepage (toggle)
- Allow Online Booking (toggle)
- Require Approval (toggle)

---

## 📊 STATISTIQUES À AFFICHER

### **Dashboard Stats**
- Total Services
- Active Services
- Featured Services
- Total Bookings
- Revenue (This Month)
- Average Rating
- Pending Bookings
- Completed Bookings

### **Per Service Stats**
- Views
- Bookings
- Revenue
- Rating
- Reviews Count
- Conversion Rate
- Popular Add-ons
- Peak Booking Times

---

## 🎯 FONCTIONNALITÉS AVANCÉES

### **1. Price Calculator**
Interactive calculator on form :
- Input: Property size, rooms, add-ons
- Output: Estimated price
- Save as quote

### **2. Availability Calendar**
- Visual calendar
- Block dates
- Set special prices
- Holiday pricing

### **3. Staff Assignment**
- Assign cleaners to bookings
- Track performance
- Rating system

### **4. Booking Management**
- View all bookings
- Filter by status
- Assign staff
- Update status
- Send notifications

### **5. Review Management**
- Approve/reject reviews
- Respond to reviews
- Feature best reviews
- Report inappropriate reviews

### **6. Analytics Dashboard**
- Revenue charts
- Booking trends
- Popular services
- Customer demographics
- Performance metrics

---

## 🚀 PROCHAINES ÉTAPES

1. ✅ Créer modèles Prisma
2. ⏳ Créer pages admin (4 modules)
3. ⏳ Créer formulaires complets
4. ⏳ Créer APIs CRUD
5. ⏳ Créer pages frontend
6. ⏳ Créer système de booking
7. ⏳ Intégrer paiement
8. ⏳ Créer notifications
9. ⏳ Créer reviews system
10. ⏳ Tests complets

---

**📝 ESTIMATION**
- Temps total: 8-10 heures
- Fichiers à créer: ~40
- Lignes de code: ~15,000

**🎯 PRIORITÉ**
1. Home Cleaning (le plus demandé)
2. Maids (améliorer existant)
3. Furniture Cleaning
4. Laundry & Dry Cleaning
