/**
 * Script pour générer les pages de management admin avec CRUD complet
 * Usage: npx tsx scripts/generate-admin-pages.ts
 */

import fs from 'fs';
import path from 'path';

interface PageConfig {
  name: string;
  path: string;
  title: string;
  description: string;
  icon: string;
  filterField?: string;
  filterValues?: string[];
}

const pages: PageConfig[] = [
  {
    name: 'Lawyers',
    path: 'lawyers',
    title: 'Lawyers Management',
    description: 'Manage lawyers and legal professionals',
    icon: 'Gavel',
    filterField: 'type',
    filterValues: ['lawyer', 'legal', 'attorney'],
  },
  {
    name: 'Coaches',
    path: 'coaches',
    title: 'Coaches Management',
    description: 'Manage coaches and trainers',
    icon: 'Dumbbell',
    filterField: 'type',
    filterValues: ['coach', 'trainer', 'fitness'],
  },
  {
    name: 'Transfers',
    path: 'transfers',
    title: 'Transfers Management',
    description: 'Manage airport transfers and transportation',
    icon: 'Car',
    filterField: 'type',
    filterValues: ['transfer', 'transport', 'car'],
  },
  {
    name: 'Activities',
    path: 'activities',
    title: 'Activities Management',
    description: 'Manage activities and excursions',
    icon: 'Plane',
    filterField: 'type',
    filterValues: ['activity', 'excursion', 'tour'],
  },
  {
    name: 'Suppliers',
    path: 'suppliers',
    title: 'Suppliers Management',
    description: 'Manage suppliers and vendors',
    icon: 'Package',
    filterField: 'type',
    filterValues: ['supplier', 'vendor', 'partner'],
  },
];

const generatePageTemplate = (config: PageConfig): string => {
  const filterConditions = config.filterValues
    ? config.filterValues.map(val => `{ type: { contains: '${val}', mode: 'insensitive' } }`).join(',\n        ')
    : '';

  return `import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AdminLayout from '@/components/admin/AdminLayout';
import { Users, UserCheck, Star, MapPin, Phone, Mail, Plus, ${config.icon} } from 'lucide-react';

export default async function Admin${config.name}Page({ params: { locale } }: { params: { locale: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
    redirect(\`/\${locale}/auth/login\`);
  }

  // Récupérer les providers
  const items = await prisma.provider.findMany({
    ${filterConditions ? `where: {\n      OR: [\n        ${filterConditions}\n      ],\n    },` : ''}
    include: {
      ProviderLocation: {
        include: {
          City: true,
        },
      },
      _count: {
        select: {
          ProviderReview: true,
          Appointment: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Calculer les statistiques
  const stats = {
    total: items.length,
    active: items.filter(d => d.isActive).length,
    verified: items.filter(d => d.isVerified).length,
    avgRating: items.reduce((acc, d) => acc + (d.rating || 0), 0) / (items.length || 1),
  };

  return (
    <AdminLayout locale={locale} userName={session.user.name || undefined} userRole={session.user.role}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">${config.title}</h1>
            <p className="text-gray-600 mt-1">${config.description}</p>
          </div>
          <Link
            href={\`/\${locale}/admin/${config.path}/new\`}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add ${config.name.slice(0, -1)}
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 opacity-80" />
              <div className="text-xs bg-white/20 px-2 py-1 rounded">Total</div>
            </div>
            <div className="text-3xl font-bold">{stats.total}</div>
            <div className="text-sm opacity-90">Total ${config.name}</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <UserCheck className="w-8 h-8 opacity-80" />
              <div className="text-xs bg-white/20 px-2 py-1 rounded">Active</div>
            </div>
            <div className="text-3xl font-bold">{stats.active}</div>
            <div className="text-sm opacity-90">Active ${config.name}</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <UserCheck className="w-8 h-8 opacity-80" />
              <div className="text-xs bg-white/20 px-2 py-1 rounded">Verified</div>
            </div>
            <div className="text-3xl font-bold">{stats.verified}</div>
            <div className="text-sm opacity-90">Verified ${config.name}</div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <Star className="w-8 h-8 opacity-80" />
              <div className="text-xs bg-white/20 px-2 py-1 rounded">Rating</div>
            </div>
            <div className="text-3xl font-bold">{stats.avgRating.toFixed(1)}</div>
            <div className="text-sm opacity-90">Average Rating</div>
          </div>
        </div>

        {/* Items List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">${config.name} List</h2>
          </div>
          
          {items.length === 0 ? (
            <div className="p-12 text-center">
              <${config.icon} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">No ${config.name.toLowerCase()} found</p>
              <p className="text-gray-400 mb-6">Start by adding your first ${config.name.slice(0, -1).toLowerCase()}</p>
              <Link
                href={\`/\${locale}/admin/${config.path}/new\`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add First ${config.name.slice(0, -1)}
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ${config.name.slice(0, -1)}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reviews
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            {item.logo ? (
                              <img
                                className="h-12 w-12 rounded-full object-cover"
                                src={item.logo}
                                alt={item.name}
                              />
                            ) : (
                              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-blue-600 font-semibold text-lg">
                                  {item.name.charAt(0)}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-500">{item.type}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.phone && (
                            <div className="flex items-center gap-1">
                              <Phone className="w-4 h-4 text-gray-400" />
                              {item.phone}
                            </div>
                          )}
                          {item.email && (
                            <div className="flex items-center gap-1 mt-1">
                              <Mail className="w-4 h-4 text-gray-400" />
                              {item.email}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.ProviderLocation[0]?.City ? (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              {item.ProviderLocation[0].City.name}
                            </div>
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-medium text-gray-900">
                            {item.rating?.toFixed(1) || 'N/A'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item._count.ProviderReview} reviews
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1">
                          <span
                            className={\`px-2 inline-flex text-xs leading-5 font-semibold rounded-full \${
                              item.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }\`}
                          >
                            {item.isActive ? 'Active' : 'Inactive'}
                          </span>
                          {item.isVerified && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              Verified
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          href={\`/\${locale}/admin/${config.path}/\${item.id}\`}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          View
                        </Link>
                        <Link
                          href={\`/\${locale}/admin/${config.path}/\${item.id}/edit\`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
`;
};

// Générer les pages
pages.forEach((config) => {
  const dirPath = path.join(process.cwd(), 'app', '[locale]', 'admin', config.path);
  const filePath = path.join(dirPath, 'page.tsx');

  // Créer le dossier s'il n'existe pas
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Générer et écrire le fichier
  const content = generatePageTemplate(config);
  fs.writeFileSync(filePath, content, 'utf-8');

  console.log(`✅ Generated: ${config.path}/page.tsx`);
});

console.log('\n🎉 All admin pages generated successfully!');
