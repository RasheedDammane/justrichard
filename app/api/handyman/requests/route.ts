import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      serviceId,
      problemTitle,
      problemDescription,
      urgencyLevel,
      preferredDate,
      preferredTime,
      flexibleSchedule,
      address,
      cityId,
      buildingId,
      floor,
      accessInstructions,
      images,
    } = body;

    if (!serviceId || !problemTitle || !problemDescription || !urgencyLevel || !address || !cityId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get service to calculate price
    const service = await prisma.handymanService.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    // Calculate price based on urgency
    let quotedPrice = service.basePrice;
    let urgencyFee = 0;

    if (urgencyLevel === 'CRITICAL') {
      urgencyFee = service.basePrice * (service.criticalMultiplier - 1);
      quotedPrice = service.basePrice * service.criticalMultiplier;
    } else if (urgencyLevel === 'HIGH') {
      urgencyFee = service.basePrice * (service.highMultiplier - 1);
      quotedPrice = service.basePrice * service.highMultiplier;
    }

    // Create request
    const handymanRequest = await prisma.handymanRequest.create({
      data: {
        serviceId,
        userId: session.user.id,
        problemTitle,
        problemDescription,
        urgencyLevel,
        preferredDate: preferredDate ? new Date(preferredDate) : null,
        preferredTime: preferredTime || null,
        flexibleSchedule: flexibleSchedule || false,
        address,
        cityId,
        buildingId: buildingId || null,
        floor: floor || null,
        accessInstructions: accessInstructions || null,
        images: images || [],
        quotedPrice,
        urgencyFee,
        currency: service.currency,
      },
      include: {
        service: {
          include: {
            city: true,
          },
        },
      },
    });

    return NextResponse.json({ request: handymanRequest }, { status: 201 });
  } catch (error) {
    console.error('Error creating handyman request:', error);
    return NextResponse.json(
      { error: 'Failed to create handyman request' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const urgencyLevel = searchParams.get('urgencyLevel');

    let whereClause: any = { userId: session.user.id };
    if (status) whereClause.status = status;
    if (urgencyLevel) whereClause.urgencyLevel = urgencyLevel;

    const requests = await prisma.handymanRequest.findMany({
      where: whereClause,
      include: {
        service: {
          include: {
            city: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ requests });
  } catch (error) {
    console.error('Error fetching handyman requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch handyman requests' },
      { status: 500 }
    );
  }
}
