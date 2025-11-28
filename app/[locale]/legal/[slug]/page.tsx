import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { MapPin, Globe, Briefcase, Star, Phone, Mail, ExternalLink, Calendar } from 'lucide-react';

interface LegalDetailPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: LegalDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const professional = await prisma.legalProfessional.findUnique({
    where: { slug },
  });

  if (!professional) {
    return {
      title: 'Professional Not Found',
    };
  }

  return {
    title: professional.seoTitle || `${professional.name} | JustRichard`,
    description: professional.seoDescription || professional.headline || `${professional.name} - Professional legal services`,
  };
}

export default async function LegalDetailPage({ params }: LegalDetailPageProps) {
  const { locale, slug } = await params;

  let professional;
  
  try {
    professional = await prisma.legalProfessional.findUnique({
      where: { slug, status: 'PUBLISHED', isActive: true },
    });
  } catch (error) {
    console.error('Error fetching legal professional:', error);
    notFound();
  }

  if (!professional) {
    notFound();
  }

  const getTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      LAWYER: 'Avocat',
      LAW_FIRM: 'Cabinet d\'avocats',
      LEGAL_ADVISOR: 'Conseiller juridique',
      NOTARY: 'Notaire',
    };
    return types[type] || type;
  };

  const formatLanguages = (langs: any) => {
    if (!langs || !Array.isArray(langs)) return '';
    return langs.map((l: string) => l.toUpperCase()).join(' · ');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Cover */}
      <div className="relative h-64 bg-gradient-to-r from-blue-600 to-blue-700">
        {professional.coverImageUrl && (
          <img src={professional.coverImageUrl} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Breadcrumb */}
        <div className="relative container mx-auto max-w-7xl px-4 pt-6">
          <div className="flex items-center text-sm text-white/80">
            <Link href={`/${locale}`} className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href={`/${locale}/legal`} className="hover:text-white">Legal</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{professional.name}</span>
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <div className="container mx-auto max-w-7xl px-4 -mt-20 relative z-10">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Picture */}
              <div className="flex-shrink-0">
                {professional.profilePictureUrl ? (
                  <img src={professional.profilePictureUrl} alt={professional.name} className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg" />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-5xl border-4 border-white shadow-lg">⚖️</div>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{professional.name}</h1>
                    <p className="text-lg text-gray-600 mb-4">{getTypeLabel(professional.type)}</p>
                    {professional.headline && (
                      <p className="text-gray-700 mb-4">{professional.headline}</p>
                    )}
                  </div>
                  {professional.featured && (
                    <span className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-500" />
                      Featured
                    </span>
                  )}
                </div>

                {/* Quick Info */}
                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{professional.city}, {professional.country}</span>
                  </div>
                  {professional.yearsOfExperience && (
                    <div className="flex items-center text-gray-600">
                      <Briefcase className="w-4 h-4 mr-2" />
                      <span>{professional.yearsOfExperience}+ ans d'expérience</span>
                    </div>
                  )}
                  <div className="flex items-center text-gray-600">
                    <Globe className="w-4 h-4 mr-2" />
                    <span>{formatLanguages(professional.languages)}</span>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {Array.isArray(professional.practiceAreas) && professional.practiceAreas.map((area: string, idx: number) => (
                    <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                      {area.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            {professional.bio && (
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">À propos</h2>
                <div className="prose max-w-none text-gray-700 whitespace-pre-line">
                  {professional.bio}
                </div>
              </div>
            )}

            {/* Expertise */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Domaines d'expertise</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {Array.isArray(professional.practiceAreas) && professional.practiceAreas.map((area: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-900">{area.replace(/_/g, ' ')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            {Array.isArray(professional.services) && professional.services.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Services proposés</h2>
                <div className="space-y-4">
                  {professional.services.map((service: any, idx: number) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-bold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                      <div className="flex items-center justify-between">
                        {service.startingPrice && (
                          <span className="text-blue-600 font-semibold">
                            À partir de {service.startingPrice} {service.currency}
                          </span>
                        )}
                        <div className="flex gap-2">
                          {service.isRemote && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Visio dispo</span>
                          )}
                          {service.isUrgentAvailable && (
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Urgent</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Credentials */}
            {(professional.licenseNumber || professional.barAssociation || professional.barAdmissionYear) && (
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Qualifications</h2>
                <div className="space-y-3">
                  {professional.licenseNumber && (
                    <div className="flex items-center gap-3">
                      <span className="text-gray-600">Numéro de licence:</span>
                      <span className="font-semibold text-gray-900">{professional.licenseNumber}</span>
                    </div>
                  )}
                  {professional.barAssociation && (
                    <div className="flex items-center gap-3">
                      <span className="text-gray-600">Barreau:</span>
                      <span className="font-semibold text-gray-900">{professional.barAssociation}</span>
                    </div>
                  )}
                  {professional.barAdmissionYear && (
                    <div className="flex items-center gap-3">
                      <span className="text-gray-600">Année d'admission:</span>
                      <span className="font-semibold text-gray-900">{professional.barAdmissionYear}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Contact & Booking */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6 space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Contact & Réservation</h3>

              {/* Booking CTA */}
              {professional.isBookableOnline && professional.bookingUrl ? (
                <a href={professional.bookingUrl} target="_blank" rel="noopener noreferrer" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Prendre rendez-vous
                </a>
              ) : (
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  Demander un contact
                </button>
              )}

              {/* Contact Info */}
              <div className="space-y-3 pt-4 border-t">
                {professional.email && (
                  <a href={`mailto:${professional.email}`} className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
                    <Mail className="w-5 h-5" />
                    <span>{professional.email}</span>
                  </a>
                )}
                {professional.phone && (
                  <a href={`tel:${professional.phone}`} className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
                    <Phone className="w-5 h-5" />
                    <span>{professional.phone}</span>
                  </a>
                )}
                {professional.websiteUrl && (
                  <a href={professional.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
                    <ExternalLink className="w-5 h-5" />
                    <span>Site web</span>
                  </a>
                )}
              </div>

              {/* Address */}
              {professional.addressLine1 && (
                <div className="pt-4 border-t">
                  <h4 className="font-semibold text-gray-900 mb-2">Adresse</h4>
                  <div className="text-gray-600 text-sm space-y-1">
                    <p>{professional.addressLine1}</p>
                    {professional.addressLine2 && <p>{professional.addressLine2}</p>}
                    <p>{professional.postalCode} {professional.city}</p>
                    <p>{professional.country}</p>
                  </div>
                </div>
              )}

              {/* Info */}
              <div className="pt-4 border-t space-y-2 text-sm">
                {professional.averageResponseTime && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="font-medium">Temps de réponse:</span>
                    <span>{professional.averageResponseTime}</span>
                  </div>
                )}
                {professional.newClientsAccepted && (
                  <div className="flex items-center gap-2 text-green-600">
                    <span>✓</span>
                    <span>Accepte de nouveaux clients</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Lawyers */}
      <SimilarLawyers currentLawyerId={professional.id} professionalType={professional.professionalType} cityId={professional.cityId} locale={locale} />
    </div>
  );
}

async function SimilarLawyers({ currentLawyerId, professionalType, cityId, locale }: { currentLawyerId: string; professionalType: string | null; cityId: string | null; locale: string }) {
  const similarLawyers = await prisma.legalProfessional.findMany({
    where: {
      id: { not: currentLawyerId },
      ...(professionalType && { professionalType }),
      ...(cityId && { cityId }),
      isActive: true,
    },
    take: 3,
    orderBy: [
      { featured: 'desc' },
      { priorityOrder: 'asc' },
      { createdAt: 'desc' },
    ],
    include: {
      city: true,
      country: true,
    },
  });

  if (similarLawyers.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-bold mb-8">Similar Legal Professionals</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarLawyers.map((lawyer) => {
            const mainImage = lawyer.profilePictureUrl;
            return (
              <Link key={lawyer.id} href={`/${locale}/legal/${lawyer.slug}`} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="aspect-video bg-gray-200 relative">
                  {mainImage && typeof mainImage === 'string' ? (
                    <img src={mainImage} alt={lawyer.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-6xl">
                      ⚖️
                    </div>
                  )}
                  {lawyer.featured && (
                    <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-semibold">
                      Featured
                    </div>
                  )}
                  {lawyer.professionalType && (
                    <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      {lawyer.professionalType}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{lawyer.name}</h3>
                  {lawyer.practiceAreas && Array.isArray(lawyer.practiceAreas) && lawyer.practiceAreas.length > 0 && (
                    <p className="text-sm text-blue-600 font-medium mb-2">
                      {(lawyer.practiceAreas as string[]).slice(0, 2).join(', ')}
                    </p>
                  )}
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {lawyer.city?.name || 'N/A'}, {lawyer.country?.name || 'N/A'}
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-gray-600">
                      💼 {lawyer.yearsOfExperience || 0} years exp.
                    </div>
                    {lawyer.rating && (
                      <div className="text-sm text-gray-600 flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {lawyer.rating.toFixed(1)}
                      </div>
                    )}
                  </div>
                  {lawyer.consultationFee && (
                    <div className="text-2xl font-bold text-blue-600">
                      {lawyer.currency || 'AED'} {lawyer.consultationFee.toLocaleString()}
                      <span className="text-sm text-gray-500 font-normal">/consultation</span>
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
