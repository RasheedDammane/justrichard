'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function PropertyFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [type, setType] = useState(searchParams.get('type') || '');
  const [bedrooms, setBedrooms] = useState(searchParams.get('bedrooms') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

  const applyFilters = () => {
    const params = new URLSearchParams();
    
    if (type) params.set('type', type);
    if (bedrooms) params.set('bedrooms', bedrooms);
    if (maxPrice) params.set('maxPrice', maxPrice);

    router.push(`?${params.toString()}`);
  };

  const resetFilters = () => {
    setType('');
    setBedrooms('');
    setMaxPrice('');
    router.push(window.location.pathname);
  };

  useEffect(() => {
    applyFilters();
  }, [type, bedrooms, maxPrice]);

  const activeFiltersCount = [type, bedrooms, maxPrice].filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Property Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Property Type
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        >
          <option value="">All Types</option>
          <option value="Condo">Condo</option>
          <option value="Villa">Villa</option>
          <option value="House">House</option>
          <option value="Apartment">Apartment</option>
          <option value="Studio">Studio</option>
          <option value="Penthouse">Penthouse</option>
          <option value="Townhouse">Townhouse</option>
          <option value="Serviced Apartment">Serviced Apartment</option>
          <option value="Pool Villa">Pool Villa</option>
        </select>
      </div>

      {/* Bedrooms */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Min Bedrooms
        </label>
        <select
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        >
          <option value="">Any</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
      </div>

      {/* Max Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Max Price (THB/night)
        </label>
        <select
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        >
          <option value="">Any Price</option>
          <option value="2000">Up to ฿2,000</option>
          <option value="3000">Up to ฿3,000</option>
          <option value="5000">Up to ฿5,000</option>
          <option value="8000">Up to ฿8,000</option>
          <option value="12000">Up to ฿12,000</option>
        </select>
      </div>

      {/* Reset Button */}
      {activeFiltersCount > 0 && (
        <button
          onClick={resetFilters}
          className="w-full px-4 py-2 text-sm text-orange-600 border border-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
        >
          Reset All Filters ({activeFiltersCount})
        </button>
      )}
    </div>
  );
}
