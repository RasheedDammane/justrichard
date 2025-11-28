const { PrismaClient } = require('@prisma/client');
const { nanoid } = require('nanoid');

const prisma = new PrismaClient();

async function main() {
  console.log('🏠 Starting properties seed...');

  const uae = await prisma.country.findFirst({ where: { code: 'AE' } });
  const thailand = await prisma.country.findFirst({ where: { code: 'TH' } });
  const dubai = await prisma.city.findFirst({ where: { name: 'Dubai' } });
  const bangkok = await prisma.city.findFirst({ where: { name: 'Bangkok' } });
  const phuket = await prisma.city.findFirst({ where: { name: 'Phuket' } });

  if (!uae || !thailand || !dubai || !bangkok || !phuket) {
    throw new Error('Countries/Cities not found. Please seed countries and cities first.');
  }

  const now = new Date();
  
  const properties = [
    // DUBAI PROPERTIES (8 types)
    { name: 'Luxury Apartment in Downtown Dubai', slug: 'luxury-apartment-downtown-dubai', type: 'APARTMENT', bedrooms: 3, bathrooms: 3, area: 1666, pricePerMonth: 250000, description: 'Stunning 3-bedroom apartment with Burj Khalifa views', address: 'Downtown Dubai', cityId: dubai.id, countryId: uae.id, currency: 'AED', isActive: true, isFeatured: true },
    { name: 'Modern Villa in Dubai Marina', slug: 'modern-villa-dubai-marina', type: 'VILLA', bedrooms: 5, bathrooms: 6, area: 5000, pricePerMonth: 850000, description: 'Magnificent 5-bedroom villa with private pool', address: 'Dubai Marina', cityId: dubai.id, countryId: uae.id, currency: 'AED', isActive: true, isFeatured: true },
    { name: 'Exclusive Penthouse in Palm Jumeirah', slug: 'exclusive-penthouse-palm-jumeirah', type: 'PENTHOUSE', bedrooms: 4, bathrooms: 5, area: 6000, pricePerMonth: 1500000, description: 'Ultra-luxury penthouse with 360° sea views', address: 'Palm Jumeirah', cityId: dubai.id, countryId: uae.id, currency: 'AED', isActive: true, isFeatured: true },
    { name: 'Elegant Townhouse in Arabian Ranches', slug: 'elegant-townhouse-arabian-ranches', type: 'TOWNHOUSE', bedrooms: 3, bathrooms: 4, area: 2000, pricePerMonth: 180000, description: 'Beautiful townhouse in family community', address: 'Arabian Ranches', cityId: dubai.id, countryId: uae.id, currency: 'AED', isActive: true, isFeatured: false },
    { name: 'Cozy Studio in Business Bay', slug: 'cozy-studio-business-bay', type: 'STUDIO', bedrooms: 0, bathrooms: 1, area: 500, pricePerMonth: 55000, description: 'Modern studio with canal views', address: 'Business Bay', cityId: dubai.id, countryId: uae.id, currency: 'AED', isActive: true, isFeatured: false },
    { name: 'Spacious Duplex in JBR', slug: 'spacious-duplex-jbr', type: 'DUPLEX', bedrooms: 4, bathrooms: 4, area: 3000, pricePerMonth: 420000, description: '4-bedroom duplex with beach access', address: 'JBR', cityId: dubai.id, countryId: uae.id, currency: 'AED', isActive: true, isFeatured: true },
    { name: 'Prime Land in Dubai Hills Estate', slug: 'prime-land-dubai-hills-estate', type: 'LAND', bedrooms: 0, bathrooms: 0, area: 60000, pricePerMonth: null, description: 'Exceptional land plot with golf views', address: 'Dubai Hills Estate', cityId: dubai.id, countryId: uae.id, currency: 'AED', isActive: true, isFeatured: false },
    { name: 'Modern Office Space in DIFC', slug: 'modern-office-space-difc', type: 'COMMERCIAL', bedrooms: 0, bathrooms: 2, area: 2000, pricePerMonth: 350000, description: 'Premium office space in DIFC', address: 'DIFC', cityId: dubai.id, countryId: uae.id, currency: 'AED', isActive: true, isFeatured: false },
    
    // THAILAND PROPERTIES (8 types)
    { name: 'Luxury Condo in Sukhumvit Bangkok', slug: 'luxury-condo-sukhumvit-bangkok', type: 'APARTMENT', bedrooms: 2, bathrooms: 2, area: 1000, pricePerMonth: 150000, description: 'Modern 2BR condo near BTS', address: 'Sukhumvit', cityId: bangkok.id, countryId: thailand.id, currency: 'THB', isActive: true, isFeatured: true },
    { name: 'Beachfront Villa in Phuket', slug: 'beachfront-villa-phuket', type: 'VILLA', bedrooms: 4, bathrooms: 5, area: 3000, pricePerMonth: 450000, description: '4BR villa with private pool and beach', address: 'Kamala Beach', cityId: phuket.id, countryId: thailand.id, currency: 'THB', isActive: true, isFeatured: true },
    { name: 'Sky Penthouse in Sathorn Bangkok', slug: 'sky-penthouse-sathorn-bangkok', type: 'PENTHOUSE', bedrooms: 3, bathrooms: 3, area: 1000, pricePerMonth: 250000, description: '3BR penthouse with 360° views', address: 'Sathorn', cityId: bangkok.id, countryId: thailand.id, currency: 'THB', isActive: true, isFeatured: true },
    { name: 'Modern Townhouse in Thonglor', slug: 'modern-townhouse-thonglor', type: 'TOWNHOUSE', bedrooms: 3, bathrooms: 3, area: 1000, pricePerMonth: 80000, description: '3BR townhouse in trendy area', address: 'Thonglor', cityId: bangkok.id, countryId: thailand.id, currency: 'THB', isActive: true, isFeatured: false },
    { name: 'Cozy Studio in Nimman', slug: 'cozy-studio-nimman', type: 'STUDIO', bedrooms: 0, bathrooms: 1, area: 100, pricePerMonth: 15000, description: 'Studio for digital nomads', address: 'Nimman', cityId: bangkok.id, countryId: thailand.id, currency: 'THB', isActive: true, isFeatured: false },
    { name: 'Spacious Duplex in Hua Hin', slug: 'spacious-duplex-hua-hin', type: 'DUPLEX', bedrooms: 3, bathrooms: 3, area: 1000, pricePerMonth: 120000, description: '3BR duplex with sea view', address: 'Hua Hin', cityId: bangkok.id, countryId: thailand.id, currency: 'THB', isActive: true, isFeatured: false },
    { name: 'Beachfront Land in Koh Samui', slug: 'beachfront-land-koh-samui', type: 'LAND', bedrooms: 0, bathrooms: 0, area: 10000, pricePerMonth: null, description: 'Prime beachfront land', address: 'Koh Samui', cityId: bangkok.id, countryId: thailand.id, currency: 'THB', isActive: true, isFeatured: false },
    { name: 'Retail Space in Siam Square', slug: 'retail-space-siam-square', type: 'COMMERCIAL', bedrooms: 0, bathrooms: 1, area: 800, pricePerMonth: 150000, description: 'Prime retail location', address: 'Siam Square', cityId: bangkok.id, countryId: thailand.id, currency: 'THB', isActive: true, isFeatured: false },
  ];

  for (const prop of properties) {
    await prisma.property.create({
      data: {
        id: nanoid(),
        ...prop,
        createdAt: now,
        updatedAt: now,
      }
    });
    console.log(`✅ Created: ${prop.name}`);
  }

  console.log(`\n🎉 Successfully seeded ${properties.length} properties!`);
  console.log(`📊 Dubai: 8 properties (APARTMENT, VILLA, PENTHOUSE, TOWNHOUSE, STUDIO, DUPLEX, LAND, COMMERCIAL)`);
  console.log(`📊 Thailand: 8 properties (APARTMENT, VILLA, PENTHOUSE, TOWNHOUSE, STUDIO, DUPLEX, LAND, COMMERCIAL)`);
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
