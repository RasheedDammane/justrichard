import { Metadata } from 'next';
import Link from 'next/link';
import { Truck, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Moving Services | Admin',
  description: 'Manage moving services',
};

export default async function MovingServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin


  const services = await prisma.movingService.findMany({
    orderBy: [
      { isFeatured: 'desc' },
      { createdAt: 'desc' },
    ],
    include: {
      _count: {
        select: {
          bookings: true,
          quotes: true,
        },
      },
    },
  });

  const stats = {
    total: services.length,
    active: services.filter(s => s.isActive).length,
    featured: services.filter(s => s.isFeatured).length,
    totalBookings: services.reduce((sum, s) => sum + s.totalBookings, 0),
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Truck className="w-8 h-8" />
            Moving Services
          </h1>
          <p className="text-gray-600 mt-1">
            Manage moving and relocation services
          </p>
        </div>
        <Link
          href={`/${locale}/admin/moving/new`}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Add Service
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Total Services</div>
          <div className="text-2xl font-bold">{stats.total}</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow">
          <div className="text-sm text-green-600">Active</div>
          <div className="text-2xl font-bold text-green-600">{stats.active}</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg shadow">
          <div className="text-sm text-blue-600">Featured</div>
          <div className="text-2xl font-bold text-blue-600">{stats.featured}</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg shadow">
          <div className="text-sm text-purple-600">Total Bookings</div>
          <div className="text-2xl font-bold text-purple-600">{stats.totalBookings}</div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Link
          href={`/${locale}/admin/moving/quotes`}
          className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <h3 className="font-semibold text-lg mb-1">Quote Requests</h3>
          <p className="text-sm text-gray-600">View and manage quote requests</p>
        </Link>
        <Link
          href={`/${locale}/admin/moving/bookings`}
          className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <h3 className="font-semibold text-lg mb-1">Bookings</h3>
          <p className="text-sm text-gray-600">Manage moving bookings</p>
        </Link>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pricing
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stats
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div>
                      <div className="font-medium text-gray-900">{service.name}</div>
                      <div className="text-sm text-gray-500">{service.slug}</div>
                      {service.partnerName && (
                        <div className="text-xs text-blue-600 mt-1">
                          Partner: {service.partnerName}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <div>Base: {service.basePrice} {service.currency}</div>
                    <div className="text-gray-500">
                      {service.pricePerKm} {service.currency}/km
                    </div>
                    <div className="text-gray-500">
                      {service.pricePerCubicM} {service.currency}/m³
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <div>Bookings: {service.totalBookings}</div>
                    <div>Quotes: {service._count.quotes}</div>
                    <div>Rating: {service.rating.toFixed(1)} ⭐</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        service.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {service.isActive ? 'Active' : 'Inactive'}
                    </span>
                    {service.isFeatured && (
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        Featured
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/${locale}/services/moving/${service.slug}`}
                      className="text-gray-600 hover:text-gray-900"
                      title="View"
                    >
                      <Eye className="w-5 h-5" />
                    </Link>
                    <Link
                      href={`/${locale}/admin/moving/edit/${service.id}`}
                      className="text-blue-600 hover:text-blue-900"
                      title="Edit"
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                    <button
                      className="text-red-600 hover:text-red-900"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {services.length === 0 && (
          <div className="text-center py-12">
            <Truck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No moving services yet
            </h3>
            <p className="text-gray-600 mb-4">
              Get started by creating your first moving service.
            </p>
            <Link
              href={`/${locale}/admin/moving/new`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-5 h-5" />
              Add Service
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
