import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

interface TransferDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: TransferDetailPageProps): Promise<Metadata> {
  const transfer = await prisma.Transfer.findUnique({
    where: { slug: params.slug },
  });

  if (!transfer) {
    return {
      title: 'Transfer Not Found',
    };
  }

  return {
    title: transfer.metaTitle || `${transfer.name} | Transfer Services`,
    description: transfer.metaDescription || transfer.shortDescription || transfer.description,
  };
}

export default async function TransferDetailPage({ params }: TransferDetailPageProps) {
  const { locale, slug } = await params;

  const transfer = await prisma.Transfer.findUnique({
    where: { slug },
    include: {
      City: true,
      Country: true,
    },
  });

  if (!transfer) {
    notFound();
  }

  // Increment view count
  await prisma.Transfer.update({
    where: { id: transfer.id },
    data: { viewCount: { increment: 1 } },
  });

  // Parse JSON fields
  const features = transfer.features ? JSON.parse(transfer.features as string) : [];
  const amenities = transfer.amenities ? JSON.parse(transfer.amenities as string) : [];
  const included = transfer.included ? JSON.parse(transfer.included as string) : [];
  const notIncluded = transfer.notIncluded ? JSON.parse(transfer.notIncluded as string) : [];
  const faq = transfer.faq ? JSON.parse(transfer.faq as string) : [];
  const driverLanguages = transfer.driverLanguages ? JSON.parse(transfer.driverLanguages as string) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href={`/${locale}`} className="hover:text-orange-600">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/${locale}/services/transfer`} className="hover:text-orange-600">
              Transfers
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{transfer.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <main className="lg:w-2/3">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-block bg-orange-100 text-orange-700 text-sm px-3 py-1 rounded">
                  {transfer.transferType.replace('_', ' ')}
                </span>
                {transfer.isFeatured && (
                  <span className="inline-block bg-yellow-100 text-yellow-700 text-sm px-3 py-1 rounded">
                    ⭐ Featured
                  </span>
                )}
                {transfer.rating && (
                  <span className="inline-block bg-green-100 text-green-700 text-sm px-3 py-1 rounded">
                    ★ {transfer.rating} ({transfer.reviewCount} reviews)
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {transfer.name}
              </h1>

              {/* Vehicle Info */}
              {transfer.vehicleMake && transfer.vehicleModel && (
                <p className="text-lg text-gray-600 mb-4">
                  {transfer.vehicleMake} {transfer.vehicleModel} {transfer.vehicleYear} or similar
                </p>
              )}

              {/* Route */}
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="text-green-600 text-2xl mr-3">📍</span>
                      <div>
                        <div className="text-sm text-gray-600">Pickup</div>
                        <div className="text-lg font-semibold text-gray-900">{transfer.fromLocation}</div>
                        {transfer.fromAddress && (
                          <div className="text-sm text-gray-600">{transfer.fromAddress}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mx-4 text-3xl text-orange-500">→</div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="text-blue-600 text-2xl mr-3">🎯</span>
                      <div>
                        <div className="text-sm text-gray-600">Drop-off</div>
                        <div className="text-lg font-semibold text-gray-900">{transfer.toLocation}</div>
                        {transfer.toAddress && (
                          <div className="text-sm text-gray-600">{transfer.toAddress}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {transfer.duration && (
                  <div className="mt-4 pt-4 border-t border-orange-200 flex items-center justify-center text-gray-600">
                    <span className="mr-2">⏱️</span>
                    <span>Estimated duration: ~{transfer.duration} minutes</span>
                    {transfer.distance && (
                      <span className="ml-4">• Distance: {transfer.distance} km</span>
                    )}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="prose max-w-none mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">{transfer.description}</p>
              </div>

              {/* Vehicle Specifications */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Vehicle Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{transfer.vehicleType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Max Passengers:</span>
                      <span className="font-medium">{transfer.maxPassengers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Max Luggage:</span>
                      <span className="font-medium">{transfer.maxLuggage}</span>
                    </div>
                    {transfer.vehicleColor && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Color:</span>
                        <span className="font-medium">{transfer.vehicleColor}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Booking Details</h3>
                  <div className="space-y-2 text-sm">
                    {transfer.advanceBooking && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Advance Booking:</span>
                        <span className="font-medium">{transfer.advanceBooking} hours</span>
                      </div>
                    )}
                    {transfer.minBookingHours && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Min Booking:</span>
                        <span className="font-medium">{transfer.minBookingHours} hours</span>
                      </div>
                    )}
                    {transfer.maxBookingHours && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Max Booking:</span>
                        <span className="font-medium">{transfer.maxBookingHours} hours</span>
                      </div>
                    )}
                    {driverLanguages.length > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Languages:</span>
                        <span className="font-medium">{driverLanguages.join(', ')}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Features & Amenities */}
              {features.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Features</h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    {features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-center text-gray-700">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {amenities.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Amenities</h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    {amenities.map((amenity: string, idx: number) => (
                      <div key={idx} className="flex items-center text-gray-700">
                        <span className="text-blue-600 mr-2">✓</span>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* What's Included / Not Included */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {included.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">✓ What's Included</h3>
                    <ul className="space-y-2">
                      {included.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start text-sm text-gray-700">
                          <span className="text-green-600 mr-2 mt-0.5">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {notIncluded.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">✗ Not Included</h3>
                    <ul className="space-y-2">
                      {notIncluded.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start text-sm text-gray-700">
                          <span className="text-red-600 mr-2 mt-0.5">✗</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Additional Options */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-900 mb-3">Additional Options</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center">
                    <span className={transfer.childSeat ? 'text-green-600' : 'text-gray-400'}>
                      {transfer.childSeat ? '✓' : '✗'}
                    </span>
                    <span className="ml-2">Child Seat Available</span>
                  </div>
                  <div className="flex items-center">
                    <span className={transfer.wheelchairAccess ? 'text-green-600' : 'text-gray-400'}>
                      {transfer.wheelchairAccess ? '✓' : '✗'}
                    </span>
                    <span className="ml-2">Wheelchair Accessible</span>
                  </div>
                  <div className="flex items-center">
                    <span className={transfer.petFriendly ? 'text-green-600' : 'text-gray-400'}>
                      {transfer.petFriendly ? '✓' : '✗'}
                    </span>
                    <span className="ml-2">Pet Friendly</span>
                  </div>
                  <div className="flex items-center">
                    <span className={transfer.smokingAllowed ? 'text-green-600' : 'text-gray-400'}>
                      {transfer.smokingAllowed ? '✓' : '✗'}
                    </span>
                    <span className="ml-2">Smoking Allowed</span>
                  </div>
                </div>
              </div>

              {/* Cancellation Policy */}
              {transfer.cancellationPolicy && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Cancellation Policy</h2>
                  <p className="text-gray-700">{transfer.cancellationPolicy}</p>
                </div>
              )}

              {/* FAQ */}
              {faq.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {faq.map((item: any, idx: number) => (
                      <div key={idx} className="border-b border-gray-200 pb-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{item.question}</h3>
                        <p className="text-gray-700">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </main>

          {/* Sidebar */}
          <aside className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              {/* Price */}
              <div className="mb-6">
                <div className="text-sm text-gray-600 mb-1">From</div>
                <div className="text-4xl font-bold text-orange-600 mb-2">
                  {transfer.currency === 'THB' ? '฿' : transfer.currency} {transfer.price.toLocaleString()}
                </div>
                {transfer.pricePerHour && (
                  <div className="text-sm text-gray-600">
                    or {transfer.currency === 'THB' ? '฿' : transfer.currency} {transfer.pricePerHour.toLocaleString()}/hour
                  </div>
                )}
                <div className="text-xs text-gray-500 mt-1">
                  {transfer.currency} • Fixed price, no hidden fees
                </div>
              </div>

              {/* Quick Info */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center text-sm">
                  <span className="text-gray-600 mr-2">🚗</span>
                  <span className="text-gray-900">{transfer.vehicleType}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-gray-600 mr-2">👥</span>
                  <span className="text-gray-900">Up to {transfer.maxPassengers} passengers</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-gray-600 mr-2">🧳</span>
                  <span className="text-gray-900">Up to {transfer.maxLuggage} luggage</span>
                </div>
                {transfer.duration && (
                  <div className="flex items-center text-sm">
                    <span className="text-gray-600 mr-2">⏱️</span>
                    <span className="text-gray-900">~{transfer.duration} minutes</span>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <button className="w-full bg-orange-500 text-white py-4 rounded-lg hover:bg-orange-600 transition-colors font-semibold text-lg mb-4">
                Book Now
              </button>

              {/* Trust Badges */}
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Free cancellation up to 24h</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Instant confirmation</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Professional drivers</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>24/7 customer support</span>
                </div>
              </div>

              {/* Contact Info */}
              {transfer.driverPhone && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-sm text-gray-600 mb-2">Need help?</div>
                  <a
                    href={`tel:${transfer.driverPhone}`}
                    className="text-orange-600 hover:text-orange-700 font-medium"
                  >
                    📞 {transfer.driverPhone}
                  </a>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
