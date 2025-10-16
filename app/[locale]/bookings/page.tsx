import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/utils';

export default async function BookingsPage({ params: { locale } }: { params: { locale: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/auth/login`);
  }

  const bookings = await prisma.booking.findMany({
    where: { userId: session.user.id },
    include: {
      service: {
        include: {
          translations: { where: { locale } },
        },
      },
      address: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  const upcoming = bookings.filter(
    (b) => b.status !== 'COMPLETED' && b.status !== 'CANCELLED' && new Date(b.scheduledDate) >= new Date()
  );
  const past = bookings.filter(
    (b) => b.status === 'COMPLETED' || new Date(b.scheduledDate) < new Date()
  );
  const cancelled = bookings.filter((b) => b.status === 'CANCELLED');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-600 text-white py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold">My Bookings</h1>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              <button className="py-4 border-b-2 border-primary-600 text-primary-600 font-medium">
                Upcoming ({upcoming.length})
              </button>
              <button className="py-4 text-gray-500 hover:text-gray-700">
                Past ({past.length})
              </button>
              <button className="py-4 text-gray-500 hover:text-gray-700">
                Cancelled ({cancelled.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Bookings List */}
        {upcoming.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500 mb-4">No upcoming bookings</p>
            <a
              href={`/${locale}/services`}
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700"
            >
              Book a Service
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {upcoming.map((booking) => {
              const serviceTranslation = booking.service.translations[0];
              return (
                <div key={booking.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">
                        {serviceTranslation?.name || booking.service.slug}
                      </h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>
                          📅 {formatDate(booking.scheduledDate, locale)} at {booking.scheduledTime}
                        </p>
                        <p>
                          📍 {booking.address.street}, {booking.address.city}
                        </p>
                        <p>💰 ${booking.total.toFixed(2)}</p>
                      </div>
                      <div className="mt-3">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                            booking.status === 'CONFIRMED'
                              ? 'bg-green-100 text-green-800'
                              : booking.status === 'PENDING'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex flex-col space-y-2">
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        View Details
                      </button>
                      <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                        Reschedule
                      </button>
                      <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
