import { Suspense } from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

interface MaidsPageProps {
  params: { locale: string };
  searchParams: {
    nationality?: string;
    privateRoom?: string;
    liveOut?: string;
    elderlyCare?: string;
    babysitting?: string;
    cooking?: string;
  };
}

export const metadata = {
  title: 'Find Domestic Workers & Maids | JustRichard',
  description: 'Connect with experienced domestic workers and maids from various nationalities. Professional housekeeping services.',
};

export default async function MaidsPage({ params, searchParams }: MaidsPageProps) {
  const { locale } = params;
  const { nationality, privateRoom, liveOut, elderlyCare, babysitting, cooking } = searchParams;

  // Build filter conditions
  const where: any = {
    isActive: true,
    isAvailable: true,
  };

  if (nationality) {
    where.nationality = nationality;
  }

  if (privateRoom === 'true') {
    where.privateRoom = true;
  }

  if (liveOut === 'true') {
    where.liveOut = true;
  }

  if (elderlyCare === 'true') {
    where.elderlyCare = true;
  }

  if (babysitting === 'true') {
    where.OR = [
      { babysittingOlderThan1Year: true },
      { babysittingYoungerThan1Year: true },
    ];
  }

  if (cooking === 'gulf') {
    where.cookingGulf = true;
  } else if (cooking === 'international') {
    where.cookingInternational = true;
  } else if (cooking === 'syrian') {
    where.cookingSyrianLebanese = true;
  }

  // Fetch maids
  const maids = await prisma.maid.findMany({
    where,
    include: {
      City: true,
      Country: true,
    },
    orderBy: [
      { isFeatured: 'desc' },
      { yearsOfExperience: 'desc' },
    ],
  });

  // Get unique nationalities
  const allNationalities = await prisma.maid.groupBy({
    by: ['nationality'],
    where: { isActive: true },
    _count: true,
  });

  const nationalities = allNationalities.map(n => ({
    name: n.nationality,
    count: n._count,
  })).sort((a, b) => b.count - a.count);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white">
        <div className="container mx-auto max-w-7xl px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🏠 Find Professional Domestic Workers
          </h1>
          <p className="text-xl text-orange-100 max-w-2xl mb-8">
            Connect with experienced maids and domestic workers from various nationalities. Professional housekeeping services.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">{maids.length}</div>
              <div className="text-orange-100 text-sm">Available Maids</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">{nationalities.length}</div>
              <div className="text-orange-100 text-sm">Nationalities</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">
                {Math.round(maids.reduce((sum, m) => sum + m.yearsOfExperience, 0) / maids.length)}
              </div>
              <div className="text-orange-100 text-sm">Avg Experience</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">100%</div>
              <div className="text-orange-100 text-sm">Verified</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter Maids</h2>
          
          {/* Nationality Filter */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Nationality</h3>
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/${locale}/maids`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  !nationality
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </Link>
              {nationalities.slice(0, 10).map((nat) => (
                <Link
                  key={nat.name}
                  href={`/${locale}/maids?nationality=${nat.name}`}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    nationality === nat.name
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {nat.name} ({nat.count})
                </Link>
              ))}
            </div>
          </div>

          {/* Special Filters */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Accommodation</h3>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/${locale}/maids?${nationality ? `nationality=${nationality}&` : ''}privateRoom=true`}
                  className={`px-3 py-1 rounded text-sm ${
                    privateRoom === 'true'
                      ? 'bg-orange-100 text-orange-700 border-2 border-orange-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Private Room
                </Link>
                <Link
                  href={`/${locale}/maids?${nationality ? `nationality=${nationality}&` : ''}liveOut=true`}
                  className={`px-3 py-1 rounded text-sm ${
                    liveOut === 'true'
                      ? 'bg-orange-100 text-orange-700 border-2 border-orange-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Live Out
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Special Skills</h3>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/${locale}/maids?${nationality ? `nationality=${nationality}&` : ''}elderlyCare=true`}
                  className={`px-3 py-1 rounded text-sm ${
                    elderlyCare === 'true'
                      ? 'bg-orange-100 text-orange-700 border-2 border-orange-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Elderly Care
                </Link>
                <Link
                  href={`/${locale}/maids?${nationality ? `nationality=${nationality}&` : ''}babysitting=true`}
                  className={`px-3 py-1 rounded text-sm ${
                    babysitting === 'true'
                      ? 'bg-orange-100 text-orange-700 border-2 border-orange-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Babysitting
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Cooking</h3>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/${locale}/maids?${nationality ? `nationality=${nationality}&` : ''}cooking=gulf`}
                  className={`px-3 py-1 rounded text-sm ${
                    cooking === 'gulf'
                      ? 'bg-orange-100 text-orange-700 border-2 border-orange-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Gulf
                </Link>
                <Link
                  href={`/${locale}/maids?${nationality ? `nationality=${nationality}&` : ''}cooking=international`}
                  className={`px-3 py-1 rounded text-sm ${
                    cooking === 'international'
                      ? 'bg-orange-100 text-orange-700 border-2 border-orange-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  International
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {maids.length} {maids.length === 1 ? 'Maid' : 'Maids'} Found
          </h2>
          {nationality && (
            <p className="text-gray-600 mt-1">
              Showing {nationality} domestic workers
            </p>
          )}
        </div>

        {/* Maids Grid */}
        {maids.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No maids found</h3>
            <p className="text-gray-600">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {maids.map((maid) => {
              const duties = maid.duties ? JSON.parse(maid.duties as string) : [];

              return (
                <Link
                  key={maid.id}
                  href={`/${locale}/maids/${maid.slug}`}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                >
                  {/* Profile Header */}
                  <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white p-6 text-center relative">
                    <div className="text-6xl mb-3">{maid.image || '👩'}</div>
                    <h3 className="text-xl font-bold mb-1">{maid.name}</h3>
                    <p className="text-orange-100 text-sm flex items-center justify-center gap-1">
                      <span>{maid.nationality}</span>
                      {maid.refNo && <span className="text-xs">• {maid.refNo}</span>}
                    </p>
                    {maid.isFeatured && (
                      <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
                        ⭐ Featured
                      </div>
                    )}
                  </div>

                  {/* Profile Details */}
                  <div className="p-6">
                    {/* Key Info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-700">
                        <span className="mr-2">🎂</span>
                        <span>{maid.age} years old</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <span className="mr-2">💼</span>
                        <span>{maid.yearsOfExperience} years experience</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <span className="mr-2">📍</span>
                        <span>{maid.currentLocation || maid.City.name}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <span className="mr-2">🗣️</span>
                        <span>
                          English: {maid.englishLevel || 'N/A'} • Arabic: {maid.arabicLevel || 'N/A'}
                        </span>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {maid.elderlyCare && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          Elderly Care
                        </span>
                      )}
                      {maid.babysittingOlderThan1Year && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          Babysitting
                        </span>
                      )}
                      {maid.cookingGulf && (
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                          Gulf Cooking
                        </span>
                      )}
                      {maid.cookingInternational && (
                        <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded">
                          International Cooking
                        </span>
                      )}
                      {maid.privateRoom && (
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                          Private Room
                        </span>
                      )}
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div>
                        <div className="text-xs text-gray-500">Monthly Fee</div>
                        <div className="text-lg font-bold text-orange-600">
                          {maid.currency} {maid.monthlyFee?.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-orange-600 font-semibold group-hover:translate-x-1 transition-transform">
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
