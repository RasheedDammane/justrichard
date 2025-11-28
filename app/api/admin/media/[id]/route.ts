import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';
import { unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// GET /api/admin/media/[id] - Get media details
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const mediaFile = await prisma.mediaFile.findUnique({
      where: { id: params.id },
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
    });

    if (!mediaFile) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 });
    }

    // Convert BigInt to Number
    const mediaWithNumber = {
      ...mediaFile,
      size: Number(mediaFile.size),
    };

    return NextResponse.json(mediaWithNumber);
  } catch (error) {
    console.error('Error fetching media:', error);
    return NextResponse.json(
      { error: 'Failed to fetch media' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/media/[id] - Update media metadata
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== Role.ADMIN && session.user.role !== Role.MANAGER)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { altText, caption, description, tags, categoryId, visibility, usedIn } = body;

    const mediaFile = await prisma.mediaFile.update({
      where: { id: params.id },
      data: {
        altText: altText || null,
        caption: caption || null,
        description: description || null,
        tags: tags || null,
        categoryId: categoryId || null,
        visibility: visibility || 'public',
        usedIn: usedIn || null,
      },
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
    });

    // Convert BigInt to Number
    const mediaWithNumber = {
      ...mediaFile,
      size: Number(mediaFile.size),
    };

    return NextResponse.json(mediaWithNumber);
  } catch (error) {
    console.error('Error updating media:', error);
    return NextResponse.json(
      { error: 'Failed to update media' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/media/[id] - Delete media
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get media file info
    const mediaFile = await prisma.mediaFile.findUnique({
      where: { id: params.id },
    });

    if (!mediaFile) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 });
    }

    // Delete from database
    await prisma.mediaFile.delete({
      where: { id: params.id },
    });

    // Delete physical file
    if (mediaFile.storageProvider === 'local') {
      const filepath = join(process.cwd(), 'public', mediaFile.storagePath);
      if (existsSync(filepath)) {
        try {
          await unlink(filepath);
        } catch (err) {
          console.error('Error deleting file:', err);
        }
      }
    }

    return NextResponse.json({ 
      message: 'Media deleted successfully',
      id: params.id,
    });
  } catch (error) {
    console.error('Error deleting media:', error);
    return NextResponse.json(
      { error: 'Failed to delete media' },
      { status: 500 }
    );
  }
}
