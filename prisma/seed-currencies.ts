import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const currencies = [
  {
    code: 'MAD',
    name: 'Moroccan Dirham',
    symbol: 'DH',
    isDefault: true,
    isActive: true,
    decimalPlaces: 2,
  },
  {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    isDefault: false,
    isActive: true,
    decimalPlaces: 2,
  },
  {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    isDefault: false,
    isActive: true,
    decimalPlaces: 2,
  },
  {
    code: 'GBP',
    name: 'British Pound',
    symbol: '£',
    isDefault: false,
    isActive: true,
    decimalPlaces: 2,
  },
  {
    code: 'SAR',
    name: 'Saudi Riyal',
    symbol: 'ر.س',
    isDefault: false,
    isActive: true,
    decimalPlaces: 2,
  },
  {
    code: 'AED',
    name: 'UAE Dirham',
    symbol: 'د.إ',
    isDefault: false,
    isActive: true,
    decimalPlaces: 2,
  },
  {
    code: 'THB',
    name: 'Thai Baht',
    symbol: '฿',
    isDefault: false,
    isActive: true,
    decimalPlaces: 2,
  },
  {
    code: 'PHP',
    name: 'Philippine Peso',
    symbol: '₱',
    isDefault: false,
    isActive: true,
    decimalPlaces: 2,
  },
  {
    code: 'QAR',
    name: 'Qatari Riyal',
    symbol: 'ر.ق',
    isDefault: false,
    isActive: true,
    decimalPlaces: 2,
  },
];

// Example exchange rates (MAD as base)
const exchangeRates = [
  { from: 'MAD', to: 'USD', rate: 0.10 },
  { from: 'MAD', to: 'EUR', rate: 0.093 },
  { from: 'MAD', to: 'GBP', rate: 0.079 },
  { from: 'MAD', to: 'SAR', rate: 0.38 },
  { from: 'MAD', to: 'AED', rate: 0.37 },
  { from: 'MAD', to: 'THB', rate: 3.50 },
  { from: 'MAD', to: 'PHP', rate: 5.80 },
  { from: 'MAD', to: 'QAR', rate: 0.36 },
  
  // Reverse rates
  { from: 'USD', to: 'MAD', rate: 10.0 },
  { from: 'EUR', to: 'MAD', rate: 10.75 },
  { from: 'GBP', to: 'MAD', rate: 12.66 },
  { from: 'SAR', to: 'MAD', rate: 2.63 },
  { from: 'AED', to: 'MAD', rate: 2.70 },
];

async function seedCurrencies() {
  console.log('🌍 Seeding currencies...');

  // Create currencies
  for (const currency of currencies) {
    const existing = await prisma.currency.findUnique({
      where: { code: currency.code },
    });

    if (!existing) {
      await prisma.currency.create({
        data: currency,
      });
      console.log(`✅ Created currency: ${currency.code}`);
    } else {
      console.log(`⏭️  Currency already exists: ${currency.code}`);
    }
  }

  // Get all created currencies
  const allCurrencies = await prisma.currency.findMany();
  const currencyMap = new Map(allCurrencies.map(c => [c.code, c.id]));

  // Create exchange rates
  console.log('\n💱 Seeding exchange rates...');
  for (const rate of exchangeRates) {
    const fromId = currencyMap.get(rate.from);
    const toId = currencyMap.get(rate.to);

    if (!fromId || !toId) {
      console.log(`⚠️  Skipping rate ${rate.from} -> ${rate.to}: Currency not found`);
      continue;
    }

    const existing = await prisma.exchangeRate.findUnique({
      where: {
        fromCurrencyId_toCurrencyId: {
          fromCurrencyId: fromId,
          toCurrencyId: toId,
        },
      },
    });

    if (!existing) {
      await prisma.exchangeRate.create({
        data: {
          fromCurrencyId: fromId,
          toCurrencyId: toId,
          rate: rate.rate,
          source: 'seed',
        },
      });
      console.log(`✅ Created exchange rate: ${rate.from} -> ${rate.to} (${rate.rate})`);
    } else {
      console.log(`⏭️  Exchange rate already exists: ${rate.from} -> ${rate.to}`);
    }
  }

  console.log('\n✨ Currency seeding completed!');
}

seedCurrencies()
  .catch((error) => {
    console.error('❌ Error seeding currencies:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
