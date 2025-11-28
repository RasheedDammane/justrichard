import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const bookingNumber = `SCOOT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    const booking = await prisma.scooterBooking.create({
      data: {
        bookingNumber,
        scooterId: data.scooterId,
        userId: data.userId || null,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        driverLicense: data.driverLicense,
        licenseExpiry: new Date(data.licenseExpiry),
        driverAge: data.driverAge,
        pickupDate: new Date(data.pickupDate),
        dropoffDate: new Date(data.dropoffDate),
        pickupTime: data.pickupTime,
        dropoffTime: data.dropoffTime,
        days: data.days,
        pickupLocation: data.pickupLocation,
        dropoffLocation: data.dropoffLocation,
        includeInsurance: data.includeInsurance !== false,
        includeHelmet: data.includeHelmet !== false,
        pricePerDay: data.pricePerDay,
        totalPrice: data.totalPrice,
        currency: data.currency || 'AED',
        specialRequests: data.specialRequests || null,
        status: 'pending',
        paymentStatus: 'pending',
      },
      include: { scooter: { select: { id: true, name: true, slug: true, image: true } } },
    });
    
    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Scooter booking error:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const scooterId = searchParams.get('scooterId');
    
    const where: any = {};
    if (userId) where.userId = userId;
    if (scooterId) where.scooterId = scooterId;
    
    const bookings = await prisma.scooterBooking.findMany({
      where,
      include: { scooter: { select: { id: true, name: true, slug: true, image: true } } },
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}
