import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import dynamic from 'next/dynamic';

// Dynamic import for map
const PropertyMap = dynamic(() => import('../../properties/PropertyMap'), { ssr: false });

interface LawyerDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: LawyerDetailPageProps): Promise<Metadata> {
  const lawyer = await prisma.lawyer.findUnique({
    where: { slug: params.slug },
  });

  if (!lawyer) {
    return {
      title: 'Lawyer Not Found',
    };
  }

  return {
    title: lawyer.metaTitle || `${lawyer.name} - ${lawyer.title} | JustRichard`,
    description: lawyer.metaDescription || lawyer.bio || '',
  };
}

export default async function LawyerDetailPage({ params }: LawyerDetailPageProps) {
  const { locale, slug } = await params;

  const lawyer = await prisma.lawyer.findUnique({
    where: { slug },
    include: {
      City: true,
      Country: true,
    },
  });

  if (!lawyer) {
    notFound();
  }

  // Increment view count
  await prisma.lawyer.update({
    where: { id: lawyer.id },
    data: { views: { increment: 1 } },
  });

  // Parse JSON fields
  const education = lawyer.education ? JSON.parse(lawyer.education as string) : [];
  const certifications = lawyer.certifications ? JSON.parse(lawyer.certifications as string) : [];
  const languages = lawyer.languages ? JSON.parse(lawyer.languages as string) : [];
  const practiceAreas = lawyer.practiceAreas ? JSON.parse(lawyer.practiceAreas as string) : [];
  const availableDays = lawyer.availableDays ? JSON.parse(lawyer.availableDays as string) : [];
  const workingHours = lawyer.workingHours ? JSON.parse(lawyer.workingHours as string) : null;

  const currencySymbol = lawyer.currency === 'THB' ? '฿' : 'AED';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href={`/${locale}`} className="hover:text-blue-600">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/${locale}/lawyers`} className="hover:text-blue-600">
              Lawyers
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{lawyer.name}</span>
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
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-6 text-center">
                  <div className="text-6xl mb-2">{lawyer.image || '👨‍⚖️'}</div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-block bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded">
                      {lawyer.specialization}
                    </span>
                    {lawyer.isFeatured && (
                      <span className="inline-block bg-yellow-100 text-yellow-700 text-sm px-3 py-1 rounded">
                        ⭐ Featured
                      </span>
                    )}
                    {lawyer.isVerified && (
                      <span className="inline-block bg-green-100 text-green-700 text-sm px-3 py-1 rounded">
                        ✓ Verified
                      </span>
                    )}
                  </div>

                  {/* Name & Title */}
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {lawyer.name}
                  </h1>
                  <p className="text-lg text-gray-600 mb-4">{lawyer.title}</p>

                  {/* Quick Stats */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center text-gray-700">
                      <span className="mr-2">💼</span>
                      <span>{lawyer.experience}+ years experience</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <span className="mr-2">📍</span>
                      <span>{lawyer.City.name}, {lawyer.Country.name}</span>
                    </div>
                    {lawyer.rating && (
                      <div className="flex items-center text-gray-700">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="font-bold">{lawyer.rating}</span>
                        <span className="ml-1">({lawyer.reviewCount} reviews)</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bio */}
              {lawyer.bio && (
                <div className="prose max-w-none">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">About</h2>
                  <p className="text-gray-700 leading-relaxed">{lawyer.bio}</p>
                </div>
              )}
            </div>

            {/* Practice Areas */}
            {practiceAreas.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Practice Areas</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {practiceAreas.map((area: string, idx: number) => (
                    <div key={idx} className="flex items-center text-gray-700">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education & Certifications */}
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
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Languages */}
            {languages.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
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

            {/* Success Stats */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">📊 Success Record</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{lawyer.casesHandled}</div>
                  <div className="text-sm text-gray-600">Cases Handled</div>
                </div>
                {lawyer.successRate && (
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{lawyer.successRate}%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                )}
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600">{lawyer.rating}★</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </div>
            </div>

            {/* Office Location */}
            {lawyer.latitude && lawyer.longitude && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">📍 Office Location</h2>
                {lawyer.officeAddress && (
                  <p className="text-gray-700 mb-4">{lawyer.officeAddress}</p>
                )}
                <PropertyMap
                  latitude={lawyer.latitude}
                  longitude={lawyer.longitude}
                  propertyName={lawyer.name}
                  address={lawyer.officeAddress || undefined}
                />
              </div>
            )}
          </main>

          {/* Sidebar */}
          <aside className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              {/* Pricing */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Consultation Fees</h3>
                <div className="space-y-3">
                  {lawyer.consultationFee && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Initial Consultation</span>
                      <span className="text-2xl font-bold text-blue-600">
                        {currencySymbol}{lawyer.consultationFee.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {lawyer.hourlyRate && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Hourly Rate</span>
                      <span className="text-lg font-semibold text-gray-900">
                        {currencySymbol}{lawyer.hourlyRate.toLocaleString()}/hr
                      </span>
                    </div>
                  )}
                </div>
              </div>

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
                {lawyer.phone && (
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500 mr-2">📞</span>
                    <a href={`tel:${lawyer.phone}`} className="text-blue-600 hover:underline">
                      {lawyer.phone}
                    </a>
                  </div>
                )}
                {lawyer.email && (
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500 mr-2">✉️</span>
                    <a href={`mailto:${lawyer.email}`} className="text-blue-600 hover:underline">
                      {lawyer.email}
                    </a>
                  </div>
                )}
                {lawyer.website && (
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500 mr-2">🌐</span>
                    <a href={lawyer.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Visit Website
                    </a>
                  </div>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg">
                  Book Consultation
                </button>
                <button className="w-full bg-white text-blue-600 py-3 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors font-semibold">
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
                  <span>Licensed Attorney</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Confidential Service</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
