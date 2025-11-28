import { prisma } from '@/lib/prisma';
import LegalProfessionalsClient from './LegalProfessionalsClient';

export default async function AdminLegalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin
  

  let professionals: any[] = [];
  
  try {
    professionals = await prisma.legalProfessional.findMany({
      orderBy: [
        { featured: 'desc' },
        { priorityOrder: 'asc' },
        { createdAt: 'desc' },
      ],
    });
  } catch (error) {
    console.error('Error fetching legal professionals:', error);
  }

  const stats = {
    total: professionals.length,
    published: professionals.filter(p => p.status === 'PUBLISHED').length,
    featured: professionals.filter(p => p.featured).length,
    draft: professionals.filter(p => p.status === 'DRAFT').length,
    countries: [...new Set(professionals.map(p => p.country).filter(Boolean))].length,
  };

  return <LegalProfessionalsClient professionals={professionals} stats={stats} locale={locale} />;
}
