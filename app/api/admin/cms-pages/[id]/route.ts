import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== Role.ADMIN && session.user.role !== Role.MANAGER)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const page = await prisma.cMSPage.findUnique({
      where: { id: params.id },
      include: {
        translations: true,
      },
    });

    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json({ page });
  } catch (error) {
    console.error('Error fetching CMS page:', error);
    return NextResponse.json(
      { error: 'Failed to fetch CMS page' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { slug, isActive, translations } = body;

    // Check if page exists
    const existing = await prisma.cMSPage.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    // Check if slug is being changed and if new slug already exists
    if (slug && slug !== existing.slug) {
      const slugExists = await prisma.cMSPage.findUnique({
        where: { slug },
      });

      if (slugExists) {
        return NextResponse.json(
          { error: 'Une page avec ce slug existe déjà' },
          { status: 400 }
        );
      }
    }

    // Update page
    const page = await prisma.cMSPage.update({
      where: { id: params.id },
      data: {
        slug: slug || undefined,
        isActive: isActive !== undefined ? isActive : undefined,
      },
    });

    // Update translations if provided
    if (translations && Array.isArray(translations)) {
      // Delete existing translations
      await prisma.cMSPageTranslation.deleteMany({
        where: { pageId: params.id },
      });

      // Create new translations
      await prisma.cMSPageTranslation.createMany({
        data: translations.map((t: any) => ({
          pageId: params.id,
          locale: t.locale,
          title: t.title,
          content: t.content,
          seoTitle: t.seoTitle || null,
          seoDescription: t.seoDescription || null,
        })),
      });
    }

    // Fetch updated page with translations
    const updatedPage = await prisma.cMSPage.findUnique({
      where: { id: params.id },
      include: {
        translations: true,
      },
    });

    return NextResponse.json({ page: updatedPage });
  } catch (error) {
    console.error('Error updating CMS page:', error);
    return NextResponse.json(
      { error: 'Failed to update CMS page' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if page exists
    const existing = await prisma.cMSPage.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    // Delete page (cascade will handle translations)
    await prisma.cMSPage.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Page deleted successfully' });
  } catch (error) {
    console.error('Error deleting CMS page:', error);
    return NextResponse.json(
      { error: 'Failed to delete CMS page' },
      { status: 500 }
    );
  }
}
