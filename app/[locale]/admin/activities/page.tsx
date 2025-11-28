import { prisma } from '@/lib/prisma';
import ActivitiesClient from './ActivitiesClient';

export default async function AdminActivitiesPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin
  

  const activities = await prisma.provider.findMany({
    where: { isActive: true },
    include: {
      ProviderLocation: { include: { City: true } },
      _count: { select: { ProviderReview: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  const stats = {
    total: activities.length,
    active: activities.filter(d => d.isActive).length,
    totalReviews: activities.reduce((sum, d) => sum + d._count.ProviderReview, 0),
    avgRating: activities.reduce((sum, d) => sum + (d.rating || 0), 0) / activities.length || 0,
  };

  return <ActivitiesClient activities={activities} stats={stats} locale={locale} />;
}
