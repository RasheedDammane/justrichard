import { Suspense } from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

interface CoachesPageProps {
  params: { locale: string };
  searchParams: {
    category?: string;
    city?: string;
    format?: string;
  };
}

export const metadata = {
  title: 'Find Expert Coaches | JustRichard',
  description: 'Connect with professional coaches in sport, nutrition, mindset, and wellness. Transform your body and mind with expert guidance.',
};

export default async function CoachesPage({ params, searchParams }: CoachesPageProps) {
  const { locale } = params;
  const { category, city, format } = searchParams;

  // Build filter conditions
  const where: any = {
    isActive: true,
    isAvailable: true,
  };

  if (category) {
    where.mainCategory = category;
  }

  if (city) {
    where.cityId = city;
  }

  if (format === 'online') {
    where.acceptsOnline = true;
  } else if (format === 'in_person') {
    where.acceptsInPerson = true;
  }

  // Fetch coaches
  const coaches = await prisma.coach.findMany({
    where,
    include: {
      City: true,
      Country: true,
    },
    orderBy: [
      { isFeatured: 'desc' },
      { rating: 'desc' },
      { reviewCount: 'desc' },
    ],
  });

  // Get unique categories and cities for filters
  const categories = [
    { id: 'sport_coaching', name: 'Sport Coaching', icon: '🥊' },
    { id: 'nutrition_coaching', name: 'Nutrition', icon: '🥗' },
    { id: 'emotional_coaching', name: 'Mindset & Emotional', icon: '🧠' },
    { id: 'holistic_coaching', name: 'Holistic & Wellness', icon: '🧘' },
    { id: 'rehab_coaching', name: 'Rehabilitation', icon: '🏥' },
    { id: 'lifestyle_coaching', name: 'Lifestyle', icon: '🌟' },
  ];

  const cities = await prisma.city.findMany({
    where: {
      Coach: {
        some: { isActive: true },
      },
    },
    select: { id: true, name: true },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <div className="container mx-auto max-w-7xl px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            💪 Find Your Perfect Coach
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mb-8">
            Transform your body, mind, and life with expert coaches in sport, nutrition, mindset, and wellness.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">{coaches.length}+</div>
              <div className="text-purple-100 text-sm">Expert Coaches</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">6</div>
              <div className="text-purple-100 text-sm">Categories</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">4.8★</div>
              <div className="text-purple-100 text-sm">Avg Rating</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">1,800+</div>
              <div className="text-purple-100 text-sm">Clients Helped</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Categories Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <Link
              href={`/${locale}/coaches`}
              className={`p-3 rounded-lg border-2 text-center transition-all ${
                !category
                  ? 'border-purple-600 bg-purple-50 text-purple-700'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className="text-2xl mb-1">🌟</div>
              <div className="text-sm font-medium">All</div>
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/${locale}/coaches?category=${cat.id}`}
                className={`p-3 rounded-lg border-2 text-center transition-all ${
                  category === cat.id
                    ? 'border-purple-600 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="text-2xl mb-1">{cat.icon}</div>
                <div className="text-xs font-medium">{cat.name}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Format Filter */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${locale}/coaches${category ? `?category=${category}` : ''}`}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !format
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Formats
            </Link>
            <Link
              href={`/${locale}/coaches?${category ? `category=${category}&` : ''}format=online`}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                format === 'online'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              💻 Online Coaching
            </Link>
            <Link
              href={`/${locale}/coaches?${category ? `category=${category}&` : ''}format=in_person`}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                format === 'in_person'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🏋️ In-Person
            </Link>
          </div>
        </div>

        {/* Results Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {coaches.length} {coaches.length === 1 ? 'Coach' : 'Coaches'} Found
          </h2>
          {category && (
            <p className="text-gray-600 mt-1">
              Showing {categories.find(c => c.id === category)?.name} coaches
            </p>
          )}
        </div>

        {/* Coaches Grid */}
        {coaches.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">💪</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No coaches found</h3>
            <p className="text-gray-600">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coaches.map((coach) => {
              const specializations = coach.specializations ? JSON.parse(coach.specializations as string) : [];
              const languages = coach.languages ? JSON.parse(coach.languages as string) : [];
              const coachingFormats = coach.coachingFormats ? JSON.parse(coach.coachingFormats as string) : [];
              const tags = coach.tags ? JSON.parse(coach.tags as string) : [];
              const currencySymbol = coach.currency === 'THB' ? '฿' : 'AED';

              const categoryInfo = categories.find(c => c.id === coach.mainCategory);

              return (
                <Link
                  key={coach.id}
                  href={`/${locale}/coaches/${coach.slug}`}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                >
                  {/* Profile Header */}
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-6 text-center relative">
                    <div className="text-6xl mb-3">{coach.image || '💪'}</div>
                    <h3 className="text-xl font-bold mb-1">{coach.name}</h3>
                    <p className="text-purple-100 text-sm">{coach.title}</p>
                    {coach.isFeatured && (
                      <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
                        ⭐ Featured
                      </div>
                    )}
                    {coach.isVerified && (
                      <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        ✓ Verified
                      </div>
                    )}
                  </div>

                  {/* Profile Details */}
                  <div className="p-6">
                    {/* Category */}
                    <div className="mb-4">
                      <div className="inline-flex items-center bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded">
                        <span className="mr-1">{categoryInfo?.icon}</span>
                        <span>{categoryInfo?.name}</span>
                      </div>
                    </div>

                    {/* Key Info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-700">
                        <span className="mr-2">💼</span>
                        <span>{coach.experience}+ years experience</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <span className="mr-2">📍</span>
                        <span>{coach.City.name}, {coach.Country.name}</span>
                      </div>
                      {languages.length > 0 && (
                        <div className="flex items-center text-sm text-gray-700">
                          <span className="mr-2">🌍</span>
                          <span>{languages.slice(0, 2).join(', ')}</span>
                        </div>
                      )}
                    </div>

                    {/* Coaching Formats */}
                    {coachingFormats.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {coachingFormats.slice(0, 3).map((format: string, idx: number) => (
                          <span key={idx} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            {format === 'online' && '💻 Online'}
                            {format === 'in_person' && '🏋️ In-Person'}
                            {format === 'hybrid' && '🔄 Hybrid'}
                            {format === 'group_class' && '👥 Group'}
                            {format === 'private_session' && '1️⃣ Private'}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Tags (top 3) */}
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {tags.slice(0, 3).map((tag: string, idx: number) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            #{tag.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="font-bold text-gray-900">{coach.rating}</span>
                        <span className="text-gray-500 text-xs ml-1">({coach.reviewCount})</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {coach.totalClients} clients
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-gray-500">From</div>
                        <div className="text-lg font-bold text-purple-600">
                          {currencySymbol}{coach.sessionFee?.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-purple-600 font-semibold group-hover:translate-x-1 transition-transform">
                        View Profile →
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
