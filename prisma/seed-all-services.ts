#!/usr/bin/env tsx

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Service data structure: 11 categories with their services
const CATEGORIES_DATA = [
  {
    slug: 'home-improvement',
    icon: '🏠',
    order: 1,
    services: [
      'Renovation Contractor', 'Cabinet Contractor', 'Bathroom Accessories Installer and Supplier',
      'Curtain and Blinds Contractor', 'Interior Designer', 'Architect', 'Structural Engineer',
      'Landscape Gardener', 'Custom Furniture Carpenter', 'Lighting Installer and Supplier',
      'Wooden Flooring', 'Roof Supply, Install, Repair', 'Wallpaper Installer and Supplier',
      'Glass Installer and Supplier', 'Auto-gate Installer and Supplier', 
      'Alarm and CCTV Installer and Supplier', 'Aircon Installer', 'Ceiling Contractor',
      'Audio Visual Specialist', 'Carpet Installer and Supplier', 'Bedroom', 'Tile Supplier',
      'Tiling Contractor and Installer', 'Awning Contractor', 'Window and Louvre',
      'Door Installer and Supplier', 'Grille and Metal Installer and Supplier',
      'Electric Fence Installer and Supplier', 'CCTV Installer', 'Security Window, Door Installer',
      'Home Theatre Specialist', 'Sound System Specialist', 'Home Automation',
      'House Painting / Wall Painting', 'Swimming Pool Maintenance and Build',
      'Mosquito Net Supplier', 'Window Supplier', 'Interior Decorator', 'Feng Shui Consultant',
      'Mural Artist', 'Wooden Flooring Supplier and Installer', 'Window Installer and Supplier',
      'Plaster Ceiling Supplier and Installer', 'Laminate Flooring Supply and Install',
      'Vinyl Flooring Supply and Install', 'Carpet Flooring Supply and Install',
      'Kontraktor Rumah', 'Home Inspection', 'Kitchen Cabinet', 'Solar Panel Installer'
    ]
  },
  {
    slug: 'home-maintenance',
    icon: '🧰',
    order: 2,
    services: [
      'Electrical and Wiring Services', 'Plumber', 'Wireman', 'Handyman Contractor',
      'Landscape Gardener', 'Water Heater Install and Repair', 'Locksmith', 'Pest Control',
      'Furniture Repair and Upholstery', 'Grass Cutter', 'Furniture Installer',
      'Aircon Servicing', 'Carpet Cleaning', 'International Moving and Relocation Experts',
      'Lorry Rental', 'Domestic Mover', 'Fridge Repair', 'Sofa & Mattress Cleaning',
      'TV Repair', 'Washing Machine and Dryer Repair', 'Floor Repair and Polish',
      'Servis Aircon', 'Post Renovation Cleaning', 'AC Express Instant Booking',
      'Junk Disposal', 'IKEA Assembly', 'Waterproofing Services', 'IKEA Light Installation',
      'Roof Cleaning', 'Oven Repair', 'Handyman Contractor (Hourly Rate)',
      'Cooking Gas Delivery', 'Auto-gate Repair', 'Alarm and CCTV Repair',
      'Washing Machine Cleaning', 'TV Mounting', 'Aircon Repair', 'Car Seat Cleaning',
      'Ceiling Fan Install and Repair', 'Kitchen Hob Install and Repair'
    ]
  },
  {
    slug: 'cleaning-and-disinfection',
    icon: '🧽',
    order: 3,
    services: [
      'Home Cleaning', 'Carpet Cleaning', 'Sofa & Mattress Cleaning',
      'Post Renovation Cleaning', 'Move In / Move Out Cleaning', 'Disinfection Services',
      'Curtain Cleaning'
    ]
  },
  {
    slug: 'commercial-property-services',
    icon: '🏢',
    order: 4,
    services: [
      'Electrical and Wiring Services', 'Pest Control', 'Wireman', 'Aircon Servicing',
      'Roller Shutter Repair', 'Automatic Sliding Door Repair',
      'Handyman Contractor (Hourly Rate)', 'Grease Trap Repair', 'Signage Repair',
      'Kitchen Hood Install and Repair', 'Chiller and Freezer Maintenance and Repair'
    ]
  },
  {
    slug: 'events-and-weddings',
    icon: '💍',
    order: 5,
    services: [
      'Event and Wedding Planner', 'Bridal Studio', 'Private Chef',
      'Makeup Artist and Hairstylist', 'Dressmaker', 'Custom Suit Designer',
      'Invitation Card Designer and Printer', 'Cake Baker', 'Caterer', 'Photographer',
      'Bands and Singers', 'Emcee', 'Event Decorator', 'Wedding Car Rental',
      'Event Venue', 'Custom Wedding Rings', 'Event Equipment and Set-up',
      'Wedding Gifts and Favours', 'Custom Shoes and Heels Designer', 'Costume Designer',
      'Videographer', 'Party Planner', 'Wedding Photographer', 'Event Photographer',
      'Commercial and Product Photographer', 'Studio Photographer', 'Wedding Videographer',
      'Event Videographer', 'Corporate Videographer', 'Clown', 'Balloon Artist',
      'Magician', 'Photo Booth', 'Deejay', 'Garden Event Venue', 'Restaurant Event Venue',
      'Beach Event Venue', 'Forest Event Venue', 'Gift Suppliers',
      'Party and Goody Bag Supplier', 'AV Rentals', 'Wedding Cake',
      'Wedding Dress Designer', 'Home Catering and Tingkat', 'Healthy Catering',
      'Maternity Photographer', 'Portrait and Family Photographer', 'Bartender',
      'Face Painter', 'Master of Tea Ceremony', 'Event Catering',
      'Custom Wedding Dress & Suit Designer', 'Wedding Events'
    ]
  },
  {
    slug: 'neighbourhood-services',
    icon: '🏘️',
    order: 6,
    services: [
      'Laundry and Dry Cleaning', 'Grass Cutter', 'Domestic Mover', 'Junk Disposal',
      'Community Runner and Delivery', 'Cooking Gas Delivery',
      'Daily Catering (Li Wei / Sedap Sedap / OLDTOWN / HH Catering / Best Chef / Uniq Catering / Acik Kantin / Hug Bear)'
    ]
  },
  {
    slug: 'electrical-appliance-repair',
    icon: '⚙️',
    order: 7,
    services: [
      'Water Heater Install and Repair', 'Fridge Repair', 'TV Repair',
      'Washing Machine and Dryer Repair', 'Oven Repair',
      'Ceiling Fan Install and Repair', 'Kitchen Hob Install and Repair'
    ]
  },
  {
    slug: 'wellness',
    icon: '💆',
    order: 8,
    services: [
      'Personal Trainer', 'Home Massage', 'Manicurist / Pedicurist',
      'Home and Elderly Caregiver', 'Maternity Caregiver', 'Yoga Instructor',
      'Aerobics Classes and Lessons', 'Bodybuilding Instructor', 'Pilates Instructor',
      'Zumba Lessons', 'Meditation Lessons', 'Facial Treatment', 'Elderly Caregiver',
      'Holistic Wellness', 'Physiotherapist', 'Beauty and Wellness',
      'Martial Arts Lessons', 'Nutritionist'
    ]
  },
  {
    slug: 'lessons',
    icon: '🎓',
    order: 9,
    services: [
      'Cooking Classes and Lessons', 'Business Courses', 'English Language Lessons',
      'Finance Lessons', 'Photography Lessons', 'Acting Lessons', 'Music Lessons',
      'Art Classes', 'Tennis Coach', 'Dance Lessons', 'Aerobics Classes and Lessons',
      'Malay Language Lessons', 'Chinese Language Lessons', 'Tamil Language Lessons',
      'French Language Lessons', 'Spanish Language Lessons', 'Japanese Language Lessons',
      'Korean Language Lessons', 'Indonesian Language Lessons', 'Thai Language Lessons',
      'Vietnamese Language Lessons', 'Piano Lessons', 'Violin Lessons', 'Guitar Lessons',
      'Drum Lessons', 'Flute Lessons', 'Singing Lessons', 'Swimming Lessons',
      'Badminton Coach', 'Squash Coach', 'Ballroom Dance Lessons', 'Salsa Dance Lessons',
      'Ballet Dance Lessons', 'Fitness Trainer', 'Language Translator',
      'Martial Arts Lessons', 'Children Enrichment Lessons'
    ]
  },
  {
    slug: 'business',
    icon: '💼',
    order: 10,
    services: [
      'Language Translator', 'Writer and Copywriter', 'Business Advisor and Consultant',
      'Corporate Accountant', 'Web Designer', 'Graphic Designer',
      'Marketing and Advertising Consultant', 'HR Consultant', 'Alcohol and Liquor Supplier',
      'Asset and Personal Finance Manager', 'Corporate Printing', 'Courier', 'Copy Editor',
      'Corporate Tax Accountant', 'Digital Marketing Specialist', 'Social Media Specialist',
      'Marketing Consultant', 'Event Photographer / Videographer', 'Food Photographer',
      'Product Photographer', 'Video Editor', 'Corporate Gifts and Hampers',
      'Personal & Business Tax Accountant', 'Business Plan Writing',
      'Office Furniture Installer and Supplier', 'Office Design', 'IKEA Personal Shopper',
      'Office and Commercial Cleaning', 'Property Subsale / Leasing', 'Software Developer',
      'Personal Driver', 'Broadband Internet', 'Gift Voucher'
    ]
  },
  {
    slug: 'tech-and-it',
    icon: '💻',
    order: 11,
    services: [
      'Computer and Laptop Repair', 'Alarm and CCTV Installer and Supplier',
      'Audio Visual Specialist', 'CCTV Installer', 'Home Automation',
      'Mobile Phone Repair', 'Broadband Internet'
    ]
  },
  {
    slug: 'personal-and-family',
    icon: '👨‍👩‍👧',
    order: 12,
    services: [
      'Maternity Caregiver', 'Babysitter and Childcare', 'Laundry and Dry Cleaning',
      'Insurance Agent (Motor / Life / Property)', 'Asset and Personal Finance Manager',
      'Property Agent', 'Pet Boarding and Hotel',
      'International Moving and Relocation Experts', 'Cat / Dog Walker',
      'Private Investigator', 'Feng Shui Consultant', 'Domestic Maid Agency',
      'Nutritionist', 'Therapy and Counselling',
      'Marriage, Family and Relationship Counselling', 'Personal Driver',
      'Community Runner and Delivery', 'Direct Food Supplier', 'Life Coaching'
    ]
  }
];

// Translations for categories
const CATEGORY_TRANSLATIONS: Record<string, { en: { name: string; description: string } }> = {
  'home-improvement': {
    en: {
      name: 'Home Improvement',
      description: 'Transform your home with professional renovation, interior design, and improvement services'
    }
  },
  'home-maintenance': {
    en: {
      name: 'Home Maintenance',
      description: 'Keep your home in perfect condition with professional maintenance and repair services'
    }
  },
  'cleaning-and-disinfection': {
    en: {
      name: 'Cleaning and Disinfection',
      description: 'Professional cleaning and disinfection services for a spotless and healthy home'
    }
  },
  'commercial-property-services': {
    en: {
      name: 'Commercial Property Services',
      description: 'Comprehensive maintenance and repair services for commercial properties'
    }
  },
  'events-and-weddings': {
    en: {
      name: 'Events and Weddings',
      description: 'Make your special day perfect with our comprehensive event and wedding services'
    }
  },
  'neighbourhood-services': {
    en: {
      name: 'Neighbourhood Services',
      description: 'Convenient services for your daily needs right in your neighbourhood'
    }
  },
  'electrical-appliance-repair': {
    en: {
      name: 'Electrical Appliance Repair',
      description: 'Expert repair services for all your household electrical appliances'
    }
  },
  'wellness': {
    en: {
      name: 'Wellness',
      description: 'Enhance your wellbeing with professional wellness and care services'
    }
  },
  'lessons': {
    en: {
      name: 'Lessons',
      description: 'Learn new skills with professional instructors and teachers'
    }
  },
  'business': {
    en: {
      name: 'Business',
      description: 'Professional business services to help grow your company'
    }
  },
  'tech-and-it': {
    en: {
      name: 'Tech and IT',
      description: 'Expert technology and IT services for your digital needs'
    }
  },
  'personal-and-family': {
    en: {
      name: 'Personal and Family',
      description: 'Comprehensive services for you and your family needs'
    }
  }
};

// Helper function to create a slug from service name
function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

async function main() {
  console.log('🏗️ Starting comprehensive services seed...\n');

  let totalCategories = 0;
  let totalServices = 0;

  for (const categoryData of CATEGORIES_DATA) {
    console.log(`\n📁 Creating category: ${categoryData.slug}`);

    // Create category
    const category = await prisma.category.upsert({
      where: { slug: categoryData.slug },
      update: {
        icon: categoryData.icon,
        order: categoryData.order,
        isActive: true,
      },
      create: {
        slug: categoryData.slug,
        icon: categoryData.icon,
        order: categoryData.order,
        isActive: true,
      },
    });

    totalCategories++;

    // Create category translation
    const catTranslation = CATEGORY_TRANSLATIONS[categoryData.slug].en;
    await prisma.categoryTranslation.upsert({
      where: {
        categoryId_locale: {
          categoryId: category.id,
          locale: 'en'
        }
      },
      update: {
        name: catTranslation.name,
        description: catTranslation.description,
      },
      create: {
        categoryId: category.id,
        locale: 'en',
        name: catTranslation.name,
        description: catTranslation.description,
      },
    });

    console.log(`   ✅ Category: ${catTranslation.name}`);
    console.log(`   📝 Creating ${categoryData.services.length} services...`);

    // Create services
    for (const serviceName of categoryData.services) {
      const serviceSlug = createSlug(serviceName);
      
      try {
        const service = await prisma.service.upsert({
          where: { slug: serviceSlug },
          update: {
            categoryId: category.id,
            duration: 60, // Default 1 hour
            basePrice: 50, // Default price
            currency: 'USD',
            isActive: true,
          },
          create: {
            slug: serviceSlug,
            categoryId: category.id,
            duration: 60,
            basePrice: 50,
            currency: 'USD',
            isActive: true,
          },
        });

        // Create service translation
        await prisma.serviceTranslation.upsert({
          where: {
            serviceId_locale: {
              serviceId: service.id,
              locale: 'en'
            }
          },
          update: {
            name: serviceName,
            description: `Professional ${serviceName} services`,
            includes: ['Professional service', 'Quality guarantee'],
            excludes: ['Materials (unless specified)'],
          },
          create: {
            serviceId: service.id,
            locale: 'en',
            name: serviceName,
            description: `Professional ${serviceName} services`,
            includes: ['Professional service', 'Quality guarantee'],
            excludes: ['Materials (unless specified)'],
          },
        });

        totalServices++;
      } catch (e: any) {
        console.log(`      ⚠️  ${serviceName}: ${e.message.split('\n')[0]}`);
      }
    }

    console.log(`   ✅ ${categoryData.services.length} services created`);
  }

  const finalCounts = {
    categories: await prisma.category.count(),
    services: await prisma.service.count(),
  };

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ COMPREHENSIVE SERVICES SEED COMPLETED!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Database Summary:
  📁 ${finalCounts.categories} Categories
  🛠️  ${finalCounts.services} Services
  ━━━━━━━━━━━━━━━━━━━━━━━━
  Total: ${finalCounts.categories + finalCounts.services} items

🌐 Test APIs:
  curl "http://localhost:3000/api/categories" | jq
  curl "http://localhost:3000/api/services" | jq
  curl "http://localhost:3000/api/services?category=home-improvement" | jq

🎉 All categories and services loaded!
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
