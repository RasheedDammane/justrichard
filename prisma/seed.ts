import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcryptjs';
import { getCategoryTranslations, SAMPLE_IMAGES } from './seed-helpers';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create admin user
  const adminPassword = await hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@communityhub.com' },
    update: {},
    create: {
      email: 'admin@communityhub.com',
      password: adminPassword,
      name: 'Admin User',
      role: Role.ADMIN,
      phone: '+1234567890',
    },
  });
  console.log('✅ Admin user created');

  // Create test customer
  const customerPassword = await hash('customer123', 12);
  const customer = await prisma.user.upsert({
    where: { email: 'customer@test.com' },
    update: {},
    create: {
      email: 'customer@test.com',
      password: customerPassword,
      name: 'John Doe',
      role: Role.CUSTOMER,
      phone: '+1234567891',
    },
  });
  console.log('✅ Customer user created');

  // Create categories with complete multilingual support
  const cleaningCategory = await prisma.category.create({
    data: {
      slug: 'home-cleaning',
      icon: '🧹',
      isActive: true,
      order: 1,
      translations: {
        create: getCategoryTranslations('home-cleaning'),
      },
    },
  });

  const acCategory = await prisma.category.create({
    data: {
      slug: 'ac-services',
      icon: '❄️',
      isActive: true,
      order: 2,
      translations: {
        create: getCategoryTranslations('ac-services'),
      },
    },
  });
  console.log('✅ Categories created with 16 languages each');

  // Create services
  const deepCleaningService = await prisma.service.create({
    data: {
      categoryId: cleaningCategory.id,
      slug: 'deep-cleaning',
      duration: 180,
      basePrice: 150,
      currency: 'USD',
      isActive: true,
      isFeatured: true,
      rating: 4.8,
      totalReviews: 245,
      images: ['/images/deep-cleaning-1.jpg', '/images/deep-cleaning-2.jpg'],
      translations: {
        create: [
          {
            locale: 'en',
            name: 'Deep Cleaning',
            description: 'Comprehensive deep cleaning service for your entire home',
            includes: ['All rooms', 'Kitchen deep clean', 'Bathroom sanitization', 'Window cleaning'],
            excludes: ['Laundry', 'Dishes', 'Outdoor areas'],
          },
          {
            locale: 'ar',
            name: 'تنظيف عميق',
            description: 'خدمة تنظيف عميق شاملة لمنزلك بالكامل',
            includes: ['جميع الغرف', 'تنظيف عميق للمطبخ', 'تعقيم الحمام', 'تنظيف النوافذ'],
            excludes: ['الغسيل', 'الأطباق', 'المناطق الخارجية'],
          },
          {
            locale: 'fr',
            name: 'Nettoyage en profondeur',
            description: 'Service de nettoyage en profondeur pour toute votre maison',
            includes: ['Toutes les pièces', 'Nettoyage cuisine', 'Sanitisation salle de bain'],
            excludes: ['Linge', 'Vaisselle', 'Zones extérieures'],
          },
        ],
      },
      prices: {
        create: [
          { region: 'UAE', city: 'Dubai', price: 550, currency: 'AED' },
          { region: 'UAE', city: 'Abu Dhabi', price: 500, currency: 'AED' },
          { region: 'KSA', city: 'Riyadh', price: 560, currency: 'SAR' },
        ],
      },
      addons: {
        create: [
          {
            price: 30,
            duration: 30,
            isActive: true,
            translations: {
              create: [
                {
                  locale: 'en',
                  name: 'Balcony Cleaning',
                  description: 'Deep clean your balcony',
                },
                {
                  locale: 'ar',
                  name: 'تنظيف الشرفة',
                  description: 'تنظيف عميق لشرفتك',
                },
              ],
            },
          },
          {
            price: 50,
            duration: 45,
            isActive: true,
            translations: {
              create: [
                {
                  locale: 'en',
                  name: 'Oven Cleaning',
                  description: 'Professional oven deep cleaning',
                },
                {
                  locale: 'ar',
                  name: 'تنظيف الفرن',
                  description: 'تنظيف عميق احترافي للفرن',
                },
              ],
            },
          },
        ],
      },
    },
  });

  const acMaintenanceService = await prisma.service.create({
    data: {
      categoryId: acCategory.id,
      slug: 'ac-maintenance',
      duration: 60,
      basePrice: 80,
      currency: 'USD',
      isActive: true,
      isFeatured: true,
      rating: 4.9,
      totalReviews: 189,
      images: ['/images/ac-service-1.jpg'],
      translations: {
        create: [
          {
            locale: 'en',
            name: 'AC Maintenance',
            description: 'Regular AC maintenance and cleaning service',
            includes: ['Filter cleaning', 'Gas check', 'Performance test', 'Basic repairs'],
            excludes: ['Major repairs', 'Part replacement'],
          },
          {
            locale: 'ar',
            name: 'صيانة التكييف',
            description: 'خدمة صيانة وتنظيف التكييف الدورية',
            includes: ['تنظيف الفلتر', 'فحص الغاز', 'اختبار الأداء', 'إصلاحات أساسية'],
            excludes: ['إصلاحات كبيرة', 'استبدال القطع'],
          },
        ],
      },
      prices: {
        create: [
          { region: 'UAE', city: 'Dubai', price: 290, currency: 'AED' },
          { region: 'KSA', city: 'Riyadh', price: 300, currency: 'SAR' },
        ],
      },
    },
  });
  console.log('✅ Services created');

  // Create customer address
  await prisma.address.create({
    data: {
      userId: customer.id,
      label: 'Home',
      street: '123 Main Street',
      building: 'Building A',
      apartment: 'Apt 501',
      city: 'Dubai',
      region: 'Dubai',
      country: 'UAE',
      postalCode: '00000',
      isDefault: true,
    },
  });
  console.log('✅ Address created');

  // Create promotions
  await prisma.promotion.create({
    data: {
      code: 'WELCOME20',
      type: 'PERCENTAGE',
      value: 20,
      minAmount: 100,
      maxDiscount: 50,
      usageLimit: 1000,
      startsAt: new Date(),
      expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
      isActive: true,
    },
  });
  console.log('✅ Promotions created');

  // Create CMS pages
  await prisma.cMSPage.create({
    data: {
      slug: 'about-us',
      isActive: true,
      translations: {
        create: [
          {
            locale: 'en',
            title: 'About Us',
            content: 'We are a leading home services platform...',
            seoTitle: 'About Us - CommunityHub Platform',
          },
          {
            locale: 'ar',
            title: 'من نحن',
            content: 'نحن منصة رائدة لخدمات المنزل...',
            seoTitle: 'من نحن - منصة CommunityHub',
          },
        ],
      },
    },
  });
  console.log('✅ CMS pages created');

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
