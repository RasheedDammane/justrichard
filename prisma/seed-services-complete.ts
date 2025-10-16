import { PrismaClient } from '@prisma/client';
import { generateSlug } from '../lib/seo/slug-generator';

const prisma = new PrismaClient();

async function main() {
  console.log('🛠️ Seeding services...');

  // Get countries and cities
  const uae = await prisma.country.findFirst({ where: { code: 'AE' } });
  const philippines = await prisma.country.findFirst({ where: { code: 'PH' } });
  const thailand = await prisma.country.findFirst({ where: { code: 'TH' } });

  if (!uae || !philippines || !thailand) {
    console.error('❌ Countries not found. Run seed-geography-complete first');
    return;
  }

  // Create categories
  const cleaningCategory = await prisma.category.upsert({
    where: { slug: 'home-cleaning' },
    update: {},
    create: {
      slug: 'home-cleaning',
      icon: '🧹',
      isActive: true,
      order: 1,
      translations: {
        create: [
          {
            locale: 'en',
            name: 'Home Cleaning',
            description: 'Professional home cleaning services',
            seoTitle: 'Home Cleaning Services | CommunityHub',
            seoDescription: 'Book professional home cleaning services',
          },
          {
            locale: 'ar',
            name: 'تنظيف المنزل',
            description: 'خدمات تنظيف منزلية احترافية',
          },
          {
            locale: 'fr',
            name: 'Nettoyage de maison',
            description: 'Services de nettoyage professionnel',
          },
        ],
      },
    },
  });

  const acCategory = await prisma.category.upsert({
    where: { slug: 'ac-services' },
    update: {},
    create: {
      slug: 'ac-services',
      icon: '❄️',
      isActive: true,
      order: 2,
      translations: {
        create: [
          {
            locale: 'en',
            name: 'AC Services',
            description: 'Air conditioning maintenance and repair',
          },
          {
            locale: 'ar',
            name: 'خدمات التكييف',
            description: 'صيانة وإصلاح أجهزة التكييف',
          },
        ],
      },
    },
  });

  const plumbingCategory = await prisma.category.upsert({
    where: { slug: 'plumbing' },
    update: {},
    create: {
      slug: 'plumbing',
      icon: '🔧',
      isActive: true,
      order: 3,
      translations: {
        create: [
          {
            locale: 'en',
            name: 'Plumbing',
            description: 'Professional plumbing services',
          },
          {
            locale: 'ar',
            name: 'السباكة',
            description: 'خدمات السباكة الاحترافية',
          },
        ],
      },
    },
  });

  console.log('✅ Categories created');

  // Create services for UAE
  const deepCleaning = await prisma.service.create({
    data: {
      categoryId: cleaningCategory.id,
      slug: generateSlug('Deep Home Cleaning Dubai'),
      duration: 180,
      basePrice: 150,
      currency: 'AED',
      isActive: true,
      isFeatured: true,
      images: [
        '/images/services/deep-cleaning-1.jpg',
        '/images/services/deep-cleaning-2.jpg',
      ],
      translations: {
        create: [
          {
            locale: 'en',
            name: 'Deep Home Cleaning',
            description: 'Comprehensive deep cleaning service for your home. Includes all rooms, kitchen, bathrooms, and more.',
            seoTitle: 'Deep Home Cleaning Service in Dubai | From AED 150',
            seoDescription: 'Professional deep cleaning service in Dubai. 3-hour comprehensive cleaning by verified professionals.',
          },
          {
            locale: 'ar',
            name: 'تنظيف عميق للمنزل',
            description: 'خدمة تنظيف عميق شاملة لمنزلك',
          },
        ],
      },
    },
  });

  const acMaintenance = await prisma.service.create({
    data: {
      categoryId: acCategory.id,
      slug: generateSlug('AC Maintenance Dubai'),
      duration: 120,
      basePrice: 120,
      currency: 'AED',
      isActive: true,
      isFeatured: true,
      images: [
        '/images/services/ac-maintenance-1.jpg',
      ],
      translations: {
        create: [
          {
            locale: 'en',
            name: 'AC Maintenance',
            description: 'Regular AC maintenance and cleaning service. Keep your AC running efficiently.',
            seoTitle: 'AC Maintenance Service in Dubai | From AED 120',
            seoDescription: 'Professional AC maintenance in Dubai. 2-hour service by certified technicians.',
          },
          {
            locale: 'ar',
            name: 'صيانة التكييف',
            description: 'خدمة صيانة وتنظيف التكييف',
          },
        ],
      },
    },
  });

  const plumbingRepair = await prisma.service.create({
    data: {
      categoryId: plumbingCategory.id,
      slug: generateSlug('Plumbing Repair Dubai'),
      duration: 90,
      basePrice: 100,
      currency: 'AED',
      isActive: true,
      images: [
        '/images/services/plumbing-1.jpg',
      ],
      translations: {
        create: [
          {
            locale: 'en',
            name: 'Plumbing Repair',
            description: 'Fast and reliable plumbing repair service. Fix leaks, clogs, and more.',
            seoTitle: 'Plumbing Repair Service in Dubai | From AED 100',
            seoDescription: 'Emergency plumbing repair in Dubai. Available 24/7.',
          },
          {
            locale: 'ar',
            name: 'إصلاح السباكة',
            description: 'خدمة إصلاح السباكة السريعة',
          },
        ],
      },
    },
  });

  // Services for Philippines
  const cleaningManila = await prisma.service.create({
    data: {
      categoryId: cleaningCategory.id,
      slug: generateSlug('Home Cleaning Manila'),
      duration: 180,
      basePrice: 1500,
      currency: 'PHP',
      isActive: true,
      images: [
        '/images/services/cleaning-manila.jpg',
      ],
      translations: {
        create: [
          {
            locale: 'en',
            name: 'Home Cleaning Manila',
            description: 'Professional home cleaning service in Manila. Trusted and reliable.',
            seoTitle: 'Home Cleaning Service in Manila | From PHP 1,500',
            seoDescription: 'Book professional home cleaning in Manila.',
          },
          {
            locale: 'tl',
            name: 'Paglilinis ng Bahay Manila',
            description: 'Propesyonal na serbisyo sa paglilinis ng bahay',
          },
        ],
      },
    },
  });

  // Services for Thailand
  const cleaningBangkok = await prisma.service.create({
    data: {
      categoryId: cleaningCategory.id,
      slug: generateSlug('Home Cleaning Bangkok'),
      duration: 180,
      basePrice: 1200,
      currency: 'THB',
      isActive: true,
      images: [
        '/images/services/cleaning-bangkok.jpg',
      ],
      translations: {
        create: [
          {
            locale: 'en',
            name: 'Home Cleaning Bangkok',
            description: 'Professional home cleaning service in Bangkok. Quality service guaranteed.',
            seoTitle: 'Home Cleaning Service in Bangkok | From THB 1,200',
            seoDescription: 'Book professional home cleaning in Bangkok.',
          },
          {
            locale: 'th',
            name: 'ทำความสะอาดบ้าน กรุงเทพ',
            description: 'บริการทำความสะอาดบ้านมืออาชีพ',
          },
        ],
      },
    },
  });

  console.log('✅ Services created');
  console.log(`   - ${deepCleaning.slug}`);
  console.log(`   - ${acMaintenance.slug}`);
  console.log(`   - ${plumbingRepair.slug}`);
  console.log(`   - ${cleaningManila.slug}`);
  console.log(`   - ${cleaningBangkok.slug}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding services:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
