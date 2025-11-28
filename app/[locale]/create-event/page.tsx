import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import CreateEventClient from './CreateEventClient';

export const metadata: Metadata = {
  title: 'Create Event | JustRichard',
  description: 'Create and publish your event',
};

export default async function CreateEventPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/auth/signin?callbackUrl=/${locale}/create-event`);
  }

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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Create Your Event</h1>
              <p className="text-gray-600">
                Fill in the details below to create and publish your event
              </p>
            </div>
            
            <CreateEventClient 
              locale={locale}
              categories={categories}
              cities={cities}
              user={session.user}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
