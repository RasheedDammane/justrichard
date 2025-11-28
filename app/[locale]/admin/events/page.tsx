import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Plus, Edit, Trash2, Eye, Users, DollarSign } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Events Management | Admin',
  description: 'Manage events',
};

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin


  const events = await prisma.event.findMany({
    orderBy: [
      { isFeatured: 'desc' },
      { startDate: 'desc' },
    ],
    include: {
      EventCategory: true,
      City: true,
      _count: {
        select: {
          EventRegistration: true,
        },
      },
    },
  });

  const stats = {
    total: events.length,
    active: events.filter(e => e.isActive).length,
    featured: events.filter(e => e.isFeatured).length,
    paid: events.filter(e => e.isPaid).length,
    free: events.filter(e => e.isFree).length,
    upcoming: events.filter(e => new Date(e.startDate) > new Date()).length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Calendar className="w-8 h-8" />
            Events Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and publish events
          </p>
        </div>
        <Link
          href={`/${locale}/admin/events/new`}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Create Event
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Total Events</div>
          <div className="text-2xl font-bold">{stats.total}</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow">
          <div className="text-sm text-green-600">Active</div>
          <div className="text-2xl font-bold text-green-600">{stats.active}</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg shadow">
          <div className="text-sm text-blue-600">Featured</div>
          <div className="text-2xl font-bold text-blue-600">{stats.featured}</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg shadow">
          <div className="text-sm text-purple-600">Upcoming</div>
          <div className="text-2xl font-bold text-purple-600">{stats.upcoming}</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg shadow">
          <div className="text-sm text-yellow-600">Paid</div>
          <div className="text-2xl font-bold text-yellow-600">{stats.paid}</div>
        </div>
        <div className="bg-teal-50 p-4 rounded-lg shadow">
          <div className="text-sm text-teal-600">Free</div>
          <div className="text-2xl font-bold text-teal-600">{stats.free}</div>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Event
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date & Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Pricing
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Registrations
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
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-900">{event.title}</div>
                    <div className="text-sm text-gray-500">{event.slug}</div>
                    {event.isFeatured && (
                      <span className="inline-flex mt-1 px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                        Featured
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">{event.EventCategory.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <div className="font-medium">
                      {new Date(event.startDate).toLocaleDateString()}
                    </div>
                    <div className="text-gray-500">
                      {event.City?.name || event.locationType}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {event.isPaid ? (
                    <div className="flex items-center gap-1 text-sm">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="font-semibold text-green-600">
                        {event.ticketPrice} {event.currency}
                      </span>
                    </div>
                  ) : (
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                      Free
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-sm">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>{event._count.EventRegistration}</span>
                    {event.capacity && (
                      <span className="text-gray-500">/ {event.capacity}</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                    {!event.isActive && (
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        Inactive
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/${locale}/events/${event.slug}`}
                      className="text-gray-600 hover:text-gray-900"
                      title="View"
                    >
                      <Eye className="w-5 h-5" />
                    </Link>
                    <Link
                      href={`/${locale}/admin/events/edit/${event.id}`}
                      className="text-blue-600 hover:text-blue-900"
                      title="Edit"
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                    <button
                      className="text-red-600 hover:text-red-900"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {events.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No events yet
            </h3>
            <p className="text-gray-600 mb-4">
              Get started by creating your first event.
            </p>
            <Link
              href={`/${locale}/admin/events/new`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-5 h-5" />
              Create Event
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
