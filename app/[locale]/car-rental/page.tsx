import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import RentalFilters from './RentalFilters';

interface RentalPageProps {
  params: { locale: string };
  searchParams: { category?: string; minPrice?: string; maxPrice?: string; brand?: string };
}

async function getRentalCars(filters: {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  brand?: string;
}) {
  const where: any = {
    isActive: true,
  };

  if (filters.category) {
    where.category = filters.category;
  }

  if (filters.brand) {
    where.brand = filters.brand;
  }

  if (filters.minPrice || filters.maxPrice) {
    where.pricePerDay = {};
    if (filters.minPrice) {
      where.pricePerDay.gte = parseFloat(filters.minPrice);
    }
    if (filters.maxPrice) {
      where.pricePerDay.lte = parseFloat(filters.maxPrice);
    }
  }

  const cars = await prisma.RentalCar.findMany({
    where,
    orderBy: [
      { isFeatured: 'desc' },
      { isNewArrival: 'desc' },
      { pricePerDay: 'asc' },
    ],
    take: 50,
  });

  return cars;
}

async function getCategories() {
  const categories = await prisma.RentalCar.groupBy({
    by: ['category'],
    where: { isActive: true },
    _count: true,
  });

  return categories;
}

async function getBrands() {
  const brands = await prisma.RentalCar.groupBy({
    by: ['brand'],
    where: { isActive: true },
    _count: true,
    orderBy: { brand: 'asc' },
  });

  return brands;
}

export default async function RentalPage({ params, searchParams }: RentalPageProps) {
  const { locale } = params;
  const cars = await getRentalCars(searchParams);
  const categories = await getCategories();
  const brands = await getBrands();

  const translations = {
    en: {
      title: 'Car Rental in Dubai',
      subtitle: 'Choose from our premium selection of vehicles',
      filters: 'Filters',
      category: 'Category',
      brand: 'Brand',
      priceRange: 'Price Range',
      minPrice: 'Min Price',
      maxPrice: 'Max Price',
      allCategories: 'All Categories',
      allBrands: 'All Brands',
      perDay: 'per day',
      viewDeal: 'View Deal',
      noDeposit: 'No deposit',
      freeDelivery: 'Free Delivery',
      minDays: 'Min',
      instantBooking: 'Instant booking',
      newArrival: 'New Arrival',
      featured: 'Featured',
      carsFound: 'cars found',
    },
    fr: {
      title: 'Location de Voitures à Dubaï',
      subtitle: 'Choisissez parmi notre sélection premium de véhicules',
      filters: 'Filtres',
      category: 'Catégorie',
      brand: 'Marque',
      priceRange: 'Gamme de Prix',
      minPrice: 'Prix Min',
      maxPrice: 'Prix Max',
      allCategories: 'Toutes Catégories',
      allBrands: 'Toutes Marques',
      perDay: 'par jour',
      viewDeal: 'Voir l\'offre',
      noDeposit: 'Sans caution',
      freeDelivery: 'Livraison gratuite',
      minDays: 'Min',
      instantBooking: 'Réservation instantanée',
      newArrival: 'Nouveauté',
      featured: 'En vedette',
      carsFound: 'voitures trouvées',
    },
    th: {
      title: 'เช่ารถยนต์ในดูไบ',
      subtitle: 'เลือกจากรถยนต์พรีเมียมของเรา',
      filters: 'ตัวกรอง',
      category: 'หมวดหมู่',
      brand: 'ยี่ห้อ',
      priceRange: 'ช่วงราคา',
      minPrice: 'ราคาต่ำสุด',
      maxPrice: 'ราคาสูงสุด',
      allCategories: 'ทุกหมวดหมู่',
      allBrands: 'ทุกยี่ห้อ',
      perDay: 'ต่อวัน',
      viewDeal: 'ดูรายละเอียด',
      noDeposit: 'ไม่ต้องวางเงินมัดจำ',
      freeDelivery: 'จัดส่งฟรี',
      minDays: 'ขั้นต่ำ',
      instantBooking: 'จองทันที',
      newArrival: 'รถใหม่',
      featured: 'แนะนำ',
      carsFound: 'คันพบ',
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
        <RentalFilters
          categories={categories}
          brands={brands}
          translations={{
            filters: t.filters,
            category: t.category,
            brand: t.brand,
            priceRange: t.priceRange,
            minPrice: t.minPrice,
            maxPrice: t.maxPrice,
            allCategories: t.allCategories,
            allBrands: t.allBrands,
          }}
          locale={locale}
        />

        {/* Cars Grid */}
        <main className="flex-1">
          <div className="mb-4">
            <p className="text-gray-600">
              {cars.length} {t.carsFound}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {cars.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Image */}
                <div className="relative h-56 bg-gray-100">
                  {car.mainImage ? (
                    <Image
                      src={car.mainImage}
                      alt={car.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-500 to-purple-600">
                      <span className="text-white text-2xl font-bold">{car.brand}</span>
                    </div>
                  )}

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {car.instantBooking && (
                      <span className="bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                        {t.instantBooking}
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    {car.isNewArrival && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded font-bold flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {t.newArrival}
                      </span>
                    )}
                  </div>

                  {/* Brand Logo */}
                  {car.brandLogo && (
                    <div className="absolute bottom-3 left-3">
                      <div className="bg-white/90 rounded-full p-1 backdrop-blur-sm">
                        <Image
                          src={car.brandLogo}
                          alt={car.brand}
                          width={32}
                          height={32}
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Title */}
                  <div className="mb-3">
                    <Link href={`/${locale}/rental/${car.slug}`}>
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 line-clamp-1">
                        {car.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-500">{car.year}</p>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {car.noDeposit && (
                      <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {t.noDeposit}
                      </span>
                    )}
                    {car.freeDelivery && (
                      <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                        </svg>
                        {t.freeDelivery}
                      </span>
                    )}
                    <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                      {t.minDays} {car.minDays} Day{car.minDays > 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-3 gap-2 mb-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {car.seats} seats
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      {car.horsepower} HP
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      {car.transmission}
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div>
                      <p className="text-sm text-gray-500">{t.perDay}</p>
                      <p className="text-xl font-bold text-gray-900">
                        {car.currency} {car.pricePerDay.toLocaleString()}
                      </p>
                    </div>
                    <Link
                      href={`/${locale}/rental/${car.slug}`}
                      className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
                    >
                      {t.viewDeal}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {cars.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No cars found matching your criteria.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
