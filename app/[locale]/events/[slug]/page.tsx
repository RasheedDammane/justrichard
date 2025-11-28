import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, MapPin, Users, DollarSign, Clock, Globe, User, Mail, Phone, ExternalLink, ArrowRight } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await prisma.event.findUnique({
    where: { slug },
  });

  if (!event) {
    return { title: 'Event Not Found' };
  }

  return {
    title: event.metaTitle || `${event.title} | Events`,
    description: event.metaDescription || event.shortDescription || event.description.substring(0, 160),
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  
  const event = await prisma.event.findUnique({
    where: { slug, isActive: true, status: 'published' },
    include: {
      EventCategory: true,
      City: true,
      Country: true,
      EventSchedule: {
        orderBy: { startTime: 'asc' },
      },
      EventSpeaker: true,
      _count: {
        select: {
          EventRegistration: true,
        },
      },
    },
  });

  if (!event) {
    notFound();
  }

  const isUpcoming = new Date(event.startDate) > new Date();
  const isFull = event.capacity && event._count.EventRegistration >= event.capacity;
  const registrationOpen = isUpcoming && !isFull && 
    (!event.registrationDeadline || new Date(event.registrationDeadline) > new Date());

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <Link href={`/${locale}/events`} className="hover:underline">
              Events
            </Link>
            <span>/</span>
            <span>{event.title}</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-4">
                {event.EventCategory.name}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.title}</h1>
              {event.shortDescription && (
                <p className="text-xl mb-6">{event.shortDescription}</p>
              )}
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{new Date(event.startDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{event.City?.name || event.locationType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{event._count.EventRegistration} registered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Cover Image */}
            {event.coverImage && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <img src={event.coverImage} alt={event.title} className="w-full h-96 object-cover" />
              </div>
            )}

            {/* Description */}
            <div className="bg-white p-8 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">About This Event</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
              </div>
            </div>

            {/* Schedule */}
            {event.EventSchedule && event.EventSchedule.length > 0 && (
              <div className="bg-white p-8 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-6">Event Schedule</h2>
                <div className="space-y-4">
                  {event.EventSchedule.map((schedule) => (
                    <div key={schedule.id} className="flex gap-4 border-l-4 border-purple-600 pl-4">
                      <div className="text-sm text-gray-600 min-w-[100px]">
                        {schedule.startTime} - {schedule.endTime}
                      </div>
                      <div>
                        <div className="font-semibold">{schedule.title}</div>
                        {schedule.description && (
                          <div className="text-sm text-gray-600">{schedule.description}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Speakers */}
            {event.EventSpeaker && event.EventSpeaker.length > 0 && (
              <div className="bg-white p-8 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-6">Speakers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {event.EventSpeaker.map((speaker) => (
                    <div key={speaker.id} className="flex gap-4">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-semibold">{speaker.name}</div>
                        <div className="text-sm text-gray-600">{speaker.title}</div>
                        {speaker.bio && (
                          <div className="text-sm text-gray-500 mt-1">{speaker.bio}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Organizer */}
            {event.organizerName && (
              <div className="bg-white p-8 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-6">Organizer</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-gray-600" />
                    <span className="font-semibold">{event.organizerName}</span>
                  </div>
                  {event.organizerEmail && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-5 h-5 text-gray-600" />
                      <a href={`mailto:${event.organizerEmail}`} className="text-purple-600 hover:underline">
                        {event.organizerEmail}
                      </a>
                    </div>
                  )}
                  {event.organizerPhone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-5 h-5 text-gray-600" />
                      <a href={`tel:${event.organizerPhone}`} className="text-purple-600 hover:underline">
                        {event.organizerPhone}
                      </a>
                    </div>
                  )}
                  {event.organizerWebsite && (
                    <div className="flex items-center gap-2">
                      <ExternalLink className="w-5 h-5 text-gray-600" />
                      <a href={event.organizerWebsite} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg sticky top-4">
              <h3 className="text-xl font-bold mb-4">Event Details</h3>
              
              <div className="space-y-4 mb-6">
                {/* Date & Time */}
                <div>
                  <div className="text-sm text-gray-600 mb-1">Date & Time</div>
                  <div className="font-semibold">
                    {new Date(event.startDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                  <div className="text-sm text-gray-600">
                    {new Date(event.startDate).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                    {' - '}
                    {new Date(event.endDate).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <div className="text-sm text-gray-600 mb-1">Location</div>
                  {event.locationType === 'physical' || event.locationType === 'hybrid' ? (
                    <>
                      {event.venueName && <div className="font-semibold">{event.venueName}</div>}
                      {event.venueAddress && <div className="text-sm text-gray-600">{event.venueAddress}</div>}
                      {event.City && <div className="text-sm text-gray-600">{event.City.name}</div>}
                    </>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <span>Online Event</span>
                    </div>
                  )}
                </div>

                {/* Capacity */}
                {event.capacity && (
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Capacity</div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{event._count.EventRegistration} / {event.capacity}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: `${(event._count.EventRegistration / event.capacity) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Dress Code */}
                {event.dressCode && (
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Dress Code</div>
                    <div className="font-semibold capitalize">{event.dressCode.replace('-', ' ')}</div>
                  </div>
                )}

                {/* Pricing */}
                <div className="border-t pt-4">
                  <div className="text-sm text-gray-600 mb-2">Price</div>
                  {event.isPaid ? (
                    <div className="text-3xl font-bold text-green-600">
                      {event.ticketPrice} {event.currency}
                    </div>
                  ) : (
                    <div className="text-2xl font-bold text-green-600">Free</div>
                  )}
                </div>
              </div>

              {/* Registration Button */}
              {registrationOpen ? (
                <Link
                  href={`/${locale}/events/${event.slug}/register`}
                  className="block w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold text-center flex items-center justify-center gap-2"
                >
                  Register Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              ) : isFull ? (
                <div className="w-full px-6 py-3 bg-gray-300 text-gray-600 rounded-lg font-semibold text-center">
                  Event Full
                </div>
              ) : !isUpcoming ? (
                <div className="w-full px-6 py-3 bg-gray-300 text-gray-600 rounded-lg font-semibold text-center">
                  Event Ended
                </div>
              ) : (
                <div className="w-full px-6 py-3 bg-gray-300 text-gray-600 rounded-lg font-semibold text-center">
                  Registration Closed
                </div>
              )}

              {event.requiresApproval && registrationOpen && (
                <p className="text-xs text-gray-500 mt-2 text-center">
                  * Registration requires approval
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
