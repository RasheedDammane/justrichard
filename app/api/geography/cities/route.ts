import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const countryId = searchParams.get('countryId');
    const regionId = searchParams.get('regionId');
    const districtId = searchParams.get('districtId');
    const activeOnly = searchParams.get('activeOnly') === 'true';

    let whereClause: any = {};
    if (countryId) whereClause.countryId = countryId;
    if (regionId) whereClause.regionId = regionId;
    if (districtId) whereClause.districtId = districtId;
    if (activeOnly) whereClause.isActive = true;

    const cities = await prisma.city.findMany({
      where: whereClause,
      include: {
        region: true,
        district: true,
      },
      orderBy: { name: 'asc' },
    });

    return NextResponse.json({ cities });
  } catch (error) {
    console.error('Error fetching cities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cities' },
      { status: 500 }
    );
  }
}
