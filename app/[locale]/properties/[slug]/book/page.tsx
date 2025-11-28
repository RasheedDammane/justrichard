import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import PropertyBookingForm from './PropertyBookingForm';

interface PropertyBookingPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function PropertyBookingPage({ params }: PropertyBookingPageProps) {
  const { locale, slug } = await params;

  const property = await prisma.property.findUnique({
    where: { slug },
    include: { City: true, Country: true },
  });

  if (!property) notFound();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Property</h1>
          <p className="text-gray-600">Reserve {property.title}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{property.title}</h2>
          <div className="space-y-1 text-sm text-gray-600">
            <p>🏠 {property.type}</p>
            <p>📍 {property.City?.name}, {property.Country?.name}</p>
            <p>🛏️ {property.bedrooms} bedrooms, {property.bathrooms} bathrooms</p>
            <p className="text-lg font-semibold text-indigo-600 mt-2">
              {property.currency} {property.pricePerNight?.toLocaleString()}/night
            </p>
          </div>
        </div>

        <PropertyBookingForm property={property} locale={locale} />
      </div>
    </div>
  );
}
