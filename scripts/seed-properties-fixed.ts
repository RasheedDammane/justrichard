import { PrismaClient, PropertyStatus, PropertyType, PropertyVisibility } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🏠 Starting properties seed (fixed)...');

  // Get cities
  const bangkok = await prisma.city.findFirst({ where: { slug: 'bangkok' } });
  const pattaya = await prisma.city.findFirst({ where: { slug: 'pattaya' } });
  const phuket = await prisma.city.findFirst({ where: { slug: 'phuket' } });
  const dubai = await prisma.city.findFirst({ where: { slug: 'dubai' } });

  if (!bangkok || !pattaya || !phuket || !dubai) {
    throw new Error('Cities not found. Please run seed-base-geography first.');
  }

  // Get countries
  const thailand = await prisma.country.findFirst({ where: { code: 'TH' } });
  const uae = await prisma.country.findFirst({ where: { code: 'AE' } });

  if (!thailand || !uae) {
    throw new Error('Countries not found.');
  }

  // Get currencies
  const thb = await prisma.currency.findFirst({ where: { code: 'THB' } });
  const aed = await prisma.currency.findFirst({ where: { code: 'AED' } });

  const properties = [
    // Bangkok Properties
    {
      slug: 'luxury-condo-sukhumvit-bangkok',
      title: 'Luxury Condo in Sukhumvit',
      subtitle: 'Modern 2BR with City Views',
      description: 'Stunning 2-bedroom luxury condominium in the heart of Sukhumvit, Bangkok. Fully furnished with high-end appliances, floor-to-ceiling windows offering breathtaking city views. Walking distance to BTS Asok, Terminal 21, and numerous restaurants.',
      status: PropertyStatus.PUBLISHED,
      type: PropertyType.RENT,
      isFeatured: true,
      visibility: PropertyVisibility.PUBLIC,
      addressLine1: '123 Sukhumvit Road',
      addressLine2: 'Khlong Toei',
      cityId: bangkok.id,
      countryId: thailand.id,
      latitude: 13.7307,
      longitude: 100.5418,
      bedrooms: 2,
      bathrooms: 2,
      parkingSpaces: 1,
      areaSize: 85,
      areaUnit: 'sqm',
      yearBuilt: 2022,
      price: 75000,
      priceCurrencyId: thb?.id,
      pricePostfix: '/month',
      rentalDetails: {
        deposit: 150000,
        minimumStay: '1 year',
        utilities: 'Not included',
      },
      publishedAt: new Date(),
    },
    {
      slug: 'modern-apartment-thonglor-bangkok',
      title: 'Modern Apartment in Thonglor',
      subtitle: 'Stylish 1BR Near BTS',
      description: 'Contemporary 1-bedroom apartment in trendy Thonglor area. Perfect for young professionals and expats. Close to cafes, restaurants, and nightlife. Fully furnished with modern amenities.',
      status: PropertyStatus.PUBLISHED,
      type: PropertyType.RENT,
      isFeatured: false,
      visibility: PropertyVisibility.PUBLIC,
      addressLine1: '456 Sukhumvit 55',
      addressLine2: 'Thonglor, Khlong Tan Nuea',
      cityId: bangkok.id,
      countryId: thailand.id,
      latitude: 13.7385,
      longitude: 100.5826,
      bedrooms: 1,
      bathrooms: 1,
      parkingSpaces: 1,
      areaSize: 50,
      areaUnit: 'sqm',
      yearBuilt: 2021,
      price: 45000,
      priceCurrencyId: thb?.id,
      pricePostfix: '/month',
      rentalDetails: {
        deposit: 90000,
        minimumStay: '1 year',
        utilities: 'Not included',
      },
      publishedAt: new Date(),
    },
    // Pattaya Properties
    {
      slug: 'beachfront-condo-jomtien-pattaya',
      title: 'Beachfront Condo in Jomtien',
      subtitle: 'Ocean View 2BR',
      description: 'Beautiful beachfront condominium with direct beach access in Jomtien, Pattaya. Wake up to stunning ocean views every morning. Fully furnished with modern amenities, swimming pool, gym, and 24/7 security.',
      status: PropertyStatus.PUBLISHED,
      type: PropertyType.RENT,
      isFeatured: true,
      visibility: PropertyVisibility.PUBLIC,
      addressLine1: '789 Jomtien Beach Road',
      addressLine2: 'Na Jomtien',
      cityId: pattaya.id,
      countryId: thailand.id,
      latitude: 12.8805,
      longitude: 100.8978,
      bedrooms: 2,
      bathrooms: 2,
      parkingSpaces: 1,
      areaSize: 90,
      areaUnit: 'sqm',
      yearBuilt: 2020,
      price: 55000,
      priceCurrencyId: thb?.id,
      pricePostfix: '/month',
      rentalDetails: {
        deposit: 110000,
        minimumStay: '6 months',
        utilities: 'Not included',
      },
      publishedAt: new Date(),
    },
    {
      slug: 'studio-pratumnak-pattaya',
      title: 'Cozy Studio on Pratumnak Hill',
      subtitle: 'Sea View Studio',
      description: 'Affordable studio apartment on Pratumnak Hill with partial sea view. Perfect for digital nomads and solo travelers. Quiet area yet close to beaches, restaurants, and nightlife.',
      status: PropertyStatus.PUBLISHED,
      type: PropertyType.RENT,
      isFeatured: false,
      visibility: PropertyVisibility.PUBLIC,
      addressLine1: '321 Pratumnak Soi 5',
      addressLine2: 'Pratumnak Hill',
      cityId: pattaya.id,
      countryId: thailand.id,
      latitude: 12.9169,
      longitude: 100.8758,
      bedrooms: 0,
      bathrooms: 1,
      parkingSpaces: 0,
      areaSize: 30,
      areaUnit: 'sqm',
      yearBuilt: 2019,
      price: 18000,
      priceCurrencyId: thb?.id,
      pricePostfix: '/month',
      rentalDetails: {
        deposit: 36000,
        minimumStay: '3 months',
        utilities: 'Not included',
      },
      publishedAt: new Date(),
    },
    // Phuket Properties
    {
      slug: 'villa-patong-beach-phuket',
      title: 'Luxury Villa Near Patong Beach',
      subtitle: 'Private Pool 3BR Villa',
      description: 'Stunning 3-bedroom villa with private pool just 5 minutes walk from Patong Beach. Fully furnished with high-end furniture, modern kitchen, and tropical garden. Perfect for families or groups.',
      status: PropertyStatus.PUBLISHED,
      type: PropertyType.RENT,
      isFeatured: true,
      visibility: PropertyVisibility.PUBLIC,
      addressLine1: '567 Patong Beach Road',
      addressLine2: 'Patong, Kathu',
      cityId: phuket.id,
      countryId: thailand.id,
      latitude: 7.8966,
      longitude: 98.2969,
      bedrooms: 3,
      bathrooms: 3,
      parkingSpaces: 2,
      areaSize: 180,
      areaUnit: 'sqm',
      landArea: 300,
      landAreaUnit: 'sqm',
      yearBuilt: 2018,
      price: 120000,
      priceCurrencyId: thb?.id,
      pricePostfix: '/month',
      rentalDetails: {
        deposit: 240000,
        minimumStay: '1 year',
        utilities: 'Not included',
        pool: 'Private pool with maintenance',
        garden: 'Included',
      },
      publishedAt: new Date(),
    },
    {
      slug: 'apartment-karon-beach-phuket',
      title: 'Modern Apartment in Karon',
      subtitle: '1BR Near Beach',
      description: 'Contemporary 1-bedroom apartment in peaceful Karon area. 10 minutes walk to Karon Beach. Fully furnished with balcony, community pool, and gym facilities.',
      status: PropertyStatus.PUBLISHED,
      type: PropertyType.RENT,
      isFeatured: false,
      visibility: PropertyVisibility.PUBLIC,
      addressLine1: '890 Karon Road',
      addressLine2: 'Karon, Mueang Phuket',
      cityId: phuket.id,
      countryId: thailand.id,
      latitude: 7.8384,
      longitude: 98.2980,
      bedrooms: 1,
      bathrooms: 1,
      parkingSpaces: 1,
      areaSize: 55,
      areaUnit: 'sqm',
      yearBuilt: 2021,
      price: 35000,
      priceCurrencyId: thb?.id,
      pricePostfix: '/month',
      rentalDetails: {
        deposit: 70000,
        minimumStay: '6 months',
        utilities: 'Not included',
      },
      publishedAt: new Date(),
    },
    // Dubai Properties
    {
      slug: 'luxury-apartment-dubai-marina',
      title: 'Luxury Apartment in Dubai Marina',
      subtitle: 'Stunning 2BR with Marina View',
      description: 'Exquisite 2-bedroom apartment in the prestigious Dubai Marina. Breathtaking marina and sea views, high-floor unit with premium finishes. Access to world-class amenities including infinity pool, gym, and concierge service.',
      status: PropertyStatus.PUBLISHED,
      type: PropertyType.RENT,
      isFeatured: true,
      visibility: PropertyVisibility.PUBLIC,
      addressLine1: 'Dubai Marina',
      addressLine2: 'Marina Promenade',
      cityId: dubai.id,
      countryId: uae.id,
      latitude: 25.0806,
      longitude: 55.1391,
      bedrooms: 2,
      bathrooms: 3,
      parkingSpaces: 2,
      areaSize: 150,
      areaUnit: 'sqm',
      yearBuilt: 2020,
      price: 180000,
      priceCurrencyId: aed?.id,
      pricePostfix: '/year',
      rentalDetails: {
        deposit: 20000,
        minimumStay: '1 year',
        utilities: 'DEWA extra',
        parking: '2 spaces included',
        chiller: 'Extra charge',
      },
      publishedAt: new Date(),
    },
    {
      slug: 'penthouse-downtown-dubai',
      title: 'Exclusive Penthouse Downtown',
      subtitle: 'Burj Khalifa View 4BR',
      description: 'Ultra-luxury 4-bedroom penthouse in Downtown Dubai with direct views of Burj Khalifa and Dubai Fountain. Spacious layout with premium Italian finishes, private terrace, and smart home features. Steps from Dubai Mall.',
      status: PropertyStatus.PUBLISHED,
      type: PropertyType.RENT,
      isFeatured: true,
      visibility: PropertyVisibility.PUBLIC,
      addressLine1: 'Downtown Dubai',
      addressLine2: 'Sheikh Mohammed bin Rashid Boulevard',
      cityId: dubai.id,
      countryId: uae.id,
      latitude: 25.1972,
      longitude: 55.2744,
      bedrooms: 4,
      bathrooms: 5,
      parkingSpaces: 3,
      areaSize: 350,
      areaUnit: 'sqm',
      yearBuilt: 2019,
      price: 500000,
      priceCurrencyId: aed?.id,
      pricePostfix: '/year',
      rentalDetails: {
        deposit: 50000,
        minimumStay: '1 year',
        utilities: 'DEWA extra',
        parking: '3 spaces included',
        chiller: 'Included',
        maid: 'Maid room available',
      },
      publishedAt: new Date(),
    },
    {
      slug: 'studio-business-bay-dubai',
      title: 'Modern Studio in Business Bay',
      subtitle: 'Affordable Studio Near Metro',
      description: 'Well-designed studio apartment in Business Bay, perfect for young professionals. Fully furnished with modern amenities, close to Business Bay Metro Station and within walking distance to Downtown Dubai.',
      status: PropertyStatus.PUBLISHED,
      type: PropertyType.RENT,
      isFeatured: false,
      visibility: PropertyVisibility.PUBLIC,
      addressLine1: 'Business Bay',
      addressLine2: 'Bay Avenue',
      cityId: dubai.id,
      countryId: uae.id,
      latitude: 25.1867,
      longitude: 55.2662,
      bedrooms: 0,
      bathrooms: 1,
      parkingSpaces: 1,
      areaSize: 45,
      areaUnit: 'sqm',
      yearBuilt: 2021,
      price: 55000,
      priceCurrencyId: aed?.id,
      pricePostfix: '/year',
      rentalDetails: {
        deposit: 5000,
        minimumStay: '1 year',
        utilities: 'DEWA extra',
        parking: '1 space included',
        chiller: 'Extra charge',
      },
      publishedAt: new Date(),
    },
    {
      slug: 'villa-palm-jumeirah-dubai',
      title: 'Beachfront Villa on Palm Jumeirah',
      subtitle: 'Luxury 5BR with Private Beach',
      description: 'Spectacular 5-bedroom villa on the iconic Palm Jumeirah with direct beach access. Featuring private pool, landscaped garden, cinema room, and panoramic sea views. Ultimate luxury living in Dubai.',
      status: PropertyStatus.PUBLISHED,
      type: PropertyType.RENT,
      isFeatured: true,
      visibility: PropertyVisibility.PUBLIC,
      addressLine1: 'Palm Jumeirah',
      addressLine2: 'Frond N',
      cityId: dubai.id,
      countryId: uae.id,
      latitude: 25.1124,
      longitude: 55.1390,
      bedrooms: 5,
      bathrooms: 6,
      parkingSpaces: 4,
      areaSize: 650,
      areaUnit: 'sqm',
      landArea: 1000,
      landAreaUnit: 'sqm',
      yearBuilt: 2017,
      price: 900000,
      priceCurrencyId: aed?.id,
      pricePostfix: '/year',
      rentalDetails: {
        deposit: 100000,
        minimumStay: '1 year',
        utilities: 'DEWA extra',
        parking: '4+ spaces',
        pool: 'Private pool with maintenance',
        garden: 'Landscaped garden maintained',
        beach: 'Private beach access',
        maid: 'Maid rooms (2)',
      },
      publishedAt: new Date(),
    },
  ];

  let created = 0;
  let updated = 0;

  for (const property of properties) {
    try {
      const result = await prisma.property.upsert({
        where: { slug: property.slug },
        update: {
          ...property,
          updatedAt: new Date(),
        },
        create: property,
      });
      
      if (result.createdAt.getTime() === result.updatedAt.getTime()) {
        created++;
        console.log(`✅ Created: ${property.title}`);
      } else {
        updated++;
        console.log(`🔄 Updated: ${property.title}`);
      }
    } catch (error) {
      console.error(`❌ Error with ${property.title}:`, error);
    }
  }

  console.log(`\n🎉 Properties seeding completed!`);
  console.log(`   ✨ Created: ${created} properties`);
  console.log(`   🔄 Updated: ${updated} properties`);
  console.log(`   📊 Total: ${created + updated} properties`);
  console.log(`\n📍 Breakdown:`);
  console.log(`   - Bangkok: 2 properties`);
  console.log(`   - Pattaya: 2 properties`);
  console.log(`   - Phuket: 2 properties`);
  console.log(`   - Dubai: 4 properties`);
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
