import { Metadata } from 'next';
import Link from 'next/link';
import { Package, Zap, Globe, Shield, ArrowRight, Star } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Parcel Delivery Services | JustRichard',
  description: 'Fast and reliable parcel delivery services across UAE and internationally',
};

export default async function ParcelServicesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const services = await prisma.parcelService.findMany({
    where: { isActive: true },
    orderBy: [
      { isFeatured: 'desc' },
      { rating: 'desc' },
    ],
  });

  const featuredServices = services.filter(s => s.isFeatured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Parcel Delivery Services</h1>
            <p className="text-xl mb-8">
              Fast, secure, and affordable parcel delivery. Local and international shipping available!
            </p>
            <Link
              href={`/${locale}/services/parcel/quote`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-lg hover:bg-gray-100 font-semibold text-lg"
            >
              Get Instant Quote
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold mb-2">Express Delivery</h3>
              <p className="text-gray-600 text-sm">Same day and next day options</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold mb-2">International</h3>
              <p className="text-gray-600 text-sm">Worldwide shipping available</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold mb-2">Insured</h3>
              <p className="text-gray-600 text-sm">Full insurance coverage</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-bold mb-2">Tracking</h3>
              <p className="text-gray-600 text-sm">Real-time tracking</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Services */}
      {featuredServices.length > 0 && (
        <div className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Featured Delivery Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredServices.map((service) => (
                <Link
                  key={service.id}
                  href={`/${locale}/services/parcel/${service.slug}`}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-48 bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                    <Package className="w-20 h-20 text-white" />
                    <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{service.shortDescription}</p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold">{service.rating.toFixed(1)}</span>
                      <span className="text-gray-500">({service.totalDeliveries} deliveries)</span>
                    </div>

                    <div className="border-t pt-4">
                      <div className="text-sm text-gray-600 mb-2">Starting from</div>
                      <div className="text-2xl font-bold text-purple-600">
                        {service.basePrice} {service.currency}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        + {service.pricePerKg} {service.currency}/kg
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {service.expressAvailable && (
                        <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">
                          Express
                        </span>
                      )}
                      {service.sameDay && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                          Same Day
                        </span>
                      )}
                      {service.international && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          International
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* All Services */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">All Delivery Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/${locale}/services/parcel/${service.slug}`}
                className="bg-gray-50 rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-40 bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                  <Package className="w-16 h-16 text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {service.shortDescription}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-semibold">{service.rating.toFixed(1)}</span>
                  </div>

                  <div className="text-lg font-bold text-purple-600">
                    {service.basePrice} {service.currency}
                  </div>
                  
                  <div className="mt-3 text-xs text-gray-500">
                    Max: {service.maxWeight}kg • {service.maxLength}×{service.maxWidth}×{service.maxHeight}cm
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Ship?</h2>
          <p className="text-xl mb-8">Get instant pricing with our smart calculator!</p>
          <Link
            href={`/${locale}/services/parcel/quote`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-lg hover:bg-gray-100 font-semibold text-lg"
          >
            Calculate Price Now
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </div>
  );
}
