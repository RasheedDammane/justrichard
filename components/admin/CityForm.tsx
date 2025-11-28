'use client';

import { useState, useEffect } from 'react';

interface CityFormProps {
  city?: any;
  onSave: () => void;
  onCancel: () => void;
}

export default function CityForm({ city, onSave, onCancel }: CityFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    countryId: '',
    nameAr: '',
    nameFr: '',
    nameTh: '',
    nameRu: '',
    nameKo: '',
    nameEs: '',
    nameVi: '',
    description: '',
    icon: '',
    thumbnail: '',
    images: '',
    latitude: '',
    longitude: '',
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    isActive: true,
  });

  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'translations' | 'media' | 'seo'>('basic');

  useEffect(() => {
    loadCountries();
    if (city) {
      setFormData({
        name: city.name || '',
        slug: city.slug || '',
        countryId: city.countryId || '',
        nameAr: city.nameAr || '',
        nameFr: city.nameFr || '',
        nameTh: city.nameTh || '',
        nameRu: city.nameRu || '',
        nameKo: city.nameKo || '',
        nameEs: city.nameEs || '',
        nameVi: city.nameVi || '',
        description: city.description || '',
        icon: city.icon || '',
        thumbnail: city.thumbnail || '',
        images: city.images?.join(', ') || '',
        latitude: city.latitude?.toString() || '',
        longitude: city.longitude?.toString() || '',
        metaTitle: city.metaTitle || '',
        metaDescription: city.metaDescription || '',
        keywords: city.keywords?.join(', ') || '',
        isActive: city.isActive ?? true,
      });
    }
  }, [city]);

  const loadCountries = async () => {
    try {
      const response = await fetch('/api/admin/countries');
      const result = await response.json();
      setCountries(result.data || []);
    } catch (error) {
      console.error('Error loading countries:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
        keywords: formData.keywords ? formData.keywords.split(',').map(k => k.trim()) : [],
        images: formData.images ? formData.images.split(',').map(img => img.trim()) : [],
      };

      const url = city ? `/api/admin/cities/${city.id}` : '/api/admin/cities';
      const method = city ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        onSave();
      } else {
        const error = await response.json();
        alert(`Erreur: ${error.error}`);
      }
    } catch (error) {
      console.error('Error saving city:', error);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px space-x-8">
          {[
            { id: 'basic', label: '📋 Basique' },
            { id: 'translations', label: '🌐 Traductions' },
            { id: 'media', label: '🖼️ Médias' },
            { id: 'seo', label: '🔍 SEO' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Basic Tab */}
      {activeTab === 'basic' && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Bangkok"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug *
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="bangkok"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pays *
            </label>
            <select
              name="countryId"
              value={formData.countryId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sélectionner un pays</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.flag} {country.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Latitude
            </label>
            <input
              type="number"
              step="any"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="13.7563"
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
              value={formData.longitude}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="100.5018"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Description de la ville..."
            />
          </div>

          <div className="col-span-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Actif</span>
            </label>
          </div>
        </div>
      )}

      {/* Translations Tab */}
      {activeTab === 'translations' && (
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: 'nameAr', label: 'Arabe (AR)', placeholder: 'بانكوك' },
            { name: 'nameFr', label: 'Français (FR)', placeholder: 'Bangkok' },
            { name: 'nameTh', label: 'Thaï (TH)', placeholder: 'กรุงเทพมหานคร' },
            { name: 'nameRu', label: 'Russe (RU)', placeholder: 'Бангкок' },
            { name: 'nameKo', label: 'Coréen (KO)', placeholder: '방콕' },
            { name: 'nameEs', label: 'Espagnol (ES)', placeholder: 'Bangkok' },
            { name: 'nameVi', label: 'Vietnamien (VI)', placeholder: 'Bangkok' },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type="text"
                name={field.name}
                value={(formData as any)[field.name]}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder={field.placeholder}
              />
            </div>
          ))}
        </div>
      )}

      {/* Media Tab */}
      {activeTab === 'media' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Icône <span className="text-gray-400">(URL)</span>
            </label>
            <input
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/icon.png"
            />
            {formData.icon && (
              <div className="mt-2">
                <img src={formData.icon} alt="Icon preview" className="h-16 w-16 object-cover rounded" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image par défaut / Thumbnail <span className="text-gray-400">(URL)</span>
            </label>
            <input
              type="text"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/thumbnail.jpg"
            />
            {formData.thumbnail && (
              <div className="mt-2">
                <img src={formData.thumbnail} alt="Thumbnail preview" className="h-32 w-48 object-cover rounded" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Galerie d'images <span className="text-gray-400">(URLs séparées par des virgules)</span>
            </label>
            <textarea
              name="images"
              value={formData.images}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
            />
            <p className="mt-1 text-xs text-gray-500">
              💡 Entrez plusieurs URLs séparées par des virgules pour créer une galerie
            </p>
            {formData.images && (
              <div className="mt-3 grid grid-cols-4 gap-2">
                {formData.images.split(',').map((img, idx) => {
                  const trimmedImg = img.trim();
                  return trimmedImg ? (
                    <img
                      key={idx}
                      src={trimmedImg}
                      alt={`Gallery ${idx + 1}`}
                      className="h-24 w-full object-cover rounded"
                    />
                  ) : null;
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SEO Tab */}
      {activeTab === 'seo' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meta Title
            </label>
            <input
              type="text"
              name="metaTitle"
              value={formData.metaTitle}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Bangkok - Capital of Thailand"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meta Description
            </label>
            <textarea
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Discover Bangkok, the vibrant capital..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Keywords <span className="text-gray-400">(séparés par des virgules)</span>
            </label>
            <input
              type="text"
              name="keywords"
              value={formData.keywords}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="bangkok, thailand, travel, temples"
            />
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Enregistrement...' : city ? 'Modifier' : 'Créer'}
        </button>
      </div>
    </form>
  );
}
