import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, MapPin, Users, DollarSign, Clock, ArrowRight, Plus, Filter } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Events | JustRichard',
  description: 'Discover and register for upcoming events',
};

export default async function EventsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ type?: string; category?: string }>;
}) {
  const { locale } = await params;
  const { type, category } = await searchParams;

  const whereClause: any = {
    isActive: true,
    status: 'published',
    startDate: {
      gte: new Date(),
    },
  };

  if (type) {
    whereClause.eventType = type;
  }

  if (category) {
    whereClause.categoryId = category;
  }

  const [upcomingEvents, categories] = await Promise.all([
    prisma.event.findMany({
      where: whereClause,
      include: {
        EventCategory: true,
        City: true,
        _count: {
          select: {
            EventRegistration: true,
          },
        },
      },
      orderBy: [
        { isFeatured: 'desc' },
        { startDate: 'asc' },
      ],
    }),
    prisma.eventCategory.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    }),
  ]);

  const featuredEvents = upcomingEvents.filter(e => e.isFeatured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Discover Amazing Events</h1>
            <p className="text-xl mb-8">
              Find and register for conferences, workshops, networking events, and more!
            </p>
            <Link
              href={`/${locale}/create-event`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-100 font-semibold"
            >
              <Plus className="w-5 h-5" />
              Create Event
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white py-12 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-purple-600">{upcomingEvents.length}+</div>
              <div className="text-gray-600 mt-2">Upcoming Events</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600">{categories.length}+</div>
              <div className="text-gray-600 mt-2">Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600">
                {upcomingEvents.filter(e => e.isFree).length}
              </div>
              <div className="text-gray-600 mt-2">Free Events</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600">
                {upcomingEvents.reduce((sum, e) => sum + e._count.EventRegistration, 0)}+
              </div>
              <div className="text-gray-600 mt-2">Registrations</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Filter Events</h3>
          </div>
          <div className="flex flex-wrap gap-4">
            {/* Event Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/${locale}/events`}
                  className={`px-4 py-2 rounded-lg ${!type ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  All
                </Link>
                {['conference', 'workshop', 'seminar', 'networking', 'exhibition', 'concert', 'sports'].map((eventType) => (
                  <Link
                    key={eventType}
                    href={`/${locale}/events?type=${eventType}${category ? `&category=${category}` : ''}`}
                    className={`px-4 py-2 rounded-lg capitalize ${type === eventType ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    {eventType}
                  </Link>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            {categories.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/${locale}/events${type ? `?type=${type}` : ''}`}
                    className={`px-4 py-2 rounded-lg ${!category ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    All Categories
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/${locale}/events?category=${cat.id}${type ? `&type=${type}` : ''}`}
                      className={`px-4 py-2 rounded-lg ${category === cat.id ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Featured Events */}
      {featuredEvents.length > 0 && (
        <div className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Featured Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredEvents.map((event) => (
                <Link
                  key={event.id}
                  href={`/${locale}/events/${event.slug}`}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-48 bg-gradient-to-br from-purple-500 to-indigo-700 flex items-center justify-center">
                    {event.coverImage ? (
                      <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover" />
                    ) : (
                      <Calendar className="w-20 h-20 text-white" />
                    )}
                    <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-purple-600 font-semibold mb-2">
                      {event.EventCategory.name}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {event.shortDescription || event.description.substring(0, 100)}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        {new Date(event.startDate).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {event.City?.name || event.locationType}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        {event._count.EventRegistration} registered
                        {event.capacity && ` / ${event.capacity}`}
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      {event.isPaid ? (
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-green-600" />
                          <span className="text-xl font-bold text-green-600">
                            {event.ticketPrice} {event.currency}
                          </span>
                        </div>
                      ) : (
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                          Free Event
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* All Upcoming Events */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">All Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <Link
                key={event.id}
                href={`/${locale}/events/${event.slug}`}
                className="bg-gray-50 rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-40 bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                  {event.coverImage ? (
                    <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover" />
                  ) : (
                    <Calendar className="w-16 h-16 text-white" />
                  )}
                </div>
                <div className="p-6">
                  <div className="text-xs text-purple-600 font-semibold mb-2">
                    {event.EventCategory.name}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                  
                  <div className="space-y-1 mb-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {new Date(event.startDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {event.City?.name || event.locationType}
                    </div>
                  </div>

                  {event.isPaid ? (
                    <div className="text-lg font-bold text-green-600">
                      {event.ticketPrice} {event.currency}
                    </div>
                  ) : (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">
                      Free
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {upcomingEvents.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No upcoming events
              </h3>
              <p className="text-gray-600">
                Check back soon for new events!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
