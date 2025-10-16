import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const countryId = searchParams.get('countryId');
    const activeOnly = searchParams.get('activeOnly') === 'true';

    let whereClause: any = {};
    if (countryId) {
      whereClause.countryId = countryId;
    }
    if (activeOnly) {
      whereClause.isActive = true;
    }

    const regions = await prisma.region.findMany({
      where: whereClause,
      include: {
        cities: {
          where: activeOnly ? { isActive: true } : undefined,
        },
      },
      orderBy: { name: 'asc' },
    });

    return NextResponse.json({ regions });
  } catch (error) {
    console.error('Error fetching regions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch regions' },
      { status: 500 }
    );
  }
}
