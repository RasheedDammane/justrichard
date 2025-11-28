import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const features = await prisma.propertyFeature.findMany({
      where: { isActive: true },
      orderBy: [{ group: 'asc' }, { order: 'asc' }],
    });

    return NextResponse.json({ features });
  } catch (error) {
    console.error('Error fetching property features:', error);
    return NextResponse.json({ error: 'Failed to fetch features' }, { status: 500 });
  }
}
