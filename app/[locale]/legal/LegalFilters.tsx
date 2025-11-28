'use client';

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';

interface LegalFiltersProps {
  onFilterChange: (filters: any) => void;
}

const PRACTICE_AREAS = [
  { value: '', label: 'Tous les domaines' },
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

const TYPES = [
  { value: '', label: 'Tous les types' },
  { value: 'LAWYER', label: 'Avocat' },
  { value: 'LAW_FIRM', label: 'Cabinet' },
  { value: 'LEGAL_ADVISOR', label: 'Conseiller' },
  { value: 'NOTARY', label: 'Notaire' },
];

const LANGUAGES = [
  { value: '', label: 'Toutes les langues' },
  { value: 'fr', label: 'Français' },
  { value: 'en', label: 'English' },
  { value: 'ar', label: 'العربية' },
  { value: 'es', label: 'Español' },
  { value: 'de', label: 'Deutsch' },
];

export default function LegalFilters({ onFilterChange }: LegalFiltersProps) {
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    practiceArea: '',
    language: '',
    city: '',
    country: '',
  });

  const [showFilters, setShowFilters] = useState(false);

  const handleChange = (field: string, value: string) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      search: '',
      type: '',
      practiceArea: '',
      language: '',
      city: '',
      country: '',
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const activeFiltersCount = Object.values(filters).filter(v => v !== '').length;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Rechercher un avocat, cabinet..."
          value={filters.search}
          onChange={(e) => handleChange('search', e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Toggle Filters Button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
      >
        <Filter className="w-4 h-4" />
        <span>Filtres avancés</span>
        {activeFiltersCount > 0 && (
          <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
            {activeFiltersCount}
          </span>
        )}
      </button>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={filters.type}
              onChange={(e) => handleChange('type', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {TYPES.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Domaine de pratique</label>
            <select
              value={filters.practiceArea}
              onChange={(e) => handleChange('practiceArea', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {PRACTICE_AREAS.map(area => (
                <option key={area.value} value={area.value}>{area.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Langue</label>
            <select
              value={filters.language}
              onChange={(e) => handleChange('language', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {LANGUAGES.map(lang => (
                <option key={lang.value} value={lang.value}>{lang.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
            <input
              type="text"
              placeholder="Ex: Paris"
              value={filters.city}
              onChange={(e) => handleChange('city', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pays</label>
            <input
              type="text"
              placeholder="Ex: France"
              value={filters.country}
              onChange={(e) => handleChange('country', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleReset}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
            >
              Réinitialiser
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
