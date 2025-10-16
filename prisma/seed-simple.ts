import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Quick seed for testing...');

  // Get first city
  const city = await prisma.city.findFirst();
  const country = await prisma.country.findFirst();

  if (!city || !country) {
    console.error('❌ No cities/countries found. Run seed-geography first');
    return;
  }

  // Create test users
  console.log('👥 Creating test users...');
  const users = [];
  for (let i = 1; i <= 10; i++) {
    const user = await prisma.user.upsert({
      where: { email: `test${i}@communityhub.com` },
      update: {},
      create: {
        email: `test${i}@communityhub.com`,
        name: `Test User ${i}`,
        role: 'PROVIDER',
      },
    });
    users.push(user);
  }

  console.log(`✅ Created ${users.length} users`);
  console.log('✅ Seed completed! Test the APIs now.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
