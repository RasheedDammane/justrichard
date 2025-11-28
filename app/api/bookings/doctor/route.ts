import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const appointmentNumber = `DOC-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    const appointment = await prisma.doctorAppointment.create({
      data: {
        appointmentNumber,
        providerId: data.providerId,
        userId: data.userId || null,
        patientName: data.patientName,
        patientEmail: data.patientEmail,
        patientPhone: data.patientPhone,
        patientAge: data.patientAge || null,
        patientGender: data.patientGender || null,
        appointmentDate: new Date(data.appointmentDate),
        appointmentTime: data.appointmentTime,
        duration: data.duration || 30,
        appointmentType: data.appointmentType,
        specialty: data.specialty,
        reasonForVisit: data.reasonForVisit,
        symptoms: data.symptoms || null,
        medicalHistory: data.medicalHistory || null,
        allergies: data.allergies || null,
        hasInsurance: data.hasInsurance || false,
        insuranceProvider: data.insuranceProvider || null,
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
    
    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    console.error('Doctor appointment error:', error);
    return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 });
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
    
    const appointments = await prisma.doctorAppointment.findMany({
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
    
    return NextResponse.json(appointments);
  } catch (error) {
    console.error('Fetch appointments error:', error);
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
  }
}
