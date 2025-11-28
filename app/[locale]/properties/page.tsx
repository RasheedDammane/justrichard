import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import PropertyFilters from './PropertyFilters';

interface PropertiesPageProps {
  params: { locale: string };
  searchParams: { type?: string; minPrice?: string; maxPrice?: string; bedrooms?: string };
}

async function getProperties(filters: {
  type?: string;
  minPrice?: string;
  maxPrice?: string;
  bedrooms?: string;
}) {
  const where: any = {
    status: { in: ['PUBLISHED', 'DRAFT'] },
  };

  if (filters.type) {
    where.type = filters.type;
  }

  if (filters.bedrooms) {
    where.bedrooms = { gte: parseInt(filters.bedrooms) };
  }

  if (filters.minPrice || filters.maxPrice) {
    where.price = {};
    if (filters.minPrice) {
      where.price.gte = parseFloat(filters.minPrice);
    }
    if (filters.maxPrice) {
      where.price.lte = parseFloat(filters.maxPrice);
    }
  }

  const properties = await prisma.property.findMany({
    where,
    include: {
      city: true,
      country: true,
      priceCurrency: true,
      media: {
        include: {
          media: true,
        },
        orderBy: { order: 'asc' },
        take: 1,
      },
      _count: {
        select: {
          media: true,
        },
      },
    },
    orderBy: [
      { isFeatured: 'desc' },
      { createdAt: 'desc' },
    ],
    take: 50,
  });

  return properties;
}

export default async function PropertiesPage({ params, searchParams }: PropertiesPageProps) {
  const { locale } = params;
  const properties = await getProperties(searchParams);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <h1 className="text-5xl font-bold mb-4">Properties in Thailand</h1>
          <p className="text-xl text-orange-100">
            Find your perfect accommodation • {properties.length} properties available
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Filters</h2>
              <Suspense fallback={<div>Loading filters...</div>}>
                <PropertyFilters />
              </Suspense>
            </div>
          </aside>

          {/* Properties Grid */}
          <main className="lg:w-3/4">
            {properties.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-6xl mb-4">🏠</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">No properties found</h3>
                <p className="text-gray-600">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {properties.map((property) => {
                  const coverImage = property.media[0]?.media;
                  const pricePerSqm = property.areaSize && property.price 
                    ? Math.round(property.price / property.areaSize)
                    : null;
                  
                  return (
                    <Link
                      key={property.id}
                      href={`/${locale}/properties/${property.slug}`}
                      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                    >
                      {/* Image */}
                      <div className="relative h-64 bg-gradient-to-br from-blue-100 to-blue-200">
                        {coverImage ? (
                          <img 
                            src={coverImage.url} 
                            alt={property.title || 'Property'} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-6xl">
                            {property.type === 'RENT' ? '🏠' : 
                             property.type === 'SALE' ? '🏡' :
                             property.type === 'DAILY' ? '🏢' : '🏘️'}
                          </div>
                        )}
                        {property.isFeatured && (
                          <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                            ⭐ Featured
                          </div>
                        )}
                        <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-semibold">
                          {property._count.media} photos
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Type Badge */}
                        <div className="mb-3 flex items-center gap-2">
                          <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                            {property.type}
                          </span>
                          {property.city && (
                            <span className="text-xs text-gray-500">
                              📍 {property.city.name}, {property.country?.name}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {property.title}
                        </h3>

                        {/* Subtitle */}
                        {property.subtitle && (
                          <p className="text-gray-600 text-sm mb-3 line-clamp-1">
                            {property.subtitle}
                          </p>
                        )}

                        {/* Description */}
                        {property.description && (
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {property.description}
                          </p>
                        )}

                        {/* Specs */}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                          {property.bedrooms && (
                            <div className="flex items-center gap-1">
                              <span>🛏️</span>
                              <span>{property.bedrooms} Beds</span>
                            </div>
                          )}
                          {property.bathrooms && (
                            <div className="flex items-center gap-1">
                              <span>🚿</span>
                              <span>{property.bathrooms} Baths</span>
                            </div>
                          )}
                          {property.areaSize && (
                            <div className="flex items-center gap-1">
                              <span>📐</span>
                              <span>{property.areaSize} {property.areaUnit}</span>
                            </div>
                          )}
                        </div>

                        {/* Price */}
                        <div className="border-t border-gray-200 pt-4 mt-4">
                          <div className="flex items-end justify-between">
                            <div>
                              <div className="text-sm text-gray-500">Price</div>
                              <div className="text-2xl font-bold text-blue-600">
                                {property.priceCurrency?.symbol || '$'}{property.price?.toLocaleString()}
                              </div>
                              {property.pricePostfix && (
                                <div className="text-xs text-gray-500">{property.pricePostfix}</div>
                              )}
                            </div>
                            <div className="text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                              View Details →
                            </div>
                          </div>
                          {pricePerSqm && (
                            <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-100 mt-3">
                              <span className="text-gray-600">Price per m²:</span>
                              <span className="font-semibold text-orange-600">฿{pricePerSqm.toLocaleString()}/m²</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
