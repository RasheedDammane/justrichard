import { Metadata } from 'next';
import { redirect, notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ParcelServiceForm from '../../components/ParcelServiceForm';

export const metadata: Metadata = {
  title: 'Edit Parcel Service | Admin',
  description: 'Edit parcel delivery service',
};

export default async function EditParcelServicePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  

  const service = await prisma.parcelService.findUnique({
    where: { id },
  });

  if (!service) {
    notFound();
  }

  return (
    <div className="p-6">
      <ParcelServiceForm 
        locale={locale} 
        initialData={service}
        isEdit={true}
      />
    </div>
  );
}
