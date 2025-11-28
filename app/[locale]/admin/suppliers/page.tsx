import { prisma } from '@/lib/prisma';
import SuppliersClient from './SuppliersClient';

export default async function AdminSuppliersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin
  

  const suppliersData = await prisma.supplier.findMany({
    include: {
      City: true,
      Country: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  // Adapter les données au format attendu par SuppliersClient
  const suppliers = suppliersData.map(s => ({
    id: s.id,
    name: s.name,
    email: s.email || '',
    status: s.isActive ? 'ACTIVE' : 'INACTIVE',
    totalRevenue: 0, // À calculer si nécessaire
    _count: { services: 0, chatbots: 0, documents: 0 }
  }));

  const stats = {
    total: suppliers.length,
    active: suppliers.filter((p) => p.status === 'ACTIVE').length,
    pending: 0,
    totalRevenue: 0,
  };

  return <SuppliersClient suppliers={suppliers} stats={stats} locale={locale} />;
}
