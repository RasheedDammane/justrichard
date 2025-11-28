import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/admin/cities:
 *   get:
 *     summary: Liste toutes les villes
 *     tags: [Admin - Cities]
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
 *         name: countryId
 *         schema:
 *           type: string
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Liste des villes
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const countryId = searchParams.get('countryId');
    const isActive = searchParams.get('isActive');

    const where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { nameAr: { contains: search, mode: 'insensitive' } },
        { nameFr: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (countryId) {
      where.countryId = countryId;
    }

    if (isActive !== null && isActive !== undefined) {
      where.isActive = isActive === 'true';
    }

    const [cities, total] = await Promise.all([
      prisma.city.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { name: 'asc' },
        include: {
          Country: true,
          Region: true,
          _count: {
            select: {
              Property: true,
              Provider: true,
              Activity: true,
            },
          },
        },
      }),
      prisma.city.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: cities,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('Error fetching cities:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/admin/cities:
 *   post:
 *     summary: Créer une nouvelle ville
 *     tags: [Admin - Cities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - countryId
 *               - slug
 *             properties:
 *               name:
 *                 type: string
 *               countryId:
 *                 type: string
 *               slug:
 *                 type: string
 *               nameAr:
 *                 type: string
 *               nameFr:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               isActive:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Ville créée
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const city = await prisma.city.create({
      data: {
        id: `city-${body.slug}-${Date.now()}`,
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
        countryId: body.countryId,
        regionId: body.regionId || null,
        districtId: body.districtId || null,
        latitude: body.latitude || null,
        longitude: body.longitude || null,
        icon: body.icon || null,
        thumbnail: body.thumbnail || null,
        images: body.images || [],
        metaTitle: body.metaTitle || null,
        metaDescription: body.metaDescription || null,
        keywords: body.keywords || [],
        isActive: body.isActive !== undefined ? body.isActive : true,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(
      { success: true, data: city },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating city:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
