import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting complete seed...\n');

  // 1. Check existing data
  const cityCount = await prisma.city.count();
  const countryCount = await prisma.country.count();
  
  if (cityCount === 0 || countryCount === 0) {
    console.log('⚠️  No geography data found. Run: npx tsx prisma/seed-geography.ts');
    return;
  }

  console.log(`✅ Found ${countryCount} countries and ${cityCount} cities\n`);

  // Get sample cities and countries
  const cities = await prisma.city.findMany({ take: 10 });
  const countries = await prisma.country.findMany({ take: 5 });
  
  const dubai = cities[0];
  const bangkok = cities.length > 5 ? cities[5] : cities[1];
  const uae = countries[0];
  const thailand = countries.length > 3 ? countries[3] : countries[1];

  console.log(`📍 Using cities: ${dubai.name}, ${bangkok.name}\n`);

  // 2. Create test users
  console.log('👥 Creating users...');
  const users = [];
  for (let i = 1; i <= 20; i++) {
    const user = await prisma.user.upsert({
      where: { email: `provider${i}@test.com` },
      update: {},
      create: {
        email: `provider${i}@test.com`,
        name: `Provider ${i}`,
        role: 'PROVIDER',
      },
    });
    users.push(user);
  }
  console.log(`   ✅ Created ${users.length} users\n`);

  // 3. Create Coaches
  console.log('💪 Creating Coaches...');
  try {
    await prisma.coach.create({
      data: {
        userId: users[0].id,
        firstName: 'John',
        lastName: 'Fitness',
        email: 'john.coach@test.com',
        phone: '+971501234567',
        cityId: dubai.id,
        bio: 'Professional fitness and wellness coach',
        oneOnOneRate: 100,
        yearsExperience: 5,
        languages: ['en', 'ar'],
        coachingTypes: ['HEALTH_WELLNESS', 'SPORTS_COACHING'],
        specializations: ['FITNESS', 'WEIGHT_LOSS', 'NUTRITION'],
        certifications: ['NASM-CPT', 'Nutrition Specialist'],
        certificateFiles: [],
        education: ['Sports Science Degree', 'Fitness Certification'],
        countries: ['AE'],
      },
    });

    await prisma.coach.create({
      data: {
        userId: users[1].id,
        firstName: 'Sarah',
        lastName: 'Wellness',
        email: 'sarah.coach@test.com',
        phone: '+66812345678',
        cityId: bangkok.id,
        bio: 'Yoga and mindfulness expert',
        oneOnOneRate: 80,
        yearsExperience: 8,
        languages: ['en', 'th'],
        coachingTypes: ['HEALTH_WELLNESS', 'MINDFULNESS_COACHING'],
        specializations: ['YOGA', 'MEDITATION', 'STRESS_MANAGEMENT'],
        certifications: ['RYT-500', 'Mindfulness Teacher'],
        certificateFiles: [],
        education: ['Yoga Teacher Training', 'Psychology Degree'],
        countries: ['TH'],
      },
    });
    console.log('   ✅ Created 2 coaches\n');
  } catch (e: any) {
    console.log('   ⚠️  Coaches already exist or error:', e.message.split('\n')[0]);
  }

  // 4. Create Doctors
  console.log('👨‍⚕️ Creating Doctors...');
  try {
    await prisma.doctor.create({
      data: {
        userId: users[2].id,
        firstName: 'Dr. Ahmed',
        lastName: 'Hassan',
        email: 'ahmed.doctor@test.com',
        phone: '+971502345678',
        cityId: dubai.id,
        countryId: uae.id,
        specialty: 'GENERAL_PRACTITIONER',
        licenseNumber: 'DOC-DXB-001',
        consultationFee: 200,
        yearsExperience: 15,
        languages: ['en', 'ar'],
        certifications: ['MD', 'Board Certified'],
        education: ['Medical School', 'Residency'],
      },
    });

    await prisma.doctor.create({
      data: {
        userId: users[3].id,
        firstName: 'Dr. Somchai',
        lastName: 'Pattana',
        email: 'somchai.doctor@test.com',
        phone: '+66823456789',
        cityId: bangkok.id,
        countryId: thailand.id,
        specialty: 'CARDIOLOGIST',
        licenseNumber: 'DOC-BKK-001',
        consultationFee: 180,
        yearsExperience: 20,
        languages: ['en', 'th'],
        certifications: ['MD', 'Cardiology Board'],
        education: ['Medical School', 'Cardiology Fellowship'],
      },
    });
    console.log('   ✅ Created 2 doctors\n');
  } catch (e: any) {
    console.log('   ⚠️  Doctors already exist or error:', e.message.split('\n')[0]);
  }

  // 5. Create Dentists
  console.log('🦷 Creating Dentists...');
  try {
    await prisma.dentist.create({
      data: {
        userId: users[4].id,
        firstName: 'Dr. Maria',
        lastName: 'Smith',
        email: 'maria.dentist@test.com',
        phone: '+971503456789',
        cityId: dubai.id,
        countryId: uae.id,
        specialty: 'COSMETIC_DENTIST',
        licenseNumber: 'DENT-DXB-001',
        consultationFee: 150,
        yearsExperience: 10,
        languages: ['en'],
        address: 'Dubai Healthcare City',
        certifications: ['DDS', 'Cosmetic Dentistry'],
        education: ['Dental School', 'Cosmetic Dentistry Course'],
      },
    });
    console.log('   ✅ Created 1 dentist\n');
  } catch (e: any) {
    console.log('   ⚠️  Dentist already exists or error:', e.message.split('\n')[0]);
  }

  // 6. Create Lawyers
  console.log('⚖️  Creating Lawyers...');
  try {
    await prisma.lawyer.create({
      data: {
        userId: users[5].id,
        firstName: 'Mohammed',
        lastName: 'Al Hashimi',
        email: 'mohammed.lawyer@test.com',
        phone: '+971504567890',
        cityId: dubai.id,
        countryId: uae.id,
        specialty: 'CORPORATE_LAW',
        barNumber: 'LAW-DXB-001',
        hourlyRate: 300,
        yearsExperience: 18,
        languages: ['en', 'ar'],
        address: 'DIFC, Dubai',
        certifications: ['LLB', 'Corporate Law Specialist'],
        education: ['Law School', 'LLM Corporate Law'],
        specializations: ['CORPORATE_LAW', 'COMMERCIAL_LAW'],
      },
    });
    console.log('   ✅ Created 1 lawyer\n');
  } catch (e: any) {
    console.log('   ⚠️  Lawyer already exists or error:', e.message.split('\n')[0]);
  }

  // 7. Create Vehicles
  console.log('🚗 Creating Vehicles...');
  try {
    await prisma.vehicle.create({
      data: {
        ownerId: users[6].id,
        name: 'Toyota Camry 2023',
        description: 'Comfortable sedan for daily use',
        vehicleType: 'CAR',
        brand: 'Toyota',
        model: 'Camry',
        year: 2023,
        cityId: dubai.id,
        countryId: uae.id,
        pricePerDay: 150,
        pricePerWeek: 900,
        pricePerMonth: 3000,
        isAvailable: true,
        images: [],
        features: ['AC', 'GPS', 'Bluetooth', 'Backup Camera'],
      },
    });

    await prisma.vehicle.create({
      data: {
        ownerId: users[7].id,
        name: 'Honda CBR500R',
        description: 'Sport motorcycle for enthusiasts',
        vehicleType: 'MOTORBIKE',
        brand: 'Honda',
        model: 'CBR500R',
        year: 2023,
        cityId: dubai.id,
        countryId: uae.id,
        pricePerDay: 80,
        pricePerWeek: 500,
        pricePerMonth: 1800,
        isAvailable: true,
        images: [],
        features: ['ABS', 'Sport Mode', 'LED Lights'],
      },
    });

    await prisma.vehicle.create({
      data: {
        ownerId: users[8].id,
        name: 'Vespa Primavera 150',
        description: 'Classic Italian scooter',
        vehicleType: 'SCOOTER',
        brand: 'Vespa',
        model: 'Primavera',
        year: 2023,
        cityId: bangkok.id,
        countryId: thailand.id,
        pricePerDay: 30,
        pricePerWeek: 180,
        pricePerMonth: 600,
        isAvailable: true,
        images: [],
        features: ['Automatic', 'Storage', 'USB Charger'],
      },
    });

    await prisma.vehicle.create({
      data: {
        ownerId: users[9].id,
        name: 'Trek FX 3 Bicycle',
        description: 'Hybrid bicycle for city riding',
        vehicleType: 'BICYCLE',
        brand: 'Trek',
        model: 'FX 3',
        year: 2023,
        cityId: bangkok.id,
        countryId: thailand.id,
        pricePerDay: 20,
        pricePerWeek: 100,
        pricePerMonth: 300,
        isAvailable: true,
        images: [],
        features: ['21 Speed', 'Lightweight', 'Disc Brakes'],
      },
    });
    console.log('   ✅ Created 4 vehicles\n');
  } catch (e: any) {
    console.log('   ⚠️  Vehicles already exist or error:', e.message.split('\n')[0]);
  }

  // Summary
  const coachCount = await prisma.coach.count();
  const doctorCount = await prisma.doctor.count();
  const dentistCount = await prisma.dentist.count();
  const lawyerCount = await prisma.lawyer.count();
  const vehicleCount = await prisma.vehicle.count();

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ SEED COMPLETED SUCCESSFULLY!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Database Summary:
  • ${coachCount} Coaches
  • ${doctorCount} Doctors
  • ${dentistCount} Dentists
  • ${lawyerCount} Lawyers
  • ${vehicleCount} Vehicles
  • ${cityCount} Cities
  • ${countryCount} Countries
  ━━━━━━━━━━━━━━━━━━━━━━━━
  Total Profiles: ${coachCount + doctorCount + dentistCount + lawyerCount + vehicleCount}

�� Test APIs:
  curl http://localhost:3000/api/coaches | jq '.coaches | length'
  curl http://localhost:3000/api/doctors | jq '.doctors | length'
  curl http://localhost:3000/api/dentists | jq '.dentists | length'
  curl http://localhost:3000/api/lawyers | jq '.lawyers | length'
  curl http://localhost:3000/api/vehicles | jq '.vehicles | length'

🌐 Frontend:
  http://localhost:3000/en
  http://localhost:3000/ar
  http://localhost:3000/fr
  http://localhost:3000/es
  http://localhost:3000/de
  http://localhost:3000/ru
  http://localhost:3000/th
  http://localhost:3000/vi
  http://localhost:3000/ko
  `);
}

main()
  .catch((e) => {
    console.error('\n❌ Seed failed:', e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
