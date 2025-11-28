import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const theme = await prisma.theme.findFirst({
      where: { isDefault: true, isActive: true },
    });

    if (!theme) {
      return NextResponse.json({ error: 'No active theme found' }, { status: 404 });
    }

    return NextResponse.json({ theme });
  } catch (error) {
    console.error('Error fetching current theme:', error);
    return NextResponse.json({ error: 'Failed to fetch theme' }, { status: 500 });
  }
}
