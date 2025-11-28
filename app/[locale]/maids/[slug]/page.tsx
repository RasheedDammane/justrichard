import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

interface MaidDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: MaidDetailPageProps): Promise<Metadata> {
  const maid = await prisma.maid.findUnique({
    where: { slug: params.slug },
  });

  if (!maid) {
    return {
      title: 'Maid Not Found',
    };
  }

  return {
    title: maid.metaTitle || `${maid.name} - ${maid.nationality} Domestic Worker | JustRichard`,
    description: maid.metaDescription || maid.notes || '',
  };
}

export default async function MaidDetailPage({ params }: MaidDetailPageProps) {
  const { locale, slug } = await params;

  const maid = await prisma.maid.findUnique({
    where: { slug },
    include: {
      City: true,
      Country: true,
    },
  });

  if (!maid) {
    notFound();
  }

  // Increment view count
  await prisma.maid.update({
    where: { id: maid.id },
    data: { views: { increment: 1 } },
  });

  // Parse JSON fields
  const duties = maid.duties ? JSON.parse(maid.duties as string) : [];
  const otherLanguages = maid.otherLanguages ? JSON.parse(maid.otherLanguages as string) : [];

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
            <Link href={`/${locale}/maids`} className="hover:text-orange-600">
              Maids
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{maid.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-8">
        {/* Employment Application Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-white rounded-full p-4">
                <div className="text-6xl">{maid.image || '👩'}</div>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">FAMILY CARE CENTER FOR DOMESTIC WORKERS SERVICES</h1>
            <p className="text-orange-100">Employment Application</p>
          </div>

          {/* Profile Photo & Basic Info */}
          <div className="bg-amber-50 p-6 border-b-4 border-orange-500">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Name</span>
                    <span className="text-gray-900">{maid.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Phone</span>
                    <span className="text-gray-900">{maid.phone || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Ref No.</span>
                    <span className="text-gray-900">{maid.refNo || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Job Description</span>
                    <span className="text-gray-900">HOUSEMAID</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Contract Period</span>
                    <span className="text-gray-900">{maid.contractType || 'Monthly'}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className="text-9xl">{maid.image || '👩'}</div>
              </div>
            </div>
          </div>

          {/* Personal Details */}
          <div className="p-6 border-b-2 border-orange-200">
            <h2 className="text-xl font-bold text-orange-600 mb-4 border-b-2 border-orange-500 pb-2">
              Personal Details
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Nationality</span>
                  <span className="text-gray-900">{maid.nationality}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Date of Birth</span>
                  <span className="text-gray-900">
                    {maid.dateOfBirth ? new Date(maid.dateOfBirth).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Place of Birth</span>
                  <span className="text-gray-900">{maid.placeOfBirth || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Religion</span>
                  <span className="text-gray-900">{maid.religion || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Marital Status</span>
                  <span className="text-gray-900">{maid.maritalStatus || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">No. of Children</span>
                  <span className="text-gray-900">{maid.numberOfChildren}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Sex</span>
                  <span className="text-gray-900">{maid.sex}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Age</span>
                  <span className="text-gray-900">{maid.age}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Height</span>
                  <span className="text-gray-900">{maid.height ? `${maid.height} cm` : 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Weight</span>
                  <span className="text-gray-900">{maid.weight ? `${maid.weight} kg` : 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Complexion</span>
                  <span className="text-gray-900">{maid.complexion || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Qualification</span>
                  <span className="text-gray-900">{maid.qualification || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Languages & Passport */}
          <div className="grid md:grid-cols-2 gap-6 p-6 border-b-2 border-orange-200">
            <div>
              <h2 className="text-xl font-bold text-orange-600 mb-4 border-b-2 border-orange-500 pb-2">
                Languages
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">English</span>
                  <span className="text-gray-900">{maid.englishLevel || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Arabic</span>
                  <span className="text-gray-900">{maid.arabicLevel || 'N/A'}</span>
                </div>
                {otherLanguages.length > 0 && (
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Other Languages</span>
                    <span className="text-gray-900">{otherLanguages.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-orange-600 mb-4 border-b-2 border-orange-500 pb-2">
                Passport Details
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Passport No</span>
                  <span className="text-gray-900">{maid.passportNo || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Expired Date</span>
                  <span className="text-gray-900">
                    {maid.passportExpiry ? new Date(maid.passportExpiry).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Place of Issued</span>
                  <span className="text-gray-900">{maid.passportIssuePlace || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Special Skills & Work Experience */}
          <div className="grid md:grid-cols-2 gap-6 p-6 border-b-2 border-orange-200">
            <div>
              <h2 className="text-xl font-bold text-orange-600 mb-4 border-b-2 border-orange-500 pb-2">
                Special Skills
              </h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Elderly Care</span>
                  <span className="text-2xl">{maid.elderlyCare ? '✓' : '--'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Special Needs Care</span>
                  <span className="text-2xl">{maid.specialNeedsCare ? '✓' : '--'}</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-orange-600 mb-4 border-b-2 border-orange-500 pb-2">
                Work Exp.
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Years of Exp</span>
                  <span className="text-gray-900">{maid.yearsOfExperience} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Country of Exp</span>
                  <span className="text-gray-900">{maid.experienceCountry || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Babysitting & Cooking */}
          <div className="grid md:grid-cols-2 gap-6 p-6 border-b-2 border-orange-200">
            <div>
              <h2 className="text-xl font-bold text-orange-600 mb-4 border-b-2 border-orange-500 pb-2">
                Babysitting
              </h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Older than 1 year</span>
                  <span className="text-2xl">{maid.babysittingOlderThan1Year ? '✓' : '--'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Younger than 1 year</span>
                  <span className="text-2xl">{maid.babysittingYoungerThan1Year ? '✓' : '--'}</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-orange-600 mb-4 border-b-2 border-orange-500 pb-2">
                Cooking Skills
              </h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Syrian and Lebanese</span>
                  <span className="text-2xl">{maid.cookingSyrianLebanese ? '✓' : '--'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Gulf</span>
                  <span className="text-2xl">{maid.cookingGulf ? '✓' : '--'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">International</span>
                  <span className="text-2xl">{maid.cookingInternational ? '✓' : '--'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          {maid.notes && (
            <div className="p-6 bg-amber-50">
              <h2 className="text-xl font-bold text-orange-600 mb-4 border-b-2 border-orange-500 pb-2">
                Notes
              </h2>
              <p className="text-gray-700 uppercase">{maid.notes}</p>
            </div>
          )}
        </div>

        {/* Sidebar - Booking Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Hire {maid.name.split(' ')[0]}</h3>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                ✓ Available
              </span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                ✓ Verified
              </span>
            </div>
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {maid.currency} {maid.monthlyFee?.toLocaleString()}/month
            </div>
            <p className="text-gray-600 text-sm">Contract: {maid.contractType}</p>
          </div>

          {/* Quick Info */}
          <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-center text-sm text-gray-700">
              <span className="mr-2">🌍</span>
              <span>{maid.nationality}</span>
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
              <span>English: {maid.englishLevel}, Arabic: {maid.arabicLevel}</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <button className="w-full bg-orange-600 text-white py-4 rounded-lg hover:bg-orange-700 transition-colors font-semibold text-lg">
              Hire Now
            </button>
            <button className="w-full bg-white text-orange-600 py-3 rounded-lg border-2 border-orange-600 hover:bg-orange-50 transition-colors font-semibold">
              Request Interview
            </button>
            {maid.cv && (
              <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold">
                Download CV
              </button>
            )}
          </div>

          {/* Contact Info */}
          {(maid.phone || maid.email || maid.whatsapp) && (
            <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
              <h4 className="font-semibold text-gray-900 mb-3">Contact</h4>
              {maid.phone && (
                <div className="flex items-center text-sm">
                  <span className="text-gray-500 mr-2">📞</span>
                  <a href={`tel:${maid.phone}`} className="text-orange-600 hover:underline">
                    {maid.phone}
                  </a>
                </div>
              )}
              {maid.email && (
                <div className="flex items-center text-sm">
                  <span className="text-gray-500 mr-2">✉️</span>
                  <a href={`mailto:${maid.email}`} className="text-orange-600 hover:underline">
                    {maid.email}
                  </a>
                </div>
              )}
              {maid.whatsapp && (
                <div className="flex items-center text-sm">
                  <span className="text-gray-500 mr-2">💬</span>
                  <a href={`https://wa.me/${maid.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">
                    WhatsApp
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Similar Maids */}
      <SimilarMaids currentMaidId={maid.id} nationality={maid.nationality} cityId={maid.cityId} locale={locale} />
    </div>
  );
}

async function SimilarMaids({ currentMaidId, nationality, cityId, locale }: { currentMaidId: string; nationality: string | null; cityId: string; locale: string }) {
  const similarMaids = await prisma.maid.findMany({
    where: {
      id: { not: currentMaidId },
      ...(nationality && { nationality }),
      cityId,
      isActive: true,
      isAvailable: true,
    },
    take: 3,
    orderBy: [
      { isPremium: 'desc' },
      { rating: 'desc' },
      { createdAt: 'desc' },
    ],
    include: {
      City: true,
      Country: true,
    },
  });

  if (similarMaids.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-bold mb-8">Similar Maids</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarMaids.map((maid) => {
            const images = Array.isArray(maid.gallery) ? maid.gallery : [];
            const mainImage = maid.photo || (images.length > 0 && typeof images[0] === 'string' ? images[0] : null);
            return (
              <Link key={maid.id} href={`/${locale}/maids/${maid.slug}`} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="aspect-video bg-gray-200 relative">
                  {mainImage && typeof mainImage === 'string' ? (
                    <img src={mainImage} alt={`${maid.firstName} ${maid.lastName}`} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-6xl">
                      👩‍💼
                    </div>
                  )}
                  {maid.isPremium && (
                    <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-semibold">
                      Premium
                    </div>
                  )}
                  {maid.isVerified && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                      <span>✓</span> Verified
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{maid.firstName} {maid.lastName}</h3>
                  {maid.nationality && (
                    <p className="text-sm text-blue-600 font-medium mb-2">🌍 {maid.nationality}</p>
                  )}
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {maid.City?.name}, {maid.Country?.name}
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-gray-600">
                      💼 {maid.yearsOfExperience} years exp.
                    </div>
                    {maid.rating && (
                      <div className="text-sm text-gray-600">
                        ⭐ {maid.rating.toFixed(1)} ({maid.reviewCount})
                      </div>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-orange-600">
                    {maid.currency} {maid.salaryPerMonth?.toLocaleString()}
                    <span className="text-sm text-gray-500 font-normal">/month</span>
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
