import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import dynamic from 'next/dynamic';

// Dynamic import for map
const PropertyMap = dynamic(() => import('../../properties/PropertyMap'), { ssr: false });

interface CoachDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: CoachDetailPageProps): Promise<Metadata> {
  const coach = await prisma.coach.findUnique({
    where: { slug: params.slug },
  });

  if (!coach) {
    return {
      title: 'Coach Not Found',
    };
  }

  return {
    title: coach.metaTitle || `${coach.name} - ${coach.title} | JustRichard`,
    description: coach.metaDescription || coach.bio || '',
  };
}

export default async function CoachDetailPage({ params }: CoachDetailPageProps) {
  const { locale, slug } = await params;

  const coach = await prisma.coach.findUnique({
    where: { slug },
    include: {
      City: true,
      Country: true,
    },
  });

  if (!coach) {
    notFound();
  }

  // Increment view count
  await prisma.coach.update({
    where: { id: coach.id },
    data: { views: { increment: 1 } },
  });

  // Parse JSON fields
  const specializations = coach.specializations ? JSON.parse(coach.specializations as string) : [];
  const tags = coach.tags ? JSON.parse(coach.tags as string) : [];
  const education = coach.education ? JSON.parse(coach.education as string) : [];
  const certifications = coach.certifications ? JSON.parse(coach.certifications as string) : [];
  const achievements = coach.achievements ? JSON.parse(coach.achievements as string) : [];
  const languages = coach.languages ? JSON.parse(coach.languages as string) : [];
  const coachingFormats = coach.coachingFormats ? JSON.parse(coach.coachingFormats as string) : [];
  const targetAudience = coach.targetAudience ? JSON.parse(coach.targetAudience as string) : [];
  const clientLevels = coach.clientLevels ? JSON.parse(coach.clientLevels as string) : [];
  const locations = coach.locations ? JSON.parse(coach.locations as string) : [];
  const availableDays = coach.availableDays ? JSON.parse(coach.availableDays as string) : [];
  const workingHours = coach.workingHours ? JSON.parse(coach.workingHours as string) : null;
  const bookingTypes = coach.bookingTypes ? JSON.parse(coach.bookingTypes as string) : [];
  const packagePricing = coach.packagePricing ? JSON.parse(coach.packagePricing as string) : [];
  const programs = coach.programs ? JSON.parse(coach.programs as string) : [];

  const currencySymbol = coach.currency === 'THB' ? '฿' : 'AED';

  const categoryNames: Record<string, string> = {
    sport_coaching: 'Sport Coaching',
    nutrition_coaching: 'Nutrition Coaching',
    emotional_coaching: 'Emotional & Mindset Coaching',
    holistic_coaching: 'Holistic & Wellness Coaching',
    rehab_coaching: 'Rehabilitation & Health',
    lifestyle_coaching: 'Lifestyle Coaching',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href={`/${locale}`} className="hover:text-purple-600">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/${locale}/coaches`} className="hover:text-purple-600">
              Coaches
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{coach.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <main className="lg:w-2/3">
            {/* Profile Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-start gap-6 mb-6">
                {/* Avatar */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-lg p-6 text-center">
                  <div className="text-6xl mb-2">{coach.image || '💪'}</div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-block bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded">
                      {categoryNames[coach.mainCategory]}
                    </span>
                    {coach.isFeatured && (
                      <span className="inline-block bg-yellow-100 text-yellow-700 text-sm px-3 py-1 rounded">
                        ⭐ Featured
                      </span>
                    )}
                    {coach.isVerified && (
                      <span className="inline-block bg-green-100 text-green-700 text-sm px-3 py-1 rounded">
                        ✓ Verified
                      </span>
                    )}
                  </div>

                  {/* Name & Title */}
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {coach.name}
                  </h1>
                  <p className="text-lg text-gray-600 mb-4">{coach.title}</p>

                  {/* Quick Stats */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center text-gray-700">
                      <span className="mr-2">💼</span>
                      <span>{coach.experience}+ years experience</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <span className="mr-2">📍</span>
                      <span>{coach.City.name}, {coach.Country.name}</span>
                    </div>
                    {coach.rating && (
                      <div className="flex items-center text-gray-700">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="font-bold">{coach.rating}</span>
                        <span className="ml-1">({coach.reviewCount} reviews)</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bio */}
              {coach.bio && (
                <div className="prose max-w-none">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">About</h2>
                  <p className="text-gray-700 leading-relaxed">{coach.bio}</p>
                </div>
              )}
            </div>

            {/* Specializations & Tags */}
            {(specializations.length > 0 || tags.length > 0) && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                {specializations.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">🎯 Specializations</h2>
                    <div className="flex flex-wrap gap-2">
                      {specializations.map((spec: string, idx: number) => (
                        <span key={idx} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                          {spec.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {tags.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">🏷️ Focus Areas</h2>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag: string, idx: number) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">
                          #{tag.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Programs */}
            {programs.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">📋 Programs Offered</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {programs.map((program: any, idx: number) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{program.name}</h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>⏱️ Duration: {program.duration}</div>
                        <div>🎯 Focus: {program.focus}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Credentials */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Education */}
              {education.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">🎓 Education</h2>
                  <div className="space-y-4">
                    {education.map((edu: any, idx: number) => (
                      <div key={idx}>
                        <div className="font-semibold text-gray-900">{edu.degree}</div>
                        <div className="text-sm text-gray-600">{edu.institution}</div>
                        <div className="text-xs text-gray-500">{edu.year}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {certifications.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">📜 Certifications</h2>
                  <div className="space-y-2">
                    {certifications.map((cert: string, idx: number) => (
                      <div key={idx} className="flex items-start text-gray-700">
                        <span className="text-green-600 mr-2 mt-1">✓</span>
                        <span className="text-sm">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Achievements */}
            {achievements.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">🏆 Achievements</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {achievements.map((achievement: string, idx: number) => (
                    <div key={idx} className="flex items-start text-gray-700">
                      <span className="text-yellow-500 mr-2 mt-1">★</span>
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages & Audience */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Languages */}
              {languages.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">🌍 Languages</h2>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((lang: string, idx: number) => (
                      <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Target Audience */}
              {targetAudience.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">👥 Target Audience</h2>
                  <div className="flex flex-wrap gap-2">
                    {targetAudience.map((audience: string, idx: number) => (
                      <span key={idx} className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm">
                        {audience.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Success Stats */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-100 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">📊 Success Record</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{coach.totalClients}</div>
                  <div className="text-sm text-gray-600">Clients Trained</div>
                </div>
                {coach.successRate && (
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{coach.successRate}%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                )}
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600">{coach.rating}★</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </div>
            </div>

            {/* Locations */}
            {locations.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">📍 Training Locations</h2>
                <div className="space-y-3">
                  {locations.map((location: any, idx: number) => (
                    <div key={idx} className="flex items-start border-l-4 border-purple-600 pl-4">
                      <div>
                        <div className="font-semibold text-gray-900">
                          {location.type === 'online' && '💻 Online'}
                          {location.type === 'gym' && '🏋️ Gym'}
                          {location.type === 'studio' && '🧘 Studio'}
                          {location.type === 'office' && '🏢 Office'}
                          {location.type === 'outdoor' && '🌳 Outdoor'}
                          {location.name && ` - ${location.name}`}
                        </div>
                        {location.address && (
                          <div className="text-sm text-gray-600">{location.address}</div>
                        )}
                        {location.platform && (
                          <div className="text-sm text-gray-600">Platform: {location.platform}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>

          {/* Sidebar */}
          <aside className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              {/* Pricing */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">💰 Pricing</h3>
                <div className="space-y-3">
                  {coach.sessionFee && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Per Session</span>
                      <span className="text-2xl font-bold text-purple-600">
                        {currencySymbol}{coach.sessionFee.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {coach.hourlyRate && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Hourly Rate</span>
                      <span className="text-lg font-semibold text-gray-900">
                        {currencySymbol}{coach.hourlyRate.toLocaleString()}/hr
                      </span>
                    </div>
                  )}
                </div>

                {/* Package Pricing */}
                {packagePricing.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-sm font-semibold text-gray-900 mb-3">📦 Packages</div>
                    <div className="space-y-2">
                      {packagePricing.map((pkg: any, idx: number) => (
                        <div key={idx} className="bg-purple-50 rounded-lg p-3">
                          <div className="font-medium text-gray-900 text-sm">{pkg.name}</div>
                          <div className="text-purple-600 font-bold">
                            {currencySymbol}{pkg.price.toLocaleString()}
                          </div>
                          {pkg.sessions && (
                            <div className="text-xs text-gray-600">{pkg.sessions} sessions</div>
                          )}
                          {pkg.duration && (
                            <div className="text-xs text-gray-600">{pkg.duration}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Coaching Formats */}
              {coachingFormats.length > 0 && (
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">📋 Coaching Formats</h3>
                  <div className="flex flex-wrap gap-2">
                    {coachingFormats.map((format: string, idx: number) => (
                      <span key={idx} className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm">
                        {format.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Availability */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">⏰ Availability</h3>
                {availableDays.length > 0 && (
                  <div className="mb-3">
                    <div className="text-sm text-gray-600 mb-2">Available Days:</div>
                    <div className="flex flex-wrap gap-1">
                      {availableDays.map((day: string, idx: number) => (
                        <span key={idx} className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                          {day.substring(0, 3)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {workingHours && (
                  <div className="text-sm text-gray-700">
                    <span className="font-medium">Hours:</span> {workingHours.start} - {workingHours.end}
                  </div>
                )}
              </div>

              {/* Contact */}
              <div className="mb-6 space-y-3">
                {coach.phone && (
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500 mr-2">📞</span>
                    <a href={`tel:${coach.phone}`} className="text-purple-600 hover:underline">
                      {coach.phone}
                    </a>
                  </div>
                )}
                {coach.email && (
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500 mr-2">✉️</span>
                    <a href={`mailto:${coach.email}`} className="text-purple-600 hover:underline">
                      {coach.email}
                    </a>
                  </div>
                )}
                {coach.website && (
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500 mr-2">🌐</span>
                    <a href={coach.website} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                      Visit Website
                    </a>
                  </div>
                )}
                {coach.instagram && (
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500 mr-2">📸</span>
                    <a href={`https://instagram.com/${coach.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                      {coach.instagram}
                    </a>
                  </div>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <Link 
                  href={`/${locale}/coaches/${coach.slug}/book`}
                  className="block w-full bg-purple-600 text-white py-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold text-lg text-center"
                >
                  Book Session
                </Link>
                <button className="w-full bg-white text-purple-600 py-3 rounded-lg border-2 border-purple-600 hover:bg-purple-50 transition-colors font-semibold">
                  Send Message
                </button>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Verified Professional</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Certified Coach</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Secure Booking</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Similar Coaches */}
      <SimilarCoaches currentCoachId={coach.id} mainCategory={coach.mainCategory} cityId={coach.cityId} locale={locale} />
    </div>
  );
}

async function SimilarCoaches({ currentCoachId, mainCategory, cityId, locale }: { currentCoachId: string; mainCategory: string | null; cityId: string; locale: string }) {
  const similarCoaches = await prisma.coach.findMany({
    where: {
      id: { not: currentCoachId },
      ...(mainCategory && { mainCategory }),
      cityId,
      isActive: true,
    },
    take: 3,
    orderBy: [
      { isFeatured: 'desc' },
      { rating: 'desc' },
      { createdAt: 'desc' },
    ],
    include: {
      City: true,
      Country: true,
    },
  });

  if (similarCoaches.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-bold mb-8">Similar Coaches</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarCoaches.map((coach) => {
            const images = Array.isArray(coach.images) ? coach.images : [];
            const mainImage = coach.image || (images.length > 0 && typeof images[0] === 'string' ? images[0] : null);
            return (
              <Link key={coach.id} href={`/${locale}/coaches/${coach.slug}`} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="aspect-video bg-gray-200 relative">
                  {mainImage && typeof mainImage === 'string' ? (
                    <img src={mainImage} alt={coach.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-6xl">
                      🎓
                    </div>
                  )}
                  {coach.isFeatured && (
                    <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-semibold">
                      Featured
                    </div>
                  )}
                  {coach.isVerified && (
                    <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                      <span>✓</span> Verified
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{coach.name}</h3>
                  {coach.mainCategory && (
                    <p className="text-sm text-blue-600 font-medium mb-2">{coach.mainCategory}</p>
                  )}
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {coach.City?.name}, {coach.Country?.name}
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-gray-600">
                      💼 {coach.experience || 'N/A'}
                    </div>
                    {coach.rating && (
                      <div className="text-sm text-gray-600">
                        ⭐ {coach.rating.toFixed(1)} ({coach.reviewCount})
                      </div>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    {coach.currency} {coach.sessionFee?.toLocaleString()}
                    <span className="text-sm text-gray-500 font-normal">/session</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
