import { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import TransferFilters from './TransferFilters';
import { TransferType, VehicleType } from '@prisma/client';

interface TransferPageProps {
  params: {
    locale: string;
  };
  searchParams: {
    type?: string;
    vehicle?: string;
    minPassengers?: string;
    maxPrice?: string;
  };
}

export const metadata: Metadata = {
  title: 'Airport & City Transfers | Professional Transfer Services',
  description: 'Book reliable airport transfers, city-to-city transfers, and private driver services. Professional drivers, comfortable vehicles, fixed prices.',
};

export default async function TransferPage({ params, searchParams }: TransferPageProps) {
  const { locale } = params;
  const { type, vehicle, minPassengers, maxPrice } = searchParams;

  // Build where clause
  const where: any = { isActive: true };
  
  if (type) {
    where.transferType = type as TransferType;
  }
  if (vehicle) {
    where.vehicleType = vehicle as VehicleType;
  }
  if (minPassengers) {
    where.maxPassengers = { gte: parseInt(minPassengers) };
  }
  if (maxPrice) {
    where.price = { lte: parseFloat(maxPrice) };
  }

  // Fetch transfers
  const transfers = await prisma.Transfer.findMany({
    where,
    include: {
      City: true,
      Country: true,
    },
    orderBy: [
      { isFeatured: 'desc' },
      { price: 'asc' },
    ],
  });

  // Get unique values for filters
  const allTransfers = await prisma.Transfer.findMany({
    where: { isActive: true },
    select: {
      transferType: true,
      vehicleType: true,
    },
  });

  // Parse features JSON
  const transfersWithFeatures = transfers.map(transfer => ({
    ...transfer,
    parsedFeatures: transfer.features ? JSON.parse(transfer.features as string) : [],
    parsedAmenities: transfer.amenities ? JSON.parse(transfer.amenities as string) : [],
    parsedIncluded: transfer.included ? JSON.parse(transfer.included as string) : [],
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Airport & City Transfers
          </h1>
          <p className="text-xl text-orange-100 mb-2">
            Professional transfer services with fixed prices
          </p>
          <p className="text-orange-100">
            {transfers.length} transfers available • Book now and save
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filters */}
          <aside className="lg:w-1/4">
            <TransferFilters />
          </aside>

          {/* Main Content - Transfer List */}
          <main className="lg:w-3/4">
            {/* Results Header */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {transfers.length} Transfer{transfers.length !== 1 ? 's' : ''} Found
                </h2>
                <div className="text-sm text-gray-600">
                  Sorted by: <span className="font-medium">Price (Low to High)</span>
                </div>
              </div>
            </div>

            {/* Transfer Cards */}
            <div className="space-y-4">
              {transfersWithFeatures.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <div className="text-6xl mb-4">🚗</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No transfers found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters to see more results
                  </p>
                  <Link
                    href={`/${locale}/services/transfer`}
                    className="inline-block bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Clear Filters
                  </Link>
                </div>
              ) : (
                transfersWithFeatures.map((transfer) => (
                  <Link
                    key={transfer.id}
                    href={`/${locale}/services/transfer/${transfer.slug}`}
                    className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Image */}
                      <div className="md:w-1/4 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center p-8">
                        <div className="text-center">
                          <div className="text-6xl mb-2">
                            {transfer.vehicleType === 'LUXURY' ? '🚗' :
                             transfer.vehicleType === 'VAN' ? '🚐' :
                             transfer.vehicleType === 'MINIBUS' ? '🚌' :
                             transfer.vehicleType === 'SUV' ? '🚙' : '🚕'}
                          </div>
                          <div className="text-white text-sm font-medium">
                            {transfer.vehicleType}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="md:w-3/4 p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            {/* Badges */}
                            <div className="flex flex-wrap gap-2 mb-2">
                              <span className="inline-block bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded">
                                {transfer.transferType.replace('_', ' ')}
                              </span>
                              {transfer.isFeatured && (
                                <span className="inline-block bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded">
                                  ⭐ Featured
                                </span>
                              )}
                              {transfer.rating && transfer.rating >= 4.5 && (
                                <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                                  ★ {transfer.rating} ({transfer.reviewCount})
                                </span>
                              )}
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {transfer.name}
                            </h3>

                            {/* Vehicle Info */}
                            {transfer.vehicleMake && transfer.vehicleModel && (
                              <p className="text-sm text-gray-600 mb-3">
                                {transfer.vehicleMake} {transfer.vehicleModel} or similar
                              </p>
                            )}

                            {/* Route */}
                            <div className="bg-gray-50 rounded-lg p-3 mb-3">
                              <div className="flex items-center text-sm mb-1">
                                <span className="text-green-600 mr-2">📍</span>
                                <span className="text-gray-700 font-medium">{transfer.fromLocation}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <span className="text-blue-600 mr-2">🎯</span>
                                <span className="text-gray-700 font-medium">{transfer.toLocation}</span>
                              </div>
                              {transfer.duration && (
                                <div className="flex items-center text-sm mt-1 text-gray-500">
                                  <span className="mr-2">⏱️</span>
                                  <span>~{transfer.duration} min</span>
                                  {transfer.distance && (
                                    <span className="ml-3">• {transfer.distance} km</span>
                                  )}
                                </div>
                              )}
                            </div>

                            {/* Features */}
                            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                              <div className="flex items-center">
                                <span className="mr-1">👥</span>
                                <span>{transfer.maxPassengers} passengers</span>
                              </div>
                              <div className="flex items-center">
                                <span className="mr-1">🧳</span>
                                <span>{transfer.maxLuggage} luggage</span>
                              </div>
                              {transfer.childSeat && (
                                <div className="flex items-center text-green-600">
                                  <span className="mr-1">👶</span>
                                  <span>Child seat</span>
                                </div>
                              )}
                              {transfer.wheelchairAccess && (
                                <div className="flex items-center text-blue-600">
                                  <span className="mr-1">♿</span>
                                  <span>Wheelchair</span>
                                </div>
                              )}
                            </div>

                            {/* Key Features */}
                            {transfer.parsedIncluded.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-2">
                                {transfer.parsedIncluded.slice(0, 3).map((item: string, idx: number) => (
                                  <span key={idx} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                                    ✓ {item}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Price */}
                          <div className="ml-4 text-right">
                            <div className="text-sm text-gray-500 mb-1">From</div>
                            <div className="text-3xl font-bold text-orange-600">
                              {transfer.currency === 'THB' ? '฿' : transfer.currency} {transfer.price.toLocaleString()}
                            </div>
                            {transfer.pricePerHour && (
                              <div className="text-xs text-gray-500 mt-1">
                                or {transfer.currency === 'THB' ? '฿' : transfer.currency} {transfer.pricePerHour}/hour
                              </div>
                            )}
                            <div className="mt-3">
                              <span className="inline-block bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium">
                                Book now
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>

            {/* Info Section */}
            {transfers.length > 0 && (
              <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">
                  💡 Why choose private transfers?
                </h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span><strong>Time saving:</strong> Direct pickup and drop-off, no waiting</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span><strong>Cost effective:</strong> Fixed prices, no hidden fees or surge pricing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span><strong>Comfortable:</strong> Air-conditioned vehicles, verified drivers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span><strong>Flexible:</strong> Meet & greet service, free cancellation up to 24h</span>
                  </li>
                </ul>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
