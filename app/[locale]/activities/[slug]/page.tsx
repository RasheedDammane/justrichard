import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import dynamic from 'next/dynamic';

// Dynamic import for map
const PropertyMap = dynamic(() => import('../../properties/PropertyMap'), { ssr: false });

interface ActivityDetailPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ActivityDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  const activity = await prisma.activity.findUnique({
    where: { slug },
  });

  if (!activity) {
    return {
      title: 'Activity Not Found',
    };
  }

  return {
    title: activity.metaTitle || `${activity.name} | Activities`,
    description: activity.metaDescription || activity.description || '',
  };
}

export default async function ActivityDetailPage({ params }: ActivityDetailPageProps) {
  const { locale, slug } = await params;

  const activity = await prisma.activity.findUnique({
    where: { slug },
    include: {
      City: true,
      Country: true,
    },
  });

  if (!activity) {
    notFound();
  }

  // Increment view count
  await prisma.activity.update({
    where: { id: activity.id },
    data: { views: { increment: 1 } },
  });

  // Parse JSON fields
  const included = activity.included ? JSON.parse(activity.included as string) : [];
  const notIncluded = activity.notIncluded ? JSON.parse(activity.notIncluded as string) : [];
  const whatToBring = activity.whatToBring ? JSON.parse(activity.whatToBring as string) : [];
  const availableDays = activity.availableDays ? JSON.parse(activity.availableDays as string) : [];
  const startTimes = activity.startTimes ? JSON.parse(activity.startTimes as string) : [];

  const currencySymbol = activity.currency === 'THB' ? '฿' : 'AED';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href={`/${locale}`} className="hover:text-orange-600">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/${locale}/activities`} className="hover:text-orange-600">
              Activities
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{activity.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <main className="lg:w-2/3">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-block bg-orange-100 text-orange-700 text-sm px-3 py-1 rounded">
                  {activity.category}
                </span>
                {activity.isFeatured && (
                  <span className="inline-block bg-yellow-100 text-yellow-700 text-sm px-3 py-1 rounded">
                    ⭐ Featured
                  </span>
                )}
                {activity.rating && (
                  <span className="inline-block bg-green-100 text-green-700 text-sm px-3 py-1 rounded">
                    ★ {activity.rating}
                  </span>
                )}
                {activity.difficulty && (
                  <span className="inline-block bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded">
                    {activity.difficulty}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {activity.name}
              </h1>

              {/* Location */}
              <div className="flex items-center text-gray-600 mb-6">
                <span className="mr-2">📍</span>
                <span>{activity.City.name}, {activity.Country.name}</span>
              </div>

              {/* Image Placeholder */}
              <div className="relative h-96 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg mb-6 flex items-center justify-center">
                <div className="text-9xl">
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
              </div>

              {/* Description */}
              <div className="prose max-w-none mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">About This Activity</h2>
                <p className="text-gray-700 leading-relaxed">{activity.description}</p>
              </div>

              {/* Activity Details */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Activity Details</h3>
                  <div className="space-y-2 text-sm">
                    {activity.duration && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{activity.duration}</span>
                      </div>
                    )}
                    {activity.maxGroupSize && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Max Group Size:</span>
                        <span className="font-medium">{activity.maxGroupSize} people</span>
                      </div>
                    )}
                    {activity.minAge && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Minimum Age:</span>
                        <span className="font-medium">{activity.minAge} years</span>
                      </div>
                    )}
                    {activity.difficulty && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Difficulty:</span>
                        <span className="font-medium">{activity.difficulty}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Schedule</h3>
                  <div className="space-y-2 text-sm">
                    {availableDays.length > 0 && (
                      <div>
                        <span className="text-gray-600 block mb-1">Available Days:</span>
                        <div className="flex flex-wrap gap-1">
                          {availableDays.map((day: string, idx: number) => (
                            <span key={idx} className="bg-white px-2 py-1 rounded text-xs">
                              {day.substring(0, 3)}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {startTimes.length > 0 && (
                      <div className="mt-3">
                        <span className="text-gray-600 block mb-1">Start Times:</span>
                        <div className="flex flex-wrap gap-1">
                          {startTimes.map((time: string, idx: number) => (
                            <span key={idx} className="bg-white px-2 py-1 rounded text-xs">
                              {time}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* What's Included */}
              {included.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">✅ What's Included</h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    {included.map((item: string, idx: number) => (
                      <div key={idx} className="flex items-start text-gray-700">
                        <span className="text-green-600 mr-2 mt-1">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* What's Not Included */}
              {notIncluded.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">❌ What's Not Included</h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    {notIncluded.map((item: string, idx: number) => (
                      <div key={idx} className="flex items-start text-gray-700">
                        <span className="text-red-600 mr-2 mt-1">✗</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* What to Bring */}
              {whatToBring.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">🎒 What to Bring</h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    {whatToBring.map((item: string, idx: number) => (
                      <div key={idx} className="flex items-start text-gray-700">
                        <span className="text-blue-600 mr-2 mt-1">•</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Meeting Point */}
              {activity.meetingPoint && (
                <div className="mb-6 bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">📍 Meeting Point</h3>
                  <p className="text-gray-700">{activity.meetingPoint}</p>
                </div>
              )}

              {/* Stats */}
              <div className="border-t border-gray-200 pt-4 mt-6">
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <span>👁️</span>
                    <span>{activity.views} views</span>
                  </div>
                  {activity.bookings > 0 && (
                    <div className="flex items-center gap-1">
                      <span>📅</span>
                      <span>{activity.bookings} bookings</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Map */}
            {activity.latitude && activity.longitude && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">📍 Location</h2>
                <PropertyMap
                  latitude={activity.latitude}
                  longitude={activity.longitude}
                  propertyName={activity.name}
                  address={activity.meetingPoint || undefined}
                />
              </div>
            )}
          </main>

          {/* Sidebar */}
          <aside className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              {/* Price */}
              <div className="mb-6">
                <div className="text-sm text-gray-600 mb-1">From</div>
                <div className="text-4xl font-bold text-orange-600 mb-2">
                  {currencySymbol}{activity.pricePerPerson?.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">per person</div>
                {activity.pricePerGroup && (
                  <div className="text-sm text-gray-600 mt-2">
                    Group: {currencySymbol}{activity.pricePerGroup.toLocaleString()}
                  </div>
                )}
              </div>

              {/* Quick Info */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center text-sm">
                  <span className="text-gray-600 mr-2">🎯</span>
                  <span className="text-gray-900">{activity.category}</span>
                </div>
                {activity.duration && (
                  <div className="flex items-center text-sm">
                    <span className="text-gray-600 mr-2">⏱️</span>
                    <span className="text-gray-900">{activity.duration}</span>
                  </div>
                )}
                {activity.maxGroupSize && (
                  <div className="flex items-center text-sm">
                    <span className="text-gray-600 mr-2">👥</span>
                    <span className="text-gray-900">Max {activity.maxGroupSize} people</span>
                  </div>
                )}
                {activity.minAge && (
                  <div className="flex items-center text-sm">
                    <span className="text-gray-600 mr-2">🎂</span>
                    <span className="text-gray-900">Age {activity.minAge}+</span>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <Link
                href={`/${locale}/activities/${activity.slug}/book`}
                className="block w-full bg-orange-500 text-white py-4 rounded-lg hover:bg-orange-600 transition-colors font-semibold text-lg mb-4 text-center"
              >
                Book Now
              </Link>

              {/* Trust Badges */}
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Instant confirmation</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Free cancellation</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>24/7 support</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Similar Activities */}
      <SimilarActivities currentActivityId={activity.id} categoryId={activity.categoryId} cityId={activity.cityId} locale={locale} />
    </div>
  );
}

async function SimilarActivities({ currentActivityId, categoryId, cityId, locale }: { currentActivityId: string; categoryId: string | null; cityId: string; locale: string }) {
  const similarActivities = await prisma.activity.findMany({
    where: {
      id: { not: currentActivityId },
      ...(categoryId && { categoryId }),
      cityId,
      isActive: true,
    },
    take: 3,
    orderBy: [
      { isFeatured: 'desc' },
      { createdAt: 'desc' },
    ],
    include: {
      city: true,
      country: true,
      category: true,
    },
  });

  if (similarActivities.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-bold mb-8">Similar Activities</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarActivities.map((activity) => {
            const images = Array.isArray(activity.images) ? activity.images : [];
            const mainImage = activity.mainImage || (images.length > 0 && typeof images[0] === 'string' ? images[0] : null);
            return (
              <Link key={activity.id} href={`/${locale}/activities/${activity.slug}`} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="aspect-video bg-gray-200 relative">
                  {mainImage && typeof mainImage === 'string' ? (
                    <img src={mainImage} alt={activity.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-6xl">
                      🎯
                    </div>
                  )}
                  {activity.isFeatured && (
                    <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-semibold">
                      Featured
                    </div>
                  )}
                  {activity.category && (
                    <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      {activity.category.name}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-1">{activity.name}</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {activity.city?.name}, {activity.country?.name}
                  </div>
                  {activity.duration && (
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {activity.duration}
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-green-600">
                      {activity.currency} {activity.pricePerPerson?.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      /person
                    </div>
                  </div>
                  {activity.rating && (
                    <div className="mt-2 text-sm text-gray-600">
                      ⭐ {activity.rating.toFixed(1)} ({activity.reviewCount} reviews)
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
