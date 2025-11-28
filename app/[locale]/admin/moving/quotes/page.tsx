import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Eye, Check, X, Clock } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Moving Quote Requests | Admin',
  description: 'Manage moving quote requests',
};

export default async function MovingQuotesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin


  const quotes = await prisma.movingQuote.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      service: {
        select: {
          id: true,
          name: true,
        },
      },
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  const stats = {
    total: quotes.length,
    pending: quotes.filter(q => q.status === 'pending').length,
    quoted: quotes.filter(q => q.status === 'quoted').length,
    accepted: quotes.filter(q => q.status === 'accepted').length,
    rejected: quotes.filter(q => q.status === 'rejected').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'quoted': return 'bg-blue-100 text-blue-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'quoted': return <FileText className="w-4 h-4" />;
      case 'accepted': return <Check className="w-4 h-4" />;
      case 'rejected': return <X className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FileText className="w-8 h-8" />
            Moving Quote Requests
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and respond to quote requests
          </p>
        </div>
        <Link
          href={`/${locale}/admin/moving`}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Back to Services
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Total Quotes</div>
          <div className="text-2xl font-bold">{stats.total}</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg shadow">
          <div className="text-sm text-yellow-600">Pending</div>
          <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg shadow">
          <div className="text-sm text-blue-600">Quoted</div>
          <div className="text-2xl font-bold text-blue-600">{stats.quoted}</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow">
          <div className="text-sm text-green-600">Accepted</div>
          <div className="text-2xl font-bold text-green-600">{stats.accepted}</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg shadow">
          <div className="text-sm text-red-600">Rejected</div>
          <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
        </div>
      </div>

      {/* Quotes Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Quote #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Route
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {quotes.map((quote) => (
              <tr key={quote.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-blue-600">{quote.quoteNumber}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(quote.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium">{quote.name}</div>
                  <div className="text-sm text-gray-500">{quote.email}</div>
                  <div className="text-sm text-gray-500">{quote.phone}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">{quote.service?.name || 'N/A'}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <div className="font-medium">From: {quote.fromCity}</div>
                    <div className="text-gray-500">To: {quote.toCity}</div>
                    {quote.distance && (
                      <div className="text-xs text-blue-600">{quote.distance} km</div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    {quote.preferredDate 
                      ? new Date(quote.preferredDate).toLocaleDateString()
                      : 'Not specified'}
                  </div>
                  {quote.preferredTime && (
                    <div className="text-xs text-gray-500">{quote.preferredTime}</div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(quote.status)}`}>
                    {getStatusIcon(quote.status)}
                    {quote.status}
                  </span>
                  {quote.quotedPrice && (
                    <div className="text-sm font-medium text-green-600 mt-1">
                      {quote.quotedPrice} {quote.currency}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/${locale}/admin/moving/quotes/${quote.id}`}
                    className="text-blue-600 hover:text-blue-900 inline-flex items-center gap-1"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {quotes.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No quote requests yet
            </h3>
            <p className="text-gray-600">
              Quote requests will appear here when customers submit them.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
