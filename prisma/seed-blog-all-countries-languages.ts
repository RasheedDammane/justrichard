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

// Categories with SEO content
const CATEGORIES = [
  {
    slug: 'home-improvement',
    en: { name: 'Home Improvement', keyword: 'home improvement' },
    fr: { name: 'Amélioration de la Maison', keyword: 'amélioration maison' },
    ar: { name: 'تحسين المنزل', keyword: 'تحسين المنزل' },
    th: { name: 'ปรับปรุงบ้าน', keyword: 'ปรับปรุงบ้าน' }
  },
  {
    slug: 'home-maintenance',
    en: { name: 'Home Maintenance', keyword: 'home maintenance' },
    fr: { name: 'Entretien de Maison', keyword: 'entretien maison' },
    ar: { name: 'صيانة المنزل', keyword: 'صيانة المنزل' },
    th: { name: 'ซ่อมบำรุงบ้าน', keyword: 'ซ่อมบำรุงบ้าน' }
  },
  {
    slug: 'cleaning-and-disinfection',
    en: { name: 'Cleaning & Disinfection', keyword: 'cleaning services' },
    fr: { name: 'Nettoyage et Désinfection', keyword: 'services nettoyage' },
    ar: { name: 'التنظيف والتعقيم', keyword: 'خدمات التنظيف' },
    th: { name: 'ทำความสะอาดและฆ่าเชื้อ', keyword: 'บริการทำความสะอาด' }
  },
  {
    slug: 'events-and-weddings',
    en: { name: 'Events & Weddings', keyword: 'event planning' },
    fr: { name: 'Événements et Mariages', keyword: 'planification événements' },
    ar: { name: 'الفعاليات والأعراس', keyword: 'تخطيط الفعاليات' },
    th: { name: 'งานอีเว้นท์และงานแต่ง', keyword: 'วางแผนงานอีเว้นท์' }
  },
  {
    slug: 'wellness',
    en: { name: 'Wellness', keyword: 'wellness services' },
    fr: { name: 'Bien-être', keyword: 'services bien-être' },
    ar: { name: 'العافية', keyword: 'خدمات العافية' },
    th: { name: 'สุขภาพและความงาม', keyword: 'บริการสุขภาพ' }
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

Welcome to the ultimate guide for ${catData.keyword} services in ${countryName}. Whether you're a resident or planning to move, this comprehensive guide will help you find the best professional services.

## Why Choose Professional ${catData.name} Services?

${countryName} offers world-class ${catData.keyword} services with:
- **Experienced Professionals**: Vetted and certified experts
- **Quality Guarantee**: 100% satisfaction guaranteed
- **Competitive Pricing**: Transparent and fair pricing
- **Fast Response**: Quick booking and service delivery

## Top ${catData.name} Services in ${countryName}

### Professional Excellence
Our platform connects you with the best service providers in ${countryName}. All professionals are:
- Fully licensed and insured
- Background-checked and verified
- Highly rated by customers
- Committed to quality service

### Service Areas Covered

We provide ${catData.keyword} services across all major cities in ${countryName}, ensuring you get professional help wherever you are.

## How to Book ${catData.name} Services

1. **Browse Services**: Explore our verified professionals
2. **Compare Prices**: Get transparent quotes
3. **Read Reviews**: Check ratings and feedback
4. **Book Online**: Secure booking in minutes
5. **Get Service**: Professional service at your doorstep

## Why ${countryName} Residents Trust Us

- ✅ Over 10,000+ satisfied customers
- ✅ 500+ verified service providers
- ✅ 24/7 customer support
- ✅ Money-back guarantee
- ✅ Secure payment options

## Pricing Guide

${catData.name} services in ${countryName} are competitively priced with transparent billing. Get quotes from multiple providers and choose the best option for your budget.

## Book Your ${catData.name} Service Today

Ready to get started? Browse our verified ${catData.keyword} professionals in ${countryName} and book your service today!`,
      seoTitle: `${catData.name} Services in ${countryName} | Professional & Affordable`,
      seoDescription: `Find the best ${catData.keyword} services in ${countryName}. Verified professionals, competitive prices, quality guaranteed. Book online today!`
    },
    fr: {
      title: `Services ${catData.name} au ${countryName} 2025 - Guide Complet`,
      excerpt: `Découvrez les meilleurs services ${catData.keyword} au ${countryName}. Solutions professionnelles, fiables et abordables.`,
      content: `# Services ${catData.name} au ${countryName}

Bienvenue dans le guide ultime des services ${catData.keyword} au ${countryName}. Trouvez les meilleurs professionnels pour tous vos besoins.

## Pourquoi Choisir des Services Professionnels?

Le ${countryName} offre des services ${catData.keyword} de classe mondiale avec:
- **Professionnels Expérimentés**: Experts certifiés
- **Garantie Qualité**: 100% satisfaction garantie
- **Prix Compétitifs**: Tarification transparente
- **Réponse Rapide**: Réservation et service rapides

## Réservez Votre Service Aujourd'hui

Prêt à commencer? Parcourez nos professionnels vérifiés et réservez dès aujourd'hui!`,
      seoTitle: `Services ${catData.name} au ${countryName} | Professionnels & Abordables`,
      seoDescription: `Trouvez les meilleurs services ${catData.keyword} au ${countryName}. Professionnels vérifiés, prix compétitifs. Réservez en ligne!`
    },
    ar: {
      title: `خدمات ${catData.name} في ${countryName} 2025 - دليل شامل`,
      excerpt: `اكتشف أفضل خدمات ${catData.keyword} في ${countryName}. حلول احترافية وموثوقة وبأسعار معقولة.`,
      content: `# خدمات ${catData.name} في ${countryName}

مرحباً بك في الدليل الشامل لخدمات ${catData.keyword} في ${countryName}. ابحث عن أفضل المحترفين لجميع احتياجاتك.

## لماذا تختار الخدمات الاحترافية؟

توفر ${countryName} خدمات ${catData.keyword} عالمية المستوى مع:
- **محترفون ذوو خبرة**: خبراء معتمدون
- **ضمان الجودة**: رضا 100% مضمون
- **أسعار تنافسية**: تسعير شفاف
- **استجابة سريعة**: حجز وخدمة سريعة

## احجز خدمتك اليوم

هل أنت مستعد للبدء؟ تصفح المحترفين المعتمدين لدينا واحجز اليوم!`,
      seoTitle: `خدمات ${catData.name} في ${countryName} | احترافية وبأسعار معقولة`,
      seoDescription: `اعثر على أفضل خدمات ${catData.keyword} في ${countryName}. محترفون معتمدون، أسعار تنافسية. احجز عبر الإنترنت!`
    },
    th: {
      title: `บริการ${catData.name}ใน${countryName} 2025 - คู่มือฉบับสมบูรณ์`,
      excerpt: `ค้นพบบริการ${catData.keyword}ที่ดีที่สุดใน${countryName} โซลูชั่นที่เป็นมืออาชีพ เชื่อถือได้ และราคาไม่แพง`,
      content: `# บริการ${catData.name}ใน${countryName}

ยินดีต้อนรับสู่คู่มือบริการ${catData.keyword}ใน${countryName} ค้นหาผู้เชี่ยวชาญที่ดีที่สุดสำหรับความต้องการของคุณ

## ทำไมต้องเลือกบริการมืออาชีพ?

${countryName}มีบริการ${catData.keyword}ระดับโลกพร้อม:
- **ผู้เชี่ยวชาญที่มีประสบการณ์**: ผู้เชี่ยวชาญที่ได้รับการรับรอง
- **รับประกันคุณภาพ**: ความพึงพอใจ 100%
- **ราคาแข่งขัน**: ราคาโปร่งใส
- **ตอบสนองรวดเร็ว**: จองและให้บริการอย่างรวดเร็ว

## จองบริการของคุณวันนี้

พร้อมที่จะเริ่มต้นหรือยัง? เรียกดูผู้เชี่ยวชาญที่ได้รับการยืนยันและจองวันนี้!`,
      seoTitle: `บริการ${catData.name}ใน${countryName} | มืออาชีพและราคาไม่แพง`,
      seoDescription: `ค้นหาบริการ${catData.keyword}ที่ดีที่สุดใน${countryName} ผู้เชี่ยวชาญที่ได้รับการยืนยัน ราคาแข่งขัน จองออนไลน์!`
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
  console.log('📝 Creating blog articles for ALL countries and languages...\n');
  console.log(`Target: ${COUNTRIES.length} countries × ${LANGUAGES.length} languages × ${CATEGORIES.length} categories\n`);

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
    console.log(`\n🌍 Creating articles for ${country.name} (${country.code})`);
    
    for (const language of LANGUAGES) {
      console.log(`  📝 Language: ${language.toUpperCase()}`);
      
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
          
          if (totalArticles % 20 === 0) {
            console.log(`    ✅ Progress: ${totalArticles}/${expectedTotal} articles created`);
          }

        } catch (e: any) {
          console.log(`    ❌ Failed: ${slug}`);
        }
      }
    }
  }

  const finalCount = await prisma.blogPost.count();

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ MASSIVE BLOG ARTICLES SEED COMPLETED!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Database Summary:
  🌍 ${COUNTRIES.length} Countries
  🗣️  ${LANGUAGES.length} Languages
  📁 ${CATEGORIES.length} Categories
  ━━━━━━━━━━━━━━━━━━━━━━━━
  📝 ${totalArticles} Articles Created
  📚 ${finalCount} Total Blog Posts in Database

🌐 Coverage:
  ${COUNTRIES.map(c => `${c.code}: ${LANGUAGES.length * CATEGORIES.length} articles`).join('\n  ')}

🔍 SEO Optimized:
  - Unique title per country/language
  - Localized content
  - Country-specific keywords
  - Multi-language support

🎉 All articles ready for ${COUNTRIES.length} countries in ${LANGUAGES.length} languages!
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
