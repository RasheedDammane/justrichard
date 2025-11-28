'use client';

import Link from 'next/link';
import { FileText, Eye, MessageSquare, ThumbsUp, Plus } from 'lucide-react';
import { useAdminTranslation, useAdminCommon } from '@/hooks/useAdminTranslation';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  status: string;
  views: number;
  author: { name: string | null; email: string };
  _count: { comments: number; likes: number };
  createdAt: Date;
}

export default function BlogClient({ posts, stats, locale }: { posts: BlogPost[]; stats: any; locale: string }) {
  const t = useAdminTranslation('blog');
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
            <Link href={`/${locale}/admin/blog/new`} className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 flex items-center gap-2">
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
              <FileText className="w-12 h-12 text-primary-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">{t('stats.published')}</div>
                <div className="text-3xl font-bold text-green-600 mt-2">{stats.published}</div>
              </div>
              <Eye className="w-12 h-12 text-green-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">{t('stats.totalViews')}</div>
                <div className="text-3xl font-bold text-blue-600 mt-2">{stats.totalViews}</div>
              </div>
              <Eye className="w-12 h-12 text-blue-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">{t('stats.totalComments')}</div>
                <div className="text-3xl font-bold text-purple-600 mt-2">{stats.totalComments}</div>
              </div>
              <MessageSquare className="w-12 h-12 text-purple-200" />
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('table.post')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('table.author')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('table.views')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('table.comments')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('table.likes')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{tc('status')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{tc('actions')}</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{post.title}</div>
                      <div className="text-sm text-gray-500">{post.slug}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {post.author.name || post.author.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.views}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post._count.comments}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post._count.likes}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {post.status}
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
