import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/admin/translations/0:
 *   get:
 *     summary: Get all 0 translations
 *     description: Retrieve all translations with filters
 *     tags:
 *       - Admin - Translations
 *     parameters:
 *       - in: query
 *         name: locale
 *         schema:
 *           type: string
 *         description: Filter by language (en, fr, ar, de, es, ru, ko, th, vi)
 *       - in: query
 *         name: serviceAddonId
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *     responses:
 *       200:
 *         description: List of translations
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const locale = searchParams.get('locale');
    const entityId = searchParams.get('serviceAddonId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    const where: any = {};
    if (locale) where.locale = locale;
    if (entityId) where.serviceAddonId = entityId;

    const [translations, total] = await Promise.all([
      prisma.serviceAddonTranslation.findMany({
        where,
        include: {
          addon: {
            select: { id: true },
          },
        },
        skip,
        take: limit,
        orderBy: { addonId: 'asc' },
      }),
      prisma.serviceAddonTranslation.count({ where }),
    ]);

    return NextResponse.json({
      data: translations,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/admin/translations/0:
 *   post:
 *     summary: Create a 0 translation
 *     tags:
 *       - Admin - Translations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - serviceAddonId
 *               - locale
 *               - name
 *     responses:
 *       201:
 *         description: Translation created successfully
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const translation = await prisma.serviceAddonTranslation.create({
      data: body,
    });

    return NextResponse.json(translation, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
