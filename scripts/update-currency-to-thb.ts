import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('💱 Updating currency from USD to THB...\n');

  // Get THB currency
  const thb = await prisma.currency.findFirst({ where: { code: 'THB' } });
  
  if (!thb) {
    console.log('❌ THB currency not found in database!');
    console.log('Please create THB currency first.');
    return;
  }

  console.log(`✅ Found THB currency: ${thb.name} (${thb.code})\n`);

  // Update all imported properties
  const result = await prisma.property.updateMany({
    where: {
      id: { startsWith: 'import-' },
    },
    data: {
      priceCurrencyId: thb.id,
    },
  });

  console.log(`✅ Updated ${result.count} properties to use THB\n`);
  
  // Verify
  const sample = await prisma.property.findFirst({
    where: { id: { startsWith: 'import-' } },
    include: { priceCurrency: true },
  });

  if (sample) {
    console.log('📊 Sample property:');
    console.log(`  Title: ${sample.title}`);
    console.log(`  Price: ${sample.price?.toLocaleString()}`);
    console.log(`  Currency: ${sample.priceCurrency?.code} (${sample.priceCurrency?.symbol})`);
  }
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
