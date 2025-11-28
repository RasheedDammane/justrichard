'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X } from 'lucide-react';

interface ProviderFormProps {
  locale: string;
  provider?: any;
  type?: string;
}

export default function ProviderForm({ locale, provider, type = 'doctor' }: ProviderFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    name: provider?.name || '',
    slug: provider?.slug || '',
    email: provider?.email || '',
    phone: provider?.phone || '',
    description: provider?.description || '',
    website: provider?.website || '',
    countryId: provider?.countryId || '',
    cityId: provider?.cityId || '',
    isActive: provider?.isActive ?? true,
    isVerified: provider?.isVerified ?? false,
    isFeatured: provider?.isFeatured ?? false,
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
      const url = provider 
        ? `/api/admin/providers/${provider.id}`
        : '/api/admin/providers';
      
      const method = provider ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push(`/${locale}/admin/${type}s`);
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
    
    // Generate slug from name
    if (name === 'name' && !provider) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({
        ...prev,
        name: value,
        slug,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nom *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Ex: Dr. John Smith"
        />
      </div>

      {/* Slug */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Slug (URL) *
        </label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="dr-john-smith"
        />
        <p className="text-xs text-gray-500 mt-1">Généré automatiquement depuis le nom</p>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="contact@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Téléphone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+971 50 123 4567"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Description du prestataire..."
        />
      </div>

      {/* Website */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Site Web
        </label>
        <input
          type="url"
          name="website"
          value={formData.website}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://example.com"
        />
      </div>

      {/* Country & City */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pays *
          </label>
          <select
            name="countryId"
            value={formData.countryId}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Sélectionner un pays</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ville
          </label>
          <select
            name="cityId"
            value={formData.cityId}
            onChange={handleChange}
            disabled={!formData.countryId}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          >
            <option value="">Sélectionner une ville</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Status Checkboxes */}
      <div className="space-y-3">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="ml-2 text-sm font-medium text-gray-700">
            Actif
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="isVerified"
            checked={formData.isVerified}
            onChange={handleChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="ml-2 text-sm font-medium text-gray-700">
            Vérifié
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="ml-2 text-sm font-medium text-gray-700">
            Mis en avant
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-6 border-t">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          <Save className="w-5 h-5" />
          {loading ? 'Enregistrement...' : 'Enregistrer'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
        >
          <X className="w-5 h-5" />
          Annuler
        </button>
      </div>
    </form>
  );
}
