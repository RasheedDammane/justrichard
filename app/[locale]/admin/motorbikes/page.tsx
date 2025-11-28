import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Bike } from 'lucide-react';
import MotorbikeActions from './MotorbikeActions';

export default async function MotorbikesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin
  

  const motorbikes = await prisma.rentalMotorbike.findMany({
    include: {
      City: true,
      Country: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const stats = {
    total: motorbikes.length,
    available: motorbikes.filter(m => m.available).length,
    avgPrice: motorbikes.length > 0 ? motorbikes.reduce((sum, m) => sum + m.pricePerDay, 0) / motorbikes.length : 0,
  };

  return (
    
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Motorbikes</h1>
            <p className="text-gray-600 mt-1">{stats.total} motorbikes in total</p>
          </div>
          <Link
            href={`/${locale}/admin/motorbikes/new`}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Add
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Bike className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-sm text-gray-600">Available</p>
            <p className="text-2xl font-bold">{stats.available}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-sm text-gray-600">Avg Price/day</p>
            <p className="text-2xl font-bold">{stats.avgPrice.toFixed(0)} THB</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Motorbike</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Engine</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price/day</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {motorbikes.map((bike) => (
                  <tr key={bike.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium">{bike.brand} {bike.model}</div>
                      <div className="text-sm text-gray-500">{bike.year}</div>
                    </td>
                    <td className="px-6 py-4 text-sm">{bike.category}</td>
                    <td className="px-6 py-4 text-sm">{bike.engineSize}cc</td>
                    <td className="px-6 py-4 text-sm font-medium">{bike.pricePerDay} {bike.currency}</td>
                    <td className="px-6 py-4 text-sm">{bike.City?.name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${bike.available ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {bike.available ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <MotorbikeActions motorbike={{ id: bike.id, slug: bike.slug, brand: bike.brand, model: bike.model, available: bike.available }} locale={locale} />
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
