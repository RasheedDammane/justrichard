import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

/**
 * @swagger
 * /api/business-consultants/{id}:
 *   get:
 *     tags: [Business Setup]
 *     summary: Get business consultant by ID
 *     description: Retrieve detailed information about a specific business consultant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Business Consultant ID
 *     responses:
 *       200:
 *         description: Business Consultant details
 *       404:
 *         description: Business Consultant not found
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const item = await prisma.businessConsultant.findUnique({
      where: { id: params.id },
      include: {
        city: true,
      },
    });

    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Business Consultant not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Error fetching business consultant:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch business consultant' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/business-consultants/{id}:
 *   put:
 *     tags: [Business Setup]
 *     summary: Update business consultant
 *     description: Update all fields of business consultant
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
 *         description: Business Consultant updated successfully
 *       404:
 *         description: Business Consultant not found
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

    const item = await prisma.businessConsultant.update({
      where: { id: params.id },
      data: body,
      include: {
        city: true,
      },
    });

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Error updating business consultant:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update business consultant' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/business-consultants/{id}:
 *   patch:
 *     tags: [Business Setup]
 *     summary: Partially update business consultant
 *     description: Update specific fields of business consultant
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
 *         description: Business Consultant updated successfully
 *       404:
 *         description: Business Consultant not found
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

    const item = await prisma.businessConsultant.update({
      where: { id: params.id },
      data: body,
      include: {
        city: true,
      },
    });

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Error updating business consultant:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update business consultant' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/business-consultants/{id}:
 *   delete:
 *     tags: [Business Setup]
 *     summary: Delete business consultant
 *     description: Soft delete or permanently delete business consultant
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
 *         description: Business Consultant deleted successfully
 *       404:
 *         description: Business Consultant not found
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
      await prisma.businessConsultant.delete({
        where: { id: params.id },
      });
    } else {
      await prisma.businessConsultant.update({
        where: { id: params.id },
        data: { isAvailable: false },
      });
    }

    return NextResponse.json({
      success: true,
      message: permanent ? 'Permanently deleted' : 'Soft deleted',
    });
  } catch (error) {
    console.error('Error deleting business consultant:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete business consultant' },
      { status: 500 }
    );
  }
}
