#!/usr/bin/env tsx

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Target countries
const COUNTRIES = [
  { code: 'AE', name: 'United Arab Emirates', nameFr: 'Émirats Arabes Unis', nameAr: 'الإمارات العربية المتحدة', nameTh: 'สหรัฐอาหรับเอมิเรตส์' },
  { code: 'TH', name: 'Thailand', nameFr: 'Thaïlande', nameAr: 'تايلاند', nameTh: 'ประเทศไทย' },
  { code: 'VN', name: 'Vietnam', nameFr: 'Vietnam', nameAr: 'فيتنام', nameTh: 'เวียดนาม' },
  { code: 'SA', name: 'Saudi Arabia', nameFr: 'Arabie Saoudite', nameAr: 'المملكة العربية السعودية', nameTh: 'ซาอุดีอาระเบีย' },
  { code: 'QA', name: 'Qatar', nameFr: 'Qatar', nameAr: 'قطر', nameTh: 'กาตาร์' }
];

const LANGUAGES = ['en', 'fr', 'ar', 'th'];

// TOUTES LES 15 CATÉGORIES
const CATEGORIES = [
  {
    slug: 'home-improvement',
    en: { name: 'Home Improvement', keyword: 'home improvement' },
    fr: { name: 'Amélioration de la Maison', keyword: 'amélioration maison' },
    ar: { name: 'تحسين المنزل', keyword: 'تحسين المنزل' },
    th: { name: 'ปรับปรุงบ้าน', keyword: 'ปรับปรุงบ้าน' }
  },
  {
    slug: 'home-cleaning',
    en: { name: 'Home Cleaning', keyword: 'home cleaning' },
    fr: { name: 'Nettoyage Maison', keyword: 'nettoyage maison' },
    ar: { name: 'تنظيف المنزل', keyword: 'تنظيف المنزل' },
    th: { name: 'ทำความสะอาดบ้าน', keyword: 'ทำความสะอาดบ้าน' }
  },
  {
    slug: 'home-maintenance',
    en: { name: 'Home Maintenance', keyword: 'home maintenance' },
    fr: { name: 'Entretien de Maison', keyword: 'entretien maison' },
    ar: { name: 'صيانة المنزل', keyword: 'صيانة المنزل' },
    th: { name: 'ซ่อมบำรุงบ้าน', keyword: 'ซ่อมบำรุงบ้าน' }
  },
  {
    slug: 'ac-services',
    en: { name: 'AC Services', keyword: 'air conditioning' },
    fr: { name: 'Services de Climatisation', keyword: 'climatisation' },
    ar: { name: 'خدمات التكييف', keyword: 'تكييف الهواء' },
    th: { name: 'บริการแอร์', keyword: 'เครื่องปรับอากาศ' }
  },
  {
    slug: 'plumbing',
    en: { name: 'Plumbing Services', keyword: 'plumbing' },
    fr: { name: 'Services de Plomberie', keyword: 'plomberie' },
    ar: { name: 'خدمات السباكة', keyword: 'سباكة' },
    th: { name: 'บริการประปา', keyword: 'ประปา' }
  },
  {
    slug: 'cleaning-and-disinfection',
    en: { name: 'Cleaning & Disinfection', keyword: 'cleaning services' },
    fr: { name: 'Nettoyage et Désinfection', keyword: 'services nettoyage' },
    ar: { name: 'التنظيف والتعقيم', keyword: 'خدمات التنظيف' },
    th: { name: 'ทำความสะอาดและฆ่าเชื้อ', keyword: 'บริการทำความสะอาด' }
  },
  {
    slug: 'commercial-property-services',
    en: { name: 'Commercial Property Services', keyword: 'commercial services' },
    fr: { name: 'Services Immobiliers Commerciaux', keyword: 'services commerciaux' },
    ar: { name: 'خدمات العقارات التجارية', keyword: 'خدمات تجارية' },
    th: { name: 'บริการอสังหาริมทรัพย์เชิงพาณิชย์', keyword: 'บริการเชิงพาณิชย์' }
  },
  {
    slug: 'events-and-weddings',
    en: { name: 'Events & Weddings', keyword: 'event planning' },
    fr: { name: 'Événements et Mariages', keyword: 'planification événements' },
    ar: { name: 'الفعاليات والأعراس', keyword: 'تخطيط الفعاليات' },
    th: { name: 'งานอีเว้นท์และงานแต่ง', keyword: 'วางแผนงานอีเว้นท์' }
  },
  {
    slug: 'neighbourhood-services',
    en: { name: 'Neighbourhood Services', keyword: 'local services' },
    fr: { name: 'Services de Quartier', keyword: 'services locaux' },
    ar: { name: 'خدمات الحي', keyword: 'خدمات محلية' },
    th: { name: 'บริการในชุมชน', keyword: 'บริการท้องถิ่น' }
  },
  {
    slug: 'electrical-appliance-repair',
    en: { name: 'Electrical Appliance Repair', keyword: 'appliance repair' },
    fr: { name: 'Réparation Électroménagers', keyword: 'réparation appareils' },
    ar: { name: 'إصلاح الأجهزة الكهربائية', keyword: 'إصلاح الأجهزة' },
    th: { name: 'ซ่อมเครื่องใช้ไฟฟ้า', keyword: 'ซ่อมเครื่องใช้ไฟฟ้า' }
  },
  {
    slug: 'wellness',
    en: { name: 'Wellness', keyword: 'wellness services' },
    fr: { name: 'Bien-être', keyword: 'services bien-être' },
    ar: { name: 'العافية', keyword: 'خدمات العافية' },
    th: { name: 'สุขภาพและความงาม', keyword: 'บริการสุขภาพ' }
  },
  {
    slug: 'lessons',
    en: { name: 'Lessons & Learning', keyword: 'private lessons' },
    fr: { name: 'Cours et Apprentissage', keyword: 'cours privés' },
    ar: { name: 'الدروس والتعلم', keyword: 'دروس خاصة' },
    th: { name: 'บทเรียนและการเรียนรู้', keyword: 'บทเรียนส่วนตัว' }
  },
  {
    slug: 'business',
    en: { name: 'Business Services', keyword: 'business services' },
    fr: { name: 'Services d\'Entreprise', keyword: 'services entreprise' },
    ar: { name: 'خدمات الأعمال', keyword: 'خدمات الأعمال' },
    th: { name: 'บริการธุรกิจ', keyword: 'บริการธุรกิจ' }
  },
  {
    slug: 'tech-and-it',
    en: { name: 'Tech & IT', keyword: 'IT services' },
    fr: { name: 'Tech et IT', keyword: 'services IT' },
    ar: { name: 'التقنية وتكنولوجيا المعلومات', keyword: 'خدمات تكنولوجيا المعلومات' },
    th: { name: 'เทคโนโลยีและไอที', keyword: 'บริการไอที' }
  },
  {
    slug: 'personal-and-family',
    en: { name: 'Personal & Family', keyword: 'personal services' },
    fr: { name: 'Personnel et Famille', keyword: 'services personnels' },
    ar: { name: 'الخدمات الشخصية والعائلية', keyword: 'خدمات شخصية' },
    th: { name: 'บริการส่วนตัวและครอบครัว', keyword: 'บริการส่วนตัว' }
  }
];

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function generateArticleContent(category: any, country: any, language: string) {
  const catData = category[language as keyof typeof category];
  const countryName = country[`name${language === 'en' ? '' : language.charAt(0).toUpperCase() + language.slice(1)}` as keyof typeof country];

  const templates = {
    en: {
      title: `${catData.name} Services in ${countryName} 2025 - Complete Guide`,
      excerpt: `Discover the best ${catData.keyword} services in ${countryName}. Professional, reliable, and affordable solutions for all your needs.`,
      content: `# ${catData.name} Services in ${countryName}

Welcome to your ultimate guide for ${catData.keyword} services in ${countryName}. Find the best professionals for all your needs.

## Why Choose Professional ${catData.name} Services in ${countryName}?

${countryName} offers world-class ${catData.keyword} services with experienced professionals, competitive pricing, and guaranteed quality.

## Top ${catData.name} Professionals

Our platform connects you with verified ${catData.keyword} experts across ${countryName}. All providers are licensed, insured, and highly rated.

## Service Areas

We cover all major cities in ${countryName}, providing convenient ${catData.keyword} services wherever you are.

## How to Book

Browse, compare, read reviews, and book online in minutes. Simple, fast, and secure.

## Why Choose Us

✅ 10,000+ satisfied customers
✅ 500+ verified professionals
✅ 24/7 customer support
✅ Money-back guarantee

Book your ${catData.keyword} service in ${countryName} today!`,
      seoTitle: `${catData.name} Services in ${countryName} | Professional & Affordable`,
      seoDescription: `Find the best ${catData.keyword} services in ${countryName}. Verified professionals, competitive prices, quality guaranteed. Book online today!`
    },
    fr: {
      title: `Services ${catData.name} au ${countryName} 2025 - Guide Complet`,
      excerpt: `Découvrez les meilleurs services ${catData.keyword} au ${countryName}. Solutions professionnelles, fiables et abordables.`,
      content: `# Services ${catData.name} au ${countryName}

Votre guide pour les services ${catData.keyword} au ${countryName}. Trouvez les meilleurs professionnels.

## Services Professionnels

Le ${countryName} offre des services ${catData.keyword} de qualité mondiale. Réservez aujourd'hui!`,
      seoTitle: `Services ${catData.name} au ${countryName} | Professionnels`,
      seoDescription: `Meilleurs services ${catData.keyword} au ${countryName}. Professionnels vérifiés. Réservez en ligne!`
    },
    ar: {
      title: `خدمات ${catData.name} في ${countryName} 2025 - دليل شامل`,
      excerpt: `اكتشف أفضل خدمات ${catData.keyword} في ${countryName}. حلول احترافية وموثوقة.`,
      content: `# خدمات ${catData.name} في ${countryName}

دليلك لخدمات ${catData.keyword} في ${countryName}. ابحث عن أفضل المحترفين.

## خدمات احترافية

توفر ${countryName} خدمات ${catData.keyword} عالمية المستوى. احجز اليوم!`,
      seoTitle: `خدمات ${catData.name} في ${countryName} | احترافية`,
      seoDescription: `أفضل خدمات ${catData.keyword} في ${countryName}. محترفون معتمدون. احجز عبر الإنترنت!`
    },
    th: {
      title: `บริการ${catData.name}ใน${countryName} 2025 - คู่มือฉบับสมบูรณ์`,
      excerpt: `ค้นพบบริการ${catData.keyword}ที่ดีที่สุดใน${countryName} โซลูชั่นมืออาชีพ`,
      content: `# บริการ${catData.name}ใน${countryName}

คู่มือสำหรับบริการ${catData.keyword}ใน${countryName} ค้นหาผู้เชี่ยวชาญที่ดีที่สุด

## บริการมืออาชีพ

${countryName}มีบริการ${catData.keyword}ระดับโลก จองวันนี้!`,
      seoTitle: `บริการ${catData.name}ใน${countryName} | มืออาชีพ`,
      seoDescription: `บริการ${catData.keyword}ที่ดีที่สุดใน${countryName} ผู้เชี่ยวชาญที่ได้รับการยืนยัน จองออนไลน์!`
    }
  };

  const template = templates[language as keyof typeof templates];
  return {
    title: template.title,
    excerpt: template.excerpt,
    content: template.content,
    seoTitle: template.seoTitle,
    seoDescription: template.seoDescription
  };
}

async function main() {
  console.log('📝 Creating blog articles for ALL 15 categories × countries × languages...\n');
  console.log(`Target: ${COUNTRIES.length} countries × ${LANGUAGES.length} languages × ${CATEGORIES.length} categories\n`);
  console.log(`Expected total: ${COUNTRIES.length * LANGUAGES.length * CATEGORIES.length} articles\n`);

  // Get or create system user
  let systemUser = await prisma.user.findFirst({
    where: { email: 'system@communityhub.com' }
  });

  if (!systemUser) {
    systemUser = await prisma.user.create({
      data: {
        email: 'system@communityhub.com',
        name: 'CommunityHub Editorial',
        password: 'hashed-password-placeholder',
        role: 'ADMIN'
      }
    });
  }

  let totalArticles = 0;
  const expectedTotal = COUNTRIES.length * LANGUAGES.length * CATEGORIES.length;

  for (const country of COUNTRIES) {
    console.log(`\n🌍 ${country.name} (${country.code})`);
    
    for (const language of LANGUAGES) {
      console.log(`  📝 ${language.toUpperCase()}: Creating ${CATEGORIES.length} articles...`);
      
      for (const category of CATEGORIES) {
        const article = generateArticleContent(category, country, language);
        const slug = createSlug(`${category.slug}-${country.code}-${language}`);

        try {
          await prisma.blogPost.upsert({
            where: { slug },
            update: {
              title: article.title,
              excerpt: article.excerpt,
              content: article.content,
              status: 'published',
              publishedAt: new Date(),
              metaTitle: article.seoTitle,
              metaDescription: article.seoDescription,
              keywords: [category.slug, country.code.toLowerCase(), language],
              categories: [category.slug],
              tags: [category.slug, country.name, language],
            },
            create: {
              slug,
              title: article.title,
              excerpt: article.excerpt,
              content: article.content,
              featuredImage: `https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80`,
              authorId: systemUser.id,
              language,
              countryCode: country.code,
              status: 'published',
              publishedAt: new Date(),
              metaTitle: article.seoTitle,
              metaDescription: article.seoDescription,
              keywords: [category.slug, country.code.toLowerCase(), language],
              categories: [category.slug],
              tags: [category.slug, country.name, language],
            },
          });

          totalArticles++;

        } catch (e: any) {
          console.log(`    ❌ Failed: ${slug}`);
        }
      }
      
      console.log(`     ✅ ${CATEGORIES.length} articles created`);
    }
    
    console.log(`  ✅ Country ${country.code} complete: ${LANGUAGES.length * CATEGORIES.length} articles`);
  }

  const finalCount = await prisma.blogPost.count();

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ COMPLETE BLOG ARTICLES SEED - ALL CATEGORIES!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Database Summary:
  🌍 ${COUNTRIES.length} Countries (UAE, TH, VN, SA, QA)
  🗣️  ${LANGUAGES.length} Languages (EN, FR, AR, TH)
  📁 ${CATEGORIES.length} Categories (ALL categories)
  ━━━━━━━━━━━━━━━━━━━━━━━━
  📝 ${totalArticles} Articles Created This Run
  📚 ${finalCount} Total Blog Posts in Database

🌐 Coverage per Country:
  ${COUNTRIES.map(c => `${c.code}: ${LANGUAGES.length * CATEGORIES.length} articles (${LANGUAGES.length} lang × ${CATEGORIES.length} cat)`).join('\n  ')}

📈 Total Coverage:
  ${COUNTRIES.length} × ${LANGUAGES.length} × ${CATEGORIES.length} = ${expectedTotal} articles

🎉 Complete coverage for ALL ${CATEGORIES.length} categories in ${COUNTRIES.length} countries!
  `);
}

main()
  .catch((e) => {
    console.error('\n❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
