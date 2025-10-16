import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('activeOnly') === 'true';

    let whereClause: any = {};
    if (activeOnly) {
      whereClause.isActive = true;
    }

    const currencies = await prisma.currency.findMany({
      where: whereClause,
      orderBy: { code: 'asc' },
      include: {
        exchangeRatesFrom: {
          include: {
            toCurrency: true,
          },
        },
      },
    });

    const defaultCurrency = currencies.find(c => c.isDefault);

    return NextResponse.json({ 
      currencies,
      defaultCurrency,
    });
  } catch (error) {
    console.error('Error fetching currencies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch currencies' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { code, name, symbol, isActive, isDefault, decimalPlaces } = body;

    if (!code || !name || !symbol) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if code already exists
    const existing = await prisma.currency.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Une devise avec ce code existe déjà' },
        { status: 400 }
      );
    }

    // If setting as default, unset other defaults
    if (isDefault) {
      await prisma.currency.updateMany({
        where: { isDefault: true },
        data: { isDefault: false },
      });
    }

    const currency = await prisma.currency.create({
      data: {
        code: code.toUpperCase(),
        name,
        symbol,
        isActive: isActive ?? true,
        isDefault: isDefault ?? false,
        decimalPlaces: decimalPlaces ?? 2,
      },
    });

    return NextResponse.json({ currency }, { status: 201 });
  } catch (error) {
    console.error('Error creating currency:', error);
    return NextResponse.json(
      { error: 'Failed to create currency' },
      { status: 500 }
    );
  }
}
