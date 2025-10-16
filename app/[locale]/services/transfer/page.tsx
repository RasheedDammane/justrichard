import { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import Hero from '@/components/Hero';
import ProcessSteps from '@/components/ProcessSteps';

interface TransferPageProps {
  params: {
    locale: string;
  };
}

export const metadata: Metadata = {
  title: 'Transfer Services | CommunityHub',
  description: 'Airport transfers, city-to-city transfers, and hourly transfer services. Professional drivers with comfortable vehicles.',
};

export default async function TransferPage({ params }: TransferPageProps) {
  const { locale } = params;

  // Fetch transfers
  const transfers = await prisma.transfer.findMany({
    where: { isAvailable: true },
    include: {
      country: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  // Process steps
  const processSteps = [
    {
      number: 1,
      icon: '📍',
      title: 'Select Route',
      description: 'Choose your pickup and drop-off locations.',
    },
    {
      number: 2,
      icon: '📅',
      title: 'Pick Date & Time',
      description: 'Select your preferred date and time.',
    },
    {
      number: 3,
      icon: '✅',
      title: 'Confirm Booking',
      description: 'Review details and confirm your transfer.',
    },
    {
      number: 4,
      icon: '🚗',
      title: 'Enjoy Your Ride',
      description: 'Professional driver will pick you up on time.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <Hero
        icon="🚐"
        tagline="Transfer Services"
        title="Professional Transfer Services"
        subtitle="Airport, City-to-City & Hourly Transfers"
        description="Comfortable and reliable transfer services with professional drivers. Airport pickups, city transfers, and hourly bookings available."
        ctaText="Browse Transfers"
        ctaLink="#transfers"
        secondaryCtaText="How It Works"
        secondaryCtaLink="#how-it-works"
        breadcrumbs={[
          { label: 'Home', href: `/${locale}` },
          { label: 'Services', href: `/${locale}/services` },
          { label: 'Transfers' },
        ]}
      />

      {/* Transfers Grid */}
      <section id="transfers" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Available Transfers ({transfers.length})
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transfers.map((transfer) => (
              <div
                key={transfer.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="w-full h-48 bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
                  <span className="text-6xl">
                    {transfer.transferType === 'AIRPORT_PICKUP' || transfer.transferType === 'AIRPORT_DROPOFF' ? '✈️' :
                     transfer.transferType === 'CITY_TO_CITY' ? '🌆' : '🕐'}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                      {transfer.transferType.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-gray-500">
                      {transfer.country.name}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{transfer.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {transfer.description}
                  </p>
                  
                  {/* Route */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="flex items-center text-sm mb-2">
                      <span className="text-green-600 mr-2">📍</span>
                      <span className="text-gray-700">{transfer.fromLocation}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="text-blue-600 mr-2">🎯</span>
                      <span className="text-gray-700">{transfer.toLocation}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-bold text-2xl text-green-600">
                      {transfer.currency} {transfer.price}
                    </span>
                  </div>

                  {/* Vehicle Info */}
                  <div className="flex justify-between text-sm mb-4">
                    <span className="text-gray-600">Vehicle:</span>
                    <span className="font-medium">{transfer.vehicleType}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-4">
                    <span className="text-gray-600">Passengers:</span>
                    <span className="font-medium">Up to {transfer.maxPassengers}</span>
                  </div>

                  {/* Features */}
                  {transfer.features && transfer.features.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {transfer.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}

                  <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Book Transfer
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
          subtitle="Booking a transfer is simple and quick"
          steps={processSteps}
        />
      </div>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Why Choose Our Transfer Service?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👨‍✈️</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Professional Drivers</h3>
              <p className="text-gray-600">
                Experienced and licensed drivers for your safety
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⏰</span>
              </div>
              <h3 className="font-bold text-lg mb-2">On-Time Service</h3>
              <p className="text-gray-600">
                Punctual pickups and drop-offs guaranteed
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚗</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Comfortable Vehicles</h3>
              <p className="text-gray-600">
                Clean, air-conditioned vehicles with WiFi
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Fixed Prices</h3>
              <p className="text-gray-600">
                No hidden fees, transparent pricing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-600 text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4">
            Need a Transfer?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Book your transfer now and travel in comfort
          </p>
          <a
            href="#transfers"
            className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors text-lg shadow-lg"
          >
            Book Now
          </a>
        </div>
      </section>
    </div>
  );
}
