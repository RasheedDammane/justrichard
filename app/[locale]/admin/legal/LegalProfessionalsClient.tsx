'use client';

import Link from 'next/link';
import { Users, FileCheck, Star, Globe, Plus, MapPin, Briefcase } from 'lucide-react';
import { useAdminTranslation, useAdminCommon } from '@/hooks/useAdminTranslation';

interface LegalProfessional {
  id: string;
  name: string;
  type: string;
  status: string;
  slug: string;
  city: string | null;
  country: string | null;
  practiceAreas: any;
  languages: any;
  featured: boolean;
  isActive: boolean;
  updatedAt: Date;
}

export default function LegalProfessionalsClient({
  professionals,
  stats,
  locale,
}: {
  professionals: LegalProfessional[];
  stats: any;
  locale: string;
}) {
  const t = useAdminTranslation('legal');
  const tc = useAdminCommon();

  const getTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      LAWYER: t('types.lawyer') || 'Avocat',
      LAW_FIRM: t('types.lawFirm') || 'Cabinet',
      LEGAL_ADVISOR: t('types.legalAdvisor') || 'Conseiller',
      NOTARY: t('types.notary') || 'Notaire',
    };
    return types[type] || type;
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { bg: string; text: string; label: string }> = {
      PUBLISHED: { bg: 'bg-green-100', text: 'text-green-800', label: t('status.published') || 'Publié' },
      DRAFT: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: t('status.draft') || 'Brouillon' },
      ARCHIVED: { bg: 'bg-gray-100', text: 'text-gray-800', label: t('status.archived') || 'Archivé' },
    };
    return badges[status] || badges.DRAFT;
  };

  const formatPracticeAreas = (areas: any) => {
    if (!areas || !Array.isArray(areas)) return '-';
    return areas.slice(0, 2).join(', ') + (areas.length > 2 ? '...' : '');
  };

  const formatLanguages = (langs: any) => {
    if (!langs || !Array.isArray(langs)) return '-';
    return langs.join(' · ').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-600 text-white py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">{t('title') || 'Professionnels Légaux'}</h1>
              <p className="text-primary-100 mt-1">{t('subtitle') || 'Gérer les avocats et cabinets'}</p>
            </div>
            <Link
              href={`/${locale}/admin/legal/new`}
              className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              {t('addNew') || 'Ajouter'}
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">{t('stats.total') || 'Total'}</div>
                <div className="text-3xl font-bold text-primary-600 mt-2">{stats.total}</div>
              </div>
              <Users className="w-12 h-12 text-primary-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">{t('stats.published') || 'Publiés'}</div>
                <div className="text-3xl font-bold text-green-600 mt-2">{stats.published}</div>
              </div>
              <FileCheck className="w-12 h-12 text-green-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">{t('stats.featured') || 'Mis en avant'}</div>
                <div className="text-3xl font-bold text-yellow-600 mt-2">{stats.featured}</div>
              </div>
              <Star className="w-12 h-12 text-yellow-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">{t('stats.draft') || 'Brouillons'}</div>
                <div className="text-3xl font-bold text-orange-600 mt-2">{stats.draft}</div>
              </div>
              <Briefcase className="w-12 h-12 text-orange-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">{t('stats.countries') || 'Pays'}</div>
                <div className="text-3xl font-bold text-blue-600 mt-2">{stats.countries}</div>
              </div>
              <Globe className="w-12 h-12 text-blue-200" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold">{t('listTitle') || 'Liste des professionnels'}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    {t('table.name') || 'Nom'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    {t('table.type') || 'Type'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    {t('table.location') || 'Localisation'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    {t('table.practiceAreas') || 'Domaines'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    {t('table.languages') || 'Langues'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    {tc('status')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    {tc('actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {professionals.map((professional) => {
                  const statusBadge = getStatusBadge(professional.status);
                  return (
                    <tr key={professional.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                              {professional.name}
                              {professional.featured && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                            </div>
                            <div className="text-sm text-gray-500">/{professional.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getTypeLabel(professional.type)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {professional.city || '-'}, {professional.country || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatPracticeAreas(professional.practiceAreas)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatLanguages(professional.languages)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusBadge.bg} ${statusBadge.text}`}>
                          {statusBadge.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          href={`/${locale}/legal/${professional.slug}`}
                          target="_blank"
                          className="text-primary-600 hover:text-primary-900 mr-3"
                        >
                          {tc('view')}
                        </Link>
                        <Link
                          href={`/${locale}/admin/legal/${professional.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          {tc('edit')}
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
