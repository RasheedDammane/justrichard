import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    const services = await prisma.service.findMany({
      where: {
        isActive: true,
        ...(category && { category: { slug: category } }),
        ...(featured === 'true' && { isFeatured: true }),
      },
      include: {
        translations: { where: { locale } },
        category: {
          include: { translations: { where: { locale } } },
        },
        prices: true,
      },
      orderBy: [{ isFeatured: 'desc' }, { totalBookings: 'desc' }],
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}
