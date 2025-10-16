import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * @swagger
 * /api/photographers:
 *   get:
 *     summary: Get all photographers
 *     tags: [Photography]
 *     parameters:
 *       - in: query
 *         name: specialty
 *         schema:
 *           type: string
 *         description: Filter by specialty
 *       - in: query
 *         name: cityId
 *         schema:
 *           type: string
 *         description: Filter by city
 *       - in: query
 *         name: hasDrone
 *         schema:
 *           type: boolean
 *         description: Filter by drone availability
 *       - in: query
 *         name: hasStudio
 *         schema:
 *           type: boolean
 *         description: Filter by studio availability
 *     responses:
 *       200:
 *         description: List of photographers
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const specialty = searchParams.get('specialty');
    const cityId = searchParams.get('cityId');
    const hasDrone = searchParams.get('hasDrone') === 'true';
    const hasStudio = searchParams.get('hasStudio') === 'true';

    const whereClause: any = {
      status: 'approved',
    };

    if (specialty) {
      whereClause.specialties = {
        has: specialty,
      };
    }

    if (cityId) {
      whereClause.cityId = cityId;
    }

    if (hasDrone) {
      whereClause.hasDrone = true;
    }

    if (hasStudio) {
      whereClause.hasStudio = true;
    }

    const photographers = await prisma.photographer.findMany({
      where: whereClause,
      include: {
        city: {
          select: {
            id: true,
            name: true,
            nameAr: true,
            nameFr: true,
          },
        },
        reviews: {
          take: 5,
          orderBy: {
            createdAt: 'desc',
          },
        },
        _count: {
          select: {
            reviews: true,
          },
        },
      },
      orderBy: [
        { verified: 'desc' },
        { rating: 'desc' },
        { totalBookings: 'desc' },
      ],
    });

    return NextResponse.json({ photographers, count: photographers.length });
  } catch (error) {
    console.error('Error fetching photographers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch photographers' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/photographers:
 *   post:
 *     summary: Create a new photographer profile
 *     tags: [Photography]
 *     responses:
 *       201:
 *         description: Photographer profile created
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const photographer = await prisma.photographer.create({
      data: {
        ...body,
        status: 'pending',
        verified: false,
      },
      include: {
        city: true,
      },
    });

    return NextResponse.json({ photographer }, { status: 201 });
  } catch (error) {
    console.error('Error creating photographer:', error);
    return NextResponse.json(
      { error: 'Failed to create photographer profile' },
      { status: 500 }
    );
  }
}
