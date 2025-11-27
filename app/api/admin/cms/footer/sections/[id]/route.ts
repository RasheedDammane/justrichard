import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

// GET - Récupérer une section spécifique
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const section = await prisma.footerSection.findUnique({
      where: { id: params.id },
      include: {
        links: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!section) {
      return NextResponse.json(
        { error: 'Section not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(section);
  } catch (error) {
    console.error('Error fetching footer section:', error);
    return NextResponse.json(
      { error: 'Failed to fetch footer section' },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour une section
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { id, links, ...updateData } = data;

    const section = await prisma.footerSection.update({
      where: { id: params.id },
      data: updateData,
      include: {
        links: true,
      },
    });

    return NextResponse.json(section);
  } catch (error) {
    console.error('Error updating footer section:', error);
    return NextResponse.json(
      { error: 'Failed to update footer section' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer une section
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.footerSection.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting footer section:', error);
    return NextResponse.json(
      { error: 'Failed to delete footer section' },
      { status: 500 }
    );
  }
}
