import { prisma } from '@/lib/prisma';
import CoachesClient from './CoachesClient';

export default async function AdminCoachesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin
  

  const coaches = await prisma.coach.findMany({
    where: {},
    include: {
      City: true,
      Country: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  const stats = {
    total: coaches.length,
    active: coaches.filter(d => d.isActive).length,
    totalClients: coaches.reduce((sum, d) => sum + (d.totalClients || 0), 0),
    avgRating: coaches.reduce((sum, d) => sum + (d.rating || 0), 0) / coaches.length || 0,
  };

  return (
    
      <CoachesClient coaches={coaches} stats={stats} locale={locale} />
    
  );
}
