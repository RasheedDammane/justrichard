import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

function createSlug(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

async function main() {
  console.log('🏠 Starting properties seed...');

  const uae = await prisma.country.findFirst({ where: { code: 'AE' } });
  const thailand = await prisma.country.findFirst({ where: { code: 'TH' } });
  const dubai = await prisma.city.findFirst({ where: { name: 'Dubai' } });
  const bangkok = await prisma.city.findFirst({ where: { name: 'Bangkok' } });
  const phuket = await prisma.city.findFirst({ where: { name: 'Phuket' } });

  if (!uae || !thailand || !dubai || !bangkok || !phuket) {
    throw new Error('Countries/Cities not found');
  }

  const now = new Date();
  const properties = [
    // DUBAI - APARTMENT
    {
      id: nanoid(),
      name: 'Luxury Apartment in Downtown Dubai',
      slug: 'luxury-apartment-downtown-dubai',
      type: 'APARTMENT',
      purpose: 'SALE',
      price: 2500000,
      bedrooms: 3,
      bathrooms: 3,
      area: 1666,
      description: 'Stunning 3-bedroom apartment with Burj Khalifa views',
      address: 'Downtown Dubai',
      cityId: dubai.id,
      countryId: uae.id,
      currency: 'AED',
      isActive: true,
      isFeatured: true,
      createdAt: now,
      updatedAt: now,
    },
    // DUBAI - VILLA
    {
      id: nanoid(),
      name: 'Modern Villa in Dubai Marina',
      slug: 'modern-villa-dubai-marina',
      type: 'VILLA',
      purpose: 'SALE',
      price: 8500000,
      bedrooms: 5,
      bathrooms: 6,
      area: 5000,
      description: 'Magnificent 5-bedroom villa with private pool',
      address: 'Dubai Marina',
      cityId: dubai.id,
      countryId: uae.id,
      currency: 'AED',
      isActive: true,
      isFeatured: true,
    },
    // DUBAI - PENTHOUSE
    {
      id: nanoid(),
      name: 'Exclusive Penthouse in Palm Jumeirah',
      slug: 'exclusive-penthouse-palm-jumeirah',
      type: 'PENTHOUSE',
      purpose: 'SALE',
      price: 15000000,
      bedrooms: 4,
      bathrooms: 5,
      area: 6000,
      description: 'Ultra-luxury penthouse with 360° sea views',
      address: 'Palm Jumeirah',
      cityId: dubai.id,
      countryId: uae.id,
      currency: 'AED',
      isActive: true,
      isFeatured: true,
    },
    // DUBAI - TOWNHOUSE
    {
      id: nanoid(),
      name: 'Elegant Townhouse in Arabian Ranches',
      slug: 'elegant-townhouse-arabian-ranches',
      type: 'TOWNHOUSE',
      purpose: 'RENT',
      price: 180000,
      bedrooms: 3,
      bathrooms: 4,
      area: 2000,
      description: 'Beautiful townhouse in family community',
      address: 'Arabian Ranches',
      cityId: dubai.id,
      countryId: uae.id,
      currency: 'AED',
      isActive: true,
    },
    // DUBAI - STUDIO
    {
      id: nanoid(),
      name: 'Cozy Studio in Business Bay',
      slug: 'cozy-studio-business-bay',
      type: 'STUDIO',
      purpose: 'RENT',
      price: 55000,
      bedrooms: 0,
      bathrooms: 1,
      area: 500,
      description: 'Modern studio with canal views',
      address: 'Business Bay',
      cityId: dubai.id,
      countryId: uae.id,
      currency: 'AED',
      isActive: true,
    },
    // DUBAI - DUPLEX
    {
      id: nanoid(),
      name: 'Spacious Duplex in JBR',
      slug: 'spacious-duplex-jbr',
      type: 'DUPLEX',
      purpose: 'SALE',
      price: 4200000,
      bedrooms: 4,
      bathrooms: 4,
      area: 3000,
      description: '4-bedroom duplex with beach access',
      address: 'JBR',
      cityId: dubai.id,
      countryId: uae.id,
      currency: 'AED',
      isActive: true,
      isFeatured: true,
    },
    // DUBAI - LAND
    {
      id: nanoid(),
      name: 'Prime Land in Dubai Hills Estate',
      slug: 'prime-land-dubai-hills-estate',
      type: 'LAND',
      purpose: 'SALE',
      price: 12000000,
      bedrooms: 0,
      bathrooms: 0,
      area: 60000,
      description: 'Exceptional land plot with golf views',
      address: 'Dubai Hills Estate',
      cityId: dubai.id,
      countryId: uae.id,
      currency: 'AED',
      isActive: true,
    },
    // DUBAI - COMMERCIAL
    {
      id: nanoid(),
      name: 'Modern Office Space in DIFC',
      slug: 'modern-office-space-difc',
      type: 'COMMERCIAL',
      purpose: 'RENT',
      price: 350000,
      bedrooms: 0,
      bathrooms: 2,
      area: 2000,
      description: 'Premium office space in DIFC',
      address: 'DIFC',
      cityId: dubai.id,
      countryId: uae.id,
      currency: 'AED',
      isActive: true,
    },
    // THAILAND - APARTMENT
    {
      id: nanoid(),
      name: 'Luxury Condo in Sukhumvit Bangkok',
      slug: 'luxury-condo-sukhumvit-bangkok',
      type: 'APARTMENT',
      purpose: 'SALE',
      price: 15000000,
      bedrooms: 2,
      bathrooms: 2,
      area: 1000,
      description: 'Modern 2BR condo near BTS',
      address: 'Sukhumvit',
      cityId: bangkok.id,
      countryId: thailand.id,
      currency: 'THB',
      isActive: true,
      isFeatured: true,
    },
    // THAILAND - VILLA
    {
      id: nanoid(),
      name: 'Beachfront Villa in Phuket',
      slug: 'beachfront-villa-phuket',
      type: 'VILLA',
      purpose: 'SALE',
      price: 45000000,
      bedrooms: 4,
      bathrooms: 5,
      area: 3000,
      description: '4BR villa with private pool and beach',
      address: 'Kamala Beach',
      cityId: phuket.id,
      countryId: thailand.id,
      currency: 'THB',
      isActive: true,
      isFeatured: true,
    },
    // THAILAND - PENTHOUSE
    {
      id: nanoid(),
      name: 'Sky Penthouse in Sathorn Bangkok',
      slug: 'sky-penthouse-sathorn-bangkok',
      type: 'PENTHOUSE',
      purpose: 'RENT',
      price: 250000,
      bedrooms: 3,
      bathrooms: 3,
      area: 1000,
      description: '3BR penthouse with 360° views',
      address: 'Sathorn',
      cityId: bangkok.id,
      countryId: thailand.id,
      currency: 'THB',
      isActive: true,
      isFeatured: true,
    },
    // THAILAND - TOWNHOUSE
    {
      id: nanoid(),
      name: 'Modern Townhouse in Thonglor',
      slug: 'modern-townhouse-thonglor',
      type: 'TOWNHOUSE',
      purpose: 'RENT',
      price: 80000,
      bedrooms: 3,
      bathrooms: 3,
      area: 1000,
      description: '3BR townhouse in trendy area',
      address: 'Thonglor',
      cityId: bangkok.id,
      countryId: thailand.id,
      currency: 'THB',
      isActive: true,
    },
    // THAILAND - STUDIO
    {
      id: nanoid(),
      name: 'Cozy Studio in Nimman',
      slug: 'cozy-studio-nimman',
      type: 'STUDIO',
      purpose: 'RENT',
      price: 15000,
      bedrooms: 0,
      bathrooms: 1,
      area: 100,
      description: 'Studio for digital nomads',
      address: 'Nimman',
      cityId: bangkok.id,
      countryId: thailand.id,
      currency: 'THB',
      isActive: true,
    },
    // THAILAND - DUPLEX
    {
      id: nanoid(),
      name: 'Spacious Duplex in Hua Hin',
      slug: 'spacious-duplex-hua-hin',
      type: 'DUPLEX',
      purpose: 'SALE',
      price: 12000000,
      bedrooms: 3,
      bathrooms: 3,
      area: 1000,
      description: '3BR duplex with sea view',
      address: 'Hua Hin',
      cityId: bangkok.id,
      countryId: thailand.id,
      currency: 'THB',
      isActive: true,
    },
    // THAILAND - LAND
    {
      id: nanoid(),
      name: 'Beachfront Land in Koh Samui',
      slug: 'beachfront-land-koh-samui',
      type: 'LAND',
      purpose: 'SALE',
      price: 30000000,
      bedrooms: 0,
      bathrooms: 0,
      area: 10000,
      description: 'Prime beachfront land',
      address: 'Koh Samui',
      cityId: bangkok.id,
      countryId: thailand.id,
      currency: 'THB',
      isActive: true,
    },
    // THAILAND - COMMERCIAL
    {
      id: nanoid(),
      name: 'Retail Space in Siam Square',
      slug: 'retail-space-siam-square',
      type: 'COMMERCIAL',
      purpose: 'RENT',
      price: 150000,
      bedrooms: 0,
      bathrooms: 1,
      area: 800,
      description: 'Prime retail location',
      address: 'Siam Square',
      cityId: bangkok.id,
      countryId: thailand.id,
      currency: 'THB',
      isActive: true,
    },
  ];

  for (const property of properties) {
    await prisma.property.create({ data: property });
    console.log(`✅ Created: ${property.name}`);
  }

  console.log(`\n🎉 Successfully seeded ${properties.length} properties!`);
  console.log(`📊 Dubai: 8 properties`);
  console.log(`📊 Thailand: 8 properties`);
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
