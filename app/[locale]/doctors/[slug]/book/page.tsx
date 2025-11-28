import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import DoctorBookingForm from './DoctorBookingForm';

interface DoctorBookingPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function DoctorBookingPage({ params }: DoctorBookingPageProps) {
  const { locale, slug } = await params;

  const doctor = await prisma.doctor.findUnique({
    where: { slug },
    include: {
      City: true,
      Country: true,
    },
  });

  if (!doctor) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Appointment</h1>
          <p className="text-gray-600">Schedule your appointment with Dr. {doctor.name}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Dr. {doctor.name}</h2>
              <div className="space-y-1 text-sm text-gray-600">
                <p>🏥 {doctor.specialization}</p>
                <p>📍 {doctor.City?.name}, {doctor.Country?.name}</p>
                <p>⭐ {doctor.rating}/5 ({doctor.reviewCount} reviews)</p>
                <p className="text-lg font-semibold text-green-600 mt-2">
                  {doctor.currency} {doctor.consultationFee?.toLocaleString()}/consultation
                </p>
              </div>
            </div>
          </div>
        </div>

        <DoctorBookingForm doctor={doctor} locale={locale} />
      </div>
    </div>
  );
}
