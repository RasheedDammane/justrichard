import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';
import DashboardClient from './DashboardClient';

export default async function AdminDashboard({ params: { locale } }: { params: { locale: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
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
  let bookingsByType: { type: string; count: number }[] = [];
  let bookingsByStatus: { status: string; count: number }[] = [];
  let totalRevenue = 0;

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
            User: { select: { name: true, email: true } },
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
      // Bookings by type
      prisma.booking
        .groupBy({
          by: ['type'],
          _count: { type: true },
        })
        .catch((err: Error) => {
          logger.error('Failed to group bookings by type', err, { userId: session.user.id });
          return [];
        }),
      // Bookings by status
      prisma.booking
        .groupBy({
          by: ['status'],
          _count: { status: true },
        })
        .catch((err: Error) => {
          logger.error('Failed to group bookings by status', err, { userId: session.user.id });
          return [];
        }),
      // Total revenue
      prisma.booking
        .aggregate({
          _sum: { totalPrice: true },
          where: { status: { in: ['confirmed', 'completed'] } },
        })
        .catch((err: Error) => {
          logger.error('Failed to calculate revenue', err, { userId: session.user.id });
          return { _sum: { totalPrice: 0 } };
        }),
    ]);

    [totalUsers, totalBookings, totalServices, recentBookings, errorLogs, bookingsByType, bookingsByStatus] = results;
    totalRevenue = (results[7] as any)?._sum?.totalPrice || 0;

    // Transform groupBy results
    bookingsByType = (bookingsByType as any[]).map((item: any) => ({
      type: item.type,
      count: item._count.type,
    }));
    bookingsByStatus = (bookingsByStatus as any[]).map((item: any) => ({
      status: item.status,
      count: item._count.status,
    }));
  } catch (error) {
    logger.error('Critical error loading admin dashboard', error as Error, {
      userId: session.user.id,
      path: `/${locale}/admin`,
    });
  }

  return (
    
      <DashboardClient
        userName={session.user.name || 'User'}
        totalUsers={totalUsers}
        totalBookings={totalBookings}
        totalServices={totalServices}
        totalRevenue={totalRevenue}
        bookingsByType={bookingsByType}
        bookingsByStatus={bookingsByStatus}
        recentBookings={recentBookings}
        errorLogs={errorLogs}
        locale={locale}
      />
    
  );
}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Users</p>
              <p className="text-3xl font-bold mt-2">{totalUsers}</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total Bookings</p>
              <p className="text-3xl font-bold mt-2">{totalBookings}</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Active Services</p>
              <p className="text-3xl font-bold mt-2">{totalServices}</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Total Revenue</p>
              <p className="text-3xl font-bold mt-2">${totalRevenue.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings by Type and Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Bookings by Type */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Réservations par Type</h3>
          <div className="space-y-3">
            {bookingsByType.length > 0 ? (
              bookingsByType.map((item) => (
                <div key={item.type} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700 capitalize">{item.type}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{item.count}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">Aucune donnée disponible</p>
            )}
          </div>
        </div>

        {/* Bookings by Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Réservations par Statut</h3>
          <div className="space-y-3">
            {bookingsByStatus.length > 0 ? (
              bookingsByStatus.map((item) => {
                const statusColors: Record<string, string> = {
                  pending: 'bg-yellow-500',
                  confirmed: 'bg-green-500',
                  completed: 'bg-blue-500',
                  cancelled: 'bg-red-500',
                };
                return (
                  <div key={item.status} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${statusColors[item.status] || 'bg-gray-500'}`}></div>
                      <span className="text-sm font-medium text-gray-700 capitalize">{item.status}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{item.count}</span>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">Aucune donnée disponible</p>
            )}
          </div>
        </div>
      </div>

      {/* Error Logs Alert */}
      {errorLogs.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8 rounded-xl shadow-sm">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-lg font-medium text-red-800">
                {errorLogs.length} Erreur{errorLogs.length > 1 ? 's' : ''} non résolue{errorLogs.length > 1 ? 's' : ''}
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
                  Voir tous les logs →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Réservations Récentes</h2>
            <a
              href={`/${locale}/admin/bookings`}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Voir tout →
            </a>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Début
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentBookings.length > 0 ? (
                recentBookings.map((booking) => {
                  return (
                    <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {booking.User?.name?.charAt(0).toUpperCase() || 'U'}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {booking.User?.name || 'N/A'}
                            </div>
                            <div className="text-sm text-gray-500">{booking.User?.email || 'N/A'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 capitalize">{booking.type}</div>
                        <div className="text-xs text-gray-500">ID: {booking.id.slice(0, 8)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(booking.startDate).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${
                            booking.status === 'confirmed'
                              ? 'bg-green-100 text-green-800'
                              : booking.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : booking.status === 'cancelled'
                              ? 'bg-red-100 text-red-800'
                              : booking.status === 'completed'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${booking.totalPrice.toFixed(2)}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    Aucune réservation récente
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    
  );
}
