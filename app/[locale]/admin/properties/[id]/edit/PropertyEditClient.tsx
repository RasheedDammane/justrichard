'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

interface PropertyEditClientProps {
  property: any;
  cities: any[];
  countries: any[];
  locale: string;
}

export default function PropertyEditClient({ property, cities, countries, locale }: PropertyEditClientProps) {
  const router = useRouter();
  const [formData, setFormData] = useState(property);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev: any) => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData((prev: any) => ({ ...prev, [name]: value ? parseFloat(value) : null }));
    } else {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch(`/api/admin/properties/${property.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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
      setError('An error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-6">
        <Link href={`/${locale}/admin/properties`} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Edit Property</h1>
        <p className="text-gray-600 mt-1">{property.name}</p>
      </div>

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-medium">✓ Property updated successfully!</p>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-8">
        
        {/* Basic Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property ID</label>
              <input type="text" name="propertyId" value={formData.propertyId || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea name="description" value={formData.description || ''} onChange={handleChange} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Type & Status */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Type & Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
              <select name="type" value={formData.type} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="condo">Condo</option>
                <option value="house">House</option>
                <option value="land">Land</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
              <select name="status" value={formData.status} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option value="draft">Draft</option>
                <option value="available">Available</option>
                <option value="sold">Sold</option>
                <option value="rented">Rented</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Listing Type</label>
              <select name="listingType" value={formData.listingType} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option value="sale">Sale</option>
                <option value="rent">Rent</option>
                <option value="both">Both</option>
              </select>
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Property Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
              <input type="number" name="bedrooms" value={formData.bedrooms || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
              <input type="number" name="bathrooms" value={formData.bathrooms || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rooms</label>
              <input type="number" name="rooms" value={formData.rooms || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Garages</label>
              <input type="number" name="garages" value={formData.garages || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Area (m²)</label>
              <input type="number" name="area" value={formData.area || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Land Area (m²)</label>
              <input type="number" name="landArea" value={formData.landArea || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Floor</label>
              <input type="number" name="floor" value={formData.floor || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year Built</label>
              <input type="number" name="yearBuilt" value={formData.yearBuilt || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="furnished" checked={formData.furnished || false} onChange={handleChange} className="w-4 h-4 text-blue-600" />
              <label className="ml-2 text-sm font-medium text-gray-700">Furnished</label>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
              <select name="countryId" value={formData.countryId} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                {countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
              <select name="cityId" value={formData.cityId} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input type="text" name="address" value={formData.address || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
              <input type="text" name="streetAddress" value={formData.streetAddress || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
              <input type="text" name="zipCode" value={formData.zipCode || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
              <input type="number" step="any" name="latitude" value={formData.latitude || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
              <input type="number" step="any" name="longitude" value={formData.longitude || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price</label>
              <input type="number" name="salePrice" value={formData.salePrice || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rent Price</label>
              <input type="number" name="rentPrice" value={formData.rentPrice || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
              <select name="currency" value={formData.currency} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option value="AED">AED</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="THB">THB</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Second Price</label>
              <input type="number" name="secondPrice" value={formData.secondPrice || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Prefix</label>
              <input type="text" name="pricePrefix" value={formData.pricePrefix || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Postfix</label>
              <input type="text" name="pricePostfix" value={formData.pricePostfix || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Media</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
              <input type="text" name="video" value={formData.video || ''} onChange={handleChange} placeholder="YouTube, Vimeo, Dailymotion URL" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Virtual Tour URL</label>
              <input type="text" name="virtualTour" value={formData.virtualTour || ''} onChange={handleChange} placeholder="360° tour URL" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Thailand Ownership */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">🇹🇭 Thailand Ownership</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Foreign Quota (%)</label>
              <input type="number" step="0.01" name="foreignQuota" value={formData.foreignQuota || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Thai Quota (%)</label>
              <input type="number" step="0.01" name="thaiQuota" value={formData.thaiQuota || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="thaiCompany" checked={formData.thaiCompany || false} onChange={handleChange} className="w-4 h-4 text-blue-600" />
              <label className="ml-2 text-sm font-medium text-gray-700">Thai Company</label>
            </div>
          </div>
        </div>

        {/* SEO & Options */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">SEO & Options</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
              <input type="text" name="metaTitle" value={formData.metaTitle || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
              <textarea name="metaDescription" value={formData.metaDescription || ''} onChange={handleChange} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <input type="checkbox" name="isFeatured" checked={formData.isFeatured || false} onChange={handleChange} className="w-4 h-4 text-blue-600" />
                <label className="ml-2 text-sm font-medium text-gray-700">Featured</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" name="isActive" checked={formData.isActive || false} onChange={handleChange} className="w-4 h-4 text-blue-600" />
                <label className="ml-2 text-sm font-medium text-gray-700">Active</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" name="isAvailable" checked={formData.isAvailable || false} onChange={handleChange} className="w-4 h-4 text-blue-600" />
                <label className="ml-2 text-sm font-medium text-gray-700">Available</label>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t">
          <Link href={`/${locale}/admin/properties`} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Cancel
          </Link>
          <button type="submit" disabled={loading} className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
            <Save className="w-4 h-4" />
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}
