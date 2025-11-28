import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🇹🇭 Starting Thailand seeding...');

  // Create Thailand
  const thailand = await prisma.country.upsert({
    where: { id: 'country-thailand' },
    update: {},
    create: {
      id: 'country-thailand',
      name: 'Thailand',
      code: 'TH',
      flag: '🇹🇭',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  console.log(`✅ Created/Updated: ${thailand.name}`);

  // Create Bangkok
  const bangkok = await prisma.city.upsert({
    where: { id: 'city-bangkok' },
    update: {},
    create: {
      id: 'city-bangkok',
      countryId: thailand.id,
      name: 'Bangkok',
      slug: 'bangkok',
      latitude: 13.7563,
      longitude: 100.5018,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  console.log(`✅ Created/Updated: ${bangkok.name}`);

  // Create Pattaya
  const pattaya = await prisma.city.upsert({
    where: { id: 'city-pattaya' },
    update: {},
    create: {
      id: 'city-pattaya',
      countryId: thailand.id,
      name: 'Pattaya',
      slug: 'pattaya',
      latitude: 12.9236,
      longitude: 100.8825,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  console.log(`✅ Created/Updated: ${pattaya.name}`);

  console.log('🎉 Thailand seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding Thailand:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
