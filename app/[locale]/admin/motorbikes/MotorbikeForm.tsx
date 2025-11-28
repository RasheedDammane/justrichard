'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X } from 'lucide-react';
import BrandModelSelector from '@/components/admin/BrandModelSelector';
import ColorSelector from '@/components/admin/ColorSelector';
import TagsSelector from '@/components/admin/TagsSelector';
import { MOTORBIKE_BRANDS, MOTORBIKE_COLORS, MOTORBIKE_TAGS } from '@/lib/car-data';

interface MotorbikeFormProps {
  locale: string;
  motorbike?: any;
}

export default function MotorbikeForm({ locale, motorbike }: MotorbikeFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [tags, setTags] = useState<string[]>(
    Array.isArray(motorbike?.features) ? motorbike.features : []
  );
  const [color, setColor] = useState<string>(motorbike?.color || '');
  
  const [formData, setFormData] = useState({
    brand: motorbike?.brand || '',
    model: motorbike?.model || '',
    slug: motorbike?.slug || '',
    year: motorbike?.year || new Date().getFullYear(),
    category: motorbike?.category || '',
    description: motorbike?.description || '',
    seats: motorbike?.seats || 2,
    transmission: motorbike?.transmission || 'Automatic',
    fuelType: motorbike?.fuelType || 'Petrol',
    engineSize: motorbike?.engineSize || '',
    pricePerDay: motorbike?.pricePerDay || '',
    pricePerWeek: motorbike?.pricePerWeek || '',
    pricePerMonth: motorbike?.pricePerMonth || '',
    currency: motorbike?.currency || 'THB',
    countryId: motorbike?.countryId || '',
    cityId: motorbike?.cityId || '',
    available: motorbike?.available ?? true,
  });

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (formData.countryId) {
      fetchCities(formData.countryId);
    }
  }, [formData.countryId]);

  const fetchCountries = async () => {
    try {
      const response = await fetch('/api/countries');
      if (response.ok) {
        const data = await response.json();
        setCountries(Array.isArray(data) ? data : []);
      } else {
        setCountries([]);
      }
    } catch (error) {
      console.error('Error fetching countries:', error);
      setCountries([]);
    }
  };

  const fetchCities = async (countryId: string) => {
    try {
      const response = await fetch(`/api/cities?countryId=${countryId}`);
      if (response.ok) {
        const data = await response.json();
        setCities(Array.isArray(data) ? data : []);
      } else {
        setCities([]);
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
      setCities([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = motorbike ? `/api/admin/motorbikes/${motorbike.id}` : '/api/admin/motorbikes';
      const method = motorbike ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push(`/${locale}/admin/motorbikes`);
        router.refresh();
      } else {
        const error = await response.json();
        alert(`Erreur: ${error.message || 'Erreur lors de la sauvegarde'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (name === 'brand' && !motorbike) {
      const slug = `${value}-${formData.model}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, brand: value, slug }));
    } else if (name === 'model' && !motorbike) {
      const slug = `${formData.brand}-${value}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, model: value, slug }));
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Brand *</label>
          <input type="text" name="brand" value={formData.brand} onChange={handleChange} required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Model *</label>
          <input type="text" name="model" value={formData.model} onChange={handleChange} required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
          <input type="text" name="slug" value={formData.slug} onChange={handleChange} required
            className="w-full px-4 py-2 border rounded-lg bg-gray-50" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Year *</label>
          <input type="number" name="year" value={formData.year} onChange={handleChange} required
            className="w-full px-4 py-2 border rounded-lg" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} required
            placeholder="Sport, Cruiser, Touring..."
            className="w-full px-4 py-2 border rounded-lg" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Engine Size (cc) *</label>
          <input type="number" name="engineSize" value={formData.engineSize} onChange={handleChange} required
            className="w-full px-4 py-2 border rounded-lg" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Seats</label>
          <input type="number" name="seats" value={formData.seats} onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
          <select name="transmission" value={formData.transmission} onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg">
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
          <select name="fuelType" value={formData.fuelType} onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg">
            <option value="Petrol">Petrol</option>
            <option value="Electric">Electric</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price/day *</label>
          <input type="number" name="pricePerDay" value={formData.pricePerDay} onChange={handleChange} required
            className="w-full px-4 py-2 border rounded-lg" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price/week</label>
          <input type="number" name="pricePerWeek" value={formData.pricePerWeek} onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price/month</label>
          <input type="number" name="pricePerMonth" value={formData.pricePerMonth} onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
          <select name="currency" value={formData.currency} onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg">
            <option value="THB">THB</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="AED">AED</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
          <select name="countryId" value={formData.countryId} onChange={handleChange} required
            className="w-full px-4 py-2 border rounded-lg">
            <option value="">Select</option>
            {countries.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
          <select name="cityId" value={formData.cityId} onChange={handleChange}
            disabled={!formData.countryId} className="w-full px-4 py-2 border rounded-lg">
            <option value="">Select</option>
            {cities.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required rows={4}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
      </div>

      <div>
        <label className="flex items-center">
          <input type="checkbox" name="available" checked={formData.available} onChange={handleChange}
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
