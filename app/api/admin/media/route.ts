import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== Role.ADMIN && session.user.role !== Role.MANAGER)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const mimeType = searchParams.get('mimeType');
    const limit = parseInt(searchParams.get('limit') || '50');

    let whereClause: any = {};
    if (mimeType) {
      whereClause.mimeType = { startsWith: mimeType };
    }

    const media = await prisma.media.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    const stats = {
      total: await prisma.media.count(),
      totalSize: await prisma.media.aggregate({
        _sum: { size: true },
      }),
    };

    return NextResponse.json({ media, stats });
  } catch (error) {
    console.error('Error fetching media:', error);
    return NextResponse.json(
      { error: 'Failed to fetch media' },
      { status: 500 }
    );
  }
}
