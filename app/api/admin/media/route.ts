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
    const search = searchParams.get('search') || '';
    const categoryId = searchParams.get('category');
    const type = searchParams.get('type'); // image, video, document
    const tag = searchParams.get('tag');
    const visibility = searchParams.get('visibility');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    // Build where clause
    let whereClause: any = {};
    
    if (search) {
      whereClause.OR = [
        { fileName: { contains: search, mode: 'insensitive' } },
        { altText: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (categoryId) {
      whereClause.categoryId = categoryId;
    }

    if (visibility) {
      whereClause.visibility = visibility;
    }

    if (type) {
      if (type === 'image') {
        whereClause.mimeType = { startsWith: 'image/' };
      } else if (type === 'video') {
        whereClause.mimeType = { startsWith: 'video/' };
      } else if (type === 'document') {
        whereClause.mimeType = { startsWith: 'application/' };
      }
    }

    // Get media files with relations
    const [items, total] = await Promise.all([
      prisma.mediaFile.findMany({
        where: whereClause,
        include: {
          category: true,
          uploadedBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.mediaFile.count({ where: whereClause }),
    ]);

    // Convert BigInt to Number for JSON
    const itemsWithNumbers = items.map(item => ({
      ...item,
      size: Number(item.size),
    }));

    return NextResponse.json({ 
      items: itemsWithNumbers,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching media:', error);
    return NextResponse.json(
      { error: 'Failed to fetch media' },
      { status: 500 }
    );
  }
}
