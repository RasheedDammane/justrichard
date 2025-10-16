import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const interventionType = searchParams.get('interventionType');
    const countryId = searchParams.get('countryId');
    const cityId = searchParams.get('cityId');
    const urgencyLevel = searchParams.get('urgencyLevel');
    const availability24h = searchParams.get('availability24h') === 'true';
    const availableOnly = searchParams.get('availableOnly') === 'true';

    let whereClause: any = {};
    if (category) whereClause.category = category;
    if (interventionType) whereClause.interventionType = interventionType;
    if (countryId) whereClause.countryId = countryId;
    if (cityId) whereClause.cityId = cityId;
    if (availability24h) whereClause.availability24h = true;
    if (availableOnly) whereClause.isAvailable = true;

    const services = await prisma.handymanService.findMany({
      where: whereClause,
      include: {
        city: true,
        _count: {
          select: {
            requests: true,
          },
        },
      },
      orderBy: [
        { rating: 'desc' },
        { totalBookings: 'desc' },
      ],
    });

    // Calculate price with urgency if provided
    const servicesWithPrice = services.map(service => {
      let finalPrice = service.basePrice;
      let urgencyFee = 0;

      if (urgencyLevel) {
        if (urgencyLevel === 'CRITICAL') {
          urgencyFee = service.basePrice * (service.criticalMultiplier - 1);
          finalPrice = service.basePrice * service.criticalMultiplier;
        } else if (urgencyLevel === 'HIGH') {
          urgencyFee = service.basePrice * (service.highMultiplier - 1);
          finalPrice = service.basePrice * service.highMultiplier;
        }
      }

      return {
        ...service,
        finalPrice,
        urgencyFee,
      };
    });

    return NextResponse.json({ services: servicesWithPrice });
  } catch (error) {
    console.error('Error fetching handyman services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch handyman services' },
      { status: 500 }
    );
  }
}
