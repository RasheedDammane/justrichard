import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';

const prisma = new PrismaClient();

// Middleware pour vérifier les permissions
async function requireRole(req: NextRequest, allowedRoles: string[]) {
  const session = await getServerSession();
  
  if (!session?.user) {
    throw new Error('Unauthorized');
  }
  
  const user = await prisma.user.findUnique({
    where: { email: session.user.email! }
  });
  
  if (!user || !allowedRoles.includes(user.role || '')) {
    throw new Error('Forbidden');
  }
  
  return user;
}

// GET /api/admin/posts - Liste tous les posts (admin)
export async function GET(request: NextRequest) {
  try {
    const user = await requireRole(request, ['admin', 'editor', 'author']);
    
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');
    const locale = searchParams.get('locale');
    
    const skip = (page - 1) * limit;
    
    const where: any = {};
    
    // Filter by status
    if (status) {
      where.status = status;
    }
    
    // Authors can only see their own posts
    if (user.role === 'author') {
      where.createdBy = user.id;
    }
    
    const [posts, total] = await Promise.all([
      prisma.content.findMany({
        where,
        skip,
        take: limit,
        orderBy: { updatedAt: 'desc' },
        include: {
          translations: {
            where: locale ? { locale } : undefined,
            select: {
              id: true,
              locale: true,
              title: true,
              slug: true,
              isPublished: true,
              publishedAt: true
            }
          },
          categories: {
            include: {
              category: {
                include: {
                  translations: true
                }
              }
            }
          },
          tags: {
            include: {
              tag: {
                include: {
                  translations: true
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
      }),
      prisma.content.count({ where })
    ]);
    
    return NextResponse.json({
      data: posts,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
    
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (error.message === 'Forbidden') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts', message: error.message },
      { status: 500 }
    );
  }
}

// POST /api/admin/posts - Créer un nouveau post
export async function POST(request: NextRequest) {
  try {
    const user = await requireRole(request, ['admin', 'editor', 'author']);
    const body = await request.json();
    
    // Validate body
    if (!body.content || !body.translations || body.translations.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }
    
    // Create content
    const content = await prisma.content.create({
      data: {
        type: body.content.type || 'post',
        status: body.content.status || 'DRAFT',
        publishAt: body.content.publishAt ? new Date(body.content.publishAt) : null,
        unpublishAt: body.content.unpublishAt ? new Date(body.content.unpublishAt) : null,
        createdBy: user.id,
        updatedBy: user.id,
        
        // Create translations
        translations: {
          create: body.translations.map((t: any) => ({
            locale: t.locale,
            title: t.title,
            slug: t.slug,
            excerpt: t.excerpt || null,
            bodyJson: t.bodyJson || [],
            metaTitle: t.metaTitle || null,
            metaDescription: t.metaDescription || null,
            ogTitle: t.ogTitle || null,
            ogDescription: t.ogDescription || null,
            ogImageId: t.ogImageId || null,
            canonicalUrl: t.canonicalUrl || null,
            isPublished: !!t.isPublished,
            publishedAt: t.isPublished ? new Date() : null
          }))
        },
        
        // Create category relations
        ...(body.content.categories?.length > 0 && {
          categories: {
            create: body.content.categories.map((catId: string) => ({
              categoryId: catId
            }))
          }
        }),
        
        // Create tag relations
        ...(body.content.tags?.length > 0 && {
          tags: {
            create: body.content.tags.map((tagId: string) => ({
              tagId: tagId
            }))
          }
        })
      },
      include: {
        translations: true,
        categories: {
          include: {
            category: {
              include: {
                translations: true
              }
            }
          }
        },
        tags: {
          include: {
            tag: {
              include: {
                translations: true
              }
            }
          }
        }
      }
    });
    
    // Revalidate cache
    // revalidateTag?.(`post:${content.uid}`);
    
    return NextResponse.json(content, { status: 201 });
    
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (error.message === 'Forbidden') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post', message: error.message },
      { status: 500 }
    );
  }
}
