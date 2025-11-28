import { Suspense } from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import ActivityFilters from './ActivityFilters';

interface ActivitiesPageProps {
  params: { locale: string };
  searchParams: {
    category?: string;
    city?: string;
    minPrice?: string;
    maxPrice?: string;
  };
}

export const metadata = {
  title: 'Activities & Tours | JustRichard',
  description: 'Discover amazing activities and tours in Thailand and Dubai. From cultural experiences to adventure sports, find your perfect activity.',
};

export default async function ActivitiesPage({ params, searchParams }: ActivitiesPageProps) {
  const { locale } = params;
  const { category, city, minPrice, maxPrice } = searchParams;

  // Build filter conditions
  const where: any = {
    isActive: true,
    isAvailable: true,
  };

  if (category) {
    where.category = category;
  }

  if (city) {
    where.cityId = city;
  }

  if (minPrice || maxPrice) {
    where.pricePerPerson = {};
    if (minPrice) where.pricePerPerson.gte = parseFloat(minPrice);
    if (maxPrice) where.pricePerPerson.lte = parseFloat(maxPrice);
  }

  // Fetch activities
  const activities = await prisma.activity.findMany({
    where,
    include: {
      City: true,
      Country: true,
    },
    orderBy: [
      { isFeatured: 'desc' },
      { rating: 'desc' },
      { bookings: 'desc' },
    ],
  });

  // Get unique categories and cities for filters
  const categories = await prisma.activity.findMany({
    where: { isActive: true },
    select: { category: true },
    distinct: ['category'],
  });

  const cities = await prisma.city.findMany({
    where: {
      Activity: {
        some: { isActive: true },
      },
    },
    select: { id: true, name: true },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto max-w-7xl px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🎯 Activities & Tours
          </h1>
          <p className="text-xl text-orange-100 max-w-2xl">
            Discover unforgettable experiences in Thailand and Dubai. From cultural tours to extreme adventures.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-1/4">
            <Suspense fallback={<div>Loading filters...</div>}>
              <ActivityFilters
                categories={categories.map(c => c.category)}
                cities={cities}
                currentCategory={category}
                currentCity={city}
                currentMinPrice={minPrice}
                currentMaxPrice={maxPrice}
              />
            </Suspense>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4">
            {/* Results Header */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {activities.length} {activities.length === 1 ? 'Activity' : 'Activities'} Found
                  </h2>
                  {(category || city) && (
                    <p className="text-sm text-gray-600 mt-1">
                      {category && <span>Category: {category}</span>}
                      {category && city && <span> • </span>}
                      {city && <span>City: {cities.find(c => c.id === city)?.name}</span>}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Activities Grid */}
            {activities.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">No activities found</h3>
                <p className="text-gray-600">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {activities.map((activity) => {
                  const included = activity.included ? JSON.parse(activity.included as string) : [];
                  const currencySymbol = activity.currency === 'THB' ? '฿' : 'AED';

                  return (
                    <Link
                      key={activity.id}
                      href={`/${locale}/activities/${activity.slug}`}
                      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                    >
                      {/* Image */}
                      <div className="relative h-64 bg-gradient-to-br from-orange-100 to-orange-200">
                        <div className="absolute inset-0 flex items-center justify-center text-6xl">
                          {activity.category === 'Cultural' ? '🏛️' :
                           activity.category === 'Adventure' ? '🏔️' :
                           activity.category === 'Water Sports' ? '🏄' :
                           activity.category === 'Food & Drink' ? '🍜' :
                           activity.category === 'Sightseeing' ? '🗼' :
                           activity.category === 'Dinner Cruise' ? '🚢' :
                           activity.category === 'Family' ? '👨‍👩‍👧‍👦' :
                           activity.category === 'Extreme Sports' ? '🪂' :
                           activity.category === 'Island Hopping' ? '🏝️' : '🎯'}
                        </div>
                        {activity.isFeatured && (
                          <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                            ⭐ Featured
                          </div>
                        )}
                        {activity.rating && (
                          <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                            ★ {activity.rating}
                          </div>
                        )}
                        {activity.difficulty && (
                          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs">
                            {activity.difficulty}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Category & Location */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="inline-block bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded">
                            {activity.category}
                          </span>
                          <span className="text-xs text-gray-500">
                            📍 {activity.City.name}, {activity.Country.name}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                          {activity.name}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {activity.description}
                        </p>

                        {/* Details */}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                          {activity.duration && (
                            <div className="flex items-center gap-1">
                              <span>⏱️</span>
                              <span>{activity.duration}</span>
                            </div>
                          )}
                          {activity.maxGroupSize && (
                            <div className="flex items-center gap-1">
                              <span>👥</span>
                              <span>Max {activity.maxGroupSize}</span>
                            </div>
                          )}
                          {activity.minAge && (
                            <div className="flex items-center gap-1">
                              <span>🎂</span>
                              <span>Age {activity.minAge}+</span>
                            </div>
                          )}
                        </div>

                        {/* Included (top 3) */}
                        {included.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {included.slice(0, 3).map((item: string, idx: number) => (
                              <span key={idx} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                                ✓ {item}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Price */}
                        <div className="border-t border-gray-200 pt-4 mt-4">
                          <div className="flex items-end justify-between">
                            <div>
                              <div className="text-sm text-gray-500">From</div>
                              <div className="text-2xl font-bold text-orange-600">
                                {currencySymbol}{activity.pricePerPerson?.toLocaleString()}
                              </div>
                              <div className="text-xs text-gray-500">per person</div>
                            </div>
                            <div className="text-orange-600 font-semibold group-hover:translate-x-1 transition-transform">
                              Book Now →
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
