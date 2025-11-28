import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cityId = searchParams.get('cityId');

    const where: any = { isActive: true };
    if (cityId) where.cityId = cityId;

    const areas = await prisma.area.findMany({
      where,
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        slug: true,
        cityId: true,
      },
    });

    return NextResponse.json({ areas });
  } catch (error) {
    console.error('Error fetching areas:', error);
    return NextResponse.json({ error: 'Failed to fetch areas' }, { status: 500 });
  }
}
