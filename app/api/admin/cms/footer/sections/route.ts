import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

// GET - Récupérer toutes les sections du footer
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';

    const sections = await prisma.footerSection.findMany({
      where: { locale },
      include: {
        links: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(sections);
  } catch (error) {
    console.error('Error fetching footer sections:', error);
    return NextResponse.json(
      { error: 'Failed to fetch footer sections' },
      { status: 500 }
    );
  }
}

// POST - Créer une nouvelle section
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const section = await prisma.footerSection.create({
      data,
      include: {
        links: true,
      },
    });

    return NextResponse.json(section);
  } catch (error) {
    console.error('Error creating footer section:', error);
    return NextResponse.json(
      { error: 'Failed to create footer section' },
      { status: 500 }
    );
  }
}
