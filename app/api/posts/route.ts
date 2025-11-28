import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/posts?locale=fr&page=1&limit=12&category=slug-cat&tag=slug-tag&search=query
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const locale = searchParams.get('locale') || 'en';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');
  const categorySlug = searchParams.get('category');
  const tagSlug = searchParams.get('tag');
  const search = searchParams.get('search');
  const fallback = searchParams.get('fallback') === 'true';
  
  const skip = (page - 1) * limit;
  
  try {
    // Build where clause
    const where: any = {
      status: 'PUBLISHED',
      publishAt: { lte: new Date() },
      OR: [
        { unpublishAt: null },
        { unpublishAt: { gt: new Date() } }
      ],
      translations: {
        some: {
          locale,
          isPublished: true
        }
      }
    };
    
    // Category filter
    if (categorySlug) {
      where.categories = {
        some: {
          category: {
            translations: {
              some: {
                locale,
                slug: categorySlug
              }
            }
          }
        }
      };
    }
    
    // Tag filter
    if (tagSlug) {
      where.tags = {
        some: {
          tag: {
            translations: {
              some: {
                locale,
                slug: tagSlug
              }
            }
          }
        }
      };
    }
    
    // Search filter
    if (search) {
      where.translations = {
        some: {
          locale,
          isPublished: true,
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { excerpt: { contains: search, mode: 'insensitive' } }
          ]
        }
      };
    }
    
    // Fetch posts
    const [posts, total] = await Promise.all([
      prisma.content.findMany({
        where,
        skip,
        take: limit,
        orderBy: { publishAt: 'desc' },
        include: {
          translations: {
            where: { locale, isPublished: true },
            select: {
              id: true,
              locale: true,
              title: true,
              slug: true,
              excerpt: true,
              publishedAt: true,
              ogImage: {
                select: {
                  id: true,
                  url: true,
                  altText: true
                }
              }
            }
          },
          categories: {
            include: {
              category: {
                include: {
                  translations: {
                    where: { locale },
                    select: { name: true, slug: true }
                  }
                }
              }
            }
          },
          tags: {
            include: {
              tag: {
                include: {
                  translations: {
                    where: { locale },
                    select: { name: true, slug: true }
                  }
                }
              }
            }
          },
          createdByUser: {
            select: {
              id: true,
              firstName: true,
              lastName: true
            }
          }
        }
      }),
      prisma.content.count({ where })
    ]);
    
    // Format response
    const formattedPosts = posts.map(post => ({
      uid: post.uid,
      type: post.type,
      status: post.status,
      publishAt: post.publishAt,
      translation: post.translations[0] || null,
      categories: post.categories.map(c => ({
        id: c.category.id,
        ...c.category.translations[0]
      })),
      tags: post.tags.map(t => ({
        id: t.tag.id,
        ...t.tag.translations[0]
      })),
      author: post.createdByUser
    }));
    
    return NextResponse.json({
      data: formattedPosts,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }, {
      headers: {
        'Cache-Control': 's-maxage=300, stale-while-revalidate',
        'ETag': `W/"posts-${locale}-${page}"`
      }
    });
    
  } catch (error: any) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts', message: error.message },
      { status: 500 }
    );
  }
}
