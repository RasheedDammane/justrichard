#!/bin/bash

# Créer le formulaire complet pour les yachts
cat > app/\[locale\]/admin/yachts/YachtForm.tsx << 'EOFFORM'
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Ship, DollarSign, Image, FileText, Settings, Tag } from 'lucide-react';

interface YachtFormProps {
  locale: string;
  yacht?: any;
}

export default function YachtForm({ locale, yacht }: YachtFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [countries, setCountries] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    name: yacht?.name || '',
    slug: yacht?.slug || '',
    brand: yacht?.brand || '',
    model: yacht?.model || '',
    year: yacht?.year || new Date().getFullYear(),
    length: yacht?.length || '',
    lengthUnit: yacht?.lengthUnit || 'ft',
    capacity: yacht?.capacity || '',
    cabins: yacht?.cabins || '',
    bathrooms: yacht?.bathrooms || '',
    crew: yacht?.crew || '',
    speed: yacht?.speed || '',
    fuelType: yacht?.fuelType || '',
    engineType: yacht?.engineType || '',
    manufacturer: yacht?.manufacturer || '',
    pricePerHour: yacht?.pricePerHour || '',
    priceFor2Hours: yacht?.priceFor2Hours || '',
    priceFor3Hours: yacht?.priceFor3Hours || '',
    priceFor4Hours: yacht?.priceFor4Hours || '',
    priceFor6Hours: yacht?.priceFor6Hours || '',
    priceFor8Hours: yacht?.priceFor8Hours || '',
    pricePerDay: yacht?.pricePerDay || '',
    currency: yacht?.currency || 'AED',
    minBookingHours: yacht?.minBookingHours || 2,
    location: yacht?.location || '',
    cityId: yacht?.cityId || '',
    countryId: yacht?.countryId || '',
    shortDescription: yacht?.shortDescription || '',
    description: yacht?.description || '',
    mainImage: yacht?.mainImage || '',
    cancellationPolicy: yacht?.cancellationPolicy || '',
    metaTitle: yacht?.metaTitle || '',
    metaDescription: yacht?.metaDescription || '',
    isActive: yacht?.isActive ?? true,
    isFeatured: yacht?.isFeatured ?? false,
    isAvailable: yacht?.isAvailable ?? true,
  });

  const [featuresText, setFeaturesText] = useState(yacht?.features?.join('\n') || '');
  const [amenitiesText, setAmenitiesText] = useState(yacht?.amenities?.join('\n') || '');
  const [includedText, setIncludedText] = useState(yacht?.included?.join('\n') || '');
  const [notIncludedText, setNotIncludedText] = useState(yacht?.notIncluded?.join('\n') || '');
  const [imagesText, setImagesText] = useState(yacht?.images?.join('\n') || '');

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
        setCountries(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchCities = async (countryId: string) => {
    try {
      const response = await fetch(\`/api/cities?countryId=\${countryId}\`);
      if (response.ok) {
        const data = await response.json();
        setCities(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSend = {
        ...formData,
        features: featuresText.split('\n').filter(f => f.trim()),
        amenities: amenitiesText.split('\n').filter(a => a.trim()),
        included: includedText.split('\n').filter(i => i.trim()),
        notIncluded: notIncludedText.split('\n').filter(n => n.trim()),
        images: imagesText.split('\n').filter(img => img.trim()),
      };

      const url = yacht ? \`/api/admin/yachts/\${yacht.id}\` : '/api/admin/yachts';
      const method = yacht ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        router.push(\`/\${locale}/admin/yachts\`);
        router.refresh();
      } else {
        const error = await response.json();
        alert(\`Erreur: \${error.message || 'Erreur lors de la sauvegarde'}\`);
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
    
    if (name === 'name' && !yacht) {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, name: value, slug }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      }));
    }
  };

  const tabs = [
    { id: 'basic', label: 'Informations', icon: Ship },
    { id: 'specs', label: 'Spécifications', icon: Settings },
    { id: 'pricing', label: 'Tarification', icon: DollarSign },
    { id: 'description', label: 'Description', icon: FileText },
    { id: 'features', label: 'Équipements', icon: Tag },
    { id: 'images', label: 'Images & SEO', icon: Image },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={\`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap \${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }\`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="space-y-6">
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Informations de base</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom du yacht *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Ferretti 550 Flybridge" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Slug (URL) *</label>
              <input type="text" name="slug" value={formData.slug} onChange={handleChange} required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="ferretti-550-flybridge" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Marque</label>
                <input type="text" name="brand" value={formData.brand} onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg" placeholder="Ferretti" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Modèle</label>
                <input type="text" name="model" value={formData.model} onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg" placeholder="550 Flybridge" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Année</label>
                <input type="number" name="year" value={formData.year} onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fabricant</label>
                <input type="text" name="manufacturer" value={formData.manufacturer} onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pays *</label>
                <select name="countryId" value={formData.countryId} onChange={handleChange} required
                  className="w-full px-4 py-2 border rounded-lg">
                  <option value="">Sélectionner</option>
                  {countries.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ville *</label>
                <select name="cityId" value={formData.cityId} onChange={handleChange} required
                  disabled={!formData.countryId} className="w-full px-4 py-2 border rounded-lg">
                  <option value="">Sélectionner</option>
                  {cities.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lieu</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg" placeholder="Dubai Marina" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange}
                  className="w-4 h-4 text-blue-600 rounded" />
                <span className="ml-2 text-sm">Actif</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange}
                  className="w-4 h-4 text-blue-600 rounded" />
                <span className="ml-2 text-sm">Mis en avant</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" name="isAvailable" checked={formData.isAvailable} onChange={handleChange}
                  className="w-4 h-4 text-blue-600 rounded" />
                <span className="ml-2 text-sm">Disponible</span>
              </label>
            </div>
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Spécifications</h3>
            
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Longueur</label>
                <input type="number" step="0.1" name="length" value={formData.length} onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unité</label>
                <select name="lengthUnit" value={formData.lengthUnit} onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg">
                  <option value="ft">Pieds (ft)</option>
                  <option value="m">Mètres (m)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Capacité</label>
                <input type="number" name="capacity" value={formData.capacity} onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cabines</label>
                <input type="number" name="cabins" value={formData.cabins} onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Salles de bain</label>
                <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Équipage</label>
                <input type="number" name="crew" value={formData.crew} onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vitesse (nœuds)</label>
                <input type="number" step="0.1" name="speed" value={formData.speed} onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Carburant</label>
                <input type="text" name="fuelType" value={formData.fuelType} onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Moteur</label>
                <input type="text" name="engineType" value={formData.engineType} onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Tarification</h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Devise</label>
                <select name="currency" value={formData.currency} onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg">
                  <option value="AED">AED</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Réservation min (h)</label>
                <input type="number" name="minBookingHours" value={formData.minBookingHours} onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prix/heure</label>
                <input type="number" step="0.01" name="pricePerHour" value={formData.pricePerHour} onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prix 2h</label>
                <input type="number" step="0.01" name="priceFor2Hours" value={formData.priceFor2Hours} onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prix 3h</label>
                <input type="number" step="0.01" name="priceFor3Hours" value={formData.priceFor3Hours} onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prix 4h</label>
                <input type="number" step="0.01" name="priceFor4Hours" value={formData.priceFor4Hours} onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prix 6h</label>
                <input type="number" step="0.01" name="priceFor6Hours" value={formData.priceFor6Hours} onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prix 8h</label>
                <input type="number" step="0.01" name="priceFor8Hours" value={formData.priceFor8Hours} onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Prix/jour</label>
              <input type="number" step="0.01" name="pricePerDay" value={formData.pricePerDay} onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg" />
            </div>
          </div>
        )}

        {activeTab === 'description' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Description</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description courte</label>
              <textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange} rows={2}
                className="w-full px-4 py-2 border rounded-lg" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description complète</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={8}
                className="w-full px-4 py-2 border rounded-lg" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Politique d'annulation</label>
              <textarea name="cancellationPolicy" value={formData.cancellationPolicy} onChange={handleChange} rows={4}
                className="w-full px-4 py-2 border rounded-lg" />
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Équipements</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Caractéristiques</label>
              <textarea value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} rows={6}
                className="w-full px-4 py-2 border rounded-lg font-mono text-sm"
                placeholder="Une par ligne" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Équipements</label>
              <textarea value={amenitiesText} onChange={(e) => setAmenitiesText(e.target.value)} rows={6}
                className="w-full px-4 py-2 border rounded-lg font-mono text-sm"
                placeholder="Un par ligne" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Inclus</label>
              <textarea value={includedText} onChange={(e) => setIncludedText(e.target.value)} rows={6}
                className="w-full px-4 py-2 border rounded-lg font-mono text-sm"
                placeholder="Un par ligne" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Non inclus</label>
              <textarea value={notIncludedText} onChange={(e) => setNotIncludedText(e.target.value)} rows={6}
                className="w-full px-4 py-2 border rounded-lg font-mono text-sm"
                placeholder="Un par ligne" />
            </div>
          </div>
        )}

        {activeTab === 'images' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Images & SEO</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image principale (URL)</label>
              <input type="url" name="mainImage" value={formData.mainImage} onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Galerie d'images (URLs)</label>
              <textarea value={imagesText} onChange={(e) => setImagesText(e.target.value)} rows={6}
                className="w-full px-4 py-2 border rounded-lg font-mono text-sm"
                placeholder="Une URL par ligne" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
              <input type="text" name="metaTitle" value={formData.metaTitle} onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
              <textarea name="metaDescription" value={formData.metaDescription} onChange={handleChange} rows={3}
                className="w-full px-4 py-2 border rounded-lg" />
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-4 pt-6 border-t">
        <button type="submit" disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
          <Save className="w-5 h-5" />
          {loading ? 'Enregistrement...' : 'Enregistrer'}
        </button>
        <button type="button" onClick={() => router.back()}
          className="flex items-center gap-2 px-6 py-3 border rounded-lg hover:bg-gray-50">
          <X className="w-5 h-5" />
          Annuler
        </button>
      </div>
    </form>
  );
}
EOFFORM

echo "✅ YachtForm.tsx créé avec succès!"
