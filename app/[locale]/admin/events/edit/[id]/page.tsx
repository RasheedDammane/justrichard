import { Metadata } from 'next';
import { redirect, notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import EventForm from '../../components/EventForm';

export const metadata: Metadata = {
  title: 'Edit Event | Admin',
  description: 'Edit event',
};

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  

  const [event, categories, cities] = await Promise.all([
    prisma.event.findUnique({
      where: { id },
    }),
    prisma.eventCategory.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    }),
    prisma.city.findMany({
      orderBy: { name: 'asc' },
      take: 100,
    }),
  ]);

  if (!event) {
    notFound();
  }

  return (
    <div className="p-6">
      <EventForm 
        locale={locale} 
        initialData={event}
        isEdit={true}
        categories={categories}
        cities={cities}
      />
    </div>
  );
}
