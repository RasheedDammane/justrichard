import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { LogLevel } from '@/lib/logger';

/**
 * GET /api/admin/logs
 * List logs with filtering, pagination, and search
 * 
 * Query params:
 * - page: number (default 1)
 * - pageSize: number (default 50, max 200)
 * - level: string (comma-separated: INFO,WARN,ERROR,FATAL)
 * - category: string
 * - source: string
 * - search: string (searches in message)
 * - userId: string
 * - adminId: string
 * - from: ISO datetime
 * - to: ISO datetime
 * - sort: time_desc (default), time_asc, level, status
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication middleware
    // const session = await getServerSession();
    // if (!session || session.user.role !== 'ADMIN') {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    // }

    const searchParams = request.nextUrl.searchParams;

    // Pagination
    let page = parseInt(searchParams.get('page') || '1');
    let pageSize = parseInt(searchParams.get('pageSize') || '50');
    
    // Validate and correct pagination
    if (page <= 0) page = 1;
    if (pageSize <= 0) pageSize = 50;
    if (pageSize > 200) pageSize = 200;

    const skip = (page - 1) * pageSize;

    // Filters
    const levelParam = searchParams.get('level');
    const category = searchParams.get('category');
    const source = searchParams.get('source');
    const search = searchParams.get('search');
    const userId = searchParams.get('userId');
    const adminId = searchParams.get('adminId');
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const sort = searchParams.get('sort') || 'time_desc';

    // Build where clause
    const where: any = {};

    // Level filter
    if (levelParam) {
      const levels = levelParam.split(',').filter(l => 
        ['INFO', 'WARN', 'ERROR', 'FATAL'].includes(l.toUpperCase())
      );
      if (levels.length > 0) {
        where.level = { in: levels };
      }
    }

    // Category filter
    if (category) {
      where.category = category;
    }

    // Source filter
    if (source) {
      where.source = source;
    }

    // User filter
    if (userId) {
      where.userId = userId;
    }

    // Admin filter
    if (adminId) {
      where.adminId = adminId;
    }

    // Search filter (message)
    if (search) {
      where.message = {
        contains: search,
        mode: 'insensitive',
      };
    }

    // Date range filter
    if (from || to) {
      where.timestamp = {};
      if (from) {
        try {
          where.timestamp.gte = new Date(from);
        } catch (e) {
          console.warn('Invalid from date:', from);
        }
      }
      if (to) {
        try {
          where.timestamp.lte = new Date(to);
        } catch (e) {
          console.warn('Invalid to date:', to);
        }
      }
    }

    // Build orderBy
    let orderBy: any = { timestamp: 'desc' }; // default
    if (sort === 'time_asc') {
      orderBy = { timestamp: 'asc' };
    } else if (sort === 'level') {
      orderBy = { level: 'asc' };
    } else if (sort === 'status') {
      orderBy = { statusCode: 'asc' };
    }

    // Fetch logs
    const [logs, total] = await Promise.all([
      prisma.log.findMany({
        where,
        orderBy,
        skip,
        take: pageSize,
        select: {
          id: true,
          timestamp: true,
          level: true,
          category: true,
          message: true,
          source: true,
          environment: true,
          userId: true,
          adminId: true,
          requestId: true,
          path: true,
          method: true,
          statusCode: true,
          ip: true,
          userAgent: true,
          // Don't include full context in list view for performance
        },
      }),
      prisma.log.count({ where }),
    ]);

    return NextResponse.json({
      items: logs,
      page,
      pageSize,
      total,
    });
  } catch (error) {
    console.error('Error fetching logs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch logs' },
      { status: 500 }
    );
  }
}
