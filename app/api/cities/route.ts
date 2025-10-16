import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const countryCode = searchParams.get('country');
    const limit = parseInt(searchParams.get('limit') || '200');

    let whereClause: any = {
      isActive: true,
    };

    if (countryCode) {
      whereClause.country = {
        code: countryCode,
      };
    }

    const cities = await prisma.city.findMany({
      where: whereClause,
      take: limit,
      orderBy: [
        { country: { name: 'asc' } },
        { name: 'asc' },
      ],
      include: {
        country: {
          select: {
            id: true,
            name: true,
            nameAr: true,
            nameFr: true,
            code: true,
          },
        },
      },
    });

    return NextResponse.json({
      cities,
      total: cities.length,
    });
  } catch (error: any) {
    console.error('Error fetching cities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cities', details: error.message },
      { status: 500 }
    );
  }
}
