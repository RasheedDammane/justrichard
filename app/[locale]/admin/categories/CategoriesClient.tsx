'use client';

import Link from 'next/link';
import { Plus, Pencil, Trash2, Folder } from 'lucide-react';
import { useAdminTranslation, useAdminCommon } from '@/hooks/useAdminTranslation';

interface Category {
  id: string;
  slug: string;
  icon: string | null;
  isActive: boolean;
  order: number;
  translations: Array<{ name: string; description: string | null }>;
  _count: { services: number };
}

interface CategoriesClientProps {
  categories: Category[];
  locale: string;
}

export default function CategoriesClient({ categories, locale }: CategoriesClientProps) {
  const t = useAdminTranslation('categories');
  const tc = useAdminCommon();

  const stats = {
    total: categories.length,
    active: categories.filter(c => c.isActive).length,
    totalServices: categories.reduce((sum, c) => sum + c._count.services, 0),
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
              href={`/${locale}/admin/categories/new`}
              className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              {t('addNew')}
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
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
            <div className="text-gray-500 text-sm font-medium">{t('stats.totalServices')}</div>
            <div className="text-3xl font-bold text-blue-600 mt-2">{stats.totalServices}</div>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('table.category')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('table.services')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('table.order')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{tc('status')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{tc('actions')}</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Folder className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{category.translations[0]?.name || category.slug}</div>
                          <div className="text-sm text-gray-500">{category.translations[0]?.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category._count.services}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.order}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${category.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {category.isActive ? tc('active') : tc('inactive')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link href={`/${locale}/admin/categories/${category.id}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-3">
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
