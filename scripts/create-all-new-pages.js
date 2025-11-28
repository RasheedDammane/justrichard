const fs = require('fs');
const path = require('path');

const sections = [
  { path: 'users', title: 'Utilisateur', description: 'Ajouter un nouvel utilisateur' },
  { path: 'bookings', title: 'Réservation', description: 'Créer une nouvelle réservation' },
  { path: 'categories', title: 'Catégorie', description: 'Ajouter une nouvelle catégorie' },
  { path: 'yachts', title: 'Yacht', description: 'Ajouter un nouveau yacht' },
  { path: 'blog', title: 'Article', description: 'Créer un nouvel article de blog' },
  { path: 'notifications', title: 'Notification', description: 'Créer une nouvelle notification' },
  { path: 'analytics', title: 'Rapport', description: 'Créer un nouveau rapport analytique' },
  { path: 'media', title: 'Média', description: 'Uploader un nouveau média' },
  { path: 'simulators', title: 'Simulateur', description: 'Créer un nouveau simulateur' },
  { path: 'crypto-payments', title: 'Paiement Crypto', description: 'Configurer un nouveau paiement crypto' },
  { path: 'logs', title: 'Log', description: 'Ajouter un nouveau log' },
  { path: 'exchange-rates', title: 'Taux de Change', description: 'Ajouter un nouveau taux de change' },
  { path: 'styles', title: 'Style', description: 'Créer un nouveau style' },
  { path: 'routes', title: 'Route', description: 'Ajouter une nouvelle route' },
  { path: 'data', title: 'Donnée', description: 'Importer de nouvelles données' },
];

sections.forEach(section => {
  // Créer le dossier new
  const newDir = path.join(process.cwd(), `app/[locale]/admin/${section.path}/new`);
  if (!fs.existsSync(newDir)) {
    fs.mkdirSync(newDir, { recursive: true });
  }

  // Vérifier si page.tsx existe déjà
  const pagePath = path.join(newDir, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    console.log(`⏭️  ${section.path}/new/page.tsx existe déjà`);
    return;
  }

  // Créer page.tsx
  const pageContent = `import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function New${section.title.replace(/\s/g, '')}Page({ params: { locale } }: { params: { locale: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
    redirect(\`/\${locale}/auth/login\`);
  }

  return (
    <AdminLayout locale={locale} userName={session.user.name || undefined} userRole={session.user.role}>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link
            href={\`/\${locale}/admin/${section.path}\`}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Nouveau ${section.title}</h1>
            <p className="text-gray-600 mt-1">${section.description}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Formulaire de création à implémenter</p>
            <Link
              href={\`/\${locale}/admin/${section.path}\`}
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Retour à la liste
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
`;

  fs.writeFileSync(pagePath, pageContent, 'utf8');
  console.log(`✅ Créé: ${section.path}/new/page.tsx`);
});

console.log('🎉 Toutes les pages "new" ont été créées!');
