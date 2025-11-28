'use client';

// Property Edit Client Component
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { useAdminTranslation } from '@/hooks/useAdminTranslation';
import { useAdminCommon } from '@/hooks/useAdminCommon';
import ImageUpload from './ImageUpload';
import VideoInput from './VideoInput';

interface City {
  id: string;
  name: string;
}

interface Country {
  id: string;
  name: string;
}

interface Property {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  type: string;
  status: string;
  listingType: string;
  category?: string | null;
  salePrice: number | null;
  rentPrice: number | null;
  secondPrice: number | null;
  pricePrefix?: string | null;
  pricePostfix?: string | null;
  currency: string;
  bedrooms: number | null;
  bathrooms: number | null;
  rooms: number | null;
  garages: number | null;
  garageSize?: number | null;
  area: number | null;
  areaPostfix: string;
  landArea: number | null;
  landAreaPostfix?: string | null;
  floor: number | null;
  furnished: boolean;
  yearBuilt: number | null;
  propertyId: string | null;
  cityId: string;
  countryId: string;
  stateId?: string | null;
  neighborhoodId?: string | null;
  address: string | null;
  streetAddress: string | null;
  zipCode: string | null;
  latitude: number | null;
  longitude: number | null;
  images: any;
  video: string | null;
  virtualTour: string | null;
  floorPlans: any;
  documents: any;
  features: any;
  amenities: any;
  labels?: any;
  foreignQuota?: number | null;
  thaiQuota?: number | null;
  thaiCompany?: boolean;
  isFeatured: boolean;
  isActive: boolean;
  isAvailable: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  views?: number;
  bookings?: number;
  rating?: number | null;
  createdAt?: string;
  updatedAt?: string;
  modifiedDate?: string | null;
  City?: { id: string; name: string };
  Country?: { id: string; name: string };
}

interface PropertyEditClientProps {
  property: Property;
  cities: City[];
  countries: Country[];
  locale: string;
}

export default function PropertyEditClient({ property, cities, countries, locale }: PropertyEditClientProps) {
  const router = useRouter();
  const t = useAdminTranslation('properties');
  const tc = useAdminCommon();
  
  const [formData, setFormData] = useState(property);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: value ? value : null }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch(`/api/admin/properties/${property.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push(`/${locale}/admin/properties`);
          router.refresh();
        }, 1500);
      } else {
        setError(data.error || 'Failed to update property');
      }
    } catch (err) {
      setError('An error occurred while updating the property');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link
          href={`/${locale}/admin/properties`}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          {tc('back')}
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          {tc('edit')} {t('title')}
        </h1>
        <p className="text-gray-600 mt-1">
          {property.name}
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-medium">✓ Property updated successfully! Redirecting...</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex flex-wrap -mb-px">
            {[
              { id: 'basic', label: 'Basic Info', icon: '📝' },
              { id: 'details', label: 'Details', icon: '🏠' },
              { id: 'location', label: 'Location', icon: '📍' },
              { id: 'pricing', label: 'Pricing', icon: '💰' },
              { id: 'media', label: 'Media', icon: '📸' },
              { id: 'features', label: 'Features', icon: '⭐' },
              { id: 'thailand', label: 'Thailand', icon: '🇹🇭' },
              { id: 'seo', label: 'SEO', icon: '🔍' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors
                  ${activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <span className="text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        {/* Tab Content: Basic Information */}
        {activeTab === 'basic' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('form.name')} *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('form.slug')}
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property ID
              </label>
              <input
                type="text"
                name="propertyId"
                value={formData.propertyId || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('form.description')}
              </label>
              <textarea
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
        )}

        {/* Tab Content: Details */}
        {activeTab === 'details' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Type & Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('form.type')} *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="townhouse">Townhouse</option>
                <option value="penthouse">Penthouse</option>
                <option value="studio">Studio</option>
                <option value="duplex">Duplex</option>
                <option value="land">Land</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('form.status')}
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="sold">Sold</option>
                <option value="rented">Rented</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Listing Type
              </label>
              <select
                name="listingType"
                value={formData.listingType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>
          </div>
        </div>
        )}

        {/* Tab Content: Pricing */}
        {activeTab === 'pricing' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sale Price
              </label>
              <input
                type="number"
                name="salePrice"
                value={formData.salePrice || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rent Price (per month)
              </label>
              <input
                type="number"
                name="rentPrice"
                value={formData.rentPrice || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Second Price
              </label>
              <input
                type="number"
                name="secondPrice"
                value={formData.secondPrice || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Currency
              </label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="AED">AED</option>
                <option value="THB">THB</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Property Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bedrooms
              </label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bathrooms
              </label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Rooms
              </label>
              <input
                type="number"
                name="rooms"
                value={formData.rooms || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Area (m²)
              </label>
              <input
                type="number"
                name="area"
                value={formData.area || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Land Area (m²)
              </label>
              <input
                type="number"
                name="landArea"
                value={formData.landArea || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Floor
              </label>
              <input
                type="number"
                name="floor"
                value={formData.floor || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Garages
              </label>
              <input
                type="number"
                name="garages"
                value={formData.garages || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year Built
              </label>
              <input
                type="number"
                name="yearBuilt"
                value={formData.yearBuilt || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
        )}

        {/* Tab Content: Location */}
        {activeTab === 'location' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country *
              </label>
              <select
                name="countryId"
                value={formData.countryId}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {countries.map(country => (
                  <option key={country.id} value={country.id}>{country.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City *
              </label>
              <select
                name="cityId"
                value={formData.cityId}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {cities.map(city => (
                  <option key={city.id} value={city.id}>{city.name}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address
              </label>
              <input
                type="text"
                name="streetAddress"
                value={formData.streetAddress || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Zip Code
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Latitude
              </label>
              <input
                type="number"
                step="any"
                name="latitude"
                value={formData.latitude || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Longitude
              </label>
              <input
                type="number"
                step="any"
                name="longitude"
                value={formData.longitude || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* SEO */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">SEO</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Title
              </label>
              <input
                type="text"
                name="metaTitle"
                value={formData.metaTitle || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Description
              </label>
              <textarea
                name="metaDescription"
                value={formData.metaDescription || ''}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
        )}

        {/* Tab Content: Media */}
        {activeTab === 'media' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Media</h2>
          <div className="space-y-6">
            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Property Images
              </label>
              <ImageUpload
                images={Array.isArray(formData.images) ? formData.images : 
                  (typeof formData.images === 'string' ? JSON.parse(formData.images || '[]') : [])}
                onChange={(images) => setFormData(prev => ({ ...prev, images }))}
              />
            </div>

            {/* Video */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Property Video
              </label>
              <VideoInput
                video={formData.video}
                onChange={(video) => setFormData(prev => ({ ...prev, video }))}
              />
            </div>

            {/* Virtual Tour */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Virtual Tour URL (360°)
              </label>
              <input
                type="url"
                name="virtualTour"
                value={formData.virtualTour || ''}
                onChange={handleChange}
                placeholder="https://my.matterport.com/show/?m=..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Matterport, Kuula, or other 360° virtual tour link
              </p>
            </div>

            {/* Floor Plans */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Floor Plans (JSON)
              </label>
              <textarea
                name="floorPlans"
                value={typeof formData.floorPlans === 'string' ? formData.floorPlans : JSON.stringify(formData.floorPlans || [], null, 2)}
                onChange={handleChange}
                rows={3}
                placeholder='["https://example.com/floorplan1.pdf"]'
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              />
            </div>

            {/* Documents */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Documents (JSON)
              </label>
              <textarea
                name="documents"
                value={typeof formData.documents === 'string' ? formData.documents : JSON.stringify(formData.documents || [], null, 2)}
                onChange={handleChange}
                rows={3}
                placeholder='["https://example.com/document1.pdf"]'
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              />
            </div>
          </div>
        </div>
        )}

        {/* Tab Content: Features */}
        {activeTab === 'features' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Features & Amenities</h2>
          
          {/* Features */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Property Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                'Balcony', 'Garden', 'Swimming Pool', 'Terrace', 'Rooftop',
                'Private Pool', 'Jacuzzi', 'Sauna', 'Steam Room', 'Wine Cellar',
                'Home Theater', 'Study Room', 'Maid Room', 'Storage Room', 'Laundry Room',
                'Walk-in Closet', 'Built-in Wardrobes', 'Central AC', 'Floor Heating', 'Smart Home',
                'Solar Panels', 'Water Tank', 'Generator', 'CCTV'
              ].map((feature) => {
                const currentFeatures = Array.isArray(formData.features) ? formData.features : 
                  (typeof formData.features === 'string' ? JSON.parse(formData.features || '[]') : []);
                const isChecked = currentFeatures.includes(feature);
                
                return (
                  <label key={feature} className="flex items-center gap-2 p-2 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => {
                        const features = Array.isArray(formData.features) ? [...formData.features] : 
                          (typeof formData.features === 'string' ? JSON.parse(formData.features || '[]') : []);
                        if (e.target.checked) {
                          features.push(feature);
                        } else {
                          const index = features.indexOf(feature);
                          if (index > -1) features.splice(index, 1);
                        }
                        setFormData(prev => ({ ...prev, features }));
                      }}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Building Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                'Gym', 'Fitness Center', 'Yoga Room', 'Spa', 'Massage Room',
                '24/7 Security', 'Security Guard', 'Key Card Access', 'Concierge', 'Reception',
                'Elevator', 'Parking', 'Covered Parking', 'Visitor Parking', 'EV Charging',
                'Swimming Pool', 'Kids Pool', 'Playground', 'Kids Club', 'Game Room',
                'BBQ Area', 'Garden', 'Jogging Track', 'Tennis Court', 'Basketball Court',
                'Co-working Space', 'Meeting Room', 'Library', 'Cinema Room', 'Lounge',
                'Restaurant', 'Cafe', 'Mini Mart', 'Laundry Service', 'Shuttle Service'
              ].map((amenity) => {
                const currentAmenities = Array.isArray(formData.amenities) ? formData.amenities : 
                  (typeof formData.amenities === 'string' ? JSON.parse(formData.amenities || '[]') : []);
                const isChecked = currentAmenities.includes(amenity);
                
                return (
                  <label key={amenity} className="flex items-center gap-2 p-2 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => {
                        const amenities = Array.isArray(formData.amenities) ? [...formData.amenities] : 
                          (typeof formData.amenities === 'string' ? JSON.parse(formData.amenities || '[]') : []);
                        if (e.target.checked) {
                          amenities.push(amenity);
                        } else {
                          const index = amenities.indexOf(amenity);
                          if (index > -1) amenities.splice(index, 1);
                        }
                        setFormData(prev => ({ ...prev, amenities }));
                      }}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
        )}

        {/* Tab Content: Thailand */}
        {activeTab === 'thailand' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">🇹🇭 Thailand Ownership Information</h2>
          <p className="text-sm text-gray-600 mb-4">
            For properties in Thailand, specify foreign and Thai ownership quotas
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Foreign Quota (%)
              </label>
              <input
                type="number"
                name="foreignQuota"
                value={formData.foreignQuota || ''}
                onChange={handleChange}
                min="0"
                max="100"
                step="0.01"
                placeholder="49"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Percentage available for foreign buyers</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Thai Quota (%)
              </label>
              <input
                type="number"
                name="thaiQuota"
                value={formData.thaiQuota || ''}
                onChange={handleChange}
                min="0"
                max="100"
                step="0.01"
                placeholder="51"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Percentage reserved for Thai nationals</p>
            </div>

            <div>
              <label className="flex items-center gap-2 pt-7">
                <input
                  type="checkbox"
                  name="thaiCompany"
                  checked={formData.thaiCompany}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Thai Company Purchase</span>
              </label>
              <p className="text-xs text-gray-500 mt-1 ml-6">Can be purchased through Thai company structure</p>
            </div>
          </div>
        </div>

        {/* Additional Fields */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Prefix
              </label>
              <input
                type="text"
                name="pricePrefix"
                value={formData.pricePrefix || ''}
                onChange={handleChange}
                placeholder="From"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Postfix
              </label>
              <input
                type="text"
                name="pricePostfix"
                value={formData.pricePostfix || ''}
                onChange={handleChange}
                placeholder="/month"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Area Postfix
              </label>
              <input
                type="text"
                name="areaPostfix"
                value={formData.areaPostfix || ''}
                onChange={handleChange}
                placeholder="m²"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Land Area Postfix
              </label>
              <input
                type="text"
                name="landAreaPostfix"
                value={formData.landAreaPostfix || ''}
                onChange={handleChange}
                placeholder="m²"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Garage Size (m²)
              </label>
              <input
                type="number"
                name="garageSize"
                value={formData.garageSize || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
        )}

        {/* Tab Content: SEO */}
        {activeTab === 'seo' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">SEO & Options</h2>
          
          {/* SEO Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Title
              </label>
              <input
                type="text"
                name="metaTitle"
                value={formData.metaTitle || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Description
              </label>
              <textarea
                name="metaDescription"
                value={formData.metaDescription || ''}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Options */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Property Options</h3>
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="furnished"
                checked={formData.furnished}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Furnished</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Featured</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Active</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isAvailable"
                checked={formData.isAvailable}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Available</span>
            </label>
          </div>
          </div>
        </div>
        )}

        {/* Actions - Always visible */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t mt-6">
          <Link
            href={`/${locale}/admin/properties`}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
          >
            {tc('cancel')}
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {tc('save')}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
