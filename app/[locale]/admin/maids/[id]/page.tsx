import MaidForm from '@/app/[locale]/admin/maids/MaidForm';
import { prisma } from '@/lib/prisma';

export default async function EditMaidPage({ 
  params: { locale, id } 
}: { 
  params: { locale: string; id: string } 
}) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin


  const maid = await prisma.maid.findUnique({
    where: { id },
  });

  if (!maid) {
    redirect(`/${locale}/admin/maids`);
  }

  return (
    
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Maid</h1>
          <p className="text-gray-600 mt-1">{maid.name}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <MaidForm locale={locale} maid={maid} />
        </div>
      </div>
    
  );
}
