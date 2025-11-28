'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface RentalFiltersProps {
  categories: { category: string; _count: number }[];
  brands: { brand: string; _count: number }[];
  translations: {
    filters: string;
    category: string;
    brand: string;
    priceRange: string;
    minPrice: string;
    maxPrice: string;
    allCategories: string;
    allBrands: string;
  };
  locale: string;
}

export default function RentalFilters({ categories, brands, translations, locale }: RentalFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/${locale}/rental?${params.toString()}`);
  };

  return (
    <aside className="lg:w-64 flex-shrink-0">
      <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
        <h2 className="text-xl font-bold mb-4">{translations.filters}</h2>

        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">{translations.category}</h3>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchParams.get('category') || ''}
            onChange={(e) => updateFilter('category', e.target.value)}
          >
            <option value="">{translations.allCategories}</option>
            {categories.map((cat) => (
              <option key={cat.category} value={cat.category}>
                {cat.category} ({cat._count})
              </option>
            ))}
          </select>
        </div>

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
