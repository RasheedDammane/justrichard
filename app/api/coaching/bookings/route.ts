import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/coaching/bookings - Create a new booking
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      coachId,
      userId,
      sessionType, // free_consultation, regular, follow_up
      sessionFormat,
      coachingType,
      topic,
      goals,
      sessionDate,
      sessionTime,
      duration,
      timezone,
      location,
      meetingLink,
      packagePurchaseId,
    } = body;

    // Validate required fields
    if (!coachId || !userId || !sessionType || !sessionFormat || !sessionDate || !sessionTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get coach details
    const coach = await prisma.coach.findUnique({
      where: { id: coachId },
    });

    if (!coach) {
      return NextResponse.json(
        { error: 'Coach not found' },
        { status: 404 }
      );
    }

    if (coach.status !== 'approved' || !coach.isAvailable) {
      return NextResponse.json(
        { error: 'Coach is not available' },
        { status: 400 }
      );
    }

    // Check if free consultation
    const isFreeConsultation = sessionType === 'free_consultation';
    
    if (isFreeConsultation) {
      // Check if coach offers free consultation
      if (!coach.freeConsultation) {
        return NextResponse.json(
          { error: 'Coach does not offer free consultation' },
          { status: 400 }
        );
      }

      // Check if user already used free consultation with this coach
      const existingFreeConsult = await prisma.freeConsultationUsage.findUnique({
        where: {
          userId_coachId: {
            userId,
            coachId,
          },
        },
      });

      if (existingFreeConsult) {
        return NextResponse.json(
          { error: 'Free consultation already used with this coach' },
          { status: 400 }
        );
      }
    }

    // Calculate session fee
    let sessionFee = 0;
    let originalFee = 0;

    if (!isFreeConsultation) {
      // Determine rate based on format
      if (sessionFormat === 'ONE_ON_ONE') {
        sessionFee = coach.oneOnOneRate;
      } else if (sessionFormat === 'GROUP') {
        sessionFee = coach.groupRate || coach.oneOnOneRate;
      } else if (sessionFormat === 'ONLINE') {
        sessionFee = coach.onlineRate || coach.oneOnOneRate;
      } else if (sessionFormat === 'IN_PERSON') {
        sessionFee = coach.inPersonRate || coach.oneOnOneRate;
      }
      originalFee = sessionFee;
    }

    // Create the session
    const session = await prisma.coachingSession.create({
      data: {
        coachId,
        userId,
        packagePurchaseId,
        sessionType,
        sessionFormat,
        coachingType: coachingType || coach.coachingTypes[0],
        topic,
        goals,
        sessionDate: new Date(sessionDate),
        sessionTime,
        duration: duration || coach.sessionDuration,
        timezone: timezone || 'UTC',
        location,
        meetingLink,
        sessionFee,
        originalFee,
        currency: coach.currency,
        isFreeConsultation,
        status: isFreeConsultation ? 'confirmed' : 'pending',
        paymentStatus: isFreeConsultation ? 'paid' : 'pending',
      },
    });

    // If free consultation, create usage record
    if (isFreeConsultation) {
      await prisma.freeConsultationUsage.create({
        data: {
          userId,
          coachId,
          sessionId: session.id,
        },
      });
    }

    // If from package, update package usage
    if (packagePurchaseId) {
      const packagePurchase = await prisma.packagePurchase.findUnique({
        where: { id: packagePurchaseId },
      });

      if (packagePurchase && packagePurchase.sessionsRemaining > 0) {
        await prisma.packagePurchase.update({
          where: { id: packagePurchaseId },
          data: {
            sessionsUsed: { increment: 1 },
            sessionsRemaining: { decrement: 1 },
          },
        });
      }
    }

    // Create notification
    await prisma.coachingNotification.create({
      data: {
        userId: coachId, // Notify coach
        type: 'booking_confirmed',
        title: 'New Booking',
        message: `You have a new ${isFreeConsultation ? 'free consultation' : 'session'} booking for ${sessionDate}`,
        data: { sessionId: session.id },
      },
    });

    return NextResponse.json({ 
      session,
      message: 'Booking created successfully',
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

// GET /api/coaching/bookings - Get user's bookings
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const coachId = searchParams.get('coachId');
    const status = searchParams.get('status');

    if (!userId && !coachId) {
      return NextResponse.json(
        { error: 'userId or coachId required' },
        { status: 400 }
      );
    }

    let whereClause: any = {};
    if (userId) whereClause.userId = userId;
    if (coachId) whereClause.coachId = coachId;
    if (status) whereClause.status = status;

    const sessions = await prisma.coachingSession.findMany({
      where: whereClause,
      include: {
        coach: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profileImage: true,
            rating: true,
            coachingTypes: true,
          },
        },
      },
      orderBy: {
        sessionDate: 'desc',
      },
    });

    return NextResponse.json({ sessions });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}
