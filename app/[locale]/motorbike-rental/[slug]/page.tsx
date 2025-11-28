import { notFound } from 'next/navigation';
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

async function getMotorbike(slug: string) {
  const motorbike = await prisma.rentalMotorbike.findUnique({
    where: { slug },
    include: {
      City: true,
      Country: true,
    },
  });

  return motorbike;
}

export default async function MotorbikeDetailPage({ params }: { params: { slug: string } }) {
  const motorbike = await getMotorbike(params.slug);

  if (!motorbike) {
    notFound();
  }

  const currencySymbol = currencySymbols[motorbike.currency] || motorbike.currency;
  const features = Array.isArray(motorbike.features) ? motorbike.features : [];

  // Choose emoji based on category
  const getEmoji = (category: string) => {
    if (category.toLowerCase().includes('scooter')) return '🛵';
    if (category.toLowerCase().includes('sport')) return '🏍️';
    if (category.toLowerCase().includes('adventure')) return '🏍️';
    return '🛵';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/en" className="hover:text-orange-600">Home</Link>
            <span>/</span>
            <Link href="/en/motorbike-rental" className="hover:text-orange-600">Moto & Scooter Rental</Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">{motorbike.brand} {motorbike.model}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image */}
            <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl p-12 mb-6 flex items-center justify-center">
              <div className="text-9xl">{getEmoji(motorbike.category)}</div>
            </div>

            {/* Title & Category */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {motorbike.brand} {motorbike.model}
                  </h1>
                  <p className="text-xl text-gray-600">{motorbike.year}</p>
                </div>
                <div className="bg-orange-600 text-white px-4 py-2 rounded-full font-bold">
                  {motorbike.category}
                </div>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <div className="text-2xl mb-2">⚙️</div>
                  <div className="text-sm text-gray-600">Engine</div>
                  <div className="font-bold text-gray-900">{motorbike.engineSize}cc</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <div className="text-2xl mb-2">🔄</div>
                  <div className="text-sm text-gray-600">Transmission</div>
                  <div className="font-bold text-gray-900">{motorbike.transmission}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <div className="text-2xl mb-2">⛽</div>
                  <div className="text-sm text-gray-600">Fuel Type</div>
                  <div className="font-bold text-gray-900">{motorbike.fuelType}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <div className="text-2xl mb-2">👥</div>
                  <div className="text-sm text-gray-600">Seats</div>
                  <div className="font-bold text-gray-900">{motorbike.seats}</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed">{motorbike.description}</p>
              </div>
            </div>

            {/* Features */}
            {features.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
                <h2 className="text-2xl font-bold mb-6">Features & Equipment</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {features.map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-green-600 text-xl">✓</span>
                      <span className="font-semibold text-gray-900">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location */}
            {motorbike.City && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-4">Pickup Location</h2>
                <div className="flex items-center gap-3 text-lg">
                  <span className="text-3xl">📍</span>
                  <div>
                    <div className="font-bold text-gray-900">{motorbike.City.name}</div>
                    <div className="text-gray-600">{motorbike.Country.name}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-4">
              {/* Price */}
              <div className="mb-6 pb-6 border-b">
                <div className="text-sm text-gray-600 mb-2">Starting from</div>
                <div className="text-4xl font-bold text-orange-600 mb-4">
                  {currencySymbol}{motorbike.pricePerDay.toLocaleString()}
                  <span className="text-lg text-gray-600 font-normal">/day</span>
                </div>

                {/* Other Prices */}
                {(motorbike.pricePerWeek || motorbike.pricePerMonth) && (
                  <div className="space-y-2">
                    {motorbike.pricePerWeek && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Weekly</span>
                        <span className="font-bold text-gray-900">
                          {currencySymbol}{motorbike.pricePerWeek.toLocaleString()}
                        </span>
                      </div>
                    )}
                    {motorbike.pricePerMonth && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Monthly</span>
                        <span className="font-bold text-gray-900">
                          {currencySymbol}{motorbike.pricePerMonth.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Availability */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-3 h-3 rounded-full ${motorbike.available ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="font-semibold">
                    {motorbike.available ? 'Available Now' : 'Not Available'}
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <button className="w-full py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-bold text-lg hover:from-orange-700 hover:to-red-700 transition-all shadow-lg">
                  Book Now
                </button>
                <a
                  href={`https://wa.me/66123456789?text=Hi, I'm interested in renting ${motorbike.brand} ${motorbike.model}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <span>💬</span>
                  <span>WhatsApp</span>
                </a>
                <button className="w-full py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:border-orange-600 hover:text-orange-600 transition-all">
                  Request Quote
                </button>
              </div>

              {/* Included */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-bold mb-3">What's Included</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Free Helmet</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Insurance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>24/7 Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Free Delivery (in city)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Motorbikes */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Similar Motos & Scooters</h2>
          <div className="text-gray-600">
            <Link href="/en/motorbike-rental" className="text-orange-600 hover:underline font-semibold">
              View all motos & scooters →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
