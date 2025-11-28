import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import sharp from 'sharp';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== Role.ADMIN && session.user.role !== Role.MANAGER)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const categoryId = formData.get('categoryId') as string;
    const visibility = (formData.get('visibility') as string) || 'public';
    const altText = formData.get('altText') as string;
    const caption = formData.get('caption') as string;
    const description = formData.get('description') as string;
    const tagsStr = formData.get('tags') as string;
    const tags = tagsStr ? JSON.parse(tagsStr) : [];

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
      'video/mp4', 'video/webm', 'video/quicktime',
      'application/pdf',
      'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    // Validate file size (max 50MB)
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large (max 50MB)' }, { status: 400 });
    }

    // Create uploads directory
    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'media');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const extension = file.name.split('.').pop() || '';
    const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9-]/g, '_');
    const filename = `${timestamp}_${nameWithoutExt}.${extension}`;
    const filepath = join(uploadsDir, filename);

    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // Get image dimensions if it's an image
    let width: number | undefined;
    let height: number | undefined;
    
    if (file.type.startsWith('image/')) {
      try {
        const metadata = await sharp(buffer).metadata();
        width = metadata.width;
        height = metadata.height;
      } catch (err) {
        console.error('Error getting image dimensions:', err);
      }
    }

    // Create media record
    const storagePath = `/uploads/media/${filename}`;
    const mediaFile = await prisma.mediaFile.create({
      data: {
        fileName: file.name,
        slug: nameWithoutExt.toLowerCase(),
        extension: extension,
        mimeType: file.type,
        size: BigInt(file.size),
        width,
        height,
        altText: altText || null,
        caption: caption || null,
        description: description || null,
        tags: tags.length > 0 ? tags : null,
        storagePath,
        storageProvider: 'local',
        visibility,
        categoryId: categoryId || null,
        uploadedById: session.user.id,
      },
    });

    return NextResponse.json({ 
      id: mediaFile.id,
      url: storagePath,
      fileName: mediaFile.fileName,
      mimeType: mediaFile.mimeType,
      size: Number(mediaFile.size),
      width: mediaFile.width,
      height: mediaFile.height,
      altText: mediaFile.altText,
      message: 'File uploaded successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
