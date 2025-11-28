import { Metadata } from 'next';
import Link from 'next/link';
import { Package, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Parcel Services | Admin',
  description: 'Manage parcel delivery services',
};

export default async function ParcelServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin


  const services = await prisma.parcelService.findMany({
    orderBy: [
      { isFeatured: 'desc' },
      { createdAt: 'desc' },
    ],
    include: {
      _count: {
        select: {
          deliveries: true,
          quotes: true,
        },
      },
    },
  });

  const stats = {
    total: services.length,
    active: services.filter(s => s.isActive).length,
    featured: services.filter(s => s.isFeatured).length,
    totalDeliveries: services.reduce((sum, s) => sum + s.totalDeliveries, 0),
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Package className="w-8 h-8" />
            Parcel Services
          </h1>
          <p className="text-gray-600 mt-1">
            Manage parcel delivery services
          </p>
        </div>
        <Link
          href={`/${locale}/admin/parcel/new`}
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
          <div className="text-sm text-purple-600">Total Deliveries</div>
          <div className="text-2xl font-bold text-purple-600">{stats.totalDeliveries}</div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Link
          href={`/${locale}/admin/parcel/quotes`}
          className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <h3 className="font-semibold text-lg mb-1">Quote Requests</h3>
          <p className="text-sm text-gray-600">View and manage quote requests</p>
        </Link>
        <Link
          href={`/${locale}/admin/parcel/deliveries`}
          className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <h3 className="font-semibold text-lg mb-1">Deliveries</h3>
          <p className="text-sm text-gray-600">Track and manage deliveries</p>
        </Link>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Pricing
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Limits
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Features
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium">{service.name}</div>
                    <div className="text-sm text-gray-500">{service.slug}</div>
                    {service.partnerName && (
                      <div className="text-xs text-blue-600 mt-1">
                        Partner: {service.partnerName}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div>Base: {service.basePrice} {service.currency}</div>
                  <div className="text-gray-500">{service.pricePerKg} {service.currency}/kg</div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div>Max: {service.maxWeight}kg</div>
                  <div className="text-gray-500">
                    {service.maxLength}×{service.maxWidth}×{service.maxHeight}cm
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {service.expressAvailable && (
                      <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded">
                        Express
                      </span>
                    )}
                    {service.sameDay && (
                      <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded">
                        Same Day
                      </span>
                    )}
                    {service.international && (
                      <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">
                        International
                      </span>
                    )}
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
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/${locale}/services/parcel/${service.slug}`}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Eye className="w-5 h-5" />
                    </Link>
                    <Link
                      href={`/${locale}/admin/parcel/edit/${service.id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                    <button className="text-red-600 hover:text-red-900">
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
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No parcel services yet</h3>
            <p className="text-gray-600 mb-4">
              Get started by creating your first parcel service.
            </p>
            <Link
              href={`/${locale}/admin/parcel/new`}
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
