import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * @swagger
 * /api/business-consultants:
 *   get:
 *     summary: Get all business consultants
 *     tags: [Business Setup]
 *     parameters:
 *       - in: query
 *         name: companyType
 *         schema:
 *           type: string
 *         description: Filter by company type
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
 *         description: List of business consultants
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const companyType = searchParams.get('companyType');
    const country = searchParams.get('country');
    const cityId = searchParams.get('cityId');

    const whereClause: any = {
      status: 'approved',
    };

    if (companyType) {
      whereClause.servicesOffered = {
        has: companyType,
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

    const consultants = await prisma.businessConsultant.findMany({
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
        { companiesFormed: 'desc' },
      ],
    });

    return NextResponse.json({ consultants, count: consultants.length });
  } catch (error) {
    console.error('Error fetching business consultants:', error);
    return NextResponse.json(
      { error: 'Failed to fetch business consultants' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/business-consultants:
 *   post:
 *     summary: Create a new business consultant profile
 *     tags: [Business Setup]
 *     responses:
 *       201:
 *         description: Business consultant profile created
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const consultant = await prisma.businessConsultant.create({
      data: {
        ...body,
        status: 'pending',
        verified: false,
      },
      include: {
        city: true,
      },
    });

    return NextResponse.json({ consultant }, { status: 201 });
  } catch (error) {
    console.error('Error creating business consultant:', error);
    return NextResponse.json(
      { error: 'Failed to create business consultant profile' },
      { status: 500 }
    );
  }
}
