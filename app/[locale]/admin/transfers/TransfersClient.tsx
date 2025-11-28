'use client';

import Link from 'next/link';
import { Building2, Users, DollarSign, Upload, Plus } from 'lucide-react';
import { useAdminTranslation, useAdminCommon } from '@/hooks/useAdminTranslation';

interface Partner {
  id: string;
  name: string;
  email: string;
  status: string;
  totalRevenue: number;
  _count: { services: number; chatbots: number; documents: number };
}

export default function TransfersClient({ transfers, stats, locale }: { transfers: Partner[]; stats: any; locale: string }) {
  const t = useAdminTranslation('transfers');
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
            <Link href={`/${locale}/admin/transfers/new`} className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 flex items-center gap-2">
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
              <Building2 className="w-12 h-12 text-primary-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">{t('stats.active')}</div>
                <div className="text-3xl font-bold text-green-600 mt-2">{stats.active}</div>
              </div>
              <Users className="w-12 h-12 text-green-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">{t('stats.pending')}</div>
                <div className="text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</div>
              </div>
              <Upload className="w-12 h-12 text-yellow-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">{t('stats.revenue')}</div>
                <div className="text-2xl font-bold text-purple-600 mt-2">{stats.totalRevenue} AED</div>
              </div>
              <DollarSign className="w-12 h-12 text-purple-200" />
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('table.transfer')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('table.services')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('table.revenue')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{tc('status')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{tc('actions')}</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transfers.map((transfer) => (
                  <tr key={transfer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{transfer.name}</div>
                      <div className="text-sm text-gray-500">{transfer.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transfer._count.services}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transfer.totalRevenue} AED</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${transfer.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {transfer.status}
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
