const fs = require('fs');
const path = require('path');

const sections = [
  { path: 'lawyers', title: 'Avocat', description: 'Ajouter un nouvel avocat ou professionnel juridique', type: 'lawyer' },
  { path: 'coaches', title: 'Coach', description: 'Ajouter un nouveau coach ou entraîneur', type: 'coach' },
  { path: 'transfers', title: 'Service de Transfer', description: 'Ajouter un nouveau service de transfert', type: 'transfer' },
  { path: 'activities', title: 'Activité', description: 'Ajouter une nouvelle activité ou excursion', type: 'activity' },
  { path: 'suppliers', title: 'Fournisseur', description: 'Ajouter un nouveau fournisseur', type: 'supplier' },
];

sections.forEach(section => {
  // Créer le dossier new
  const newDir = path.join(process.cwd(), `app/[locale]/admin/${section.path}/new`);
  if (!fs.existsSync(newDir)) {
    fs.mkdirSync(newDir, { recursive: true });
  }

  // Créer page.tsx
  const pageContent = `import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import AdminLayout from '@/components/admin/AdminLayout';
import ProviderForm from '@/app/[locale]/admin/doctors/ProviderForm';

export default async function New${section.title.replace(/\s/g, '')}Page({ params: { locale } }: { params: { locale: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
    redirect(\`/\${locale}/auth/login\`);
  }

  return (
    <AdminLayout locale={locale} userName={session.user.name || undefined} userRole={session.user.role}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nouveau ${section.title}</h1>
          <p className="text-gray-600 mt-1">${section.description}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <ProviderForm locale={locale} type="${section.type}" />
        </div>
      </div>
    </AdminLayout>
  );
}
`;

  const pagePath = path.join(newDir, 'page.tsx');
  fs.writeFileSync(pagePath, pageContent, 'utf8');
  console.log(`✅ Créé: ${section.path}/new/page.tsx`);
});

console.log('🎉 Toutes les pages "new" ont été créées!');
