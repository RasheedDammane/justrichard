import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const countryId = searchParams.get('countryId');

    const where: any = { isActive: true };
    if (countryId) where.countryId = countryId;

    const states = await prisma.state.findMany({
      where,
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        code: true,
        slug: true,
        countryId: true,
      },
    });

    return NextResponse.json({ states });
  } catch (error) {
    console.error('Error fetching states:', error);
    return NextResponse.json({ error: 'Failed to fetch states' }, { status: 500 });
  }
}
