import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { position: string } }
) {
  try {
    const routes = await prisma.routeConfig.findMany({
      where: {
        menu: params.position,
        isVisible: true,
      },
      include: {
        children: {
          where: { isVisible: true },
          orderBy: { order: 'asc' },
        },
      },
      orderBy: [{ order: 'asc' }, { key: 'asc' }],
    });

    return NextResponse.json({ routes });
  } catch (error) {
    console.error('Error fetching menu routes:', error);
    return NextResponse.json({ error: 'Failed to fetch routes' }, { status: 500 });
  }
}
