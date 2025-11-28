import { prisma } from '@/lib/prisma';
import ServicesClient from './ServicesClient';

export default async function AdminServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin
  

  const services = await prisma.service.findMany({
    include: {
      category: {
        include: { translations: { where: { locale } } },
      },
      translations: { where: { locale } },
      _count: {
        select: { Booking: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return <ServicesClient services={services} locale={locale} />;
}
