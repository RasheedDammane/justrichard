import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Pencil, Trash2, Plus, Eye } from 'lucide-react';

export default async function AdminServicesPage({ params: { locale } }: { params: { locale: string } }) {
  

  const services = await prisma.service.findMany({
    include: {
      category: {
        include: { translations: { where: { locale } } },
      },
      translations: { where: { locale } },
      _count: {
        select: { bookings: true, reviews: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-600 text-white py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Gestion des Services</h1>
              <p className="text-primary-100 mt-1">Gérer tous les services de la plateforme</p>
            </div>
            <Link
              href={`/${locale}/admin/services/new`}
              className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Nouveau Service
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">Total Services</div>
            <div className="text-3xl font-bold text-primary-600 mt-2">{services.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">Services Actifs</div>
            <div className="text-3xl font-bold text-green-600 mt-2">
              {services.filter((s) => s.isActive).length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">Services Actifs</div>
            <div className="text-3xl font-bold text-purple-600 mt-2">
              {services.filter((s) => s.isActive).length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">Total Réservations</div>
            <div className="text-3xl font-bold text-blue-600 mt-2">
              {services.reduce((sum, s) => sum + s._count.bookings, 0)}
            </div>
          </div>
        </div>

        {/* Services Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold">Liste des Services</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Catégorie
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prix
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durée
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Réservations
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Note
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {services.map((service) => {
                  const translation = service.translations[0];
                  const categoryTranslation = service.category.translations[0];
                  return (
                    <tr key={service.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {translation?.name || service.slug}
                            </div>
                            <div className="text-sm text-gray-500">{service.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {categoryTranslation?.name || service.category.slug}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${service.basePrice} {service.currency}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {service.duration} min
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {service._count.bookings}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {service.rating ? (
                          <div className="flex items-center">
                            <span className="text-yellow-500">★</span>
                            <span className="ml-1">{service.rating.toFixed(1)}</span>
                            <span className="ml-1 text-gray-400">({service._count.reviews})</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">Pas de notes</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {service.isActive ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Actif
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              Inactif
                            </span>
                          )}
                          {service.basePrice && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                              ${service.basePrice}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/${locale}/services/${service.slug}`}
                            className="text-blue-600 hover:text-blue-900"
                            title="Voir"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/${locale}/admin/services/${service.id}/edit`}
                            className="text-primary-600 hover:text-primary-900"
                            title="Modifier"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <button
                            className="text-red-600 hover:text-red-900"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
