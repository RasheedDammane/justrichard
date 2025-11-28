'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';

interface Business {
  placeId: string;
  name: string;
  address: string;
  vicinity?: string;
  location: { lat: number; lng: number };
  types: string[];
  businessStatus?: string;
  rating?: number;
  userRatingsTotal?: number;
  phone?: string;
  website?: string;
}

interface GooglePlacesAutocompleteProps {
  onSelect: (business: Business) => void;
  placeholder?: string;
  className?: string;
}

export default function GooglePlacesAutocomplete({
  onSelect,
  placeholder = 'Search for your business...',
  className = ''
}: GooglePlacesAutocompleteProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Business[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Fermer les résultats si on clique en dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Rechercher avec debounce
  useEffect(() => {
    if (!query.trim() || query.length < 3) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      await searchPlaces(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const searchPlaces = async (searchQuery: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/places/search?query=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();

      if (data.success) {
        setResults(data.data || []);
        setShowResults(true);
      } else {
        console.error('Search error:', data.error);
        setResults([]);
      }
    } catch (error) {
      console.error('Error searching places:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (business: Business) => {
    // Récupérer les détails complets
    try {
      const response = await fetch(
        `/api/places/details?placeId=${encodeURIComponent(business.placeId)}`
      );
      const data = await response.json();

      if (data.success) {
        onSelect(data.data);
        setQuery(business.name);
        setShowResults(false);
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
      onSelect(business);
      setQuery(business.name);
      setShowResults(false);
    }
  };

  const getCategoryLabel = (types: string[]) => {
    const typeLabels: Record<string, string> = {
      restaurant: '🍽️ Restaurant',
      cafe: '☕ Café',
      bar: '🍺 Bar',
      store: '🏪 Store',
      shopping_mall: '🛍️ Shopping Mall',
      hotel: '🏨 Hotel',
      gym: '💪 Gym',
      spa: '💆 Spa',
      salon: '💇 Salon',
      doctor: '⚕️ Doctor',
      dentist: '🦷 Dentist',
      pharmacy: '💊 Pharmacy',
      bank: '🏦 Bank',
      atm: '🏧 ATM',
      gas_station: '⛽ Gas Station',
      parking: '🅿️ Parking',
      school: '🏫 School',
      university: '🎓 University',
      library: '📚 Library',
      museum: '🏛️ Museum',
      art_gallery: '🎨 Art Gallery',
      movie_theater: '🎬 Cinema',
      night_club: '🎉 Night Club',
      park: '🌳 Park',
      church: '⛪ Church',
      mosque: '🕌 Mosque',
      temple: '🛕 Temple',
      synagogue: '🕍 Synagogue',
    };

    for (const type of types) {
      if (typeLabels[type]) {
        return typeLabels[type];
      }
    }

    return '📍 Business';
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {loading ? (
            <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
          ) : (
            <Search className="h-5 w-5 text-gray-400" />
          )}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setShowResults(true)}
          placeholder={placeholder}
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Résultats */}
      {showResults && results.length > 0 && (
        <div className="absolute z-50 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
          {results.map((business) => (
            <button
              key={business.placeId}
              onClick={() => handleSelect(business)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-gray-900 truncate">
                      {business.name}
                    </h4>
                    {business.rating && (
                      <div className="flex items-center gap-1 text-xs">
                        <span className="text-yellow-500">★</span>
                        <span className="text-gray-600">{business.rating}</span>
                        {business.userRatingsTotal && (
                          <span className="text-gray-400">
                            ({business.userRatingsTotal})
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1 truncate">
                    {business.address || business.vicinity}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-600">
                      {getCategoryLabel(business.types)}
                    </span>
                    {business.businessStatus === 'OPERATIONAL' && (
                      <span className="text-xs text-green-600 font-medium">
                        • Open
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Aucun résultat */}
      {showResults && !loading && query.length >= 3 && results.length === 0 && (
        <div className="absolute z-50 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 p-4 text-center">
          <p className="text-sm text-gray-500">
            No businesses found. Try a different search term.
          </p>
        </div>
      )}
    </div>
  );
}
