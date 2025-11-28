import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/admin/languages:
 *   get:
 *     summary: Liste toutes les langues
 *     tags: [Admin - Languages]
 *     responses:
 *       200:
 *         description: Liste des langues
 */
export async function GET() {
  try {
    const languages = await prisma.language.findMany({
      orderBy: { name: 'asc' },
    });

    return NextResponse.json({ success: true, data: languages });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/admin/languages:
 *   post:
 *     summary: Créer une nouvelle langue
 *     tags: [Admin - Languages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - name
 *               - nativeName
 *             properties:
 *               code:
 *                 type: string
 *               name:
 *                 type: string
 *               nativeName:
 *                 type: string
 *               isRTL:
 *                 type: boolean
 *               isActive:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Langue créée
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const language = await prisma.language.create({
      data: {
        id: `lang-${body.code}-${Date.now()}`,
        code: body.code,
        name: body.name,
        nativeName: body.nativeName,
        isRTL: body.isRTL || false,
        isActive: body.isActive !== undefined ? body.isActive : true,
        order: body.order || 0,
      },
    });

    return NextResponse.json(
      { success: true, data: language },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
