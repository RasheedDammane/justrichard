'use client';

import { useState, useEffect } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';

interface Country {
  id: string;
  name: string;
  code: string;
  emoji?: string;
}

interface City {
  id: string;
  name: string;
  countryId: string;
  type?: string; // 'city', 'emirate', 'district', etc.
}

interface LocationSelectorProps {
  selectedCountryId: string;
  selectedCityId: string;
  onCountryChange: (countryId: string) => void;
  onCityChange: (cityId: string) => void;
  required?: boolean;
}

export default function LocationSelector({
  selectedCountryId,
  selectedCityId,
  onCountryChange,
  onCityChange,
  required = true
}: LocationSelectorProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);

  // Charger les pays au montage
  useEffect(() => {
    fetchCountries();
  }, []);

  // Charger les villes quand le pays change
  useEffect(() => {
    if (selectedCountryId) {
      fetchCities(selectedCountryId);
    } else {
      setCities([]);
    }
  }, [selectedCountryId]);

  const fetchCountries = async () => {
    setLoadingCountries(true);
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
    } finally {
      setLoadingCountries(false);
    }
  };

  const fetchCities = async (countryId: string) => {
    setLoadingCities(true);
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
    } finally {
      setLoadingCities(false);
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountryId = e.target.value;
    onCountryChange(newCountryId);
    onCityChange(''); // Reset city when country changes
  };

  const getCityLabel = (city: City) => {
    const type = city.type || 'City';
    return `${city.name} (${type})`;
  };

  const getCountryDisplay = (country: Country) => {
    return `${country.emoji || '🌍'} ${country.name}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Country Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <MapPin className="w-4 h-4 inline mr-1" />
          Country / Pays / بلد {required && <span className="text-red-500">*</span>}
        </label>
        
        <div className="relative">
          <select
            value={selectedCountryId}
            onChange={handleCountryChange}
            required={required}
            disabled={loadingCountries}
            className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed appearance-none"
          >
            <option value="">
              {loadingCountries ? 'Loading countries...' : 'Select a country'}
            </option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {getCountryDisplay(country)}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>

        {countries.length === 0 && !loadingCountries && (
          <p className="mt-1 text-xs text-red-500">
            No countries available. Please check your database.
          </p>
        )}
      </div>

      {/* City/Emirate/District Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <MapPin className="w-4 h-4 inline mr-1" />
          City / Emirate / District {required && <span className="text-red-500">*</span>}
        </label>
        
        <div className="relative">
          <select
            value={selectedCityId}
            onChange={(e) => onCityChange(e.target.value)}
            required={required}
            disabled={!selectedCountryId || loadingCities}
            className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed appearance-none"
          >
            <option value="">
              {!selectedCountryId
                ? 'Select a country first'
                : loadingCities
                ? 'Loading locations...'
                : 'Select a city/emirate/district'}
            </option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {getCityLabel(city)}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>

        {selectedCountryId && cities.length === 0 && !loadingCities && (
          <p className="mt-1 text-xs text-amber-600">
            No cities/emirates/districts available for this country.
          </p>
        )}
      </div>

      {/* Selected Location Display */}
      {selectedCountryId && selectedCityId && (
        <div className="col-span-full">
          <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <MapPin className="w-5 h-5 text-blue-600" />
            <div className="text-sm">
              <span className="font-medium text-blue-900">Selected Location:</span>
              <span className="ml-2 text-blue-700">
                {countries.find(c => c.id === selectedCountryId)?.name || 'Unknown'}
                {' → '}
                {cities.find(c => c.id === selectedCityId)?.name || 'Unknown'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
