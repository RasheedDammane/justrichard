import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding blog posts...\n');

  // Get or create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@communityhub.com' },
    update: {},
    create: {
      email: 'admin@communityhub.com',
      name: 'CommunityHub Admin',
      role: 'ADMIN',
    },
  });

  // Get cities
  const dubai = await prisma.city.findFirst({ where: { name: { contains: 'Dubai' } } });
  const bangkok = await prisma.city.findFirst({ where: { name: { contains: 'Bangkok' } } });
  const paris = await prisma.city.findFirst({ where: { name: { contains: 'Paris' } } });

  console.log('📝 Creating blog posts...\n');

  // English posts
  const enPosts = [
    {
      title: 'Top 10 Real Estate Tips for Dubai in 2025',
      slug: 'top-10-real-estate-tips-dubai-2025',
      excerpt: 'Discover the best strategies for buying and selling property in Dubai this year.',
      content: `# Top 10 Real Estate Tips for Dubai in 2025

Dubai's real estate market continues to thrive in 2025. Here are our top tips for navigating this dynamic market:

## 1. Research the Market
Understanding current trends is crucial for making informed decisions.

## 2. Work with Licensed Agents
Always choose RERA-registered real estate agents for your transactions.

## 3. Consider Location
Prime locations like Dubai Marina and Downtown Dubai offer excellent investment opportunities.

## 4. Check Developer Reputation
Research the developer's track record before committing to off-plan properties.

## 5. Understand Fees and Costs
Factor in registration fees, agent commissions, and maintenance costs.

Stay tuned for more insights!`,
      language: 'en',
      countryCode: 'AE',
      cityId: dubai?.id,
      categories: ['Real Estate', 'Dubai', 'Investment'],
      tags: ['property', 'dubai', 'tips', '2025'],
      status: 'published',
      publishedAt: new Date(),
      viewCount: 1250,
      likeCount: 89,
      authorId: admin.id,
    },
    {
      title: 'Finding the Perfect Coach in Bangkok',
      slug: 'finding-perfect-coach-bangkok',
      excerpt: 'A comprehensive guide to choosing the right fitness or wellness coach in Bangkok.',
      content: `# Finding the Perfect Coach in Bangkok

Bangkok offers a wealth of talented coaches across various disciplines. Here's how to find your perfect match:

## Types of Coaches Available
- Fitness & Personal Training
- Yoga & Meditation
- Life Coaching
- Business Coaching

## What to Look For
1. **Certifications**: Verify their credentials
2. **Experience**: Check their track record
3. **Specialization**: Match their expertise to your goals
4. **Reviews**: Read testimonials from previous clients

## Top Areas for Coaching
- Sukhumvit
- Thonglor
- Silom

Start your wellness journey today!`,
      language: 'en',
      countryCode: 'TH',
      cityId: bangkok?.id,
      categories: ['Coaching', 'Wellness', 'Bangkok'],
      tags: ['fitness', 'coaching', 'bangkok', 'wellness'],
      status: 'published',
      publishedAt: new Date(Date.now() - 86400000),
      viewCount: 890,
      likeCount: 67,
      authorId: admin.id,
    },
    {
      title: 'Legal Services in Dubai: What You Need to Know',
      slug: 'legal-services-dubai-guide',
      excerpt: 'Navigate the legal landscape in Dubai with our comprehensive guide.',
      content: `# Legal Services in Dubai: What You Need to Know

Understanding legal services in Dubai is essential for both residents and businesses.

## Common Legal Services
- Corporate Law
- Real Estate Law
- Employment Law
- Family Law

## Choosing a Lawyer
Look for lawyers registered with the Dubai Legal Affairs Department.

## Key Considerations
- Language capabilities
- Specialization
- Experience with UAE law
- Fee structure

Contact licensed professionals for your legal needs.`,
      language: 'en',
      countryCode: 'AE',
      cityId: dubai?.id,
      categories: ['Legal', 'Dubai', 'Business'],
      tags: ['lawyers', 'legal', 'dubai', 'business'],
      status: 'published',
      publishedAt: new Date(Date.now() - 172800000),
      viewCount: 1450,
      likeCount: 102,
      authorId: admin.id,
    },
  ];

  // French posts
  const frPosts = [
    {
      title: 'Guide Complet de l\'Immobilier à Paris',
      slug: 'guide-immobilier-paris-2025',
      excerpt: 'Tout ce que vous devez savoir pour acheter ou louer à Paris en 2025.',
      content: `# Guide Complet de l'Immobilier à Paris

Le marché immobilier parisien reste dynamique en 2025. Voici notre guide complet.

## Les Quartiers Prisés
- Le Marais
- Saint-Germain-des-Prés
- Montmartre

## Conseils d'Achat
1. Définissez votre budget
2. Choisissez le bon arrondissement
3. Faites appel à un agent immobilier
4. Vérifiez les diagnostics obligatoires

## Prix au m²
Les prix varient considérablement selon les arrondissements.

Contactez nos agents pour plus d'informations!`,
      language: 'fr',
      countryCode: 'FR',
      cityId: paris?.id,
      categories: ['Immobilier', 'Paris', 'France'],
      tags: ['immobilier', 'paris', 'achat', 'location'],
      status: 'published',
      publishedAt: new Date(Date.now() - 259200000),
      viewCount: 780,
      likeCount: 54,
      authorId: admin.id,
    },
    {
      title: 'Les Meilleurs Coachs Sportifs à Paris',
      slug: 'meilleurs-coachs-sportifs-paris',
      excerpt: 'Découvrez comment choisir le coach sportif idéal à Paris.',
      content: `# Les Meilleurs Coachs Sportifs à Paris

Paris regorge de coachs sportifs talentueux. Voici comment faire le bon choix.

## Types de Coaching
- Musculation
- Yoga
- Pilates
- Course à pied

## Critères de Sélection
- Diplômes et certifications
- Expérience
- Disponibilité
- Tarifs

## Où Trouver un Coach
- Salles de sport
- Plateformes en ligne
- Recommandations

Commencez votre transformation aujourd'hui!`,
      language: 'fr',
      countryCode: 'FR',
      cityId: paris?.id,
      categories: ['Sport', 'Coaching', 'Paris'],
      tags: ['coach', 'sport', 'paris', 'fitness'],
      status: 'published',
      publishedAt: new Date(Date.now() - 345600000),
      viewCount: 650,
      likeCount: 45,
      authorId: admin.id,
    },
  ];

  // Arabic posts
  const arPosts = [
    {
      title: 'دليل شامل للعقارات في دبي 2025',
      slug: 'dubai-real-estate-guide-ar',
      excerpt: 'كل ما تحتاج معرفته عن سوق العقارات في دبي',
      content: `# دليل شامل للعقارات في دبي 2025

سوق العقارات في دبي يشهد نمواً مستمراً. إليك دليلنا الشامل.

## المناطق المميزة
- دبي مارينا
- وسط مدينة دبي
- نخلة جميرا

## نصائح للشراء
1. حدد ميزانيتك
2. اختر الموقع المناسب
3. تعامل مع وكلاء معتمدين
4. تحقق من سمعة المطور

## الرسوم والتكاليف
تأكد من فهم جميع التكاليف المرتبطة بالشراء.

اتصل بوكلائنا للمزيد من المعلومات!`,
      language: 'ar',
      countryCode: 'AE',
      cityId: dubai?.id,
      categories: ['عقارات', 'دبي', 'استثمار'],
      tags: ['عقارات', 'دبي', 'شراء', 'استثمار'],
      status: 'published',
      publishedAt: new Date(Date.now() - 432000000),
      viewCount: 1100,
      likeCount: 78,
      authorId: admin.id,
    },
    {
      title: 'أفضل المدربين الشخصيين في دبي',
      slug: 'best-personal-trainers-dubai-ar',
      excerpt: 'اكتشف كيفية اختيار المدرب الشخصي المثالي في دبي',
      content: `# أفضل المدربين الشخصيين في دبي

دبي تضم مدربين شخصيين محترفين في مختلف المجالات.

## أنواع التدريب
- اللياقة البدنية
- اليوغا
- التدريب الرياضي
- التغذية

## معايير الاختيار
- الشهادات المعتمدة
- الخبرة
- التخصص
- التقييمات

## أفضل المناطق
- دبي مارينا
- جميرا
- وسط المدينة

ابدأ رحلتك الصحية اليوم!`,
      language: 'ar',
      countryCode: 'AE',
      cityId: dubai?.id,
      categories: ['رياضة', 'تدريب', 'دبي'],
      tags: ['مدرب', 'لياقة', 'دبي', 'صحة'],
      status: 'published',
      publishedAt: new Date(Date.now() - 518400000),
      viewCount: 920,
      likeCount: 63,
      authorId: admin.id,
    },
  ];

  // Create all posts
  const allPosts = [...enPosts, ...frPosts, ...arPosts];
  
  for (const postData of allPosts) {
    try {
      await prisma.blogPost.create({
        data: postData,
      });
      console.log(`✅ Created: ${postData.title}`);
    } catch (error: any) {
      console.log(`⚠️  Skipped (already exists): ${postData.title}`);
    }
  }

  const totalPosts = await prisma.blogPost.count();

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ BLOG SEEDING COMPLETED!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Summary:
  • Total blog posts: ${totalPosts}
  • English posts: ${enPosts.length}
  • French posts: ${frPosts.length}
  • Arabic posts: ${arPosts.length}

🌐 Test URLs:
  English: http://localhost:3000/en/blog
  French:  http://localhost:3000/fr/blog
  Arabic:  http://localhost:3000/ar/blog

📝 API:
  GET http://localhost:3000/api/blog?language=en
  GET http://localhost:3000/api/blog?language=fr&country=FR
  GET http://localhost:3000/api/blog?language=ar&country=AE
  `);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding blog:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
