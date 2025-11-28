import MotorbikeForm from '@/app/[locale]/admin/motorbikes/MotorbikeForm';
import { prisma } from '@/lib/prisma';

export default async function EditMotorbikePage({ 
  params: { locale, id } 
}: { 
  params: { locale: string; id: string } 
}) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin


  const motorbike = await prisma.rentalMotorbike.findUnique({
    where: { id },
  });

  if (!motorbike) {
    redirect(`/${locale}/admin/motorbikes`);
  }

  return (
    
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Motorbike</h1>
          <p className="text-gray-600 mt-1">{motorbike.brand} {motorbike.model}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <MotorbikeForm locale={locale} motorbike={motorbike} />
        </div>
      </div>
    
  );
}
