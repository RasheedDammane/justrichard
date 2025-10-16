import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

/**
 * @swagger
 * /api/visa-agents/{id}:
 *   get:
 *     tags: [Visa & Permits]
 *     summary: Get visa agent by ID
 *     description: Retrieve detailed information about a specific visa agent
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Visa Agent ID
 *     responses:
 *       200:
 *         description: Visa Agent details
 *       404:
 *         description: Visa Agent not found
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const item = await prisma.visaAgent.findUnique({
      where: { id: params.id },
      include: {
        city: true,
      },
    });

    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Visa Agent not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Error fetching visa agent:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch visa agent' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/visa-agents/{id}:
 *   put:
 *     tags: [Visa & Permits]
 *     summary: Update visa agent
 *     description: Update all fields of visa agent
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
 *         description: Visa Agent updated successfully
 *       404:
 *         description: Visa Agent not found
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

    const item = await prisma.visaAgent.update({
      where: { id: params.id },
      data: body,
      include: {
        city: true,
      },
    });

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Error updating visa agent:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update visa agent' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/visa-agents/{id}:
 *   patch:
 *     tags: [Visa & Permits]
 *     summary: Partially update visa agent
 *     description: Update specific fields of visa agent
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
 *         description: Visa Agent updated successfully
 *       404:
 *         description: Visa Agent not found
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

    const item = await prisma.visaAgent.update({
      where: { id: params.id },
      data: body,
      include: {
        city: true,
      },
    });

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Error updating visa agent:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update visa agent' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/visa-agents/{id}:
 *   delete:
 *     tags: [Visa & Permits]
 *     summary: Delete visa agent
 *     description: Soft delete or permanently delete visa agent
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
 *         description: Visa Agent deleted successfully
 *       404:
 *         description: Visa Agent not found
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
      await prisma.visaAgent.delete({
        where: { id: params.id },
      });
    } else {
      await prisma.visaAgent.update({
        where: { id: params.id },
        data: { isAvailable: false },
      });
    }

    return NextResponse.json({
      success: true,
      message: permanent ? 'Permanently deleted' : 'Soft deleted',
    });
  } catch (error) {
    console.error('Error deleting visa agent:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete visa agent' },
      { status: 500 }
    );
  }
}
