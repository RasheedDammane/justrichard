import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const currencies = [
  {
    id: 'curr-mad',
    code: 'MAD',
    name: 'Moroccan Dirham',
    symbol: 'DH',
    isDefault: false,
    isActive: false,
    decimalPlaces: 2,
  },
  {
    id: 'curr-usd',
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    isDefault: false,
    isActive: true,
    decimalPlaces: 2,
  },
  {
    id: 'curr-eur',
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    isDefault: false,
    isActive: true,
    decimalPlaces: 2,
  },
  {
    id: 'curr-gbp',
    code: 'GBP',
    name: 'British Pound',
    symbol: '£',
    isDefault: false,
    isActive: false,
    decimalPlaces: 2,
  },
  {
    id: 'curr-sar',
    code: 'SAR',
    name: 'Saudi Riyal',
    symbol: 'ر.س',
    isDefault: false,
    isActive: false,
    decimalPlaces: 2,
  },
  {
    id: 'curr-aed',
    code: 'AED',
    name: 'UAE Dirham',
    symbol: 'د.إ',
    isDefault: true,
    isActive: true,
    decimalPlaces: 2,
  },
  {
    id: 'curr-thb',
    code: 'THB',
    name: 'Thai Baht',
    symbol: '฿',
    isDefault: false,
    isActive: true,
    decimalPlaces: 2,
  },
  {
    id: 'curr-php',
    code: 'PHP',
    name: 'Philippine Peso',
    symbol: '₱',
    isDefault: false,
    isActive: false,
    decimalPlaces: 2,
  },
  {
    id: 'curr-qar',
    code: 'QAR',
    name: 'Qatari Riyal',
    symbol: 'ر.ق',
    isDefault: false,
    isActive: false,
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

  console.log('\n💱 Seeding exchange rates...');
  
  // Create exchange rates
  let createdRates = 0;
  for (const rate of exchangeRates) {
    const fromCurrency = await prisma.currency.findUnique({
      where: { code: rate.from },
    });
    const toCurrency = await prisma.currency.findUnique({
      where: { code: rate.to },
    });

    if (fromCurrency && toCurrency) {
      const existing = await prisma.exchangeRate.findUnique({
        where: {
          fromCurrencyId_toCurrencyId: {
            fromCurrencyId: fromCurrency.id,
            toCurrencyId: toCurrency.id,
          },
        },
      });

      if (!existing) {
        await prisma.exchangeRate.create({
          data: {
            fromCurrencyId: fromCurrency.id,
            toCurrencyId: toCurrency.id,
            rate: rate.rate,
            source: 'seed',
          },
        });
        console.log(`✅ Created rate: ${rate.from} → ${rate.to} = ${rate.rate}`);
        createdRates++;
      }
    }
  }

  console.log('\n✨ Currency seeding completed!');
  
  // Display statistics
  const stats = await prisma.currency.count();
  const activeStats = await prisma.currency.count({ where: { isActive: true } });
  const rateStats = await prisma.exchangeRate.count();
  console.log(`📊 Total currencies: ${stats} (${activeStats} active)`);
  console.log(`📊 Total exchange rates: ${rateStats}`);
}

seedCurrencies()
  .catch((error) => {
    console.error('❌ Error seeding currencies:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
