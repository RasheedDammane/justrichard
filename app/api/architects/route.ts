import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * @swagger
 * /api/architects:
 *   get:
 *     summary: Get all architects
 *     tags: [Architecture]
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
 *         name: offers3D
 *         schema:
 *           type: boolean
 *         description: Filter by 3D rendering availability
 *     responses:
 *       200:
 *         description: List of architects
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const specialty = searchParams.get('specialty');
    const cityId = searchParams.get('cityId');
    const offers3D = searchParams.get('offers3D') === 'true';

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

    if (offers3D) {
      whereClause.offers3DRendering = true;
    }

    const architects = await prisma.architect.findMany({
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
        { totalProjects: 'desc' },
      ],
    });

    return NextResponse.json({ architects, count: architects.length });
  } catch (error) {
    console.error('Error fetching architects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch architects' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/architects:
 *   post:
 *     summary: Create a new architect profile
 *     tags: [Architecture]
 *     responses:
 *       201:
 *         description: Architect profile created
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const architect = await prisma.architect.create({
      data: {
        ...body,
        status: 'pending',
        verified: false,
      },
      include: {
        city: true,
      },
    });

    return NextResponse.json({ architect }, { status: 201 });
  } catch (error) {
    console.error('Error creating architect:', error);
    return NextResponse.json(
      { error: 'Failed to create architect profile' },
      { status: 500 }
    );
  }
}
