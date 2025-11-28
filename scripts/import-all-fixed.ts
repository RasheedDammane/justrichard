import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function importAllFixed() {
  try {
    console.log('╔══════════════════════════════════════════════════════════════╗');
    console.log('║   📥 IMPORT COMPLET CORRIGÉ - TOUTES LES DONNÉES            ║');
    console.log('╚══════════════════════════════════════════════════════════════╝\n');

    const data = JSON.parse(fs.readFileSync('/tmp/justlife-data-full.json', 'utf-8'));

    // 1. Import Languages
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
    }
    console.log(`  ✅ ${data.languages.length} langues importées`);

    // 2. Import Currencies
    console.log('\n💰 Import des devises...');
    for (const curr of data.currencies) {
      await prisma.currency.upsert({
        where: { code: curr.code },
        update: {
          name: curr.name,
          symbol: curr.symbol,
          exchangeRate: 1.0,
          isActive: curr.isActive,
          isDefault: curr.isDefault || false,
          decimalPlaces: curr.decimalPlaces || 2,
          updatedAt: new Date(),
        },
        create: {
          id: curr.id,
          code: curr.code,
          name: curr.name,
          symbol: curr.symbol,
          exchangeRate: 1.0,
          isActive: curr.isActive,
          isDefault: curr.isDefault || false,
          decimalPlaces: curr.decimalPlaces || 2,
          updatedAt: new Date(),
        },
      });
    }
    console.log(`  ✅ ${data.currencies.length} devises importées`);

    // 3. Import Countries avec mapping
    console.log('\n🌍 Import des pays avec traductions...');
    const countryIdMapping: Record<string, string> = {};
    
    for (const country of data.countries) {
      const result = await prisma.country.upsert({
        where: { code: country.code },
        update: {
          name: country.name,
          nameAr: country.nameAr || null,
          nameFr: country.nameFr || null,
          nameTh: country.nameTh || null,
          nameRu: country.nameRu || null,
          nameKo: country.nameKo || null,
          nameEs: country.nameEs || null,
          nameVi: country.nameVi || null,
          nameTl: country.nameTl || null,
          nameIt: country.nameIt || null,
          nameNo: country.nameNo || null,
          nameTr: country.nameTr || null,
          namePt: country.namePt || null,
          nameAf: country.nameAf || null,
          nameJa: country.nameJa || null,
          nameDe: country.nameDe || null,
          slug: country.slug || null,
          description: country.description || null,
          dialCode: country.dialCode || null,
          currency: country.currency || null,
          flag: country.flag || null,
          icon: country.icon || null,
          thumbnail: country.thumbnail || null,
          images: country.images || [],
          latitude: country.latitude || null,
          longitude: country.longitude || null,
          metaTitle: country.metaTitle || null,
          metaDescription: country.metaDescription || null,
          keywords: country.keywords || [],
          isActive: country.isActive,
          updatedAt: new Date(),
        },
        create: {
          id: country.id,
          code: country.code,
          name: country.name,
          nameAr: country.nameAr || null,
          nameFr: country.nameFr || null,
          nameTh: country.nameTh || null,
          nameRu: country.nameRu || null,
          nameKo: country.nameKo || null,
          nameEs: country.nameEs || null,
          nameVi: country.nameVi || null,
          nameTl: country.nameTl || null,
          nameIt: country.nameIt || null,
          nameNo: country.nameNo || null,
          nameTr: country.nameTr || null,
          namePt: country.namePt || null,
          nameAf: country.nameAf || null,
          nameJa: country.nameJa || null,
          nameDe: country.nameDe || null,
          slug: country.slug || null,
          description: country.description || null,
          dialCode: country.dialCode || null,
          currency: country.currency || null,
          flag: country.flag || null,
          icon: country.icon || null,
          thumbnail: country.thumbnail || null,
          images: country.images || [],
          latitude: country.latitude || null,
          longitude: country.longitude || null,
          metaTitle: country.metaTitle || null,
          metaDescription: country.metaDescription || null,
          keywords: country.keywords || [],
          isActive: country.isActive,
          updatedAt: new Date(),
        },
      });
      countryIdMapping[country.id] = result.id;
    }
    console.log(`  ✅ ${data.countries.length} pays importés`);

    // 4. Import Cities avec mapping des IDs
    console.log('\n🏙️ Import des villes avec traductions...');
    let cityCount = 0;
    let citySkipped = 0;
    
    for (const city of data.cities) {
      try {
        // Mapper l'ancien countryId au nouveau
        const newCountryId = countryIdMapping[city.countryId] || city.countryId;
        
        await prisma.city.upsert({
          where: { id: city.id },
          update: {
            name: city.name,
            nameAr: city.nameAr || null,
            nameFr: city.nameFr || null,
            nameTh: city.nameTh || null,
            nameRu: city.nameRu || null,
            nameKo: city.nameKo || null,
            nameEs: city.nameEs || null,
            nameVi: city.nameVi || null,
            nameTl: city.nameTl || null,
            nameIt: city.nameIt || null,
            nameNo: city.nameNo || null,
            nameTr: city.nameTr || null,
            namePt: city.namePt || null,
            nameAf: city.nameAf || null,
            nameJa: city.nameJa || null,
            nameDe: city.nameDe || null,
            slug: city.slug || city.name.toLowerCase().replace(/\\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
            description: city.description || null,
            countryId: newCountryId,
            regionId: city.regionId || null,
            districtId: city.districtId || null,
            latitude: city.latitude || null,
            longitude: city.longitude || null,
            icon: city.icon || null,
            thumbnail: city.thumbnail || null,
            images: city.images || [],
            metaTitle: city.metaTitle || null,
            metaDescription: city.metaDescription || null,
            keywords: city.keywords || [],
            isActive: city.isActive,
            updatedAt: new Date(),
          },
          create: {
            id: city.id,
            name: city.name,
            nameAr: city.nameAr || null,
            nameFr: city.nameFr || null,
            nameTh: city.nameTh || null,
            nameRu: city.nameRu || null,
            nameKo: city.nameKo || null,
            nameEs: city.nameEs || null,
            nameVi: city.nameVi || null,
            nameTl: city.nameTl || null,
            nameIt: city.nameIt || null,
            nameNo: city.nameNo || null,
            nameTr: city.nameTr || null,
            namePt: city.namePt || null,
            nameAf: city.nameAf || null,
            nameJa: city.nameJa || null,
            nameDe: city.nameDe || null,
            slug: city.slug || city.name.toLowerCase().replace(/\\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
            description: city.description || null,
            countryId: newCountryId,
            regionId: city.regionId || null,
            districtId: city.districtId || null,
            latitude: city.latitude || null,
            longitude: city.longitude || null,
            icon: city.icon || null,
            thumbnail: city.thumbnail || null,
            images: city.images || [],
            metaTitle: city.metaTitle || null,
            metaDescription: city.metaDescription || null,
            keywords: city.keywords || [],
            isActive: city.isActive,
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
          console.log(`  ⚠️ ${city.name}: ${error.message.substring(0, 80)}`);
        }
      }
    }
    console.log(`  ✅ Total: ${cityCount} villes importées, ${citySkipped} ignorées`);

    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('📊 RÉSUMÉ FINAL:');
    console.log('═══════════════════════════════════════════════════════════════\n');
    console.log(`✅ Languages:  ${data.languages.length} / ${data.languages.length}`);
    console.log(`✅ Currencies: ${data.currencies.length} / ${data.currencies.length}`);
    console.log(`✅ Countries:  ${data.countries.length} / ${data.countries.length}`);
    console.log(`✅ Cities:     ${cityCount} / ${data.cities.length} (${citySkipped} ignorées)`);
    
    console.log('\n🎉 Import terminé avec succès!\n');

  } catch (error: any) {
    console.error('❌ Erreur:', error.message);
    console.error(error.stack);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

importAllFixed();
