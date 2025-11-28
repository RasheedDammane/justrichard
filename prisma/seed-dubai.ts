import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌍 Creating UAE and Dubai...');

  // Create UAE
  const uae = await prisma.country.upsert({
    where: { code: 'AE' },
    update: {},
    create: {
      id: 'country-uae',
      code: 'AE',
      name: 'United Arab Emirates',
      flag: '🇦🇪',
      isActive: true,
      updatedAt: new Date(),
    },
  });
  console.log('✅ Created UAE');

  // Create Dubai
  const dubai = await prisma.city.upsert({
    where: {
      countryId_slug: {
        countryId: uae.id,
        slug: 'dubai',
      },
    },
    update: {},
    create: {
      id: 'city-dubai',
      countryId: uae.id,
      name: 'Dubai',
      slug: 'dubai',
      latitude: 25.2048,
      longitude: 55.2708,
      isActive: true,
      updatedAt: new Date(),
    },
  });
  console.log('✅ Created Dubai');

  console.log('✅ UAE and Dubai created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
