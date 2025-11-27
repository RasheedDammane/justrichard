import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

// PUT - Mettre à jour une action
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
    const { id, ...updateData } = data;

    const action = await prisma.navbarAction.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json(action);
  } catch (error) {
    console.error('Error updating navbar action:', error);
    return NextResponse.json(
      { error: 'Failed to update navbar action' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer une action
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.navbarAction.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting navbar action:', error);
    return NextResponse.json(
      { error: 'Failed to delete navbar action' },
      { status: 500 }
    );
  }
}
