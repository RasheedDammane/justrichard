'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface YachtFiltersProps {
  brands: { brand: string; _count: number }[];
  translations: {
    filters: string;
    brand: string;
    capacity: string;
    priceRange: string;
    minPrice: string;
    maxPrice: string;
    allBrands: string;
  };
  locale: string;
}

export default function YachtFilters({ brands, translations, locale }: YachtFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/${locale}/yachts?${params.toString()}`);
  };

  return (
    <aside className="lg:w-64 flex-shrink-0">
      <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
        <h2 className="text-xl font-bold mb-4">{translations.filters}</h2>

        {/* Brand Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">{translations.brand}</h3>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchParams.get('brand') || ''}
            onChange={(e) => updateFilter('brand', e.target.value)}
          >
            <option value="">{translations.allBrands}</option>
            {brands.map((brand) => (
              <option key={brand.brand} value={brand.brand}>
                {brand.brand} ({brand._count})
              </option>
            ))}
          </select>
        </div>

        {/* Capacity Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">{translations.capacity}</h3>
          <input
            type="number"
            placeholder="Min guests"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchParams.get('minCapacity') || ''}
            onChange={(e) => updateFilter('minCapacity', e.target.value)}
          />
        </div>

        {/* Price Range Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">{translations.priceRange}</h3>
          <div className="space-y-3">
            <input
              type="number"
              placeholder={translations.minPrice}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchParams.get('minPrice') || ''}
              onChange={(e) => updateFilter('minPrice', e.target.value)}
            />
            <input
              type="number"
              placeholder={translations.maxPrice}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchParams.get('maxPrice') || ''}
              onChange={(e) => updateFilter('maxPrice', e.target.value)}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
