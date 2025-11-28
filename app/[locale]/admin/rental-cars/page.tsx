import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Car } from 'lucide-react';
import RentalCarActions from './RentalCarActions';

export default async function RentalCarsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin
  

  const cars = await prisma.rentalCar.findMany({
    include: {
      City: true,
      Country: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const stats = {
    total: cars.length,
    active: cars.filter(c => c.isActive).length,
    featured: cars.filter(c => c.isFeatured).length,
    avgPrice: cars.length > 0 ? cars.reduce((sum, c) => sum + c.pricePerDay, 0) / cars.length : 0,
  };

  return (
    
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Rental Cars</h1>
            <p className="text-gray-600 mt-1">{stats.total} cars in total</p>
          </div>
          <Link
            href={`/${locale}/admin/rental-cars/new`}
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
              <Car className="w-8 h-8 text-blue-600" />
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
            <p className="text-sm text-gray-600">Avg Price/day</p>
            <p className="text-2xl font-bold">{stats.avgPrice.toFixed(0)} AED</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Car</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price/day</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {cars.map((car) => (
                  <tr key={car.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {car.mainImage && (
                          <img src={car.mainImage} alt={car.name} className="w-16 h-12 object-cover rounded" />
                        )}
                        <div>
                          <div className="font-medium">{car.name}</div>
                          <div className="text-sm text-gray-500">{car.brand} {car.model}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{car.category}</td>
                    <td className="px-6 py-4 text-sm font-medium">{car.pricePerDay} {car.currency}</td>
                    <td className="px-6 py-4 text-sm">{car.City?.name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${car.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {car.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <RentalCarActions car={{ id: car.id, slug: car.slug, name: car.name, isActive: car.isActive }} locale={locale} />
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
