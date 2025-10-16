import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';

// Using exchangerate-api.com (free tier: 1500 requests/month)
const EXCHANGE_RATE_API_URL = 'https://api.exchangerate-api.com/v4/latest/';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { baseCurrencyCode } = body;

    if (!baseCurrencyCode) {
      return NextResponse.json(
        { error: 'Base currency code is required' },
        { status: 400 }
      );
    }

    // Fetch rates from API
    const response = await fetch(`${EXCHANGE_RATE_API_URL}${baseCurrencyCode}`);
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch exchange rates from API' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const rates = data.rates;

    // Get base currency from database
    const baseCurrency = await prisma.currency.findUnique({
      where: { code: baseCurrencyCode },
    });

    if (!baseCurrency) {
      return NextResponse.json(
        { error: 'Base currency not found in database' },
        { status: 404 }
      );
    }

    // Get all active currencies
    const currencies = await prisma.currency.findMany({
      where: { isActive: true },
    });

    let updatedCount = 0;
    let createdCount = 0;

    // Update or create exchange rates
    for (const currency of currencies) {
      if (currency.id === baseCurrency.id) continue;
      
      const rate = rates[currency.code];
      if (!rate) continue;

      const existing = await prisma.exchangeRate.findUnique({
        where: {
          fromCurrencyId_toCurrencyId: {
            fromCurrencyId: baseCurrency.id,
            toCurrencyId: currency.id,
          },
        },
      });

      if (existing) {
        await prisma.exchangeRate.update({
          where: { id: existing.id },
          data: {
            rate: parseFloat(rate),
            source: 'exchangerate-api',
            lastUpdated: new Date(),
          },
        });
        updatedCount++;
      } else {
        await prisma.exchangeRate.create({
          data: {
            fromCurrencyId: baseCurrency.id,
            toCurrencyId: currency.id,
            rate: parseFloat(rate),
            source: 'exchangerate-api',
          },
        });
        createdCount++;
      }

      // Also create/update reverse rate
      const reverseRate = 1 / parseFloat(rate);
      const existingReverse = await prisma.exchangeRate.findUnique({
        where: {
          fromCurrencyId_toCurrencyId: {
            fromCurrencyId: currency.id,
            toCurrencyId: baseCurrency.id,
          },
        },
      });

      if (existingReverse) {
        await prisma.exchangeRate.update({
          where: { id: existingReverse.id },
          data: {
            rate: reverseRate,
            source: 'exchangerate-api',
            lastUpdated: new Date(),
          },
        });
      } else {
        await prisma.exchangeRate.create({
          data: {
            fromCurrencyId: currency.id,
            toCurrencyId: baseCurrency.id,
            rate: reverseRate,
            source: 'exchangerate-api',
          },
        });
      }
    }

    return NextResponse.json({
      message: 'Exchange rates updated successfully',
      updated: updatedCount,
      created: createdCount,
      baseCurrency: baseCurrencyCode,
    });
  } catch (error) {
    console.error('Error updating exchange rates:', error);
    return NextResponse.json(
      { error: 'Failed to update exchange rates' },
      { status: 500 }
    );
  }
}
