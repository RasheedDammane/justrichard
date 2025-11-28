import { prisma } from '@/lib/prisma';
import LegalProfessionalForm from '../LegalProfessionalForm';

export default async function EditLegalProfessionalPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  

  const professional = await prisma.legalProfessional.findUnique({
    where: { id },
  });

  if (!professional) {
    redirect(`/${locale}/admin/legal`);
  }

  return (
    
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Modifier {professional.name}</h1>
          <p className="text-gray-600 mt-1">Mettre à jour les informations du professionnel</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <LegalProfessionalForm locale={locale} professional={professional} />
        </div>
      </div>
    
  );
}
