'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Users, UserCheck, Star, MapPin, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { useAdminTranslation, useAdminCommon } from '@/hooks/useAdminTranslation';

interface Coach {
  id: string;
  slug: string;
  name: string;
  email: string | null;
  phone: string | null;
  rating: number | null;
  isActive: boolean;
  totalClients: number;
  reviewCount: number;
  City: { name: string };
  Country: { name: string };
  mainCategory: string;
  sessionFee: number | null;
  currency: string;
  isFeatured: boolean;
  isVerified: boolean;
}

export default function CoachesClient({ coaches, stats, locale }: { coaches: Coach[]; stats: any; locale: string }) {
  const t = useAdminTranslation('coaches');
  const tc = useAdminCommon();
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;
    
    setDeleting(id);
    try {
      const response = await fetch(`/api/admin/coaches/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        router.refresh();
      } else {
        alert('Failed to delete coach');
      }
    } catch (error) {
      alert('Error deleting coach');
    } finally {
      setDeleting(null);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/coaches/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      
      if (response.ok) {
        router.refresh();
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      alert('Error updating status');
    }
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
            <Link href={`/${locale}/admin/coaches/new`} className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 flex items-center gap-2">
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
                <div className="text-gray-500 text-sm font-medium">{t('stats.totalClients')}</div>
                <div className="text-3xl font-bold text-blue-600 mt-2">{stats.totalClients}</div>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('table.coach')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('table.location')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('table.category')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('table.clients')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('table.rating')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{tc('status')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{tc('actions')}</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {coaches.map((coach) => (
                  <tr key={coach.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{coach.name}</div>
                      <div className="text-sm text-gray-500">{coach.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {coach.City?.name || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{coach.mainCategory}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{coach.totalClients}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{coach.rating ? coach.rating.toFixed(1) : 'N/A'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleStatus(coach.id, coach.isActive)}
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer hover:opacity-80 ${coach.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                      >
                        {coach.isActive ? tc('active') : tc('inactive')}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <Link 
                          href={`/${locale}/coaches/${coach.slug}`}
                          className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link 
                          href={`/${locale}/admin/coaches/edit/${coach.id}`}
                          className="text-indigo-600 hover:text-indigo-900 p-1 hover:bg-indigo-50 rounded"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(coach.id, coach.name)}
                          disabled={deleting === coach.id}
                          className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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
