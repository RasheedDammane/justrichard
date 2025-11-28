import { prisma } from '@/lib/prisma';
import YachtForm from '../../YachtForm';

interface EditYachtPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default async function EditYachtPage({ params }: EditYachtPageProps) {
  const { locale, id } = await params;
  

  const yacht = await prisma.yacht.findUnique({
    where: { id },
    include: {
      City: true,
      Country: true,
    },
  });

  if (!yacht) {
    redirect(`/${locale}/admin/yachts`);
  }

  return (
    
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Yacht</h1>
          <p className="text-gray-600 mt-1">Update yacht information</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <YachtForm locale={locale} yacht={yacht} />
        </div>
      </div>
    
  );
}
