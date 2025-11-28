import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Calendar, Users, Gauge, Fuel, Settings, MapPin } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;
  
  const motorbike = await prisma.rentalMotorbike.findUnique({
    where: { slug },
  });

  if (!motorbike) {
    return {
      title: 'Motorbike Not Found',
    };
  }

  return {
    title: `${motorbike.brand} ${motorbike.model} ${motorbike.year} - Rent Motorbike | JustRichard`,
    description: motorbike.description,
  };
}

export default async function MotorbikeDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;

  const motorbike = await prisma.rentalMotorbike.findUnique({
    where: { slug },
    include: {
      City: true,
      Country: true,
    },
  });

  if (!motorbike) {
    notFound();
  }

  const images = Array.isArray(motorbike.images) ? motorbike.images : [];
  const features = Array.isArray(motorbike.features) ? motorbike.features : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href={`/${locale}`} className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href={`/${locale}/motorbikes`} className="hover:text-blue-600">Motorbikes</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{motorbike.brand} {motorbike.model}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Title */}
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {motorbike.brand} {motorbike.model} {motorbike.year}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {motorbike.City?.name || 'Location'}, {motorbike.Country?.name}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                  {motorbike.category}
                </span>
              </div>
            </div>

            {/* Main Image */}
            <div className="mb-6">
              <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
                {images.length > 0 && images[0] && typeof images[0] === 'string' ? (
                  <img src={images[0]} alt={`${motorbike.brand} ${motorbike.model}`} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-6xl">
                    🏍️
                  </div>
                )}
              </div>
            </div>

            {/* Gallery */}
            {images.length > 1 && (
              <div className="mb-8">
                <div className="grid grid-cols-4 gap-2">
                  {images.slice(1, 5).map((img: any, idx: number) => (
                    <div key={idx} className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                      <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Specs */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">Specifications</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="text-xs text-gray-500">Seats</div>
                    <div className="font-semibold">{motorbike.seats}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="text-xs text-gray-500">Transmission</div>
                    <div className="font-semibold">{motorbike.transmission}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Fuel className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="text-xs text-gray-500">Fuel Type</div>
                    <div className="font-semibold">{motorbike.fuelType}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Gauge className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="text-xs text-gray-500">Engine Size</div>
                    <div className="font-semibold">{motorbike.engineSize}cc</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="text-xs text-gray-500">Year</div>
                    <div className="font-semibold">{motorbike.year}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-gray-700 whitespace-pre-line">{motorbike.description}</p>
            </div>

            {/* Features */}
            {features.length > 0 && (
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Features</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {features.map((feature: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-4">
              <h3 className="text-2xl font-bold mb-4">Pricing</h3>
              
              <div className="space-y-4 mb-6">
                <div className="border-b pb-3">
                  <div className="text-sm text-gray-500">Per Day</div>
                  <div className="text-3xl font-bold text-orange-600">{motorbike.pricePerDay} {motorbike.currency}</div>
                </div>
                
                {motorbike.pricePerWeek && (
                  <div className="border-b pb-3">
                    <div className="text-sm text-gray-500">Per Week</div>
                    <div className="text-2xl font-bold text-gray-900">{motorbike.pricePerWeek} {motorbike.currency}</div>
                  </div>
                )}
                
                {motorbike.pricePerMonth && (
                  <div className="pb-3">
                    <div className="text-sm text-gray-500">Per Month</div>
                    <div className="text-2xl font-bold text-gray-900">{motorbike.pricePerMonth} {motorbike.currency}</div>
                  </div>
                )}
              </div>

              <button className="w-full bg-orange-600 text-white py-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors mb-3">
                <Calendar className="w-5 h-5 inline mr-2" />
                Book Now
              </button>
              
              <button className="w-full border-2 border-orange-600 text-orange-600 py-4 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
                Contact Us
              </button>

              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Availability</span>
                  <span className={`font-semibold ${motorbike.available ? 'text-green-600' : 'text-red-600'}`}>
                    {motorbike.available ? '✓ Available' : '✗ Not Available'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Motorbikes */}
      <SimilarMotorbikes currentMotorbikeId={motorbike.id} category={motorbike.category} countryId={motorbike.countryId} locale={locale} />
    </div>
  );
}

async function SimilarMotorbikes({ currentMotorbikeId, category, countryId, locale }: { currentMotorbikeId: string; category: string; countryId: string; locale: string }) {
  const similarMotorbikes = await prisma.rentalMotorbike.findMany({
    where: {
      id: { not: currentMotorbikeId },
      category,
      countryId,
      available: true,
    },
    take: 3,
    orderBy: { createdAt: 'desc' },
    include: {
      City: true,
      Country: true,
    },
  });

  if (similarMotorbikes.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-bold mb-8">Similar Motorbikes</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarMotorbikes.map((bike) => {
            const images = Array.isArray(bike.images) ? bike.images : [];
            const mainImage = images.length > 0 && typeof images[0] === 'string' ? images[0] : null;
            return (
              <Link key={bike.id} href={`/${locale}/motorbikes/${bike.slug}`} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="aspect-video bg-gray-200 relative">
                  {mainImage && typeof mainImage === 'string' ? (
                    <img src={mainImage} alt={`${bike.brand} ${bike.model}`} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-6xl">
                      🏍️
                    </div>
                  )}
                  <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    {bike.category}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{bike.brand} {bike.model}</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {bike.City?.name || 'Location'}, {bike.Country?.name}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <Gauge className="w-4 h-4" /> {bike.engineSize}cc
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" /> {bike.seats} seats
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-orange-600">
                    {bike.pricePerDay} {bike.currency}/day
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
