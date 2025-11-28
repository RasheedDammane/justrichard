import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/moving/[id] - Détail d'un service
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const service = await prisma.movingService.findUnique({
      where: { id: params.id },
      include: {
        bookings: {
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
    console.error('Error fetching moving service:', error);
    return NextResponse.json(
      { error: 'Failed to fetch moving service' },
      { status: 500 }
    );
  }
}

// PUT /api/moving/[id] - Modifier un service (Admin only)
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

    const service = await prisma.movingService.update({
      where: { id: params.id },
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        shortDescription: data.shortDescription,
        partnerId: data.partnerId,
        partnerName: data.partnerName,
        basePrice: data.basePrice ? parseFloat(data.basePrice) : undefined,
        pricePerKm: data.pricePerKm ? parseFloat(data.pricePerKm) : undefined,
        pricePerCubicM: data.pricePerCubicM ? parseFloat(data.pricePerCubicM) : undefined,
        pricePerHour: data.pricePerHour ? parseFloat(data.pricePerHour) : undefined,
        currency: data.currency,
        packingIncluded: data.packingIncluded,
        unpackingIncluded: data.unpackingIncluded,
        assemblyIncluded: data.assemblyIncluded,
        storageAvailable: data.storageAvailable,
        vehicleTypes: data.vehicleTypes,
        coverageAreas: data.coverageAreas,
        availableDays: data.availableDays,
        workingHours: data.workingHours,
        images: data.images,
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
    console.error('Error updating moving service:', error);
    return NextResponse.json(
      { error: 'Failed to update moving service' },
      { status: 500 }
    );
  }
}

// DELETE /api/moving/[id] - Supprimer un service (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.movingService.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting moving service:', error);
    return NextResponse.json(
      { error: 'Failed to delete moving service' },
      { status: 500 }
    );
  }
}
