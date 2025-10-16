import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

/**
 * @swagger
 * /api/accountants/{id}:
 *   get:
 *     tags: [Accounting]
 *     summary: Get accountant by ID
 *     description: Retrieve detailed information about a specific accountant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Accountant ID
 *     responses:
 *       200:
 *         description: Accountant details
 *       404:
 *         description: Accountant not found
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const item = await prisma.accountant.findUnique({
      where: { id: params.id },
      include: {
        city: true,
      },
    });

    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Accountant not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Error fetching accountant:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch accountant' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/accountants/{id}:
 *   put:
 *     tags: [Accounting]
 *     summary: Update accountant
 *     description: Update all fields of accountant
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
 *         description: Accountant updated successfully
 *       404:
 *         description: Accountant not found
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

    const item = await prisma.accountant.update({
      where: { id: params.id },
      data: body,
      include: {
        city: true,
      },
    });

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Error updating accountant:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update accountant' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/accountants/{id}:
 *   patch:
 *     tags: [Accounting]
 *     summary: Partially update accountant
 *     description: Update specific fields of accountant
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
 *         description: Accountant updated successfully
 *       404:
 *         description: Accountant not found
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

    const item = await prisma.accountant.update({
      where: { id: params.id },
      data: body,
      include: {
        city: true,
      },
    });

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Error updating accountant:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update accountant' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/accountants/{id}:
 *   delete:
 *     tags: [Accounting]
 *     summary: Delete accountant
 *     description: Soft delete or permanently delete accountant
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
 *         description: Accountant deleted successfully
 *       404:
 *         description: Accountant not found
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
      await prisma.accountant.delete({
        where: { id: params.id },
      });
    } else {
      await prisma.accountant.update({
        where: { id: params.id },
        data: { isAvailable: false },
      });
    }

    return NextResponse.json({
      success: true,
      message: permanent ? 'Permanently deleted' : 'Soft deleted',
    });
  } catch (error) {
    console.error('Error deleting accountant:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete accountant' },
      { status: 500 }
    );
  }
}
