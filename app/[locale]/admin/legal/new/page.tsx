import LegalProfessionalForm from '../LegalProfessionalForm';

export default async function NewLegalProfessionalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin
  

  return (
    
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nouveau Professionnel Légal</h1>
          <p className="text-gray-600 mt-1">Ajouter un avocat, cabinet ou conseiller juridique</p>
          <p className="text-sm text-gray-500 mt-2">
            Les champs marqués d'un * sont obligatoires. Pour publier, vous devez remplir au minimum : nom, slug, ville, pays, langues et domaines de pratique.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <LegalProfessionalForm locale={locale} />
        </div>
      </div>
    
  );
}
