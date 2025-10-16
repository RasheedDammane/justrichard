import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';
import { Role } from '@prisma/client';
import AdminLayout from '@/components/admin/AdminLayout';

export default async function AdminDashboard({ params: { locale } }: { params: { locale: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user.role !== Role.ADMIN && session.user.role !== Role.MANAGER)) {
    logger.warn('Unauthorized admin access attempt', {
      userId: session?.user?.id,
      path: `/${locale}/admin`,
    });
    redirect(`/${locale}/auth/login`);
  }

  logger.info('Admin dashboard accessed', {
    userId: session.user.id,
    path: `/${locale}/admin`,
  });

  // Fetch dashboard stats with error handling
  let totalUsers = 0;
  let totalBookings = 0;
  let totalServices = 0;
  let recentBookings: any[] = [];
  let errorLogs: any[] = [];

  try {
    const results = await Promise.all([
      prisma.user.count().catch((err: Error) => {
        logger.error('Failed to count users', err, { userId: session.user.id });
        return 0;
      }),
      prisma.booking.count().catch((err: Error) => {
        logger.error('Failed to count bookings', err, { userId: session.user.id });
        return 0;
      }),
      prisma.service.count({ where: { isActive: true } }).catch((err: Error) => {
        logger.error('Failed to count services', err, { userId: session.user.id });
        return 0;
      }),
      prisma.booking
        .findMany({
          take: 10,
          orderBy: { createdAt: 'desc' },
          include: {
            user: { select: { name: true, email: true } },
            service: { include: { translations: { where: { locale } } } },
          },
        })
        .catch((err: Error) => {
          logger.error('Failed to fetch recent bookings', err, { userId: session.user.id });
          return [];
        }),
      prisma.errorLog
        .findMany({
          take: 5,
          where: { resolved: false },
          orderBy: { createdAt: 'desc' },
        })
        .catch((err: Error) => {
          logger.error('Failed to fetch error logs', err, { userId: session.user.id });
          return [];
        }),
    ]);

    [totalUsers, totalBookings, totalServices, recentBookings, errorLogs] = results;
  } catch (error) {
    logger.error('Critical error loading admin dashboard', error as Error, {
      userId: session.user.id,
      path: `/${locale}/admin`,
    });
  }

  return (
    <AdminLayout locale={locale} userName={session.user.name || undefined} userRole={session.user.role}>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-primary-600 text-white py-8 px-4">
          <div className="container mx-auto max-w-7xl">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-primary-100 mt-1">Welcome back, {session.user.name}</p>
          </div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">Total Users</div>
            <div className="text-3xl font-bold text-primary-600 mt-2">{totalUsers}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">Total Bookings</div>
            <div className="text-3xl font-bold text-primary-600 mt-2">{totalBookings}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">Active Services</div>
            <div className="text-3xl font-bold text-primary-600 mt-2">{totalServices}</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Actions Rapides</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <a
              href={`/${locale}/admin/services`}
              className="bg-primary-50 text-primary-600 px-4 py-3 rounded-lg hover:bg-primary-100 transition-colors text-center font-medium"
            >
              📦 Services
            </a>
            <a
              href={`/${locale}/admin/bookings`}
              className="bg-green-50 text-green-600 px-4 py-3 rounded-lg hover:bg-green-100 transition-colors text-center font-medium"
            >
              📅 Réservations
            </a>
            <a
              href={`/${locale}/admin/users`}
              className="bg-blue-50 text-blue-600 px-4 py-3 rounded-lg hover:bg-blue-100 transition-colors text-center font-medium"
            >
              👥 Utilisateurs
            </a>
            <a
              href={`/${locale}/admin/categories`}
              className="bg-purple-50 text-purple-600 px-4 py-3 rounded-lg hover:bg-purple-100 transition-colors text-center font-medium"
            >
              📂 Catégories
            </a>
            <a
              href={`/${locale}/admin/partners`}
              className="bg-orange-50 text-orange-600 px-4 py-3 rounded-lg hover:bg-orange-100 transition-colors text-center font-medium"
            >
              🤝 Partenaires
            </a>
            <a
              href={`/${locale}/admin/chatbots`}
              className="bg-pink-50 text-pink-600 px-4 py-3 rounded-lg hover:bg-pink-100 transition-colors text-center font-medium"
            >
              🤖 Chatbots
            </a>
          </div>
        </div>

        {/* Error Logs Alert */}
        {errorLogs.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-lg font-medium text-red-800">
                  {errorLogs.length} Unresolved Error{errorLogs.length > 1 ? 's' : ''}
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <ul className="list-disc list-inside space-y-1">
                    {errorLogs.slice(0, 3).map((log: any) => (
                      <li key={log.id}>
                        {log.message} - {new Date(log.createdAt).toLocaleString()}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4">
                  <a
                    href={`/${locale}/admin/logs`}
                    className="text-sm font-medium text-red-800 hover:text-red-900 underline"
                  >
                    View all error logs →
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Recent Bookings</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentBookings.map((booking) => {
                  const serviceTranslation = booking.service.translations[0];
                  return (
                    <tr key={booking.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {booking.user.name}
                        </div>
                        <div className="text-sm text-gray-500">{booking.user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {serviceTranslation?.name || booking.service.slug}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(booking.scheduledDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            booking.status === 'CONFIRMED'
                              ? 'bg-green-100 text-green-800'
                              : booking.status === 'PENDING'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${booking.total.toFixed(2)}
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
    </AdminLayout>
  );
}
