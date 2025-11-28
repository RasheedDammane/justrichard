'use client';

import Link from 'next/link';
import { Users, UserCheck, Star, MapPin, Plus } from 'lucide-react';
import { useAdminTranslation, useAdminCommon } from '@/hooks/useAdminTranslation';

interface Provider {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  rating: number;
  isActive: boolean;
  ProviderLocation: Array<{ City: { name: string } }>;
  _count: { ProviderReview: number };
}

export default function ActivitiesClient({ activities, stats, locale }: { activities: Provider[]; stats: any; locale: string }) {
  const t = useAdminTranslation('activities');
  const tc = useAdminCommon();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-600 text-white py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">{t('title')}</h1>
              <p className="text-primary-100 mt-1">{t('subtitle')}</p>
            </div>
            <Link href={`/${locale}/admin/activities/new`} className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              {t('addNew')}
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">{t('stats.total')}</div>
                <div className="text-3xl font-bold text-primary-600 mt-2">{stats.total}</div>
              </div>
              <Users className="w-12 h-12 text-primary-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">{t('stats.active')}</div>
                <div className="text-3xl font-bold text-green-600 mt-2">{stats.active}</div>
              </div>
              <UserCheck className="w-12 h-12 text-green-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">{t('stats.totalBookings')}</div>
                <div className="text-3xl font-bold text-blue-600 mt-2">{stats.totalBookings}</div>
              </div>
              <Star className="w-12 h-12 text-blue-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">{t('stats.avgRating')}</div>
                <div className="text-3xl font-bold text-yellow-600 mt-2">{stats.avgRating.toFixed(1)}</div>
              </div>
              <Star className="w-12 h-12 text-yellow-200" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold">{t('listTitle')}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('table.activity')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('table.location')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('table.reviews')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('table.rating')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{tc('status')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{tc('actions')}</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {activities.map((activity) => (
                  <tr key={activity.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{activity.name}</div>
                      <div className="text-sm text-gray-500">{activity.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {activity.ProviderLocation[0]?.City?.name || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity._count.ProviderReview}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{activity.rating.toFixed(1)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${activity.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {activity.isActive ? tc('active') : tc('inactive')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-900 mr-3">{tc('view')}</button>
                      <button className="text-indigo-600 hover:text-indigo-900">{tc('edit')}</button>
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
