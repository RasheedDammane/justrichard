import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Creating test data...');

  const cities = await prisma.city.findMany({ take: 10 });
  const countries = await prisma.country.findMany({ take: 5 });

  if (cities.length === 0) {
    console.error('❌ No cities found');
    return;
  }

  const dubai = cities[0];
  const bangkok = cities.length > 5 ? cities[5] : cities[1];

  // Create users
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

  console.log(`✅ ${users.length} users`);

  // Coaches
  console.log('💪 Coaches...');
  await prisma.coach.create({
    data: {
      userId: users[0].id,
      firstName: 'John',
      lastName: 'Fitness',
      email: 'john.coach@test.com',
      phone: '+971501234567',
      cityId: dubai.id,
      bio: 'Professional fitness coach',
      oneOnOneRate: 100,
      yearsExperience: 5,
      languages: ['en', 'ar'],
      coachingTypes: ['ONE_ON_ONE'],
      specializations: ['FITNESS'],
      certifications: ['NASM-CPT'],
      certificateFiles: [],
      education: ['Sports Science'],
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
      bio: 'Yoga expert',
      oneOnOneRate: 80,
      yearsExperience: 8,
      languages: ['en', 'th'],
      coachingTypes: ['ONE_ON_ONE'],
      specializations: ['YOGA'],
      certifications: ['RYT-500'],
      certificateFiles: [],
      education: ['Yoga Training'],
      countries: ['TH'],
    },
  });

  // Doctors
  console.log('👨‍⚕️ Doctors...');
  await prisma.doctor.create({
    data: {
      userId: users[2].id,
      firstName: 'Dr. Ahmed',
      lastName: 'Hassan',
      email: 'ahmed.doctor@test.com',
      phone: '+971502345678',
      cityId: dubai.id,
      countryId: countries[0].id,
      specialty: 'GENERAL_PRACTICE',
      licenseNumber: 'DOC-001',
      bio: 'General practitioner',
      consultationFee: 200,
      yearsExperience: 15,
      languages: ['en', 'ar'],
      countries: ['AE'],
      certifications: ['MD'],
      education: ['Medical School'],
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
      countryId: countries[3].id,
      specialty: 'CARDIOLOGY',
      licenseNumber: 'DOC-002',
      bio: 'Cardiologist',
      consultationFee: 180,
      yearsExperience: 20,
      languages: ['en', 'th'],
      countries: ['TH'],
      certifications: ['MD'],
      education: ['Medical School'],
    },
  });

  // Dentists
  console.log('🦷 Dentists...');
  await prisma.dentist.create({
    data: {
      userId: users[4].id,
      firstName: 'Dr. Maria',
      lastName: 'Smith',
      email: 'maria.dentist@test.com',
      phone: '+971503456789',
      cityId: dubai.id,
      countryId: countries[0].id,
      specialty: 'COSMETIC_DENTISTRY',
      licenseNumber: 'DENT-001',
      bio: 'Cosmetic dentist',
      consultationFee: 150,
      yearsExperience: 10,
      languages: ['en'],
      address: 'Dubai',
      countries: ['AE'],
      certifications: ['DDS'],
      education: ['Dental School'],
    },
  });

  // Lawyers
  console.log('⚖️ Lawyers...');
  await prisma.lawyer.create({
    data: {
      userId: users[5].id,
      firstName: 'Mohammed',
      lastName: 'Al Hashimi',
      email: 'mohammed.lawyer@test.com',
      phone: '+971504567890',
      cityId: dubai.id,
      countryId: countries[0].id,
      specialty: 'CORPORATE_LAW',
      barNumber: 'LAW-001',
      bio: 'Corporate lawyer',
      hourlyRate: 300,
      yearsExperience: 18,
      languages: ['en', 'ar'],
      address: 'Dubai',
      countries: ['AE'],
      certifications: ['LLB'],
      education: ['Law School'],
      specializations: ['CORPORATE_LAW'],
    },
  });

  // Vehicles
  console.log('🚗 Vehicles...');
  await prisma.vehicle.create({
    data: {
      ownerId: users[6].id,
      name: 'Toyota Camry 2023',
      description: 'Sedan',
      vehicleType: 'CAR',
      make: 'Toyota',
      model: 'Camry',
      year: 2023,
      cityId: dubai.id,
      countryId: countries[0].id,
      pricePerDay: 150,
      pricePerWeek: 900,
      pricePerMonth: 3000,
      available: true,
      images: [],
      features: ['AC', 'GPS'],
    },
  });

  await prisma.vehicle.create({
    data: {
      ownerId: users[7].id,
      name: 'Honda CBR500R',
      description: 'Motorcycle',
      vehicleType: 'MOTORCYCLE',
      make: 'Honda',
      model: 'CBR500R',
      year: 2023,
      cityId: dubai.id,
      countryId: countries[0].id,
      pricePerDay: 80,
      pricePerWeek: 500,
      pricePerMonth: 1800,
      available: true,
      images: [],
      features: ['ABS'],
    },
  });

  await prisma.vehicle.create({
    data: {
      ownerId: users[8].id,
      name: 'Vespa Primavera',
      description: 'Scooter',
      vehicleType: 'SCOOTER',
      make: 'Vespa',
      model: 'Primavera',
      year: 2023,
      cityId: bangkok.id,
      countryId: countries[3].id,
      pricePerDay: 30,
      pricePerWeek: 180,
      pricePerMonth: 600,
      available: true,
      images: [],
      features: ['Automatic'],
    },
  });

  await prisma.vehicle.create({
    data: {
      ownerId: users[9].id,
      name: 'Trek FX 3',
      description: 'Bicycle',
      vehicleType: 'BICYCLE',
      make: 'Trek',
      model: 'FX 3',
      year: 2023,
      cityId: bangkok.id,
      countryId: countries[3].id,
      pricePerDay: 20,
      pricePerWeek: 100,
      pricePerMonth: 300,
      available: true,
      images: [],
      features: ['21 Speed'],
    },
  });

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ TEST DATA CREATED!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Created 10 profiles:
  • 2 Coaches
  • 2 Doctors  
  • 1 Dentist
  • 1 Lawyer
  • 4 Vehicles

🧪 Test:
  curl http://localhost:3000/api/coaches | jq
  curl http://localhost:3000/api/doctors | jq
  curl http://localhost:3000/api/vehicles | jq
  `);
}

main()
  .catch((e) => {
    console.error('❌', e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
