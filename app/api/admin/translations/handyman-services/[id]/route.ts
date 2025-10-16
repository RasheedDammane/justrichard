import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/admin/translations/handyman-services/{id}:
 *   get:
 *     summary: Get a Handyman Service translation by ID
 *     tags:
 *       - Admin - Translations
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Translation details
 *       404:
 *         description: Translation not found
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const translation = await prisma.handymanServiceTranslation.findUnique({
      where: { id: params.id },
      include: {
        service: true,
      },
    });

    if (!translation) {
      return NextResponse.json({ error: 'Translation not found' }, { status: 404 });
    }

    return NextResponse.json(translation);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/admin/translations/handyman-services/{id}:
 *   put:
 *     summary: Update a Handyman Service translation
 *     tags:
 *       - Admin - Translations
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Translation updated successfully
 *       404:
 *         description: Translation not found
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const translation = await prisma.handymanServiceTranslation.update({
      where: { id: params.id },
      data: body,
      include: {
        service: true,
      },
    });

    return NextResponse.json(translation);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/admin/translations/handyman-services/{id}:
 *   delete:
 *     summary: Delete a Handyman Service translation
 *     tags:
 *       - Admin - Translations
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Translation deleted successfully
 *       404:
 *         description: Translation not found
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.handymanServiceTranslation.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Translation deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
