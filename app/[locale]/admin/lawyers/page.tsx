import { prisma } from '@/lib/prisma';
import LawyersClient from './LawyersClient';

export default async function AdminLawyersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin
  

  const lawyers = await prisma.provider.findMany({
    where: { isActive: true },
    include: {
      ProviderLocation: { include: { City: true } },
      _count: { select: { ProviderReview: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  const stats = {
    total: lawyers.length,
    active: lawyers.filter(d => d.isActive).length,
    totalReviews: lawyers.reduce((sum, d) => sum + d._count.ProviderReview, 0),
    avgRating: lawyers.reduce((sum, d) => sum + (d.rating || 0), 0) / lawyers.length || 0,
  };

  return <LawyersClient lawyers={lawyers} stats={stats} locale={locale} />;
}
