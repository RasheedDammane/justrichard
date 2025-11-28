import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const route = await prisma.routeConfig.findUnique({
      where: { id: params.id },
      include: { parent: true, children: true },
    });

    if (!route) {
      return NextResponse.json({ error: 'Route not found' }, { status: 404 });
    }

    return NextResponse.json({ route });
  } catch (error) {
    console.error('Error fetching route:', error);
    return NextResponse.json({ error: 'Failed to fetch route' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const route = await prisma.routeConfig.update({
      where: { id: params.id },
      data: body,
    });

    return NextResponse.json({ route });
  } catch (error) {
    console.error('Error updating route:', error);
    return NextResponse.json({ error: 'Failed to update route' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const route = await prisma.routeConfig.findUnique({
      where: { id: params.id },
    });

    if (route?.isSystem) {
      return NextResponse.json({ error: 'Cannot delete system route' }, { status: 400 });
    }

    await prisma.routeConfig.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Route deleted successfully' });
  } catch (error) {
    console.error('Error deleting route:', error);
    return NextResponse.json({ error: 'Failed to delete route' }, { status: 500 });
  }
}
