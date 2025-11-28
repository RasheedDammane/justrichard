import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Truck, MapPin, Package, Clock, Star, Check, ArrowRight } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await prisma.movingService.findUnique({
    where: { slug },
  });

  if (!service) {
    return { title: 'Service Not Found' };
  }

  return {
    title: service.metaTitle || `${service.name} | Moving Services`,
    description: service.metaDescription || service.shortDescription,
  };
}

export default async function MovingServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  
  const service = await prisma.movingService.findUnique({
    where: { slug, isActive: true },
  });

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <Link href={`/${locale}/services/moving`} className="hover:underline">
              Moving Services
            </Link>
            <span>/</span>
            <span>{service.name}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.name}</h1>
          <p className="text-xl mb-6">{service.shortDescription}</p>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              <span className="text-2xl font-bold">{service.rating.toFixed(1)}</span>
            </div>
            <div className="text-lg">
              {service.totalBookings} bookings completed
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white p-8 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">About This Service</h2>
              <p className="text-gray-700 whitespace-pre-line">{service.description}</p>
            </div>

            {/* Services Included */}
            <div className="bg-white p-8 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-6">Services Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.packingIncluded && (
                  <div className="flex items-center gap-3">
                    <Check className="w-6 h-6 text-green-600" />
                    <span>Professional Packing</span>
                  </div>
                )}
                {service.unpackingIncluded && (
                  <div className="flex items-center gap-3">
                    <Check className="w-6 h-6 text-green-600" />
                    <span>Unpacking Service</span>
                  </div>
                )}
                {service.assemblyIncluded && (
                  <div className="flex items-center gap-3">
                    <Check className="w-6 h-6 text-green-600" />
                    <span>Furniture Assembly</span>
                  </div>
                )}
                {service.storageAvailable && (
                  <div className="flex items-center gap-3">
                    <Check className="w-6 h-6 text-green-600" />
                    <span>Storage Available</span>
                  </div>
                )}
              </div>
            </div>

            {/* Vehicle Types */}
            {service.vehicleTypes && service.vehicleTypes.length > 0 && (
              <div className="bg-white p-8 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-6">Available Vehicles</h2>
                <div className="flex flex-wrap gap-3">
                  {(service.vehicleTypes as string[]).map((vehicle, index) => (
                    <div key={index} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg flex items-center gap-2">
                      <Truck className="w-5 h-5" />
                      {vehicle}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Coverage Areas */}
            {service.coverageAreas && service.coverageAreas.length > 0 && (
              <div className="bg-white p-8 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-6">Coverage Areas</h2>
                <div className="flex flex-wrap gap-3">
                  {(service.coverageAreas as string[]).map((area, index) => (
                    <div key={index} className="px-4 py-2 bg-green-100 text-green-800 rounded-lg flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      {area}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg sticky top-4">
              <h3 className="text-xl font-bold mb-4">Pricing</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600">Base Price</div>
                  <div className="text-3xl font-bold text-blue-600">
                    {service.basePrice} {service.currency}
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Per Kilometer</span>
                    <span className="font-semibold">{service.pricePerKm} {service.currency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Per Cubic Meter</span>
                    <span className="font-semibold">{service.pricePerCubicM} {service.currency}</span>
                  </div>
                  {service.pricePerHour && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Per Hour</span>
                      <span className="font-semibold">{service.pricePerHour} {service.currency}</span>
                    </div>
                  )}
                </div>

                <Link
                  href={`/${locale}/services/moving/quote?service=${service.id}`}
                  className="block w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-center flex items-center justify-center gap-2"
                >
                  Get Free Quote
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Working Hours */}
            {service.workingHours && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Working Hours
                </h3>
                <div className="text-gray-700">
                  {(service.workingHours as any).start} - {(service.workingHours as any).end}
                </div>
              </div>
            )}

            {/* Partner Info */}
            {service.partnerName && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-bold mb-2">Service Provider</h3>
                <p className="text-gray-700">{service.partnerName}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
