import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Calendar, MapPin, DollarSign } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Register for Event | JustRichard',
  description: 'Register for this event',
};

export default async function EventRegisterPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const session = await getServerSession(authOptions);
  
  const event = await prisma.event.findUnique({
    where: { slug, isActive: true, status: 'published' },
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

  if (!event) {
    notFound();
  }

  const isUpcoming = new Date(event.startDate) > new Date();
  const isFull = event.capacity && event._count.EventRegistration >= event.capacity;
  
  if (!isUpcoming || isFull) {
    redirect(`/${locale}/events/${slug}`);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Event Summary */}
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <div className="text-sm text-purple-600 font-semibold mb-2">
              {event.EventCategory.name}
            </div>
            <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
            
            <div className="space-y-2 text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {new Date(event.startDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {event.City?.name || event.locationType}
              </div>
              {event.isPaid && (
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span className="text-xl font-bold text-green-600">
                    {event.ticketPrice} {event.currency}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Registration Form */}
          <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">Register for This Event</h2>
            
            {!session ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">
                  Please sign in to register for this event
                </p>
                <a
                  href={`/${locale}/auth/signin?callbackUrl=/${locale}/events/${slug}/register`}
                  className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold"
                >
                  Sign In to Register
                </a>
              </div>
            ) : (
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    defaultValue={`${session.user?.firstName || ''} ${session.user?.lastName || ''}`.trim()}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    defaultValue={session.user?.email || ''}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="+971 50 123 4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Company/Organization</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Special Requirements</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Dietary restrictions, accessibility needs, etc."
                  />
                </div>

                {event.requiresApproval && (
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Note:</strong> This event requires approval. You will receive a confirmation email once your registration is reviewed.
                    </p>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold"
                  >
                    {event.isPaid ? `Pay ${event.ticketPrice} ${event.currency}` : 'Register for Free'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
