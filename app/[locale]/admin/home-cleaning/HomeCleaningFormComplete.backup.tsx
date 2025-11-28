'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Save, X, Plus, Trash2, Home, DollarSign, Clock, MapPin, 
  Image as ImageIcon, Tag, FileText, Phone, Settings, Calendar,
  CheckCircle, XCircle
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

export default function HomeCleaningFormComplete({ 
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
    type: 'home',
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    shortDescription: initialData?.shortDescription || '',
    category: initialData?.category || 'basic',
    subCategory: initialData?.subCategory || '',
    basePrice: initialData?.basePrice || '',
    currency: initialData?.currency || 'AED',
    pricePerSqm: initialData?.pricePerSqm || '',
    minimumCharge: initialData?.minimumCharge || '',
    duration: initialData?.duration || '2-3 hours',
    countryId: initialData?.countryId || '',
    cityId: initialData?.cityId || '',
    latitude: initialData?.latitude || '',
    longitude: initialData?.longitude || '',
    image: initialData?.image || '',
    video: initialData?.video || '',
    phone: initialData?.phone || '',
    email: initialData?.email || '',
    whatsapp: initialData?.whatsapp || '',
    metaTitle: initialData?.metaTitle || '',
    metaDescription: initialData?.metaDescription || '',
    cancellationPolicy: initialData?.cancellationPolicy || 'Free cancellation up to 24 hours before service',
    refundPolicy: initialData?.refundPolicy || 'Full refund if cancelled 24 hours in advance',
    termsConditions: initialData?.termsConditions || '',
    isActive: initialData?.isActive !== undefined ? initialData.isActive : true,
    isFeatured: initialData?.isFeatured || false,
    isVerified: initialData?.isVerified !== undefined ? initialData.isVerified : true,
    isAvailable: initialData?.isAvailable !== undefined ? initialData.isAvailable : true,
    advanceBooking: initialData?.advanceBooking || 1,
  });

  // Dynamic arrays
  const [includedServices, setIncludedServices] = useState<string[]>(
    initialData?.includedServices || ['General cleaning', 'Dusting', 'Vacuuming', 'Mopping', 'Trash removal']
  );
  const [excludedServices, setExcludedServices] = useState<string[]>(
    initialData?.excludedServices || ['Deep carpet cleaning', 'Window exterior cleaning', 'Laundry']
  );
  const [equipment, setEquipment] = useState<string[]>(
    initialData?.equipment || ['Vacuum cleaner', 'Mop & bucket', 'Cleaning solutions', 'Microfiber cloths']
  );
  const [products, setProducts] = useState<string[]>(
    initialData?.products || ['Eco-friendly detergents', 'Disinfectants', 'Glass cleaner', 'Floor cleaner']
  );
  const [tags, setTags] = useState<string[]>(
    initialData?.tags || ['home-cleaning', 'professional', 'eco-friendly']
  );
  const [keywords, setKeywords] = useState<string[]>(
    initialData?.keywords || ['home cleaning dubai', 'house cleaning', 'maid service']
  );
  const [serviceAreas, setServiceAreas] = useState<string[]>(
    initialData?.serviceAreas || ['Dubai Marina', 'Downtown Dubai', 'JBR']
  );
  const [availableDays, setAvailableDays] = useState<string[]>(
    initialData?.availableDays || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  );
  const [availableHours, setAvailableHours] = useState<string[]>(
    initialData?.availableHours || ['08:00-12:00', '12:00-16:00', '16:00-20:00']
  );
  const [requirements, setRequirements] = useState<string[]>(
    initialData?.requirements || ['Access to property', 'Water and electricity available', 'Parking space']
  );
  const [restrictions, setRestrictions] = useState<string[]>(
    initialData?.restrictions || ['No pets during cleaning', 'Minimum 2 hours booking']
  );

  // Options & Add-ons
  const [options, setOptions] = useState<Array<{name: string; price: number; description: string; required: boolean}>>(
    initialData?.options || [
      { name: 'Window Cleaning (Interior)', price: 50, description: 'Clean all windows from inside', required: false },
      { name: 'Balcony Cleaning', price: 30, description: 'Clean balcony area', required: false },
      { name: 'Kitchen Deep Clean', price: 100, description: 'Deep clean kitchen including appliances', required: false },
    ]
  );

  const [addons, setAddons] = useState<Array<{name: string; price: number; description: string}>>(
    initialData?.addons || [
      { name: 'Oven Cleaning', price: 80, description: 'Deep clean oven interior' },
      { name: 'Fridge Cleaning', price: 60, description: 'Clean fridge interior and exterior' },
      { name: 'Carpet Steam Clean', price: 150, description: 'Steam clean all carpets' },
    ]
  );

  const [packages, setPackages] = useState<Array<{name: string; price: number; description: string; services: string[]; discount: number}>>(
    initialData?.packages || [
      { 
        name: 'Basic Package', 
        price: 200, 
        description: 'Essential cleaning services', 
        services: ['General cleaning', 'Dusting', 'Vacuuming', 'Mopping'],
        discount: 0
      },
      { 
        name: 'Premium Package', 
        price: 350, 
        description: 'Complete cleaning solution', 
        services: ['All basic services', 'Window cleaning', 'Balcony cleaning', 'Kitchen deep clean'],
        discount: 15
      },
      { 
        name: 'Deluxe Package', 
        price: 500, 
        description: 'Ultimate cleaning experience', 
        services: ['All premium services', 'Carpet cleaning', 'Oven cleaning', 'Fridge cleaning'],
        discount: 20
      },
    ]
  );

  const [images, setImages] = useState<string[]>(initialData?.images || []);

  // Helper functions for dynamic arrays
  const addItem = (setter: Function, array: any[], defaultValue: any) => {
    setter([...array, defaultValue]);
  };

  const removeItem = (setter: Function, array: any[], index: number) => {
    setter(array.filter((_, i) => i !== index));
  };

  const updateItem = (setter: Function, array: any[], index: number, value: any) => {
    const newArray = [...array];
    newArray[index] = value;
    setter(newArray);
  };

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
        images,
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
    { id: 'basic', label: 'Basic', icon: Home },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'details', label: 'Details', icon: FileText },
    { id: 'options', label: 'Options', icon: Plus },
    { id: 'packages', label: 'Packages', icon: Tag },
    { id: 'availability', label: 'Availability', icon: Calendar },
    { id: 'location', label: 'Location', icon: MapPin },
    { id: 'media', label: 'Media', icon: ImageIcon },
    { id: 'seo', label: 'SEO', icon: Tag },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'status', label: 'Status', icon: Settings },
  ];

  const filteredCities = formData.countryId 
    ? cities.filter(c => c.countryId === formData.countryId)
    : cities;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <XCircle className="w-5 h-5" />
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
                  <p>Base Price: {formData.basePrice || '0'} {formData.currency}</p>
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

          {/* Section 3: Service Details */}
          {activeTab === 'details' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Details</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 2-3 hours"
                />
              </div>

              {/* Included Services */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Included Services
                </label>
                {includedServices.map((service, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={service}
                      onChange={(e) => updateItem(setIncludedServices, includedServices, index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Service name"
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(setIncludedServices, includedServices, index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addItem(setIncludedServices, includedServices, '')}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Service
                </button>
              </div>

              {/* Excluded Services */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Excluded Services
                </label>
                {excludedServices.map((service, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={service}
                      onChange={(e) => updateItem(setExcludedServices, excludedServices, index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Service name"
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(setExcludedServices, excludedServices, index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addItem(setExcludedServices, excludedServices, '')}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Service
                </button>
              </div>

              {/* Equipment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Equipment Used
                </label>
                {equipment.map((item, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updateItem(setEquipment, equipment, index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Equipment name"
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(setEquipment, equipment, index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addItem(setEquipment, equipment, '')}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Equipment
                </button>
              </div>

              {/* Products */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cleaning Products
                </label>
                {products.map((product, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={product}
                      onChange={(e) => updateItem(setProducts, products, index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Product name"
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(setProducts, products, index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addItem(setProducts, products, '')}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Product
                </button>
              </div>

              {/* Requirements & Restrictions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Requirements
                  </label>
                  {requirements.map((req, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={req}
                        onChange={(e) => updateItem(setRequirements, requirements, index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Requirement"
                      />
                      <button
                        type="button"
                        onClick={() => removeItem(setRequirements, requirements, index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addItem(setRequirements, requirements, '')}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Add Requirement
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Restrictions
                  </label>
                  {restrictions.map((rest, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={rest}
                        onChange={(e) => updateItem(setRestrictions, restrictions, index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Restriction"
                      />
                      <button
                        type="button"
                        onClick={() => removeItem(setRestrictions, restrictions, index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addItem(setRestrictions, restrictions, '')}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Add Restriction
                  </button>
                </div>
              </div>

              {/* Policies */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cancellation Policy
                  </label>
                  <textarea
                    rows={3}
                    value={formData.cancellationPolicy}
                    onChange={(e) => setFormData({...formData, cancellationPolicy: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Cancellation policy details..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Refund Policy
                  </label>
                  <textarea
                    rows={3}
                    value={formData.refundPolicy}
                    onChange={(e) => setFormData({...formData, refundPolicy: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Refund policy details..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Terms & Conditions
                  </label>
                  <textarea
                    rows={4}
                    value={formData.termsConditions}
                    onChange={(e) => setFormData({...formData, termsConditions: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Terms and conditions..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Continue with remaining sections in next message due to length... */}
          {/* Options, Packages, Availability, Location, Media, SEO, Contact, Status */}

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
