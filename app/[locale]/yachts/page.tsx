import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import YachtFilters from './YachtFilters';

interface YachtsPageProps {
  params: { locale: string };
  searchParams: { brand?: string; minPrice?: string; maxPrice?: string; minCapacity?: string };
}

async function getYachts(filters: {
  brand?: string;
  minPrice?: string;
  maxPrice?: string;
  minCapacity?: string;
}) {
  const where: any = {
    isActive: true,
  };

  if (filters.brand) {
    where.brand = filters.brand;
  }

  if (filters.minCapacity) {
    where.capacity = { gte: parseInt(filters.minCapacity) };
  }

  if (filters.minPrice || filters.maxPrice) {
    where.pricePerHour = {};
    if (filters.minPrice) {
      where.pricePerHour.gte = parseFloat(filters.minPrice);
    }
    if (filters.maxPrice) {
      where.pricePerHour.lte = parseFloat(filters.maxPrice);
    }
  }

  const yachts = await prisma.Yacht.findMany({
    where,
    orderBy: [
      { isFeatured: 'desc' },
      { pricePerHour: 'asc' },
    ],
    take: 50,
  });

  return yachts;
}

async function getBrands() {
  const brands = await prisma.Yacht.groupBy({
    by: ['brand'],
    where: { isActive: true },
    _count: true,
    orderBy: { brand: 'asc' },
  });

  return brands.filter((b) => b.brand);
}

export default async function YachtsPage({ params, searchParams }: YachtsPageProps) {
  const { locale } = params;
  const yachts = await getYachts(searchParams);
  const brands = await getBrands();

  const translations = {
    en: {
      title: 'Yacht Charter in Dubai',
      subtitle: 'Explore our luxury yacht fleet',
      filters: 'Filters',
      brand: 'Brand',
      capacity: 'Capacity',
      priceRange: 'Price Range',
      minPrice: 'Min Price',
      maxPrice: 'Max Price',
      allBrands: 'All Brands',
      perHour: 'per hour',
      viewDetails: 'View Details',
      featured: 'Featured',
      yachtsFound: 'yachts found',
      guests: 'guests',
      length: 'Length',
      cabins: 'Cabins',
    },
    fr: {
      title: 'Location de Yachts à Dubaï',
      subtitle: 'Explorez notre flotte de yachts de luxe',
      filters: 'Filtres',
      brand: 'Marque',
      capacity: 'Capacité',
      priceRange: 'Gamme de Prix',
      minPrice: 'Prix Min',
      maxPrice: 'Prix Max',
      allBrands: 'Toutes Marques',
      perHour: 'par heure',
      viewDetails: 'Voir Détails',
      featured: 'En vedette',
      yachtsFound: 'yachts trouvés',
      guests: 'invités',
      length: 'Longueur',
      cabins: 'Cabines',
    },
    th: {
      title: 'เช่าเรือยอชท์ในดูไบ',
      subtitle: 'สำรวจเรือยอชท์หรูของเรา',
      filters: 'ตัวกรอง',
      brand: 'ยี่ห้อ',
      capacity: 'ความจุ',
      priceRange: 'ช่วงราคา',
      minPrice: 'ราคาต่ำสุด',
      maxPrice: 'ราคาสูงสุด',
      allBrands: 'ทุกยี่ห้อ',
      perHour: 'ต่อชั่วโมง',
      viewDetails: 'ดูรายละเอียด',
      featured: 'แนะนำ',
      yachtsFound: 'ลำพบ',
      guests: 'ผู้โดยสาร',
      length: 'ความยาว',
      cabins: 'ห้องนอน',
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h1>
        <p className="text-lg text-gray-600">{t.subtitle}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <YachtFilters
          brands={brands}
          translations={{
            filters: t.filters,
            brand: t.brand,
            capacity: t.capacity,
            priceRange: t.priceRange,
            minPrice: t.minPrice,
            maxPrice: t.maxPrice,
            allBrands: t.allBrands,
          }}
          locale={locale}
        />

        {/* Yachts Grid */}
        <main className="flex-1">
          <div className="mb-4">
            <p className="text-gray-600">
              {yachts.length} {t.yachtsFound}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {yachts.map((yacht) => (
              <div
                key={yacht.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Image */}
                <div className="relative h-56 bg-gray-100">
                  {yacht.mainImage ? (
                    <Image
                      src={yacht.mainImage}
                      alt={yacht.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-600 to-cyan-500">
                      <span className="text-white text-2xl font-bold">{yacht.brand}</span>
                    </div>
                  )}

                  {/* Featured Badge */}
                  {yacht.isFeatured && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded font-bold flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {t.featured}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Title */}
                  <div className="mb-3">
                    <Link href={`/${locale}/yachts/${yacht.slug}`}>
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 line-clamp-1">
                        {yacht.name}
                      </h3>
                    </Link>
                    {yacht.brand && (
                      <p className="text-sm text-gray-500">{yacht.brand}</p>
                    )}
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-3 gap-2 mb-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {yacht.capacity} {t.guests}
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                      {yacht.length} ft
                    </div>
                    {yacht.cabins && (
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        {yacht.cabins} {t.cabins}
                      </div>
                    )}
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div>
                      <p className="text-sm text-gray-500">{t.perHour}</p>
                      <p className="text-xl font-bold text-gray-900">
                        {yacht.currency} {yacht.pricePerHour?.toLocaleString()}
                      </p>
                    </div>
                    <Link
                      href={`/${locale}/yachts/${yacht.slug}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      {t.viewDetails}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {yachts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No yachts found matching your criteria.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
