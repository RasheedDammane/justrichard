import { prisma } from '@/lib/prisma';
import { BookingStatus } from '@prisma/client';
import BookingsClient from './BookingsClient';

export default async function AdminBookingsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin
  

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

  return <BookingsClient bookings={bookings} stats={stats} />;
}
