import { prisma } from '@/lib/prisma';
import HomeCleaningFormComplete from '../HomeCleaningFormComplete';

export default async function NewHomeCleaningPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin
  

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
          <h1 className="text-3xl font-bold text-gray-900">Add Home Cleaning Service</h1>
          <p className="text-gray-600 mt-1">Create a new home cleaning service</p>
        </div>

        <HomeCleaningFormComplete 
          locale={locale} 
          cities={cities} 
          countries={countries}
        />
      </div>
    
  );
}
