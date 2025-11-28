import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/admin/countries/{id}:
 *   get:
 *     summary: Récupérer un pays par ID
 *     tags: [Admin - Countries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails du pays
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const country = await prisma.country.findUnique({
      where: { id: params.id },
      include: {
        City: {
          take: 10,
          orderBy: { name: 'asc' },
        },
        _count: {
          select: {
            City: true,
            Property: true,
            Provider: true,
            Activity: true,
          },
        },
      },
    });

    if (!country) {
      return NextResponse.json(
        { success: false, error: 'Country not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: country });
  } catch (error: any) {
    console.error('Error fetching country:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/admin/countries/{id}:
 *   put:
 *     summary: Mettre à jour un pays
 *     tags: [Admin - Countries]
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
 *         description: Pays mis à jour
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const country = await prisma.country.update({
      where: { id: params.id },
      data: {
        code: body.code,
        name: body.name,
        nameAr: body.nameAr || null,
        nameFr: body.nameFr || null,
        nameTh: body.nameTh || null,
        nameRu: body.nameRu || null,
        nameKo: body.nameKo || null,
        nameEs: body.nameEs || null,
        nameVi: body.nameVi || null,
        nameTl: body.nameTl || null,
        nameIt: body.nameIt || null,
        nameNo: body.nameNo || null,
        nameTr: body.nameTr || null,
        namePt: body.namePt || null,
        nameAf: body.nameAf || null,
        nameJa: body.nameJa || null,
        nameDe: body.nameDe || null,
        slug: body.slug,
        description: body.description || null,
        dialCode: body.dialCode || null,
        currencyId: body.currencyId || null,
        flag: body.flag || null,
        icon: body.icon || null,
        thumbnail: body.thumbnail || null,
        images: body.images || [],
        latitude: body.latitude || null,
        longitude: body.longitude || null,
        metaTitle: body.metaTitle || null,
        metaDescription: body.metaDescription || null,
        keywords: body.keywords || [],
        isActive: body.isActive,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, data: country });
  } catch (error: any) {
    console.error('Error updating country:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/admin/countries/{id}:
 *   delete:
 *     summary: Supprimer un pays
 *     tags: [Admin - Countries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pays supprimé
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.country.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      success: true,
      message: 'Country deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting country:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
