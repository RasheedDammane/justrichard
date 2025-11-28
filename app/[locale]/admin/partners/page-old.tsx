import { prisma } from '@/lib/prisma';
import { Building2, Users, DollarSign, Upload } from 'lucide-react';
import Link from 'next/link';

export default async function AdminPartnersPage({ params: { locale } }: { params: { locale: string } }) {
  

  const partners = await prisma.partner.findMany({
    include: {
      _count: {
        select: { services: true, chatbots: true, documents: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const stats = {
    total: partners.length,
    active: partners.filter((p) => p.status === 'ACTIVE').length,
    pending: partners.filter((p) => p.status === 'PENDING').length,
    totalRevenue: partners.reduce((sum, p) => sum + p.totalRevenue, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-600 text-white py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Gestion des Partenaires</h1>
              <p className="text-primary-100 mt-1">Gérer tous les partenaires et leur onboarding</p>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/${locale}/admin/partners/import`}
                className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <Upload className="w-5 h-5" />
                Importer JSON
              </Link>
              <Link
                href={`/${locale}/admin/partners/new`}
                className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                + Nouveau Partenaire
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">Total Partenaires</div>
                <div className="text-3xl font-bold text-primary-600 mt-2">{stats.total}</div>
              </div>
              <Building2 className="w-12 h-12 text-primary-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">Actifs</div>
                <div className="text-3xl font-bold text-green-600 mt-2">{stats.active}</div>
              </div>
              <Users className="w-12 h-12 text-green-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">En Attente</div>
                <div className="text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</div>
              </div>
              <Users className="w-12 h-12 text-yellow-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">Revenu Total</div>
                <div className="text-3xl font-bold text-blue-600 mt-2">
                  ${stats.totalRevenue.toFixed(0)}
                </div>
              </div>
              <DollarSign className="w-12 h-12 text-blue-200" />
            </div>
          </div>
        </div>

        {/* Partners Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold">Liste des Partenaires</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Partenaire
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Localisation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Services
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commission
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenu
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
                {partners.map((partner) => (
                  <tr key={partner.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {partner.logo ? (
                          <img src={partner.logo} alt={partner.name} className="w-10 h-10 rounded-full" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                            <span className="text-primary-600 font-semibold">
                              {partner.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{partner.name}</div>
                          {partner.companyName && (
                            <div className="text-sm text-gray-500">{partner.companyName}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {partner.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{partner.email}</div>
                      <div className="text-sm text-gray-500">{partner.phone || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{partner.city || 'N/A'}</div>
                      <div className="text-sm text-gray-500">{partner.country || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {partner._count.services} service(s)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {partner.commissionRate}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      ${partner.totalRevenue.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            partner.status === 'ACTIVE'
                              ? 'bg-green-100 text-green-800'
                              : partner.status === 'PENDING'
                              ? 'bg-yellow-100 text-yellow-800'
                              : partner.status === 'SUSPENDED'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {partner.status}
                        </span>
                        {partner.isVerified && (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                            ✓ Vérifié
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        href={`/${locale}/admin/partners/${partner.id}`}
                        className="text-primary-600 hover:text-primary-900 mr-3"
                      >
                        Voir
                      </Link>
                      <Link
                        href={`/${locale}/admin/partners/${partner.id}/edit`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Modifier
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {partners.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun partenaire</h3>
            <p className="text-gray-500 mb-6">
              Commencez par ajouter votre premier partenaire ou importez-en plusieurs via JSON
            </p>
            <div className="flex gap-3 justify-center">
              <Link
                href={`/${locale}/admin/partners/import`}
                className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600"
              >
                <Upload className="w-5 h-5" />
                Importer JSON
              </Link>
              <Link
                href={`/${locale}/admin/partners/new`}
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700"
              >
                + Créer un Partenaire
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
