import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Eye } from 'lucide-react';

export default async function AdminCategoriesPage({ params: { locale } }: { params: { locale: string } }) {
  

  const categories = await prisma.category.findMany({
    include: {
      translations: { where: { locale } },
      _count: {
        select: { services: true },
      },
    },
    orderBy: { order: 'asc' },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-600 text-white py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Gestion des Catégories</h1>
              <p className="text-primary-100 mt-1">Gérer toutes les catégories de services</p>
            </div>
            <Link
              href={`/${locale}/admin/categories/new`}
              className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Nouvelle Catégorie
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">Total Catégories</div>
            <div className="text-3xl font-bold text-primary-600 mt-2">{categories.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">Catégories Actives</div>
            <div className="text-3xl font-bold text-green-600 mt-2">
              {categories.filter((c) => c.isActive).length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">Total Services</div>
            <div className="text-3xl font-bold text-blue-600 mt-2">
              {categories.reduce((sum, c) => sum + c._count.services, 0)}
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const translation = category.translations[0];
            return (
              <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-br from-primary-400 to-primary-600 h-32 flex items-center justify-center">
                  <span className="text-6xl">{category.icon || '📦'}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {translation?.name || category.slug}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">{category.slug}</p>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {translation?.description || 'Pas de description'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      {category.isActive ? (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Actif
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                          Inactif
                        </span>
                      )}
                      <span className="text-sm text-gray-500">
                        {category._count.services} service{category._count.services !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Ordre: {category.order}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    <Link
                      href={`/${locale}/services?category=${category.slug}`}
                      className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors flex items-center justify-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      Voir
                    </Link>
                    <Link
                      href={`/${locale}/admin/categories/${category.id}/edit`}
                      className="flex-1 bg-primary-50 text-primary-600 px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-100 transition-colors flex items-center justify-center gap-1"
                    >
                      <Pencil className="w-4 h-4" />
                      Modifier
                    </Link>
                    <button className="bg-red-50 text-red-600 px-3 py-2 rounded-md text-sm font-medium hover:bg-red-100 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {categories.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-4">📂</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune catégorie</h3>
            <p className="text-gray-500 mb-6">Commencez par créer votre première catégorie de services</p>
            <Link
              href={`/${locale}/admin/categories/new`}
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Créer une Catégorie
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
