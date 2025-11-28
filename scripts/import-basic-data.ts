import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function importBasicData() {
  try {
    console.log('╔══════════════════════════════════════════════════════════════╗');
    console.log('║   📥 IMPORT PARTIEL - CHAMPS COMPATIBLES UNIQUEMENT         ║');
    console.log('╚══════════════════════════════════════════════════════════════╝\n');

    // Lire les données exportées
    const data = JSON.parse(fs.readFileSync('/tmp/justlife-data.json', 'utf-8'));

    // Import Languages (tous les champs sont compatibles)
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
          order: 0,
        },
      });
      const status = lang.isActive ? '✅' : '❌';
      console.log(`  ${status} ${lang.name} [${lang.code}]`);
    }

    // Import Currencies (champs de base uniquement)
    console.log('\n💰 Import des devises...');
    for (const curr of data.currencies) {
      await prisma.currency.upsert({
        where: { code: curr.code },
        update: {
          name: curr.name,
          symbol: curr.symbol,
          exchangeRate: 1.0, // Valeur par défaut
          isActive: curr.isActive,
          updatedAt: new Date(),
        },
        create: {
          id: curr.id,
          code: curr.code,
          name: curr.name,
          symbol: curr.symbol,
          exchangeRate: 1.0,
          isActive: curr.isActive,
          updatedAt: new Date(),
        },
      });
      const status = curr.isActive ? '✅' : '❌';
      console.log(`  ${status} ${curr.code} - ${curr.name} (${curr.symbol})`);
    }

    // Import Countries (champs de base uniquement)
    console.log('\n🌍 Import des pays...');
    for (const country of data.countries) {
      await prisma.country.upsert({
        where: { code: country.code },
        update: {
          name: country.name,
          flag: country.flag || null,
          isActive: country.isActive,
          updatedAt: new Date(),
        },
        create: {
          id: country.id,
          code: country.code,
          name: country.name,
          flag: country.flag || null,
          isActive: country.isActive,
          updatedAt: new Date(),
        },
      });
      const status = country.isActive ? '✅' : '❌';
      console.log(`  ${status} ${country.flag || '🌍'} ${country.name} [${country.code}]`);
    }

    // Import Cities (champs compatibles uniquement)
    console.log('\n🏙️ Import des villes...');
    let cityCount = 0;
    let citySkipped = 0;
    for (const city of data.cities) {
      try {
        await prisma.city.upsert({
          where: { id: city.id },
          update: {
            name: city.name,
            slug: city.slug || city.name.toLowerCase().replace(/\s+/g, '-'),
            countryId: city.countryId,
            regionId: city.regionId || null,
            isActive: city.isActive,
            latitude: city.latitude || null,
            longitude: city.longitude || null,
            updatedAt: new Date(),
          },
          create: {
            id: city.id,
            name: city.name,
            slug: city.slug || city.name.toLowerCase().replace(/\s+/g, '-'),
            countryId: city.countryId,
            regionId: city.regionId || null,
            isActive: city.isActive,
            latitude: city.latitude || null,
            longitude: city.longitude || null,
            updatedAt: new Date(),
          },
        });
        cityCount++;
        if (cityCount % 10 === 0) {
          console.log(`  ✅ ${cityCount} villes importées...`);
        }
      } catch (error: any) {
        citySkipped++;
        if (citySkipped <= 5) {
          console.log(`  ⚠️ Ignorée: ${city.name} (${error.message})`);
        }
      }
    }
    console.log(`  ✅ Total: ${cityCount} villes importées, ${citySkipped} ignorées`);

    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('📊 RÉSUMÉ DE L\'IMPORTATION:');
    console.log('═══════════════════════════════════════════════════════════════\n');
    console.log(`✅ Languages:  ${data.languages.length} importées`);
    console.log(`✅ Currencies: ${data.currencies.length} importées`);
    console.log(`✅ Countries:  ${data.countries.length} importés`);
    console.log(`✅ Cities:     ${cityCount} importées (${citySkipped} ignorées)`);
    
    console.log('\n⚠️ CHAMPS NON IMPORTÉS (incompatibles):');
    console.log('   • Country: traductions (16), SEO, médias, métadonnées');
    console.log('   • Currency: isDefault, decimalPlaces, ExchangeRate');
    console.log('   • City: traductions (16), SEO, médias, districtId');
    
    console.log('\n✨ Importation terminée avec succès!\n');

  } catch (error: any) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

importBasicData();
