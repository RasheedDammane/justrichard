import ProviderForm from '@/app/[locale]/admin/doctors/ProviderForm';

export default async function NewActivitéPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin
  

  return (
    
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nouveau Activité</h1>
          <p className="text-gray-600 mt-1">Ajouter une nouvelle activité ou excursion</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <ProviderForm locale={locale} type="activity" />
        </div>
      </div>
    
  );
}
