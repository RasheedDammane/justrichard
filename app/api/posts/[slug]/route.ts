import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/posts/{slug}?locale=fr&fallback=true
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const searchParams = request.nextUrl.searchParams;
  const locale = searchParams.get('locale') || 'en';
  const fallback = searchParams.get('fallback') === 'true';
  const slug = params.slug;
  
  try {
    // Find translation by slug
    const translation = await prisma.contentTranslation.findUnique({
      where: {
        locale_slug: {
          locale,
          slug
        }
      },
      include: {
        content: {
          include: {
            translations: {
              where: fallback ? {} : { locale },
              select: {
                locale: true,
                title: true,
                slug: true
              }
            },
            categories: {
              include: {
                category: {
                  include: {
                    translations: {
                      where: { locale }
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
                      where: { locale }
                    }
                  }
                }
              }
            },
            createdByUser: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
              }
            }
          }
        },
        ogImage: {
          select: {
            id: true,
            url: true,
            altText: true,
            width: true,
            height: true
          }
        }
      }
    });
    
    if (!translation) {
      // Try fallback to default locale if enabled
      if (fallback) {
        const fallbackTranslation = await prisma.contentTranslation.findFirst({
          where: {
            slug,
            locale: 'en', // or get from settings
            isPublished: true
          },
          include: {
            content: true
          }
        });
        
        if (!fallbackTranslation) {
          return NextResponse.json(
            { error: 'Post not found' },
            { status: 404 }
          );
        }
      } else {
        return NextResponse.json(
          { error: 'Post not found' },
          { status: 404 }
        );
      }
    }
    
    // Check if published
    const content = translation.content;
    const now = new Date();
    
    const isPublished = 
      content.status === 'PUBLISHED' &&
      translation.isPublished &&
      (!content.publishAt || content.publishAt <= now) &&
      (!content.unpublishAt || content.unpublishAt > now);
    
    if (!isPublished) {
      return NextResponse.json(
        { error: 'Post not published' },
        { status: 404 }
      );
    }
    
    // Format response
    const response = {
      uid: content.uid,
      type: content.type,
      status: content.status,
      publishAt: content.publishAt,
      unpublishAt: content.unpublishAt,
      translation: {
        id: translation.id,
        locale: translation.locale,
        title: translation.title,
        slug: translation.slug,
        excerpt: translation.excerpt,
        bodyJson: translation.bodyJson,
        metaTitle: translation.metaTitle,
        metaDescription: translation.metaDescription,
        ogTitle: translation.ogTitle,
        ogDescription: translation.ogDescription,
        ogImage: translation.ogImage,
        canonicalUrl: translation.canonicalUrl,
        publishedAt: translation.publishedAt
      },
      availableLocales: content.translations,
      categories: content.categories.map(c => ({
        id: c.category.id,
        ...c.category.translations[0]
      })),
      tags: content.tags.map(t => ({
        id: t.tag.id,
        ...t.tag.translations[0]
      })),
      author: content.createdByUser,
      createdAt: content.createdAt,
      updatedAt: content.updatedAt
    };
    
    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 's-maxage=600, stale-while-revalidate',
        'ETag': `W/"post-${content.uid}-${translation.locale}"`
      }
    });
    
  } catch (error: any) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post', message: error.message },
      { status: 500 }
    );
  }
}
