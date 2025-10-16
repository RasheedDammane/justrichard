import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';
import { Role, LogLevel, ErrorLog } from '@prisma/client';

export default async function ErrorLogsPage({ 
  params: { locale },
  searchParams,
}: { 
  params: { locale: string };
  searchParams: { level?: string; resolved?: string; page?: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user.role !== Role.ADMIN && session.user.role !== Role.MANAGER)) {
    redirect(`/${locale}/auth/login`);
  }

  logger.info('Error logs page accessed', {
    userId: session.user.id,
    path: `/${locale}/admin/logs`,
  });

  const page = parseInt(searchParams.page || '1');
  const pageSize = 50;
  const level = searchParams.level;
  const resolved = searchParams.resolved === 'true' ? true : searchParams.resolved === 'false' ? false : undefined;

  const where: any = {};
  if (level) where.level = level;
  if (resolved !== undefined) where.resolved = resolved;

  try {
    const [logs, totalCount, stats] = await Promise.all([
      prisma.errorLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.errorLog.count({ where }),
      prisma.errorLog.groupBy({
        by: ['level'],
        _count: true,
        where: { resolved: false },
      }),
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-primary-600 text-white py-8 px-4">
          <div className="container mx-auto max-w-7xl">
            <h1 className="text-3xl font-bold">Error Logs</h1>
            <p className="text-primary-100 mt-1">Monitor and manage application errors</p>
          </div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat: { level: LogLevel; _count: number }) => (
              <div key={stat.level} className="bg-white rounded-lg shadow p-6">
                <div className="text-gray-500 text-sm font-medium">
                  {stat.level} Errors (Unresolved)
                </div>
                <div className={`text-3xl font-bold mt-2 ${
                  stat.level === 'ERROR' ? 'text-red-600' : 
                  stat.level === 'WARN' ? 'text-yellow-600' : 
                  'text-blue-600'
                }`}>
                  {stat._count}
                </div>
              </div>
            ))}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-gray-500 text-sm font-medium">Total Logs</div>
              <div className="text-3xl font-bold text-gray-900 mt-2">{totalCount}</div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-lg font-bold mb-4">Filters</h2>
            <form method="get" className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Level
                </label>
                <select
                  name="level"
                  defaultValue={level || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">All Levels</option>
                  <option value="ERROR">ERROR</option>
                  <option value="WARN">WARN</option>
                  <option value="INFO">INFO</option>
                  <option value="DEBUG">DEBUG</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="resolved"
                  defaultValue={resolved === undefined ? '' : resolved.toString()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">All</option>
                  <option value="false">Unresolved</option>
                  <option value="true">Resolved</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </form>
          </div>

          {/* Logs Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Path
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
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
                  {logs.map((log: ErrorLog) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            log.level === 'ERROR'
                              ? 'bg-red-100 text-red-800'
                              : log.level === 'WARN'
                              ? 'bg-yellow-100 text-yellow-800'
                              : log.level === 'INFO'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {log.level}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-md truncate">
                          {log.message}
                        </div>
                        {log.errorName && (
                          <div className="text-xs text-gray-500">{log.errorName}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {log.path || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(log.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {log.resolved ? (
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Resolved
                          </span>
                        ) : (
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Unresolved
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a
                          href={`/${locale}/admin/logs/${log.id}`}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          View Details
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  {page > 1 && (
                    <a
                      href={`?page=${page - 1}${level ? `&level=${level}` : ''}${resolved !== undefined ? `&resolved=${resolved}` : ''}`}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Previous
                    </a>
                  )}
                  {page < totalPages && (
                    <a
                      href={`?page=${page + 1}${level ? `&level=${level}` : ''}${resolved !== undefined ? `&resolved=${resolved}` : ''}`}
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Next
                    </a>
                  )}
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{(page - 1) * pageSize + 1}</span> to{' '}
                      <span className="font-medium">{Math.min(page * pageSize, totalCount)}</span> of{' '}
                      <span className="font-medium">{totalCount}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map((p) => (
                        <a
                          key={p}
                          href={`?page=${p}${level ? `&level=${level}` : ''}${resolved !== undefined ? `&resolved=${resolved}` : ''}`}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            p === page
                              ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {p}
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    logger.error('Failed to load error logs page', error as Error, {
      userId: session.user.id,
      path: `/${locale}/admin/logs`,
    });

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Logs</h1>
          <p className="text-gray-600">An error occurred while loading the error logs page.</p>
          <a
            href={`/${locale}/admin`}
            className="mt-4 inline-block bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    );
  }
}
