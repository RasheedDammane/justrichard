import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding CMS data...');

  // ============================================
  // HOMEPAGE CONTENT
  // ============================================
  
  const homepageEN = await prisma.pageContent.upsert({
    where: { slug_locale: { slug: 'homepage', locale: 'en' } },
    update: {},
    create: {
      slug: 'homepage',
      locale: 'en',
      title: 'JustRichard - Your Trusted Service Platform',
      description: 'Discover verified professionals for all your needs. Real estate, legal services, transfers, and more.',
      heroTitle: 'Find Trusted Professionals',
      heroSubtitle: 'Connect with verified service providers across multiple categories',
      heroCtaLabel: 'Explore Services',
      heroCtaHref: '/en/services',
      isActive: true,
    },
  });

  const homepageFR = await prisma.pageContent.upsert({
    where: { slug_locale: { slug: 'homepage', locale: 'fr' } },
    update: {},
    create: {
      slug: 'homepage',
      locale: 'fr',
      title: 'JustRichard - Votre Plateforme de Services de Confiance',
      description: 'Découvrez des professionnels vérifiés pour tous vos besoins. Immobilier, services juridiques, transferts et plus encore.',
      heroTitle: 'Trouvez des Professionnels de Confiance',
      heroSubtitle: 'Connectez-vous avec des prestataires de services vérifiés dans plusieurs catégories',
      heroCtaLabel: 'Explorer les Services',
      heroCtaHref: '/fr/services',
      isActive: true,
    },
  });

  const homepageTH = await prisma.pageContent.upsert({
    where: { slug_locale: { slug: 'homepage', locale: 'th' } },
    update: {},
    create: {
      slug: 'homepage',
      locale: 'th',
      title: 'JustRichard - แพลตฟอร์มบริการที่เชื่อถือได้',
      description: 'ค้นพบผู้เชี่ยวชาญที่ได้รับการตรวจสอบแล้วสำหรับทุกความต้องการของคุณ อสังหาริมทรัพย์ บริการทางกฎหมาย การรับส่ง และอื่นๆ',
      heroTitle: 'ค้นหาผู้เชี่ยวชาญที่เชื่อถือได้',
      heroSubtitle: 'เชื่อมต่อกับผู้ให้บริการที่ได้รับการตรวจสอบในหลายหมวดหมู่',
      heroCtaLabel: 'สำรวจบริการ',
      heroCtaHref: '/th/services',
      isActive: true,
    },
  });

  console.log('✅ Homepage content created:', { homepageEN, homepageFR, homepageTH });

  // ============================================
  // NAVBAR LINKS
  // ============================================

  const navLinksEN = [
    { locale: 'en', label: 'Home', href: '/en', order: 1 },
    { locale: 'en', label: 'Services', href: '/en/services', order: 2 },
    { locale: 'en', label: 'Categories', href: '/en/categories', order: 3 },
    { locale: 'en', label: 'Blog', href: '/en/blog', order: 4 },
    { locale: 'en', label: 'About', href: '/en/about', order: 5 },
    { locale: 'en', label: 'Contact', href: '/en/contact', order: 6 },
  ];

  const navLinksFR = [
    { locale: 'fr', label: 'Accueil', href: '/fr', order: 1 },
    { locale: 'fr', label: 'Services', href: '/fr/services', order: 2 },
    { locale: 'fr', label: 'Catégories', href: '/fr/categories', order: 3 },
    { locale: 'fr', label: 'Blog', href: '/fr/blog', order: 4 },
    { locale: 'fr', label: 'À Propos', href: '/fr/about', order: 5 },
    { locale: 'fr', label: 'Contact', href: '/fr/contact', order: 6 },
  ];

  const navLinksTH = [
    { locale: 'th', label: 'หน้าแรก', href: '/th', order: 1 },
    { locale: 'th', label: 'บริการ', href: '/th/services', order: 2 },
    { locale: 'th', label: 'หมวดหมู่', href: '/th/categories', order: 3 },
    { locale: 'th', label: 'บล็อก', href: '/th/blog', order: 4 },
    { locale: 'th', label: 'เกี่ยวกับเรา', href: '/th/about', order: 5 },
    { locale: 'th', label: 'ติดต่อเรา', href: '/th/contact', order: 6 },
  ];

  // Delete existing navbar links
  await prisma.navbarLink.deleteMany({});

  // Create new navbar links
  for (const link of [...navLinksEN, ...navLinksFR, ...navLinksTH]) {
    await prisma.navbarLink.create({ data: link });
  }

  console.log('✅ Navbar links created:', navLinksEN.length + navLinksFR.length + navLinksTH.length);

  // ============================================
  // FOOTER CONTENT
  // ============================================

  const footerEN = await prisma.footerContent.upsert({
    where: { locale: 'en' },
    update: {},
    create: {
      locale: 'en',
      platformName: 'JustRichard',
      tagline: 'Your trusted platform connecting customers with verified professionals across 15+ categories in multiple countries.',
      copyright: '© 2025 JustRichard. All rights reserved.',
      sections: [
        {
          title: 'Company',
          links: [
            { label: 'About Us', href: '/en/about' },
            { label: 'Careers', href: '/en/careers' },
            { label: 'Press', href: '/en/press' },
            { label: 'Blog', href: '/en/blog' },
          ],
        },
        {
          title: 'Services',
          links: [
            { label: 'All Services', href: '/en/services' },
            { label: 'Categories', href: '/en/categories' },
            { label: 'Real Estate', href: '/en/services/real-estate' },
            { label: 'Legal Services', href: '/en/services/legal' },
          ],
        },
        {
          title: 'Support',
          links: [
            { label: 'Help Center', href: '/en/help' },
            { label: 'Contact Us', href: '/en/contact' },
            { label: 'FAQ', href: '/en/faq' },
            { label: 'Terms of Service', href: '/en/terms' },
            { label: 'Privacy Policy', href: '/en/privacy' },
          ],
        },
      ],
      newsletter: {
        title: 'Newsletter',
        description: 'Get updates on new services and promotions',
        placeholder: 'Your email address',
        buttonLabel: 'Subscribe',
      },
      legal: {
        registrationInfo: 'Reg. No: 123456789 | Tax ID: AE123456789',
        disclaimer: 'JustRichard acts as a marketplace platform connecting service providers with customers.',
      },
      isActive: true,
    },
  });

  const footerFR = await prisma.footerContent.upsert({
    where: { locale: 'fr' },
    update: {},
    create: {
      locale: 'fr',
      platformName: 'JustRichard',
      tagline: 'Votre plateforme de confiance connectant les clients avec des professionnels vérifiés dans plus de 15 catégories.',
      copyright: '© 2025 JustRichard. Tous droits réservés.',
      sections: [
        {
          title: 'Entreprise',
          links: [
            { label: 'À Propos', href: '/fr/about' },
            { label: 'Carrières', href: '/fr/careers' },
            { label: 'Presse', href: '/fr/press' },
            { label: 'Blog', href: '/fr/blog' },
          ],
        },
        {
          title: 'Services',
          links: [
            { label: 'Tous les Services', href: '/fr/services' },
            { label: 'Catégories', href: '/fr/categories' },
            { label: 'Immobilier', href: '/fr/services/real-estate' },
            { label: 'Services Juridiques', href: '/fr/services/legal' },
          ],
        },
        {
          title: 'Support',
          links: [
            { label: "Centre d'Aide", href: '/fr/help' },
            { label: 'Nous Contacter', href: '/fr/contact' },
            { label: 'FAQ', href: '/fr/faq' },
            { label: "Conditions d'Utilisation", href: '/fr/terms' },
            { label: 'Politique de Confidentialité', href: '/fr/privacy' },
          ],
        },
      ],
      newsletter: {
        title: 'Newsletter',
        description: 'Recevez des mises à jour sur les nouveaux services',
        placeholder: 'Votre adresse e-mail',
        buttonLabel: "S'abonner",
      },
      legal: {
        registrationInfo: "N° d'enregistrement: 123456789 | ID fiscal: AE123456789",
        disclaimer: 'JustRichard agit en tant que plateforme de marché.',
      },
      isActive: true,
    },
  });

  const footerTH = await prisma.footerContent.upsert({
    where: { locale: 'th' },
    update: {},
    create: {
      locale: 'th',
      platformName: 'JustRichard',
      tagline: 'แพลตฟอร์มที่เชื่อถือได้ของคุณที่เชื่อมต่อลูกค้ากับผู้เชี่ยวชาญที่ได้รับการตรวจสอบ',
      copyright: '© 2025 JustRichard สงวนลิขสิทธิ์',
      sections: [
        {
          title: 'บริษัท',
          links: [
            { label: 'เกี่ยวกับเรา', href: '/th/about' },
            { label: 'อาชีพ', href: '/th/careers' },
            { label: 'สื่อมวลชน', href: '/th/press' },
            { label: 'บล็อก', href: '/th/blog' },
          ],
        },
        {
          title: 'บริการ',
          links: [
            { label: 'บริการทั้งหมด', href: '/th/services' },
            { label: 'หมวดหมู่', href: '/th/categories' },
            { label: 'อสังหาริมทรัพย์', href: '/th/services/real-estate' },
            { label: 'บริการทางกฎหมาย', href: '/th/services/legal' },
          ],
        },
        {
          title: 'สนับสนุน',
          links: [
            { label: 'ศูนย์ช่วยเหลือ', href: '/th/help' },
            { label: 'ติดต่อเรา', href: '/th/contact' },
            { label: 'คำถามที่พบบ่อย', href: '/th/faq' },
            { label: 'เงื่อนไขการให้บริการ', href: '/th/terms' },
            { label: 'นโยบายความเป็นส่วนตัว', href: '/th/privacy' },
          ],
        },
      ],
      newsletter: {
        title: 'จดหมายข่าว',
        description: 'รับข้อมูลอัปเดตเกี่ยวกับบริการใหม่',
        placeholder: 'ที่อยู่อีเมลของคุณ',
        buttonLabel: 'สมัครรับข้อมูล',
      },
      legal: {
        registrationInfo: 'เลขทะเบียน: 123456789 | เลขประจำตัวผู้เสียภาษี: AE123456789',
        disclaimer: 'JustRichard ทำหน้าที่เป็นแพลตฟอร์มตลาด',
      },
      isActive: true,
    },
  });

  console.log('✅ Footer content created:', { footerEN, footerFR, footerTH });

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
