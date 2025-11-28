'use client';

import { Calendar, CheckCircle, Clock, XCircle, DollarSign } from 'lucide-react';
import { useAdminTranslation, useAdminCommon } from '@/hooks/useAdminTranslation';

interface Booking {
  id: string;
  status: string;
  total: number;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  user: {
    name: string | null;
    email: string;
    phone: string | null;
  };
  service: {
    translations: Array<{ name: string }>;
  };
}

interface BookingsClientProps {
  bookings: Booking[];
  stats: {
    total: number;
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
    revenue: number;
  };
}

export default function BookingsClient({ bookings, stats }: BookingsClientProps) {
  const t = useAdminTranslation('bookings');
  const tc = useAdminCommon();

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { bg: string; text: string; label: string }> = {
      PENDING: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: t('status.pending') },
      CONFIRMED: { bg: 'bg-blue-100', text: 'text-blue-800', label: t('status.confirmed') },
      COMPLETED: { bg: 'bg-green-100', text: 'text-green-800', label: t('status.completed') },
      CANCELLED: { bg: 'bg-red-100', text: 'text-red-800', label: t('status.cancelled') },
    };
    const config = statusMap[status] || statusMap.PENDING;
    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-600 text-white py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold">{t('title')}</h1>
          <p className="text-primary-100 mt-1">{t('subtitle')}</p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">{t('stats.total')}</div>
                <div className="text-3xl font-bold text-primary-600 mt-2">{stats.total}</div>
              </div>
              <Calendar className="w-12 h-12 text-primary-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">{t('stats.pending')}</div>
                <div className="text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</div>
              </div>
              <Clock className="w-12 h-12 text-yellow-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">{t('stats.confirmed')}</div>
                <div className="text-3xl font-bold text-blue-600 mt-2">{stats.confirmed}</div>
              </div>
              <CheckCircle className="w-12 h-12 text-blue-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">{t('stats.completed')}</div>
                <div className="text-3xl font-bold text-green-600 mt-2">{stats.completed}</div>
              </div>
              <CheckCircle className="w-12 h-12 text-green-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">{t('stats.cancelled')}</div>
                <div className="text-3xl font-bold text-red-600 mt-2">{stats.cancelled}</div>
              </div>
              <XCircle className="w-12 h-12 text-red-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">{t('stats.revenue')}</div>
                <div className="text-2xl font-bold text-purple-600 mt-2">{stats.revenue} AED</div>
              </div>
              <DollarSign className="w-12 h-12 text-purple-200" />
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold">{t('listTitle')}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('table.client')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('table.service')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('table.dates')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('table.total')}
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
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {booking.user.name || booking.user.email}
                      </div>
                      <div className="text-sm text-gray-500">{booking.user.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {booking.service?.translations[0]?.name || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{new Date(booking.startDate).toLocaleDateString()}</div>
                      <div className="text-xs text-gray-400">
                        {new Date(booking.endDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {booking.total} AED
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(booking.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-900 mr-3">
                        {tc('view')}
                      </button>
                      <button className="text-indigo-600 hover:text-indigo-900">
                        {tc('edit')}
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
