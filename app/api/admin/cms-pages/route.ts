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
    const status = searchParams.get('status');

    let whereClause: any = {};
    
    if (status === 'active') {
      whereClause.isActive = true;
    } else if (status === 'inactive') {
      whereClause.isActive = false;
    }

    const pages = await prisma.cMSPage.findMany({
      where: whereClause,
      include: {
        translations: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ pages });
  } catch (error) {
    console.error('Error fetching CMS pages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch CMS pages' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { slug, isActive, translations } = body;

    if (!slug || !translations || translations.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existing = await prisma.cMSPage.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Une page avec ce slug existe déjà' },
        { status: 400 }
      );
    }

    // Create page with translations
    const page = await prisma.cMSPage.create({
      data: {
        slug,
        isActive: isActive ?? true,
        translations: {
          create: translations.map((t: any) => ({
            locale: t.locale,
            title: t.title,
            content: t.content,
            seoTitle: t.seoTitle || null,
            seoDescription: t.seoDescription || null,
          })),
        },
      },
      include: {
        translations: true,
      },
    });

    return NextResponse.json({ page }, { status: 201 });
  } catch (error) {
    console.error('Error creating CMS page:', error);
    return NextResponse.json(
      { error: 'Failed to create CMS page' },
      { status: 500 }
    );
  }
}
