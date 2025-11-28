import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check() {
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
    },
  });

  console.log('\n=== PROPERTY CHECK ===');
  console.log('Title:', property?.title);
  console.log('Slug:', property?.slug);
  console.log('Media count:', property?.media.length || 0);
  console.log('Features count:', property?.features.length || 0);
  console.log('Latitude:', property?.latitude);
  console.log('Longitude:', property?.longitude);
  console.log('Bedrooms:', property?.bedrooms);
  console.log('Bathrooms:', property?.bathrooms);
  console.log('Area:', property?.areaSize, property?.areaUnit);
  
  if (property?.media && property.media.length > 0) {
    console.log('\n=== IMAGES ===');
    property.media.slice(0, 3).forEach((pm, i) => {
      console.log(`Image ${i + 1}:`, pm.media.url);
    });
  } else {
    console.log('\n⚠️  NO IMAGES FOUND!');
  }

  if (property?.features && property.features.length > 0) {
    console.log('\n=== FEATURES ===');
    property.features.slice(0, 5).forEach((pf) => {
      console.log('-', pf.feature.name);
    });
  } else {
    console.log('\n⚠️  NO FEATURES FOUND!');
  }
}

check().finally(() => prisma.$disconnect());
