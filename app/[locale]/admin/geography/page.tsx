'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Globe, MapPin, Map, Building } from 'lucide-react';

interface Country {
  id: string;
  code: string;
  name: string;
  nameAr?: string;
  dialCode: string;
  currency: string;
  regions: Region[];
}

interface Region {
  id: string;
  name: string;
  nameAr?: string;
  cities: City[];
}

interface City {
  id: string;
  name: string;
  nameAr?: string;
}

export default function GeographyPage() {
  const params = useParams();
  const locale = params.locale as string;

  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/geography/countries?includeRegions=true');
      const data = await response.json();
      if (response.ok) {
        setCountries(data.countries || []);
      }
    } catch (error) {
      console.error('Error fetching countries:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalRegions = countries.reduce((sum, c) => sum + c.regions.length, 0);
  const totalCities = countries.reduce(
    (sum, c) => sum + c.regions.reduce((s, r) => s + r.cities.length, 0),
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-600 text-white py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Globe className="w-8 h-8" />
            Gestion Géographique
          </h1>
          <p className="text-primary-100 mt-1">
            {countries.length} pays • {totalRegions} régions • {totalCities} villes
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pays</p>
                <p className="text-2xl font-bold text-gray-900">{countries.length}</p>
              </div>
              <Globe className="w-12 h-12 text-primary-600 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Régions</p>
                <p className="text-2xl font-bold text-green-600">{totalRegions}</p>
              </div>
              <Map className="w-12 h-12 text-green-600 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Villes</p>
                <p className="text-2xl font-bold text-blue-600">{totalCities}</p>
              </div>
              <Building className="w-12 h-12 text-blue-600 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Devises</p>
                <p className="text-2xl font-bold text-orange-600">
                  {new Set(countries.map(c => c.currency)).size}
                </p>
              </div>
              <MapPin className="w-12 h-12 text-orange-600 opacity-20" />
            </div>
          </div>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((country) => (
            <div
              key={country.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedCountry(country)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{country.name}</h3>
                    {country.nameAr && (
                      <p className="text-sm text-gray-500 mt-1">{country.nameAr}</p>
                    )}
                  </div>
                  <span className="text-3xl">{country.code === 'AE' ? '🇦🇪' : 
                    country.code === 'PH' ? '🇵🇭' :
                    country.code === 'QA' ? '🇶🇦' :
                    country.code === 'TH' ? '🇹🇭' :
                    country.code === 'SA' ? '🇸🇦' :
                    country.code === 'MX' ? '🇲🇽' :
                    country.code === 'EG' ? '🇪🇬' :
                    country.code === 'OM' ? '🇴🇲' :
                    country.code === 'BH' ? '🇧🇭' :
                    country.code === 'VN' ? '🇻🇳' : '🌍'}</span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-medium">Code:</span>
                    <span>{country.code}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-medium">Indicatif:</span>
                    <span>{country.dialCode}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-medium">Devise:</span>
                    <span>{country.currency}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Map className="w-4 h-4 text-green-600" />
                      <span className="font-semibold">{country.regions.length}</span>
                      <span className="text-gray-500">régions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Building className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold">
                        {country.regions.reduce((sum, r) => sum + r.cities.length, 0)}
                      </span>
                      <span className="text-gray-500">villes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {countries.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun pays</h3>
            <p className="text-gray-500 mb-4">
              Exécutez le script de seed pour initialiser les données géographiques
            </p>
            <code className="bg-gray-100 px-4 py-2 rounded text-sm">
              npx ts-node prisma/seed-geography.ts
            </code>
          </div>
        )}
      </div>

      {/* Country Details Modal */}
      {selectedCountry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold">{selectedCountry.name}</h2>
              <button
                onClick={() => setSelectedCountry(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedCountry.regions.map((region) => (
                  <div key={region.id} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                      <Map className="w-5 h-5 text-green-600" />
                      {region.name}
                    </h3>
                    {region.nameAr && (
                      <p className="text-sm text-gray-500 mb-3">{region.nameAr}</p>
                    )}
                    <div className="space-y-1">
                      {region.cities.map((city) => (
                        <div
                          key={city.id}
                          className="flex items-center gap-2 text-sm text-gray-700 py-1"
                        >
                          <Building className="w-4 h-4 text-blue-600" />
                          <span>{city.name}</span>
                          {city.nameAr && (
                            <span className="text-gray-400">({city.nameAr})</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
