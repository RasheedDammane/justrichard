import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('activeOnly') === 'true';

    const where = activeOnly ? { isActive: true } : {};

    const [themes, total, defaultTheme] = await Promise.all([
      prisma.theme.findMany({
        where,
        orderBy: [{ isDefault: 'desc' }, { name: 'asc' }],
      }),
      prisma.theme.count(),
      prisma.theme.findFirst({ where: { isDefault: true } }),
    ]);

    return NextResponse.json({ themes, total, defaultTheme });
  } catch (error) {
    console.error('Error fetching themes:', error);
    return NextResponse.json({ error: 'Failed to fetch themes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, slug, description, isDefault, isActive, config, preview } = body;

    // If setting as default, unset other defaults
    if (isDefault) {
      await prisma.theme.updateMany({
        where: { isDefault: true },
        data: { isDefault: false },
      });
    }

    const theme = await prisma.theme.create({
      data: { name, slug, description, isDefault, isActive, config, preview },
    });

    return NextResponse.json({ theme }, { status: 201 });
  } catch (error) {
    console.error('Error creating theme:', error);
    return NextResponse.json({ error: 'Failed to create theme' }, { status: 500 });
  }
}
