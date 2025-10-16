import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/admin/coaching/coaches/[id]/approve
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const coach = await prisma.coach.findUnique({
      where: { id },
    });

    if (!coach) {
      return NextResponse.json(
        { error: 'Coach not found' },
        { status: 404 }
      );
    }

    if (coach.status !== 'pending') {
      return NextResponse.json(
        { error: 'Coach is not pending approval' },
        { status: 400 }
      );
    }

    const updatedCoach = await prisma.coach.update({
      where: { id },
      data: {
        status: 'approved',
        verified: true,
        verifiedAt: new Date(),
      },
    });

    // Send notification to coach
    await prisma.coachingNotification.create({
      data: {
        userId: coach.userId,
        type: 'coach_approved',
        title: 'Profile Approved',
        message: 'Congratulations! Your coach profile has been approved and is now visible to clients.',
        data: { coachId: id },
      },
    });

    return NextResponse.json({
      coach: updatedCoach,
      message: 'Coach approved successfully',
    });
  } catch (error) {
    console.error('Error approving coach:', error);
    return NextResponse.json(
      { error: 'Failed to approve coach' },
      { status: 500 }
    );
  }
}
