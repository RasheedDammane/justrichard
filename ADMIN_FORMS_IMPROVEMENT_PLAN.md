# 📋 PLAN DE TRAVAIL - AMÉLIORATION DES FORMULAIRES ADMIN

## 🎯 OBJECTIF
Transformer TOUS les formulaires admin pour remplacer les champs JSON par des interfaces visuelles intuitives, comme fait pour le formulaire Coach.

---

## 📊 ENTITÉS À TRAITER (7 entités)

### ✅ 1. COACHES - **TERMINÉ** ✓
- **Statut**: 100% complété
- **Fichier**: `/app/[locale]/admin/coaches/CoachForm.tsx`
- **Résultat**: 15 sections JSON converties en interfaces visuelles

---

### 🔄 2. DOCTORS (Médecins)
**Priorité**: HAUTE
**Fichier**: `/app/[locale]/admin/doctors/DoctorForm.tsx` (à créer/modifier)

#### Champs JSON à convertir:
1. **subSpecialties** (Json) → Checkboxes multiples
2. **education** (Json) → Cartes dynamiques (degree, institution, year)
3. **certifications** (Json) → Liste dynamique avec add/remove
4. **languages** (Json) → Checkboxes (English, French, Arabic, etc.)
5. **insuranceProviders** (Json) → Liste dynamique
6. **workingDays** (Json) → Checkboxes (Mon-Sun)
7. **workingHours** (Json) → Time inputs (start/end)
8. **breakTime** (Json) → Time inputs
9. **services** (Json) → Cartes dynamiques (name, price, duration)
10. **treatmentAreas** (Json) → Checkboxes multiples
11. **gallery** (Json) → Upload multiple images

#### Champs booléens à afficher:
- acceptsInsurance, isVerified, isPremium, acceptsOnlineBooking, acceptsVideoConsult, isActive, isAcceptingPatients

---

### 🔄 3. RENTAL CARS (Voitures de location)
**Priorité**: HAUTE
**Fichier**: `/app/[locale]/admin/rental-cars/RentalCarForm.tsx`

#### Champs JSON à convertir:
1. **deliveryLocations** (Json) → Liste dynamique (name, address, fee)
2. **requiredDocuments** (Json) → Checkboxes (Passport, License, etc.)
3. **features** (Json) → Checkboxes (GPS, Bluetooth, etc.)
4. **carFeatures** (Json) → Checkboxes (Leather seats, Sunroof, etc.)
5. **images** (Json) → Upload multiple images
6. **faq** (Json) → Cartes dynamiques (question, answer)

#### Champs enum à afficher:
- category (SUPER, LUXURY, SPORTS, SUV, etc.)
- fuelType (PETROL, DIESEL, ELECTRIC, HYBRID)
- transmission (AUTOMATIC, MANUAL)

#### Champs booléens:
- noDeposit, freeDelivery, instantBooking, isNewArrival, isFeatured, isActive, isAvailable

---

### 🔄 4. MOTORBIKES (Motos)
**Priorité**: MOYENNE
**Fichier**: `/app/[locale]/admin/motorbikes/MotorbikeForm.tsx`

**Note**: Vérifier si le modèle existe dans Prisma (non trouvé dans le schema)
- Si absent, créer le modèle Prisma d'abord
- Sinon, adapter selon le modèle existant

---

### 🔄 5. PROPERTIES (Propriétés)
**Priorité**: HAUTE
**Fichier**: `/app/[locale]/admin/properties/PropertyFormComplete.tsx`

#### Champs JSON à convertir:
1. **rentalDetails** (Json) → Objet structuré (duration, price, terms)
2. **categoryIds** (Json) → Checkboxes multiples
3. **labelIds** (Json) → Checkboxes multiples
4. **tagIds** (Json) → Input dynamique avec badges
5. **layout** (Json) → Cartes dynamiques (room, size, description)
6. **seoMeta** (Json) → Inputs structurés (keywords, og:tags)

#### Champs enum:
- status (DRAFT, PUBLISHED, ARCHIVED)
- type (RENT, SALE, BOTH)
- visibility (PUBLIC, PRIVATE)

---

### 🔄 6. LEGAL PROFESSIONALS (Avocats)
**Priorité**: HAUTE
**Fichier**: `/app/[locale]/admin/legal/LegalForm.tsx` (à créer)

#### Champs JSON à convertir:
1. **languages** (Json) → Checkboxes (fr, en, ar, etc.)
2. **practiceAreas** (Json) → Checkboxes multiples (CORPORATE_LAW, LABOR_LAW, etc.)
3. **industries** (Json) → Checkboxes (STARTUPS, SME, etc.)
4. **certifications** (Json) → Liste dynamique
5. **services** (Json) → Cartes dynamiques (title, description, startingPrice, currency, isRemote, isUrgentAvailable)
6. **seoKeywords** (Json) → Input dynamique avec badges

#### Champs spécifiques:
- type (LAWYER, LAW_FIRM, LEGAL_ADVISOR, NOTARY) → Radio buttons
- feeModel (HOURLY, FIXED, SUCCESS_FEE, MIXED, ON_QUOTE) → Select
- status (DRAFT, PUBLISHED, ARCHIVED) → Select

---

### 🔄 7. YACHTS
**Priorité**: MOYENNE
**Fichier**: `/app/[locale]/admin/yachts/YachtForm.tsx`

#### Champs JSON à convertir:
1. **features** (Json) → Checkboxes (GPS, Radar, etc.)
2. **amenities** (Json) → Checkboxes (WiFi, AC, Kitchen, etc.)
3. **included** (Json) → Liste dynamique
4. **notIncluded** (Json) → Liste dynamique
5. **images** (Json) → Upload multiple images
6. **faq** (Json) → Cartes dynamiques (question, answer)

#### Champs de pricing multiples:
- pricePerHour, priceFor2Hours, priceFor3Hours, priceFor4Hours, priceFor6Hours, priceFor8Hours, pricePerDay
→ Grid avec inputs numériques

---

### 🔄 8. ACTIVITIES
**Priorité**: MOYENNE
**Fichier**: `/app/[locale]/admin/activities/ActivityForm.tsx`

#### Champs JSON à convertir:
1. **included** (Json) → Liste dynamique
2. **notIncluded** (Json) → Liste dynamique
3. **whatToBring** (Json) → Liste dynamique
4. **availableDays** (Json) → Checkboxes (Mon-Sun)
5. **startTimes** (Json) → Liste dynamique avec time inputs
6. **images** (Json) → Upload multiple images

#### Champs spécifiques:
- difficulty (Easy, Moderate, Hard) → Radio buttons
- category → Select

---

### 🔄 9. MAIDS (Employées de maison)
**Priorité**: MOYENNE
**Fichier**: `/app/[locale]/admin/maids/MaidForm.tsx`

#### Champs JSON à convertir:
1. **otherLanguages** (Json) → Liste dynamique
2. **cookingOther** (Json) → Liste dynamique
3. **images** (Json) → Upload multiple images
4. **duties** (Json) → Checkboxes multiples

#### Champs booléens nombreux:
- elderlyCare, specialNeedsCare, babysittingOlderThan1Year, babysittingYoungerThan1Year
- cookingSyrianLebanese, cookingGulf, cookingInternational
- privateRoom, liveOut, workingOnDayOff, hasCat, hasDog
→ Grouper par catégories avec checkboxes

---

## 🎨 DESIGN PATTERNS À APPLIQUER

### 1. **Checkboxes** (pour listes prédéfinies)
```tsx
{['Option1', 'Option2', 'Option3'].map((item) => (
  <label key={item} className="flex items-center space-x-2 cursor-pointer">
    <input type="checkbox" checked={state.includes(item)} onChange={...} />
    <span>{item}</span>
  </label>
))}
```

### 2. **Cartes dynamiques** (pour objets complexes)
```tsx
{items.map((item, index) => (
  <div key={index} className="border rounded-lg p-4 bg-gray-50">
    <button onClick={() => removeItem(index)}><Trash2 /></button>
    <input value={item.field1} onChange={...} />
    <input value={item.field2} onChange={...} />
  </div>
))}
<button onClick={addItem}>Add Item</button>
```

### 3. **Input dynamique avec badges** (pour tags)
```tsx
<div className="flex flex-wrap gap-2">
  {tags.map((tag, i) => (
    <span key={i} className="badge">
      {tag} <button onClick={() => removeTag(i)}>X</button>
    </span>
  ))}
</div>
<input onKeyPress={(e) => e.key === 'Enter' && addTag()} />
```

### 4. **Time inputs** (pour horaires)
```tsx
<input type="time" value={workingHours.start} onChange={...} />
<input type="time" value={workingHours.end} onChange={...} />
```

### 5. **Upload multiple images**
```tsx
<input type="file" multiple accept="image/*" onChange={handleImageUpload} />
<div className="grid grid-cols-4 gap-2">
  {images.map((img, i) => (
    <div key={i} className="relative">
      <img src={img} />
      <button onClick={() => removeImage(i)}>X</button>
    </div>
  ))}
</div>
```

---

## 📝 CHECKLIST PAR FORMULAIRE

Pour chaque formulaire:
- [ ] Analyser le modèle Prisma
- [ ] Identifier tous les champs JSON
- [ ] Créer les états React appropriés
- [ ] Remplacer les textareas par des interfaces visuelles
- [ ] Grouper les champs par sections logiques
- [ ] Ajouter des icônes et couleurs par section
- [ ] Tester l'ajout/modification/suppression
- [ ] Vérifier la sauvegarde en base de données
- [ ] Tester le chargement des données existantes

---

## 🚀 ORDRE D'EXÉCUTION RECOMMANDÉ

1. **DOCTORS** (similaire à Coaches, beaucoup de champs médicaux)
2. **RENTAL CARS** (déjà partiellement fait, à compléter)
3. **LEGAL PROFESSIONALS** (structure claire, services à gérer)
4. **PROPERTIES** (complexe, beaucoup de champs)
5. **YACHTS** (pricing multiple, features)
6. **ACTIVITIES** (simple, listes dynamiques)
7. **MAIDS** (nombreux booléens à organiser)
8. **MOTORBIKES** (vérifier existence du modèle)

---

## ⏱️ ESTIMATION TEMPS

- **Doctors**: 2-3 heures
- **Rental Cars**: 1-2 heures
- **Legal Professionals**: 2 heures
- **Properties**: 3-4 heures (le plus complexe)
- **Yachts**: 1-2 heures
- **Activities**: 1 heure
- **Maids**: 1-2 heures
- **Motorbikes**: 1-2 heures (si modèle existe)

**TOTAL ESTIMÉ**: 12-18 heures de travail

---

## 🎯 RÉSULTAT ATTENDU

- ✅ ZÉRO champ JSON visible pour l'utilisateur
- ✅ Interfaces 100% visuelles et intuitives
- ✅ Validation automatique des données
- ✅ Design cohérent sur tous les formulaires
- ✅ Expérience utilisateur professionnelle
- ✅ Réduction drastique des erreurs de saisie

---

**Date de création**: 25 Nov 2025
**Statut**: EN COURS - Coach terminé, 7 entités restantes
