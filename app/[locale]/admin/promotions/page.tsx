import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';
import { Tag, Percent, Calendar, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default async function AdminPromotionsPage({ params: { locale } }: { params: { locale: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user.role !== Role.ADMIN && session.user.role !== Role.MANAGER)) {
    redirect(`/${locale}/auth/login`);
  }

  const promotions = await prisma.promotion.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const now = new Date();

  const stats = {
    total: promotions.length,
    active: promotions.filter((p) => 
      p.isActive && 
      now >= p.startsAt && 
      now <= p.expiresAt &&
      (!p.usageLimit || p.usageCount < p.usageLimit)
    ).length,
    expired: promotions.filter((p) => now > p.expiresAt).length,
    totalUsage: promotions.reduce((sum, p) => sum + p.usageCount, 0),
  };

  const getPromotionStatus = (promo: any) => {
    if (!promo.isActive) return { label: 'Inactif', color: 'bg-gray-100 text-gray-800' };
    if (now < promo.startsAt) return { label: 'Programmé', color: 'bg-blue-100 text-blue-800' };
    if (now > promo.expiresAt) return { label: 'Expiré', color: 'bg-red-100 text-red-800' };
    if (promo.usageLimit && promo.usageCount >= promo.usageLimit) 
      return { label: 'Limite atteinte', color: 'bg-orange-100 text-orange-800' };
    return { label: 'Actif', color: 'bg-green-100 text-green-800' };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-600 text-white py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Gestion des Promotions</h1>
              <p className="text-primary-100 mt-1">Codes promo et réductions</p>
            </div>
            <Link
              href={`/${locale}/admin/promotions/new`}
              className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              + Nouvelle Promotion
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
                <div className="text-gray-500 text-sm font-medium">Total Promotions</div>
                <div className="text-3xl font-bold text-primary-600 mt-2">{stats.total}</div>
              </div>
              <Tag className="w-12 h-12 text-primary-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">Actives</div>
                <div className="text-3xl font-bold text-green-600 mt-2">{stats.active}</div>
              </div>
              <TrendingUp className="w-12 h-12 text-green-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">Expirées</div>
                <div className="text-3xl font-bold text-red-600 mt-2">{stats.expired}</div>
              </div>
              <Calendar className="w-12 h-12 text-red-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">Utilisations</div>
                <div className="text-3xl font-bold text-blue-600 mt-2">{stats.totalUsage}</div>
              </div>
              <Users className="w-12 h-12 text-blue-200" />
            </div>
          </div>
        </div>

        {/* Promotions Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold">Liste des Promotions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valeur
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Période
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Utilisation
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
                {promotions.map((promo) => {
                  const status = getPromotionStatus(promo);
                  return (
                    <tr key={promo.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Tag className="w-5 h-5 text-primary-600 mr-2" />
                          <span className="font-mono font-bold text-primary-600">{promo.code}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          promo.type === 'PERCENTAGE' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {promo.type === 'PERCENTAGE' ? (
                            <span className="flex items-center gap-1">
                              <Percent className="w-3 h-3" />
                              Pourcentage
                            </span>
                          ) : (
                            'Montant fixe'
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          {promo.type === 'PERCENTAGE' ? `${promo.value}%` : `$${promo.value}`}
                        </div>
                        {promo.minAmount && (
                          <div className="text-xs text-gray-500">Min: ${promo.minAmount}</div>
                        )}
                        {promo.maxDiscount && (
                          <div className="text-xs text-gray-500">Max: ${promo.maxDiscount}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(promo.startsAt).toLocaleDateString('fr-FR')}
                        </div>
                        <div className="text-xs text-gray-500">
                          → {new Date(promo.expiresAt).toLocaleDateString('fr-FR')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {promo.usageCount}
                          {promo.usageLimit && ` / ${promo.usageLimit}`}
                        </div>
                        {promo.usageLimit && (
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                            <div 
                              className="bg-primary-600 h-1.5 rounded-full" 
                              style={{ width: `${Math.min((promo.usageCount / promo.usageLimit) * 100, 100)}%` }}
                            ></div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.color}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          href={`/${locale}/admin/promotions/${promo.id}`}
                          className="text-primary-600 hover:text-primary-900 mr-3"
                        >
                          Voir
                        </Link>
                        <Link
                          href={`/${locale}/admin/promotions/${promo.id}/edit`}
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
        {promotions.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Tag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune promotion</h3>
            <p className="text-gray-500 mb-6">
              Commencez par créer votre première promotion
            </p>
            <Link
              href={`/${locale}/admin/promotions/new`}
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700"
            >
              + Créer une Promotion
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
