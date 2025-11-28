import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const bookingNumber = `ACT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    const booking = await prisma.activityBooking.create({
      data: {
        bookingNumber,
        activityId: data.activityId,
        userId: data.userId || null,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        bookingDate: new Date(data.bookingDate),
        bookingTime: data.bookingTime,
        numberOfAdults: data.numberOfAdults || 1,
        numberOfChildren: data.numberOfChildren || 0,
        numberOfInfants: data.numberOfInfants || 0,
        difficulty: data.difficulty || null,
        equipmentRental: data.equipmentRental || false,
        includeTransport: data.includeTransport || false,
        includeMeals: data.includeMeals || false,
        pricePerAdult: data.pricePerAdult,
        pricePerChild: data.pricePerChild || 0,
        totalPrice: data.totalPrice,
        currency: data.currency || 'AED',
        specialRequests: data.specialRequests || null,
        status: 'pending',
        paymentStatus: 'pending',
      },
      include: { activity: { select: { id: true, name: true, slug: true } } },
    });
    
    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Activity booking error:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const activityId = searchParams.get('activityId');
    
    const where: any = {};
    if (userId) where.userId = userId;
    if (activityId) where.activityId = activityId;
    
    const bookings = await prisma.activityBooking.findMany({
      where,
      include: { activity: { select: { id: true, name: true, slug: true } } },
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}
