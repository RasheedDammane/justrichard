import { Suspense } from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

interface LawyersPageProps {
  params: { locale: string };
  searchParams: {
    specialization?: string;
    city?: string;
    minFee?: string;
    maxFee?: string;
  };
}

export const metadata = {
  title: 'Find Expert Lawyers | JustRichard',
  description: 'Connect with experienced lawyers in Thailand and Dubai. Expert legal consultation, contract drafting, and court representation.',
};

export default async function LawyersPage({ params, searchParams }: LawyersPageProps) {
  const { locale } = params;
  const { specialization, city, minFee, maxFee } = searchParams;

  // Build filter conditions
  const where: any = {
    isActive: true,
    isAvailable: true,
  };

  if (specialization) {
    where.specialization = { contains: specialization };
  }

  if (city) {
    where.cityId = city;
  }

  if (minFee || maxFee) {
    where.consultationFee = {};
    if (minFee) where.consultationFee.gte = parseFloat(minFee);
    if (maxFee) where.consultationFee.lte = parseFloat(maxFee);
  }

  // Fetch lawyers
  const lawyers = await prisma.lawyer.findMany({
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

  // Get unique specializations and cities for filters
  const specializations = await prisma.lawyer.findMany({
    where: { isActive: true },
    select: { specialization: true },
    distinct: ['specialization'],
  });

  const cities = await prisma.city.findMany({
    where: {
      Lawyer: {
        some: { isActive: true },
      },
    },
    select: { id: true, name: true },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto max-w-7xl px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            ⚖️ Find Expert Lawyers
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Connect with verified legal professionals in Thailand and Dubai. Get expert advice for your legal matters.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Results Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {lawyers.length} {lawyers.length === 1 ? 'Lawyer' : 'Lawyers'} Found
              </h2>
              {(specialization || city) && (
                <p className="text-sm text-gray-600 mt-1">
                  {specialization && <span>Specialization: {specialization}</span>}
                  {specialization && city && <span> • </span>}
                  {city && <span>City: {cities.find(c => c.id === city)?.name}</span>}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Lawyers Grid */}
        {lawyers.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">⚖️</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No lawyers found</h3>
            <p className="text-gray-600">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lawyers.map((lawyer) => {
              const languages = lawyer.languages ? JSON.parse(lawyer.languages as string) : [];
              const practiceAreas = lawyer.practiceAreas ? JSON.parse(lawyer.practiceAreas as string) : [];
              const currencySymbol = lawyer.currency === 'THB' ? '฿' : 'AED';

              return (
                <Link
                  key={lawyer.id}
                  href={`/${locale}/lawyers/${lawyer.slug}`}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                >
                  {/* Profile Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 text-center relative">
                    <div className="text-6xl mb-3">{lawyer.image || '👨‍⚖️'}</div>
                    <h3 className="text-xl font-bold mb-1">{lawyer.name}</h3>
                    <p className="text-blue-100 text-sm">{lawyer.title}</p>
                    {lawyer.isFeatured && (
                      <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
                        ⭐ Featured
                      </div>
                    )}
                    {lawyer.isVerified && (
                      <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        ✓ Verified
                      </div>
                    )}
                  </div>

                  {/* Profile Details */}
                  <div className="p-6">
                    {/* Specialization */}
                    <div className="mb-4">
                      <div className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                        {lawyer.specialization}
                      </div>
                    </div>

                    {/* Key Info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-700">
                        <span className="mr-2">💼</span>
                        <span>{lawyer.experience}+ years experience</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <span className="mr-2">📍</span>
                        <span>{lawyer.City.name}, {lawyer.Country.name}</span>
                      </div>
                      {languages.length > 0 && (
                        <div className="flex items-center text-sm text-gray-700">
                          <span className="mr-2">🌍</span>
                          <span>{languages.slice(0, 2).join(', ')}</span>
                        </div>
                      )}
                    </div>

                    {/* Practice Areas (top 3) */}
                    {practiceAreas.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {practiceAreas.slice(0, 3).map((area: string, idx: number) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {area}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="font-bold text-gray-900">{lawyer.rating}</span>
                        <span className="text-gray-500 text-xs ml-1">({lawyer.reviewCount})</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {lawyer.casesHandled} cases
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-gray-500">Consultation</div>
                        <div className="text-lg font-bold text-blue-600">
                          {currencySymbol}{lawyer.consultationFee?.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
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
