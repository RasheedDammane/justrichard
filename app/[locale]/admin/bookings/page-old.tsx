import { prisma } from '@/lib/prisma';
import { Calendar, CheckCircle, Clock, XCircle } from 'lucide-react';

export default async function AdminBookingsPage({ params: { locale } }: { params: { locale: string } }) {
  

  const bookings = await prisma.booking.findMany({
    include: {
      user: { select: { name: true, email: true, phone: true } },
      service: {
        include: { translations: { where: { locale } } },
      },
      address: true,
      payment: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 100,
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === BookingStatus.PENDING).length,
    confirmed: bookings.filter((b) => b.status === BookingStatus.CONFIRMED).length,
    completed: bookings.filter((b) => b.status === BookingStatus.COMPLETED).length,
    cancelled: bookings.filter((b) => b.status === BookingStatus.CANCELLED).length,
    revenue: bookings
      .filter((b) => b.status === BookingStatus.COMPLETED)
      .reduce((sum, b) => sum + b.total, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-600 text-white py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold">Gestion des Réservations</h1>
          <p className="text-primary-100 mt-1">Gérer toutes les réservations de la plateforme</p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">Total</div>
                <div className="text-3xl font-bold text-primary-600 mt-2">{stats.total}</div>
              </div>
              <Calendar className="w-12 h-12 text-primary-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">En Attente</div>
                <div className="text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</div>
              </div>
              <Clock className="w-12 h-12 text-yellow-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">Confirmées</div>
                <div className="text-3xl font-bold text-blue-600 mt-2">{stats.confirmed}</div>
              </div>
              <CheckCircle className="w-12 h-12 text-blue-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">Terminées</div>
                <div className="text-3xl font-bold text-green-600 mt-2">{stats.completed}</div>
              </div>
              <CheckCircle className="w-12 h-12 text-green-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">Annulées</div>
                <div className="text-3xl font-bold text-red-600 mt-2">{stats.cancelled}</div>
              </div>
              <XCircle className="w-12 h-12 text-red-200" />
            </div>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg shadow-lg p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-primary-100 text-sm font-medium">Revenu Total (Terminées)</div>
              <div className="text-4xl font-bold mt-2">${stats.revenue.toFixed(2)}</div>
            </div>
            <div className="text-6xl opacity-20">💰</div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-bold">Liste des Réservations</h2>
            <div className="flex gap-2">
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option value="">Tous les statuts</option>
                <option value="PENDING">En attente</option>
                <option value="CONFIRMED">Confirmé</option>
                <option value="COMPLETED">Terminé</option>
                <option value="CANCELLED">Annulé</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Heure
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Adresse
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Montant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paiement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking) => {
                  const serviceTranslation = booking.service.translations[0];
                  return (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">
                        {booking.id.substring(0, 8)}...
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{booking.user.name}</div>
                        <div className="text-sm text-gray-500">{booking.user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {serviceTranslation?.name || booking.service.slug}
                        </div>
                        <div className="text-sm text-gray-500">{booking.duration} min</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(booking.scheduledDate).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">{booking.scheduledTime}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{booking.address.city}</div>
                        <div className="text-sm text-gray-500">{booking.address.street}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          ${booking.total.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-500">{booking.currency}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            booking.status === BookingStatus.CONFIRMED
                              ? 'bg-blue-100 text-blue-800'
                              : booking.status === BookingStatus.COMPLETED
                              ? 'bg-green-100 text-green-800'
                              : booking.status === BookingStatus.CANCELLED
                              ? 'bg-red-100 text-red-800'
                              : booking.status === BookingStatus.IN_PROGRESS
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            booking.paymentStatus === 'PAID'
                              ? 'bg-green-100 text-green-800'
                              : booking.paymentStatus === 'FAILED'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {booking.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-primary-600 hover:text-primary-900 mr-2">
                          Voir
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">Modifier</button>
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
  );
}
