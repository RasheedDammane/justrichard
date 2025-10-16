import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * @swagger
 * /api/real-estate-agents:
 *   get:
 *     summary: Get all real estate agents
 *     tags: [Real Estate]
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
 *         name: language
 *         schema:
 *           type: string
 *         description: Filter by language
 *       - in: query
 *         name: verifiedOnly
 *         schema:
 *           type: boolean
 *         description: Show only verified agents
 *       - in: query
 *         name: minRating
 *         schema:
 *           type: number
 *         description: Minimum rating
 *     responses:
 *       200:
 *         description: List of real estate agents
 *       500:
 *         description: Server error
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const specialty = searchParams.get('specialty');
    const cityId = searchParams.get('cityId');
    const language = searchParams.get('language');
    const verifiedOnly = searchParams.get('verifiedOnly') === 'true';
    const minRating = searchParams.get('minRating');

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

    if (language) {
      whereClause.languages = {
        has: language,
      };
    }

    if (verifiedOnly) {
      whereClause.verified = true;
    }

    if (minRating) {
      whereClause.rating = {
        gte: parseFloat(minRating),
      };
    }

    const agents = await prisma.realEstateAgent.findMany({
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
          select: {
            id: true,
            rating: true,
            comment: true,
            createdAt: true,
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
        { propertiesSold: 'desc' },
      ],
    });

    return NextResponse.json({ agents, count: agents.length });
  } catch (error) {
    console.error('Error fetching real estate agents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch real estate agents' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/real-estate-agents:
 *   post:
 *     summary: Create a new real estate agent profile
 *     tags: [Real Estate]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - firstName
 *               - lastName
 *               - licenseNumber
 *               - cityId
 *             properties:
 *               userId:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               licenseNumber:
 *                 type: string
 *               cityId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Agent profile created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const agent = await prisma.realEstateAgent.create({
      data: {
        ...body,
        status: 'pending',
        verified: false,
      },
      include: {
        city: true,
      },
    });

    return NextResponse.json({ agent }, { status: 201 });
  } catch (error) {
    console.error('Error creating real estate agent:', error);
    return NextResponse.json(
      { error: 'Failed to create real estate agent profile' },
      { status: 500 }
    );
  }
}
