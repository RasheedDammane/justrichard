import MotorbikeForm from '@/app/[locale]/admin/motorbikes/MotorbikeForm';

export default async function NewMotorbikePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin


  return (
    
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">New Motorbike</h1>
          <p className="text-gray-600 mt-1">Add a new motorbike to the system</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <MotorbikeForm locale={locale} />
        </div>
      </div>
    
  );
}
