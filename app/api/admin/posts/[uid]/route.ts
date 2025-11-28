import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';

const prisma = new PrismaClient();

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

// GET /api/admin/posts/[uid]
export async function GET(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  try {
    await requireRole(request, ['admin', 'editor', 'author']);
    
    const content = await prisma.content.findUnique({
      where: { uid: params.uid },
      include: {
        translations: {
          include: {
            ogImage: true
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
        },
        updatedByUser: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });
    
    if (!content) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    return NextResponse.json(content);
    
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (error.message === 'Forbidden') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post', message: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/admin/posts/[uid] - Update post
export async function PUT(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  try {
    const user = await requireRole(request, ['admin', 'editor', 'author']);
    const body = await request.json();
    
    // Check if user owns the post (for authors)
    if (user.role === 'author') {
      const existingContent = await prisma.content.findUnique({
        where: { uid: params.uid },
        select: { createdBy: true }
      });
      
      if (existingContent?.createdBy !== user.id) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    }
    
    // Update content
    const content = await prisma.content.update({
      where: { uid: params.uid },
      data: {
        type: body.content?.type,
        status: body.content?.status,
        publishAt: body.content?.publishAt ? new Date(body.content.publishAt) : undefined,
        unpublishAt: body.content?.unpublishAt ? new Date(body.content.unpublishAt) : undefined,
        updatedBy: user.id,
        
        // Update categories
        ...(body.content?.categories && {
          categories: {
            deleteMany: {},
            create: body.content.categories.map((catId: string) => ({
              categoryId: catId
            }))
          }
        }),
        
        // Update tags
        ...(body.content?.tags && {
          tags: {
            deleteMany: {},
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
    
    return NextResponse.json(content);
    
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (error.message === 'Forbidden') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    console.error('Error updating post:', error);
    return NextResponse.json(
      { error: 'Failed to update post', message: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/posts/[uid]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  try {
    const user = await requireRole(request, ['admin', 'editor']);
    
    await prisma.content.delete({
      where: { uid: params.uid }
    });
    
    return NextResponse.json({ success: true });
    
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (error.message === 'Forbidden') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post', message: error.message },
      { status: 500 }
    );
  }
}
