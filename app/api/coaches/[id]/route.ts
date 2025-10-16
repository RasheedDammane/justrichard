import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

/**
 * @swagger
 * /api/coaches/{id}:
 *   get:
 *     tags: [Coaching]
 *     summary: Get coach by ID
 *     description: Retrieve detailed information about a specific coach
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Coach ID
 *     responses:
 *       200:
 *         description: Coach details
 *       404:
 *         description: Coach not found
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const item = await prisma.coach.findUnique({
      where: { id: params.id },
      include: {
        city: true,
      },
    });

    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Coach not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Error fetching coach:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch coach' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/coaches/{id}:
 *   put:
 *     tags: [Coaching]
 *     summary: Update coach
 *     description: Update all fields of coach
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Coach updated successfully
 *       404:
 *         description: Coach not found
 *       401:
 *         description: Unauthorized
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    const item = await prisma.coach.update({
      where: { id: params.id },
      data: body,
      include: {
        city: true,
      },
    });

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Error updating coach:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update coach' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/coaches/{id}:
 *   patch:
 *     tags: [Coaching]
 *     summary: Partially update coach
 *     description: Update specific fields of coach
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Coach updated successfully
 *       404:
 *         description: Coach not found
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    const item = await prisma.coach.update({
      where: { id: params.id },
      data: body,
      include: {
        city: true,
      },
    });

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Error updating coach:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update coach' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/coaches/{id}:
 *   delete:
 *     tags: [Coaching]
 *     summary: Delete coach
 *     description: Soft delete or permanently delete coach
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: permanent
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Permanently delete (true) or soft delete (false)
 *     responses:
 *       200:
 *         description: Coach deleted successfully
 *       404:
 *         description: Coach not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin only for permanent delete
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const permanent = searchParams.get('permanent') === 'true';

    if (permanent && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Admin only' },
        { status: 403 }
      );
    }

    if (permanent) {
      await prisma.coach.delete({
        where: { id: params.id },
      });
    } else {
      await prisma.coach.update({
        where: { id: params.id },
        data: { isAvailable: false },
      });
    }

    return NextResponse.json({
      success: true,
      message: permanent ? 'Permanently deleted' : 'Soft deleted',
    });
  } catch (error) {
    console.error('Error deleting coach:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete coach' },
      { status: 500 }
    );
  }
}
