import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/parcel/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const service = await prisma.parcelService.findUnique({
      where: { id: params.id },
      include: {
        deliveries: {
          take: 5,
          orderBy: { createdAt: 'desc' },
        },
        quotes: {
          take: 5,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error('Error fetching parcel service:', error);
    return NextResponse.json(
      { error: 'Failed to fetch parcel service' },
      { status: 500 }
    );
  }
}

// PUT /api/parcel/[id]
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

    const service = await prisma.parcelService.update({
      where: { id: params.id },
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        shortDescription: data.shortDescription,
        partnerId: data.partnerId,
        partnerName: data.partnerName,
        basePrice: data.basePrice ? parseFloat(data.basePrice) : undefined,
        pricePerKg: data.pricePerKg ? parseFloat(data.pricePerKg) : undefined,
        pricePerKm: data.pricePerKm ? parseFloat(data.pricePerKm) : undefined,
        currency: data.currency,
        maxWeight: data.maxWeight ? parseFloat(data.maxWeight) : undefined,
        maxLength: data.maxLength ? parseFloat(data.maxLength) : undefined,
        maxWidth: data.maxWidth ? parseFloat(data.maxWidth) : undefined,
        maxHeight: data.maxHeight ? parseFloat(data.maxHeight) : undefined,
        expressAvailable: data.expressAvailable,
        sameDay: data.sameDay,
        nextDay: data.nextDay,
        international: data.international,
        trackingAvailable: data.trackingAvailable,
        insuranceAvailable: data.insuranceAvailable,
        coverageAreas: data.coverageAreas,
        logo: data.logo,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        isActive: data.isActive,
        isFeatured: data.isFeatured,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.error('Error updating parcel service:', error);
    return NextResponse.json(
      { error: 'Failed to update parcel service' },
      { status: 500 }
    );
  }
}

// DELETE /api/parcel/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.parcelService.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting parcel service:', error);
    return NextResponse.json(
      { error: 'Failed to delete parcel service' },
      { status: 500 }
    );
  }
}
