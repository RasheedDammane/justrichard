import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

/**
 * @swagger
 * /api/real-estate-agents/{id}:
 *   get:
 *     tags: [Real Estate]
 *     summary: Get real estate agent by ID
 *     description: Retrieve detailed information about a specific real estate agent
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Real Estate Agent ID
 *     responses:
 *       200:
 *         description: Real Estate Agent details
 *       404:
 *         description: Real Estate Agent not found
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const item = await prisma.realEstateAgent.findUnique({
      where: { id: params.id },
      include: {
        city: true,
        reviews: true
      },
    });

    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Real Estate Agent not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Error fetching real estate agent:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch real estate agent' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/real-estate-agents/{id}:
 *   put:
 *     tags: [Real Estate]
 *     summary: Update real estate agent
 *     description: Update all fields of real estate agent
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
 *         description: Real Estate Agent updated successfully
 *       404:
 *         description: Real Estate Agent not found
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

    const item = await prisma.realEstateAgent.update({
      where: { id: params.id },
      data: body,
      include: {
        city: true,
      },
    });

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Error updating real estate agent:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update real estate agent' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/real-estate-agents/{id}:
 *   patch:
 *     tags: [Real Estate]
 *     summary: Partially update real estate agent
 *     description: Update specific fields of real estate agent
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
 *         description: Real Estate Agent updated successfully
 *       404:
 *         description: Real Estate Agent not found
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

    const item = await prisma.realEstateAgent.update({
      where: { id: params.id },
      data: body,
      include: {
        city: true,
      },
    });

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Error updating real estate agent:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update real estate agent' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/real-estate-agents/{id}:
 *   delete:
 *     tags: [Real Estate]
 *     summary: Delete real estate agent
 *     description: Soft delete or permanently delete real estate agent
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
 *         description: Real Estate Agent deleted successfully
 *       404:
 *         description: Real Estate Agent not found
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
      await prisma.realEstateAgent.delete({
        where: { id: params.id },
      });
    } else {
      await prisma.realEstateAgent.update({
        where: { id: params.id },
        data: { isAvailable: false },
      });
    }

    return NextResponse.json({
      success: true,
      message: permanent ? 'Permanently deleted' : 'Soft deleted',
    });
  } catch (error) {
    console.error('Error deleting real estate agent:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete real estate agent' },
      { status: 500 }
    );
  }
}
