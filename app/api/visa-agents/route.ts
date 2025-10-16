import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * @swagger
 * /api/visa-agents:
 *   get:
 *     summary: Get all visa agents
 *     tags: [Visa & Permits]
 *     parameters:
 *       - in: query
 *         name: service
 *         schema:
 *           type: string
 *         description: Filter by service type
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         description: Filter by country
 *       - in: query
 *         name: cityId
 *         schema:
 *           type: string
 *         description: Filter by city
 *     responses:
 *       200:
 *         description: List of visa agents
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const service = searchParams.get('service');
    const country = searchParams.get('country');
    const cityId = searchParams.get('cityId');

    const whereClause: any = {
      status: 'approved',
    };

    if (service) {
      whereClause.servicesOffered = {
        has: service,
      };
    }

    if (country) {
      whereClause.countries = {
        has: country,
      };
    }

    if (cityId) {
      whereClause.cityId = cityId;
    }

    const agents = await prisma.visaAgent.findMany({
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
        { successRate: 'desc' },
        { rating: 'desc' },
      ],
    });

    return NextResponse.json({ agents, count: agents.length });
  } catch (error) {
    console.error('Error fetching visa agents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch visa agents' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/visa-agents:
 *   post:
 *     summary: Create a new visa agent profile
 *     tags: [Visa & Permits]
 *     responses:
 *       201:
 *         description: Visa agent profile created
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const agent = await prisma.visaAgent.create({
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
    console.error('Error creating visa agent:', error);
    return NextResponse.json(
      { error: 'Failed to create visa agent profile' },
      { status: 500 }
    );
  }
}
