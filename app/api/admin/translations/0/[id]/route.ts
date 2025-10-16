import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/admin/translations/0/{id}:
 *   get:
 *     summary: Get a 0 translation by ID
 *     tags:
 *       - Admin - Translations
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const translation = await prisma.serviceAddonTranslation.findUnique({
      where: { id: params.id },
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
 * /api/admin/translations/0/{id}:
 *   put:
 *     summary: Update a 0 translation
 *     tags:
 *       - Admin - Translations
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const translation = await prisma.serviceAddonTranslation.update({
      where: { id: params.id },
      data: body,
    });

    return NextResponse.json(translation);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/admin/translations/0/{id}:
 *   delete:
 *     summary: Delete a 0 translation
 *     tags:
 *       - Admin - Translations
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.serviceAddonTranslation.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Translation deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
