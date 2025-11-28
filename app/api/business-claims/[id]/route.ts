import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET - Détails d'un claim
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    const claim = await prisma.businessClaim.findUnique({
      where: { id },
      include: {
        claimantUser: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    if (!claim) {
      return NextResponse.json(
        { success: false, error: 'Claim not found' },
        { status: 404 }
      );
    }

    // Vérifier les permissions
    if (
      session?.user?.role !== 'ADMIN' &&
      claim.claimantUserId !== session?.user?.id
    ) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      data: claim,
    });
  } catch (error: any) {
    console.error('Error fetching claim:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PATCH - Mettre à jour un claim (admin uniquement)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { status, rejectionReason, adminNotes } = body;

    const claim = await prisma.businessClaim.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(rejectionReason && { rejectionReason }),
        ...(adminNotes && { adminNotes }),
        reviewedBy: session.user.id,
        reviewedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      data: claim,
      message: 'Claim updated successfully',
    });
  } catch (error: any) {
    console.error('Error updating claim:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un claim (admin uniquement)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      );
    }

    await prisma.businessClaim.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Claim deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting claim:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
