import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const routes = [
  // Main Navigation
  {
    key: 'home',
    path: '/',
    title: { en: 'Home', fr: 'Accueil', ar: 'الرئيسية' },
    description: { en: 'Homepage', fr: 'Page d\'accueil', ar: 'الصفحة الرئيسية' },
    menu: 'main',
    group: null,
    order: 1,
    isVisible: true,
    isSystem: true,
    icon: 'home',
    requireAuth: false,
  },
  {
    key: 'properties',
    path: '/properties',
    title: { en: 'Properties', fr: 'Propriétés', ar: 'العقارات' },
    description: { en: 'Browse properties', fr: 'Parcourir les propriétés', ar: 'تصفح العقارات' },
    menu: 'main',
    group: 'services',
    order: 2,
    isVisible: true,
    isSystem: false,
    icon: 'building',
    requireAuth: false,
  },
  {
    key: 'yachts',
    path: '/yachts',
    title: { en: 'Yachts', fr: 'Yachts', ar: 'اليخوت' },
    description: { en: 'Luxury yacht rentals', fr: 'Location de yachts de luxe', ar: 'تأجير اليخوت الفاخرة' },
    menu: 'main',
    group: 'services',
    order: 3,
    isVisible: true,
    isSystem: false,
    icon: 'anchor',
    requireAuth: false,
  },
  {
    key: 'cars',
    path: '/rental-cars',
    title: { en: 'Car Rental', fr: 'Location de voitures', ar: 'تأجير السيارات' },
    description: { en: 'Rent a car', fr: 'Louer une voiture', ar: 'استئجار سيارة' },
    menu: 'main',
    group: 'services',
    order: 4,
    isVisible: true,
    isSystem: false,
    icon: 'car',
    requireAuth: false,
  },
  {
    key: 'motorbikes',
    path: '/motorbikes',
    title: { en: 'Motorbikes', fr: 'Motos', ar: 'الدراجات النارية' },
    description: { en: 'Rent a motorbike', fr: 'Louer une moto', ar: 'استئجار دراجة نارية' },
    menu: 'main',
    group: 'services',
    order: 5,
    isVisible: true,
    isSystem: false,
    icon: 'bike',
    requireAuth: false,
  },
  {
    key: 'doctors',
    path: '/doctors',
    title: { en: 'Doctors', fr: 'Médecins', ar: 'الأطباء' },
    description: { en: 'Find a doctor', fr: 'Trouver un médecin', ar: 'ابحث عن طبيب' },
    menu: 'main',
    group: 'professionals',
    order: 6,
    isVisible: true,
    isSystem: false,
    icon: 'stethoscope',
    requireAuth: false,
  },
  {
    key: 'lawyers',
    path: '/lawyers',
    title: { en: 'Lawyers', fr: 'Avocats', ar: 'المحامون' },
    description: { en: 'Find a lawyer', fr: 'Trouver un avocat', ar: 'ابحث عن محامي' },
    menu: 'main',
    group: 'professionals',
    order: 7,
    isVisible: true,
    isSystem: false,
    icon: 'scale',
    requireAuth: false,
  },
  {
    key: 'blog',
    path: '/blog',
    title: { en: 'Blog', fr: 'Blog', ar: 'المدونة' },
    description: { en: 'Latest news and articles', fr: 'Dernières actualités et articles', ar: 'آخر الأخبار والمقالات' },
    menu: 'main',
    group: null,
    order: 8,
    isVisible: true,
    isSystem: false,
    icon: 'newspaper',
    requireAuth: false,
  },
  {
    key: 'contact',
    path: '/contact',
    title: { en: 'Contact', fr: 'Contact', ar: 'اتصل بنا' },
    description: { en: 'Get in touch', fr: 'Nous contacter', ar: 'تواصل معنا' },
    menu: 'main',
    group: null,
    order: 9,
    isVisible: true,
    isSystem: false,
    icon: 'mail',
    requireAuth: false,
  },

  // Footer - Company
  {
    key: 'about',
    path: '/about',
    title: { en: 'About Us', fr: 'À propos', ar: 'معلومات عنا' },
    description: { en: 'Learn more about us', fr: 'En savoir plus sur nous', ar: 'تعرف علينا أكثر' },
    menu: 'footer',
    group: 'company',
    order: 1,
    isVisible: true,
    isSystem: false,
    requireAuth: false,
  },
  {
    key: 'careers',
    path: '/careers',
    title: { en: 'Careers', fr: 'Carrières', ar: 'الوظائف' },
    description: { en: 'Join our team', fr: 'Rejoignez notre équipe', ar: 'انضم إلى فريقنا' },
    menu: 'footer',
    group: 'company',
    order: 2,
    isVisible: true,
    isSystem: false,
    requireAuth: false,
  },

  // Footer - Legal
  {
    key: 'privacy',
    path: '/privacy',
    title: { en: 'Privacy Policy', fr: 'Politique de confidentialité', ar: 'سياسة الخصوصية' },
    description: { en: 'Our privacy policy', fr: 'Notre politique de confidentialité', ar: 'سياسة الخصوصية الخاصة بنا' },
    menu: 'footer',
    group: 'legal',
    order: 1,
    isVisible: true,
    isSystem: true,
    requireAuth: false,
  },
  {
    key: 'terms',
    path: '/terms',
    title: { en: 'Terms of Service', fr: 'Conditions d\'utilisation', ar: 'شروط الخدمة' },
    description: { en: 'Our terms of service', fr: 'Nos conditions d\'utilisation', ar: 'شروط الخدمة الخاصة بنا' },
    menu: 'footer',
    group: 'legal',
    order: 2,
    isVisible: true,
    isSystem: true,
    requireAuth: false,
  },

  // User Menu
  {
    key: 'dashboard',
    path: '/dashboard',
    title: { en: 'Dashboard', fr: 'Tableau de bord', ar: 'لوحة التحكم' },
    description: { en: 'User dashboard', fr: 'Tableau de bord utilisateur', ar: 'لوحة تحكم المستخدم' },
    menu: 'user',
    group: null,
    order: 1,
    isVisible: true,
    isSystem: false,
    requireAuth: true,
  },
  {
    key: 'bookings',
    path: '/bookings',
    title: { en: 'My Bookings', fr: 'Mes réservations', ar: 'حجوزاتي' },
    description: { en: 'View your bookings', fr: 'Voir vos réservations', ar: 'عرض حجوزاتك' },
    menu: 'user',
    group: null,
    order: 2,
    isVisible: true,
    isSystem: false,
    requireAuth: true,
  },
  {
    key: 'profile',
    path: '/profile',
    title: { en: 'Profile', fr: 'Profil', ar: 'الملف الشخصي' },
    description: { en: 'Manage your profile', fr: 'Gérer votre profil', ar: 'إدارة ملفك الشخصي' },
    menu: 'user',
    group: null,
    order: 3,
    isVisible: true,
    isSystem: false,
    requireAuth: true,
  },
];

async function seedRoutes() {
  console.log('🗺️  Seeding routes...\n');

  try {
    let createdCount = 0;
    let existingCount = 0;

    for (const route of routes) {
      const existing = await prisma.routeConfig.findUnique({
        where: { key: route.key },
      });

      if (!existing) {
        await prisma.routeConfig.create({
          data: route,
        });
        console.log(`✅ Created route: ${route.key} (${route.menu})`);
        createdCount++;
      } else {
        console.log(`⏭️  Route already exists: ${route.key}`);
        existingCount++;
      }
    }

    console.log('\n✨ Route seeding completed!');
    console.log(`📊 Created: ${createdCount}, Existing: ${existingCount}`);

    // Display statistics by menu
    const mainRoutes = await prisma.routeConfig.count({ where: { menu: 'main' } });
    const footerRoutes = await prisma.routeConfig.count({ where: { menu: 'footer' } });
    const userRoutes = await prisma.routeConfig.count({ where: { menu: 'user' } });
    
    console.log(`\n📊 Routes by menu:`);
    console.log(`   - Main: ${mainRoutes}`);
    console.log(`   - Footer: ${footerRoutes}`);
    console.log(`   - User: ${userRoutes}`);
  } catch (error) {
    console.error('❌ Error seeding routes:', error);
    throw error;
  }
}

seedRoutes()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
