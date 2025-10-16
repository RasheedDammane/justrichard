import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/admin/coaching/coaches - Get all coaches (pending, approved, rejected)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status'); // pending, approved, rejected
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    let whereClause: any = {};
    if (status) {
      whereClause.status = status;
    }

    const [coaches, total] = await Promise.all([
      prisma.coach.findMany({
        where: whereClause,
        include: {
          city: {
            include: {
            },
          },
          _count: {
            select: {
              sessions: true,
              reviews: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.coach.count({ where: whereClause }),
    ]);

    return NextResponse.json({
      coaches,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching coaches:', error);
    return NextResponse.json(
      { error: 'Failed to fetch coaches' },
      { status: 500 }
    );
  }
}
