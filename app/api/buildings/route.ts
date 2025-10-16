import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const countryId = searchParams.get('countryId');
    const cityId = searchParams.get('cityId');
    const developer = searchParams.get('developer');
    const activeOnly = searchParams.get('activeOnly') === 'true';

    let whereClause: any = {};
    if (countryId) whereClause.countryId = countryId;
    if (cityId) whereClause.cityId = cityId;
    if (developer) whereClause.developer = developer;
    if (activeOnly) whereClause.isActive = true;

    const buildings = await prisma.building.findMany({
      where: whereClause,
      include: {
        city: true,
        _count: {
          select: {
            properties: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    });

    return NextResponse.json({ buildings });
  } catch (error) {
    console.error('Error fetching buildings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch buildings' },
      { status: 500 }
    );
  }
}
