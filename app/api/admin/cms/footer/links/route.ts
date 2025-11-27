import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

// GET - Récupérer les liens d'une section
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sectionId = searchParams.get('sectionId');

    if (!sectionId) {
      return NextResponse.json(
        { error: 'sectionId is required' },
        { status: 400 }
      );
    }

    const links = await prisma.footerLink.findMany({
      where: { sectionId },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(links);
  } catch (error) {
    console.error('Error fetching footer links:', error);
    return NextResponse.json(
      { error: 'Failed to fetch footer links' },
      { status: 500 }
    );
  }
}

// POST - Créer un nouveau lien
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const link = await prisma.footerLink.create({
      data,
    });

    return NextResponse.json(link);
  } catch (error) {
    console.error('Error creating footer link:', error);
    return NextResponse.json(
      { error: 'Failed to create footer link' },
      { status: 500 }
    );
  }
}
