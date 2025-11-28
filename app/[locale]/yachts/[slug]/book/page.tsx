import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import YachtBookingForm from './YachtBookingForm';

interface YachtBookingPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function YachtBookingPage({ params }: YachtBookingPageProps) {
  const { locale, slug } = await params;

  const yacht = await prisma.yacht.findUnique({
    where: { slug },
    include: {
      City: true,
      Country: true,
    },
  });

  if (!yacht) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Your Yacht</h1>
          <p className="text-gray-600">Complete the form below to book {yacht.name}</p>
        </div>

        {/* Yacht Info Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{yacht.name}</h2>
              <div className="space-y-1 text-sm text-gray-600">
                <p>📍 {yacht.City?.name}, {yacht.Country?.name}</p>
                <p>👥 Capacity: {yacht.capacity} guests</p>
                <p>📏 Length: {yacht.length}ft</p>
                <p className="text-lg font-semibold text-blue-600 mt-2">
                  {yacht.currency} {yacht.pricePerHour?.toLocaleString()}/hour
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <YachtBookingForm yacht={yacht} locale={locale} />
      </div>
    </div>
  );
}
