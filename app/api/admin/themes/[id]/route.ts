import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const theme = await prisma.theme.findUnique({
      where: { id: params.id },
    });

    if (!theme) {
      return NextResponse.json({ error: 'Theme not found' }, { status: 404 });
    }

    return NextResponse.json({ theme });
  } catch (error) {
    console.error('Error fetching theme:', error);
    return NextResponse.json({ error: 'Failed to fetch theme' }, { status: 500 });
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
    const { name, description, isDefault, isActive, config, preview } = body;

    // If setting as default, unset other defaults
    if (isDefault) {
      await prisma.theme.updateMany({
        where: { isDefault: true, NOT: { id: params.id } },
        data: { isDefault: false },
      });
    }

    const theme = await prisma.theme.update({
      where: { id: params.id },
      data: { name, description, isDefault, isActive, config, preview },
    });

    return NextResponse.json({ theme });
  } catch (error) {
    console.error('Error updating theme:', error);
    return NextResponse.json({ error: 'Failed to update theme' }, { status: 500 });
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

    const theme = await prisma.theme.findUnique({
      where: { id: params.id },
    });

    if (theme?.isDefault) {
      return NextResponse.json({ error: 'Cannot delete the default theme' }, { status: 400 });
    }

    await prisma.theme.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Theme deleted successfully' });
  } catch (error) {
    console.error('Error deleting theme:', error);
    return NextResponse.json({ error: 'Failed to delete theme' }, { status: 500 });
  }
}
