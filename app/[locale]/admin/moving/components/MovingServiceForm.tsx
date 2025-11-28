'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Truck, Save, X, Plus, Trash2 } from 'lucide-react';

interface MovingServiceFormProps {
  locale: string;
  initialData?: any;
  isEdit?: boolean;
}

export default function MovingServiceForm({ locale, initialData, isEdit = false }: MovingServiceFormProps) {
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
    pricePerKm: initialData?.pricePerKm || '',
    pricePerCubicM: initialData?.pricePerCubicM || '',
    pricePerHour: initialData?.pricePerHour || '',
    currency: initialData?.currency || 'AED',
    packingIncluded: initialData?.packingIncluded || false,
    unpackingIncluded: initialData?.unpackingIncluded || false,
    assemblyIncluded: initialData?.assemblyIncluded || false,
    storageAvailable: initialData?.storageAvailable || false,
    vehicleTypes: initialData?.vehicleTypes || [],
    coverageAreas: initialData?.coverageAreas || [],
    availableDays: initialData?.availableDays || [1, 2, 3, 4, 5, 6, 0],
    workingHours: initialData?.workingHours || { start: '08:00', end: '20:00' },
    images: initialData?.images || [],
    logo: initialData?.logo || '',
    metaTitle: initialData?.metaTitle || '',
    metaDescription: initialData?.metaDescription || '',
    isActive: initialData?.isActive !== undefined ? initialData.isActive : true,
    isFeatured: initialData?.isFeatured || false,
  });

  const [newVehicle, setNewVehicle] = useState('');
  const [newArea, setNewArea] = useState('');
  const [newImage, setNewImage] = useState('');

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleWorkingHoursChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      workingHours: { ...prev.workingHours, [field]: value }
    }));
  };

  const addVehicle = () => {
    if (newVehicle.trim()) {
      setFormData(prev => ({
        ...prev,
        vehicleTypes: [...prev.vehicleTypes, newVehicle.trim()]
      }));
      setNewVehicle('');
    }
  };

  const removeVehicle = (index: number) => {
    setFormData(prev => ({
      ...prev,
      vehicleTypes: prev.vehicleTypes.filter((_: any, i: number) => i !== index)
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

  const addImage = () => {
    if (newImage.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImage.trim()]
      }));
      setNewImage('');
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_: any, i: number) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = isEdit 
        ? `/api/moving/${initialData.id}`
        : '/api/moving';
      
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save service');
      }

      router.push(`/${locale}/admin/moving`);
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
          <Truck className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold">
            {isEdit ? 'Edit Moving Service' : 'New Moving Service'}
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
              placeholder="e.g., Premium Moving Service"
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
              placeholder="e.g., premium-moving-service"
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
            placeholder="e.g., ABC Moving Company"
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
            <label className="block text-sm font-medium mb-1">Price per Km *</label>
            <input
              type="number"
              name="pricePerKm"
              value={formData.pricePerKm}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price per Cubic Meter *</label>
            <input
              type="number"
              name="pricePerCubicM"
              value={formData.pricePerCubicM}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price per Hour (Optional)</label>
            <input
              type="number"
              name="pricePerHour"
              value={formData.pricePerHour}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Services Included */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold mb-4">Services Included</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="packingIncluded"
              checked={formData.packingIncluded}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm">Packing</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="unpackingIncluded"
              checked={formData.unpackingIncluded}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm">Unpacking</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="assemblyIncluded"
              checked={formData.assemblyIncluded}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm">Assembly</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="storageAvailable"
              checked={formData.storageAvailable}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm">Storage</span>
          </label>
        </div>
      </div>

      {/* Vehicle Types */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold mb-4">Vehicle Types</h2>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={newVehicle}
            onChange={(e) => setNewVehicle(e.target.value)}
            placeholder="e.g., Small Van, Large Truck"
            className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addVehicle())}
          />
          <button
            type="button"
            onClick={addVehicle}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {formData.vehicleTypes.map((vehicle: string, index: number) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center gap-2"
            >
              {vehicle}
              <button
                type="button"
                onClick={() => removeVehicle(index)}
                className="text-blue-600 hover:text-blue-800"
              >
                <X className="w-4 h-4" />
              </button>
            </span>
          ))}
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
            placeholder="e.g., Dubai, Abu Dhabi"
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

      {/* Working Hours */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold mb-4">Working Hours</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Start Time</label>
            <input
              type="time"
              value={formData.workingHours.start}
              onChange={(e) => handleWorkingHoursChange('start', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Time</label>
            <input
              type="time"
              value={formData.workingHours.end}
              onChange={(e) => handleWorkingHoursChange('end', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold mb-4">Images</h2>
        
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
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Gallery Images</label>
          <div className="flex gap-2">
            <input
              type="url"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
            />
            <button
              type="button"
              onClick={addImage}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {formData.images.map((image: string, index: number) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
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
