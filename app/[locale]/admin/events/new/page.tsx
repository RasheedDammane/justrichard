import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import EventForm from '../components/EventForm';

export const metadata: Metadata = {
  title: 'Create Event | Admin',
  description: 'Create a new event',
};

export default async function NewEventPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin
  

  const [categories, cities] = await Promise.all([
    prisma.eventCategory.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    }),
    prisma.city.findMany({
      orderBy: { name: 'asc' },
      take: 100,
    }),
  ]);

  return (
    <div className="p-6">
      <EventForm locale={locale} categories={categories} cities={cities} />
    </div>
  );
}
