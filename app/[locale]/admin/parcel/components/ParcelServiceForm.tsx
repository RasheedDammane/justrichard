'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Package, Save, X, Plus, Trash2 } from 'lucide-react';

interface ParcelServiceFormProps {
  locale: string;
  initialData?: any;
  isEdit?: boolean;
}

export default function ParcelServiceForm({ locale, initialData, isEdit = false }: ParcelServiceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    shortDescription: initialData?.shortDescription || '',
    partnerName: initialData?.partnerName || '',
    basePrice: initialData?.basePrice || '',
    pricePerKg: initialData?.pricePerKg || '',
    pricePerKm: initialData?.pricePerKm || '',
    currency: initialData?.currency || 'AED',
    maxWeight: initialData?.maxWeight || '',
    maxLength: initialData?.maxLength || '',
    maxWidth: initialData?.maxWidth || '',
    maxHeight: initialData?.maxHeight || '',
    expressAvailable: initialData?.expressAvailable || false,
    sameDay: initialData?.sameDay || false,
    nextDay: initialData?.nextDay || false,
    international: initialData?.international || false,
    trackingAvailable: initialData?.trackingAvailable !== undefined ? initialData.trackingAvailable : true,
    insuranceAvailable: initialData?.insuranceAvailable !== undefined ? initialData.insuranceAvailable : true,
    coverageAreas: initialData?.coverageAreas || [],
    logo: initialData?.logo || '',
    metaTitle: initialData?.metaTitle || '',
    metaDescription: initialData?.metaDescription || '',
    isActive: initialData?.isActive !== undefined ? initialData.isActive : true,
    isFeatured: initialData?.isFeatured || false,
  });

  const [newArea, setNewArea] = useState('');

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addArea = () => {
    if (newArea.trim()) {
      setFormData(prev => ({
        ...prev,
        coverageAreas: [...prev.coverageAreas, newArea.trim()]
      }));
      setNewArea('');
    }
  };

  const removeArea = (index: number) => {
    setFormData(prev => ({
      ...prev,
      coverageAreas: prev.coverageAreas.filter((_: any, i: number) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = isEdit 
        ? `/api/parcel/${initialData.id}`
        : '/api/parcel';
      
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save service');
      }

      router.push(`/${locale}/admin/parcel`);
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Package className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold">
            {isEdit ? 'Edit Parcel Service' : 'New Parcel Service'}
          </h1>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Basic Information */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Service Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Express Parcel Delivery"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Slug *</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., express-parcel-delivery"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Short Description</label>
          <input
            type="text"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Brief description (max 160 characters)"
            maxLength={160}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Detailed description of the service..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Partner Name</label>
          <input
            type="text"
            name="partnerName"
            value={formData.partnerName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., DHL, FedEx, Aramex"
          />
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold mb-4">Pricing</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Base Price *</label>
            <div className="flex gap-2">
              <input
                type="number"
                name="basePrice"
                value={formData.basePrice}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="AED">AED</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price per Kg *</label>
            <input
              type="number"
              name="pricePerKg"
              value={formData.pricePerKg}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price per Km (Optional)</label>
            <input
              type="number"
              name="pricePerKm"
              value={formData.pricePerKm}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Package Limits */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold mb-4">Package Limits</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Max Weight (kg) *</label>
            <input
              type="number"
              name="maxWeight"
              value={formData.maxWeight}
              onChange={handleChange}
              required
              min="0"
              step="0.1"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Max Length (cm) *</label>
            <input
              type="number"
              name="maxLength"
              value={formData.maxLength}
              onChange={handleChange}
              required
              min="0"
              step="0.1"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 120"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Max Width (cm) *</label>
            <input
              type="number"
              name="maxWidth"
              value={formData.maxWidth}
              onChange={handleChange}
              required
              min="0"
              step="0.1"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 80"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Max Height (cm) *</label>
            <input
              type="number"
              name="maxHeight"
              value={formData.maxHeight}
              onChange={handleChange}
              required
              min="0"
              step="0.1"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 80"
            />
          </div>
        </div>
      </div>

      {/* Service Features */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold mb-4">Service Features</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="expressAvailable"
              checked={formData.expressAvailable}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm">Express Delivery</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="sameDay"
              checked={formData.sameDay}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm">Same Day</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="nextDay"
              checked={formData.nextDay}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm">Next Day</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="international"
              checked={formData.international}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm">International</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="trackingAvailable"
              checked={formData.trackingAvailable}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm">Tracking</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="insuranceAvailable"
              checked={formData.insuranceAvailable}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm">Insurance</span>
          </label>
        </div>
      </div>

      {/* Coverage Areas */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold mb-4">Coverage Areas</h2>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={newArea}
            onChange={(e) => setNewArea(e.target.value)}
            placeholder="e.g., Dubai, Abu Dhabi, International"
            className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addArea())}
          />
          <button
            type="button"
            onClick={addArea}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {formData.coverageAreas.map((area: string, index: number) => (
            <span
              key={index}
              className="px-3 py-1 bg-green-100 text-green-800 rounded-full flex items-center gap-2"
            >
              {area}
              <button
                type="button"
                onClick={() => removeArea(index)}
                className="text-green-600 hover:text-green-800"
              >
                <X className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Branding */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold mb-4">Branding</h2>
        
        <div>
          <label className="block text-sm font-medium mb-1">Logo URL</label>
          <input
            type="url"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/logo.png"
          />
          {formData.logo && (
            <div className="mt-2">
              <img src={formData.logo} alt="Logo preview" className="h-16 object-contain" />
            </div>
          )}
        </div>
      </div>

      {/* SEO */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold mb-4">SEO</h2>
        
        <div>
          <label className="block text-sm font-medium mb-1">Meta Title</label>
          <input
            type="text"
            name="metaTitle"
            value={formData.metaTitle}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="SEO title (max 60 characters)"
            maxLength={60}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Meta Description</label>
          <textarea
            name="metaDescription"
            value={formData.metaDescription}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="SEO description (max 160 characters)"
            maxLength={160}
          />
        </div>
      </div>

      {/* Status */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold mb-4">Status</h2>
        
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm font-medium">Active</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm font-medium">Featured</span>
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 justify-end">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
        >
          <X className="w-5 h-5" />
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
        >
          <Save className="w-5 h-5" />
          {loading ? 'Saving...' : isEdit ? 'Update Service' : 'Create Service'}
        </button>
      </div>
    </form>
  );
}
