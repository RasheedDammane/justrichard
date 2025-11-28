import { prisma } from '@/lib/prisma';
import CoachForm from '../../CoachForm';

interface EditCoachPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default async function EditCoachPage({ params }: EditCoachPageProps) {
  const { locale, id } = await params;
  

  const coach = await prisma.coach.findUnique({
    where: { id },
    include: {
      City: true,
      Country: true,
    },
  });

  if (!coach) {
    redirect(`/${locale}/admin/coaches`);
  }

  return (
    
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Coach</h1>
          <p className="text-gray-600 mt-1">Update coach information</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <CoachForm locale={locale} coach={coach} />
        </div>
      </div>
    
  );
}
