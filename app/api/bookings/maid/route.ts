import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const bookingNumber = `MAID-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    const booking = await prisma.maidBooking.create({
      data: {
        bookingNumber,
        maidId: data.maidId,
        userId: data.userId || null,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        customerAddress: data.customerAddress,
        bookingType: data.bookingType,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        workingHours: data.workingHours,
        serviceType: data.serviceType,
        propertyType: data.propertyType,
        salaryType: data.salaryType,
        monthlyRate: data.monthlyRate || null,
        totalPrice: data.totalPrice,
        currency: data.currency || 'AED',
        specialRequests: data.specialRequests || null,
        status: 'pending',
        paymentStatus: 'pending',
      },
      include: { maid: { select: { id: true, name: true, slug: true, image: true } } },
    });
    
    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Maid booking error:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const maidId = searchParams.get('maidId');
    
    const where: any = {};
    if (userId) where.userId = userId;
    if (maidId) where.maidId = maidId;
    
    const bookings = await prisma.maidBooking.findMany({
      where,
      include: { maid: { select: { id: true, name: true, slug: true, image: true } } },
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}
