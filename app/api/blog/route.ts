import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Filters
    const language = searchParams.get('language') || 'en';
    const countryCode = searchParams.get('country');
    const cityId = searchParams.get('cityId');
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const authorId = searchParams.get('authorId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const sortBy = searchParams.get('sortBy') || 'recent'; // recent, popular, trending

    let whereClause: any = {
      status: 'published',
      language,
    };

    if (countryCode) {
      whereClause.countryCode = countryCode;
    }

    if (cityId) {
      whereClause.cityId = cityId;
    }

    if (category) {
      whereClause.categories = {
        has: category,
      };
    }

    if (tag) {
      whereClause.tags = {
        has: tag,
      };
    }

    if (authorId) {
      whereClause.authorId = authorId;
    }

    // Sorting
    let orderBy: any = {};
    switch (sortBy) {
      case 'popular':
        orderBy = { viewCount: 'desc' };
        break;
      case 'trending':
        orderBy = { likeCount: 'desc' };
        break;
      case 'recent':
      default:
        orderBy = { publishedAt: 'desc' };
        break;
    }

    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where: whereClause,
        orderBy,
        skip,
        take: limit,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          city: {
            select: {
              id: true,
              name: true,
              nameAr: true,
              nameFr: true,
              country: {
                select: {
                  name: true,
                  code: true,
                },
              },
            },
          },
          _count: {
            select: {
              comments: true,
              likes: true,
            },
          },
        },
      }),
      prisma.blogPost.count({ where: whereClause }),
    ]);

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const post = await prisma.blogPost.create({
      data: {
        ...body,
        status: 'draft',
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post', details: error.message },
      { status: 500 }
    );
  }
}
