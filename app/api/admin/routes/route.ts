import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const menu = searchParams.get('menu');
    const visibleOnly = searchParams.get('visibleOnly') === 'true';

    const where: any = {};
    if (menu) where.menu = menu;
    if (visibleOnly) where.isVisible = true;

    const routes = await prisma.routeConfig.findMany({
      where,
      include: {
        parent: true,
        children: true,
      },
      orderBy: [{ order: 'asc' }, { key: 'asc' }],
    });

    return NextResponse.json({ routes });
  } catch (error) {
    console.error('Error fetching routes:', error);
    return NextResponse.json({ error: 'Failed to fetch routes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const route = await prisma.routeConfig.create({
      data: body,
    });

    return NextResponse.json({ route }, { status: 201 });
  } catch (error) {
    console.error('Error creating route:', error);
    return NextResponse.json({ error: 'Failed to create route' }, { status: 500 });
  }
}
