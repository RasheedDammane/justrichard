import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const bookingNumber = `YACHT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    const booking = await prisma.yachtBooking.create({
      data: {
        bookingNumber,
        yachtId: data.yachtId,
        userId: data.userId || null,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        bookingDate: new Date(data.bookingDate),
        startTime: data.startTime,
        duration: data.duration,
        endTime: data.endTime,
        numberOfGuests: data.numberOfGuests,
        tripType: data.tripType,
        departurePoint: data.departurePoint,
        destination: data.destination || null,
        includeCatering: data.includeCatering || false,
        cateringType: data.cateringType || null,
        includeWaterSports: data.includeWaterSports || false,
        includeCrew: data.includeCrew !== false,
        basePrice: data.basePrice,
        cateringPrice: data.cateringPrice || 0,
        waterSportsPrice: data.waterSportsPrice || 0,
        discount: data.discount || 0,
        totalPrice: data.totalPrice,
        currency: data.currency || 'AED',
        depositAmount: data.depositAmount || null,
        specialRequests: data.specialRequests || null,
        status: 'pending',
        paymentStatus: 'pending',
      },
      include: {
        yacht: {
          select: {
            id: true,
            name: true,
            slug: true,
            mainImage: true,
          },
        },
      },
    });
    
    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Yacht booking error:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const yachtId = searchParams.get('yachtId');
    
    const where: any = {};
    if (userId) where.userId = userId;
    if (yachtId) where.yachtId = yachtId;
    
    const bookings = await prisma.yachtBooking.findMany({
      where,
      include: {
        yacht: {
          select: {
            id: true,
            name: true,
            slug: true,
            mainImage: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Fetch bookings error:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}
