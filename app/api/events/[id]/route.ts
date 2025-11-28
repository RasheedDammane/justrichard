import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/events/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: params.id },
      include: {
        EventCategory: true,
        City: true,
        Country: true,
        Region: true,
        EventRegistration: {
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
        EventSchedule: {
          orderBy: { startTime: 'asc' },
        },
        EventSpeaker: true,
        EventTicket: true,
        _count: {
          select: {
            EventRegistration: true,
          },
        },
      },
    });

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Increment views
    await prisma.event.update({
      where: { id: params.id },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    );
  }
}

// PUT /api/events/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const event = await prisma.event.update({
      where: { id: params.id },
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        shortDescription: data.shortDescription,
        coverImage: data.coverImage,
        images: data.images,
        categoryId: data.categoryId,
        eventType: data.eventType,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        locationType: data.locationType,
        venueName: data.venueName,
        venueAddress: data.venueAddress,
        cityId: data.cityId,
        countryId: data.countryId,
        regionId: data.regionId,
        meetingUrl: data.meetingUrl,
        capacity: data.capacity ? parseInt(data.capacity) : null,
        isFree: data.isFree,
        isPaid: data.isPaid,
        ticketPrice: data.ticketPrice ? parseFloat(data.ticketPrice) : null,
        currency: data.currency,
        dressCode: data.dressCode,
        organizerName: data.organizerName,
        organizerEmail: data.organizerEmail,
        organizerPhone: data.organizerPhone,
        organizerWebsite: data.organizerWebsite,
        venueDetails: data.venueDetails,
        requiresApproval: data.requiresApproval,
        maxAttendees: data.maxAttendees ? parseInt(data.maxAttendees) : null,
        registrationDeadline: data.registrationDeadline ? new Date(data.registrationDeadline) : null,
        tags: data.tags,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        status: data.status,
        isActive: data.isActive,
        isFeatured: data.isFeatured,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    );
  }
}

// DELETE /api/events/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.event.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    );
  }
}
