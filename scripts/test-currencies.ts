import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testCurrencies() {
  console.log('🔍 Testing currencies...\n');

  try {
    // Count currencies
    const total = await prisma.currency.count();
    console.log(`📊 Total currencies: ${total}`);

    // Get all currencies
    const currencies = await prisma.currency.findMany({
      include: {
        _count: {
          select: {
            exchangeRatesFrom: true,
            exchangeRatesTo: true,
          },
        },
      },
      orderBy: { code: 'asc' },
    });

    console.log('\n📋 Currencies:');
    currencies.forEach(c => {
      console.log(`  - ${c.code} (${c.name}) ${c.symbol} - ${c.isDefault ? '⭐ DEFAULT' : ''} ${c.isActive ? '✅' : '❌'}`);
      console.log(`    Rates: ${c._count.exchangeRatesFrom} from + ${c._count.exchangeRatesTo} to`);
    });

    // Get default currency
    const defaultCurrency = await prisma.currency.findFirst({
      where: { isDefault: true },
    });
    console.log(`\n⭐ Default currency: ${defaultCurrency?.code || 'NONE'}`);

    // Count exchange rates
    const ratesCount = await prisma.exchangeRate.count();
    console.log(`\n💱 Total exchange rates: ${ratesCount}`);

    // Get some rates
    const rates = await prisma.exchangeRate.findMany({
      include: {
        fromCurrency: true,
        toCurrency: true,
      },
      take: 5,
    });

    console.log('\n📋 Sample rates:');
    rates.forEach(r => {
      console.log(`  ${r.fromCurrency.code} → ${r.toCurrency.code} = ${r.rate} (${r.source})`);
    });

    console.log('\n✅ Test completed!');
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testCurrencies();
