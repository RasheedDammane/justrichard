import { prisma } from '@/lib/prisma';
import LegalProfessionalForm from '../../LegalProfessionalForm';

interface EditLegalProfessionalPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default async function EditLegalProfessionalPage({ params }: EditLegalProfessionalPageProps) {
  const { locale, id } = await params;
  

  const legalProfessional = await prisma.legalProfessional.findUnique({
    where: { id },
  });

  if (!legalProfessional) {
    redirect(`/${locale}/admin/legal`);
  }

  return (
    
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Legal Professional</h1>
          <p className="text-gray-600 mt-1">Update legal professional information</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <LegalProfessionalForm locale={locale} legalProfessional={legalProfessional} />
        </div>
      </div>
    
  );
}
