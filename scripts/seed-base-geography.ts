import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌍 Seeding base geography...');

  // UAE
  const uae = await prisma.country.upsert({
    where: { code: 'AE' },
    update: { updatedAt: new Date() },
    create: {
      id: 'ae',
      code: 'AE',
      name: 'United Arab Emirates',
      nameAr: 'الإمارات العربية المتحدة',
      nameFr: 'Émirats Arabes Unis',
      flag: '🇦🇪',
      dialCode: '+971',
      currency: 'AED',
      isActive: true,
      updatedAt: new Date(),
    },
  });

  const dubai = await prisma.city.upsert({
    where: { countryId_slug: { countryId: uae.id, slug: 'dubai' } },
    update: { updatedAt: new Date() },
    create: {
      id: 'dubai',
      countryId: uae.id,
      name: 'Dubai',
      slug: 'dubai',
      nameAr: 'دبي',
      nameFr: 'Dubaï',
      isActive: true,
      updatedAt: new Date(),
    },
  });

  // Thailand
  const thailand = await prisma.country.upsert({
    where: { code: 'TH' },
    update: { updatedAt: new Date() },
    create: {
      id: 'th',
      code: 'TH',
      name: 'Thailand',
      nameAr: 'تايلاند',
      nameFr: 'Thaïlande',
      nameTh: 'ประเทศไทย',
      flag: '🇹🇭',
      dialCode: '+66',
      currency: 'THB',
      isActive: true,
      updatedAt: new Date(),
    },
  });

  const bangkok = await prisma.city.upsert({
    where: { countryId_slug: { countryId: thailand.id, slug: 'bangkok' } },
    update: { updatedAt: new Date() },
    create: {
      id: 'bangkok',
      countryId: thailand.id,
      name: 'Bangkok',
      slug: 'bangkok',
      nameAr: 'بانكوك',
      nameFr: 'Bangkok',
      nameTh: 'กรุงเทพมหานคร',
      isActive: true,
      updatedAt: new Date(),
    },
  });

  const pattaya = await prisma.city.upsert({
    where: { countryId_slug: { countryId: thailand.id, slug: 'pattaya' } },
    update: { updatedAt: new Date() },
    create: {
      id: 'pattaya',
      countryId: thailand.id,
      name: 'Pattaya',
      slug: 'pattaya',
      nameAr: 'باتايا',
      nameFr: 'Pattaya',
      nameTh: 'พัทยา',
      isActive: true,
      updatedAt: new Date(),
    },
  });

  const phuket = await prisma.city.upsert({
    where: { countryId_slug: { countryId: thailand.id, slug: 'phuket' } },
    update: { updatedAt: new Date() },
    create: {
      id: 'phuket',
      countryId: thailand.id,
      name: 'Phuket',
      slug: 'phuket',
      nameAr: 'บوกิต',
      nameFr: 'Phuket',
      nameTh: 'ภูเก็ต',
      isActive: true,
      updatedAt: new Date(),
    },
  });

  console.log('✅ Created countries:', { uae: uae.name, thailand: thailand.name });
  console.log('✅ Created cities:', { dubai: dubai.name, bangkok: bangkok.name, pattaya: pattaya.name, phuket: phuket.name });
  
  console.log('\n✨ Base geography seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
