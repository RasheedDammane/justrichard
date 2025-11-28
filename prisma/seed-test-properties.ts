import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding test properties...');

  // Get first country, city, currency
  const country = await prisma.country.findFirst();
  const city = await prisma.city.findFirst();
  const currency = await prisma.currency.findFirst({ where: { code: 'USD' } });

  if (!country || !city || !currency) {
    console.log('❌ Missing required data (country, city, or currency)');
    return;
  }

  const properties = [
    {
      id: 'property-luxury-3br-downtown',
      title: 'Luxury 3BR Apartment in Downtown',
      subtitle: 'Modern apartment with stunning city views',
      description: 'Beautiful 3-bedroom apartment located in the heart of downtown. Features include modern kitchen, spacious living room, and panoramic city views from the balcony.',
      slug: 'luxury-3br-apartment-downtown',
      type: 'RENT' as const,
      status: 'PUBLISHED' as const,
      isFeatured: true,
      visibility: 'PUBLIC' as const,
      countryId: country.id,
      cityId: city.id,
      addressLine1: '123 Main Street',
      zipCode: '10001',
      bedrooms: 3,
      bathrooms: 2,
      areaSize: 1500,
      areaUnit: 'sqft',
      price: 3500,
      priceCurrencyId: currency.id,
      pricePostfix: '/month',
      updatedAt: new Date(),
    },
    {
      id: 'property-cozy-studio-beach',
      title: 'Cozy Studio Near Beach',
      subtitle: 'Perfect for singles or couples',
      description: 'Charming studio apartment just 5 minutes walk from the beach. Fully furnished with modern amenities and a beautiful ocean view.',
      slug: 'cozy-studio-near-beach',
      type: 'DAILY' as const,
      status: 'PUBLISHED' as const,
      isFeatured: false,
      visibility: 'PUBLIC' as const,
      countryId: country.id,
      cityId: city.id,
      addressLine1: '456 Beach Road',
      zipCode: '10002',
      bedrooms: 1,
      bathrooms: 1,
      areaSize: 450,
      areaUnit: 'sqft',
      price: 120,
      priceCurrencyId: currency.id,
      pricePostfix: '/night',
      updatedAt: new Date(),
    },
    {
      id: 'property-spacious-4br-house',
      title: 'Spacious 4BR Family House',
      subtitle: 'Perfect for families',
      description: 'Large family house with 4 bedrooms, 3 bathrooms, and a beautiful garden. Located in a quiet neighborhood with excellent schools nearby.',
      slug: 'spacious-4br-family-house',
      type: 'SALE' as const,
      status: 'PUBLISHED' as const,
      isFeatured: true,
      visibility: 'PUBLIC' as const,
      countryId: country.id,
      cityId: city.id,
      addressLine1: '789 Oak Avenue',
      zipCode: '10003',
      bedrooms: 4,
      bathrooms: 3,
      parkingSpaces: 2,
      areaSize: 2500,
      areaUnit: 'sqft',
      landArea: 5000,
      landAreaUnit: 'sqft',
      price: 750000,
      priceCurrencyId: currency.id,
      updatedAt: new Date(),
    },
    {
      id: 'property-modern-2br-condo',
      title: 'Modern 2BR Condo',
      subtitle: 'Great for young professionals',
      description: 'Contemporary 2-bedroom condo in a new building with gym, pool, and 24/7 security. Close to public transportation and shopping centers.',
      slug: 'modern-2br-condo',
      type: 'RENT' as const,
      status: 'DRAFT' as const,
      isFeatured: false,
      visibility: 'PUBLIC' as const,
      countryId: country.id,
      cityId: city.id,
      addressLine1: '321 Tower Street',
      zipCode: '10004',
      bedrooms: 2,
      bathrooms: 2,
      parkingSpaces: 1,
      areaSize: 1100,
      areaUnit: 'sqft',
      price: 2200,
      priceCurrencyId: currency.id,
      pricePostfix: '/month',
      updatedAt: new Date(),
    },
    {
      id: 'property-penthouse-rooftop',
      title: 'Penthouse with Rooftop Terrace',
      subtitle: 'Exclusive luxury living',
      description: 'Stunning penthouse with private rooftop terrace offering 360-degree city views. Features high-end finishes, smart home technology, and concierge service.',
      slug: 'penthouse-rooftop-terrace',
      type: 'SALE' as const,
      status: 'PUBLISHED' as const,
      isFeatured: true,
      visibility: 'PUBLIC' as const,
      countryId: country.id,
      cityId: city.id,
      addressLine1: '555 Skyline Boulevard',
      zipCode: '10005',
      bedrooms: 3,
      bathrooms: 3,
      parkingSpaces: 2,
      areaSize: 3000,
      areaUnit: 'sqft',
      price: 1500000,
      priceCurrencyId: currency.id,
      updatedAt: new Date(),
    },
  ];

  let created = 0;
  let existing = 0;

  for (const propertyData of properties) {
    const existingProperty = await prisma.property.findUnique({
      where: { slug: propertyData.slug },
    });

    if (existingProperty) {
      console.log(`⏭️  Property already exists: ${propertyData.title}`);
      existing++;
    } else {
      await prisma.property.create({
        data: propertyData,
      });
      console.log(`✅ Created: ${propertyData.title}`);
      created++;
    }
  }

  console.log(`\n✨ Property seeding completed!`);
  console.log(`📊 Created: ${created}, Existing: ${existing}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding properties:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
