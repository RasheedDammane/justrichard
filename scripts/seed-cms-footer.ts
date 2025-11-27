import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const footerData = {
  en: {
    branding: {
      platformName: 'JustRichard',
      tagline: 'Your trusted platform connecting customers with verified professionals across 15+ categories in multiple countries.',
      copyright: '© 2024 JustRichard. All rights reserved.',
      email: 'contact@justrichard.com',
      phone: '+971 50 123 4567',
      newsletterTitle: 'Subscribe to our newsletter',
      newsletterDescription: 'Get the latest updates and offers',
      newsletterPlaceholder: 'Enter your email',
      newsletterButtonText: 'Subscribe',
    },
    sections: [
      {
        title: 'Company',
        slug: 'company',
        order: 0,
        links: [
          { label: 'About Us', href: '/en/about', order: 0 },
          { label: 'Careers', href: '/en/careers', order: 1 },
          { label: 'Press', href: '/en/press', order: 2 },
          { label: 'Blog', href: '/en/blog', order: 3 },
          { label: 'Partners', href: '/en/partners', order: 4 },
        ],
      },
      {
        title: 'Professional Services',
        slug: 'professional-services',
        order: 1,
        links: [
          { label: 'Doctors & Dentists', href: '/en/doctors', order: 0 },
          { label: 'Lawyers', href: '/en/lawyers', order: 1 },
          { label: 'Coaches', href: '/en/coaches', order: 2 },
          { label: 'Suppliers', href: '/en/suppliers', order: 3 },
          { label: 'Business Setup', href: '/en/business-setup', order: 4 },
          { label: 'Insurance', href: '/en/insurance', order: 5 },
        ],
      },
      {
        title: 'Lifestyle & Travel',
        slug: 'lifestyle-travel',
        order: 2,
        links: [
          { label: 'Car Rental', href: '/en/car-rental', order: 0 },
          { label: 'Yachts', href: '/en/yachts', order: 1 },
          { label: 'Properties', href: '/en/properties', order: 2 },
          { label: 'Activities', href: '/en/activities', order: 3 },
        ],
      },
      {
        title: 'Home Services',
        slug: 'home-services',
        order: 3,
        links: [
          { label: 'Home Cleaning', href: '/en/services/home-cleaning', order: 0 },
          { label: 'Furniture Cleaning', href: '/en/services/furniture-cleaning', order: 1 },
          { label: 'Laundry & Dry Cleaning', href: '/en/services/laundry', order: 2 },
          { label: 'Maids', href: '/en/maids', order: 3 },
        ],
      },
      {
        title: 'Handyman Services',
        slug: 'handyman-services',
        order: 4,
        links: [
          { label: 'Plumbing', href: '/en/services/plumbing', order: 0 },
          { label: 'Electrical', href: '/en/services/electrical', order: 1 },
          { label: 'AC Repair', href: '/en/services/ac-repair', order: 2 },
          { label: 'Carpentry', href: '/en/services/carpentry', order: 3 },
          { label: 'Painting', href: '/en/services/painting', order: 4 },
          { label: 'All Handyman Services', href: '/en/services/handyman', order: 5 },
        ],
      },
      {
        title: 'Support',
        slug: 'support',
        order: 5,
        links: [
          { label: 'Help Center', href: '/en/help', order: 0 },
          { label: 'Contact Us', href: '/en/contact', order: 1 },
          { label: 'FAQ', href: '/en/faq', order: 2 },
          { label: 'Safety Guidelines', href: '/en/safety', order: 3 },
          { label: 'Terms of Service', href: '/en/terms', order: 4 },
          { label: 'Privacy Policy', href: '/en/privacy', order: 5 },
          { label: 'Cookie Policy', href: '/en/cookies', order: 6 },
          { label: 'Legal Notice', href: '/en/legal', order: 7 },
          { label: 'Sitemap', href: '/en/sitemap', order: 8 },
        ],
      },
      {
        title: 'Connect',
        slug: 'connect',
        order: 6,
        links: [
          { label: 'Facebook', href: 'https://facebook.com/justrichard', order: 0, isExternal: true },
          { label: 'Twitter', href: 'https://twitter.com/justrichard', order: 1, isExternal: true },
          { label: 'Instagram', href: 'https://instagram.com/justrichard', order: 2, isExternal: true },
          { label: 'LinkedIn', href: 'https://linkedin.com/company/justrichard', order: 3, isExternal: true },
        ],
      },
    ],
  },
};

async function seedFooter() {
  console.log('🌱 Seeding Footer CMS data...');

  try {
    // Seed for English
    const locale = 'en';
    const data = footerData.en;

    // Create Footer Branding
    console.log(`Creating footer branding for ${locale}...`);
    await prisma.footerBranding.upsert({
      where: { locale },
      create: {
        locale,
        ...data.branding,
      },
      update: data.branding,
    });

    // Create Footer Sections and Links
    for (const section of data.sections) {
      console.log(`Creating section: ${section.title}...`);
      
      const createdSection = await prisma.footerSection.upsert({
        where: { 
          locale_slug: {
            locale,
            slug: section.slug,
          }
        },
        create: {
          locale,
          title: section.title,
          slug: section.slug,
          order: section.order,
          isActive: true,
        },
        update: {
          title: section.title,
          order: section.order,
        },
      });

      // Delete existing links for this section
      await prisma.footerLink.deleteMany({
        where: { sectionId: createdSection.id },
      });

      // Create new links
      for (const link of section.links) {
        await prisma.footerLink.create({
          data: {
            sectionId: createdSection.id,
            label: link.label,
            href: link.href,
            order: link.order,
            isActive: true,
            isExternal: link.isExternal || false,
            openNewTab: link.isExternal || false,
          },
        });
      }

      console.log(`  ✓ Created ${section.links.length} links`);
    }

    // Create Social Links
    console.log('Creating social links...');
    const socialLinks = [
      { platform: 'facebook', url: 'https://facebook.com/justrichard', order: 0 },
      { platform: 'twitter', url: 'https://twitter.com/justrichard', order: 1 },
      { platform: 'instagram', url: 'https://instagram.com/justrichard', order: 2 },
      { platform: 'linkedin', url: 'https://linkedin.com/company/justrichard', order: 3 },
    ];

    for (const social of socialLinks) {
      await prisma.socialLink.upsert({
        where: {
          locale_platform: {
            locale,
            platform: social.platform,
          },
        },
        create: {
          locale,
          ...social,
          isActive: true,
        },
        update: social,
      });
    }

    console.log('✅ Footer CMS data seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding footer data:', error);
    throw error;
  }
}

async function main() {
  await seedFooter();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
