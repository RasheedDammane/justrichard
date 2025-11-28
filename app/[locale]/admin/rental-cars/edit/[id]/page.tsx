import { prisma } from '@/lib/prisma';
import RentalCarForm from '../../RentalCarForm';

interface EditRentalCarPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default async function EditRentalCarPage({ params }: EditRentalCarPageProps) {
  const { locale, id } = await params;
  

  const rentalCar = await prisma.rentalCar.findUnique({
    where: { id },
    include: {
      City: true,
      Country: true,
    },
  });

  if (!rentalCar) {
    redirect(`/${locale}/admin/rental-cars`);
  }

  return (
    
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Rental Car</h1>
          <p className="text-gray-600 mt-1">Update rental car information</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <RentalCarForm locale={locale} rentalCar={rentalCar} />
        </div>
      </div>
    
  );
}
