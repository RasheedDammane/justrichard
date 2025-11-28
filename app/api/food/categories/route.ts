import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const parentId = searchParams.get('parentId');
    const isFeatured = searchParams.get('isFeatured');

    const where: any = {
      isActive: true,
    };

    if (parentId === 'null') {
      where.parentId = null;
    } else if (parentId) {
      where.parentId = parentId;
    }

    if (isFeatured === 'true') {
      where.isFeatured = true;
    }

    const categories = await prisma.foodCategory.findMany({
      where,
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error('Error fetching food categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
