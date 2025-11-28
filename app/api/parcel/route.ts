import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/parcel - Liste des services de livraison
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

    const services = await prisma.parcelService.findMany({
      where,
      orderBy: [
        { isFeatured: 'desc' },
        { rating: 'desc' },
        { totalDeliveries: 'desc' }
      ],
      take: limit ? parseInt(limit) : undefined,
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching parcel services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch parcel services' },
      { status: 500 }
    );
  }
}

// POST /api/parcel - Créer un service de livraison (Admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const service = await prisma.parcelService.create({
      data: {
        id: `parcel_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: data.name,
        slug: data.slug || data.name.toLowerCase().replace(/\s+/g, '-'),
        description: data.description,
        shortDescription: data.shortDescription,
        partnerId: data.partnerId,
        partnerName: data.partnerName,
        basePrice: parseFloat(data.basePrice),
        pricePerKg: parseFloat(data.pricePerKg),
        pricePerKm: data.pricePerKm ? parseFloat(data.pricePerKm) : null,
        currency: data.currency || 'AED',
        maxWeight: parseFloat(data.maxWeight),
        maxLength: parseFloat(data.maxLength),
        maxWidth: parseFloat(data.maxWidth),
        maxHeight: parseFloat(data.maxHeight),
        expressAvailable: data.expressAvailable || false,
        sameDay: data.sameDay || false,
        nextDay: data.nextDay || false,
        international: data.international || false,
        trackingAvailable: data.trackingAvailable !== undefined ? data.trackingAvailable : true,
        insuranceAvailable: data.insuranceAvailable !== undefined ? data.insuranceAvailable : true,
        coverageAreas: data.coverageAreas || [],
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
    console.error('Error creating parcel service:', error);
    return NextResponse.json(
      { error: 'Failed to create parcel service' },
      { status: 500 }
    );
  }
}
