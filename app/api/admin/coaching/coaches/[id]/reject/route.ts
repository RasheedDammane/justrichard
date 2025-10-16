import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/admin/coaching/coaches/[id]/reject
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { reason } = body;

    if (!reason) {
      return NextResponse.json(
        { error: 'Rejection reason is required' },
        { status: 400 }
      );
    }

    const coach = await prisma.coach.findUnique({
      where: { id },
    });

    if (!coach) {
      return NextResponse.json(
        { error: 'Coach not found' },
        { status: 404 }
      );
    }

    const updatedCoach = await prisma.coach.update({
      where: { id },
      data: {
        status: 'rejected',
        verified: false,
        rejectionReason: reason,
      },
    });

    // Send notification to coach
    await prisma.coachingNotification.create({
      data: {
        userId: coach.userId,
        type: 'coach_rejected',
        title: 'Profile Rejected',
        message: `Your coach profile has been rejected. Reason: ${reason}`,
        data: { coachId: id, reason },
      },
    });

    return NextResponse.json({
      coach: updatedCoach,
      message: 'Coach rejected',
    });
  } catch (error) {
    console.error('Error rejecting coach:', error);
    return NextResponse.json(
      { error: 'Failed to reject coach' },
      { status: 500 }
    );
  }
}
