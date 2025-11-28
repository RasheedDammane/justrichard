import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function verify() {
  console.log('\n🔍 VERIFICATION DES PROPERTIES IMPORTÉES\n');

  // Count total properties
  const total = await prisma.property.count({
    where: { id: { startsWith: 'import-' } },
  });

  console.log(`📊 Total properties importées: ${total}\n`);

  // Get one property with all relations
  const property = await prisma.property.findFirst({
    where: { id: { startsWith: 'import-' } },
    include: {
      media: {
        include: { media: true },
        orderBy: { order: 'asc' },
      },
      features: {
        include: { feature: true },
      },
      city: true,
      country: true,
      priceCurrency: true,
    },
  });

  if (!property) {
    console.log('❌ Aucune property trouvée!');
    return;
  }

  console.log('=== EXEMPLE DE PROPERTY ===');
  console.log(`Title: ${property.title}`);
  console.log(`Slug: ${property.slug}`);
  console.log(`Status: ${property.status}`);
  console.log(`Type: ${property.type}`);
  console.log(`\n📍 LOCATION:`);
  console.log(`  Address: ${property.addressLine1 || 'N/A'}`);
  console.log(`  City: ${property.city?.name || 'N/A'}`);
  console.log(`  Country: ${property.country?.name || 'N/A'}`);
  console.log(`  Coordinates: ${property.latitude}, ${property.longitude}`);
  
  console.log(`\n🏠 DETAILS:`);
  console.log(`  Bedrooms: ${property.bedrooms || 'N/A'}`);
  console.log(`  Bathrooms: ${property.bathrooms || 'N/A'}`);
  console.log(`  Area: ${property.areaSize || 'N/A'} ${property.areaUnit}`);
  
  console.log(`\n💰 PRICE:`);
  console.log(`  Price: ${property.price || 'N/A'}`);
  console.log(`  Currency: ${property.priceCurrency?.code || 'N/A'}`);
  console.log(`  Postfix: ${property.pricePostfix || 'N/A'}`);
  
  console.log(`\n📸 MEDIA:`);
  console.log(`  Total images: ${property.media.length}`);
  if (property.media.length > 0) {
    console.log(`  ✅ GALERIE PHOTOS OK!`);
    property.media.slice(0, 3).forEach((pm, i) => {
      console.log(`    ${i + 1}. ${pm.media.filename} ${pm.isCover ? '(COVER)' : ''}`);
    });
  } else {
    console.log(`  ❌ PAS D'IMAGES!`);
  }
  
  console.log(`\n🎯 FEATURES:`);
  console.log(`  Total features: ${property.features.length}`);
  if (property.features.length > 0) {
    console.log(`  ✅ FEATURES OK!`);
    property.features.slice(0, 5).forEach((pf) => {
      console.log(`    - ${pf.feature.name}`);
    });
  } else {
    console.log(`  ⚠️  PAS DE FEATURES (à importer)`);
  }

  // Count properties with media
  const withMedia = await prisma.property.count({
    where: {
      id: { startsWith: 'import-' },
      media: { some: {} },
    },
  });

  // Count properties without media
  const withoutMedia = total - withMedia;

  console.log('\n=== STATISTIQUES GLOBALES ===');
  console.log(`✅ Properties avec images: ${withMedia}`);
  console.log(`❌ Properties sans images: ${withoutMedia}`);
  
  if (withMedia === total) {
    console.log('\n🎉 TOUTES LES PROPERTIES ONT DES IMAGES!');
  }

  // Count total images
  const totalImages = await prisma.propertyMedia.count({
    where: {
      property: { id: { startsWith: 'import-' } },
    },
  });

  console.log(`\n📸 Total images importées: ${totalImages}`);
  console.log(`📊 Moyenne: ${(totalImages / total).toFixed(1)} images/property`);

  console.log('\n=== URLS POUR TESTER ===');
  console.log(`Admin:  http://localhost:3100/en/admin/properties`);
  console.log(`Liste:  http://localhost:3100/en/properties`);
  console.log(`Détail: http://localhost:3100/en/properties/${property.slug}`);
  console.log('');
}

verify()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
