import RentalCarForm from '@/app/[locale]/admin/rental-cars/RentalCarForm';
import { prisma } from '@/lib/prisma';

export default async function EditRentalCarPage({ params: { locale, id } }: { params: { locale: string; id: string } }) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin

  const car = await prisma.rentalCar.findUnique({ where: { id } });
  if (!car) redirect(`/${locale}/admin/rental-cars`);
  return (
    
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Rental Car</h1>
          <p className="text-gray-600 mt-1">{car.name}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <RentalCarForm locale={locale} car={car} />
        </div>
      </div>
    
  );
}