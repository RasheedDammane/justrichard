'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X } from 'lucide-react';
import BrandModelSelector from '@/components/admin/BrandModelSelector';
import ColorSelector from '@/components/admin/ColorSelector';
import TagsSelector from '@/components/admin/TagsSelector';
import LocationSelector from '@/components/admin/LocationSelector';
import { CAR_BRANDS, CAR_COLORS, CAR_TAGS } from '@/lib/car-data';

interface RentalCarFormProps {
  locale: string;
  rentalCar?: any;
}

export default function RentalCarForm({ locale, rentalCar }: RentalCarFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>(
    Array.isArray(rentalCar?.features) ? rentalCar.features : []
  );
  
  const [formData, setFormData] = useState({
    name: rentalCar?.name || '',
    slug: rentalCar?.slug || '',
    brand: rentalCar?.brand || '',
    model: rentalCar?.model || '',
    year: rentalCar?.year || new Date().getFullYear(),
    category: rentalCar?.category || 'SEDAN',
    description: rentalCar?.description || '',
    shortDescription: rentalCar?.shortDescription || '',
    color: rentalCar?.color || '',
    doors: rentalCar?.doors || 4,
    seats: rentalCar?.seats || 5,
    fuelType: rentalCar?.fuelType || 'PETROL',
    transmission: rentalCar?.transmission || 'AUTOMATIC',
    pricePerDay: rentalCar?.pricePerDay || '',
    pricePerWeek: rentalCar?.pricePerWeek || '',
    pricePerMonth: rentalCar?.pricePerMonth || '',
    currency: rentalCar?.currency || 'AED',
    deposit: rentalCar?.deposit || 0,
    mileagePerDay: rentalCar?.mileagePerDay || 250,
    countryId: rentalCar?.countryId || '',
    cityId: rentalCar?.cityId || '',
    isActive: rentalCar?.isActive ?? true,
    isFeatured: rentalCar?.isFeatured ?? false,
    isAvailable: rentalCar?.isAvailable ?? true,
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = rentalCar ? `/api/admin/rental-cars/${rentalCar.id}` : '/api/admin/rental-cars';
      const response = await fetch(url, {
        method: rentalCar ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          features: tags,
        }),
      });

      if (response.ok) {
        router.push(`/${locale}/admin/rental-cars`);
        router.refresh();
      } else {
        alert('Erreur lors de la sauvegarde');
      }
    } catch (error) {
      alert('Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (name === 'name' && !rentalCar) {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, name: value, slug }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Name *</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required
            className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Slug *</label>
          <input type="text" name="slug" value={formData.slug} onChange={handleChange} required
            className="w-full px-4 py-2 border rounded-lg bg-gray-50" />
        </div>
      </div>

      {/* Brand & Model Selector */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <BrandModelSelector
          brands={CAR_BRANDS}
          selectedBrand={formData.brand}
          selectedModel={formData.model}
          onBrandChange={(brand) => setFormData(prev => ({ ...prev, brand, model: '' }))}
          onModelChange={(model) => setFormData(prev => ({ ...prev, model }))}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Year *</label>
          <input type="number" name="year" value={formData.year} onChange={handleChange} required
            className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Category *</label>
          <select name="category" value={formData.category} onChange={handleChange} required
            className="w-full px-4 py-2 border rounded-lg">
            <option value="ECONOMY">Economy</option>
            <option value="COMPACT">Compact</option>
            <option value="SEDAN">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="LUXURY">Luxury</option>
            <option value="SPORTS">Sports</option>
            <option value="VAN">Van</option>
          </select>
        </div>
      </div>

      {/* Color Selector */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <ColorSelector
          colors={CAR_COLORS}
          selectedColor={formData.color}
          onColorChange={(color) => setFormData(prev => ({ ...prev, color }))}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Doors</label>
          <input type="number" name="doors" value={formData.doors} onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Seats</label>
          <input type="number" name="seats" value={formData.seats} onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Fuel Type *</label>
          <select name="fuelType" value={formData.fuelType} onChange={handleChange} required
            className="w-full px-4 py-2 border rounded-lg">
            <option value="PETROL">Petrol</option>
            <option value="DIESEL">Diesel</option>
            <option value="ELECTRIC">Electric</option>
            <option value="HYBRID">Hybrid</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Transmission *</label>
          <select name="transmission" value={formData.transmission} onChange={handleChange} required
            className="w-full px-4 py-2 border rounded-lg">
            <option value="AUTOMATIC">Automatic</option>
            <option value="MANUAL">Manual</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Price/day *</label>
          <input type="number" name="pricePerDay" value={formData.pricePerDay} onChange={handleChange} required
            className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Price/week</label>
          <input type="number" name="pricePerWeek" value={formData.pricePerWeek} onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Price/month</label>
          <input type="number" name="pricePerMonth" value={formData.pricePerMonth} onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg" />
        </div>
      </div>

      {/* Location Selector */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <LocationSelector
          selectedCountryId={formData.countryId}
          selectedCityId={formData.cityId}
          onCountryChange={(countryId) => setFormData(prev => ({ ...prev, countryId, cityId: '' }))}
          onCityChange={(cityId) => setFormData(prev => ({ ...prev, cityId }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Short Description</label>
        <textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange} rows={2}
          className="w-full px-4 py-2 border rounded-lg"></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description *</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required rows={4}
          className="w-full px-4 py-2 border rounded-lg"></textarea>
      </div>

      {/* Tags Selector */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <TagsSelector
          availableTags={CAR_TAGS}
          selectedTags={tags}
          onTagsChange={setTags}
          label="Features & Tags"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center">
          <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange}
            className="w-4 h-4 text-blue-600 rounded" />
          <span className="ml-2 text-sm">Active</span>
        </label>
        <label className="flex items-center">
          <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange}
            className="w-4 h-4 text-blue-600 rounded" />
          <span className="ml-2 text-sm">Featured</span>
        </label>
        <label className="flex items-center">
          <input type="checkbox" name="isAvailable" checked={formData.isAvailable} onChange={handleChange}
            className="w-4 h-4 text-blue-600 rounded" />
          <span className="ml-2 text-sm">Available</span>
        </label>
      </div>

      <div className="flex gap-4 pt-6 border-t">
        <button type="submit" disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
          <Save className="w-5 h-5" />
          {loading ? 'Saving...' : 'Save'}
        </button>
        <button type="button" onClick={() => router.back()}
          className="flex items-center gap-2 px-6 py-3 border rounded-lg hover:bg-gray-50">
          <X className="w-5 h-5" />
          Cancel
        </button>
      </div>
    </form>
  );
}
