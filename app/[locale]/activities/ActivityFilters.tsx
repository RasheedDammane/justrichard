'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface ActivityFiltersProps {
  categories: string[];
  cities: { id: string; name: string }[];
  currentCategory?: string;
  currentCity?: string;
  currentMinPrice?: string;
  currentMaxPrice?: string;
}

export default function ActivityFilters({
  categories,
  cities,
  currentCategory,
  currentCity,
  currentMinPrice,
  currentMaxPrice,
}: ActivityFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [minPrice, setMinPrice] = useState(currentMinPrice || '');
  const [maxPrice, setMaxPrice] = useState(currentMaxPrice || '');

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    router.push(`?${params.toString()}`);
  };

  const applyPriceFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (minPrice) {
      params.set('minPrice', minPrice);
    } else {
      params.delete('minPrice');
    }
    
    if (maxPrice) {
      params.set('maxPrice', maxPrice);
    } else {
      params.delete('maxPrice');
    }
    
    router.push(`?${params.toString()}`);
  };

  const clearFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    router.push(window.location.pathname);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {(currentCategory || currentCity || currentMinPrice || currentMaxPrice) && (
          <button
            onClick={clearFilters}
            className="text-sm text-orange-600 hover:text-orange-700"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Category
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              checked={!currentCategory}
              onChange={() => updateFilters('category', '')}
              className="mr-2 text-orange-600 focus:ring-orange-500"
            />
            <span className="text-sm text-gray-700">All Categories</span>
          </label>
          {categories.map((cat) => (
            <label key={cat} className="flex items-center">
              <input
                type="radio"
                name="category"
                value={cat}
                checked={currentCategory === cat}
                onChange={(e) => updateFilters('category', e.target.value)}
                className="mr-2 text-orange-600 focus:ring-orange-500"
              />
              <span className="text-sm text-gray-700">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* City Filter */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Location
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="city"
              checked={!currentCity}
              onChange={() => updateFilters('city', '')}
              className="mr-2 text-orange-600 focus:ring-orange-500"
            />
            <span className="text-sm text-gray-700">All Cities</span>
          </label>
          {cities.map((city) => (
            <label key={city.id} className="flex items-center">
              <input
                type="radio"
                name="city"
                value={city.id}
                checked={currentCity === city.id}
                onChange={(e) => updateFilters('city', e.target.value)}
                className="mr-2 text-orange-600 focus:ring-orange-500"
              />
              <span className="text-sm text-gray-700">{city.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Price Range
        </label>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Min Price</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Max Price</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="10000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <button
            onClick={applyPriceFilter}
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Apply Price Filter
          </button>
        </div>
      </div>

      {/* Popular Categories */}
      <div className="bg-orange-50 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Popular</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-700">
            <span className="mr-2">🏛️</span>
            <span>Cultural Tours</span>
          </div>
          <div className="flex items-center text-gray-700">
            <span className="mr-2">🏔️</span>
            <span>Adventures</span>
          </div>
          <div className="flex items-center text-gray-700">
            <span className="mr-2">🍜</span>
            <span>Food Experiences</span>
          </div>
        </div>
      </div>
    </div>
  );
}
