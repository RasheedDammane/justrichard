import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Calendar, Users, Gauge, Fuel, Settings, MapPin, CheckCircle, XCircle } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;
  
  const car = await prisma.rentalCar.findUnique({
    where: { slug },
  });

  if (!car) {
    return {
      title: 'Car Not Found',
    };
  }

  return {
    title: `${car.brand} ${car.model} ${car.year} - Rent in Dubai | JustRichard`,
    description: car.shortDescription || car.description,
  };
}

export default async function RentalCarDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;

  const car = await prisma.rentalCar.findUnique({
    where: { slug },
    include: {
      City: true,
      Country: true,
    },
  });

  if (!car) {
    notFound();
  }

  const images = Array.isArray(car.images) ? car.images : [];
  const features = Array.isArray(car.features) ? car.features : [];
  const carFeatures = Array.isArray(car.carFeatures) ? car.carFeatures : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href={`/${locale}`} className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href={`/${locale}/rental-cars`} className="hover:text-blue-600">Rental Cars</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{car.brand} {car.model}</span>
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
                {car.brand} {car.model} {car.year}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {car.City?.name}, {car.Country?.name}
                </span>
                <span className="flex items-center gap-1">
                  ⭐ {car.rating?.toFixed(1)} ({car.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Main Image */}
            <div className="mb-6">
              <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
                {car.mainImage ? (
                  <img src={car.mainImage} alt={`${car.brand} ${car.model}`} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-6xl">
                    🚗
                  </div>
                )}
              </div>
            </div>

            {/* Gallery */}
            {images.length > 0 && (
              <div className="mb-8">
                <div className="grid grid-cols-4 gap-2">
                  {images.slice(0, 4).map((img: any, idx: number) => (
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-xs text-gray-500">Seats</div>
                    <div className="font-semibold">{car.seats}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-xs text-gray-500">Transmission</div>
                    <div className="font-semibold">{car.transmission}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Fuel className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-xs text-gray-500">Fuel Type</div>
                    <div className="font-semibold">{car.fuelType}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Gauge className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-xs text-gray-500">Doors</div>
                    <div className="font-semibold">{car.doors}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-gray-700 whitespace-pre-line">{car.description}</p>
            </div>

            {/* Features */}
            {carFeatures.length > 0 && (
              <div className="bg-white rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">Features</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {carFeatures.map((feature: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rental Terms */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Rental Terms</h2>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span>Minimum Age:</span>
                  <span className="font-semibold">{car.minAge} years</span>
                </div>
                <div className="flex justify-between">
                  <span>Minimum Rental Days:</span>
                  <span className="font-semibold">{car.minDays} day(s)</span>
                </div>
                <div className="flex justify-between">
                  <span>Daily Mileage:</span>
                  <span className="font-semibold">{car.mileagePerDay} km/day</span>
                </div>
                <div className="flex justify-between">
                  <span>Extra KM Fee:</span>
                  <span className="font-semibold">{car.extraKmFee} {car.currency}/km</span>
                </div>
                <div className="flex justify-between">
                  <span>Deposit:</span>
                  <span className="font-semibold">
                    {car.noDeposit ? 'No Deposit' : `${car.deposit} ${car.currency}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Free Delivery:</span>
                  <span className="font-semibold">
                    {car.freeDelivery ? <CheckCircle className="w-5 h-5 text-green-600 inline" /> : <XCircle className="w-5 h-5 text-red-600 inline" />}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-4">
              <h3 className="text-2xl font-bold mb-4">Pricing</h3>
              
              <div className="space-y-4 mb-6">
                <div className="border-b pb-3">
                  <div className="text-sm text-gray-500">Per Day</div>
                  <div className="text-3xl font-bold text-blue-600">{car.pricePerDay} {car.currency}</div>
                </div>
                
                {car.pricePerWeek && (
                  <div className="border-b pb-3">
                    <div className="text-sm text-gray-500">Per Week</div>
                    <div className="text-2xl font-bold text-gray-900">{car.pricePerWeek} {car.currency}</div>
                  </div>
                )}
                
                {car.pricePerMonth && (
                  <div className="pb-3">
                    <div className="text-sm text-gray-500">Per Month</div>
                    <div className="text-2xl font-bold text-gray-900">{car.pricePerMonth} {car.currency}</div>
                  </div>
                )}
              </div>

              <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-3">
                <Calendar className="w-5 h-5 inline mr-2" />
                Book Now
              </button>
              
              <button className="w-full border-2 border-blue-600 text-blue-600 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Contact Provider
              </button>

              {car.providerName && (
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold mb-2">Provider</h4>
                  <div className="text-sm text-gray-700">
                    <div className="font-medium">{car.providerName}</div>
                    {car.providerRating && (
                      <div className="text-gray-600 mt-1">
                        ⭐ {car.providerRating.toFixed(1)} ({car.providerReviews} reviews)
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Similar Cars */}
      <SimilarCars currentCarId={car.id} category={car.category} cityId={car.cityId} locale={locale} />
    </div>
  );
}

async function SimilarCars({ currentCarId, category, cityId, locale }: { currentCarId: string; category: any; cityId: string; locale: string }) {
  const similarCars = await prisma.rentalCar.findMany({
    where: {
      id: { not: currentCarId },
      category,
      cityId,
      isActive: true,
      isAvailable: true,
    },
    take: 3,
    orderBy: { createdAt: 'desc' },
    include: {
      City: true,
      Country: true,
    },
  });

  if (similarCars.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-bold mb-8">Similar Cars</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarCars.map((vehicle) => {
            const images = Array.isArray(vehicle.images) ? vehicle.images : [];
            const mainImage = vehicle.mainImage || (images.length > 0 && typeof images[0] === 'string' ? images[0] : null);
            return (
              <Link key={vehicle.id} href={`/${locale}/rental-cars/${vehicle.slug}`} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="aspect-video bg-gray-200 relative">
                  {mainImage && typeof mainImage === 'string' ? (
                    <img src={mainImage} alt={`${vehicle.brand} ${vehicle.model}`} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-6xl">
                      🚗
                    </div>
                  )}
                  {vehicle.isFeatured && (
                    <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-semibold">
                      Featured
                    </div>
                  )}
                  {vehicle.isNewArrival && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      New
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{vehicle.brand} {vehicle.model}</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {vehicle.City?.name}, {vehicle.Country?.name}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" /> {vehicle.seats}
                    </span>
                    <span className="flex items-center gap-1">
                      <Settings className="w-4 h-4" /> {vehicle.transmission}
                    </span>
                    <span className="flex items-center gap-1">
                      <Fuel className="w-4 h-4" /> {vehicle.fuelType}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-blue-600">
                      {vehicle.pricePerDay} {vehicle.currency}
                    </div>
                    <div className="text-sm text-gray-500">
                      /day
                    </div>
                  </div>
                  {vehicle.rating && (
                    <div className="mt-2 text-sm text-gray-600">
                      ⭐ {vehicle.rating.toFixed(1)} ({vehicle.reviewCount} reviews)
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
