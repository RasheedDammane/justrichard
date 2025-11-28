import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 GENERATING MASSIVE DATA...\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // 1. LANGUAGES (10 langues)
  console.log('🌐 1/10 - Creating Languages...');
  const languages = [
    { code: 'en', name: 'English', nativeName: 'English', isRTL: false, isDefault: true },
    { code: 'fr', name: 'French', nativeName: 'Français', isRTL: false, isDefault: false },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', isRTL: true, isDefault: false },
    { code: 'es', name: 'Spanish', nativeName: 'Español', isRTL: false, isDefault: false },
    { code: 'de', name: 'German', nativeName: 'Deutsch', isRTL: false, isDefault: false },
    { code: 'ru', name: 'Russian', nativeName: 'Русский', isRTL: false, isDefault: false },
    { code: 'zh', name: 'Chinese', nativeName: '中文', isRTL: false, isDefault: false },
    { code: 'ja', name: 'Japanese', nativeName: '日本語', isRTL: false, isDefault: false },
    { code: 'ko', name: 'Korean', nativeName: '한국어', isRTL: false, isDefault: false },
    { code: 'th', name: 'Thai', nativeName: 'ไทย', isRTL: false, isDefault: false },
  ];

  for (const lang of languages) {
    await prisma.language.upsert({
      where: { code: lang.code },
      update: {},
      create: lang,
    });
  }
  console.log(`   ✅ ${languages.length} languages\n`);

  // 2. COUNTRIES (12 pays)
  console.log('🌍 2/10 - Creating Countries...');
  const countries = [
    { id: 'uae', code: 'AE', name: 'United Arab Emirates', slug: 'uae', currency: 'AED', dialCode: '+971' },
    { id: 'thailand', code: 'TH', name: 'Thailand', slug: 'thailand', currency: 'THB', dialCode: '+66' },
    { id: 'france', code: 'FR', name: 'France', slug: 'france', currency: 'EUR', dialCode: '+33' },
    { id: 'usa', code: 'US', name: 'United States', slug: 'usa', currency: 'USD', dialCode: '+1' },
    { id: 'uk', code: 'GB', name: 'United Kingdom', slug: 'uk', currency: 'GBP', dialCode: '+44' },
    { id: 'spain', code: 'ES', name: 'Spain', slug: 'spain', currency: 'EUR', dialCode: '+34' },
    { id: 'italy', code: 'IT', name: 'Italy', slug: 'italy', currency: 'EUR', dialCode: '+39' },
    { id: 'germany', code: 'DE', name: 'Germany', slug: 'germany', currency: 'EUR', dialCode: '+49' },
    { id: 'japan', code: 'JP', name: 'Japan', slug: 'japan', currency: 'JPY', dialCode: '+81' },
    { id: 'singapore', code: 'SG', name: 'Singapore', slug: 'singapore', currency: 'SGD', dialCode: '+65' },
    { id: 'australia', code: 'AU', name: 'Australia', slug: 'australia', currency: 'AUD', dialCode: '+61' },
    { id: 'canada', code: 'CA', name: 'Canada', slug: 'canada', currency: 'CAD', dialCode: '+1' },
  ];

  for (const country of countries) {
    await prisma.country.upsert({
      where: { id: country.id },
      update: {},
      create: country,
    });
  }
  console.log(`   ✅ ${countries.length} countries\n`);

  // 3. CITIES (30 villes)
  console.log('🏙️ 3/10 - Creating Cities...');
  const cities = [
    // UAE
    { id: 'dubai', name: 'Dubai', slug: 'dubai', countryId: 'uae', latitude: 25.2048, longitude: 55.2708 },
    { id: 'abu-dhabi', name: 'Abu Dhabi', slug: 'abu-dhabi', countryId: 'uae', latitude: 24.4539, longitude: 54.3773 },
    { id: 'sharjah', name: 'Sharjah', slug: 'sharjah', countryId: 'uae', latitude: 25.3463, longitude: 55.4209 },
    // Thailand
    { id: 'bangkok', name: 'Bangkok', slug: 'bangkok', countryId: 'thailand', latitude: 13.7563, longitude: 100.5018 },
    { id: 'phuket', name: 'Phuket', slug: 'phuket', countryId: 'thailand', latitude: 7.8804, longitude: 98.3923 },
    { id: 'pattaya', name: 'Pattaya', slug: 'pattaya', countryId: 'thailand', latitude: 12.9236, longitude: 100.8825 },
    // France
    { id: 'paris', name: 'Paris', slug: 'paris', countryId: 'france', latitude: 48.8566, longitude: 2.3522 },
    { id: 'nice', name: 'Nice', slug: 'nice', countryId: 'france', latitude: 43.7102, longitude: 7.2620 },
    { id: 'lyon', name: 'Lyon', slug: 'lyon', countryId: 'france', latitude: 45.7640, longitude: 4.8357 },
    // USA
    { id: 'new-york', name: 'New York', slug: 'new-york', countryId: 'usa', latitude: 40.7128, longitude: -74.0060 },
    { id: 'los-angeles', name: 'Los Angeles', slug: 'los-angeles', countryId: 'usa', latitude: 34.0522, longitude: -118.2437 },
    { id: 'miami', name: 'Miami', slug: 'miami', countryId: 'usa', latitude: 25.7617, longitude: -80.1918 },
    // UK
    { id: 'london', name: 'London', slug: 'london', countryId: 'uk', latitude: 51.5074, longitude: -0.1278 },
    { id: 'manchester', name: 'Manchester', slug: 'manchester', countryId: 'uk', latitude: 53.4808, longitude: -2.2426 },
    // Spain
    { id: 'barcelona', name: 'Barcelona', slug: 'barcelona', countryId: 'spain', latitude: 41.3851, longitude: 2.1734 },
    { id: 'madrid', name: 'Madrid', slug: 'madrid', countryId: 'spain', latitude: 40.4168, longitude: -3.7038 },
    // Italy
    { id: 'rome', name: 'Rome', slug: 'rome', countryId: 'italy', latitude: 41.9028, longitude: 12.4964 },
    { id: 'milan', name: 'Milan', slug: 'milan', countryId: 'italy', latitude: 45.4642, longitude: 9.1900 },
    // Germany
    { id: 'berlin', name: 'Berlin', slug: 'berlin', countryId: 'germany', latitude: 52.5200, longitude: 13.4050 },
    { id: 'munich', name: 'Munich', slug: 'munich', countryId: 'germany', latitude: 48.1351, longitude: 11.5820 },
    // Japan
    { id: 'tokyo', name: 'Tokyo', slug: 'tokyo', countryId: 'japan', latitude: 35.6762, longitude: 139.6503 },
    { id: 'osaka', name: 'Osaka', slug: 'osaka', countryId: 'japan', latitude: 34.6937, longitude: 135.5023 },
    // Singapore
    { id: 'singapore-city', name: 'Singapore', slug: 'singapore', countryId: 'singapore', latitude: 1.3521, longitude: 103.8198 },
    // Australia
    { id: 'sydney', name: 'Sydney', slug: 'sydney', countryId: 'australia', latitude: -33.8688, longitude: 151.2093 },
    { id: 'melbourne', name: 'Melbourne', slug: 'melbourne', countryId: 'australia', latitude: -37.8136, longitude: 144.9631 },
    // Canada
    { id: 'toronto', name: 'Toronto', slug: 'toronto', countryId: 'canada', latitude: 43.6532, longitude: -79.3832 },
    { id: 'vancouver', name: 'Vancouver', slug: 'vancouver', countryId: 'canada', latitude: 49.2827, longitude: -123.1207 },
  ];

  for (const city of cities) {
    await prisma.city.upsert({
      where: { id: city.id },
      update: {},
      create: city,
    });
  }
  console.log(`   ✅ ${cities.length} cities\n`);

  // 4. PROPERTIES (200)
  console.log('🏠 4/10 - Creating 200 Properties...');
  const propertyTypes = ['VILLA', 'APARTMENT', 'TOWNHOUSE', 'PENTHOUSE', 'STUDIO'];
  const propertyStatus = ['FOR_SALE', 'FOR_RENT', 'SOLD', 'RENTED'];
  const cityIds = cities.map(c => c.id);
  
  for (let i = 1; i <= 200; i++) {
    const cityId = cityIds[i % cityIds.length];
    const city = cities.find(c => c.id === cityId)!;
    const type = propertyTypes[i % propertyTypes.length];
    const status = propertyStatus[i % propertyStatus.length];
    const bedrooms = Math.floor(Math.random() * 5) + 1;
    const price = Math.floor(Math.random() * 5000000) + 500000;

    await prisma.property.create({
      data: {
        title: `Luxury ${type} #${i} in ${city.name}`,
        slug: `property-${i}-${city.slug}`,
        description: `Beautiful ${bedrooms}BR ${type.toLowerCase()} in ${city.name}`,
        type,
        status,
        bedrooms,
        bathrooms: bedrooms,
        area: Math.floor(Math.random() * 3000) + 1000,
        price,
        currency: city.countryId === 'uae' ? 'AED' : 'USD',
        cityId: city.id,
        countryId: city.countryId,
        isAvailable: status === 'FOR_SALE' || status === 'FOR_RENT',
        isFeatured: i % 10 === 0,
      },
    });
  }
  console.log(`   ✅ 200 properties\n`);

  // 5. RENTAL CARS (200)
  console.log('🚗 5/10 - Creating 200 Rental Cars...');
  const carBrands = ['BMW', 'Mercedes', 'Audi', 'Toyota', 'Honda', 'Nissan', 'Ford', 'Chevrolet', 'Lexus', 'Porsche'];
  const carCategories = ['ECONOMY', 'STANDARD', 'LUXURY', 'SUV', 'SPORTS'];
  
  for (let i = 1; i <= 200; i++) {
    const brand = carBrands[i % carBrands.length];
    const category = carCategories[i % carCategories.length];
    const cityId = cityIds[i % cityIds.length];
    const city = cities.find(c => c.id === cityId)!;

    await prisma.rentalCar.create({
      data: {
        id: `car-${i}`,
        name: `${brand} Model ${i}`,
        slug: `${brand.toLowerCase()}-model-${i}`,
        category,
        brand,
        model: `Model ${i}`,
        year: 2020 + (i % 5),
        description: `Premium ${brand} for rent`,
        transmission: i % 2 === 0 ? 'AUTOMATIC' : 'MANUAL',
        fuelType: i % 3 === 0 ? 'ELECTRIC' : 'PETROL',
        seats: 4 + (i % 3),
        pricePerDay: 100 + (i % 500),
        pricePerWeek: 600 + (i % 3000),
        pricePerMonth: 2000 + (i % 10000),
        currency: city.countryId === 'uae' ? 'AED' : 'USD',
        cityId: city.id,
        countryId: city.countryId,
        isAvailable: true,
        isFeatured: i % 20 === 0,
      },
    });
  }
  console.log(`   ✅ 200 rental cars\n`);

  // 6. LAWYERS (50)
  console.log('⚖️ 6/10 - Creating 50 Lawyers...');
  const lawyerSpecialties = ['CORPORATE', 'CRIMINAL', 'FAMILY', 'IMMIGRATION', 'REAL_ESTATE'];
  
  for (let i = 1; i <= 50; i++) {
    const cityId = cityIds[i % cityIds.length];
    const specialty = lawyerSpecialties[i % lawyerSpecialties.length];

    await prisma.lawyer.create({
      data: {
        slug: `lawyer-${i}`,
        firstName: `Lawyer`,
        lastName: `${i}`,
        specialty,
        bio: `Experienced ${specialty} lawyer`,
        hourlyRate: 200 + (i % 500),
        yearsExperience: 5 + (i % 20),
        cityId,
        isAvailable: true,
        isFeatured: i % 10 === 0,
      },
    });
  }
  console.log(`   ✅ 50 lawyers\n`);

  // 7. DOCTORS (50)
  console.log('👨‍⚕️ 7/10 - Creating 50 Doctors...');
  const doctorSpecialties = ['GENERAL', 'CARDIOLOGY', 'DERMATOLOGY', 'PEDIATRICS', 'ORTHOPEDICS'];
  
  for (let i = 1; i <= 50; i++) {
    const cityId = cityIds[i % cityIds.length];
    const specialty = doctorSpecialties[i % doctorSpecialties.length];

    await prisma.doctor.create({
      data: {
        slug: `doctor-${i}`,
        firstName: `Dr.`,
        lastName: `${i}`,
        specialty,
        bio: `Expert ${specialty} physician`,
        consultationFee: 150 + (i % 300),
        yearsExperience: 5 + (i % 25),
        cityId,
        isAvailable: true,
        isFeatured: i % 10 === 0,
      },
    });
  }
  console.log(`   ✅ 50 doctors\n`);

  // 8. COACHES (30)
  console.log('🏋️ 8/10 - Creating 30 Coaches...');
  const coachSpecialties = ['FITNESS', 'YOGA', 'NUTRITION', 'SPORTS', 'WELLNESS'];
  
  for (let i = 1; i <= 30; i++) {
    const cityId = cityIds[i % cityIds.length];
    const specialty = coachSpecialties[i % coachSpecialties.length];

    await prisma.coach.create({
      data: {
        slug: `coach-${i}`,
        firstName: `Coach`,
        lastName: `${i}`,
        specialty,
        bio: `Professional ${specialty} coach`,
        hourlyRate: 50 + (i % 150),
        yearsExperience: 3 + (i % 15),
        cityId,
        isAvailable: true,
        isFeatured: i % 10 === 0,
      },
    });
  }
  console.log(`   ✅ 30 coaches\n`);

  // 9. MAIDS (40)
  console.log('👩‍🦰 9/10 - Creating 40 Maids...');
  const nationalities = ['Philippines', 'Indonesia', 'India', 'Sri Lanka', 'Nepal'];
  
  for (let i = 1; i <= 40; i++) {
    const cityId = cityIds[i % cityIds.length];
    const nationality = nationalities[i % nationalities.length];

    await prisma.maid.create({
      data: {
        slug: `maid-${i}`,
        name: `Maid ${i}`,
        nationality,
        hourlyRate: 15 + (i % 25),
        cityId,
        isAvailable: true,
        isFeatured: i % 10 === 0,
      },
    });
  }
  console.log(`   ✅ 40 maids\n`);

  // 10. TRANSFERS (40)
  console.log('🚐 10/10 - Creating 40 Transfers...');
  const vehicleTypes = ['SEDAN', 'SUV', 'VAN', 'LUXURY', 'BUS'];
  
  for (let i = 1; i <= 40; i++) {
    const cityId = cityIds[i % cityIds.length];
    const city = cities.find(c => c.id === cityId)!;
    const vehicleType = vehicleTypes[i % vehicleTypes.length];

    await prisma.transfer.create({
      data: {
        name: `Transfer ${i} - ${vehicleType}`,
        slug: `transfer-${i}`,
        fromLocation: `${city.name} Airport`,
        toLocation: `${city.name} Downtown`,
        vehicleType,
        price: 50 + (i % 200),
        currency: city.countryId === 'uae' ? 'AED' : 'USD',
        maxPassengers: vehicleType === 'BUS' ? 20 : 4,
        countryId: city.countryId,
        isAvailable: true,
        isFeatured: i % 10 === 0,
      },
    });
  }
  console.log(`   ✅ 40 transfers\n`);

  // FINAL COUNT
  const finalCounts = {
    languages: await prisma.language.count(),
    countries: await prisma.country.count(),
    cities: await prisma.city.count(),
    properties: await prisma.property.count(),
    rentalCars: await prisma.rentalCar.count(),
    lawyers: await prisma.lawyer.count(),
    doctors: await prisma.doctor.count(),
    coaches: await prisma.coach.count(),
    maids: await prisma.maid.count(),
    transfers: await prisma.transfer.count(),
  };

  const total = Object.values(finalCounts).reduce((a, b) => a + b, 0);

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🎉 MASSIVE DATA GENERATION COMPLETE!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('📊 DATABASE SUMMARY:\n');
  console.log(`🌐 Languages:      ${finalCounts.languages}`);
  console.log(`🌍 Countries:      ${finalCounts.countries}`);
  console.log(`🏙️ Cities:         ${finalCounts.cities}`);
  console.log(`🏠 Properties:     ${finalCounts.properties}`);
  console.log(`🚗 Rental Cars:    ${finalCounts.rentalCars}`);
  console.log(`⚖️ Lawyers:        ${finalCounts.lawyers}`);
  console.log(`👨‍⚕️ Doctors:        ${finalCounts.doctors}`);
  console.log(`🏋️ Coaches:        ${finalCounts.coaches}`);
  console.log(`👩‍🦰 Maids:          ${finalCounts.maids}`);
  console.log(`🚐 Transfers:      ${finalCounts.transfers}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`📦 TOTAL:          ${total} RECORDS!\n`);
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
