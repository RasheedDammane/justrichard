import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';
import { FileText, Globe, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

export default async function AdminCMSPagesPage({ params: { locale } }: { params: { locale: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user.role !== Role.ADMIN && session.user.role !== Role.MANAGER)) {
    redirect(`/${locale}/auth/login`);
  }

  const pages = await prisma.cMSPage.findMany({
    include: {
      translations: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  const stats = {
    total: pages.length,
    active: pages.filter((p) => p.isActive).length,
    inactive: pages.filter((p) => !p.isActive).length,
    totalTranslations: pages.reduce((sum, p) => sum + p.translations.length, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-600 text-white py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Gestion des Pages CMS</h1>
              <p className="text-primary-100 mt-1">Contenu dynamique et pages personnalisées</p>
            </div>
            <Link
              href={`/${locale}/admin/cms-pages/new`}
              className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              + Nouvelle Page
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">Total Pages</div>
                <div className="text-3xl font-bold text-primary-600 mt-2">{stats.total}</div>
              </div>
              <FileText className="w-12 h-12 text-primary-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">Actives</div>
                <div className="text-3xl font-bold text-green-600 mt-2">{stats.active}</div>
              </div>
              <CheckCircle className="w-12 h-12 text-green-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">Inactives</div>
                <div className="text-3xl font-bold text-gray-600 mt-2">{stats.inactive}</div>
              </div>
              <XCircle className="w-12 h-12 text-gray-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">Traductions</div>
                <div className="text-3xl font-bold text-blue-600 mt-2">{stats.totalTranslations}</div>
              </div>
              <Globe className="w-12 h-12 text-blue-200" />
            </div>
          </div>
        </div>

        {/* Pages Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold">Liste des Pages</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Page
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Traductions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Créée le
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pages.map((page) => {
                  const frTranslation = page.translations.find((t) => t.locale === 'fr');
                  const enTranslation = page.translations.find((t) => t.locale === 'en');
                  const arTranslation = page.translations.find((t) => t.locale === 'ar');
                  
                  return (
                    <tr key={page.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 text-primary-600 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {frTranslation?.title || enTranslation?.title || 'Sans titre'}
                            </div>
                            {frTranslation?.seoTitle && (
                              <div className="text-xs text-gray-500">{frTranslation.seoTitle}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                          /{page.slug}
                        </code>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {frTranslation && (
                            <span className="px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800">
                              FR
                            </span>
                          )}
                          {enTranslation && (
                            <span className="px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-800">
                              EN
                            </span>
                          )}
                          {arTranslation && (
                            <span className="px-2 py-1 text-xs font-semibold rounded bg-purple-100 text-purple-800">
                              AR
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {page.isActive ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(page.createdAt).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          href={`/${locale}/admin/cms-pages/${page.id}`}
                          className="text-primary-600 hover:text-primary-900 mr-3"
                        >
                          Voir
                        </Link>
                        <Link
                          href={`/${locale}/admin/cms-pages/${page.id}/edit`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Modifier
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {pages.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune page CMS</h3>
            <p className="text-gray-500 mb-6">
              Commencez par créer votre première page personnalisée
            </p>
            <Link
              href={`/${locale}/admin/cms-pages/new`}
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700"
            >
              + Créer une Page
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
