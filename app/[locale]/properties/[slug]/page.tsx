import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { 
  MapPin, Bed, Bath, Maximize, Car, Calendar, 
  Share2, Heart, Mail, Phone, MessageCircle,
  Check, Home, Building, DollarSign, TrendingUp
} from 'lucide-react';
import Image from 'next/image';

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
          phone: true,
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
  const thumbnails = property.media.slice(1, 4);

  // Feature icons mapping
  const featureIcons: Record<string, any> = {
    'Pool': '🏊',
    'Swimming Pool': '🏊',
    'Parking': '🚗',
    'Garden': '🌳',
    'Security': '🔒',
    'Furnished': '🛋️',
    'Kitchen': '🍳',
    'Balcony': '🏡',
    'Terrace': '🌅',
    'Beach': '🏖️',
    'Gym': '💪',
    'Air Conditioning': '❄️',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Gallery */}
      <div className="relative bg-white shadow-sm">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <div className="grid grid-cols-12 gap-2 h-[600px]">
            {/* Main Image */}
            <div className="col-span-12 md:col-span-8 relative rounded-xl overflow-hidden group">
              {coverImage ? (
                <img
                  src={coverImage.url}
                  alt={property.title || ''}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <Home className="w-20 h-20 text-gray-400" />
                </div>
              )}
              
              {/* Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-white/10 text-[120px] font-bold tracking-wider">
                  JUSTRICHARD
                </div>
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                {property.isFeatured && (
                  <span className="bg-white shadow-lg px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1.5 border border-gray-200">
                    <span className="text-green-600">✓</span> TruCheck™
                  </span>
                )}
                <span className="bg-white shadow-lg px-4 py-2 rounded-full text-sm font-semibold border border-gray-200">
                  {property.type === 'SALE' ? 'Off-Plan' : property.type}
                </span>
              </div>

              {/* Actions */}
              <div className="absolute bottom-4 left-4 flex gap-2">
                <button className="bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-white transition-all shadow-lg border border-gray-200 font-medium text-sm">
                  <MapPin className="w-4 h-4" />
                  Map
                </button>
                <button className="bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-white transition-all shadow-lg border border-gray-200 font-medium text-sm">
                  Request video
                </button>
              </div>

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg text-white text-sm font-medium flex items-center gap-1.5 shadow-lg">
                <span className="text-lg">📷</span> {property.media.length}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="col-span-12 md:col-span-4 grid grid-rows-3 gap-2">
              {thumbnails.map((pm, idx) => (
                <div key={pm.id} className="relative rounded-xl overflow-hidden group cursor-pointer">
                  <img
                    src={pm.media.url}
                    alt={`${property.title} ${idx + 2}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                </div>
              ))}
              {thumbnails.length < 3 && (
                <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">More photos</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Price & Title */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="text-4xl font-bold text-gray-900 mb-3 flex items-baseline gap-2">
                    <span className="text-sm font-normal text-gray-500">{property.priceCurrency?.code || 'AED'}</span>
                    <span>{property.price?.toLocaleString()}</span>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-3">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-gray-600 text-base">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{property.addressLine1}, {property.city?.name}, {property.country?.name}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="p-3 border-2 border-gray-200 rounded-xl hover:bg-teal-50 hover:border-teal-500 transition-all group">
                    <Heart className="w-5 h-5 text-gray-600 group-hover:text-teal-600" />
                  </button>
                  <button className="p-3 border-2 border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-500 transition-all group">
                    <Share2 className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-8 py-5 border-t border-b border-gray-200">
                {property.bedrooms && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <Bed className="w-5 h-5 text-gray-700" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Bedrooms</div>
                      <div className="font-semibold text-gray-900">{property.bedrooms}</div>
                    </div>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <Bath className="w-5 h-5 text-gray-700" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Bathrooms</div>
                      <div className="font-semibold text-gray-900">{property.bathrooms}</div>
                    </div>
                  </div>
                )}
                {property.areaSize && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <Maximize className="w-5 h-5 text-gray-700" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Area</div>
                      <div className="font-semibold text-gray-900">{property.areaSize.toLocaleString()} {property.areaUnit}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Highlights */}
              {(property.subtitle || property.pricePostfix) && (
                <div className="mt-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-3">
                    {property.pricePostfix || property.subtitle}
                  </h3>
                  {property.description && (
                    <div className="text-gray-600 text-sm leading-relaxed">
                      {property.description.substring(0, 200)}...
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Description */}
            {property.description && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <div className="text-gray-700 whitespace-pre-line">
                  {property.description}
                </div>
              </div>
            )}

            {/* Property Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Property Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">Type</span>
                  <span className="font-medium">{property.type}</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">Purpose</span>
                  <span className="font-medium">For {property.type}</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">Reference no.</span>
                  <span className="font-medium">{property.propertyCode || property.id.substring(0, 10)}</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">Added on</span>
                  <span className="font-medium">{new Date(property.createdAt).toLocaleDateString()}</span>
                </div>
                {property.yearBuilt && (
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-gray-600">Completion</span>
                    <span className="font-medium">{property.yearBuilt}</span>
                  </div>
                )}
                {pricePerSqm && (
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-gray-600">Price per sqm</span>
                    <span className="font-medium">{property.priceCurrency?.code} {pricePerSqm.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Features & Amenities */}
            {property.features.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Features / Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {property.features.slice(0, 8).map((pf) => (
                    <div key={pf.featureId} className="flex flex-col items-center text-center p-4 border rounded-lg">
                      <div className="text-3xl mb-2">
                        {featureIcons[pf.feature.key] || '✓'}
                      </div>
                      <span className="text-sm font-medium">{pf.feature.key}</span>
                    </div>
                  ))}
                </div>
                {property.features.length > 8 && (
                  <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium">
                    + {property.features.length - 8} more amenities
                  </button>
                )}
              </div>
            )}

            {/* Location Map */}
            {property.latitude && property.longitude && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Map: {property.latitude}, {property.longitude}</p>
                    <p className="text-sm text-gray-500 mt-2">Leaflet map will be integrated here</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Card */}
            {property.owner && (
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-4 border border-gray-100">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                    <span className="text-3xl font-bold text-white">
                      {property.owner.firstName?.[0]}{property.owner.lastName?.[0]}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-gray-900 mb-2">
                      {property.owner.firstName} {property.owner.lastName}
                    </h3>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="bg-teal-50 text-teal-700 px-2 py-1 rounded-full font-medium flex items-center gap-1">
                          <span className="text-teal-600">✓</span> Quality Lister
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full font-medium flex items-center gap-1">
                          <span>📞</span> Responsive Broker
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-sm">
                    <Mail className="w-5 h-5" />
                    Email
                  </button>
                  <button className="w-full border-2 border-gray-900 text-gray-900 py-3.5 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                    <Phone className="w-5 h-5" />
                    Call
                  </button>
                  <button className="w-full bg-green-500 text-white py-3.5 rounded-xl font-semibold hover:bg-green-600 transition-all flex items-center justify-center gap-2 shadow-sm">
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1 group">
                    View all properties 
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            )}

            {/* Location Info */}
            {property.city && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-lg mb-3">{property.city.name}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  See the community attractions and lifestyle
                </p>
                <div className="aspect-video bg-gray-100 rounded-lg"></div>
              </div>
            )}

            {/* Useful Links */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-lg mb-4">Useful Links</h3>
              <div className="space-y-2">
                <Link href={`/${locale}/properties`} className="block text-sm text-blue-600 hover:text-blue-700">
                  Properties for sale in {property.country?.name}
                </Link>
                <Link href={`/${locale}/properties`} className="block text-sm text-blue-600 hover:text-blue-700">
                  Properties for sale in {property.city?.name}
                </Link>
                {property.bedrooms && (
                  <Link href={`/${locale}/properties`} className="block text-sm text-blue-600 hover:text-blue-700">
                    {property.bedrooms} Bedroom Properties for sale
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Properties */}
      <SimilarProperties currentPropertyId={property.id} cityId={property.cityId} propertyType={property.type} locale={locale} />
    </div>
  );
}

async function SimilarProperties({ currentPropertyId, cityId, propertyType, locale }: { currentPropertyId: string; cityId: string; propertyType: string; locale: string }) {
  const similarProperties = await prisma.property.findMany({
    where: {
      id: { not: currentPropertyId },
      cityId,
      type: propertyType,
      status: 'PUBLISHED',
    },
    take: 3,
    orderBy: { createdAt: 'desc' },
    include: {
      city: true,
      country: true,
      priceCurrency: true,
      media: {
        include: { media: true },
        orderBy: { order: 'asc' },
        take: 1,
      },
    },
  });

  if (similarProperties.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-bold mb-8">Similar Properties</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarProperties.map((prop) => {
            const mainImage = prop.media[0]?.media?.url;
            return (
              <Link key={prop.id} href={`/${locale}/properties/${prop.slug}`} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="aspect-video bg-gray-200 relative">
                  {mainImage ? (
                    <Image src={mainImage} alt={prop.title} fill className="object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-4xl">
                      <Home />
                    </div>
                  )}
                  {prop.isFeatured && (
                    <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-semibold">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-1">{prop.title}</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {prop.city?.name}, {prop.country?.name}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    {prop.bedrooms && (
                      <span className="flex items-center gap-1">
                        <Bed className="w-4 h-4" /> {prop.bedrooms}
                      </span>
                    )}
                    {prop.bathrooms && (
                      <span className="flex items-center gap-1">
                        <Bath className="w-4 h-4" /> {prop.bathrooms}
                      </span>
                    )}
                    {prop.area && (
                      <span className="flex items-center gap-1">
                        <Maximize className="w-4 h-4" /> {prop.area}m²
                      </span>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {prop.price?.toLocaleString()} {prop.priceCurrency?.code}
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
