import { prisma } from '@/lib/prisma';
import FurnitureCleaningClient from './FurnitureCleaningClient';

export default async function AdminHomeCleaningPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin
  

  // Fetch furniture cleaning services
  const services = await prisma.cleaningService.findMany({
    where: { type: 'furniture' },
    include: {
      City: true,
      Country: true,
      _count: {
        select: {
          CleaningBooking: true,
          CleaningReview: true,
        },
      },
    },
    orderBy: [
      { isFeatured: 'desc' },
      { createdAt: 'desc' },
    ],
  });
  
  const stats = {
    total: services.length,
    active: services.filter(s => s.isActive).length,
    featured: services.filter(s => s.isFeatured).length,
    totalBookings: services.reduce((sum, s) => sum + s._count.CleaningBooking, 0),
  };

  return <FurnitureCleaningClient services={services} stats={stats} locale={locale} />;
}
