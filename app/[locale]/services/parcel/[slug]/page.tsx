import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Package, MapPin, Star, Check, ArrowRight, Zap, Globe, Shield } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await prisma.parcelService.findUnique({
    where: { slug },
  });

  if (!service) {
    return { title: 'Service Not Found' };
  }

  return {
    title: service.metaTitle || `${service.name} | Parcel Delivery`,
    description: service.metaDescription || service.shortDescription,
  };
}

export default async function ParcelServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  
  const service = await prisma.parcelService.findUnique({
    where: { slug, isActive: true },
  });

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <Link href={`/${locale}/services/parcel`} className="hover:underline">
              Parcel Services
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
              {service.totalDeliveries} deliveries completed
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

            {/* Features */}
            <div className="bg-white p-8 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-6">Service Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.expressAvailable && (
                  <div className="flex items-center gap-3">
                    <Zap className="w-6 h-6 text-orange-600" />
                    <span>Express Delivery</span>
                  </div>
                )}
                {service.sameDay && (
                  <div className="flex items-center gap-3">
                    <Check className="w-6 h-6 text-red-600" />
                    <span>Same Day Delivery</span>
                  </div>
                )}
                {service.nextDay && (
                  <div className="flex items-center gap-3">
                    <Check className="w-6 h-6 text-blue-600" />
                    <span>Next Day Delivery</span>
                  </div>
                )}
                {service.international && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-6 h-6 text-purple-600" />
                    <span>International Shipping</span>
                  </div>
                )}
                {service.trackingAvailable && (
                  <div className="flex items-center gap-3">
                    <Check className="w-6 h-6 text-green-600" />
                    <span>Real-time Tracking</span>
                  </div>
                )}
                {service.insuranceAvailable && (
                  <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-blue-600" />
                    <span>Insurance Available</span>
                  </div>
                )}
              </div>
            </div>

            {/* Package Limits */}
            <div className="bg-white p-8 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-6">Package Limits</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Max Weight</div>
                  <div className="text-2xl font-bold text-purple-600">{service.maxWeight} kg</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Max Length</div>
                  <div className="text-2xl font-bold text-purple-600">{service.maxLength} cm</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Max Width</div>
                  <div className="text-2xl font-bold text-purple-600">{service.maxWidth} cm</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Max Height</div>
                  <div className="text-2xl font-bold text-purple-600">{service.maxHeight} cm</div>
                </div>
              </div>
            </div>

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
                  <div className="text-3xl font-bold text-purple-600">
                    {service.basePrice} {service.currency}
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Per Kilogram</span>
                    <span className="font-semibold">{service.pricePerKg} {service.currency}</span>
                  </div>
                  {service.pricePerKm && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Per Kilometer</span>
                      <span className="font-semibold">{service.pricePerKm} {service.currency}</span>
                    </div>
                  )}
                </div>

                <Link
                  href={`/${locale}/services/parcel/quote?service=${service.id}`}
                  className="block w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold text-center flex items-center justify-center gap-2"
                >
                  Get Instant Quote
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

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
