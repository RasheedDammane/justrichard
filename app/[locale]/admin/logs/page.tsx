import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import AdminLogsClient from './AdminLogsClient';

export const metadata: Metadata = {
  title: 'Application Logs | Admin',
  description: 'Monitor and manage application logs',
};

export default async function LogsPage() {
  // TODO: Add authentication check
  // const session = await getServerSession(authOptions);
  // if (!session || session.user.role !== 'ADMIN') {
  //   redirect('/auth/login');
  // }

  // Fetch initial data (last 24 hours, all levels)
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  try {
    const [logs, total] = await Promise.all([
      prisma.log.findMany({
        where: {
          timestamp: {
            gte: yesterday,
          },
        },
        orderBy: { timestamp: 'desc' },
        take: 50,
        select: {
          id: true,
          timestamp: true,
          level: true,
          category: true,
          message: true,
          source: true,
          environment: true,
          userId: true,
          adminId: true,
          requestId: true,
          path: true,
          method: true,
          statusCode: true,
          ip: true,
          userAgent: true,
        },
      }),
      prisma.log.count({
        where: {
          timestamp: {
            gte: yesterday,
          },
        },
      }),
    ]);

    return (
      <AdminLogsClient
        initialData={{
          items: logs.map(log => ({
            ...log,
            timestamp: log.timestamp.toISOString(),
          })),
          page: 1,
          pageSize: 50,
          total,
        }}
      />
    );
  } catch (error) {
    console.error('Failed to load logs page:', error);

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Logs</h1>
          <p className="text-gray-600 mb-4">An error occurred while loading the logs page.</p>
          <p className="text-sm text-gray-500 mb-6">Please try again or contact support if the problem persists.</p>
          <a
            href="/admin"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    );
  }
}
