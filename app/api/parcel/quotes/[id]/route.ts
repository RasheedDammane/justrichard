import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/parcel/quotes/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const quote = await prisma.parcelQuote.findUnique({
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
    console.error('Error fetching parcel quote:', error);
    return NextResponse.json(
      { error: 'Failed to fetch parcel quote' },
      { status: 500 }
    );
  }
}

// PUT /api/parcel/quotes/[id]
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

    const quote = await prisma.parcelQuote.update({
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

    // TODO: Envoyer email au client

    return NextResponse.json(quote);
  } catch (error) {
    console.error('Error updating parcel quote:', error);
    return NextResponse.json(
      { error: 'Failed to update parcel quote' },
      { status: 500 }
    );
  }
}

// DELETE /api/parcel/quotes/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.parcelQuote.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting parcel quote:', error);
    return NextResponse.json(
      { error: 'Failed to delete parcel quote' },
      { status: 500 }
    );
  }
}
