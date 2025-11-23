# 🎨 TEMPLATE TABBED FORM - GUIDE COMPLET

**Date**: 23 Novembre 2025  
**Status**: ✅ **PRÊT À UTILISER**

---

## 📦 COMPOSANTS CRÉÉS

### 1. TabbedForm (Principal)
`/components/admin/TabbedForm.tsx`

Composant principal qui gère:
- ✅ Navigation des tabs
- ✅ Affichage conditionnel du contenu
- ✅ Boutons Save/Cancel
- ✅ État de chargement
- ✅ Responsive

### 2. Form Sections (Éléments)
`/components/admin/form-sections/FormSection.tsx`

Composants réutilisables:
- ✅ `FormSection` - Section avec titre
- ✅ `TextInput` - Input texte
- ✅ `TextArea` - Textarea
- ✅ `Select` - Select dropdown
- ✅ `Checkbox` - Checkbox
- ✅ `FormGrid` - Grid responsive

---

## 🚀 EXEMPLE D'UTILISATION COMPLET

### Exemple 1: Formulaire Simple

```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TabbedForm from '@/components/admin/TabbedForm';
import { 
  FormSection, 
  TextInput, 
  TextArea, 
  Select, 
  Checkbox,
  FormGrid 
} from '@/components/admin/form-sections/FormSection';

export default function MyEditForm({ data, locale }) {
  const router = useRouter();
  const [formData, setFormData] = useState(data);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(`/api/my-resource/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        router.push(`/${locale}/admin/my-resource`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    {
      id: 'basic',
      label: 'Basic Info',
      icon: '📝',
      content: (
        <FormSection 
          title="Basic Information" 
          description="Enter the basic details"
        >
          <FormGrid cols={2}>
            <TextInput
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter name"
            />
            
            <TextInput
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGrid>

          <TextArea
            label="Description"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            rows={4}
            placeholder="Enter description"
          />
        </FormSection>
      ),
    },
    {
      id: 'details',
      label: 'Details',
      icon: '🏠',
      content: (
        <FormSection title="Additional Details">
          <FormGrid cols={3}>
            <Select
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
                { value: 'pending', label: 'Pending' },
              ]}
              required
            />

            <TextInput
              label="Price"
              name="price"
              type="number"
              value={formData.price || ''}
              onChange={handleChange}
              placeholder="0.00"
            />

            <Select
              label="Currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              options={[
                { value: 'USD', label: 'USD' },
                { value: 'EUR', label: 'EUR' },
                { value: 'THB', label: 'THB' },
              ]}
            />
          </FormGrid>
        </FormSection>
      ),
    },
    {
      id: 'options',
      label: 'Options',
      icon: '⚙️',
      content: (
        <FormSection title="Options & Settings">
          <div className="space-y-3">
            <Checkbox
              label="Is Featured"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              help="Display this item prominently"
            />

            <Checkbox
              label="Is Active"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              help="Make this item visible to users"
            />

            <Checkbox
              label="Send Notifications"
              name="sendNotifications"
              checked={formData.sendNotifications}
              onChange={handleChange}
            />
          </div>
        </FormSection>
      ),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Edit Item</h1>
        <p className="text-gray-600 mt-1">{data.name}</p>
      </div>

      <TabbedForm
        tabs={tabs}
        onSubmit={handleSubmit}
        onCancel={`/${locale}/admin/my-resource`}
        loading={loading}
        submitLabel="Save Changes"
        cancelLabel="Cancel"
      />
    </div>
  );
}
```

---

## 🎯 EXEMPLE 2: Formulaire Avancé avec Plus de Tabs

```tsx
const tabs = [
  {
    id: 'basic',
    label: 'Basic',
    icon: '📝',
    content: (
      <>
        <FormSection title="Basic Information">
          <FormGrid cols={2}>
            <TextInput label="Name" name="name" value={formData.name} onChange={handleChange} required />
            <TextInput label="Slug" name="slug" value={formData.slug} onChange={handleChange} />
          </FormGrid>
          <TextArea label="Description" name="description" value={formData.description} onChange={handleChange} />
        </FormSection>
      </>
    ),
  },
  {
    id: 'media',
    label: 'Media',
    icon: '📸',
    content: (
      <FormSection title="Media Files">
        <ImageUpload 
          images={formData.images} 
          onChange={(images) => setFormData(prev => ({ ...prev, images }))} 
        />
        <VideoInput 
          video={formData.video} 
          onChange={(video) => setFormData(prev => ({ ...prev, video }))} 
        />
      </FormSection>
    ),
  },
  {
    id: 'pricing',
    label: 'Pricing',
    icon: '💰',
    content: (
      <FormSection title="Pricing Information">
        <FormGrid cols={2}>
          <TextInput label="Sale Price" name="salePrice" type="number" value={formData.salePrice} onChange={handleChange} />
          <TextInput label="Rent Price" name="rentPrice" type="number" value={formData.rentPrice} onChange={handleChange} />
        </FormGrid>
      </FormSection>
    ),
  },
  {
    id: 'seo',
    label: 'SEO',
    icon: '🔍',
    content: (
      <FormSection title="SEO Settings">
        <TextInput label="Meta Title" name="metaTitle" value={formData.metaTitle} onChange={handleChange} />
        <TextArea label="Meta Description" name="metaDescription" value={formData.metaDescription} onChange={handleChange} rows={3} />
      </FormSection>
    ),
  },
];
```

---

## 📋 PROPS DES COMPOSANTS

### TabbedForm Props

```typescript
interface TabbedFormProps {
  tabs: Tab[];                    // Array de tabs
  onSubmit: (e: FormEvent) => void; // Handler de soumission
  onCancel: string;               // URL de redirection
  loading?: boolean;              // État de chargement
  submitLabel?: string;           // Label du bouton submit (défaut: "Save")
  cancelLabel?: string;           // Label du bouton cancel (défaut: "Cancel")
}

interface Tab {
  id: string;        // ID unique du tab
  label: string;     // Label affiché
  icon: string;      // Emoji ou icon
  content: ReactNode; // Contenu du tab
}
```

### FormSection Props

```typescript
interface FormSectionProps {
  title: string;           // Titre de la section
  description?: string;    // Description optionnelle
  children: ReactNode;     // Contenu
}
```

### TextInput Props

```typescript
interface TextInputProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'email' | 'number' | 'url' | 'tel' | 'password';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  help?: string;  // Texte d'aide sous le champ
}
```

### Select Props

```typescript
interface SelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  disabled?: boolean;
  help?: string;
}
```

### Checkbox Props

```typescript
interface CheckboxProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  help?: string;
}
```

### FormGrid Props

```typescript
interface FormGridProps {
  cols?: 1 | 2 | 3 | 4;  // Nombre de colonnes (défaut: 2)
  children: ReactNode;
}
```

---

## 🎨 EXEMPLES DE LAYOUTS

### Layout 1: Grid 2 colonnes
```tsx
<FormGrid cols={2}>
  <TextInput label="First Name" name="firstName" value={data.firstName} onChange={handleChange} />
  <TextInput label="Last Name" name="lastName" value={data.lastName} onChange={handleChange} />
</FormGrid>
```

### Layout 2: Grid 3 colonnes
```tsx
<FormGrid cols={3}>
  <TextInput label="City" name="city" value={data.city} onChange={handleChange} />
  <TextInput label="State" name="state" value={data.state} onChange={handleChange} />
  <TextInput label="Zip" name="zip" value={data.zip} onChange={handleChange} />
</FormGrid>
```

### Layout 3: Champ pleine largeur
```tsx
<TextArea 
  label="Full Width Description" 
  name="description" 
  value={data.description} 
  onChange={handleChange} 
  rows={6}
/>
```

### Layout 4: Mix
```tsx
<FormSection title="Contact Information">
  <FormGrid cols={2}>
    <TextInput label="Email" name="email" type="email" value={data.email} onChange={handleChange} />
    <TextInput label="Phone" name="phone" type="tel" value={data.phone} onChange={handleChange} />
  </FormGrid>
  
  <TextArea label="Address" name="address" value={data.address} onChange={handleChange} rows={3} />
  
  <FormGrid cols={3}>
    <TextInput label="City" name="city" value={data.city} onChange={handleChange} />
    <TextInput label="State" name="state" value={data.state} onChange={handleChange} />
    <TextInput label="Zip" name="zip" value={data.zip} onChange={handleChange} />
  </FormGrid>
</FormSection>
```

---

## 🎯 TEMPLATES PRÊTS À L'EMPLOI

### Template 1: CRUD Simple (3 tabs)
```tsx
const tabs = [
  { id: 'basic', label: 'Basic', icon: '📝', content: <BasicFields /> },
  { id: 'details', label: 'Details', icon: '📋', content: <DetailFields /> },
  { id: 'options', label: 'Options', icon: '⚙️', content: <OptionFields /> },
];
```

### Template 2: E-commerce (5 tabs)
```tsx
const tabs = [
  { id: 'basic', label: 'Basic', icon: '📝', content: <BasicInfo /> },
  { id: 'pricing', label: 'Pricing', icon: '💰', content: <PricingInfo /> },
  { id: 'inventory', label: 'Inventory', icon: '📦', content: <InventoryInfo /> },
  { id: 'media', label: 'Media', icon: '📸', content: <MediaFiles /> },
  { id: 'seo', label: 'SEO', icon: '🔍', content: <SEOSettings /> },
];
```

### Template 3: Real Estate (8 tabs)
```tsx
const tabs = [
  { id: 'basic', label: 'Basic', icon: '📝', content: <BasicInfo /> },
  { id: 'details', label: 'Details', icon: '🏠', content: <PropertyDetails /> },
  { id: 'location', label: 'Location', icon: '📍', content: <LocationInfo /> },
  { id: 'pricing', label: 'Pricing', icon: '💰', content: <PricingInfo /> },
  { id: 'media', label: 'Media', icon: '📸', content: <MediaGallery /> },
  { id: 'features', label: 'Features', icon: '⭐', content: <FeaturesAmenities /> },
  { id: 'legal', label: 'Legal', icon: '📄', content: <LegalInfo /> },
  { id: 'seo', label: 'SEO', icon: '🔍', content: <SEOSettings /> },
];
```

---

## ✅ AVANTAGES DU TEMPLATE

### Pour le développement:
- ✅ **Réutilisable** - Un seul composant pour tous les formulaires
- ✅ **Maintenable** - Facile à modifier et étendre
- ✅ **Type-safe** - TypeScript complet
- ✅ **Consistant** - Même style partout
- ✅ **Rapide** - Créer un formulaire en 5 minutes

### Pour l'utilisateur:
- ✅ **Organisation claire** - Tabs logiques
- ✅ **Navigation rapide** - Clic pour changer
- ✅ **Responsive** - Fonctionne sur mobile
- ✅ **Accessible** - Keyboard navigation
- ✅ **Moderne** - Interface professionnelle

---

## 🚀 DÉMARRAGE RAPIDE

### 1. Copier les composants
```bash
# Déjà créés:
/components/admin/TabbedForm.tsx
/components/admin/form-sections/FormSection.tsx
```

### 2. Créer votre formulaire
```tsx
// app/[locale]/admin/my-resource/[id]/edit/MyEditClient.tsx
'use client';

import TabbedForm from '@/components/admin/TabbedForm';
import { FormSection, TextInput, FormGrid } from '@/components/admin/form-sections/FormSection';

export default function MyEditClient({ data, locale }) {
  // ... state et handlers ...

  const tabs = [
    {
      id: 'basic',
      label: 'Basic',
      icon: '📝',
      content: (
        <FormSection title="Basic Information">
          <FormGrid cols={2}>
            <TextInput label="Name" name="name" value={formData.name} onChange={handleChange} required />
            <TextInput label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
          </FormGrid>
        </FormSection>
      ),
    },
    // ... autres tabs ...
  ];

  return <TabbedForm tabs={tabs} onSubmit={handleSubmit} onCancel={`/${locale}/admin/my-resource`} />;
}
```

### 3. C'est tout! 🎉

---

## 📝 CHECKLIST DE CRÉATION

- [ ] Importer TabbedForm et FormSection
- [ ] Créer l'état avec useState
- [ ] Créer handleChange et handleSubmit
- [ ] Définir le tableau tabs avec id, label, icon, content
- [ ] Utiliser FormSection pour structurer
- [ ] Utiliser FormGrid pour le layout
- [ ] Utiliser TextInput, Select, Checkbox pour les champs
- [ ] Passer les props à TabbedForm
- [ ] Tester chaque tab

---

**✅ TEMPLATE COMPLET ET PRÊT À UTILISER!**

**Fichiers créés**:
- `/components/admin/TabbedForm.tsx`
- `/components/admin/form-sections/FormSection.tsx`

**Documentation**: Ce fichier (TABBED_FORM_TEMPLATE.md)
