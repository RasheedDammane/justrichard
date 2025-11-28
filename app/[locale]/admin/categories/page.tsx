import { prisma } from '@/lib/prisma';
import CategoriesClient from './CategoriesClient';

export default async function AdminCategoriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin
  

  const categories = await prisma.category.findMany({
    include: {
      translations: { where: { locale } },
      _count: { select: { services: true } },
    },
    orderBy: { order: 'asc' },
  });

  return <CategoriesClient categories={categories} locale={locale} />;
}
