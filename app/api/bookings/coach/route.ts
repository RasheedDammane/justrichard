import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Generate unique booking number
    const bookingNumber = `COACH-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    // Create coach booking
    const booking = await prisma.coachBooking.create({
      data: {
        bookingNumber,
        coachId: data.coachId,
        userId: data.userId || null,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        sessionType: data.sessionType,
        sessionDate: new Date(data.sessionDate),
        sessionTime: data.sessionTime,
        duration: data.duration,
        category: data.category,
        goals: data.goals || null,
        experience: data.experience || null,
        basePrice: data.basePrice,
        discount: data.discount || 0,
        totalPrice: data.totalPrice,
        currency: data.currency || 'AED',
        specialRequests: data.specialRequests || null,
        status: 'pending',
        paymentStatus: 'pending',
      },
      include: {
        coach: {
          select: {
            id: true,
            name: true,
            slug: true,
            image: true,
          },
        },
      },
    });
    
    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Coach booking error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const coachId = searchParams.get('coachId');
    const status = searchParams.get('status');
    
    const where: any = {};
    if (userId) where.userId = userId;
    if (coachId) where.coachId = coachId;
    if (status) where.status = status;
    
    const bookings = await prisma.coachBooking.findMany({
      where,
      include: {
        coach: {
          select: {
            id: true,
            name: true,
            slug: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Fetch bookings error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}
