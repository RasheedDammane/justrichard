import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('activeOnly') === 'true';
    const includeRegions = searchParams.get('includeRegions') === 'true';

    let whereClause: any = {};
    if (activeOnly) {
      whereClause.isActive = true;
    }

    const countries = await prisma.country.findMany({
      where: whereClause,
      include: includeRegions ? {
        regions: {
          where: { isActive: true },
          include: {
            cities: {
              where: { isActive: true },
            },
          },
        },
      } : undefined,
      orderBy: { name: 'asc' },
    });

    return NextResponse.json({ countries });
  } catch (error) {
    console.error('Error fetching countries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch countries' },
      { status: 500 }
    );
  }
}
