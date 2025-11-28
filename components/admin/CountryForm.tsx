'use client';

import { useState, useEffect } from 'react';

interface CountryFormProps {
  country?: any;
  onSave: () => void;
  onCancel: () => void;
}

export default function CountryForm({ country, onSave, onCancel }: CountryFormProps) {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    nameAr: '',
    nameFr: '',
    nameTh: '',
    nameRu: '',
    nameKo: '',
    nameEs: '',
    nameVi: '',
    nameTl: '',
    nameIt: '',
    nameNo: '',
    nameTr: '',
    namePt: '',
    nameAf: '',
    nameJa: '',
    nameDe: '',
    flag: '',
    dialCode: '',
    currencyId: '',
    slug: '',
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

  const [loading, setLoading] = useState(false);
  const [currencies, setCurrencies] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'basic' | 'translations' | 'seo' | 'geo' | 'media'>('basic');

  useEffect(() => {
    loadCurrencies();
    if (country) {
      setFormData({
        code: country.code || '',
        name: country.name || '',
        nameAr: country.nameAr || '',
        nameFr: country.nameFr || '',
        nameTh: country.nameTh || '',
        nameRu: country.nameRu || '',
        nameKo: country.nameKo || '',
        nameEs: country.nameEs || '',
        nameVi: country.nameVi || '',
        nameTl: country.nameTl || '',
        nameIt: country.nameIt || '',
        nameNo: country.nameNo || '',
        nameTr: country.nameTr || '',
        namePt: country.namePt || '',
        nameAf: country.nameAf || '',
        nameJa: country.nameJa || '',
        nameDe: country.nameDe || '',
        flag: country.flag || '',
        dialCode: country.dialCode || '',
        currencyId: country.currencyId || '',
        slug: country.slug || '',
        description: country.description || '',
        icon: country.icon || '',
        thumbnail: country.thumbnail || '',
        images: country.images?.join(', ') || '',
        latitude: country.latitude?.toString() || '',
        longitude: country.longitude?.toString() || '',
        metaTitle: country.metaTitle || '',
        metaDescription: country.metaDescription || '',
        keywords: country.keywords?.join(', ') || '',
        isActive: country.isActive ?? true,
      });
    }
  }, [country]);

  const loadCurrencies = async () => {
    try {
      const response = await fetch('/api/admin/currencies');
      const result = await response.json();
      setCurrencies(result.data || []);
    } catch (error) {
      console.error('Error loading currencies:', error);
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

      const url = country
        ? `/api/admin/countries/${country.id}`
        : '/api/admin/countries';
      
      const method = country ? 'PUT' : 'POST';

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
      console.error('Error saving country:', error);
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
            { id: 'geo', label: '📍 Géolocalisation' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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
              Code * <span className="text-gray-400">(ex: TH, FR)</span>
            </label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
              maxLength={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="TH"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" title="Champ obligatoire">
              Nom (EN) *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Thailand"
              title="Nom du pays en anglais (obligatoire)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Drapeau <span className="text-xs text-gray-500">(optionnel)</span>
            </label>
            <input
              type="text"
              name="flag"
              value={formData.flag}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="🇹🇭"
              title="Emoji du drapeau (optionnel)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Code téléphonique <span className="text-xs text-gray-500">(optionnel)</span>
            </label>
            <input
              type="text"
              name="dialCode"
              value={formData.dialCode}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="+66"
              title="Code téléphonique international (optionnel)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Devise <span className="text-xs text-gray-500">(optionnel)</span>
            </label>
            <select
              name="currencyId"
              value={formData.currencyId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              title="Devise officielle du pays (optionnel)"
            >
              <option value="">Sélectionner une devise</option>
              {currencies.map((curr) => (
                <option key={curr.id} value={curr.id}>
                  {curr.code} - {curr.name} ({curr.symbol})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug <span className="text-xs text-gray-500">(optionnel)</span>
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="thailand"
              title="URL-friendly identifier (optionnel, généré automatiquement si vide)"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-xs text-gray-500">(optionnel)</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Description du pays..."
              title="Description complète du pays (optionnel)"
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
            { name: 'nameAr', label: 'Arabe (AR)', placeholder: 'تايلاند' },
            { name: 'nameFr', label: 'Français (FR)', placeholder: 'Thaïlande' },
            { name: 'nameTh', label: 'Thaï (TH)', placeholder: 'ประเทศไทย' },
            { name: 'nameRu', label: 'Russe (RU)', placeholder: 'Таиланд' },
            { name: 'nameKo', label: 'Coréen (KO)', placeholder: '태국' },
            { name: 'nameEs', label: 'Espagnol (ES)', placeholder: 'Tailandia' },
            { name: 'nameVi', label: 'Vietnamien (VI)', placeholder: 'Thái Lan' },
            { name: 'nameTl', label: 'Tagalog (TL)', placeholder: 'Thailand' },
            { name: 'nameIt', label: 'Italien (IT)', placeholder: 'Thailandia' },
            { name: 'nameNo', label: 'Norvégien (NO)', placeholder: 'Thailand' },
            { name: 'nameTr', label: 'Turc (TR)', placeholder: 'Tayland' },
            { name: 'namePt', label: 'Portugais (PT)', placeholder: 'Tailândia' },
            { name: 'nameAf', label: 'Afrikaans (AF)', placeholder: 'Thailand' },
            { name: 'nameJa', label: 'Japonais (JA)', placeholder: 'タイ' },
            { name: 'nameDe', label: 'Allemand (DE)', placeholder: 'Thailand' },
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
              placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg, https://example.com/image3.jpg"
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
            <label className="block text-sm font-medium text-gray-700 mb-1" title="Champ obligatoire">
              Meta Title
            </label>
            <input
              type="text"
              name="metaTitle"
              value={formData.metaTitle}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Thailand - Travel Guide"
              title="Titre de la page pour les moteurs de recherche (obligatoire)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" title="Champ optionnel">
              Meta Description
            </label>
            <textarea
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Discover Thailand, the land of smiles..."
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
              placeholder="thailand, travel, bangkok, phuket"
            />
          </div>
        </div>
      )}

      {/* Geo Tab */}
      {activeTab === 'geo' && (
        <div className="grid grid-cols-2 gap-4">
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
          {loading ? 'Enregistrement...' : country ? 'Modifier' : 'Créer'}
        </button>
      </div>
    </form>
  );
}
