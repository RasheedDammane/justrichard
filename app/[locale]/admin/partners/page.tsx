import { prisma } from '@/lib/prisma';
import PartnersClient from './PartnersClient';

export default async function AdminPartnersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin


  const partners = await prisma.partner.findMany({
    include: {
      _count: { select: { services: true, chatbots: true, documents: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  const stats = {
    total: partners.length,
    active: partners.filter((p) => p.status === 'ACTIVE').length,
    pending: partners.filter((p) => p.status === 'PENDING').length,
    totalRevenue: partners.reduce((sum, p) => sum + p.totalRevenue, 0),
  };

  return <PartnersClient partners={partners} stats={stats} locale={locale} />;
}
