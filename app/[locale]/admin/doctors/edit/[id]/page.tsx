import { prisma } from '@/lib/prisma';
import DoctorForm from '../../DoctorForm';

interface EditDoctorPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default async function EditDoctorPage({ params }: EditDoctorPageProps) {
  const { locale, id } = await params;
  

  const doctor = await prisma.doctor.findUnique({
    where: { id },
    include: {
      City: true,
      Country: true,
    },
  });

  if (!doctor) {
    redirect(`/${locale}/admin/doctors`);
  }

  return (
    
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Doctor</h1>
          <p className="text-gray-600 mt-1">Update doctor information</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <DoctorForm locale={locale} doctor={doctor} />
        </div>
      </div>
    
  );
}
