import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Eye } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Parcel Quote Requests | Admin',
};

export default async function ParcelQuotesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin

  const session = await getServerSession(authOptions);
  if (!session) redirect(`/${locale}/auth/signin`);

  const quotes = await prisma.parcelQuote.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      service: { select: { id: true, name: true } },
      user: { select: { id: true, email: true, firstName: true, lastName: true } },
    },
  });

  const stats = {
    total: quotes.length,
    pending: quotes.filter(q => q.status === 'pending').length,
    quoted: quotes.filter(q => q.status === 'quoted').length,
    accepted: quotes.filter(q => q.status === 'accepted').length,
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FileText className="w-8 h-8" />
          Parcel Quote Requests
        </h1>
        <Link href={`/${locale}/admin/parcel`} className="px-4 py-2 border rounded-lg hover:bg-gray-50">
          Back to Services
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Total</div>
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
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quote #</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sender</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Weight</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {quotes.map((quote) => (
              <tr key={quote.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-blue-600">{quote.quoteNumber}</div>
                  <div className="text-xs text-gray-500">{new Date(quote.createdAt).toLocaleDateString()}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium">{quote.senderName}</div>
                  <div className="text-sm text-gray-500">{quote.senderEmail}</div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div>{quote.senderCity} → {quote.recipientCity}</div>
                </td>
                <td className="px-6 py-4 text-sm">{quote.weight} kg</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    quote.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    quote.status === 'quoted' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {quote.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/${locale}/admin/parcel/quotes/${quote.id}`} className="text-blue-600 hover:text-blue-900">
                    <Eye className="w-4 h-4 inline" /> View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
