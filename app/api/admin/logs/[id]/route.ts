import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/admin/logs/[id]
 * Get detailed information about a specific log entry
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Add authentication middleware
    // const session = await getServerSession();
    // if (!session || session.user.role !== 'ADMIN') {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    // }

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'Log ID is required' },
        { status: 400 }
      );
    }

    const log = await prisma.log.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        admin: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!log) {
      return NextResponse.json(
        { error: 'Log not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(log);
  } catch (error) {
    console.error('Error fetching log details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch log details' },
      { status: 500 }
    );
  }
}
