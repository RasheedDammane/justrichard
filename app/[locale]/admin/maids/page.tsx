import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Users } from 'lucide-react';
import MaidActions from './MaidActions';

export default async function MaidsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin
  

  const maids = await prisma.maid.findMany({
    include: {
      City: true,
      Country: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const stats = {
    total: maids.length,
    active: maids.filter(m => m.isActive).length,
    featured: maids.filter(m => m.isFeatured).length,
    avgFee: maids.length > 0 ? maids.reduce((sum, m) => sum + (m.monthlyFee || 0), 0) / maids.length : 0,
  };

  return (
    
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Maids</h1>
            <p className="text-gray-600 mt-1">{stats.total} maids in total</p>
          </div>
          <Link
            href={`/${locale}/admin/maids/new`}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Add
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-sm text-gray-600">Active</p>
            <p className="text-2xl font-bold">{stats.active}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-sm text-gray-600">Featured</p>
            <p className="text-2xl font-bold">{stats.featured}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-sm text-gray-600">Average Salary</p>
            <p className="text-2xl font-bold">{stats.avgFee.toFixed(0)} AED</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nationality</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Age</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Experience</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Salary</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {maids.map((maid) => (
                  <tr key={maid.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {maid.image && (
                          <img src={maid.image} alt={maid.name} className="w-10 h-10 rounded-full object-cover" />
                        )}
                        <div>
                          <div className="font-medium">{maid.name}</div>
                          <div className="text-sm text-gray-500">{maid.refNo}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{maid.nationality}</td>
                    <td className="px-6 py-4 text-sm">{maid.age} years</td>
                    <td className="px-6 py-4 text-sm">{maid.yearsOfExperience} years</td>
                    <td className="px-6 py-4 text-sm font-medium">{maid.monthlyFee} {maid.currency}/month</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${maid.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {maid.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <MaidActions maid={{ id: maid.id, name: maid.name, slug: maid.slug, isActive: maid.isActive }} locale={locale} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    
  );
}
