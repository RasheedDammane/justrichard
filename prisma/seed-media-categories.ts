import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding media categories...');

  const categories = [
    {
      name: 'Properties',
      slug: 'properties',
      icon: '🏠',
    },
    {
      name: 'Yachts',
      slug: 'yachts',
      icon: '⛵',
    },
    {
      name: 'Rental Cars',
      slug: 'rental-cars',
      icon: '🚗',
    },
    {
      name: 'Motorbikes',
      slug: 'motorbikes',
      icon: '🏍️',
    },
    {
      name: 'Maids',
      slug: 'maids',
      icon: '👩‍💼',
    },
    {
      name: 'Blog',
      slug: 'blog',
      icon: '📝',
    },
    {
      name: 'Activities',
      slug: 'activities',
      icon: '🎯',
    },
    {
      name: 'Transfers',
      slug: 'transfers',
      icon: '🚐',
    },
    {
      name: 'Suppliers',
      slug: 'suppliers',
      icon: '🏢',
    },
    {
      name: 'Banners',
      slug: 'banners',
      icon: '🎨',
    },
    {
      name: 'Logos',
      slug: 'logos',
      icon: '🎭',
    },
    {
      name: 'Documents',
      slug: 'documents',
      icon: '📄',
    },
    {
      name: 'Videos',
      slug: 'videos',
      icon: '🎥',
    },
    {
      name: 'Other',
      slug: 'other',
      icon: '📦',
    },
  ];

  for (const category of categories) {
    await prisma.mediaCategory.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
    console.log(`✅ Created/Updated category: ${category.name}`);
  }

  console.log('✅ Media categories seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding media categories:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
