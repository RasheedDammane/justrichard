import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkAndFixCountries() {
  console.log('🔍 Vérification du schéma Country...\n');

  try {
    // 1. Vérifier les pays existants
    const countries = await prisma.country.findMany({
      take: 3,
    });

    console.log(`✅ ${countries.length} pays trouvés`);
    console.log('Premier pays:', JSON.stringify(countries[0], null, 2));
    console.log('\n');

    // 2. Récupérer les devises
    const currencies = await prisma.currency.findMany();
    console.log(`✅ ${currencies.length} devises trouvées\n`);

    const currencyMap = new Map(currencies.map(c => [c.code, c.id]));

    // 3. Mettre à jour tous les pays avec leurs devises
    console.log('📝 Mise à jour des pays avec currencyId...\n');

    for (const country of countries) {
      if (country.currency && !country.currencyId) {
        const currencyId = currencyMap.get(country.currency);
        if (currencyId) {
          await prisma.country.update({
            where: { id: country.id },
            data: { currencyId },
          });
          console.log(`✅ ${country.name} -> ${country.currency} (${currencyId})`);
        }
      }
    }

    console.log('\n✨ Terminé!');

  } catch (error: any) {
    console.error('❌ Erreur:', error.message);
    console.error('\nDétails:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAndFixCountries();
