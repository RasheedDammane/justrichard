import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/admin/languages/{id}:
 *   get:
 *     summary: Récupérer une langue par ID
 *     tags: [Admin - Languages]
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const language = await prisma.language.findUnique({
      where: { id: params.id },
    });

    if (!language) {
      return NextResponse.json(
        { success: false, error: 'Language not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: language });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/admin/languages/{id}:
 *   put:
 *     summary: Mettre à jour une langue
 *     tags: [Admin - Languages]
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const language = await prisma.language.update({
      where: { id: params.id },
      data: {
        name: body.name,
        nativeName: body.nativeName,
        isRTL: body.isRTL,
        isActive: body.isActive,
        order: body.order,
      },
    });

    return NextResponse.json({ success: true, data: language });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/admin/languages/{id}:
 *   delete:
 *     summary: Supprimer une langue
 *     tags: [Admin - Languages]
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.language.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      success: true,
      message: 'Language deleted successfully',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
