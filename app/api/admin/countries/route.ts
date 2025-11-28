import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/admin/countries:
 *   get:
 *     summary: Liste tous les pays
 *     tags: [Admin - Countries]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Liste des pays
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const isActive = searchParams.get('isActive');

    const where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { code: { contains: search, mode: 'insensitive' } },
        { nameAr: { contains: search, mode: 'insensitive' } },
        { nameFr: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (isActive !== null && isActive !== undefined) {
      where.isActive = isActive === 'true';
    }

    const [countries, total] = await Promise.all([
      prisma.country.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { name: 'asc' },
        include: {
          _count: {
            select: {
              City: true,
              Property: true,
              Provider: true,
            },
          },
        },
      }),
      prisma.country.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: countries,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('Error fetching countries:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/admin/countries:
 *   post:
 *     summary: Créer un nouveau pays
 *     tags: [Admin - Countries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - name
 *             properties:
 *               code:
 *                 type: string
 *               name:
 *                 type: string
 *               nameAr:
 *                 type: string
 *               nameFr:
 *                 type: string
 *               nameTh:
 *                 type: string
 *               flag:
 *                 type: string
 *               dialCode:
 *                 type: string
 *               currency:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Pays créé
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const country = await prisma.country.create({
      data: {
        id: `country-${body.code.toLowerCase()}-${Date.now()}`,
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
        slug: body.slug || body.name.toLowerCase().replace(/\s+/g, '-'),
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
        isActive: body.isActive !== undefined ? body.isActive : true,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(
      { success: true, data: country },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating country:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
