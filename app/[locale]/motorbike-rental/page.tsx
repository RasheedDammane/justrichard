import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

// Currency symbols by country
const currencySymbols: Record<string, string> = {
  'THB': '฿',
  'AED': 'AED',
  'SAR': 'SAR',
  'QAR': 'QAR',
  'VND': '₫',
  'USD': '$',
  'EUR': '€'
};

async function getMotorbikes() {
  try {
    console.log('🔍 Fetching motorbikes from database...');
    const motorbikes = await prisma.rentalMotorbike.findMany({
      where: {
        available: true,
      },
      include: {
        City: true,
        Country: true,
      },
      orderBy: {
        pricePerDay: 'asc',
      },
    });

    console.log('✅ Motorbikes fetched:', motorbikes.length);
    return motorbikes;
  } catch (error) {
    console.error('❌ Error fetching motorbikes:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    return [];
  }
}

export default async function MotorbikeRentalPage() {
  const motorbikes = await getMotorbikes();
  
  console.log('🏍️ Motorbikes loaded:', motorbikes.length);

  // Group by category
  const categories = Array.from(new Set(motorbikes.map((m: any) => m.category)));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              🏍️ 🛵 Moto & Scooter Rental
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Explore the city on two wheels. Rent a moto or scooter today!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">✓ Best Prices</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">✓ Free Helmet</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">✓ 24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600">{motorbikes.length}+</div>
              <div className="text-gray-600 mt-2">Motos & Scooters</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600">{categories.length}</div>
              <div className="text-gray-600 mt-2">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600">฿220+</div>
              <div className="text-gray-600 mt-2">Starting From</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600">24/7</div>
              <div className="text-gray-600 mt-2">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-gray-50 sticky top-0 z-40 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <button className="px-6 py-2 bg-orange-600 text-white rounded-full font-semibold hover:bg-orange-700 transition">
              All ({motorbikes.length})
            </button>
            {categories.map((category) => {
              const count = motorbikes.filter(m => m.category === category).length;
              return (
                <button
                  key={category}
                  className="px-6 py-2 bg-white border-2 border-gray-300 rounded-full font-semibold hover:border-orange-600 hover:text-orange-600 transition"
                >
                  {category} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Motorbikes Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {motorbikes.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🏍️</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">No Motorbikes Available</h2>
              <p className="text-gray-600 mb-8">Please check back later or contact us for more information.</p>
              <p className="text-sm text-gray-500">Debug: {motorbikes.length} motorbikes loaded</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {motorbikes.map((motorbike: any) => {
              const currencySymbol = currencySymbols[motorbike.currency] || motorbike.currency;
              const features = Array.isArray(motorbike.features) ? motorbike.features : [];
              
              // Choose emoji based on category
              const getEmoji = (category: string) => {
                if (category.toLowerCase().includes('scooter')) return '🛵';
                if (category.toLowerCase().includes('sport')) return '🏍️';
                if (category.toLowerCase().includes('adventure')) return '🏍️';
                return '🛵'; // Default to scooter
              };
              
              return (
                <Link
                  key={motorbike.id}
                  href={`/en/motorbike-rental/${motorbike.slug}`}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-105"
                >
                  {/* Image */}
                  <div className="relative h-48 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                    <div className="text-6xl">{getEmoji(motorbike.category)}</div>
                    <div className="absolute top-3 right-3 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {motorbike.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Brand & Model */}
                    <div className="mb-3">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition">
                        {motorbike.brand} {motorbike.model}
                      </h3>
                      <p className="text-sm text-gray-600">{motorbike.year}</p>
                    </div>

                    {/* Specs */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-700">
                        {motorbike.engineSize}cc
                      </span>
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-700">
                        {motorbike.transmission}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-700">
                        {motorbike.seats} seats
                      </span>
                    </div>

                    {/* Features */}
                    {features.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {features.slice(0, 3).map((feature: string, idx: number) => (
                            <span key={idx} className="text-xs text-gray-600">
                              ✓ {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Location */}
                    {motorbike.City && (
                      <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                        <span>📍</span>
                        <span>{motorbike.City.name}</span>
                      </div>
                    )}

                    {/* Price */}
                    <div className="border-t pt-4">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <div className="text-2xl font-bold text-orange-600">
                            {currencySymbol}{motorbike.pricePerDay.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-600">per day</div>
                        </div>
                        {motorbike.pricePerWeek && (
                          <div className="text-right">
                            <div className="text-sm font-semibold text-gray-700">
                              {currencySymbol}{motorbike.pricePerWeek.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500">per week</div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* CTA */}
                    <button className="w-full mt-4 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-bold hover:from-orange-700 hover:to-red-700 transition-all shadow-lg">
                      View Details →
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Rent With Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Best Prices</h3>
              <p className="text-gray-600">Competitive rates with no hidden fees. Daily, weekly, and monthly options available.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-2">Fully Insured</h3>
              <p className="text-gray-600">All motos & scooters come with comprehensive insurance for your peace of mind.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🔧</div>
              <h3 className="text-xl font-bold mb-2">Well Maintained</h3>
              <p className="text-gray-600">Regular servicing and safety checks on all our motos & scooters.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
