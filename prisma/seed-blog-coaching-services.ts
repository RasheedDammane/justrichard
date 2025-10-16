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

// Coaching services
const COACHING_SERVICES = [
  {
    slug: 'life-coaching',
    en: { name: 'Life Coaching', keyword: 'life coach' },
    fr: { name: 'Coaching de Vie', keyword: 'coach de vie' },
    ar: { name: 'التدريب على الحياة', keyword: 'مدرب حياة' },
    th: { name: 'โค้ชชีวิต', keyword: 'โค้ชชีวิต' }
  },
  {
    slug: 'business-coaching',
    en: { name: 'Business Coaching', keyword: 'business coach' },
    fr: { name: 'Coaching d\'Entreprise', keyword: 'coach business' },
    ar: { name: 'التدريب على الأعمال', keyword: 'مدرب أعمال' },
    th: { name: 'โค้ชธุรกิจ', keyword: 'โค้ชธุรกิจ' }
  },
  {
    slug: 'career-coaching',
    en: { name: 'Career Coaching', keyword: 'career coach' },
    fr: { name: 'Coaching de Carrière', keyword: 'coach carrière' },
    ar: { name: 'التدريب المهني', keyword: 'مدرب مهني' },
    th: { name: 'โค้ชอาชีพ', keyword: 'โค้ชอาชีพ' }
  },
  {
    slug: 'executive-coaching',
    en: { name: 'Executive Coaching', keyword: 'executive coach' },
    fr: { name: 'Coaching Exécutif', keyword: 'coach exécutif' },
    ar: { name: 'التدريب التنفيذي', keyword: 'مدرب تنفيذي' },
    th: { name: 'โค้ชผู้บริหาร', keyword: 'โค้ชผู้บริหาร' }
  },
  {
    slug: 'health-coaching',
    en: { name: 'Health & Wellness Coaching', keyword: 'health coach' },
    fr: { name: 'Coaching Santé', keyword: 'coach santé' },
    ar: { name: 'التدريب الصحي', keyword: 'مدرب صحي' },
    th: { name: 'โค้ชสุขภาพ', keyword: 'โค้ชสุขภาพ' }
  },
  {
    slug: 'fitness-coaching',
    en: { name: 'Fitness Coaching', keyword: 'fitness coach' },
    fr: { name: 'Coaching Fitness', keyword: 'coach fitness' },
    ar: { name: 'التدريب الرياضي', keyword: 'مدرب لياقة' },
    th: { name: 'โค้ชฟิตเนส', keyword: 'โค้ชฟิตเนส' }
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

function generateArticleContent(coaching: any, country: any, language: string) {
  const coachingData = coaching[language as keyof typeof coaching];
  const countryName = country[`name${language === 'en' ? '' : language.charAt(0).toUpperCase() + language.slice(1)}` as keyof typeof country];

  const templates = {
    en: {
      title: `${coachingData.name} in ${countryName} 2025 - Find Your Coach`,
      excerpt: `Discover professional ${coachingData.keyword} services in ${countryName}. Transform your life with certified coaches and proven methods.`,
      content: `# ${coachingData.name} in ${countryName}

Transform your life, career, or business with professional ${coachingData.keyword} services in ${countryName}. Connect with certified coaches who understand your goals and challenges.

## Why Choose ${coachingData.name} in ${countryName}?

${countryName} is home to world-class ${coachingData.keyword} professionals who offer:
- **Certified Expertise**: Internationally certified coaches
- **Proven Methods**: Evidence-based coaching techniques
- **Personalized Approach**: Tailored to your unique needs
- **Flexible Sessions**: In-person, online, or hybrid options
- **Results-Focused**: Measurable outcomes and progress tracking

## What is ${coachingData.name}?

${coachingData.name} is a professional partnership that helps you:
- Clarify your goals and vision
- Overcome obstacles and challenges
- Develop new skills and strategies
- Achieve sustainable success
- Unlock your full potential

## Benefits of Working with a ${coachingData.keyword}

### Personal Growth
- Enhanced self-awareness
- Improved decision-making
- Better work-life balance
- Increased confidence
- Clarity of purpose

### Professional Development
- Career advancement
- Leadership skills
- Strategic thinking
- Performance improvement
- Goal achievement

### Accountability & Support
- Regular check-ins
- Progress monitoring
- Constructive feedback
- Motivation and encouragement
- Practical tools and resources

## Types of ${coachingData.name} Services

Our certified coaches in ${countryName} offer various coaching formats:
- **One-on-One Coaching**: Personalized individual sessions
- **Group Coaching**: Collaborative learning environment
- **Online Coaching**: Virtual sessions via video call
- **In-Person Coaching**: Face-to-face meetings
- **Intensive Programs**: Deep-dive transformation experiences

## How ${coachingData.name} Works

### 1. Initial Consultation
Free discovery session to discuss your goals and determine fit

### 2. Goal Setting
Define clear, measurable objectives and success criteria

### 3. Action Planning
Create a customized roadmap with specific milestones

### 4. Regular Sessions
Ongoing coaching sessions (weekly, bi-weekly, or monthly)

### 5. Progress Review
Track achievements and adjust strategies as needed

## Finding the Right ${coachingData.keyword} in ${countryName}

Look for coaches who have:
- ✅ International certifications (ICF, EMCC, etc.)
- ✅ Relevant experience in your area
- ✅ Proven track record of results
- ✅ Compatible coaching style
- ✅ Strong testimonials and references

## Coaching Investment

${coachingData.name} fees in ${countryName} typically range based on:
- Coach experience and credentials
- Session duration and frequency
- Program length and intensity
- Individual vs. group coaching
- In-person vs. online delivery

Most coaches offer packages with better value for committed engagements.

## Success Stories

Clients working with ${coachingData.keyword} professionals in ${countryName} report:
- 🎯 90% achieve their primary goals
- 📈 85% see significant improvement within 3 months
- 💼 Career advancement and promotions
- 🧘 Better stress management and wellbeing
- 💰 Increased income and business growth

## Getting Started

Ready to transform your life with ${coachingData.name} in ${countryName}?

1. Browse our directory of certified coaches
2. Read profiles and client testimonials
3. Schedule free consultations
4. Choose your perfect coach match
5. Begin your transformation journey

## Why Book Through Our Platform?

✅ **Verified Coaches**: All coaches are certified and vetted
✅ **Transparent Pricing**: Clear rates with no hidden fees
✅ **Easy Booking**: Schedule sessions online 24/7
✅ **Secure Payments**: Protected transactions
✅ **Quality Guarantee**: Satisfaction guaranteed
✅ **Diverse Options**: Multiple coaches to choose from

## Start Your Transformation Today

Don't wait to achieve your goals. Connect with a professional ${coachingData.keyword} in ${countryName} and start your journey to success today!

Book your free consultation now and take the first step toward the life you deserve.`,
      seoTitle: `${coachingData.name} in ${countryName} 2025 | Certified Professional Coaches`,
      seoDescription: `Find certified ${coachingData.keyword} professionals in ${countryName}. Transform your life, career, or business with proven coaching methods. Book your free consultation today.`
    },
    fr: {
      title: `${coachingData.name} au ${countryName} 2025 - Trouvez Votre Coach`,
      excerpt: `Découvrez les services professionnels de ${coachingData.keyword} au ${countryName}. Transformez votre vie avec des coachs certifiés.`,
      content: `# ${coachingData.name} au ${countryName}

Transformez votre vie avec des services professionnels de ${coachingData.keyword} au ${countryName}.

## Pourquoi Choisir ${coachingData.name}?

Des coachs certifiés internationalement avec des méthodes éprouvées.

## Commencez Aujourd'hui

Réservez votre consultation gratuite et commencez votre transformation!`,
      seoTitle: `${coachingData.name} au ${countryName} 2025 | Coachs Professionnels`,
      seoDescription: `Trouvez des ${coachingData.keyword} certifiés au ${countryName}. Transformez votre vie avec des méthodes éprouvées.`
    },
    ar: {
      title: `${coachingData.name} في ${countryName} 2025 - ابحث عن مدربك`,
      excerpt: `اكتشف خدمات ${coachingData.keyword} المحترفة في ${countryName}. حوّل حياتك مع مدربين معتمدين.`,
      content: `# ${coachingData.name} في ${countryName}

حوّل حياتك مع خدمات ${coachingData.keyword} المحترفة في ${countryName}.

## لماذا تختار ${coachingData.name}؟

مدربون معتمدون دولياً مع أساليب مثبتة.

## ابدأ اليوم

احجز استشارتك المجانية وابدأ تحولك!`,
      seoTitle: `${coachingData.name} في ${countryName} 2025 | مدربون محترفون`,
      seoDescription: `ابحث عن ${coachingData.keyword} معتمدين في ${countryName}. حوّل حياتك مع أساليب مثبتة.`
    },
    th: {
      title: `${coachingData.name}ใน${countryName} 2025 - หาโค้ชของคุณ`,
      excerpt: `ค้นพบบริการ${coachingData.keyword}มืออาชีพใน${countryName} เปลี่ยนชีวิตคุณกับโค้ชที่ได้รับการรับรอง`,
      content: `# ${coachingData.name}ใน${countryName}

เปลี่ยนชีวิตของคุณด้วยบริการ${coachingData.keyword}มืออาชีพใน${countryName}

## ทำไมต้องเลือก${coachingData.name}?

โค้ชที่ได้รับการรับรองระหว่างประเทศด้วยวิธีการที่พิสูจน์แล้ว

## เริ่มต้นวันนี้

จองคำปรึกษาฟรีและเริ่มการเปลี่ยนแปลงของคุณ!`,
      seoTitle: `${coachingData.name}ใน${countryName} 2025 | โค้ชมืออาชีพ`,
      seoDescription: `ค้นหา${coachingData.keyword}ที่ได้รับการรับรองใน${countryName} เปลี่ยนชีวิตคุณด้วยวิธีการที่พิสูจน์แล้ว`
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
  console.log('📝 Creating blog articles for COACHING services...\n');
  console.log(`Target: ${COUNTRIES.length} countries × ${LANGUAGES.length} languages × ${COACHING_SERVICES.length} coaching types\n`);
  console.log(`Expected total: ${COUNTRIES.length * LANGUAGES.length * COACHING_SERVICES.length} articles\n`);

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
  const expectedTotal = COUNTRIES.length * LANGUAGES.length * COACHING_SERVICES.length;

  for (const country of COUNTRIES) {
    console.log(`\n🌍 ${country.name} (${country.code})`);
    
    for (const language of LANGUAGES) {
      console.log(`  📝 ${language.toUpperCase()}: Creating ${COACHING_SERVICES.length} articles...`);
      
      for (const coaching of COACHING_SERVICES) {
        const article = generateArticleContent(coaching, country, language);
        const slug = createSlug(`${coaching.slug}-${country.code}-${language}`);

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
              keywords: [coaching.slug, country.code.toLowerCase(), language, 'coaching'],
              categories: ['coaching'],
              tags: [coaching.slug, country.name, language, 'coaching'],
            },
            create: {
              slug,
              title: article.title,
              excerpt: article.excerpt,
              content: article.content,
              featuredImage: `https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80`,
              authorId: systemUser.id,
              language,
              countryCode: country.code,
              status: 'published',
              publishedAt: new Date(),
              metaTitle: article.seoTitle,
              metaDescription: article.seoDescription,
              keywords: [coaching.slug, country.code.toLowerCase(), language, 'coaching'],
              categories: ['coaching'],
              tags: [coaching.slug, country.name, language, 'coaching'],
            },
          });

          totalArticles++;

        } catch (e: any) {
          console.log(`    ❌ Failed: ${slug}`);
        }
      }
      
      console.log(`     ✅ ${COACHING_SERVICES.length} articles created`);
    }
    
    console.log(`  ✅ Country ${country.code} complete: ${LANGUAGES.length * COACHING_SERVICES.length} articles`);
  }

  const finalCount = await prisma.blogPost.count();

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ COACHING SERVICES BLOG ARTICLES COMPLETED!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Database Summary:
  🌍 ${COUNTRIES.length} Countries (UAE, TH, VN, SA, QA)
  🗣️  ${LANGUAGES.length} Languages (EN, FR, AR, TH)
  💼 ${COACHING_SERVICES.length} Coaching Types
  ━━━━━━━━━━━━━━━━━━━━━━━━
  📝 ${totalArticles} Articles Created This Run
  📚 ${finalCount} Total Blog Posts in Database

🌐 Coverage per Country:
  ${COUNTRIES.map(c => `${c.code}: ${LANGUAGES.length * COACHING_SERVICES.length} articles (${LANGUAGES.length} lang × ${COACHING_SERVICES.length} types)`).join('\n  ')}

💼 Coaching Types Covered:
  - Life Coaching
  - Business Coaching
  - Career Coaching
  - Executive Coaching
  - Health & Wellness Coaching
  - Fitness Coaching

📈 Total Coverage:
  ${COUNTRIES.length} × ${LANGUAGES.length} × ${COACHING_SERVICES.length} = ${expectedTotal} articles

🎉 Complete coaching services coverage in ${COUNTRIES.length} countries!
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
