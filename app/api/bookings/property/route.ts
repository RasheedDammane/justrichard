import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const bookingNumber = `PROP-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    const booking = await prisma.propertyBooking.create({
      data: {
        bookingNumber,
        propertyId: data.propertyId,
        userId: data.userId || null,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        checkInDate: new Date(data.checkInDate),
        checkOutDate: new Date(data.checkOutDate),
        nights: data.nights,
        numberOfAdults: data.numberOfAdults || 1,
        numberOfChildren: data.numberOfChildren || 0,
        propertyType: data.propertyType,
        bookingType: data.bookingType,
        includeBreakfast: data.includeBreakfast || false,
        includeCleaning: data.includeCleaning || false,
        pricePerNight: data.pricePerNight,
        totalPrice: data.totalPrice,
        currency: data.currency || 'AED',
        specialRequests: data.specialRequests || null,
        status: 'pending',
        paymentStatus: 'pending',
      },
      include: { property: { select: { id: true, slug: true } } },
    });
    
    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Property booking error:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const propertyId = searchParams.get('propertyId');
    
    const where: any = {};
    if (userId) where.userId = userId;
    if (propertyId) where.propertyId = propertyId;
    
    const bookings = await prisma.propertyBooking.findMany({
      where,
      include: { property: { select: { id: true, slug: true } } },
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}
