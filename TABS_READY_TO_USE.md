# ✅ TABS - PRÊT À UTILISER!

**Date**: 23 Novembre 2025, 12:40  
**Status**: ✅ **COMPOSANT CRÉÉ**

---

## 📦 COMPOSANT CRÉÉ

### `/components/admin/TabNavigation.tsx` ✅

Composant réutilisable pour navigation par onglets.

**Features**:
- ✅ Icons + Labels
- ✅ Responsive (mobile-friendly)
- ✅ Hover effects
- ✅ Active state
- ✅ Scroll horizontal sur mobile

---

## 🚀 UTILISATION DANS PropertyEditClient

### 1. Importer le composant
```typescript
import TabNavigation from '@/components/admin/TabNavigation';
```

### 2. Ajouter l'état
```typescript
const [activeTab, setActiveTab] = useState('basic');
```

### 3. Définir les tabs
```typescript
const tabs = [
  { id: 'basic', label: 'Basic Info', icon: '📝' },
  { id: 'details', label: 'Details', icon: '🏠' },
  { id: 'location', label: 'Location', icon: '📍' },
  { id: 'pricing', label: 'Pricing', icon: '💰' },
  { id: 'media', label: 'Media', icon: '📸' },
  { id: 'features', label: 'Features', icon: '⭐' },
  { id: 'thailand', label: 'Thailand', icon: '🇹🇭' },
  { id: 'seo', label: 'SEO', icon: '🔍' },
];
```

### 4. Utiliser le composant
```tsx
<TabNavigation 
  tabs={tabs}
  activeTab={activeTab}
  onChange={setActiveTab}
/>
```

### 5. Afficher le contenu conditionnel
```tsx
<form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
  {activeTab === 'basic' && (
    <div className="space-y-6">
      {/* Champs Basic Info */}
    </div>
  )}

  {activeTab === 'details' && (
    <div className="space-y-6">
      {/* Champs Details */}
    </div>
  )}

  {/* ... autres tabs */}

  {/* Boutons Save/Cancel */}
  <div className="flex items-center justify-end gap-4 pt-6 border-t mt-6">
    <Link href={`/${locale}/admin/properties`}>Cancel</Link>
    <button type="submit">Save</button>
  </div>
</form>
```

---

## 📋 CODE COMPLET À AJOUTER

### Dans PropertyEditClient.tsx

#### 1. Imports (en haut du fichier)
```typescript
import TabNavigation from '@/components/admin/TabNavigation';
```

#### 2. État (dans le composant)
```typescript
const [activeTab, setActiveTab] = useState('basic');

const tabs = [
  { id: 'basic', label: 'Basic Info', icon: '📝' },
  { id: 'details', label: 'Details', icon: '🏠' },
  { id: 'location', label: 'Location', icon: '📍' },
  { id: 'pricing', label: 'Pricing', icon: '💰' },
  { id: 'media', label: 'Media', icon: '📸' },
  { id: 'features', label: 'Features', icon: '⭐' },
  { id: 'thailand', label: 'Thailand', icon: '🇹🇭' },
  { id: 'seo', label: 'SEO', icon: '🔍' },
];
```

#### 3. Navigation (après les messages d'erreur)
```tsx
{/* Tabs Navigation */}
<TabNavigation 
  tabs={tabs}
  activeTab={activeTab}
  onChange={setActiveTab}
/>
```

#### 4. Envelopper chaque section
```tsx
{/* AVANT */}
<div>
  <h2>Basic Information</h2>
  {/* champs */}
</div>

{/* APRÈS */}
{activeTab === 'basic' && (
  <div>
    <h2>Basic Information</h2>
    {/* champs */}
  </div>
)}
```

---

## 🎯 RÉPARTITION DES SECTIONS PAR TAB

### Tab 'basic'
- Section: Basic Information

### Tab 'details'
- Section: Type & Status
- Section: Property Details

### Tab 'location'
- Section: Location

### Tab 'pricing'
- Section: Pricing
- Section: Additional Information (price prefix/postfix)

### Tab 'media'
- Section: Media (images, video, virtual tour, floor plans, documents)

### Tab 'features'
- Section: Features & Amenities

### Tab 'thailand'
- Section: Thailand Ownership

### Tab 'seo'
- Section: SEO
- Section: Options (checkboxes)

---

## 💻 EXEMPLE COMPLET

```tsx
export default function PropertyEditClient({ property, cities, countries, locale }: PropertyEditClientProps) {
  const router = useRouter();
  const t = useAdminTranslation('properties');
  const tc = useAdminCommon();
  
  const [formData, setFormData] = useState(property);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: '📝' },
    { id: 'details', label: 'Details', icon: '🏠' },
    { id: 'location', label: 'Location', icon: '📍' },
    { id: 'pricing', label: 'Pricing', icon: '💰' },
    { id: 'media', label: 'Media', icon: '📸' },
    { id: 'features', label: 'Features', icon: '⭐' },
    { id: 'thailand', label: 'Thailand', icon: '🇹🇭' },
    { id: 'seo', label: 'SEO', icon: '🔍' },
  ];

  // ... handleChange, handleSubmit ...

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link href={`/${locale}/admin/properties`}>← Back</Link>
        <h1>Edit Properties</h1>
        <p>{property.name}</p>
      </div>

      {/* Messages */}
      {success && <div>Success!</div>}
      {error && <div>{error}</div>}

      {/* Tabs Navigation */}
      <TabNavigation 
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        {/* Tab: Basic Info */}
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <h2>Basic Information</h2>
            {/* Champs: name, slug, propertyId, description */}
          </div>
        )}

        {/* Tab: Details */}
        {activeTab === 'details' && (
          <div className="space-y-6">
            <h2>Type & Status</h2>
            {/* Champs: type, status, listingType */}
            
            <h2>Property Details</h2>
            {/* Champs: bedrooms, bathrooms, etc. */}
          </div>
        )}

        {/* Tab: Location */}
        {activeTab === 'location' && (
          <div className="space-y-6">
            <h2>Location</h2>
            {/* Champs: country, city, address, etc. */}
          </div>
        )}

        {/* Tab: Pricing */}
        {activeTab === 'pricing' && (
          <div className="space-y-6">
            <h2>Pricing</h2>
            {/* Champs: salePrice, rentPrice, currency, etc. */}
          </div>
        )}

        {/* Tab: Media */}
        {activeTab === 'media' && (
          <div className="space-y-6">
            <h2>Media</h2>
            <ImageUpload images={formData.images} onChange={...} />
            <VideoInput video={formData.video} onChange={...} />
            {/* Virtual tour, floor plans, documents */}
          </div>
        )}

        {/* Tab: Features */}
        {activeTab === 'features' && (
          <div className="space-y-6">
            <h2>Features & Amenities</h2>
            {/* Checkboxes features et amenities */}
          </div>
        )}

        {/* Tab: Thailand */}
        {activeTab === 'thailand' && (
          <div className="space-y-6">
            <h2>🇹🇭 Thailand Ownership</h2>
            {/* Champs: foreignQuota, thaiQuota, thaiCompany */}
          </div>
        )}

        {/* Tab: SEO */}
        {activeTab === 'seo' && (
          <div className="space-y-6">
            <h2>SEO</h2>
            {/* Champs: metaTitle, metaDescription */}
            
            <h2>Options</h2>
            {/* Checkboxes: furnished, isFeatured, isActive, isAvailable */}
          </div>
        )}

        {/* Boutons (toujours visibles) */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t mt-6">
          <Link href={`/${locale}/admin/properties`} className="px-6 py-2 border rounded-lg">
            {tc('cancel')}
          </Link>
          <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded-lg">
            {loading ? 'Saving...' : tc('save')}
          </button>
        </div>
      </form>
    </div>
  );
}
```

---

## 🎨 APERÇU VISUEL

### Desktop
```
┌──────────────────────────────────────────────────────────────────┐
│ 📝 Basic Info │ 🏠 Details │ 📍 Location │ 💰 Pricing │ 📸 Media │
│ ══════════════                                                    │
└──────────────────────────────────────────────────────────────────┘
```

### Mobile
```
┌────────────────┐
│ 📝 │ 🏠 │ 📍 │ 💰│
│ ══             │
└────────────────┘
(Scroll horizontal)
```

---

## ✅ CHECKLIST D'IMPLÉMENTATION

- [ ] 1. Créer `/components/admin/TabNavigation.tsx` ✅ (FAIT)
- [ ] 2. Importer TabNavigation dans PropertyEditClient
- [ ] 3. Ajouter `const [activeTab, setActiveTab] = useState('basic')`
- [ ] 4. Définir le tableau `tabs`
- [ ] 5. Ajouter `<TabNavigation />` après les messages
- [ ] 6. Envelopper "Basic Information" avec `{activeTab === 'basic' && (...)}`
- [ ] 7. Envelopper "Type & Status" + "Property Details" avec `{activeTab === 'details' && (...)}`
- [ ] 8. Envelopper "Location" avec `{activeTab === 'location' && (...)}`
- [ ] 9. Envelopper "Pricing" avec `{activeTab === 'pricing' && (...)}`
- [ ] 10. Envelopper "Media" avec `{activeTab === 'media' && (...)}`
- [ ] 11. Envelopper "Features & Amenities" avec `{activeTab === 'features' && (...)}`
- [ ] 12. Envelopper "Thailand Ownership" avec `{activeTab === 'thailand' && (...)}`
- [ ] 13. Envelopper "SEO" + "Options" avec `{activeTab === 'seo' && (...)}`
- [ ] 14. Garder les boutons Save/Cancel hors des conditions
- [ ] 15. Tester chaque tab

---

## 🚀 RÉSULTAT

### Avant
```
❌ Scroll infini
❌ Toutes les sections visibles
❌ Difficile de naviguer
❌ Formulaire intimidant
```

### Après
```
✅ Navigation par tabs
✅ Une section à la fois
✅ Organisation claire
✅ Interface moderne
✅ Meilleure UX
```

---

## 📝 NOTES IMPORTANTES

### 1. Boutons Save/Cancel
**IMPORTANT**: Les boutons doivent être **hors** des conditions de tabs pour rester toujours visibles.

```tsx
{/* ❌ MAUVAIS */}
{activeTab === 'seo' && (
  <div>
    {/* contenu */}
    <button>Save</button>  {/* Visible seulement sur tab SEO */}
  </div>
)}

{/* ✅ BON */}
{activeTab === 'seo' && (
  <div>
    {/* contenu */}
  </div>
)}
<button>Save</button>  {/* Toujours visible */}
```

### 2. Validation
La validation se fait à la soumission du formulaire, pas à chaque changement de tab.

### 3. Données
Les données du formulaire (`formData`) restent intactes lors du changement de tab.

---

**✅ COMPOSANT TABS CRÉÉ ET PRÊT!**

**Fichier**: `/components/admin/TabNavigation.tsx`  
**Status**: ✅ Fonctionnel  
**Prochaine étape**: Intégrer dans PropertyEditClient
