import { prisma } from './prisma';

/**
 * Convert amount from one currency to another
 */
export async function convertCurrency(
  amount: number,
  fromCode: string,
  toCode: string
): Promise<number | null> {
  try {
    if (fromCode === toCode) {
      return amount;
    }

    // Get currencies
    const [fromCurrency, toCurrency] = await Promise.all([
      prisma.currency.findUnique({ where: { code: fromCode } }),
      prisma.currency.findUnique({ where: { code: toCode } }),
    ]);

    if (!fromCurrency || !toCurrency) {
      console.error('Currency not found');
      return null;
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
      console.error('Exchange rate not found');
      return null;
    }

    const convertedAmount = amount * exchangeRate.rate;
    return parseFloat(convertedAmount.toFixed(toCurrency.decimalPlaces));
  } catch (error) {
    console.error('Error converting currency:', error);
    return null;
  }
}

/**
 * Get default currency
 */
export async function getDefaultCurrency() {
  try {
    const currency = await prisma.currency.findFirst({
      where: { isDefault: true },
    });
    return currency;
  } catch (error) {
    console.error('Error getting default currency:', error);
    return null;
  }
}

/**
 * Get all active currencies
 */
export async function getActiveCurrencies() {
  try {
    const currencies = await prisma.currency.findMany({
      where: { isActive: true },
      orderBy: { code: 'asc' },
    });
    return currencies;
  } catch (error) {
    console.error('Error getting active currencies:', error);
    return [];
  }
}

/**
 * Format amount with currency symbol
 */
export function formatCurrency(
  amount: number,
  currencyCode: string,
  currencySymbol: string,
  decimalPlaces: number = 2
): string {
  const formattedAmount = amount.toFixed(decimalPlaces);
  
  // For currencies like USD, EUR - symbol before amount
  if (['USD', 'EUR', 'GBP'].includes(currencyCode)) {
    return `${currencySymbol}${formattedAmount}`;
  }
  
  // For currencies like MAD, JPY - symbol after amount
  return `${formattedAmount} ${currencySymbol}`;
}

/**
 * Get exchange rate between two currencies
 */
export async function getExchangeRate(
  fromCode: string,
  toCode: string
): Promise<number | null> {
  try {
    if (fromCode === toCode) {
      return 1;
    }

    const [fromCurrency, toCurrency] = await Promise.all([
      prisma.currency.findUnique({ where: { code: fromCode } }),
      prisma.currency.findUnique({ where: { code: toCode } }),
    ]);

    if (!fromCurrency || !toCurrency) {
      return null;
    }

    const exchangeRate = await prisma.exchangeRate.findUnique({
      where: {
        fromCurrencyId_toCurrencyId: {
          fromCurrencyId: fromCurrency.id,
          toCurrencyId: toCurrency.id,
        },
      },
    });

    return exchangeRate?.rate || null;
  } catch (error) {
    console.error('Error getting exchange rate:', error);
    return null;
  }
}
