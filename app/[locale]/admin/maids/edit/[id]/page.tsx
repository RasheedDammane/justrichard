import { prisma } from '@/lib/prisma';
import MaidForm from '../../MaidForm';

interface EditMaidPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default async function EditMaidPage({ params }: EditMaidPageProps) {
  const { locale, id } = await params;
  

  const maid = await prisma.maid.findUnique({
    where: { id },
    include: {
      City: true,
      Country: true,
    },
  });

  if (!maid) {
    redirect(`/${locale}/admin/maids`);
  }

  return (
    
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Maid</h1>
          <p className="text-gray-600 mt-1">Update maid information</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <MaidForm locale={locale} maid={maid} />
        </div>
      </div>
    
  );
}
