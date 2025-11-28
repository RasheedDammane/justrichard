export default async function AdminSimulatorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin


  return (
    
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Simulators Management</h1>
            <p className="text-gray-600 mt-1">Manage price calculators and simulators</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Add Simulator
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600">Simulators page - Coming soon</p>
        </div>
      </div>
    
  );
}
