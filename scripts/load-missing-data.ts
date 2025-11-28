import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Loading MISSING data...\n');

  // Get cities
  const cities = await prisma.city.findMany();
  const countries = await prisma.country.findMany();
  
  if (cities.length === 0) {
    console.log('❌ No cities found. Run geography seed first.');
    return;
  }

  const city1 = cities[0];
  const country1 = countries[0];

  // 1. YACHTS
  console.log('⛵ Creating Yachts...');
  try {
    await prisma.yacht.createMany({
      data: [
        {
          name: 'Lamborghini Yacht',
          slug: 'lamborghini-yacht-2024',
          brand: 'Lamborghini',
          model: 'Tecnomar 63',
          year: 2024,
          length: 63,
          capacity: 12,
          cabins: 3,
          bathrooms: 3,
          crew: 4,
          pricePerHour: 5000,
          priceFor2Hours: 9000,
          priceFor3Hours: 13000,
          priceFor4Hours: 16000,
          pricePerDay: 35000,
          currency: 'AED',
          cityId: city1.id,
          countryId: country1.id,
          isFeatured: true,
          isActive: true,
        },
        {
          name: 'Milano A-55',
          slug: 'milano-a55-yacht',
          brand: 'Milano',
          model: 'A-55',
          year: 2024,
          length: 55,
          capacity: 40,
          cabins: 2,
          bathrooms: 2,
          crew: 3,
          pricePerHour: 1800,
          priceFor2Hours: 3400,
          priceFor3Hours: 5000,
          priceFor4Hours: 6400,
          pricePerDay: 15000,
          currency: 'AED',
          cityId: city1.id,
          countryId: country1.id,
          isFeatured: true,
          isActive: true,
        },
      ],
      skipDuplicates: true,
    });
    console.log('   ✅ Created 2 yachts\n');
  } catch (e: any) {
    console.log('   ⚠️  Yachts:', e.message, '\n');
  }

  // 2. RENTAL CARS
  console.log('🚗 Creating Rental Cars...');
  try {
    await prisma.rentalCar.createMany({
      data: [
        {
          id: 'car-bmw-001',
          name: 'BMW 5 Series 2024',
          slug: 'bmw-5-series-2024',
          category: 'Luxury Sedan',
          brand: 'BMW',
          model: '5 Series',
          year: 2024,
          description: 'Luxury sedan with premium features',
          transmission: 'Automatic',
          fuelType: 'Petrol',
          seats: 5,
          pricePerDay: 300,
          pricePerWeek: 1800,
          pricePerMonth: 6000,
          currency: 'AED',
          cityId: city1.id,
          countryId: country1.id,
          isAvailable: true,
          isFeatured: true,
        },
        {
          id: 'car-merc-001',
          name: 'Mercedes C-Class 2024',
          slug: 'mercedes-c-class-2024',
          category: 'Luxury Sedan',
          brand: 'Mercedes',
          model: 'C-Class',
          year: 2024,
          description: 'Premium Mercedes sedan',
          transmission: 'Automatic',
          fuelType: 'Petrol',
          seats: 5,
          pricePerDay: 280,
          pricePerWeek: 1700,
          pricePerMonth: 5500,
          currency: 'AED',
          cityId: city1.id,
          countryId: country1.id,
          isAvailable: true,
          isFeatured: false,
        },
      ],
      skipDuplicates: true,
    });
    console.log('   ✅ Created 2 rental cars\n');
  } catch (e: any) {
    console.log('   ⚠️  Rental Cars:', e.message, '\n');
  }

  // 3. MOTORBIKES
  console.log('🏍️ Creating Motorbikes...');
  try {
    await prisma.rentalMotorbike.createMany({
      data: [
        {
          id: 'bike-honda-001',
          title: 'Honda PCX 160',
          slug: 'honda-pcx-160',
          brand: 'Honda',
          model: 'PCX 160',
          year: 2024,
          description: 'Modern automatic scooter',
          pricePerDay: 15,
          pricePerWeek: 90,
          pricePerMonth: 300,
          currency: 'THB',
          cityId: city1.id,
          countryId: country1.id,
          isAvailable: true,
          isFeatured: true,
        },
        {
          id: 'bike-yamaha-001',
          title: 'Yamaha Aerox 155',
          slug: 'yamaha-aerox-155',
          brand: 'Yamaha',
          model: 'Aerox 155',
          year: 2024,
          description: 'Sporty automatic scooter',
          pricePerDay: 18,
          pricePerWeek: 100,
          pricePerMonth: 350,
          currency: 'THB',
          cityId: city1.id,
          countryId: country1.id,
          isAvailable: true,
          isFeatured: false,
        },
      ],
      skipDuplicates: true,
    });
    console.log('   ✅ Created 2 motorbikes\n');
  } catch (e: any) {
    console.log('   ⚠️  Motorbikes:', e.message, '\n');
  }

  // 4. PROPERTIES
  console.log('🏠 Creating Properties...');
  try {
    await prisma.property.createMany({
      data: [
        {
          title: 'Luxury Villa Palm Jumeirah',
          slug: 'luxury-villa-palm-jumeirah',
          description: '5BR villa with private beach',
          type: 'VILLA',
          status: 'FOR_SALE',
          bedrooms: 5,
          bathrooms: 6,
          area: 4500,
          price: 15000000,
          currency: 'AED',
          cityId: city1.id,
          countryId: country1.id,
          isAvailable: true,
          isFeatured: true,
        },
        {
          title: 'Modern Apartment Downtown',
          slug: 'modern-apartment-downtown',
          description: '2BR apartment with city view',
          type: 'APARTMENT',
          status: 'FOR_RENT',
          bedrooms: 2,
          bathrooms: 2,
          area: 1200,
          price: 120000,
          currency: 'AED',
          cityId: city1.id,
          countryId: country1.id,
          isAvailable: true,
          isFeatured: false,
        },
      ],
      skipDuplicates: true,
    });
    console.log('   ✅ Created 2 properties\n');
  } catch (e: any) {
    console.log('   ⚠️  Properties:', e.message, '\n');
  }

  // Final count
  const counts = {
    yachts: await prisma.yacht.count(),
    cars: await prisma.rentalCar.count(),
    bikes: await prisma.rentalMotorbike.count(),
    properties: await prisma.property.count(),
  };

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ MISSING DATA LOADED!\n');
  console.log(`⛵ Yachts: ${counts.yachts}`);
  console.log(`🚗 Rental Cars: ${counts.cars}`);
  console.log(`🏍️ Motorbikes: ${counts.bikes}`);
  console.log(`🏠 Properties: ${counts.properties}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
