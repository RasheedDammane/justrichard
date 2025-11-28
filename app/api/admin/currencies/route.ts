import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/admin/currencies:
 *   get:
 *     summary: Liste toutes les devises
 *     tags: [Admin - Currencies]
 *     responses:
 *       200:
 *         description: Liste des devises
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || 'all';

    let whereClause: any = {};
    
    if (search) {
      whereClause.OR = [
        { code: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (status === 'active') {
      whereClause.isActive = true;
    } else if (status === 'inactive') {
      whereClause.isActive = false;
    }

    const [currencies, total, active, defaultCurrency] = await Promise.all([
      prisma.currency.findMany({
        where: whereClause,
        include: {
          _count: {
            select: {
              exchangeRatesFrom: true,
              exchangeRatesTo: true,
            },
          },
        },
        orderBy: [
          { displayOrder: 'asc' },
          { code: 'asc' },
        ],
      }),
      prisma.currency.count(),
      prisma.currency.count({ where: { isActive: true } }),
      prisma.currency.findFirst({ where: { isDefault: true } }),
    ]);

    return NextResponse.json({ 
      currencies: currencies.map(c => ({
        ...c,
        exchangeRatesCount: c._count.exchangeRatesFrom + c._count.exchangeRatesTo,
      })),
      stats: {
        total,
        active,
        inactive: total - active,
        defaultCurrency: defaultCurrency ? {
          code: defaultCurrency.code,
          name: defaultCurrency.name,
        } : null,
      },
    });
  } catch (error) {
    console.error('Error fetching currencies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch currencies' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/admin/currencies:
 *   post:
 *     summary: Créer une nouvelle devise
 *     tags: [Admin - Currencies]
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, name, symbol, isActive, isDefault, decimalPlaces, exchangeRate } = body;

    if (!code || !name || !symbol) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if code already exists
    const existing = await prisma.currency.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Une devise avec ce code existe déjà' },
        { status: 400 }
      );
    }

    const currency = await prisma.currency.create({
      data: {
        id: `currency-${code.toLowerCase()}-${Date.now()}`,
        code: code.toUpperCase(),
        name,
        symbol,
        exchangeRate: exchangeRate || 1.0,
        isActive: isActive ?? true,
        isDefault: isDefault ?? false,
        decimalPlaces: decimalPlaces ?? 2,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, data: currency }, { status: 201 });
  } catch (error) {
    console.error('Error creating currency:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create currency' },
      { status: 500 }
    );
  }
}
