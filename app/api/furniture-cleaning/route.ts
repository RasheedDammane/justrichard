import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/home-cleaning - List all home cleaning services
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const category = searchParams.get('category');
    const cityId = searchParams.get('cityId');
    const featured = searchParams.get('featured');

    const where: any = {
      type: 'home',
    };

    if (category) where.category = category;
    if (cityId) where.cityId = cityId;
    if (featured === 'true') where.isFeatured = true;

    const services = await prisma.cleaningService.findMany({
      where,
      include: {
        City: true,
        Country: true,
        _count: {
          select: {
            CleaningBooking: true,
            CleaningReview: true,
          },
        },
      },
      orderBy: [
        { isFeatured: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    return NextResponse.json(services);
  } catch (error: any) {
    console.error('Error fetching home cleaning services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

// POST /api/home-cleaning - Create new home cleaning service
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.slug || !body.basePrice || !body.cityId || !body.countryId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existing = await prisma.cleaningService.findUnique({
      where: { slug: body.slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 400 }
      );
    }

    const service = await prisma.cleaningService.create({
      data: {
        type: 'furniture',
        name: body.name,
        slug: body.slug,
        description: body.description,
        shortDescription: body.shortDescription,
        category: body.category,
        subCategory: body.subCategory,
        basePrice: body.basePrice,
        currency: body.currency || 'AED',
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
        isActive: body.isActive !== undefined ? body.isActive : true,
        isFeatured: body.isFeatured || false,
        isVerified: body.isVerified !== undefined ? body.isVerified : true,
        isAvailable: body.isAvailable !== undefined ? body.isAvailable : true,
      },
      include: {
        City: true,
        Country: true,
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error: any) {
    console.error('Error creating home cleaning service:', error);
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
}
