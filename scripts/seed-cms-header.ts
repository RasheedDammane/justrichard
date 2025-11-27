import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Header CMS data...');

  // English Header
  console.log('Creating header config for en...');
  await prisma.headerConfig.upsert({
    where: {
      locale: 'en',
    },
    update: {
      logoUrl: '/logo.png',
      logoText: 'JustRichard',
      logoAlt: 'JustRichard Logo',
      title: 'JustRichard - Your Trusted Service Platform',
      description: 'Discover premium properties, yachts, and professional services in Thailand and Dubai',
      ctaText: 'Get Started',
      ctaUrl: '/en/contact',
      ctaColor: '#3B82F6',
      bgColor: '#FFFFFF',
      textColor: '#1F2937',
      isSticky: true,
      showSearch: false,
      isActive: true,
    },
    create: {
      locale: 'en',
      logoUrl: '/logo.png',
      logoText: 'JustRichard',
      logoAlt: 'JustRichard Logo',
      title: 'JustRichard - Your Trusted Service Platform',
      description: 'Discover premium properties, yachts, and professional services in Thailand and Dubai',
      ctaText: 'Get Started',
      ctaUrl: '/en/contact',
      ctaColor: '#3B82F6',
      bgColor: '#FFFFFF',
      textColor: '#1F2937',
      isSticky: true,
      showSearch: false,
      isActive: true,
    },
  });

  // French Header
  console.log('Creating header config for fr...');
  await prisma.headerConfig.upsert({
    where: {
      locale: 'fr',
    },
    update: {
      logoUrl: '/logo.png',
      logoText: 'JustRichard',
      logoAlt: 'Logo JustRichard',
      title: 'JustRichard - Votre Plateforme de Services de Confiance',
      description: 'Découvrez des propriétés premium, yachts et services professionnels en Thaïlande et à Dubaï',
      ctaText: 'Commencer',
      ctaUrl: '/fr/contact',
      ctaColor: '#3B82F6',
      bgColor: '#FFFFFF',
      textColor: '#1F2937',
      isSticky: true,
      showSearch: false,
      isActive: true,
    },
    create: {
      locale: 'fr',
      logoUrl: '/logo.png',
      logoText: 'JustRichard',
      logoAlt: 'Logo JustRichard',
      title: 'JustRichard - Votre Plateforme de Services de Confiance',
      description: 'Découvrez des propriétés premium, yachts et services professionnels en Thaïlande et à Dubaï',
      ctaText: 'Commencer',
      ctaUrl: '/fr/contact',
      ctaColor: '#3B82F6',
      bgColor: '#FFFFFF',
      textColor: '#1F2937',
      isSticky: true,
      showSearch: false,
      isActive: true,
    },
  });

  // Arabic Header
  console.log('Creating header config for ar...');
  await prisma.headerConfig.upsert({
    where: {
      locale: 'ar',
    },
    update: {
      logoUrl: '/logo.png',
      logoText: 'جست ريتشارد',
      logoAlt: 'شعار جست ريتشارد',
      title: 'جست ريتشارد - منصة الخدمات الموثوقة',
      description: 'اكتشف عقارات ويخوت وخدمات مهنية متميزة في تايلاند ودبي',
      ctaText: 'ابدأ الآن',
      ctaUrl: '/ar/contact',
      ctaColor: '#3B82F6',
      bgColor: '#FFFFFF',
      textColor: '#1F2937',
      isSticky: true,
      showSearch: false,
      isActive: true,
    },
    create: {
      locale: 'ar',
      logoUrl: '/logo.png',
      logoText: 'جست ريتشارد',
      logoAlt: 'شعار جست ريتشارد',
      title: 'جست ريتشارد - منصة الخدمات الموثوقة',
      description: 'اكتشف عقارات ويخوت وخدمات مهنية متميزة في تايلاند ودبي',
      ctaText: 'ابدأ الآن',
      ctaUrl: '/ar/contact',
      ctaColor: '#3B82F6',
      bgColor: '#FFFFFF',
      textColor: '#1F2937',
      isSticky: true,
      showSearch: false,
      isActive: true,
    },
  });

  console.log('✅ Header CMS data seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
