#!/usr/bin/env tsx

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper to create slug
function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Supported locales
const LOCALES = ['en', 'fr', 'ar', 'th'];

// Categories with full i18n and SEO
const CATEGORIES_DATA = [
  {
    slug: 'home-improvement',
    icon: '🏠',
    order: 1,
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
    translations: {
      en: {
        name: 'Home Improvement',
        description: 'Transform your home with professional renovation, interior design, and improvement services. Expert contractors for all your home enhancement needs.',
        seoTitle: 'Home Improvement Services | Professional Renovation & Design',
        seoDescription: 'Find trusted home improvement professionals for renovation, interior design, carpentry, and more. Quality services with guaranteed satisfaction.'
      },
      fr: {
        name: 'Amélioration de la Maison',
        description: 'Transformez votre maison avec des services professionnels de rénovation, design intérieur et amélioration.',
        seoTitle: 'Services d\'Amélioration de Maison | Rénovation Professionnelle',
        seoDescription: 'Trouvez des professionnels de confiance pour la rénovation, le design intérieur, la menuiserie et plus.'
      },
      ar: {
        name: 'تحسين المنزل',
        description: 'حوّل منزلك مع خدمات التجديد والتصميم الداخلي المحترفة',
        seoTitle: 'خدمات تحسين المنزل | تجديد وتصميم احترافي',
        seoDescription: 'ابحث عن محترفين موثوقين للتجديد والتصميم الداخلي والنجارة والمزيد'
      },
      th: {
        name: 'ปรับปรุงบ้าน',
        description: 'เปลี่ยนบ้านของคุณด้วยบริการรีโนเวทและออกแบบตกแต่งภายในแบบมืออาชีพ',
        seoTitle: 'บริการปรับปรุงบ้าน | รีโนเวทและออกแบบมืออาชีพ',
        seoDescription: 'หาผู้เชี่ยวชาญที่เชื่อถือได้สำหรับการรีโนเวท ออกแบบตกแต่งภายใน งานไม้ และอื่นๆ'
      }
    },
    services: [
      'Renovation Contractor', 'Interior Designer', 'Architect', 'Kitchen Cabinet',
      'Custom Furniture Carpenter', 'Lighting Installer', 'Wooden Flooring',
      'Wallpaper Installer', 'Glass Installer', 'Auto-gate Installer',
      'Ceiling Contractor', 'Carpet Installer', 'Tile Supplier',
      'Tiling Contractor', 'Window Installer', 'Door Installer',
      'Swimming Pool Builder', 'Solar Panel Installer', 'Home Theatre Specialist',
      'Sound System Specialist', 'Home Automation', 'House Painting'
    ]
  },
  {
    slug: 'home-maintenance',
    icon: '🧰',
    order: 2,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
    translations: {
      en: {
        name: 'Home Maintenance',
        description: 'Keep your home in perfect condition with professional maintenance and repair services. Expert handymen for all your home needs.',
        seoTitle: 'Home Maintenance Services | Professional Repairs & Maintenance',
        seoDescription: 'Reliable home maintenance services including plumbing, electrical, HVAC, and general repairs. Fast response and quality workmanship.'
      },
      fr: {
        name: 'Entretien de Maison',
        description: 'Maintenez votre maison en parfait état avec des services professionnels d\'entretien et de réparation.',
        seoTitle: 'Services d\'Entretien de Maison | Réparations Professionnelles',
        seoDescription: 'Services d\'entretien fiables incluant plomberie, électricité, climatisation et réparations générales.'
      },
      ar: {
        name: 'صيانة المنزل',
        description: 'حافظ على منزلك في حالة مثالية مع خدمات الصيانة والإصلاح المحترفة',
        seoTitle: 'خدمات صيانة المنزل | إصلاحات احترافية',
        seoDescription: 'خدمات صيانة موثوقة تشمل السباكة والكهرباء والتكييف والإصلاحات العامة'
      },
      th: {
        name: 'ซ่อมบำรุงบ้าน',
        description: 'รักษาบ้านของคุณให้อยู่ในสภาพสมบูรณ์ด้วยบริการซ่อมบำรุงแบบมืออาชีพ',
        seoTitle: 'บริการซ่อมบำรุงบ้าน | ซ่อมแซมมืออาชีพ',
        seoDescription: 'บริการซ่อมบำรุงที่เชื่อถือได้ รวมถึงงานประปา ไฟฟ้า แอร์ และการซ่อมแซมทั่วไป'
      }
    },
    services: [
      'Plumber', 'Electrician', 'Handyman', 'Locksmith', 'Pest Control',
      'Aircon Servicing', 'Water Heater Repair', 'Furniture Repair',
      'Grass Cutter', 'Carpet Cleaning', 'Floor Polish', 'Waterproofing',
      'Roof Cleaning', 'TV Mounting', 'Ceiling Fan Repair'
    ]
  },
  {
    slug: 'cleaning-and-disinfection',
    icon: '🧽',
    order: 3,
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800',
    translations: {
      en: {
        name: 'Cleaning & Disinfection',
        description: 'Professional cleaning and disinfection services for a spotless and healthy home. Trusted cleaners with eco-friendly products.',
        seoTitle: 'Professional Cleaning Services | Home & Office Disinfection',
        seoDescription: 'Expert cleaning and disinfection services. Deep cleaning, sanitization, and eco-friendly solutions for homes and offices.'
      },
      fr: {
        name: 'Nettoyage et Désinfection',
        description: 'Services professionnels de nettoyage et désinfection pour une maison impeccable et saine.',
        seoTitle: 'Services de Nettoyage Professionnel | Désinfection Maison & Bureau',
        seoDescription: 'Services experts en nettoyage et désinfection. Nettoyage en profondeur et solutions écologiques.'
      },
      ar: {
        name: 'التنظيف والتعقيم',
        description: 'خدمات تنظيف وتعقيم احترافية لمنزل نظيف وصحي',
        seoTitle: 'خدمات التنظيف الاحترافية | تعقيم المنزل والمكتب',
        seoDescription: 'خدمات تنظيف وتعقيم خبيرة. تنظيف عميق وحلول صديقة للبيئة'
      },
      th: {
        name: 'ทำความสะอาดและฆ่าเชื้อ',
        description: 'บริการทำความสะอาดและฆ่าเชื้อแบบมืออาชีพเพื่อบ้านที่สะอาดและสุขภาพดี',
        seoTitle: 'บริการทำความสะอาดมืออาชีพ | ฆ่าเชื้อบ้านและออฟฟิศ',
        seoDescription: 'บริการทำความสะอาดและฆ่าเชื้อผู้เชี่ยวชาญ ทำความสะอาดลึกและโซลูชั่นที่เป็นมิตรกับสิ่งแวดล้อม'
      }
    },
    services: [
      'Home Cleaning', 'Carpet Cleaning', 'Sofa Cleaning', 
      'Post Renovation Cleaning', 'Move In/Out Cleaning', 
      'Disinfection Services', 'Curtain Cleaning'
    ]
  },
  {
    slug: 'events-and-weddings',
    icon: '💍',
    order: 4,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    translations: {
      en: {
        name: 'Events & Weddings',
        description: 'Make your special day perfect with our comprehensive event and wedding services. From planning to execution, we handle it all.',
        seoTitle: 'Event & Wedding Services | Professional Event Planning',
        seoDescription: 'Complete event and wedding services including planning, catering, photography, decoration, and more. Make your celebration unforgettable.'
      },
      fr: {
        name: 'Événements et Mariages',
        description: 'Rendez votre jour spécial parfait avec nos services complets d\'événements et mariages.',
        seoTitle: 'Services Événements & Mariages | Planification Professionnelle',
        seoDescription: 'Services complets pour événements et mariages incluant planification, restauration, photographie et plus.'
      },
      ar: {
        name: 'الفعاليات والأعراس',
        description: 'اجعل يومك المميز مثالياً مع خدماتنا الشاملة للفعاليات والأعراس',
        seoTitle: 'خدمات الفعاليات والأعراس | تخطيط احترافي',
        seoDescription: 'خدمات شاملة للفعاليات والأعراس تشمل التخطيط والضيافة والتصوير والمزيد'
      },
      th: {
        name: 'งานอีเว้นท์และงานแต่ง',
        description: 'ทำให้วันพิเศษของคุณสมบูรณ์แบบด้วยบริการงานอีเว้นท์และงานแต่งที่ครบครัน',
        seoTitle: 'บริการงานอีเว้นท์และงานแต่ง | วางแผนมืออาชีพ',
        seoDescription: 'บริการงานอีเว้นท์และงานแต่งครบวงจร รวมถึงการวางแผน จัดเลี้ยง ถ่ายภาพ และอื่นๆ'
      }
    },
    services: [
      'Wedding Planner', 'Event Photographer', 'Caterer', 'Wedding Cake',
      'Makeup Artist', 'Wedding Dress Designer', 'Videographer', 
      'Event Decorator', 'DJ', 'Wedding Car Rental'
    ]
  },
  {
    slug: 'wellness',
    icon: '💆',
    order: 5,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
    translations: {
      en: {
        name: 'Wellness',
        description: 'Enhance your wellbeing with professional wellness and care services. Personal trainers, massage therapists, and health experts.',
        seoTitle: 'Wellness Services | Personal Training & Health Care',
        seoDescription: 'Professional wellness services including personal training, massage therapy, yoga, pilates, and holistic health care.'
      },
      fr: {
        name: 'Bien-être',
        description: 'Améliorez votre bien-être avec des services professionnels de santé et soins.',
        seoTitle: 'Services Bien-être | Entraînement Personnel & Soins',
        seoDescription: 'Services professionnels de bien-être incluant coaching personnel, massage, yoga et soins holistiques.'
      },
      ar: {
        name: 'العافية',
        description: 'عزز صحتك مع خدمات العافية والرعاية المحترفة',
        seoTitle: 'خدمات العافية | تدريب شخصي ورعاية صحية',
        seoDescription: 'خدمات عافية احترافية تشمل التدريب الشخصي والمساج واليوغا والرعاية الصحية الشاملة'
      },
      th: {
        name: 'สุขภาพและความงาม',
        description: 'ยกระดับสุขภาพของคุณด้วยบริการสุขภาพและดูแลแบบมืออาชีพ',
        seoTitle: 'บริการสุขภาพและความงาม | เทรนเนอร์ส่วนตัวและดูแลสุขภาพ',
        seoDescription: 'บริการสุขภาพมืออาชีพรวมถึงเทรนเนอร์ส่วนตัว นวดบำบัด โยคะ และดูแลสุขภาพแบบองค์รวม'
      }
    },
    services: [
      'Personal Trainer', 'Home Massage', 'Yoga Instructor', 
      'Pilates Instructor', 'Physiotherapist', 'Nutritionist',
      'Meditation Coach', 'Martial Arts Instructor'
    ]
  },
  {
    slug: 'lessons',
    icon: '🎓',
    order: 6,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
    translations: {
      en: {
        name: 'Lessons & Learning',
        description: 'Learn new skills with professional instructors and teachers. Music, languages, sports, and academic tutoring.',
        seoTitle: 'Private Lessons & Tutoring | Learn New Skills',
        seoDescription: 'Professional private lessons in music, languages, sports, arts, and academics. Expert instructors for all ages and levels.'
      },
      fr: {
        name: 'Cours et Apprentissage',
        description: 'Apprenez de nouvelles compétences avec des instructeurs professionnels.',
        seoTitle: 'Cours Privés et Tutorat | Apprendre de Nouvelles Compétences',
        seoDescription: 'Cours privés professionnels en musique, langues, sports, arts et académiques.'
      },
      ar: {
        name: 'الدروس والتعلم',
        description: 'تعلم مهارات جديدة مع مدربين ومعلمين محترفين',
        seoTitle: 'دروس خاصة وتدريس | تعلم مهارات جديدة',
        seoDescription: 'دروس خاصة احترافية في الموسيقى واللغات والرياضة والفنون والأكاديميات'
      },
      th: {
        name: 'บทเรียนและการเรียนรู้',
        description: 'เรียนรู้ทักษะใหม่กับครูและวิทยากรมืออาชีพ',
        seoTitle: 'บทเรียนส่วนตัวและติวเตอร์ | เรียนรู้ทักษะใหม่',
        seoDescription: 'บทเรียนส่วนตัวมืออาชีพในด้านดนตรี ภาษา กีฬา ศิลปะ และวิชาการ'
      }
    },
    services: [
      'Piano Lessons', 'Guitar Lessons', 'English Tutor', 'Swimming Coach',
      'Tennis Coach', 'Art Classes', 'Cooking Classes', 'Dance Lessons'
    ]
  },
  {
    slug: 'business',
    icon: '💼',
    order: 7,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    translations: {
      en: {
        name: 'Business Services',
        description: 'Professional business services to help grow your company. Marketing, accounting, web design, and consulting.',
        seoTitle: 'Professional Business Services | Marketing & Consulting',
        seoDescription: 'Expert business services including digital marketing, web design, accounting, consulting, and software development.'
      },
      fr: {
        name: 'Services d\'Entreprise',
        description: 'Services professionnels pour aider votre entreprise à croître.',
        seoTitle: 'Services d\'Entreprise Professionnels | Marketing & Conseil',
        seoDescription: 'Services d\'entreprise experts incluant marketing digital, web design, comptabilité et conseil.'
      },
      ar: {
        name: 'خدمات الأعمال',
        description: 'خدمات أعمال احترافية لمساعدة شركتك على النمو',
        seoTitle: 'خدمات الأعمال الاحترافية | التسويق والاستشارات',
        seoDescription: 'خدمات أعمال خبيرة تشمل التسويق الرقمي وتصميم المواقع والمحاسبة والاستشارات'
      },
      th: {
        name: 'บริการธุรกิจ',
        description: 'บริการธุรกิจมืออาชีพเพื่อช่วยให้บริษัทของคุณเติบโต',
        seoTitle: 'บริการธุรกิจมืออาชีพ | การตลาดและที่ปรึกษา',
        seoDescription: 'บริการธุรกิจผู้เชี่ยวชาญรวมถึงการตลาดดิจิทัล เว็บดีไซน์ บัญชี และให้คำปรึกษา'
      }
    },
    services: [
      'Web Designer', 'Digital Marketing', 'Corporate Accountant',
      'Graphic Designer', 'Video Editor', 'Software Developer',
      'Business Consultant', 'Social Media Manager'
    ]
  }
];

async function main() {
  console.log('🌍 Starting comprehensive multilingual seed with SEO...\n');

  let totalCategories = 0;
  let totalServices = 0;
  let totalTranslations = 0;

  for (const catData of CATEGORIES_DATA) {
    console.log(`\n📁 Creating category: ${catData.slug}`);

    // Create/Update category
    const category = await prisma.category.upsert({
      where: { slug: catData.slug },
      update: {
        icon: catData.icon,
        image: catData.image,
        order: catData.order,
        isActive: true,
      },
      create: {
        slug: catData.slug,
        icon: catData.icon,
        image: catData.image,
        order: catData.order,
        isActive: true,
      },
    });

    totalCategories++;

    // Create translations for each locale
    for (const locale of LOCALES) {
      const trans = catData.translations[locale as keyof typeof catData.translations];
      if (!trans) continue;

      await prisma.categoryTranslation.upsert({
        where: {
          categoryId_locale: {
            categoryId: category.id,
            locale: locale
          }
        },
        update: {
          name: trans.name,
          description: trans.description,
          seoTitle: trans.seoTitle,
          seoDescription: trans.seoDescription,
        },
        create: {
          categoryId: category.id,
          locale: locale,
          name: trans.name,
          description: trans.description,
          seoTitle: trans.seoTitle,
          seoDescription: trans.seoDescription,
        },
      });
      totalTranslations++;
    }

    console.log(`   ✅ Category with ${LOCALES.length} translations`);
    console.log(`   📝 Creating ${catData.services.length} services...`);

    // Create services with multilingual support
    for (const serviceName of catData.services) {
      const serviceSlug = createSlug(serviceName);
      
      try {
        const service = await prisma.service.upsert({
          where: { slug: serviceSlug },
          update: {
            categoryId: category.id,
            duration: 60,
            basePrice: 50,
            currency: 'USD',
            isActive: true,
            image: `https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80`,
          },
          create: {
            slug: serviceSlug,
            categoryId: category.id,
            duration: 60,
            basePrice: 50,
            currency: 'USD',
            isActive: true,
            image: `https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80`,
            images: [
              `https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80`,
              `https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80`
            ],
          },
        });

        // Create translations for each locale
        for (const locale of LOCALES) {
          await prisma.serviceTranslation.upsert({
            where: {
              serviceId_locale: {
                serviceId: service.id,
                locale: locale
              }
            },
            update: {
              name: serviceName,
              description: `Professional ${serviceName} services with guaranteed quality and satisfaction.`,
              includes: ['Professional service', 'Quality guarantee', 'Fast response'],
              excludes: ['Materials (unless specified)', 'Additional travel fees'],
              seoTitle: `${serviceName} Services | Professional & Reliable`,
              seoDescription: `Expert ${serviceName} services. Book trusted professionals for quality work at competitive prices.`,
            },
            create: {
              serviceId: service.id,
              locale: locale,
              name: serviceName,
              description: `Professional ${serviceName} services with guaranteed quality and satisfaction.`,
              includes: ['Professional service', 'Quality guarantee', 'Fast response'],
              excludes: ['Materials (unless specified)', 'Additional travel fees'],
              seoTitle: `${serviceName} Services | Professional & Reliable`,
              seoDescription: `Expert ${serviceName} services. Book trusted professionals for quality work at competitive prices.`,
            },
          });
          totalTranslations++;
        }

        totalServices++;
      } catch (e: any) {
        console.log(`      ⚠️  ${serviceName}: ${e.message.split('\n')[0]}`);
      }
    }

    console.log(`   ✅ ${catData.services.length} services created`);
  }

  const finalCounts = {
    categories: await prisma.category.count(),
    services: await prisma.service.count(),
    categoryTranslations: await prisma.categoryTranslation.count(),
    serviceTranslations: await prisma.serviceTranslation.count(),
  };

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ MULTILINGUAL SEO SEED COMPLETED!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Database Summary:
  📁 ${finalCounts.categories} Categories
  🛠️  ${finalCounts.services} Services
  🌍 ${finalCounts.categoryTranslations} Category Translations
  📝 ${finalCounts.serviceTranslations} Service Translations
  ━━━━━━━━━━━━━━━━━━━━━━━━
  Languages: ${LOCALES.join(', ').toUpperCase()}
  
🌐 Test Multilingual URLs:
  English:  /en/services/home-improvement
  Français: /fr/services/home-improvement  
  العربية:   /ar/services/home-improvement
  ไทย:      /th/services/home-improvement

🔌 Test APIs:
  curl "http://localhost:3000/api/categories?locale=fr" | jq
  curl "http://localhost:3000/api/services?locale=ar" | jq

🎉 All services ready for booking with full SEO and i18n!
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
