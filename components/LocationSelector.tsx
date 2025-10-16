'use client';

import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

interface City {
  id: string;
  name: string;
  nameAr?: string;
  nameFr?: string;
  country: {
    id: string;
    name: string;
    nameAr?: string;
    nameFr?: string;
  };
}

interface LocationSelectorProps {
  currentLocale: string;
  className?: string;
  onLocationChange?: (cityId: string) => void;
}

export default function LocationSelector({
  currentLocale,
  className = '',
  onLocationChange,
}: LocationSelectorProps) {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCities();
    if (typeof window !== 'undefined') {
      const savedCity = localStorage.getItem('selectedCity');
      if (savedCity) {
        setSelectedCity(savedCity);
      }
    }
  }, []);

  const fetchCities = async () => {
    try {
      const response = await fetch('/api/cities');
      const data = await response.json();
      if (response.ok) {
        setCities(data.cities || []);
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = (cityId: string) => {
    setSelectedCity(cityId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedCity', cityId);
      window.dispatchEvent(new CustomEvent('locationChanged', { detail: { cityId } }));
    }
    if (onLocationChange) {
      onLocationChange(cityId);
    }
  };

  const getCityName = (city: City) => {
    if (currentLocale === 'ar' && city.nameAr) return city.nameAr;
    if (currentLocale === 'fr' && city.nameFr) return city.nameFr;
    return city.name;
  };

  const getCountryName = (city: City) => {
    if (currentLocale === 'ar' && city.country.nameAr) return city.country.nameAr;
    if (currentLocale === 'fr' && city.country.nameFr) return city.country.nameFr;
    return city.country.name;
  };

  if (loading) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <MapPin className="w-5 h-5 text-gray-400" />
        <div className="text-sm text-gray-400">Loading...</div>
      </div>
    );
  }

  // Group cities by country
  const citiesByCountry = cities.reduce((acc: any, city) => {
    const countryName = getCountryName(city);
    if (!acc[countryName]) {
      acc[countryName] = [];
    }
    acc[countryName].push(city);
    return acc;
  }, {});

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center gap-2">
        <MapPin className="w-5 h-5 text-gray-600" />
        <select
          value={selectedCity}
          onChange={(e) => handleCityChange(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white cursor-pointer min-w-[200px]"
        >
          <option value="">🌍 All Locations</option>
          {Object.keys(citiesByCountry).sort().map((countryName) => (
            <optgroup key={countryName} label={`📍 ${countryName}`}>
              {citiesByCountry[countryName].map((city: City) => (
                <option key={city.id} value={city.id}>
                  {getCityName(city)}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
    </div>
  );
}
