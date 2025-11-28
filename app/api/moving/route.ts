import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/moving - Liste des services de déménagement
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const isActive = searchParams.get('isActive');
    const limit = searchParams.get('limit');

    const where: any = {};
    
    if (featured === 'true') {
      where.isFeatured = true;
    }
    
    if (isActive !== null) {
      where.isActive = isActive === 'true';
    }

    const services = await prisma.movingService.findMany({
      where,
      orderBy: [
        { isFeatured: 'desc' },
        { rating: 'desc' },
        { totalBookings: 'desc' }
      ],
      take: limit ? parseInt(limit) : undefined,
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching moving services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch moving services' },
      { status: 500 }
    );
  }
}

// POST /api/moving - Créer un service de déménagement (Admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const service = await prisma.movingService.create({
      data: {
        id: `moving_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: data.name,
        slug: data.slug || data.name.toLowerCase().replace(/\s+/g, '-'),
        description: data.description,
        shortDescription: data.shortDescription,
        partnerId: data.partnerId,
        partnerName: data.partnerName,
        basePrice: parseFloat(data.basePrice),
        pricePerKm: parseFloat(data.pricePerKm),
        pricePerCubicM: parseFloat(data.pricePerCubicM),
        pricePerHour: data.pricePerHour ? parseFloat(data.pricePerHour) : null,
        currency: data.currency || 'AED',
        packingIncluded: data.packingIncluded || false,
        unpackingIncluded: data.unpackingIncluded || false,
        assemblyIncluded: data.assemblyIncluded || false,
        storageAvailable: data.storageAvailable || false,
        vehicleTypes: data.vehicleTypes || [],
        coverageAreas: data.coverageAreas || [],
        availableDays: data.availableDays || [1, 2, 3, 4, 5, 6, 0],
        workingHours: data.workingHours || { start: '08:00', end: '20:00' },
        images: data.images || [],
        logo: data.logo,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        isActive: data.isActive !== undefined ? data.isActive : true,
        isFeatured: data.isFeatured || false,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error('Error creating moving service:', error);
    return NextResponse.json(
      { error: 'Failed to create moving service' },
      { status: 500 }
    );
  }
}
