import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const amount = parseFloat(searchParams.get('amount') || '0');
    const fromCode = searchParams.get('from');
    const toCode = searchParams.get('to');

    if (!amount || !fromCode || !toCode) {
      return NextResponse.json(
        { error: 'Missing required parameters: amount, from, to' },
        { status: 400 }
      );
    }

    if (fromCode === toCode) {
      return NextResponse.json({
        amount,
        convertedAmount: amount,
        fromCurrency: fromCode,
        toCurrency: toCode,
        rate: 1,
      });
    }

    // Get currencies
    const [fromCurrency, toCurrency] = await Promise.all([
      prisma.currency.findUnique({ where: { code: fromCode } }),
      prisma.currency.findUnique({ where: { code: toCode } }),
    ]);

    if (!fromCurrency || !toCurrency) {
      return NextResponse.json(
        { error: 'Currency not found' },
        { status: 404 }
      );
    }

    // Get exchange rate
    const exchangeRate = await prisma.exchangeRate.findUnique({
      where: {
        fromCurrencyId_toCurrencyId: {
          fromCurrencyId: fromCurrency.id,
          toCurrencyId: toCurrency.id,
        },
      },
    });

    if (!exchangeRate) {
      return NextResponse.json(
        { error: 'Exchange rate not found' },
        { status: 404 }
      );
    }

    const convertedAmount = amount * exchangeRate.rate;

    return NextResponse.json({
      amount,
      convertedAmount: parseFloat(convertedAmount.toFixed(toCurrency.decimalPlaces)),
      fromCurrency: fromCode,
      toCurrency: toCode,
      rate: exchangeRate.rate,
      lastUpdated: exchangeRate.lastUpdated,
    });
  } catch (error) {
    console.error('Error converting currency:', error);
    return NextResponse.json(
      { error: 'Failed to convert currency' },
      { status: 500 }
    );
  }
}
