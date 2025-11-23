# 🎯 IMPLÉMENTATION DU PROPERTY FORM COMPLET

## 📋 PLAN D'IMPLÉMENTATION

### 1. Structure du formulaire (Tabs)
- **Tab 1**: Informations de base
- **Tab 2**: Prix & Devise  
- **Tab 3**: Détails & Pièces
- **Tab 4**: Localisation
- **Tab 5**: Média
- **Tab 6**: Plans & Documents
- **Tab 7**: Options

### 2. Nouveaux champs à ajouter

#### Tab 2: Prix & Devise
```typescript
secondPrice: number
pricePrefix: string
pricePostfix: string
pricePlaceholder: string
enablePricePlaceholder: boolean
```

#### Tab 3: Détails & Pièces
```typescript
rooms: number
garages: number
garageSize: string
floor: number
furnished: boolean
areaPostfix: string
landArea: number
landAreaPostfix: string
yearBuilt: number
propertyId: string
```

#### Tab 4: Localisation
```typescript
stateId: string
neighborhoodId: string
streetAddress: string
zipCode: string
```

#### Tab 5: Média
```typescript
videoUrl: string
sliderImage: string
customSlider: boolean
```

#### Tab 6: Plans & Documents
```typescript
floorPlans: JSON
documents: JSON
```

#### Tab 7: Options
```typescript
authorType: string
agentId: string
agencyId: string
loginRequired: boolean
labels: JSON
```

### 3. Utilisation des traductions

```typescript
import { useAdminTranslation } from '@/hooks/useAdminTranslation'

const { t } = useAdminTranslation('properties')

// Utilisation
<label>{t('form.salePrice')}</label>
<label>{t('form.yearBuilt')}</label>
<label>{t('form.propertyId')}</label>
```

### 4. Validation Zod

```typescript
import { z } from 'zod'

const propertySchema = z.object({
  name: z.string().min(1),
  type: z.string(),
  status: z.string(),
  listingType: z.string(),
  salePrice: z.number().optional(),
  rentPrice: z.number().optional(),
  currency: z.string(),
  bedrooms: z.number().optional(),
  bathrooms: z.number().optional(),
  rooms: z.number().optional(),
  garages: z.number().optional(),
  area: z.number().optional(),
  landArea: z.number().optional(),
  yearBuilt: z.number().optional(),
  propertyId: z.string().optional(),
  // ... tous les autres champs
})
```

## ✅ FICHIER ACTUEL

Le fichier `PropertyForm.tsx` existe déjà avec les champs de base.

## 🚀 PROCHAINES ÉTAPES

1. Créer un composant avec tabs (react-tabs ou headlessui)
2. Ajouter tous les nouveaux champs par section
3. Implémenter les traductions i18n
4. Ajouter la validation Zod
5. Tester en EN et FR

## 📝 EXEMPLE DE CODE

Voir le fichier actuel: `/app/[locale]/admin/properties/PropertyForm.tsx`

Pour l'étendre, ajouter:
- Système de tabs
- Nouveaux champs formData
- Traductions i18n
- Upload de fichiers (images, documents, plans)
- Composants UI avancés (select devise, upload, etc.)

