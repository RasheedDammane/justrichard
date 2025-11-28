import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import dynamic from 'next/dynamic';

// Dynamic imports for client components
const PropertyMap = dynamic(() => import('../PropertyMap'), { ssr: false });
const YieldCalculator = dynamic(() => import('../YieldCalculator'), { ssr: false });

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
    return {
      title: 'Property Not Found',
    };
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
        include: {
          media: true,
        },
        orderBy: { order: 'asc' },
      },
      features: {
        include: {
          feature: true,
        },
      },
      floorPlans: {
        include: {
          image: true,
          priceCurrency: true,
        },
        orderBy: { order: 'asc' },
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

  // Increment view count
  await prisma.property.update({
    where: { id: property.id },
    data: { views: { increment: 1 } },
  });

  // Calculate price per m²
  const pricePerSqm = property.areaSize && property.price
    ? Math.round(property.price / property.areaSize)
    : null;

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
            <Link href={`/${locale}/properties`} className="hover:text-orange-600">
              Properties
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{property.title}</span>
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
                  {property.type}
                </span>
                {property.isFeatured && (
                  <span className="inline-block bg-yellow-100 text-yellow-700 text-sm px-3 py-1 rounded">
                    ⭐ Featured
                  </span>
                )}
                {property.rating && (
                  <span className="inline-block bg-green-100 text-green-700 text-sm px-3 py-1 rounded">
                    ★ {property.rating}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {property.name}
              </h1>

              {/* Location */}
              <div className="flex items-center text-gray-600 mb-6">
                <span className="mr-2">📍</span>
                <span>{property.address || `${property.City.name}, ${property.Country.name}`}</span>
              </div>

              {/* Image Placeholder */}
              <div className="relative h-96 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg mb-6 flex items-center justify-center">
                <div className="text-9xl">
                  {property.type === 'Villa' ? '🏡' : 
                   property.type === 'Condo' ? '🏢' :
                   property.type === 'House' ? '🏠' :
                   property.type === 'Penthouse' ? '🏙️' :
                   property.type === 'Studio' ? '🛏️' : '🏘️'}
                </div>
              </div>

              {/* Description */}
              <div className="prose max-w-none mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>

              {/* Specifications */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Property Details</h3>
                  <div className="space-y-2 text-sm">
                    {property.bedrooms && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bedrooms:</span>
                        <span className="font-medium">{property.bedrooms}</span>
                      </div>
                    )}
                    {property.bathrooms && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bathrooms:</span>
                        <span className="font-medium">{property.bathrooms}</span>
                      </div>
                    )}
                    {property.area && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Area:</span>
                        <span className="font-medium">{property.area} m²</span>
                      </div>
                    )}
                    {property.floor && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Floor:</span>
                        <span className="font-medium">{property.floor}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Furnished:</span>
                      <span className="font-medium">{property.furnished ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Pricing</h3>
                  <div className="space-y-2 text-sm">
                    {property.listingType === 'sale' && property.salePrice && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sale Price:</span>
                        <span className="font-medium text-lg">{property.currency} {property.salePrice.toLocaleString()}</span>
                      </div>
                    )}
                    {property.listingType === 'rent' && property.rentPrice && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rent Price:</span>
                        <span className="font-medium text-lg">{property.currency} {property.rentPrice.toLocaleString()}/month</span>
                      </div>
                    )}
                    {property.secondPrice && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Alternative Price:</span>
                        <span className="font-medium">{property.currency} {property.secondPrice.toLocaleString()}</span>
                      </div>
                    )}
                    {pricePerSqm && (
                      <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                        <span className="text-gray-600">Price per m²:</span>
                        <span className="font-medium text-orange-600">{property.currency} {pricePerSqm.toLocaleString()}/m²</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Features */}
              {features.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Features</h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    {features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-center text-gray-700">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Amenities */}
              {amenities.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Amenities</h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    {amenities.map((amenity: string, idx: number) => (
                      <div key={idx} className="flex items-center text-gray-700">
                        <span className="text-blue-600 mr-2">✓</span>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="border-t border-gray-200 pt-4 mt-6">
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <span>👁️</span>
                    <span>{property.views} views</span>
                  </div>
                  {property.bookings > 0 && (
                    <div className="flex items-center gap-1">
                      <span>📅</span>
                      <span>{property.bookings} bookings</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Map */}
            {property.latitude && property.longitude && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">📍 Location</h2>
                <PropertyMap
                  latitude={property.latitude}
                  longitude={property.longitude}
                  propertyName={property.name}
                  address={property.address || undefined}
                />
              </div>
            )}

            {/* Yield Calculator */}
            <div className="mb-6">
              <YieldCalculator
                pricePerMonth={property.pricePerMonth || undefined}
                propertyPrice={property.pricePerMonth ? property.pricePerMonth * 12 * 10 : undefined}
                currency={property.currency}
              />
            </div>
          </main>

          {/* Sidebar */}
          <aside className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              {/* Price */}
              <div className="mb-6">
                <div className="text-sm text-gray-600 mb-1">From</div>
                <div className="text-4xl font-bold text-orange-600 mb-2">
                  ฿{property.pricePerNight?.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">per night</div>
                {property.pricePerMonth && (
                  <div className="text-sm text-gray-600 mt-2">
                    Monthly: ฿{property.pricePerMonth.toLocaleString()}
                  </div>
                )}
                {pricePerSqm && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="text-xs text-gray-500">Price per m²</div>
                    <div className="text-xl font-bold text-orange-600">฿{pricePerSqm.toLocaleString()}/m²</div>
                  </div>
                )}
              </div>

              {/* Quick Info */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center text-sm">
                  <span className="text-gray-600 mr-2">🏠</span>
                  <span className="text-gray-900">{property.type}</span>
                </div>
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
                {property.area && (
                  <div className="flex items-center text-sm">
                    <span className="text-gray-600 mr-2">📐</span>
                    <span className="text-gray-900">{property.area} m²</span>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <button className="w-full bg-orange-500 text-white py-4 rounded-lg hover:bg-orange-600 transition-colors font-semibold text-lg mb-4">
                Book Now
              </button>

              {/* Trust Badges */}
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Verified property</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Instant confirmation</span>
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
    </div>
  );
}
