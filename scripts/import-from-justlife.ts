import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function importData() {
  try {
    console.log('📥 Importation des données depuis JUSTLIFE...\n');

    // Lire les données exportées
    const data = JSON.parse(fs.readFileSync('/tmp/justlife-data.json', 'utf-8'));

    // Import Languages
    console.log('🗣️ Import des langues...');
    for (const lang of data.languages) {
      await prisma.language.upsert({
        where: { code: lang.code },
        update: {
          name: lang.name,
          nativeName: lang.nativeName,
          isRTL: lang.isRTL || false,
          isActive: lang.isActive,
        },
        create: {
          id: lang.id,
          code: lang.code,
          name: lang.name,
          nativeName: lang.nativeName,
          isRTL: lang.isRTL || false,
          isActive: lang.isActive,
          order: lang.order || 0,
        },
      });
      console.log(`  ✅ ${lang.name} [${lang.code}]`);
    }

    // Import Currencies
    console.log('\n💰 Import des devises...');
    for (const curr of data.currencies) {
      await prisma.currency.upsert({
        where: { code: curr.code },
        update: {
          name: curr.name,
          symbol: curr.symbol,
          exchangeRate: curr.exchangeRate || 1,
          isActive: curr.isActive,
          updatedAt: new Date(),
        },
        create: {
          id: curr.id,
          code: curr.code,
          name: curr.name,
          symbol: curr.symbol,
          exchangeRate: curr.exchangeRate || 1,
          isActive: curr.isActive,
          updatedAt: new Date(),
        },
      });
      console.log(`  ✅ ${curr.code} - ${curr.name}`);
    }

    // Import Countries
    console.log('\n🌍 Import des pays...');
    for (const country of data.countries) {
      await prisma.country.upsert({
        where: { code: country.code },
        update: {
          name: country.name,
          flag: country.flag,
          isActive: country.isActive,
          latitude: country.latitude || null,
          longitude: country.longitude || null,
          updatedAt: new Date(),
        },
        create: {
          id: country.id,
          code: country.code,
          name: country.name,
          flag: country.flag,
          isActive: country.isActive,
          latitude: country.latitude || null,
          longitude: country.longitude || null,
          updatedAt: new Date(),
        },
      });
      console.log(`  ✅ ${country.flag} ${country.name} [${country.code}]`);
    }

    // Import Cities
    console.log('\n🏙️ Import des villes...');
    let cityCount = 0;
    for (const city of data.cities) {
      try {
        await prisma.city.upsert({
          where: { id: city.id },
          update: {
            name: city.name,
            slug: city.slug,
            countryId: city.countryId,
            isActive: city.isActive,
            latitude: city.latitude,
            longitude: city.longitude,
          },
          create: {
            id: city.id,
            name: city.name,
            slug: city.slug,
            countryId: city.countryId,
            isActive: city.isActive,
            latitude: city.latitude,
            longitude: city.longitude,
          },
        });
        cityCount++;
        if (cityCount % 10 === 0) {
          console.log(`  ✅ ${cityCount} villes importées...`);
        }
      } catch (error) {
        console.log(`  ⚠️ Erreur pour ${city.name}: ${error.message}`);
      }
    }
    console.log(`  ✅ Total: ${cityCount} villes importées`);

    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('📊 RÉSUMÉ DE L\'IMPORTATION:');
    console.log('═══════════════════════════════════════════════════════════════\n');
    console.log(`Languages:  ${data.languages.length} importées`);
    console.log(`Currencies: ${data.currencies.length} importées`);
    console.log(`Countries:  ${data.countries.length} importés`);
    console.log(`Cities:     ${cityCount} importées`);
    console.log('\n✨ Importation terminée avec succès!\n');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

importData();
