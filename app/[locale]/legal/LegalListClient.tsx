'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { MapPin, Star, Briefcase, Globe } from 'lucide-react';
import LegalFilters from './LegalFilters';

interface Professional {
  id: string;
  name: string;
  type: string;
  slug: string;
  headline: string | null;
  profilePictureUrl: string | null;
  city: string | null;
  country: string | null;
  practiceAreas: any;
  languages: any;
  yearsOfExperience: number | null;
  featured: boolean;
}

export default function LegalListClient({ professionals, locale }: { professionals: Professional[]; locale: string }) {
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    practiceArea: '',
    language: '',
    city: '',
    country: '',
  });

  const filteredProfessionals = useMemo(() => {
    return professionals.filter(prof => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesName = prof.name.toLowerCase().includes(searchLower);
        const matchesHeadline = prof.headline?.toLowerCase().includes(searchLower);
        if (!matchesName && !matchesHeadline) return false;
      }

      // Type filter
      if (filters.type && prof.type !== filters.type) return false;

      // Practice area filter
      if (filters.practiceArea && Array.isArray(prof.practiceAreas)) {
        if (!prof.practiceAreas.includes(filters.practiceArea)) return false;
      }

      // Language filter
      if (filters.language && Array.isArray(prof.languages)) {
        if (!prof.languages.includes(filters.language)) return false;
      }

      // City filter
      if (filters.city && prof.city) {
        if (!prof.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
      }

      // Country filter
      if (filters.country && prof.country) {
        if (!prof.country.toLowerCase().includes(filters.country.toLowerCase())) return false;
      }

      return true;
    });
  }, [professionals, filters]);

  const getTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      LAWYER: 'Avocat',
      LAW_FIRM: 'Cabinet d\'avocats',
      LEGAL_ADVISOR: 'Conseiller juridique',
      NOTARY: 'Notaire',
    };
    return types[type] || type;
  };

  const formatPracticeAreas = (areas: any) => {
    if (!areas || !Array.isArray(areas)) return 'N/A';
    return areas.slice(0, 2).join(', ');
  };

  const formatLanguages = (langs: any) => {
    if (!langs || !Array.isArray(langs)) return '';
    return langs.map((l: string) => l.toUpperCase()).join(' · ');
  };

  return (
    <div className="space-y-8">
      {/* Filters */}
      <LegalFilters onFilterChange={setFilters} />

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          <span className="font-semibold text-gray-900">{filteredProfessionals.length}</span> professionnel{filteredProfessionals.length > 1 ? 's' : ''} trouvé{filteredProfessionals.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Professionals Grid */}
      {filteredProfessionals.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Aucun professionnel ne correspond à vos critères</p>
          <button
            onClick={() => setFilters({ search: '', type: '', practiceArea: '', language: '', city: '', country: '' })}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProfessionals.map((prof) => (
            <Link key={prof.id} href={`/${locale}/services/legal/${prof.slug}`} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 text-center">
                {prof.profilePictureUrl ? (
                  <img src={prof.profilePictureUrl} alt={prof.name} className="w-24 h-24 rounded-full mx-auto mb-3 object-cover border-4 border-white" />
                ) : (
                  <div className="w-24 h-24 rounded-full mx-auto mb-3 bg-white/20 flex items-center justify-center text-4xl">⚖️</div>
                )}
                <h3 className="text-xl font-bold mb-1">{prof.name}</h3>
                <p className="text-blue-100 text-sm">{getTypeLabel(prof.type)}</p>
                {prof.featured && (
                  <div className="mt-2">
                    <span className="bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-semibold">★ Featured</span>
                  </div>
                )}
              </div>

              {/* Profile Details */}
              <div className="p-6">
                <div className="space-y-3 mb-4">
                  <div className="flex items-start">
                    <Briefcase className="w-4 h-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs text-gray-500">Domaines</div>
                      <div className="font-semibold text-gray-900 text-sm">{formatPracticeAreas(prof.practiceAreas)}</div>
                    </div>
                  </div>
                  
                  {prof.yearsOfExperience && (
                    <div className="flex items-start">
                      <Star className="w-4 h-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-gray-500">Expérience</div>
                        <div className="font-semibold text-gray-900 text-sm">{prof.yearsOfExperience}+ ans</div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start">
                    <Globe className="w-4 h-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs text-gray-500">Langues</div>
                      <div className="font-semibold text-gray-900 text-sm">{formatLanguages(prof.languages)}</div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs text-gray-500">Localisation</div>
                      <div className="font-semibold text-gray-900 text-sm">{prof.city}, {prof.country}</div>
                    </div>
                  </div>
                </div>

                {/* Headline */}
                {prof.headline && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{prof.headline}</p>
                )}

                {/* CTA */}
                <div className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-center">
                  Voir le profil
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
