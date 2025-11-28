import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ScooterBookingForm from './ScooterBookingForm';

interface ScooterBookingPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function ScooterBookingPage({ params }: ScooterBookingPageProps) {
  const { locale, slug } = await params;

  const scooter = await prisma.scooter.findUnique({
    where: { slug },
    include: { City: true, Country: true },
  });

  if (!scooter) notFound();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Scooter</h1>
          <p className="text-gray-600">Reserve {scooter.name}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{scooter.name}</h2>
          <div className="space-y-1 text-sm text-gray-600">
            <p>🛵 {scooter.brand} {scooter.model}</p>
            <p>📍 {scooter.City?.name}, {scooter.Country?.name}</p>
            <p>⚡ {scooter.engineSize}cc</p>
            <p>⭐ {scooter.rating}/5</p>
            <p className="text-lg font-semibold text-orange-600 mt-2">
              {scooter.currency} {scooter.pricePerDay?.toLocaleString()}/day
            </p>
          </div>
        </div>

        <ScooterBookingForm scooter={scooter} locale={locale} />
      </div>
    </div>
  );
}
