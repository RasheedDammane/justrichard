import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/home-cleaning/[id] - Get single service
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const service = await prisma.cleaningService.findUnique({
      where: { id },
      include: {
        City: true,
        Country: true,
        CleaningBooking: {
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
        CleaningReview: {
          where: { isPublished: true },
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: {
            CleaningBooking: true,
            CleaningReview: true,
          },
        },
      },
    });

    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    // Increment views
    await prisma.cleaningService.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json(service);
  } catch (error: any) {
    console.error('Error fetching service:', error);
    return NextResponse.json(
      { error: 'Failed to fetch service' },
      { status: 500 }
    );
  }
}

// PUT /api/home-cleaning/[id] - Update service
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    // Check if service exists
    const existing = await prisma.cleaningService.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    // Check if slug is being changed and if it's unique
    if (body.slug && body.slug !== existing.slug) {
      const slugExists = await prisma.cleaningService.findUnique({
        where: { slug: body.slug },
      });

      if (slugExists) {
        return NextResponse.json(
          { error: 'Slug already exists' },
          { status: 400 }
        );
      }
    }

    const service = await prisma.cleaningService.update({
      where: { id },
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        shortDescription: body.shortDescription,
        category: body.category,
        subCategory: body.subCategory,
        basePrice: body.basePrice,
        currency: body.currency,
        pricePerSqm: body.pricePerSqm,
        minimumCharge: body.minimumCharge,
        duration: body.duration,
        serviceArea: body.serviceArea,
        includedServices: body.includedServices,
        excludedServices: body.excludedServices,
        equipment: body.equipment,
        products: body.products,
        options: body.options,
        addons: body.addons,
        packages: body.packages,
        availableDays: body.availableDays,
        availableHours: body.availableHours,
        advanceBooking: body.advanceBooking,
        cityId: body.cityId,
        countryId: body.countryId,
        serviceAreas: body.serviceAreas,
        latitude: body.latitude,
        longitude: body.longitude,
        image: body.image,
        images: body.images,
        video: body.video,
        tags: body.tags,
        requirements: body.requirements,
        restrictions: body.restrictions,
        cancellationPolicy: body.cancellationPolicy,
        refundPolicy: body.refundPolicy,
        termsConditions: body.termsConditions,
        phone: body.phone,
        email: body.email,
        whatsapp: body.whatsapp,
        metaTitle: body.metaTitle,
        metaDescription: body.metaDescription,
        keywords: body.keywords,
        isActive: body.isActive,
        isFeatured: body.isFeatured,
        isVerified: body.isVerified,
        isAvailable: body.isAvailable,
      },
      include: {
        City: true,
        Country: true,
      },
    });

    return NextResponse.json(service);
  } catch (error: any) {
    console.error('Error updating service:', error);
    return NextResponse.json(
      { error: 'Failed to update service' },
      { status: 500 }
    );
  }
}

// DELETE /api/home-cleaning/[id] - Delete service
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;

    // Check if service exists
    const existing = await prisma.cleaningService.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    // Check if there are bookings
    const bookingsCount = await prisma.cleaningBooking.count({
      where: { serviceId: id },
    });

    if (bookingsCount > 0) {
      return NextResponse.json(
        { error: 'Cannot delete service with existing bookings. Set to inactive instead.' },
        { status: 400 }
      );
    }

    await prisma.cleaningService.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Service deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting service:', error);
    return NextResponse.json(
      { error: 'Failed to delete service' },
      { status: 500 }
    );
  }
}
