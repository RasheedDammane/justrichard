import { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import Hero from '@/components/Hero';
import ProcessSteps from '@/components/ProcessSteps';

interface RentalPageProps {
  params: {
    locale: string;
  };
}

export const metadata: Metadata = {
  title: 'Vehicle Rentals | CommunityHub',
  description: 'Rent cars, motorcycles, scooters, and bicycles. Wide selection of vehicles for daily, weekly, or monthly rental.',
};

export default async function RentalPage({ params }: RentalPageProps) {
  const { locale } = params;

  // Fetch vehicles
  const vehicles = await prisma.vehicle.findMany({
    where: { isAvailable: true },
    include: {
      city: true,
      country: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  // Process steps
  const processSteps = [
    {
      number: 1,
      icon: '🔍',
      title: 'Browse Vehicles',
      description: 'Explore our wide selection of cars, bikes, and more.',
    },
    {
      number: 2,
      icon: '📅',
      title: 'Select Dates',
      description: 'Choose your pickup and return dates.',
    },
    {
      number: 3,
      icon: '✅',
      title: 'Book & Pay',
      description: 'Secure your booking with instant confirmation.',
    },
    {
      number: 4,
      icon: '🚗',
      title: 'Pick Up & Drive',
      description: 'Collect your vehicle and enjoy your journey.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <Hero
        icon="🚗"
        tagline="Vehicle Rentals"
        title="Rent Your Perfect Vehicle"
        subtitle="Cars, Motorcycles, Scooters & Bicycles"
        description="Choose from our wide selection of vehicles for rent. Daily, weekly, or monthly rates available. All vehicles are well-maintained and ready to go."
        ctaText="Browse Vehicles"
        ctaLink="#vehicles"
        secondaryCtaText="How It Works"
        secondaryCtaLink="#how-it-works"
        breadcrumbs={[
          { label: 'Home', href: `/${locale}` },
          { label: 'Services', href: `/${locale}/services` },
          { label: 'Rentals' },
        ]}
      />

      {/* Vehicles Grid */}
      <section id="vehicles" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Available Vehicles ({vehicles.length})
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                {vehicle.images?.[0] && (
                  <img
                    src={vehicle.images[0]}
                    alt={vehicle.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                {!vehicle.images?.[0] && (
                  <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                    <span className="text-6xl">
                      {vehicle.vehicleType === 'CAR' ? '🚗' :
                       vehicle.vehicleType === 'MOTORBIKE' ? '🏍️' :
                       vehicle.vehicleType === 'SCOOTER' ? '🛵' : '🚲'}
                    </span>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                      {vehicle.vehicleType}
                    </span>
                    <span className="text-xs text-gray-500">
                      {vehicle.city.name}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{vehicle.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {vehicle.description}
                  </p>
                  
                  {/* Pricing */}
                  <div className="space-y-1 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Per Day:</span>
                      <span className="font-bold text-blue-600">
                        {vehicle.currency} {vehicle.pricePerDay}
                      </span>
                    </div>
                    {vehicle.pricePerWeek && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Per Week:</span>
                        <span className="font-bold text-blue-600">
                          {vehicle.currency} {vehicle.pricePerWeek}
                        </span>
                      </div>
                    )}
                    {vehicle.pricePerMonth && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Per Month:</span>
                        <span className="font-bold text-blue-600">
                          {vehicle.currency} {vehicle.pricePerMonth}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  {vehicle.features && vehicle.features.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {vehicle.features.slice(0, 3).map((feature, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}

                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <div id="how-it-works">
        <ProcessSteps
          title="How It Works"
          subtitle="Renting a vehicle is easy with CommunityHub"
          steps={processSteps}
        />
      </div>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Why Rent With Us?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Verified Vehicles</h3>
              <p className="text-gray-600">
                All vehicles are inspected and well-maintained
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Best Rates</h3>
              <p className="text-gray-600">
                Competitive pricing with flexible rental periods
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📍</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Multiple Locations</h3>
              <p className="text-gray-600">
                Vehicles available in Dubai, Bangkok, Manila and more
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Customer support available anytime you need
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Hit the Road?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Book your vehicle today and enjoy the freedom of the open road
          </p>
          <a
            href="#vehicles"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-lg shadow-lg"
          >
            Browse All Vehicles
          </a>
        </div>
      </section>
    </div>
  );
}
