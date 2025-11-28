import { Metadata } from 'next';
import { redirect, notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import MovingServiceForm from '../../components/MovingServiceForm';

export const metadata: Metadata = {
  title: 'Edit Moving Service | Admin',
  description: 'Edit moving service',
};

export default async function EditMovingServicePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  

  const service = await prisma.movingService.findUnique({
    where: { id },
  });

  if (!service) {
    notFound();
  }

  return (
    <div className="p-6">
      <MovingServiceForm 
        locale={locale} 
        initialData={service}
        isEdit={true}
      />
    </div>
  );
}
