'use client';

import Link from 'next/link';
import Image from 'next/image';

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    slug: string;
    icon?: string | null;
    image?: string | null;
    description?: string | null;
    _count?: {
      products: number;
    };
  };
  locale?: string;
}

export default function CategoryCard({ category, locale = 'en' }: CategoryCardProps) {
  const productCount = category._count?.products || 0;

  return (
    <Link
      href={`/${locale}/food/products?category=${category.slug}`}
      className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {category.image ? (
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="aspect-square bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
          <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
            {category.icon || '📦'}
          </span>
        </div>
      )}
      
      <div className="p-4 text-center">
        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">
          {category.name}
        </h3>
        {productCount > 0 && (
          <p className="text-sm text-gray-500">
            {productCount} {productCount === 1 ? 'product' : 'products'}
          </p>
        )}
      </div>
    </Link>
  );
}
