# 📊 Entités en Base de Données - Admin Pages à Créer

## 🎯 Données Existantes en Base

D'après la capture d'écran du dashboard:

1. **Rental Cars** - 10 entrées ✅
2. **Motorbikes** - 20 entrées ✅
3. **Yachts** - 10 entrées ✅
4. **Properties** - 0 entrées
5. **Activities** - 11 entrées ✅
6. **Maids** - 20 entrées ✅
7. **Doctors** - 8 entrées ✅
8. **Lawyers** - 5 entrées ✅
9. **Coaches** - 6 entrées ✅
10. **Suppliers** - 10 entrées ✅

---

## 📋 Pages Admin à Créer/Corriger

### 1. Rental Cars (10 en base)
**URL**: `/admin/rental-cars` ou `/admin/cars`
**Modèle**: `RentalCar`
**Status**: ❌ À créer
**Champs principaux**:
- name, slug, brand, model, year
- type (SUV, Sedan, etc.)
- pricePerDay, pricePerWeek, pricePerMonth
- seats, doors, transmission
- fuelType, features, images

### 2. Motorbikes (20 en base)
**URL**: `/admin/motorbikes`
**Modèle**: `Motorbike` ou dans `RentalCar`?
**Status**: ❌ À créer
**Champs principaux**:
- name, slug, brand, model, year
- type, engineSize, pricePerDay
- features, images

### 3. Yachts (10 en base)
**URL**: `/admin/yachts`
**Modèle**: `Yacht`
**Status**: ✅ Page liste existe
**Formulaire**: ✅ Créé avec 6 onglets
**À faire**: Corriger l'erreur TypeScript

### 4. Doctors (8 en base)
**URL**: `/admin/doctors`
**Modèle**: `Provider` (filtré par type)
**Status**: ⚠️ Page existe mais erreur (pas de champ `type`)
**Solution**: Afficher tous les providers ou créer un champ `type`

### 5. Lawyers (5 en base)
**URL**: `/admin/lawyers`
**Modèle**: `Provider`
**Status**: ⚠️ Même problème que Doctors

### 6. Coaches (6 en base)
**URL**: `/admin/coaches`
**Modèle**: `Provider`
**Status**: ⚠️ Même problème que Doctors

### 7. Maids (20 en base)
**URL**: `/admin/maids`
**Modèle**: `Provider` ou modèle séparé?
**Status**: ❌ Page n'existe pas

### 8. Activities (11 en base)
**URL**: `/admin/activities`
**Modèle**: `Provider` ou `Activity`?
**Status**: ⚠️ Page existe mais erreur

### 9. Suppliers (10 en base)
**URL**: `/admin/suppliers`
**Modèle**: `Provider`
**Status**: ⚠️ Page existe mais erreur

---

## 🔧 Actions Prioritaires

### 1. Corriger l'erreur TypeScript YachtForm
**Problème**: Type 'void' is not assignable to type 'ReactNode'
**Solution**: Le composant doit retourner du JSX (déjà fait normalement)

### 2. Vérifier les modèles Prisma
Identifier les vrais modèles pour:
- Motorbikes (RentalCar avec type?)
- Maids (Provider avec type?)
- Activities (Provider ou Activity?)

### 3. Créer les pages manquantes
- `/admin/rental-cars` (10 voitures)
- `/admin/motorbikes` (20 motos)
- `/admin/maids` (20 maids)

### 4. Ajouter un champ `type` ou `category` au modèle Provider
**Option A**: Migration Prisma pour ajouter `type`
```prisma
model Provider {
  // ... champs existants
  type String? // 'doctor', 'lawyer', 'coach', 'maid', 'activity', 'supplier'
  @@index([type])
}
```

**Option B**: Utiliser une table de catégories
```prisma
model ProviderCategory {
  id         String     @id
  name       String     @unique
  slug       String     @unique
  Provider   Provider[]
}

model Provider {
  // ... champs existants
  categoryId String?
  category   ProviderCategory? @relation(fields: [categoryId], references: [id])
}
```

---

## 📝 Formulaires à Créer

### Rental Cars Form
**Onglets**:
1. Informations de base (nom, marque, modèle, année)
2. Spécifications (type, sièges, portes, transmission)
3. Tarification (jour, semaine, mois)
4. Caractéristiques (GPS, climatisation, etc.)
5. Images & SEO

### Motorbikes Form
**Onglets**:
1. Informations de base
2. Spécifications (cylindrée, type)
3. Tarification
4. Équipements
5. Images & SEO

### Maids Form
**Onglets**:
1. Informations personnelles
2. Services proposés
3. Disponibilité
4. Tarification
5. Langues & Compétences

---

## 🎯 Plan d'Action

### Phase 1: Correction Immédiate ⚡
1. ✅ Corriger YachtForm TypeScript
2. ✅ Vérifier les modèles Prisma
3. ✅ Créer les pages manquantes

### Phase 2: Migration Base de Données 🔄
1. Ajouter champ `type` au modèle Provider
2. Migrer les données existantes
3. Mettre à jour les pages admin

### Phase 3: Formulaires Complets 📝
1. RentalCar form multi-tabs
2. Motorbike form multi-tabs
3. Maid form multi-tabs

---

## 🧪 Tests à Effectuer

```bash
# Vérifier les données en base
✓ http://localhost:3100/en/admin/yachts (10 yachts)
✓ http://localhost:3100/en/admin/rental-cars (10 voitures)
✓ http://localhost:3100/en/admin/motorbikes (20 motos)
✓ http://localhost:3100/en/admin/doctors (8 doctors)
✓ http://localhost:3100/en/admin/lawyers (5 lawyers)
✓ http://localhost:3100/en/admin/coaches (6 coaches)
✓ http://localhost:3100/en/admin/maids (20 maids)
✓ http://localhost:3100/en/admin/activities (11 activities)
✓ http://localhost:3100/en/admin/suppliers (10 suppliers)
```

---

**Date**: 22 novembre 2024  
**Version**: 3.5.0  
**Statut**: 🔄 EN COURS - Correction des erreurs et création des pages manquantes
