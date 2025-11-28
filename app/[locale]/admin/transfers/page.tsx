import { prisma } from '@/lib/prisma';
import TransfersClient from './TransfersClient';

export default async function AdminTransfersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin
  

  const transfersData = await prisma.transfer.findMany({
    include: {
      City: true,
      Country: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  // Adapter les données au format attendu par TransfersClient
  const transfers = transfersData.map(t => ({
    id: t.id,
    name: t.name,
    email: t.email || '',
    status: t.isActive ? 'ACTIVE' : 'INACTIVE',
    totalRevenue: 0, // À calculer si nécessaire
    _count: { services: 0, chatbots: 0, documents: 0 }
  }));

  const stats = {
    total: transfers.length,
    active: transfers.filter((p) => p.status === 'ACTIVE').length,
    pending: 0,
    totalRevenue: 0,
  };

  return <TransfersClient transfers={transfers} stats={stats} locale={locale} />;
}
