import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';
    const withServices = searchParams.get('withServices') === 'true';

    const categories = await prisma.category.findMany({
      where: {
        isActive: true,
      },
      include: {
        translations: { where: { locale } },
        ...(withServices && {
          services: {
            where: { isActive: true },
            include: {
              translations: { where: { locale } },
            },
            take: 10, // Limit to 10 services per category
          },
        }),
        _count: {
          select: {
            services: { where: { isActive: true } },
          },
        },
      },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
