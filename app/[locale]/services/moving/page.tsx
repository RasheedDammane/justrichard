import { Metadata } from 'next';
import Link from 'next/link';
import { Truck, MapPin, Package, Star, ArrowRight } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Moving Services | JustRichard',
  description: 'Professional moving and relocation services in UAE',
};

export default async function MovingServicesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const services = await prisma.movingService.findMany({
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
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Professional Moving Services</h1>
            <p className="text-xl mb-8">
              Reliable and affordable moving solutions across UAE. Get your free quote today!
            </p>
            <Link
              href={`/${locale}/services/moving/quote`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 font-semibold text-lg"
            >
              Get Free Quote
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white py-12 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600">{services.length}+</div>
              <div className="text-gray-600 mt-2">Moving Partners</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">5000+</div>
              <div className="text-gray-600 mt-2">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">24/7</div>
              <div className="text-gray-600 mt-2">Support Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">100%</div>
              <div className="text-gray-600 mt-2">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Services */}
      {featuredServices.length > 0 && (
        <div className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Featured Moving Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredServices.map((service) => (
                <Link
                  key={service.id}
                  href={`/${locale}/services/moving/${service.slug}`}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-48 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                    <Truck className="w-20 h-20 text-white" />
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
                      <span className="text-gray-500">({service.totalBookings} bookings)</span>
                    </div>

                    <div className="border-t pt-4">
                      <div className="text-sm text-gray-600 mb-2">Starting from</div>
                      <div className="text-2xl font-bold text-blue-600">
                        {service.basePrice} {service.currency}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        + {service.pricePerKm} {service.currency}/km
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {service.packingIncluded && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                          Packing
                        </span>
                      )}
                      {service.storageAvailable && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                          Storage
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
          <h2 className="text-3xl font-bold mb-8">All Moving Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/${locale}/services/moving/${service.slug}`}
                className="bg-gray-50 rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-40 bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                  <Truck className="w-16 h-16 text-white" />
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

                  <div className="text-lg font-bold text-blue-600">
                    {service.basePrice} {service.currency}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Move?</h2>
          <p className="text-xl mb-8">Get your free quote in minutes!</p>
          <Link
            href={`/${locale}/services/moving/quote`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 font-semibold text-lg"
          >
            Get Free Quote Now
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </div>
  );
}
