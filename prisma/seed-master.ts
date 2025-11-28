import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting MASTER SEED - Loading ALL data...\n');

  // 1. GÉOGRAPHIE (Pays et Villes)
  console.log('🌍 1/10 - Creating Geography...');
  
  const uae = await prisma.country.create({
    data: {
      id: 'uae-001',
      code: 'AE',
      name: 'United Arab Emirates',
      nameAr: 'الإمارات العربية المتحدة',
      nameFr: 'Émirats arabes unis',
      slug: 'uae',
      currency: 'AED',
      dialCode: '+971',
      flag: '🇦🇪',
    },
  });

  const thailand = await prisma.country.create({
    data: {
      id: 'th-001',
      code: 'TH',
      name: 'Thailand',
      nameAr: 'تايلاند',
      nameFr: 'Thaïlande',
      slug: 'thailand',
      currency: 'THB',
      dialCode: '+66',
      flag: '🇹🇭',
    },
  });

  const france = await prisma.country.create({
    data: {
      id: 'fr-001',
      code: 'FR',
      name: 'France',
      nameAr: 'فرنسا',
      nameFr: 'France',
      slug: 'france',
      currency: 'EUR',
      dialCode: '+33',
      flag: '🇫🇷',
    },
  });

  const dubai = await prisma.city.create({
    data: {
      id: 'dubai-001',
      name: 'Dubai',
      nameAr: 'دبي',
      nameFr: 'Dubaï',
      slug: 'dubai',
      countryId: uae.id,
      latitude: 25.2048,
      longitude: 55.2708,
    },
  });

  const bangkok = await prisma.city.create({
    data: {
      id: 'bangkok-001',
      name: 'Bangkok',
      nameAr: 'بانكوك',
      nameFr: 'Bangkok',
      slug: 'bangkok',
      countryId: thailand.id,
      latitude: 13.7563,
      longitude: 100.5018,
    },
  });

  const paris = await prisma.city.create({
    data: {
      id: 'paris-001',
      name: 'Paris',
      nameAr: 'باريس',
      nameFr: 'Paris',
      slug: 'paris',
      countryId: france.id,
      latitude: 48.8566,
      longitude: 2.3522,
    },
  });

  console.log('✅ Created 3 countries and 3 cities\n');

  // 2. YACHTS
  console.log('⛵ 2/10 - Creating Yachts...');
  
  await prisma.yacht.createMany({
    data: [
      {
        name: 'Lamborghini Yacht',
        slug: 'lamborghini-yacht',
        capacity: 12,
        length: 63,
        pricePerHour: 5000,
        pricePer2Hours: 9000,
        pricePer3Hours: 13000,
        pricePer4Hours: 16000,
        currency: 'AED',
        cityId: dubai.id,
        countryId: uae.id,
        isFeatured: true,
        isActive: true,
      },
      {
        name: 'Milano A-55',
        slug: 'milano-a55',
        capacity: 40,
        length: 55,
        pricePerHour: 1800,
        pricePer2Hours: 3400,
        pricePer3Hours: 5000,
        pricePer4Hours: 6400,
        currency: 'AED',
        cityId: dubai.id,
        countryId: uae.id,
        isFeatured: true,
        isActive: true,
      },
    ],
  });
  
  console.log('✅ Created 2 yachts\n');

  // 3. RENTAL CARS
  console.log('🚗 3/10 - Creating Rental Cars...');
  
  await prisma.rentalCar.createMany({
    data: [
      {
        name: 'BMW 5 Series',
        slug: 'bmw-5-series',
        brand: 'BMW',
        model: '5 Series',
        year: 2024,
        pricePerDay: 300,
        pricePerWeek: 1800,
        pricePerMonth: 6000,
        currency: 'AED',
        cityId: dubai.id,
        countryId: uae.id,
        isAvailable: true,
        isFeatured: true,
      },
      {
        name: 'Mercedes C-Class',
        slug: 'mercedes-c-class',
        brand: 'Mercedes',
        model: 'C-Class',
        year: 2024,
        pricePerDay: 280,
        pricePerWeek: 1700,
        pricePerMonth: 5500,
        currency: 'AED',
        cityId: dubai.id,
        countryId: uae.id,
        isAvailable: true,
        isFeatured: false,
      },
    ],
  });
  
  console.log('✅ Created 2 rental cars\n');

  // 4. MOTORBIKES
  console.log('🏍️ 4/10 - Creating Motorbikes...');
  
  await prisma.rentalMotorbike.createMany({
    data: [
      {
        name: 'Honda PCX 160',
        slug: 'honda-pcx-160',
        brand: 'Honda',
        model: 'PCX 160',
        year: 2024,
        pricePerDay: 15,
        pricePerWeek: 90,
        pricePerMonth: 300,
        currency: 'THB',
        cityId: bangkok.id,
        countryId: thailand.id,
        isAvailable: true,
        isFeatured: true,
      },
      {
        name: 'Yamaha Aerox',
        slug: 'yamaha-aerox',
        brand: 'Yamaha',
        model: 'Aerox',
        year: 2024,
        pricePerDay: 18,
        pricePerWeek: 100,
        pricePerMonth: 350,
        currency: 'THB',
        cityId: bangkok.id,
        countryId: thailand.id,
        isAvailable: true,
        isFeatured: false,
      },
    ],
  });
  
  console.log('✅ Created 2 motorbikes\n');

  // 5. MAIDS
  console.log('👩‍🦰 5/10 - Creating Maids...');
  
  await prisma.maid.createMany({
    data: [
      {
        name: 'Maria Santos',
        slug: 'maria-santos',
        nationality: 'Philippines',
        experience: 5,
        hourlyRate: 25,
        currency: 'AED',
        cityId: dubai.id,
        countryId: uae.id,
        isAvailable: true,
        isFeatured: true,
      },
      {
        name: 'Siti Abdullah',
        slug: 'siti-abdullah',
        nationality: 'Indonesia',
        experience: 3,
        hourlyRate: 22,
        currency: 'AED',
        cityId: dubai.id,
        countryId: uae.id,
        isAvailable: true,
        isFeatured: false,
      },
    ],
  });
  
  console.log('✅ Created 2 maids\n');

  // 6. PROPERTIES
  console.log('🏠 6/10 - Creating Properties...');
  
  await prisma.property.createMany({
    data: [
      {
        title: 'Luxury Villa in Palm Jumeirah',
        slug: 'luxury-villa-palm-jumeirah',
        type: 'villa',
        bedrooms: 5,
        bathrooms: 6,
        area: 4500,
        price: 15000000,
        currency: 'AED',
        cityId: dubai.id,
        countryId: uae.id,
        isAvailable: true,
        isFeatured: true,
      },
      {
        title: 'Modern Apartment Downtown',
        slug: 'modern-apartment-downtown',
        type: 'apartment',
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        price: 1800000,
        currency: 'AED',
        cityId: dubai.id,
        countryId: uae.id,
        isAvailable: true,
        isFeatured: false,
      },
    ],
  });
  
  console.log('✅ Created 2 properties\n');

  // 7. DOCTORS
  console.log('👨‍⚕️ 7/10 - Creating Doctors...');
  
  await prisma.doctor.createMany({
    data: [
      {
        name: 'Dr. Ahmed Hassan',
        slug: 'dr-ahmed-hassan',
        specialty: 'General Practice',
        experience: 15,
        consultationFee: 300,
        currency: 'AED',
        cityId: dubai.id,
        countryId: uae.id,
        isAvailable: true,
        isFeatured: true,
      },
      {
        name: 'Dr. Sarah Johnson',
        slug: 'dr-sarah-johnson',
        specialty: 'Pediatrics',
        experience: 10,
        consultationFee: 350,
        currency: 'AED',
        cityId: dubai.id,
        countryId: uae.id,
        isAvailable: true,
        isFeatured: false,
      },
    ],
  });
  
  console.log('✅ Created 2 doctors\n');

  // 8. LAWYERS
  console.log('⚖️ 8/10 - Creating Lawyers...');
  
  await prisma.lawyer.createMany({
    data: [
      {
        name: 'John Smith',
        slug: 'john-smith',
        specialty: 'Corporate Law',
        experience: 20,
        hourlyRate: 500,
        currency: 'AED',
        cityId: dubai.id,
        countryId: uae.id,
        isAvailable: true,
        isFeatured: true,
      },
      {
        name: 'Maria Rodriguez',
        slug: 'maria-rodriguez',
        specialty: 'Family Law',
        experience: 12,
        hourlyRate: 400,
        currency: 'AED',
        cityId: dubai.id,
        countryId: uae.id,
        isAvailable: true,
        isFeatured: false,
      },
    ],
  });
  
  console.log('✅ Created 2 lawyers\n');

  // 9. COACHES
  console.log('🏋️ 9/10 - Creating Coaches...');
  
  await prisma.coach.createMany({
    data: [
      {
        name: 'Mike Peterson',
        slug: 'mike-peterson',
        specialty: 'Personal Training',
        experience: 8,
        hourlyRate: 200,
        currency: 'AED',
        cityId: dubai.id,
        countryId: uae.id,
        isAvailable: true,
        isFeatured: true,
      },
      {
        name: 'Lisa Chen',
        slug: 'lisa-chen',
        specialty: 'Yoga Instructor',
        experience: 6,
        hourlyRate: 150,
        currency: 'AED',
        cityId: dubai.id,
        countryId: uae.id,
        isAvailable: true,
        isFeatured: false,
      },
    ],
  });
  
  console.log('✅ Created 2 coaches\n');

  // 10. TRANSFERS
  console.log('🚐 10/10 - Creating Transfers...');
  
  await prisma.transfer.createMany({
    data: [
      {
        name: 'Airport Transfer - Luxury Sedan',
        slug: 'airport-transfer-luxury-sedan',
        vehicleType: 'sedan',
        capacity: 4,
        price: 150,
        currency: 'AED',
        cityId: dubai.id,
        countryId: uae.id,
        isAvailable: true,
        isFeatured: true,
      },
      {
        name: 'Airport Transfer - SUV',
        slug: 'airport-transfer-suv',
        vehicleType: 'suv',
        capacity: 7,
        price: 200,
        currency: 'AED',
        cityId: dubai.id,
        countryId: uae.id,
        isAvailable: true,
        isFeatured: false,
      },
    ],
  });
  
  console.log('✅ Created 2 transfers\n');

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🎉 MASTER SEED COMPLETED SUCCESSFULLY!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
  console.log('📊 Summary:');
  console.log('  • 3 Countries (UAE, Thailand, France)');
  console.log('  • 3 Cities (Dubai, Bangkok, Paris)');
  console.log('  • 2 Yachts');
  console.log('  • 2 Rental Cars');
  console.log('  • 2 Motorbikes');
  console.log('  • 2 Maids');
  console.log('  • 2 Properties');
  console.log('  • 2 Doctors');
  console.log('  • 2 Lawyers');
  console.log('  • 2 Coaches');
  console.log('  • 2 Transfers');
  console.log('');
  console.log('🚀 Your database is ready!');
  console.log('');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
