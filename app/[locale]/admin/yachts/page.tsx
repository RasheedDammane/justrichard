import { prisma } from '@/lib/prisma';
import YachtsClient from './YachtsClient';

export default async function AdminYachtsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin
  

  // Récupérer les yachts
  const yachts = await prisma.yacht.findMany({
    include: {
      City: true,
      Country: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Calculer les statistiques
  const stats = {
    total: yachts.length,
    featured: yachts.filter(y => y.isFeatured).length,
    avgPrice: yachts.reduce((acc, y) => acc + (y.pricePerHour || 0), 0) / (yachts.length || 1),
    totalViews: yachts.reduce((acc, y) => acc + (y.viewCount || 0), 0),
  };

  return (
    
      <YachtsClient yachts={yachts} stats={stats} locale={locale} />
    
  );
}
