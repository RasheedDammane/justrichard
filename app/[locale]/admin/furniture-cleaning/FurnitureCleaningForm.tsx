'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Save, X, Plus, Trash2, Home, DollarSign, Clock, MapPin, 
  Image as ImageIcon, Tag, FileText, Phone, Settings, Calendar
} from 'lucide-react';

interface City {
  id: string;
  name: string;
  countryId: string;
}

interface Country {
  id: string;
  name: string;
  code: string;
}

interface HomeCleaningFormProps {
  locale: string;
  initialData?: any;
  isEdit?: boolean;
  cities: City[];
  countries: Country[];
}

export default function HomeCleaningForm({ 
  locale, 
  initialData, 
  isEdit = false,
  cities,
  countries 
}: HomeCleaningFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('basic');

  // Form state
  const [formData, setFormData] = useState({
    // Basic Information
    type: 'home',
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    shortDescription: initialData?.shortDescription || '',
    category: initialData?.category || 'basic',
    subCategory: initialData?.subCategory || '',
    
    // Pricing
    basePrice: initialData?.basePrice || '',
    currency: initialData?.currency || 'AED',
    pricePerSqm: initialData?.pricePerSqm || '',
    minimumCharge: initialData?.minimumCharge || '',
    
    // Service Details
    duration: initialData?.duration || '',
    
    // Location
    countryId: initialData?.countryId || '',
    cityId: initialData?.cityId || '',
    latitude: initialData?.latitude || '',
    longitude: initialData?.longitude || '',
    
    // Media
    image: initialData?.image || '',
    video: initialData?.video || '',
    
    // Contact
    phone: initialData?.phone || '',
    email: initialData?.email || '',
    whatsapp: initialData?.whatsapp || '',
    
    // SEO
    metaTitle: initialData?.metaTitle || '',
    metaDescription: initialData?.metaDescription || '',
    
    // Policies
    cancellationPolicy: initialData?.cancellationPolicy || '',
    refundPolicy: initialData?.refundPolicy || '',
    termsConditions: initialData?.termsConditions || '',
    
    // Status
    isActive: initialData?.isActive !== undefined ? initialData.isActive : true,
    isFeatured: initialData?.isFeatured || false,
    isVerified: initialData?.isVerified !== undefined ? initialData.isVerified : true,
    isAvailable: initialData?.isAvailable !== undefined ? initialData.isAvailable : true,
    
    // Availability
    advanceBooking: initialData?.advanceBooking || 1,
  });

  // Dynamic arrays
  const [includedServices, setIncludedServices] = useState<string[]>(
    initialData?.includedServices || ['General cleaning', 'Dusting', 'Vacuuming', 'Mopping']
  );
  const [excludedServices, setExcludedServices] = useState<string[]>(
    initialData?.excludedServices || ['Deep carpet cleaning', 'Window exterior cleaning']
  );
  const [equipment, setEquipment] = useState<string[]>(
    initialData?.equipment || ['Vacuum cleaner', 'Mop', 'Cleaning solutions']
  );
  const [products, setProducts] = useState<string[]>(
    initialData?.products || ['Eco-friendly detergents', 'Disinfectants']
  );
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [keywords, setKeywords] = useState<string[]>(initialData?.keywords || []);
  const [serviceAreas, setServiceAreas] = useState<string[]>(initialData?.serviceAreas || []);
  const [availableDays, setAvailableDays] = useState<string[]>(
    initialData?.availableDays || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  );
  const [availableHours, setAvailableHours] = useState<string[]>(
    initialData?.availableHours || ['08:00-12:00', '12:00-16:00', '16:00-20:00']
  );

  // Options & Add-ons
  const [options, setOptions] = useState<Array<{name: string; price: number; description: string; required: boolean}>>(
    initialData?.options || [
      { name: 'Window Cleaning (Interior)', price: 50, description: 'Clean all windows from inside', required: false },
      { name: 'Balcony Cleaning', price: 30, description: 'Clean balcony area', required: false },
    ]
  );

  const [addons, setAddons] = useState<Array<{name: string; price: number; description: string}>>(
    initialData?.addons || [
      { name: 'Oven Cleaning', price: 80, description: 'Deep clean oven interior' },
      { name: 'Fridge Cleaning', price: 60, description: 'Clean fridge interior and exterior' },
    ]
  );

  const [packages, setPackages] = useState<Array<{name: string; price: number; description: string; services: string[]; discount: number}>>(
    initialData?.packages || [
      { 
        name: 'Basic Package', 
        price: 200, 
        description: 'Essential cleaning services', 
        services: ['General cleaning', 'Dusting', 'Vacuuming'],
        discount: 0
      },
      { 
        name: 'Premium Package', 
        price: 350, 
        description: 'Complete cleaning solution', 
        services: ['All basic services', 'Window cleaning', 'Balcony cleaning', 'Kitchen deep clean'],
        discount: 15
      },
    ]
  );

  // Requirements & Restrictions
  const [requirements, setRequirements] = useState<string[]>(
    initialData?.requirements || ['Access to property', 'Water and electricity available']
  );
  const [restrictions, setRestrictions] = useState<string[]>(
    initialData?.restrictions || ['No pets during cleaning', 'Minimum 2 hours booking']
  );

  // Auto-generate slug
  const handleNameChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      name: value,
      slug: isEdit ? prev.slug : value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        basePrice: parseFloat(formData.basePrice as string),
        pricePerSqm: formData.pricePerSqm ? parseFloat(formData.pricePerSqm as string) : null,
        minimumCharge: formData.minimumCharge ? parseFloat(formData.minimumCharge as string) : null,
        latitude: formData.latitude ? parseFloat(formData.latitude as string) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude as string) : null,
        advanceBooking: parseInt(formData.advanceBooking as string),
        includedServices,
        excludedServices,
        equipment,
        products,
        tags,
        keywords,
        serviceAreas,
        availableDays,
        availableHours,
        options,
        addons,
        packages,
        requirements,
        restrictions,
      };

      const url = isEdit 
        ? `/api/home-cleaning/${initialData.id}`
        : '/api/home-cleaning';
      
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save service');
      }

      router.push(`/${locale}/admin/home-cleaning`);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: Home },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'details', label: 'Service Details', icon: FileText },
    { id: 'options', label: 'Options & Add-ons', icon: Plus },
    { id: 'packages', label: 'Packages', icon: Tag },
    { id: 'availability', label: 'Availability', icon: Calendar },
    { id: 'location', label: 'Location', icon: MapPin },
    { id: 'media', label: 'Media', icon: ImageIcon },
    { id: 'requirements', label: 'Requirements', icon: FileText },
    { id: 'policies', label: 'Policies', icon: FileText },
    { id: 'seo', label: 'SEO', icon: Tag },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'status', label: 'Status', icon: Settings },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200 overflow-x-auto">
          <nav className="flex space-x-1 p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Section 1: Basic Information */}
          {activeTab === 'basic' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Basic Home Cleaning"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="basic-home-cleaning"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="basic">Basic Cleaning</option>
                    <option value="deep">Deep Cleaning</option>
                    <option value="move">Move In/Out Cleaning</option>
                    <option value="post">Post Construction</option>
                    <option value="spring">Spring Cleaning</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sub-category
                  </label>
                  <input
                    type="text"
                    value={formData.subCategory}
                    onChange={(e) => setFormData({...formData, subCategory: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Residential"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Short Description (160 characters)
                </label>
                <input
                  type="text"
                  maxLength={160}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description for listings"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.shortDescription.length}/160 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Description *
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Detailed description of the service..."
                />
              </div>
            </div>
          )}

          {/* Section 2: Pricing */}
          {activeTab === 'pricing' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Base Price *
                  </label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    value={formData.basePrice}
                    onChange={(e) => setFormData({...formData, basePrice: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="200.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Currency
                  </label>
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData({...formData, currency: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="AED">AED</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price per SQM
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.pricePerSqm}
                    onChange={(e) => setFormData({...formData, pricePerSqm: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="5.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Charge
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.minimumCharge}
                    onChange={(e) => setFormData({...formData, minimumCharge: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="150.00"
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Pricing Calculator Preview</h4>
                <div className="space-y-2 text-sm text-blue-800">
                  <p>Base Price: {formData.basePrice} {formData.currency}</p>
                  {formData.pricePerSqm && (
                    <p>Per SQM: {formData.pricePerSqm} {formData.currency}/sqm</p>
                  )}
                  {formData.minimumCharge && (
                    <p>Minimum: {formData.minimumCharge} {formData.currency}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Continue with other sections... */}
          {/* Due to length, I'll create the remaining sections in the next part */}

        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          {loading ? 'Saving...' : isEdit ? 'Update Service' : 'Create Service'}
        </button>
      </div>
    </form>
  );
}
