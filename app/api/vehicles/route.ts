import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const vehicleType = searchParams.get('vehicleType');
    const countryId = searchParams.get('countryId');
    const cityId = searchParams.get('cityId');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const availableOnly = searchParams.get('availableOnly') === 'true';

    let whereClause: any = {};
    if (vehicleType) whereClause.vehicleType = vehicleType;
    if (countryId) whereClause.countryId = countryId;
    if (cityId) whereClause.cityId = cityId;
    if (availableOnly) whereClause.isAvailable = true;

    if (minPrice || maxPrice) {
      whereClause.pricePerDay = {};
      if (minPrice) whereClause.pricePerDay.gte = parseFloat(minPrice);
      if (maxPrice) whereClause.pricePerDay.lte = parseFloat(maxPrice);
    }

    const vehicles = await prisma.vehicle.findMany({
      where: whereClause,
      include: {
        city: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ vehicles });
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vehicles' },
      { status: 500 }
    );
  }
}
