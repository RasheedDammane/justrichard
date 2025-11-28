import { prisma } from '@/lib/prisma';
import ActivityForm from '../../ActivityForm';

interface EditActivityPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default async function EditActivityPage({ params }: EditActivityPageProps) {
  const { locale, id } = await params;
  

  const activity = await prisma.activity.findUnique({
    where: { id },
    include: {
      City: true,
      Country: true,
    },
  });

  if (!activity) {
    redirect(`/${locale}/admin/activities`);
  }

  return (
    
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Activity</h1>
          <p className="text-gray-600 mt-1">Update activity information</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <ActivityForm locale={locale} activity={activity} />
        </div>
      </div>
    
  );
}
