import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface YachtDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

async function getYacht(slug: string) {
  const yacht = await prisma.yacht.findUnique({
    where: { slug },
    include: {
      City: true,
      Country: true,
    },
  });

  if (!yacht) {
    return null;
  }

  // Increment view count
  await prisma.yacht.update({
    where: { id: yacht.id },
    data: { viewCount: { increment: 1 } },
  });

  return yacht;
}

export default async function YachtDetailPage({ params }: YachtDetailPageProps) {
  const { locale, slug } = await params;
  const yacht = await getYacht(slug);

  if (!yacht) {
    notFound();
  }

  const features = yacht.features ? JSON.parse(yacht.features as string) : [];
  const amenities = yacht.amenities ? JSON.parse(yacht.amenities as string) : [];
  const included = yacht.included ? JSON.parse(yacht.included as string) : [];
  const notIncluded = yacht.notIncluded ? JSON.parse(yacht.notIncluded as string) : [];
  const images = yacht.images ? JSON.parse(yacht.images as string) : [];

  const translations = {
    en: {
      backToYachts: 'Back to Yachts',
      bookNow: 'Book Now',
      perHour: 'per hour',
      specifications: 'Specifications',
      length: 'Length',
      capacity: 'Capacity',
      cabins: 'Cabins',
      bathrooms: 'Bathrooms',
      crew: 'Crew',
      speed: 'Speed',
      fuelType: 'Fuel Type',
      engineType: 'Engine Type',
      features: 'Features',
      amenities: 'Amenities',
      included: 'Included',
      notIncluded: 'Not Included',
      pricing: 'Pricing',
      guests: 'guests',
      knots: 'knots',
      reviews: 'Reviews',
      featured: 'Featured',
      description: 'Description',
    },
    fr: {
      backToYachts: 'Retour aux Yachts',
      bookNow: 'Réserver',
      perHour: 'par heure',
      specifications: 'Spécifications',
      length: 'Longueur',
      capacity: 'Capacité',
      cabins: 'Cabines',
      bathrooms: 'Salles de bain',
      crew: 'Équipage',
      speed: 'Vitesse',
      fuelType: 'Carburant',
      engineType: 'Moteur',
      features: 'Caractéristiques',
      amenities: 'Équipements',
      included: 'Inclus',
      notIncluded: 'Non inclus',
      pricing: 'Tarification',
      guests: 'invités',
      knots: 'nœuds',
      reviews: 'Avis',
      featured: 'En vedette',
      description: 'Description',
    },
    th: {
      backToYachts: 'กลับไปยังเรือยอชท์',
      bookNow: 'จองเลย',
      perHour: 'ต่อชั่วโมง',
      specifications: 'ข้อมูลจำเพาะ',
      length: 'ความยาว',
      capacity: 'ความจุ',
      cabins: 'ห้องนอน',
      bathrooms: 'ห้องน้ำ',
      crew: 'ลูกเรือ',
      speed: 'ความเร็ว',
      fuelType: 'เชื้อเพลิง',
      engineType: 'เครื่องยนต์',
      features: 'คุณสมบัติ',
      amenities: 'สิ่งอำนวยความสะดวก',
      included: 'รวมอยู่ด้วย',
      notIncluded: 'ไม่รวม',
      pricing: 'ราคา',
      guests: 'ผู้โดยสาร',
      knots: 'นอต',
      reviews: 'รีวิว',
      featured: 'แนะนำ',
      description: 'รายละเอียด',
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        href={`/${locale}/yachts`}
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {t.backToYachts}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{yacht.name}</h1>
                {yacht.brand && (
                  <p className="text-lg text-gray-600">{yacht.brand}</p>
                )}
              </div>
              {yacht.isFeatured && (
                <span className="bg-yellow-500 text-white text-sm px-3 py-1 rounded-full font-bold">
                  {t.featured}
                </span>
              )}
            </div>

            {/* Rating */}
            {yacht.rating && (
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(yacht.rating!) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600">
                  {yacht.rating}/5 ({yacht.reviewCount} {t.reviews})
                </span>
              </div>
            )}
          </div>

          {/* Main Image */}
          <div className="relative h-96 bg-gray-100 rounded-xl overflow-hidden mb-6">
            {yacht.mainImage ? (
              <Image
                src={yacht.mainImage}
                alt={yacht.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-600 to-cyan-500">
                <span className="text-white text-4xl font-bold">{yacht.brand}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {yacht.description && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.description}</h2>
              <p className="text-gray-700 leading-relaxed">{yacht.description}</p>
            </div>
          )}

          {/* Specifications */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.specifications}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {yacht.length && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">{t.length}</p>
                  <p className="text-lg font-semibold">{yacht.length} {yacht.lengthUnit}</p>
                </div>
              )}
              {yacht.capacity && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">{t.capacity}</p>
                  <p className="text-lg font-semibold">{yacht.capacity} {t.guests}</p>
                </div>
              )}
              {yacht.cabins && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">{t.cabins}</p>
                  <p className="text-lg font-semibold">{yacht.cabins}</p>
                </div>
              )}
              {yacht.bathrooms && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">{t.bathrooms}</p>
                  <p className="text-lg font-semibold">{yacht.bathrooms}</p>
                </div>
              )}
              {yacht.crew && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">{t.crew}</p>
                  <p className="text-lg font-semibold">{yacht.crew}</p>
                </div>
              )}
              {yacht.speed && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">{t.speed}</p>
                  <p className="text-lg font-semibold">{yacht.speed} {t.knots}</p>
                </div>
              )}
            </div>
          </div>

          {/* Features */}
          {features.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.features}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Amenities */}
          {amenities.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.amenities}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {amenities.map((amenity: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Included / Not Included */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {included.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t.included}</h3>
                <ul className="space-y-2">
                  {included.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {notIncluded.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t.notIncluded}</h3>
                <ul className="space-y-2">
                  {notIncluded.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
            {/* Pricing */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.pricing}</h3>
              <div className="space-y-3">
                {yacht.pricePerHour && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">1 Hour</span>
                    <span className="text-lg font-bold">{yacht.currency} {yacht.pricePerHour.toLocaleString()}</span>
                  </div>
                )}
                {yacht.priceFor2Hours && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">2 Hours</span>
                    <span className="text-lg font-bold">{yacht.currency} {yacht.priceFor2Hours.toLocaleString()}</span>
                  </div>
                )}
                {yacht.priceFor4Hours && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">4 Hours</span>
                    <span className="text-lg font-bold">{yacht.currency} {yacht.priceFor4Hours.toLocaleString()}</span>
                  </div>
                )}
                {yacht.pricePerDay && (
                  <div className="flex justify-between items-center border-t pt-3">
                    <span className="text-gray-600">Full Day</span>
                    <span className="text-xl font-bold text-blue-600">{yacht.currency} {yacht.pricePerDay.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Book Now Button */}
            <Link
              href={`/${locale}/yachts/${yacht.slug}/book`}
              className="block w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4 text-center"
            >
              {t.bookNow}
            </Link>

            {/* Location */}
            {yacht.location && (
              <div className="text-sm text-gray-600 text-center">
                <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {yacht.location}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Similar Yachts */}
      <SimilarYachts currentYachtId={yacht.id} cityId={yacht.cityId} locale={locale} />
    </div>
  );
}

async function SimilarYachts({ currentYachtId, cityId, locale }: { currentYachtId: string; cityId: string; locale: string }) {
  const similarYachts = await prisma.yacht.findMany({
    where: {
      id: { not: currentYachtId },
      cityId,
      isActive: true,
    },
    take: 3,
    orderBy: [
      { isFeatured: 'desc' },
      { createdAt: 'desc' },
    ],
    include: {
      City: true,
      Country: true,
    },
  });

  if (similarYachts.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-bold mb-8">Similar Yachts</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarYachts.map((yacht) => {
            const images = Array.isArray(yacht.images) ? yacht.images : [];
            const mainImage = yacht.mainImage || (images.length > 0 && typeof images[0] === 'string' ? images[0] : null);
            return (
              <Link key={yacht.id} href={`/${locale}/yachts/${yacht.slug}`} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="aspect-video bg-gray-200 relative">
                  {mainImage && typeof mainImage === 'string' ? (
                    <img src={mainImage} alt={yacht.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-6xl">
                      🛥️
                    </div>
                  )}
                  {yacht.isFeatured && (
                    <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-semibold">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-1">{yacht.name}</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {yacht.City?.name}, {yacht.Country?.name}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      👥 {yacht.capacity} guests
                    </span>
                    <span className="flex items-center gap-1">
                      📏 {yacht.length}ft
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {yacht.currency} {yacht.pricePerHour?.toLocaleString()}/hr
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
