import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Ship, Users, Star, DollarSign, Eye, Plus } from 'lucide-react';
import YachtsClient from './YachtsClient';

export default async function AdminYachtsPage({ params: { locale } }: { params: { locale: string } }) {
  

  // Récupérer les yachts
  const yachts = await prisma.yacht.findMany({
    include: {
      City: true,
      Country: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Calculer les statistiques
  const stats = {
    total: yachts.length,
    featured: yachts.filter(y => y.isFeatured).length,
    avgPrice: yachts.reduce((acc, y) => acc + (y.pricePerHour || 0), 0) / (yachts.length || 1),
    totalViews: yachts.reduce((acc, y) => acc + (y.viewCount || 0), 0),
  };

  return (
    
      <YachtsClient yachts={yachts} stats={stats} locale={locale} />
    
  );
}

/* OLD CODE - TO BE DELETED
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Yachts Management</h1>
            <p className="text-gray-600 mt-1">Manage yacht rentals and bookings</p>
          </div>
          <Link
            href={`/${locale}/admin/yachts/new`}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Yacht
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <Ship className="w-8 h-8 opacity-80" />
              <div className="text-xs bg-white/20 px-2 py-1 rounded">Total</div>
            </div>
            <div className="text-3xl font-bold">{stats.total}</div>
            <div className="text-sm opacity-90">Total Yachts</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <Star className="w-8 h-8 opacity-80" />
              <div className="text-xs bg-white/20 px-2 py-1 rounded">Featured</div>
            </div>
            <div className="text-3xl font-bold">{stats.featured}</div>
            <div className="text-sm opacity-90">Featured Yachts</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 opacity-80" />
              <div className="text-xs bg-white/20 px-2 py-1 rounded">Avg Price</div>
            </div>
            <div className="text-3xl font-bold">{Math.round(stats.avgPrice)}</div>
            <div className="text-sm opacity-90">AED per hour</div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <Eye className="w-8 h-8 opacity-80" />
              <div className="text-xs bg-white/20 px-2 py-1 rounded">Views</div>
            </div>
            <div className="text-3xl font-bold">{stats.totalViews}</div>
            <div className="text-sm opacity-90">Total Views</div>
          </div>
        </div>

        {/* Yachts List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Yachts List</h2>
          </div>
          
          {yachts.length === 0 ? (
            <div className="p-12 text-center">
              <Ship className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">No yachts found</p>
              <p className="text-gray-400 mb-6">Start by adding your first yacht</p>
              <Link
                href={`/${locale}/admin/yachts/new`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add First Yacht
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Yacht
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Capacity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Length
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price/Hour
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Views
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
                  {yachts.map((yacht) => (
                    <tr key={yacht.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            {yacht.images && yacht.images.length > 0 ? (
                              <img
                                className="h-12 w-12 rounded object-cover"
                                src={yacht.images[0]}
                                alt={yacht.name}
                              />
                            ) : (
                              <div className="h-12 w-12 rounded bg-blue-100 flex items-center justify-center">
                                <Ship className="w-6 h-6 text-blue-600" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{yacht.name}</div>
                            <div className="text-sm text-gray-500">{yacht.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-sm text-gray-900">
                          <Users className="w-4 h-4 text-gray-400" />
                          {yacht.capacity} guests
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {yacht.length} ft
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {yacht.pricePerHour} AED
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {yacht.City?.name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Eye className="w-4 h-4" />
                          {yacht.viewCount || 0}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {yacht.isFeatured && (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                            Featured
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          href={`/${locale}/yachts/${yacht.slug}`}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                          target="_blank"
                        >
                          View
                        </Link>
                        <Link
                          href={`/${locale}/admin/yachts/${yacht.id}/edit`}
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
