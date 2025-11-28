import { redirect, notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import HomeCleaningFormComplete from '../../HomeCleaningFormComplete';

export default async function EditHomeCleaningPage({ 
  params 
}: { 
  params: Promise<{ locale: string; id: string }> 
}) {
  const { locale, id } = await params;
  

  // Get the service
  const service = await prisma.cleaningService.findUnique({
    where: { id },
    include: {
      City: true,
      Country: true,
    },
  });

  if (!service) {
    notFound();
  }

  // Get cities and countries for the form
  const [cities, countries] = await Promise.all([
    prisma.city.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    }),
    prisma.country.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    }),
  ]);

  return (
    
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Home Cleaning Service</h1>
          <p className="text-gray-600 mt-1">Update service: {service.name}</p>
        </div>

        <LaundryFormComplete 
          locale={locale} 
          initialData={service}
          isEdit={true}
          cities={cities} 
          countries={countries}
        />
      </div>
    
  );
}
