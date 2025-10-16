import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

/**
 * @swagger
 * /api/lawyers/{id}:
 *   get:
 *     tags: [Legal]
 *     summary: Get lawyer by ID
 *     description: Retrieve detailed information about a specific lawyer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Lawyer ID
 *     responses:
 *       200:
 *         description: Lawyer details
 *       404:
 *         description: Lawyer not found
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const item = await prisma.lawyer.findUnique({
      where: { id: params.id },
      include: {
        city: true,
      },
    });

    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Lawyer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Error fetching lawyer:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch lawyer' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/lawyers/{id}:
 *   put:
 *     tags: [Legal]
 *     summary: Update lawyer
 *     description: Update all fields of lawyer
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
 *         description: Lawyer updated successfully
 *       404:
 *         description: Lawyer not found
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

    const item = await prisma.lawyer.update({
      where: { id: params.id },
      data: body,
      include: {
        city: true,
      },
    });

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Error updating lawyer:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update lawyer' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/lawyers/{id}:
 *   patch:
 *     tags: [Legal]
 *     summary: Partially update lawyer
 *     description: Update specific fields of lawyer
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
 *         description: Lawyer updated successfully
 *       404:
 *         description: Lawyer not found
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

    const item = await prisma.lawyer.update({
      where: { id: params.id },
      data: body,
      include: {
        city: true,
      },
    });

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Error updating lawyer:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update lawyer' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/lawyers/{id}:
 *   delete:
 *     tags: [Legal]
 *     summary: Delete lawyer
 *     description: Soft delete or permanently delete lawyer
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
 *         description: Lawyer deleted successfully
 *       404:
 *         description: Lawyer not found
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
      await prisma.lawyer.delete({
        where: { id: params.id },
      });
    } else {
      await prisma.lawyer.update({
        where: { id: params.id },
        data: { isAvailable: false },
      });
    }

    return NextResponse.json({
      success: true,
      message: permanent ? 'Permanently deleted' : 'Soft deleted',
    });
  } catch (error) {
    console.error('Error deleting lawyer:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete lawyer' },
      { status: 500 }
    );
  }
}
