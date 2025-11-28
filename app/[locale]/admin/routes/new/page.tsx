import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function NewRoutePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin


  return (
    
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link
            href={`/${locale}/admin/routes`}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Nouveau Route</h1>
            <p className="text-gray-600 mt-1">Ajouter une nouvelle route</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Formulaire de création à implémenter</p>
            <Link
              href={`/${locale}/admin/routes`}
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Retour à la liste
            </Link>
          </div>
        </div>
      </div>
    
  );
}
