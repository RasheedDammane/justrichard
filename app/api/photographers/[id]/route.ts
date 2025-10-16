import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

/**
 * @swagger
 * /api/photographers/{id}:
 *   get:
 *     tags: [Photography]
 *     summary: Get photographer by ID
 *     description: Retrieve detailed information about a specific photographer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Photographer ID
 *     responses:
 *       200:
 *         description: Photographer details
 *       404:
 *         description: Photographer not found
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const item = await prisma.photographer.findUnique({
      where: { id: params.id },
      include: {
        city: true,
      },
    });

    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Photographer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Error fetching photographer:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch photographer' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/photographers/{id}:
 *   put:
 *     tags: [Photography]
 *     summary: Update photographer
 *     description: Update all fields of photographer
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
 *         description: Photographer updated successfully
 *       404:
 *         description: Photographer not found
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

    const item = await prisma.photographer.update({
      where: { id: params.id },
      data: body,
      include: {
        city: true,
      },
    });

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Error updating photographer:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update photographer' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/photographers/{id}:
 *   patch:
 *     tags: [Photography]
 *     summary: Partially update photographer
 *     description: Update specific fields of photographer
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
 *         description: Photographer updated successfully
 *       404:
 *         description: Photographer not found
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

    const item = await prisma.photographer.update({
      where: { id: params.id },
      data: body,
      include: {
        city: true,
      },
    });

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Error updating photographer:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update photographer' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/photographers/{id}:
 *   delete:
 *     tags: [Photography]
 *     summary: Delete photographer
 *     description: Soft delete or permanently delete photographer
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
 *         description: Photographer deleted successfully
 *       404:
 *         description: Photographer not found
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
      await prisma.photographer.delete({
        where: { id: params.id },
      });
    } else {
      await prisma.photographer.update({
        where: { id: params.id },
        data: { isAvailable: false },
      });
    }

    return NextResponse.json({
      success: true,
      message: permanent ? 'Permanently deleted' : 'Soft deleted',
    });
  } catch (error) {
    console.error('Error deleting photographer:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete photographer' },
      { status: 500 }
    );
  }
}
