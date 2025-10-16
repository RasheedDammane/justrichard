import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * @swagger
 * /api/translators:
 *   get:
 *     summary: Get all translators
 *     tags: [Translation]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by translation type
 *       - in: query
 *         name: cityId
 *         schema:
 *           type: string
 *         description: Filter by city
 *       - in: query
 *         name: certified
 *         schema:
 *           type: boolean
 *         description: Filter by certified translators
 *       - in: query
 *         name: urgent
 *         schema:
 *           type: boolean
 *         description: Filter by urgent availability
 *     responses:
 *       200:
 *         description: List of translators
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const cityId = searchParams.get('cityId');
    const certified = searchParams.get('certified') === 'true';
    const urgent = searchParams.get('urgent') === 'true';

    const whereClause: any = {
      status: 'approved',
    };

    if (type) {
      whereClause.specializations = {
        has: type,
      };
    }

    if (cityId) {
      whereClause.cityId = cityId;
    }

    if (certified) {
      whereClause.offersCertified = true;
    }

    if (urgent) {
      whereClause.offersUrgent = true;
    }

    const translators = await prisma.translator.findMany({
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
        { onTimeDelivery: 'desc' },
      ],
    });

    return NextResponse.json({ translators, count: translators.length });
  } catch (error) {
    console.error('Error fetching translators:', error);
    return NextResponse.json(
      { error: 'Failed to fetch translators' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/translators:
 *   post:
 *     summary: Create a new translator profile
 *     tags: [Translation]
 *     responses:
 *       201:
 *         description: Translator profile created
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const translator = await prisma.translator.create({
      data: {
        ...body,
        status: 'pending',
        verified: false,
      },
      include: {
        city: true,
      },
    });

    return NextResponse.json({ translator }, { status: 201 });
  } catch (error) {
    console.error('Error creating translator:', error);
    return NextResponse.json(
      { error: 'Failed to create translator profile' },
      { status: 500 }
    );
  }
}
