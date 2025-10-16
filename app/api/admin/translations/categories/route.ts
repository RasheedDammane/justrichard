import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/admin/translations/categories:
 *   get:
 *     summary: Get all category translations
 *     description: Retrieve all category translations with filters
 *     tags:
 *       - Admin - Translations
 *     parameters:
 *       - in: query
 *         name: locale
 *         schema:
 *           type: string
 *         description: Filter by language (en, fr, ar, de, es, ru, ko, th, vi)
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *         description: Filter by category ID
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
 *         description: List of category translations
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const locale = searchParams.get('locale');
    const categoryId = searchParams.get('categoryId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    const where: any = {};
    if (locale) where.locale = locale;
    if (categoryId) where.categoryId = categoryId;

    const [translations, total] = await Promise.all([
      prisma.categoryTranslation.findMany({
        where,
        include: {
          category: {
            select: {
              id: true,
              slug: true,
              isActive: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: { categoryId: 'asc' },
      }),
      prisma.categoryTranslation.count({ where }),
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
 * /api/admin/translations/categories:
 *   post:
 *     summary: Create a category translation
 *     description: Create a new translation for a category
 *     tags:
 *       - Admin - Translations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoryId
 *               - locale
 *               - name
 *             properties:
 *               categoryId:
 *                 type: string
 *               locale:
 *                 type: string
 *                 enum: [en, fr, ar, de, es, ru, ko, th, vi]
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               seoTitle:
 *                 type: string
 *               seoDescription:
 *                 type: string
 *     responses:
 *       201:
 *         description: Translation created successfully
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { categoryId, locale, name, description, seoTitle, seoDescription } = body;

    if (!categoryId || !locale || !name) {
      return NextResponse.json(
        { error: 'categoryId, locale, and name are required' },
        { status: 400 }
      );
    }

    const translation = await prisma.categoryTranslation.create({
      data: {
        categoryId,
        locale,
        name,
        description,
        seoTitle,
        seoDescription,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(translation, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
