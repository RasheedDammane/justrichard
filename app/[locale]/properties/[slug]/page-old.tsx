import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

interface PropertyDetailPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PropertyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await prisma.property.findUnique({
    where: { slug },
  });

  if (!property) {
    return { title: 'Property Not Found' };
  }

  return {
    title: property.seoTitle || `${property.title} | Properties`,
    description: property.seoDescription || property.description || '',
  };
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { locale, slug } = await params;

  const property = await prisma.property.findUnique({
    where: { slug },
    include: {
      city: true,
      country: true,
      priceCurrency: true,
      media: {
        include: { media: true },
        orderBy: { order: 'asc' },
      },
      features: {
        include: { feature: true },
      },
      owner: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
  });

  if (!property) {
    notFound();
  }

  // Increment views
  await prisma.property.update({
    where: { id: property.id },
    data: { views: { increment: 1 } },
  });

  const pricePerSqm = property.areaSize && property.price
    ? Math.round(property.price / property.areaSize)
    : null;

  const coverImage = property.media[0]?.media;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href={`/${locale}`} className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href={`/${locale}/properties`} className="hover:text-blue-600">Properties</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{property.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded">
                  {property.type}
                </span>
                {property.isFeatured && (
                  <span className="bg-yellow-100 text-yellow-700 text-sm px-3 py-1 rounded">
                    ⭐ Featured
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {property.title}
              </h1>

              {property.subtitle && (
                <p className="text-xl text-gray-600 mb-4">{property.subtitle}</p>
              )}

              <div className="flex items-center text-gray-600 mb-6">
                <span className="mr-2">📍</span>
                <span>
                  {property.addressLine1}
                  {property.city && `, ${property.city.name}`}
                  {property.country && `, ${property.country.name}`}
                </span>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Photos</h2>
              {coverImage ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <img 
                      src={coverImage.url} 
                      alt={property.title || 'Property'} 
                      className="w-full h-96 object-cover rounded-lg"
                    />
                  </div>
                  {property.media.slice(1, 5).map((pm, idx) => (
                    <img 
                      key={idx}
                      src={pm.media.url} 
                      alt={`Photo ${idx + 2}`} 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 h-96 rounded-lg flex items-center justify-center">
                  <span className="text-6xl">
                    {property.type === 'RENT' ? '🏠' : property.type === 'SALE' ? '🏡' : '🏢'}
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            {property.description && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-700 whitespace-pre-line">{property.description}</p>
              </div>
            )}

            {/* Details */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Details</h2>
              <div className="grid grid-cols-2 gap-4">
                {property.bedrooms && (
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">🛏️ Bedrooms:</span>
                    <span className="font-medium">{property.bedrooms}</span>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">🚿 Bathrooms:</span>
                    <span className="font-medium">{property.bathrooms}</span>
                  </div>
                )}
                {property.areaSize && (
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">📐 Area:</span>
                    <span className="font-medium">{property.areaSize} {property.areaUnit}</span>
                  </div>
                )}
                {property.parkingSpaces && (
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">🚗 Parking:</span>
                    <span className="font-medium">{property.parkingSpaces} spaces</span>
                  </div>
                )}
                {property.yearBuilt && (
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">📅 Year Built:</span>
                    <span className="font-medium">{property.yearBuilt}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Features */}
            {property.features.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Features & Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.features.map((pf) => (
                    <div key={pf.featureId} className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span className="text-gray-700 capitalize">
                        {pf.feature.key.replace(/-/g, ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Price Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 sticky top-4">
              <div className="mb-6">
                <div className="text-sm text-gray-600 mb-1">Price</div>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {property.priceCurrency?.symbol || '$'}{property.price?.toLocaleString()}
                </div>
                {property.pricePostfix && (
                  <div className="text-sm text-gray-500">{property.pricePostfix}</div>
                )}
                {pricePerSqm && (
                  <div className="text-sm text-gray-600 mt-2">
                    {property.priceCurrency?.symbol || '$'}{pricePerSqm.toLocaleString()}/{property.areaUnit}
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="space-y-3 mb-6">
                {property.bedrooms && (
                  <div className="flex items-center text-sm">
                    <span className="text-gray-600 mr-2">🛏️</span>
                    <span className="text-gray-900">{property.bedrooms} Bedrooms</span>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex items-center text-sm">
                    <span className="text-gray-600 mr-2">🚿</span>
                    <span className="text-gray-900">{property.bathrooms} Bathrooms</span>
                  </div>
                )}
                {property.areaSize && (
                  <div className="flex items-center text-sm">
                    <span className="text-gray-600 mr-2">📐</span>
                    <span className="text-gray-900">{property.areaSize} {property.areaUnit}</span>
                  </div>
                )}
              </div>

              {/* Contact */}
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Contact Agent
                </button>
                <button className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                  Schedule Visit
                </button>
              </div>

              {/* Views */}
              <div className="mt-6 pt-6 border-t text-sm text-gray-500 text-center">
                👁️ {property.views} views
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
