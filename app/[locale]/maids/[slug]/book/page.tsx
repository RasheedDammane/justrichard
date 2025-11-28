import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import MaidBookingForm from './MaidBookingForm';

interface MaidBookingPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function MaidBookingPage({ params }: MaidBookingPageProps) {
  const { locale, slug } = await params;

  const maid = await prisma.maid.findUnique({
    where: { slug },
    include: { City: true, Country: true },
  });

  if (!maid) notFound();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Maid Service</h1>
          <p className="text-gray-600">Schedule service with {maid.name}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{maid.name}</h2>
          <div className="space-y-1 text-sm text-gray-600">
            <p>🧹 {maid.serviceType}</p>
            <p>📍 {maid.City?.name}, {maid.Country?.name}</p>
            <p>⭐ {maid.rating}/5 ({maid.reviewCount} reviews)</p>
            <p>🗣️ Languages: {maid.languages}</p>
            <p className="text-lg font-semibold text-pink-600 mt-2">
              {maid.currency} {maid.hourlyRate?.toLocaleString()}/hour
            </p>
          </div>
        </div>

        <MaidBookingForm maid={maid} locale={locale} />
      </div>
    </div>
  );
}
