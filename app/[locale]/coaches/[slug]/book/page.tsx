import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import CoachBookingForm from './CoachBookingForm';

export default async function CoachBookingPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  const coach = await prisma.coach.findUnique({
    where: { slug },
    include: {
      City: true,
      Country: true,
    },
  });

  if (!coach || !coach.isActive) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-start gap-4">
            {coach.image && (
              <img
                src={coach.image}
                alt={coach.name}
                className="w-20 h-20 rounded-full object-cover"
              />
            )}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{coach.name}</h1>
              <p className="text-gray-600">{coach.title}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span>⭐ {coach.rating?.toFixed(1)} ({coach.reviewCount} reviews)</span>
                <span>📍 {coach.City.name}, {coach.Country.name}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Session Fee</div>
              <div className="text-2xl font-bold text-purple-600">
                {coach.currency} {coach.sessionFee}
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Book a Session</h2>
          <CoachBookingForm coach={coach} locale={locale} />
        </div>
      </div>
    </div>
  );
}
