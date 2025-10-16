import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';

    const category = await prisma.category.findUnique({
      where: {
        slug: params.slug,
        isActive: true,
      },
      include: {
        translations: { where: { locale } },
        services: {
          where: { isActive: true },
          include: {
            translations: { where: { locale } },
            prices: true,
          },
          orderBy: [
            { isFeatured: 'desc' },
            { totalBookings: 'desc' },
          ],
        },
        _count: {
          select: {
            services: { where: { isActive: true } },
          },
        },
      },
    });

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ category });
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    );
  }
}
