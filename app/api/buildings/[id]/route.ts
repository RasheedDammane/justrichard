import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

/**
 * @swagger
 * /api/buildings/{id}:
 *   get:
 *     tags: [Buildings]
 *     summary: Get building by ID
 *     description: Retrieve detailed information about a specific building
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Building ID
 *     responses:
 *       200:
 *         description: Building details
 *       404:
 *         description: Building not found
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const item = await prisma.building.findUnique({
      where: { id: params.id },
      include: {
        city: true,
        properties: true
      },
    });

    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Building not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Error fetching building:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch building' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/buildings/{id}:
 *   put:
 *     tags: [Buildings]
 *     summary: Update building
 *     description: Update all fields of building
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
 *         description: Building updated successfully
 *       404:
 *         description: Building not found
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

    const item = await prisma.building.update({
      where: { id: params.id },
      data: body,
      include: {
        city: true,
      },
    });

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Error updating building:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update building' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/buildings/{id}:
 *   patch:
 *     tags: [Buildings]
 *     summary: Partially update building
 *     description: Update specific fields of building
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
 *         description: Building updated successfully
 *       404:
 *         description: Building not found
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

    const item = await prisma.building.update({
      where: { id: params.id },
      data: body,
      include: {
        city: true,
      },
    });

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Error updating building:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update building' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/buildings/{id}:
 *   delete:
 *     tags: [Buildings]
 *     summary: Delete building
 *     description: Soft delete or permanently delete building
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
 *         description: Building deleted successfully
 *       404:
 *         description: Building not found
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
      await prisma.building.delete({
        where: { id: params.id },
      });
    } else {
      await prisma.building.update({
        where: { id: params.id },
        data: { isActive: false },
      });
    }

    return NextResponse.json({
      success: true,
      message: permanent ? 'Permanently deleted' : 'Soft deleted',
    });
  } catch (error) {
    console.error('Error deleting building:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete building' },
      { status: 500 }
    );
  }
}
