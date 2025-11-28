import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/events - Liste des événements
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const isActive = searchParams.get('isActive');
    const isPaid = searchParams.get('isPaid');
    const categoryId = searchParams.get('categoryId');
    const upcoming = searchParams.get('upcoming');
    const limit = searchParams.get('limit');

    const where: any = {};
    
    if (featured === 'true') {
      where.isFeatured = true;
    }
    
    if (isActive !== null) {
      where.isActive = isActive === 'true';
    }

    if (isPaid !== null) {
      where.isPaid = isPaid === 'true';
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (upcoming === 'true') {
      where.startDate = {
        gte: new Date(),
      };
    }

    const events = await prisma.event.findMany({
      where,
      include: {
        EventCategory: true,
        City: true,
        Country: true,
        _count: {
          select: {
            EventRegistration: true,
          },
        },
      },
      orderBy: [
        { isFeatured: 'desc' },
        { startDate: 'asc' },
      ],
      take: limit ? parseInt(limit) : undefined,
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

// POST /api/events - Créer un événement (Admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const event = await prisma.event.create({
      data: {
        id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: data.title,
        slug: data.slug,
        description: data.description,
        shortDescription: data.shortDescription,
        coverImage: data.coverImage,
        images: data.images || null,
        categoryId: data.categoryId,
        eventType: data.eventType,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        locationType: data.locationType,
        venueName: data.venueName,
        venueAddress: data.venueAddress,
        cityId: data.cityId,
        countryId: data.countryId,
        regionId: data.regionId,
        meetingUrl: data.meetingUrl,
        capacity: data.capacity ? parseInt(data.capacity) : null,
        isFree: data.isFree !== undefined ? data.isFree : true,
        isPaid: data.isPaid || false,
        ticketPrice: data.ticketPrice ? parseFloat(data.ticketPrice) : null,
        currency: data.currency || 'AED',
        dressCode: data.dressCode,
        organizerName: data.organizerName,
        organizerEmail: data.organizerEmail,
        organizerPhone: data.organizerPhone,
        organizerWebsite: data.organizerWebsite,
        venueDetails: data.venueDetails || null,
        requiresApproval: data.requiresApproval || false,
        maxAttendees: data.maxAttendees ? parseInt(data.maxAttendees) : null,
        registrationDeadline: data.registrationDeadline ? new Date(data.registrationDeadline) : null,
        tags: data.tags || null,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        status: data.status || 'draft',
        isActive: data.isActive !== undefined ? data.isActive : true,
        isFeatured: data.isFeatured || false,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
