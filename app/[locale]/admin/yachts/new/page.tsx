import YachtForm from '@/app/[locale]/admin/yachts/YachtForm';

export default async function NewYachtPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin
  

  return (
    
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nouveau Yacht</h1>
          <p className="text-gray-600 mt-1">Ajouter un nouveau yacht à la flotte</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <YachtForm locale={locale} />
        </div>
      </div>
    
  );
}
