import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/admin/translations/cms-pages:
 *   get:
 *     summary: Get all CMS Page translations
 *     description: Retrieve all translations with filters
 *     tags:
 *       - Admin - Translations
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: locale
 *         schema:
 *           type: string
 *           enum: [en, fr, ar, de, es, ru, ko, th, vi]
 *         description: Filter by language
 *       - in: query
 *         name: pageId
 *         schema:
 *           type: string
 *         description: Filter by page ID
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
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in translation name/title
 *     responses:
 *       200:
 *         description: List of CMS Page translations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                 pagination:
 *                   type: object
 *       401:
 *         description: Unauthorized
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const locale = searchParams.get('locale');
    const entityId = searchParams.get('pageId');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    const where: any = {};
    if (locale) where.locale = locale;
    if (entityId) where.pageId = entityId;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [translations, total] = await Promise.all([
      prisma.cMSPageTranslation.findMany({
        where,
        include: {
          page: {
            select: { id: true },
          },
        },
        skip,
        take: limit,
        orderBy: { pageId: 'asc' },
      }),
      prisma.cMSPageTranslation.count({ where }),
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
    console.error('Error fetching translations:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/admin/translations/cms-pages:
 *   post:
 *     summary: Create a CMS Page translation
 *     description: Create a new translation for a page
 *     tags:
 *       - Admin - Translations
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: ["pageId","locale","title","content"]
 *             properties:
 *               pageId:
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
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    
    if (!body.pageId) {
      return NextResponse.json(
        { error: 'pageId is required' },
        { status: 400 }
      );
    }
    if (!body.locale) {
      return NextResponse.json(
        { error: 'locale is required' },
        { status: 400 }
      );
    }
    if (!body.title) {
      return NextResponse.json(
        { error: 'title is required' },
        { status: 400 }
      );
    }
    if (!body.content) {
      return NextResponse.json(
        { error: 'content is required' },
        { status: 400 }
      );
    }

    const translation = await prisma.cMSPageTranslation.create({
      data: body,
      include: {
        page: true,
      },
    });

    return NextResponse.json(translation, { status: 201 });
  } catch (error: any) {
    console.error('Error creating translation:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
