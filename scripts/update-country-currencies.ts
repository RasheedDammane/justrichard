import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateCountryCurrencies() {
  console.log('Mise à jour des devises des pays...\n');

  try {
    // Récupérer toutes les devises
    const currencies = await prisma.currency.findMany();
    console.log(`${currencies.length} devises trouvées\n`);

    // Créer un mapping code -> id
    const currencyMap = new Map(currencies.map(c => [c.code, c.id]));

    // Récupérer tous les pays avec un code devise
    const countries = await prisma.country.findMany({
      where: {
        currency: { not: null },
      },
    });

    console.log(`${countries.length} pays à mettre à jour\n`);

    let updated = 0;
    let notFound = 0;

    for (const country of countries) {
      if (country.currency) {
        const currencyId = currencyMap.get(country.currency);
        
        if (currencyId) {
          await prisma.country.update({
            where: { id: country.id },
            data: { currencyId },
          });
          console.log(`Mis à jour: ${country.name} (${country.code}) -> ${country.currency}`);
          updated++;
        } else {
          console.log(`Devise non trouvée: ${country.name} (${country.code}) -> ${country.currency}`);
          notFound++;
        }
      }
    }

    console.log(`\nRésumé:`);
    console.log(`  Mis à jour: ${updated}`);
    console.log(`  Non trouvés: ${notFound}`);
    console.log(`\nTerminé!`);

  } catch (error) {
    console.error('Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateCountryCurrencies();
