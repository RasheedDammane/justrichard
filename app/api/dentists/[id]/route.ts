import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

/**
 * @swagger
 * /api/dentists/{id}:
 *   get:
 *     tags: [Dental]
 *     summary: Get dentist by ID
 *     description: Retrieve detailed information about a specific dentist
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Dentist ID
 *     responses:
 *       200:
 *         description: Dentist details
 *       404:
 *         description: Dentist not found
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const item = await prisma.dentist.findUnique({
      where: { id: params.id },
      include: {
        city: true,
      },
    });

    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Dentist not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Error fetching dentist:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dentist' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/dentists/{id}:
 *   put:
 *     tags: [Dental]
 *     summary: Update dentist
 *     description: Update all fields of dentist
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
 *         description: Dentist updated successfully
 *       404:
 *         description: Dentist not found
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

    const item = await prisma.dentist.update({
      where: { id: params.id },
      data: body,
      include: {
        city: true,
      },
    });

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Error updating dentist:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update dentist' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/dentists/{id}:
 *   patch:
 *     tags: [Dental]
 *     summary: Partially update dentist
 *     description: Update specific fields of dentist
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
 *         description: Dentist updated successfully
 *       404:
 *         description: Dentist not found
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

    const item = await prisma.dentist.update({
      where: { id: params.id },
      data: body,
      include: {
        city: true,
      },
    });

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Error updating dentist:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update dentist' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/dentists/{id}:
 *   delete:
 *     tags: [Dental]
 *     summary: Delete dentist
 *     description: Soft delete or permanently delete dentist
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
 *         description: Dentist deleted successfully
 *       404:
 *         description: Dentist not found
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
      await prisma.dentist.delete({
        where: { id: params.id },
      });
    } else {
      await prisma.dentist.update({
        where: { id: params.id },
        data: { isAvailable: false },
      });
    }

    return NextResponse.json({
      success: true,
      message: permanent ? 'Permanently deleted' : 'Soft deleted',
    });
  } catch (error) {
    console.error('Error deleting dentist:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete dentist' },
      { status: 500 }
    );
  }
}
