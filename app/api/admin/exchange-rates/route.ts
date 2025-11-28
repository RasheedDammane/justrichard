import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const exchangeRates = await prisma.exchangeRate.findMany({
      include: {
        fromCurrency: true,
        toCurrency: true,
      },
      orderBy: { lastUpdated: 'desc' },
    });

    return NextResponse.json({ exchangeRates });
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch exchange rates' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { fromCurrencyId, toCurrencyId, rate, source } = body;

    if (!fromCurrencyId || !toCurrencyId || !rate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (fromCurrencyId === toCurrencyId) {
      return NextResponse.json(
        { error: 'From and To currencies must be different' },
        { status: 400 }
      );
    }

    // Check if rate already exists
    const existing = await prisma.exchangeRate.findUnique({
      where: {
        fromCurrencyId_toCurrencyId: {
          fromCurrencyId,
          toCurrencyId,
        },
      },
    });

    if (existing) {
      // Update existing rate
      const exchangeRate = await prisma.exchangeRate.update({
        where: { id: existing.id },
        data: {
          rate: parseFloat(rate),
          source: source || 'manual',
          lastUpdated: new Date(),
        },
        include: {
          fromCurrency: true,
          toCurrency: true,
        },
      });

      return NextResponse.json({ exchangeRate });
    }

    // Create new rate
    const exchangeRate = await prisma.exchangeRate.create({
      data: {
        fromCurrencyId,
        toCurrencyId,
        rate: parseFloat(rate),
        source: source || 'manual',
      },
      include: {
        fromCurrency: true,
        toCurrency: true,
      },
    });

    return NextResponse.json({ exchangeRate }, { status: 201 });
  } catch (error) {
    console.error('Error creating exchange rate:', error);
    return NextResponse.json(
      { error: 'Failed to create exchange rate' },
      { status: 500 }
    );
  }
}
