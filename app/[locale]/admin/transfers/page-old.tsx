import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Users, UserCheck, Star, MapPin, Phone, Mail, Plus, Car } from 'lucide-react';

export default async function AdminTransfersPage({ params: { locale } }: { params: { locale: string } }) {
  

  // Récupérer les providers
  const items = await prisma.provider.findMany({
    where: {
      isActive: true,
    },
    include: {
      ProviderLocation: {
        include: {
          City: true,
        },
      },
      _count: {
        select: {
          ProviderReview: true,
          },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Calculer les statistiques
  const stats = {
    total: items.length,
    active: items.filter(d => d.isActive).length,
    verified: items.filter(d => d.isVerified).length,
    avgRating: items.reduce((acc, d) => acc + (d.rating || 0), 0) / (items.length || 1),
  };

  return (
    
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Transfers Management</h1>
            <p className="text-gray-600 mt-1">Manage airport transfers and transportation</p>
          </div>
          <Link
            href={`/${locale}/admin/transfers/new`}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Transfer
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 opacity-80" />
              <div className="text-xs bg-white/20 px-2 py-1 rounded">Total</div>
            </div>
            <div className="text-3xl font-bold">{stats.total}</div>
            <div className="text-sm opacity-90">Total Transfers</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <UserCheck className="w-8 h-8 opacity-80" />
              <div className="text-xs bg-white/20 px-2 py-1 rounded">Active</div>
            </div>
            <div className="text-3xl font-bold">{stats.active}</div>
            <div className="text-sm opacity-90">Active Transfers</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <UserCheck className="w-8 h-8 opacity-80" />
              <div className="text-xs bg-white/20 px-2 py-1 rounded">Verified</div>
            </div>
            <div className="text-3xl font-bold">{stats.verified}</div>
            <div className="text-sm opacity-90">Verified Transfers</div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <Star className="w-8 h-8 opacity-80" />
              <div className="text-xs bg-white/20 px-2 py-1 rounded">Rating</div>
            </div>
            <div className="text-3xl font-bold">{stats.avgRating.toFixed(1)}</div>
            <div className="text-sm opacity-90">Average Rating</div>
          </div>
        </div>

        {/* Items List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Transfers List</h2>
          </div>
          
          {items.length === 0 ? (
            <div className="p-12 text-center">
              <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">No transfers found</p>
              <p className="text-gray-400 mb-6">Start by adding your first transfer</p>
              <Link
                href={`/${locale}/admin/transfers/new`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add First Transfer
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transfer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reviews
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            {item.logo ? (
                              <img
                                className="h-12 w-12 rounded-full object-cover"
                                src={item.logo}
                                alt={item.name}
                              />
                            ) : (
                              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-blue-600 font-semibold text-lg">
                                  {item.name.charAt(0)}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-500">{item.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.phone && (
                            <div className="flex items-center gap-1">
                              <Phone className="w-4 h-4 text-gray-400" />
                              {item.phone}
                            </div>
                          )}
                          {item.email && (
                            <div className="flex items-center gap-1 mt-1">
                              <Mail className="w-4 h-4 text-gray-400" />
                              {item.email}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.ProviderLocation[0]?.City ? (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              {item.ProviderLocation[0].City.name}
                            </div>
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-medium text-gray-900">
                            {item.rating?.toFixed(1) || 'N/A'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item._count.ProviderReview} reviews
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              item.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {item.isActive ? 'Active' : 'Inactive'}
                          </span>
                          {item.isVerified && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              Verified
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          href={`/${locale}/admin/transfers/${item.id}`}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          View
                        </Link>
                        <Link
                          href={`/${locale}/admin/transfers/${item.id}/edit`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    
  );
}
