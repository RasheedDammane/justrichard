#!/bin/bash

# Créer les pages admin manquantes pour les entités en base

echo "🚀 Création des pages admin manquantes..."

# 1. Rental Cars
mkdir -p app/\[locale\]/admin/rental-cars
cat > app/\[locale\]/admin/rental-cars/page.tsx << 'EOPAGE'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import AdminLayout from '@/components/admin/AdminLayout';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Car } from 'lucide-react';

export default async function RentalCarsPage({ params: { locale } }: { params: { locale: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
    redirect(`/${locale}/auth/login`);
  }

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
    <AdminLayout locale={locale} userName={session.user.name || undefined} userRole={session.user.role}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Voitures de Location</h1>
            <p className="text-gray-600 mt-1">{stats.total} voitures au total</p>
          </div>
          <Link
            href={`/${locale}/admin/rental-cars/new`}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Ajouter
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
            <p className="text-sm text-gray-600">Actives</p>
            <p className="text-2xl font-bold">{stats.active}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-sm text-gray-600">En vedette</p>
            <p className="text-2xl font-bold">{stats.featured}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-sm text-gray-600">Prix moyen/jour</p>
            <p className="text-2xl font-bold">{stats.avgPrice.toFixed(0)} AED</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Voiture</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Catégorie</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prix/jour</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lieu</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
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
                        {car.isActive ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/${locale}/admin/rental-cars/${car.id}`} className="text-blue-600 hover:text-blue-700">
                        Modifier
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
EOPAGE

echo "✅ Créé: rental-cars/page.tsx"

# 2. Motorbikes
mkdir -p app/\[locale\]/admin/motorbikes
cat > app/\[locale\]/admin/motorbikes/page.tsx << 'EOPAGE'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import AdminLayout from '@/components/admin/AdminLayout';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Bike } from 'lucide-react';

export default async function MotorbikesPage({ params: { locale } }: { params: { locale: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
    redirect(`/${locale}/auth/login`);
  }

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
    <AdminLayout locale={locale} userName={session.user.name || undefined} userRole={session.user.role}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Motos</h1>
            <p className="text-gray-600 mt-1">{stats.total} motos au total</p>
          </div>
          <Link
            href={`/${locale}/admin/motorbikes/new`}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Ajouter
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
            <p className="text-sm text-gray-600">Disponibles</p>
            <p className="text-2xl font-bold">{stats.available}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-sm text-gray-600">Prix moyen/jour</p>
            <p className="text-2xl font-bold">{stats.avgPrice.toFixed(0)} THB</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Moto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Catégorie</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cylindrée</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prix/jour</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lieu</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
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
                        {bike.available ? 'Disponible' : 'Indisponible'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/${locale}/admin/motorbikes/${bike.id}`} className="text-blue-600 hover:text-blue-700">
                        Modifier
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
EOPAGE

echo "✅ Créé: motorbikes/page.tsx"

# 3. Maids
mkdir -p app/\[locale\]/admin/maids
cat > app/\[locale\]/admin/maids/page.tsx << 'EOPAGE'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import AdminLayout from '@/components/admin/AdminLayout';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Users } from 'lucide-react';

export default async function MaidsPage({ params: { locale } }: { params: { locale: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
    redirect(`/${locale}/auth/login`);
  }

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
    <AdminLayout locale={locale} userName={session.user.name || undefined} userRole={session.user.role}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Maids</h1>
            <p className="text-gray-600 mt-1">{stats.total} maids au total</p>
          </div>
          <Link
            href={`/${locale}/admin/maids/new`}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Ajouter
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
            <p className="text-sm text-gray-600">Actives</p>
            <p className="text-2xl font-bold">{stats.active}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-sm text-gray-600">En vedette</p>
            <p className="text-2xl font-bold">{stats.featured}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-sm text-gray-600">Salaire moyen</p>
            <p className="text-2xl font-bold">{stats.avgFee.toFixed(0)} AED</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nationalité</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Âge</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expérience</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Salaire</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
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
                    <td className="px-6 py-4 text-sm">{maid.age} ans</td>
                    <td className="px-6 py-4 text-sm">{maid.yearsOfExperience} ans</td>
                    <td className="px-6 py-4 text-sm font-medium">{maid.monthlyFee} {maid.currency}/mois</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${maid.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {maid.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/${locale}/admin/maids/${maid.id}`} className="text-blue-600 hover:text-blue-700">
                        Modifier
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
EOPAGE

echo "✅ Créé: maids/page.tsx"

echo ""
echo "🎉 Toutes les pages admin créées!"
echo ""
echo "Pages créées:"
echo "  - /admin/rental-cars (10 voitures)"
echo "  - /admin/motorbikes (20 motos)"
echo "  - /admin/maids (20 maids)"
