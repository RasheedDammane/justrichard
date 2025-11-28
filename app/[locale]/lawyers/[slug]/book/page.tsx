import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import LawyerBookingForm from './LawyerBookingForm';

interface LawyerBookingPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function LawyerBookingPage({ params }: LawyerBookingPageProps) {
  const { locale, slug } = await params;

  const lawyer = await prisma.lawyer.findUnique({
    where: { slug },
    include: { City: true, Country: true },
  });

  if (!lawyer) notFound();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Consultation</h1>
          <p className="text-gray-600">Schedule your legal consultation with {lawyer.name}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{lawyer.name}</h2>
          <div className="space-y-1 text-sm text-gray-600">
            <p>⚖️ {lawyer.specialization}</p>
            <p>📍 {lawyer.City?.name}, {lawyer.Country?.name}</p>
            <p>📜 {lawyer.yearsOfExperience} years experience</p>
            <p className="text-lg font-semibold text-purple-600 mt-2">
              {lawyer.currency} {lawyer.consultationFee?.toLocaleString()}/hour
            </p>
          </div>
        </div>

        <LawyerBookingForm lawyer={lawyer} locale={locale} />
      </div>
    </div>
  );
}
