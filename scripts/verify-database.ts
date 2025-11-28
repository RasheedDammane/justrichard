import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verifyDatabase() {
  console.log('🔍 Vérification de la base de données...\n');

  try {
    // Vérifier les pays
    const countries = await prisma.country.findMany({
      include: {
        Currency: true
      },
      orderBy: { code: 'asc' }
    });

    console.log(`📊 ${countries.length} pays trouvés\n`);

    for (const country of countries) {
      const hasSlug = country.slug ? '✅' : '❌';
      const hasCurrency = country.currencyId ? '✅' : '❌';
      const hasDescription = country.description ? '✅' : '❌';
      
      console.log(`${country.code} - ${country.name}`);
      console.log(`   Slug: ${hasSlug} ${country.slug || 'MANQUANT'}`);
      console.log(`   Currency: ${hasCurrency} ${country.Currency?.code || 'MANQUANT'}`);
      console.log(`   Description: ${hasDescription}`);
      console.log(`   Icon: ${country.icon || 'MANQUANT'}`);
      console.log('');
    }

    // Vérifier les devises
    const currencies = await prisma.currency.findMany({
      orderBy: { code: 'asc' }
    });

    console.log(`\n💰 ${currencies.length} devises trouvées\n`);
    currencies.forEach(c => {
      console.log(`${c.code} - ${c.name} (${c.symbol})`);
    });

  } catch (error: any) {
    console.error('❌ Erreur:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

verifyDatabase();
