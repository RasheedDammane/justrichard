import { prisma } from '@/lib/prisma';
import DoctorsClient from './DoctorsClient';

export default async function AdminDoctorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin

  const doctors = await prisma.doctor.findMany({
    include: {
      City: true,
      Country: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  const stats = {
    total: doctors.length,
    active: doctors.filter(d => d.isActive).length,
    verified: doctors.filter(d => d.isVerified).length,
    avgRating: doctors.length > 0 ? doctors.reduce((sum, d) => sum + (d.rating || 0), 0) / doctors.length : 0,
  };

  // Adapter les données Doctor au format Provider attendu par DoctorsClient
  const doctorsAdapted = doctors.map(doc => ({
    id: doc.id,
    name: `${doc.title || 'Dr.'} ${doc.firstName} ${doc.lastName}`,
    email: doc.email || '',
    phone: doc.phone,
    rating: doc.rating || 0,
    isActive: doc.isActive,
    ProviderLocation: doc.City ? [{ City: { name: doc.City.name } }] : [],
    _count: { ProviderReview: doc.reviewCount || 0 },
  }));

  return <DoctorsClient doctors={doctorsAdapted} stats={stats} locale={locale} />;
}
