import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * @swagger
 * /api/accountants:
 *   get:
 *     summary: Get all accountants
 *     tags: [Accounting]
 *     parameters:
 *       - in: query
 *         name: service
 *         schema:
 *           type: string
 *         description: Filter by service type
 *       - in: query
 *         name: cityId
 *         schema:
 *           type: string
 *         description: Filter by city
 *       - in: query
 *         name: certification
 *         schema:
 *           type: string
 *         description: Filter by certification
 *       - in: query
 *         name: acceptingClients
 *         schema:
 *           type: boolean
 *         description: Filter by accepting new clients
 *     responses:
 *       200:
 *         description: List of accountants
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const service = searchParams.get('service');
    const cityId = searchParams.get('cityId');
    const certification = searchParams.get('certification');
    const acceptingClients = searchParams.get('acceptingClients') === 'true';

    const whereClause: any = {
      status: 'approved',
    };

    if (service) {
      whereClause.specializations = {
        has: service,
      };
    }

    if (cityId) {
      whereClause.cityId = cityId;
    }

    if (certification) {
      whereClause.certifications = {
        has: certification,
      };
    }

    if (acceptingClients) {
      whereClause.acceptsNewClients = true;
    }

    const accountants = await prisma.accountant.findMany({
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
        { totalClients: 'desc' },
      ],
    });

    return NextResponse.json({ accountants, count: accountants.length });
  } catch (error) {
    console.error('Error fetching accountants:', error);
    return NextResponse.json(
      { error: 'Failed to fetch accountants' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/accountants:
 *   post:
 *     summary: Create a new accountant profile
 *     tags: [Accounting]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Accountant profile created
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const accountant = await prisma.accountant.create({
      data: {
        ...body,
        status: 'pending',
        verified: false,
      },
      include: {
        city: true,
      },
    });

    return NextResponse.json({ accountant }, { status: 201 });
  } catch (error) {
    console.error('Error creating accountant:', error);
    return NextResponse.json(
      { error: 'Failed to create accountant profile' },
      { status: 500 }
    );
  }
}
