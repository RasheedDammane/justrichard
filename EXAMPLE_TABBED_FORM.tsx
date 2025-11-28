// ============================================
// EXEMPLE COMPLET - COPIER/COLLER CE FICHIER
// ============================================

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

// ============================================
// INTERFACE (Adapter selon vos besoins)
// ============================================
interface MyData {
  id: string;
  name: string;
  email: string;
  description: string;
  status: string;
  price: number;
  currency: string;
  category: string;
  customField1?: string;
  customField2?: string;
  customField3?: string;
  isFeatured: boolean;
  isActive: boolean;
  sendNotifications?: boolean;
  allowComments?: boolean;
  metaTitle: string;
  metaDescription: string;
}

interface MyEditClientProps {
  data: MyData;
  locale: string;
}

// ============================================
// COMPOSANT PRINCIPAL
// ============================================
export default function MyEditClient({ data, locale }: MyEditClientProps) {
  const router = useRouter();
  const [formData, setFormData] = useState(data);
  const [loading, setLoading] = useState(false);

  // ============================================
  // HANDLERS
  // ============================================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: value ? parseFloat(value) : 0 }));
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
        router.refresh();
      } else {
        alert('Error saving data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving data');
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // DÉFINITION DES TABS
  // ============================================
  const tabs = [
    // TAB 1: BASIC INFO
    {
      id: 'basic',
      label: 'Basic Info',
      icon: '📝',
      content: (
        <FormSection 
          title="Basic Information" 
          description="Enter the basic details of your item"
        >
          {/* Grid 2 colonnes */}
          <FormGrid cols={2}>
            <TextInput
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter name"
              help="This will be displayed as the main title"
            />
            
            <TextInput
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="email@example.com"
            />
          </FormGrid>

          {/* Champ pleine largeur */}
          <TextArea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Enter a detailed description"
            help="Provide as much detail as possible"
          />
        </FormSection>
      ),
    },

    // TAB 2: DETAILS
    {
      id: 'details',
      label: 'Details',
      icon: '🏠',
      content: (
        <>
          {/* Section 1 */}
          <FormSection 
            title="Status & Category"
            description="Configure the status and category"
          >
            <FormGrid cols={2}>
              <Select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                options={[
                  { value: 'draft', label: 'Draft' },
                  { value: 'published', label: 'Published' },
                  { value: 'archived', label: 'Archived' },
                ]}
                required
                help="Current status of the item"
              />

              <Select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                options={[
                  { value: 'category1', label: 'Category 1' },
                  { value: 'category2', label: 'Category 2' },
                  { value: 'category3', label: 'Category 3' },
                ]}
                required
              />
            </FormGrid>
          </FormSection>

          {/* Section 2 */}
          <FormSection title="Additional Information">
            <FormGrid cols={3}>
              <TextInput
                label="Custom Field 1"
                name="customField1"
                value={formData.customField1 || ''}
                onChange={handleChange}
                placeholder="Optional"
              />

              <TextInput
                label="Custom Field 2"
                name="customField2"
                value={formData.customField2 || ''}
                onChange={handleChange}
                placeholder="Optional"
              />

              <TextInput
                label="Custom Field 3"
                name="customField3"
                value={formData.customField3 || ''}
                onChange={handleChange}
                placeholder="Optional"
              />
            </FormGrid>
          </FormSection>
        </>
      ),
    },

    // TAB 3: PRICING
    {
      id: 'pricing',
      label: 'Pricing',
      icon: '💰',
      content: (
        <FormSection 
          title="Pricing Information"
          description="Set the price and currency"
        >
          <FormGrid cols={2}>
            <TextInput
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              required
              help="Enter the price without currency symbol"
            />

            <Select
              label="Currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              options={[
                { value: 'USD', label: 'USD - US Dollar' },
                { value: 'EUR', label: 'EUR - Euro' },
                { value: 'GBP', label: 'GBP - British Pound' },
                { value: 'THB', label: 'THB - Thai Baht' },
              ]}
              required
            />
          </FormGrid>

          {/* Exemple de calcul affiché */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Final Price: <span className="font-semibold text-gray-900">
                {formData.currency} {formData.price.toFixed(2)}
              </span>
            </p>
          </div>
        </FormSection>
      ),
    },

    // TAB 4: OPTIONS
    {
      id: 'options',
      label: 'Options',
      icon: '⚙️',
      content: (
        <FormSection 
          title="Options & Settings"
          description="Configure visibility and features"
        >
          <div className="space-y-4">
            <Checkbox
              label="Featured Item"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              help="Display this item prominently on the homepage"
            />

            <Checkbox
              label="Active"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              help="Make this item visible to users"
            />

            <Checkbox
              label="Send Email Notifications"
              name="sendNotifications"
              checked={formData.sendNotifications || false}
              onChange={handleChange}
              help="Notify users when this item is updated"
            />

            <Checkbox
              label="Allow Comments"
              name="allowComments"
              checked={formData.allowComments || false}
              onChange={handleChange}
            />
          </div>
        </FormSection>
      ),
    },

    // TAB 5: SEO
    {
      id: 'seo',
      label: 'SEO',
      icon: '🔍',
      content: (
        <FormSection 
          title="SEO Settings"
          description="Optimize for search engines"
        >
          <TextInput
            label="Meta Title"
            name="metaTitle"
            value={formData.metaTitle}
            onChange={handleChange}
            placeholder="Enter SEO title"
            help="Recommended: 50-60 characters"
          />

          <TextArea
            label="Meta Description"
            name="metaDescription"
            value={formData.metaDescription}
            onChange={handleChange}
            rows={3}
            placeholder="Enter SEO description"
            help="Recommended: 150-160 characters"
          />

          {/* Preview */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500 mb-2">Search Engine Preview:</p>
            <div className="space-y-1">
              <p className="text-blue-600 text-sm font-medium">
                {formData.metaTitle || 'Your Meta Title'}
              </p>
              <p className="text-xs text-gray-600">
                {formData.metaDescription || 'Your meta description will appear here...'}
              </p>
            </div>
          </div>
        </FormSection>
      ),
    },
  ];

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Edit Item</h1>
        <p className="text-gray-600 mt-1">{data.name}</p>
      </div>

      {/* Tabbed Form */}
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

// ============================================
// NOTES D'UTILISATION
// ============================================
/*

1. ADAPTER L'INTERFACE:
   - Modifier MyData selon vos champs
   - Ajouter/supprimer des propriétés

2. ADAPTER LES TABS:
   - Ajouter/supprimer des tabs
   - Modifier les icons (emojis)
   - Changer les labels

3. ADAPTER LES CHAMPS:
   - Utiliser TextInput, TextArea, Select, Checkbox
   - Utiliser FormGrid pour le layout
   - Ajouter des sections avec FormSection

4. ADAPTER L'API:
   - Modifier l'URL dans handleSubmit
   - Adapter la logique de sauvegarde

5. TESTER:
   - Vérifier chaque tab
   - Tester la sauvegarde
   - Tester la validation

*/
