import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

// PUT - Mettre à jour un lien
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

    const link = await prisma.footerLink.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json(link);
  } catch (error) {
    console.error('Error updating footer link:', error);
    return NextResponse.json(
      { error: 'Failed to update footer link' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un lien
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.footerLink.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting footer link:', error);
    return NextResponse.json(
      { error: 'Failed to delete footer link' },
      { status: 500 }
    );
  }
}
