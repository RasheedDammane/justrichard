'use client';

import Link from 'next/link';
import { Pencil, Trash2, Plus, Eye } from 'lucide-react';
import { useAdminTranslation, useAdminCommon } from '@/hooks/useAdminTranslation';

interface Service {
  id: string;
  slug: string;
  isActive: boolean;
  createdAt: Date;
  category: {
    translations: Array<{ name: string }>;
  };
  translations: Array<{ name: string; description: string }>;
  _count: {
    Booking: number;
    Review: number;
  };
}

interface ServicesClientProps {
  services: Service[];
  locale: string;
}

export default function ServicesClient({ services, locale }: ServicesClientProps) {
  const t = useAdminTranslation('services');
  const tc = useAdminCommon();

  const stats = {
    total: services.length,
    active: services.filter((s) => s.isActive).length,
    totalBookings: services.reduce((sum, s) => sum + s._count.Booking, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-600 text-white py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">{t('title')}</h1>
              <p className="text-primary-100 mt-1">{t('subtitle')}</p>
            </div>
            <Link
              href={`/${locale}/admin/services/new`}
              className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              {t('addNew')}
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">{t('stats.total')}</div>
            <div className="text-3xl font-bold text-primary-600 mt-2">{stats.total}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">{t('stats.active')}</div>
            <div className="text-3xl font-bold text-green-600 mt-2">{stats.active}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">{t('stats.totalBookings')}</div>
            <div className="text-3xl font-bold text-blue-600 mt-2">{stats.totalBookings}</div>
          </div>
        </div>

        {/* Services Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold">{t('listTitle')}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('table.service')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('table.category')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('table.bookings')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('table.reviews')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {tc('status')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {tc('actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {services.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {service.translations[0]?.name || service.slug}
                      </div>
                      <div className="text-sm text-gray-500 line-clamp-1">
                        {service.translations[0]?.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {service.category?.translations[0]?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {service._count.Booking}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {service._count.Review}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          service.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {service.isActive ? tc('active') : tc('inactive')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        href={`/${locale}/services/${service.slug}`}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                        target="_blank"
                      >
                        <Eye className="w-4 h-4 inline" />
                      </Link>
                      <Link
                        href={`/${locale}/admin/services/${service.id}/edit`}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        <Pencil className="w-4 h-4 inline" />
                      </Link>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
