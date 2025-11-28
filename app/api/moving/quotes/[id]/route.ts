import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/moving/quotes/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const quote = await prisma.movingQuote.findUnique({
      where: { id: params.id },
      include: {
        service: true,
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!quote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    return NextResponse.json(quote);
  } catch (error) {
    console.error('Error fetching moving quote:', error);
    return NextResponse.json(
      { error: 'Failed to fetch moving quote' },
      { status: 500 }
    );
  }
}

// PUT /api/moving/quotes/[id] - Mettre à jour un devis (Admin)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const quote = await prisma.movingQuote.update({
      where: { id: params.id },
      data: {
        status: data.status,
        quotedPrice: data.quotedPrice ? parseFloat(data.quotedPrice) : undefined,
        quotedBy: data.quotedBy || session.user?.id,
        quotedAt: data.quotedPrice ? new Date() : undefined,
        validUntil: data.validUntil ? new Date(data.validUntil) : undefined,
        adminNotes: data.adminNotes,
        updatedAt: new Date(),
      },
    });

    // TODO: Envoyer email au client avec le devis

    return NextResponse.json(quote);
  } catch (error) {
    console.error('Error updating moving quote:', error);
    return NextResponse.json(
      { error: 'Failed to update moving quote' },
      { status: 500 }
    );
  }
}

// DELETE /api/moving/quotes/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.movingQuote.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting moving quote:', error);
    return NextResponse.json(
      { error: 'Failed to delete moving quote' },
      { status: 500 }
    );
  }
}
