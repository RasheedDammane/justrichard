import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const consultationNumber = `LAW-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    const consultation = await prisma.lawyerConsultation.create({
      data: {
        consultationNumber,
        providerId: data.providerId,
        userId: data.userId || null,
        clientName: data.clientName,
        clientEmail: data.clientEmail,
        clientPhone: data.clientPhone,
        clientType: data.clientType,
        companyName: data.companyName || null,
        consultationDate: new Date(data.consultationDate),
        consultationTime: data.consultationTime,
        duration: data.duration || 60,
        consultationType: data.consultationType,
        meetingType: data.meetingType,
        legalArea: data.legalArea,
        caseType: data.caseType || null,
        caseDescription: data.caseDescription,
        urgency: data.urgency || 'normal',
        consultationFee: data.consultationFee,
        totalPrice: data.totalPrice,
        currency: data.currency || 'AED',
        specialRequests: data.specialRequests || null,
        status: 'scheduled',
        paymentStatus: 'pending',
      },
      include: {
        provider: {
          select: {
            id: true,
            name: true,
            slug: true,
            logo: true,
          },
        },
      },
    });
    
    return NextResponse.json(consultation, { status: 201 });
  } catch (error) {
    console.error('Lawyer consultation error:', error);
    return NextResponse.json({ error: 'Failed to create consultation' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const providerId = searchParams.get('providerId');
    
    const where: any = {};
    if (userId) where.userId = userId;
    if (providerId) where.providerId = providerId;
    
    const consultations = await prisma.lawyerConsultation.findMany({
      where,
      include: {
        provider: {
          select: {
            id: true,
            name: true,
            slug: true,
            logo: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json(consultations);
  } catch (error) {
    console.error('Fetch consultations error:', error);
    return NextResponse.json({ error: 'Failed to fetch consultations' }, { status: 500 });
  }
}
