'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save } from 'lucide-react';

const PRACTICE_AREAS = [
  { value: 'CORPORATE_LAW', label: 'Droit des affaires' },
  { value: 'LABOR_LAW', label: 'Droit du travail' },
  { value: 'IMMIGRATION', label: 'Immigration' },
  { value: 'FAMILY_LAW', label: 'Droit de la famille' },
  { value: 'CRIMINAL', label: 'Droit pénal' },
  { value: 'REAL_ESTATE', label: 'Droit immobilier' },
  { value: 'TAX', label: 'Droit fiscal' },
  { value: 'IP', label: 'Propriété intellectuelle' },
  { value: 'LITIGATION', label: 'Contentieux' },
  { value: 'ARBITRATION', label: 'Arbitrage' },
];

const LANGUAGES = [
  { value: 'fr', label: 'Français' },
  { value: 'en', label: 'English' },
  { value: 'ar', label: 'العربية' },
];

interface LegalProfessionalFormProps {
  locale: string;
  legalProfessional?: any;
}

export default function LegalProfessionalForm({ locale, legalProfessional }: LegalProfessionalFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  const [formData, setFormData] = useState({
    type: legalProfessional?.type || 'LAWYER',
    status: legalProfessional?.status || 'DRAFT',
    name: legalProfessional?.name || '',
    slug: legalProfessional?.slug || '',
    shortTitle: legalProfessional?.shortTitle || '',
    headline: legalProfessional?.headline || '',
    email: legalProfessional?.email || '',
    phone: legalProfessional?.phone || '',
    city: legalProfessional?.city || '',
    country: legalProfessional?.country || '',
    bio: legalProfessional?.bio || '',
    languages: legalProfessional?.languages || ['fr'],
    practiceAreas: legalProfessional?.practiceAreas || [],
    yearsOfExperience: legalProfessional?.yearsOfExperience || null,
    hourlyRateFrom: legalProfessional?.hourlyRateFrom || null,
    currency: legalProfessional?.currency || 'EUR',
    featured: legalProfessional?.featured || false,
    isActive: legalProfessional?.isActive ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = legalProfessional
        ? `/api/admin/legal/${legalProfessional.id}`
        : '/api/admin/legal';
      const method = legalProfessional ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push(`/${locale}/admin/legal`);
        router.refresh();
      } else {
        const error = await response.json();
        alert(`Erreur: ${error.error}`);
      }
    } catch (error) {
      alert('Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: any) => {
    const { name, value, type } = e.target;
    if (name === 'name' && !legalProfessional) {
      const slug = value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, name: value, slug }));
    } else {
      setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? e.target.checked : value }));
    }
  };

  const handleMultiSelect = (name: string, value: string) => {
    setFormData(prev => {
      const current = (prev as any)[name] || [];
      const updated = current.includes(value) ? current.filter((v: string) => v !== value) : [...current, value];
      return { ...prev, [name]: updated };
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['basic', 'profile', 'expertise'].map(tab => (
            <button key={tab} type="button" onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500'}`}>
              {tab === 'basic' ? 'Base' : tab === 'profile' ? 'Profil' : 'Expertise'}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'basic' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
              <select name="type" value={formData.type} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg">
                <option value="LAWYER">Avocat</option>
                <option value="LAW_FIRM">Cabinet</option>
                <option value="LEGAL_ADVISOR">Conseiller</option>
                <option value="NOTARY">Notaire</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Statut *</label>
              <select name="status" value={formData.status} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg">
                <option value="DRAFT">Brouillon</option>
                <option value="PUBLISHED">Publié</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
            <input type="text" name="slug" value={formData.slug} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ville *</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pays *</label>
              <input type="text" name="country" value={formData.country} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea name="bio" value={formData.bio} onChange={handleChange} rows={6} className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Langues *</label>
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map(lang => (
                <button key={lang.value} type="button" onClick={() => handleMultiSelect('languages', lang.value)}
                  className={`px-4 py-2 rounded-lg border ${formData.languages.includes(lang.value) ? 'bg-primary-600 text-white' : 'bg-white text-gray-700'}`}>
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Années d'expérience</label>
              <input type="number" name="yearsOfExperience" value={formData.yearsOfExperience || ''} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tarif horaire (€)</label>
              <input type="number" name="hourlyRateFrom" value={formData.hourlyRateFrom || ''} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Devise</label>
              <select name="currency" value={formData.currency} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg">
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="AED">AED</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'expertise' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Domaines de pratique *</label>
            <div className="flex flex-wrap gap-2">
              {PRACTICE_AREAS.map(area => (
                <button key={area.value} type="button" onClick={() => handleMultiSelect('practiceAreas', area.value)}
                  className={`px-4 py-2 rounded-lg border ${formData.practiceAreas.includes(area.value) ? 'bg-primary-600 text-white' : 'bg-white text-gray-700'}`}>
                  {area.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center">
              <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="w-4 h-4 text-primary-600 rounded" />
              <span className="ml-2 text-sm">Mis en avant</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} className="w-4 h-4 text-primary-600 rounded" />
              <span className="ml-2 text-sm">Actif</span>
            </label>
          </div>
        </div>
      )}

      <div className="flex justify-end gap-4 pt-6 border-t">
        <button type="button" onClick={() => router.back()} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          Annuler
        </button>
        <button type="submit" disabled={loading} className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2">
          <Save className="w-4 h-4" />
          {loading ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </div>
    </form>
  );
}
