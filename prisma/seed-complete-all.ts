#!/usr/bin/env tsx

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding ALL data...\n');

  // Get countries and cities
  const countries = await prisma.country.findMany();
  const cities = await prisma.city.findMany();

  if (countries.length === 0 || cities.length === 0) {
    console.log('❌ No geography data. Run: npx tsx prisma/seed-geography-complete.ts');
    return;
  }

  const uae = countries.find(c => c.code === 'AE') || countries[0];
  const philippines = countries.find(c => c.code === 'PH') || countries[1];
  const thailand = countries.find(c => c.code === 'TH') || countries[2];

  const dubai = cities.find(c => c.name === 'Dubai') || cities[0];
  const abuDhabi = cities.find(c => c.name === 'Abu Dhabi') || cities[1];
  const manila = cities.find(c => c.name === 'Manila') || cities[2];
  const bangkok = cities.find(c => c.name === 'Bangkok') || cities[3];

  console.log(`📍 Using: ${dubai.name}, ${manila.name}, ${bangkok.name}\n`);

  // Create users
  console.log('👥 Creating users...');
  const users = [];
  for (let i = 1; i <= 30; i++) {
    const user = await prisma.user.upsert({
      where: { email: `user${i}@test.com` },
      update: {},
      create: {
        email: `user${i}@test.com`,
        name: `User ${i}`,
        role: i <= 5 ? 'ADMIN' : i <= 15 ? 'PROVIDER' : 'CUSTOMER',
      },
    });
    users.push(user);
  }
  console.log(`   ✅ ${users.length} users\n`);

  // 1. VEHICLES & RENTALS
  console.log('🚗 Creating Vehicles...');
  const vehicles = [];
  
  const vehicleData = [
    { name: 'Toyota Camry 2024', type: 'CAR', make: 'Toyota', model: 'Camry', year: 2024, city: dubai, country: uae, priceDay: 150, priceWeek: 900, priceMonth: 3000 },
    { name: 'Honda Civic 2024', type: 'CAR', make: 'Honda', model: 'Civic', year: 2024, city: dubai, country: uae, priceDay: 140, priceWeek: 850, priceMonth: 2800 },
    { name: 'BMW 5 Series 2024', type: 'CAR', make: 'BMW', model: '5 Series', year: 2024, city: dubai, country: uae, priceDay: 300, priceWeek: 1800, priceMonth: 6000 },
    { name: 'Mercedes E-Class 2024', type: 'CAR', make: 'Mercedes', model: 'E-Class', year: 2024, city: abuDhabi, country: uae, priceDay: 320, priceWeek: 1900, priceMonth: 6500 },
    { name: 'Honda CBR500R', type: 'MOTORCYCLE', make: 'Honda', model: 'CBR500R', year: 2024, city: dubai, country: uae, priceDay: 80, priceWeek: 500, priceMonth: 1800 },
    { name: 'Yamaha MT-07', type: 'MOTORCYCLE', make: 'Yamaha', model: 'MT-07', year: 2024, city: dubai, country: uae, priceDay: 90, priceWeek: 550, priceMonth: 2000 },
    { name: 'Vespa Primavera 150', type: 'SCOOTER', make: 'Vespa', model: 'Primavera', year: 2024, city: bangkok, country: thailand, priceDay: 30, priceWeek: 180, priceMonth: 600 },
    { name: 'Honda PCX 160', type: 'SCOOTER', make: 'Honda', model: 'PCX', year: 2024, city: bangkok, country: thailand, priceDay: 35, priceWeek: 200, priceMonth: 650 },
    { name: 'Trek FX 3 Bicycle', type: 'BICYCLE', make: 'Trek', model: 'FX 3', year: 2024, city: bangkok, country: thailand, priceDay: 20, priceWeek: 100, priceMonth: 300 },
    { name: 'Giant Escape 3', type: 'BICYCLE', make: 'Giant', model: 'Escape 3', year: 2024, city: manila, country: philippines, priceDay: 18, priceWeek: 90, priceMonth: 280 },
  ];

  for (const v of vehicleData) {
    try {
      const vehicle = await prisma.vehicle.create({
        data: {
          ownerId: users[Math.floor(Math.random() * 10)].id,
          name: v.name,
          description: `${v.make} ${v.model} ${v.year} - Well maintained and ready to rent`,
          vehicleType: v.type as any,
          brand: v.make,
          model: v.model,
          year: v.year,
          cityId: v.city.id,
          countryId: v.country.id,
          pricePerDay: v.priceDay,
          pricePerWeek: v.priceWeek,
          pricePerMonth: v.priceMonth,
          isAvailable: true,
          images: [],
          features: ['AC', 'GPS', 'Bluetooth'],
        },
      });
      vehicles.push(vehicle);
    } catch (e: any) {
      console.log(`   ❌ ${v.name}:`, e.message);
    }
  }
  console.log(`   ✅ ${vehicles.length} vehicles\n`);

  // 2. TRANSFERS
  console.log('🚐 Creating Transfers...');
  const transfers = [];
  
  const transferData = [
    { name: 'Airport Transfer - Dubai', from: 'Dubai Airport', to: 'Dubai Marina', city: dubai, country: uae, price: 100, type: 'AIRPORT' },
    { name: 'Airport Transfer - Abu Dhabi', from: 'Abu Dhabi Airport', to: 'Corniche', city: abuDhabi, country: uae, price: 120, type: 'AIRPORT' },
    { name: 'City Transfer - Dubai', from: 'Dubai Mall', to: 'Burj Khalifa', city: dubai, country: uae, price: 50, type: 'CITY' },
    { name: 'Airport Transfer - Bangkok', from: 'Suvarnabhumi Airport', to: 'Sukhumvit', city: bangkok, country: thailand, price: 800, type: 'AIRPORT' },
    { name: 'Airport Transfer - Manila', from: 'NAIA Terminal 3', to: 'Makati', city: manila, country: philippines, price: 1500, type: 'AIRPORT' },
    { name: 'Intercity Transfer - UAE', from: 'Dubai', to: 'Abu Dhabi', city: dubai, country: uae, price: 200, type: 'INTERCITY' },
  ];

  for (const t of transferData) {
    try {
      const transfer = await prisma.transfer.create({
        data: {
          name: t.name,
          description: `Professional transfer service from ${t.from} to ${t.to}`,
          transferType: t.type as any,
          fromLocation: t.from,
          toLocation: t.to,
          countryId: t.country.id,
          price: t.price,
          vehicleType: 'Sedan',
          maxPassengers: 4,
          providerId: users[0].id,
          isAvailable: true,
          images: [],
          features: ['AC', 'WiFi', 'Water'],
        },
      });
      transfers.push(transfer);
    } catch (e: any) {
      console.log(`   ❌ ${t.name}:`, e.message);
    }
  }
  console.log(`   ✅ ${transfers.length} transfers\n`);

  // 3. REAL ESTATE AGENTS
  console.log('🏠 Creating Real Estate Agents...');
  const agents = [];
  
  const agentData = [
    { name: 'Ahmed Al Maktoum', city: dubai, country: uae, specialty: 'RESIDENTIAL', license: 'DXB-RE-001', commission: 2.0 },
    { name: 'Sarah Johnson', city: dubai, country: uae, specialty: 'LUXURY', license: 'DXB-RE-002', commission: 2.5 },
    { name: 'Mohammed Hassan', city: abuDhabi, country: uae, specialty: 'COMMERCIAL', license: 'AUH-RE-001', commission: 3.0 },
    { name: 'Maria Santos', city: manila, country: philippines, specialty: 'RESIDENTIAL', license: 'MNL-RE-001', commission: 2.0 },
    { name: 'Somchai Pattana', city: bangkok, country: thailand, specialty: 'INVESTMENT', license: 'BKK-RE-001', commission: 2.5 },
  ];

  for (const a of agentData) {
    try {
      const agent = await prisma.realEstateAgent.create({
        data: {
          userId: users[Math.floor(Math.random() * 5)].id,
          firstName: a.name.split(' ')[0],
          lastName: a.name.split(' ').slice(1).join(' '),
          cityId: a.city.id,
          specialties: [a.specialty as any],
          licenseNumber: a.license,
          bio: `Experienced real estate agent specializing in ${a.specialty.toLowerCase()} properties`,
          salesCommission: a.commission,
          yearsExperience: Math.floor(Math.random() * 15) + 5,
          languages: ['en', 'ar'],
          countries: [a.country.code],
          certifications: ['Licensed Real Estate Agent'],
          certificateFiles: [],
        },
      });
      agents.push(agent);
    } catch (e: any) {
      console.log(`   ❌ ${a.name}:`, e.message);
    }
  }
  console.log(`   ✅ ${agents.length} real estate agents\n`);

  // 4. ACCOUNTANTS
  console.log('💼 Creating Accountants...');
  const accountants = [];
  
  const accountantData = [
    { name: 'John Smith CPA', city: dubai, country: uae, specialty: 'TAX', license: 'CPA-001' },
    { name: 'Lisa Chen', city: dubai, country: uae, specialty: 'AUDIT', license: 'CPA-002' },
    { name: 'Carlos Rodriguez', city: manila, country: philippines, specialty: 'BOOKKEEPING', license: 'CPA-MNL-001' },
  ];

  for (const acc of accountantData) {
    try {
      const accountant = await prisma.accountant.create({
        data: {
          userId: users[Math.floor(Math.random() * 5) + 5].id,
          firstName: acc.name.split(' ')[0],
          lastName: acc.name.split(' ').slice(1).join(' '),
          cityId: acc.city.id,
          specializations: [acc.specialty as any],
          licenseNumber: acc.license,
          bio: `Professional accountant with expertise in ${acc.specialty.toLowerCase()}`,
          hourlyRate: 150,
          yearsExperience: 10,
          languages: ['en'],
          countries: [acc.country.code],
          certifications: ['CPA'],
          certificateFiles: [],
        },
      });
      accountants.push(accountant);
    } catch (e: any) {
      console.log(`   ❌ ${acc.name}:`, e.message);
    }
  }
  console.log(`   ✅ ${accountants.length} accountants\n`);

  // Summary
  const vehicleCount = await prisma.vehicle.count();
  const transferCount = await prisma.transfer.count();
  const agentCount = await prisma.realEstateAgent.count();
  const accountantCount = await prisma.accountant.count();
  const coachCount = await prisma.coach.count();
  const doctorCount = await prisma.doctor.count();
  const dentistCount = await prisma.dentist.count();
  const lawyerCount = await prisma.lawyer.count();

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ COMPLETE SEED FINISHED!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Database Summary:
  🚗 ${vehicleCount} Vehicles (Rentals)
  🚐 ${transferCount} Transfers
  🏠 ${agentCount} Real Estate Agents
  💼 ${accountantCount} Accountants
  💪 ${coachCount} Coaches
  👨‍⚕️ ${doctorCount} Doctors
  🦷 ${dentistCount} Dentists
  ⚖️  ${lawyerCount} Lawyers
  ━━━━━━━━━━━━━━━━━━━━━━━━
  Total: ${vehicleCount + transferCount + agentCount + accountantCount + coachCount + doctorCount + dentistCount + lawyerCount} Profiles

🌐 Test URLs:
  http://localhost:3000/api/vehicles
  http://localhost:3000/api/transfers (à créer)
  http://localhost:3000/api/real-estate-agents
  http://localhost:3000/api/accountants
  http://localhost:3000/api/coaches
  http://localhost:3000/api/doctors
  http://localhost:3000/api/dentists
  http://localhost:3000/api/lawyers

🎉 All data loaded successfully!
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
