#!/usr/bin/env tsx

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding REAL data (Google Maps style)...\n');

  const countries = await prisma.country.findMany();
  const cities = await prisma.city.findMany();
  const users = await prisma.user.findMany();

  if (countries.length === 0 || cities.length === 0) {
    console.log('❌ No geography data.');
    return;
  }

  const uae = countries.find(c => c.code === 'AE') || countries[0];
  const philippines = countries.find(c => c.code === 'PH') || countries[1];
  const thailand = countries.find(c => c.code === 'TH') || countries[2];

  const dubai = cities.find(c => c.name === 'Dubai') || cities[0];
  const abuDhabi = cities.find(c => c.name === 'Abu Dhabi') || cities[1];
  const manila = cities.find(c => c.name === 'Manila') || cities[2];
  const bangkok = cities.find(c => c.name === 'Bangkok') || cities[3];

  // 1. TRANSFERS (Corrected enums)
  console.log('🚐 Creating Transfers...');
  const transfersData = [
    { name: 'Dubai Airport to Marina', from: 'Dubai International Airport (DXB)', to: 'Dubai Marina', type: 'AIRPORT_PICKUP', city: dubai, country: uae, price: 120 },
    { name: 'Abu Dhabi Airport Pickup', from: 'Abu Dhabi International Airport', to: 'Corniche Area', type: 'AIRPORT_PICKUP', city: abuDhabi, country: uae, price: 150 },
    { name: 'Dubai to Abu Dhabi Transfer', from: 'Dubai', to: 'Abu Dhabi', type: 'CITY_TO_CITY', city: dubai, country: uae, price: 250 },
    { name: 'Bangkok Airport to Sukhumvit', from: 'Suvarnabhumi Airport (BKK)', to: 'Sukhumvit Road', type: 'AIRPORT_PICKUP', city: bangkok, country: thailand, price: 800 },
    { name: 'Manila Airport to Makati', from: 'NAIA Terminal 3', to: 'Makati CBD', type: 'AIRPORT_PICKUP', city: manila, country: philippines, price: 1500 },
    { name: 'Dubai Hourly Transfer', from: 'Dubai', to: 'Various', type: 'HOURLY', city: dubai, country: uae, price: 80 },
  ];

  let transferCount = 0;
  for (const t of transfersData) {
    try {
      await prisma.transfer.create({
        data: {
          name: t.name,
          description: `Professional transfer service from ${t.from} to ${t.to}. Comfortable vehicle with AC, WiFi, and bottled water.`,
          transferType: t.type,
          fromLocation: t.from,
          toLocation: t.to,
          countryId: t.country.id,
          price: t.price,
          vehicleType: 'Sedan',
          maxPassengers: 4,
          providerId: users[0]?.id || 'default-user-id',
          isAvailable: true,
          images: [],
          features: ['AC', 'WiFi', 'Water', 'Phone Charger'],
        },
      });
      transferCount++;
    } catch (e: any) {
      console.log(`   ⚠️  ${t.name}:`, e.message.split('\n')[0]);
    }
  }
  console.log(`   ✅ ${transferCount} transfers\n`);

  // 2. DOCTORS (Real data style)
  console.log('👨‍⚕️ Creating Doctors (Real data)...');
  const doctorsData = [
    { name: 'Dr. Ahmed Al Hashimi', specialty: 'GENERAL_PRACTICE', city: dubai, country: uae, clinic: 'Dubai Healthcare City', license: 'DHA-12345', fee: 300, exp: 15 },
    { name: 'Dr. Sarah Johnson', specialty: 'PEDIATRICS', city: dubai, country: uae, clinic: 'Mediclinic City Hospital', license: 'DHA-23456', fee: 350, exp: 12 },
    { name: 'Dr. Mohammed Hassan', specialty: 'CARDIOLOGY', city: dubai, country: uae, clinic: 'American Hospital Dubai', license: 'DHA-34567', fee: 500, exp: 20 },
    { name: 'Dr. Fatima Al Mansoori', specialty: 'DERMATOLOGY', city: abuDhabi, country: uae, clinic: 'Cleveland Clinic Abu Dhabi', license: 'HAAD-45678', fee: 400, exp: 10 },
    { name: 'Dr. John Smith', specialty: 'ORTHOPEDICS', city: dubai, country: uae, clinic: 'Burjeel Hospital', license: 'DHA-56789', fee: 450, exp: 18 },
    { name: 'Dr. Somchai Pattana', specialty: 'GENERAL_PRACTICE', city: bangkok, country: thailand, clinic: 'Bumrungrad Hospital', license: 'TMC-67890', fee: 2000, exp: 15 },
    { name: 'Dr. Niran Sukhumvit', specialty: 'CARDIOLOGY', city: bangkok, country: thailand, clinic: 'Bangkok Hospital', license: 'TMC-78901', fee: 3000, exp: 22 },
    { name: 'Dr. Maria Santos', specialty: 'PEDIATRICS', city: manila, country: philippines, clinic: 'Makati Medical Center', license: 'PRC-89012', fee: 2500, exp: 14 },
    { name: 'Dr. Carlos Reyes', specialty: 'GENERAL_PRACTICE', city: manila, country: philippines, clinic: 'St. Lukes Medical Center', license: 'PRC-90123', fee: 2000, exp: 16 },
    { name: 'Dr. Lisa Chen', specialty: 'DERMATOLOGY', city: dubai, country: uae, clinic: 'Derma One Clinic', license: 'DHA-01234', fee: 380, exp: 11 },
  ];

  let doctorCount = 0;
  for (const d of doctorsData) {
    try {
      const user = await prisma.user.create({
        data: {
          email: `${d.name.toLowerCase().replace(/\s+/g, '.')}@doctor.com`,
          name: d.name,
          role: 'PROVIDER',
        },
      });

      await prisma.doctor.create({
        data: {
          userId: user.id,
          firstName: d.name.split(' ')[1],
          lastName: d.name.split(' ').slice(2).join(' '),
          cityId: d.city.id,
          countryId: d.country.id,
          specialty: d.specialty,
          licenseNumber: d.license,
          bio: `${d.specialty.replace('_', ' ')} specialist at ${d.clinic} with ${d.exp} years of experience. Providing quality healthcare services.`,
          consultationFee: d.fee,
          yearsExperience: d.exp,
          languages: ['en', d.country.code === 'AE' ? 'ar' : d.country.code === 'TH' ? 'th' : 'tl'],
          address: d.clinic,
          countries: [d.country.code],
          certifications: ['MD', 'Board Certified'],
          education: ['Medical School', `${d.specialty} Residency`],
        },
      });
      doctorCount++;
    } catch (e: any) {
      console.log(`   ⚠️  ${d.name}:`, e.message.split('\n')[0]);
    }
  }
  console.log(`   ✅ ${doctorCount} doctors\n`);

  // 3. DENTISTS (Real data style)
  console.log('🦷 Creating Dentists (Real data)...');
  const dentistsData = [
    { name: 'Dr. Khalid Al Zarooni', specialty: 'GENERAL_DENTISTRY', city: dubai, country: uae, clinic: 'Dubai Smile Dental Clinic', license: 'DHA-D1234', fee: 250, exp: 12 },
    { name: 'Dr. Emma Wilson', specialty: 'COSMETIC_DENTISTRY', city: dubai, country: uae, clinic: 'Perfect Smile Dental Center', license: 'DHA-D2345', fee: 400, exp: 15 },
    { name: 'Dr. Ravi Kumar', specialty: 'ORTHODONTICS', city: dubai, country: uae, clinic: 'Orthodontic Clinic Dubai', license: 'DHA-D3456', fee: 350, exp: 10 },
    { name: 'Dr. Layla Mohammed', specialty: 'PEDIATRIC_DENTISTRY', city: abuDhabi, country: uae, clinic: 'Kids Dental Care', license: 'HAAD-D4567', fee: 300, exp: 8 },
    { name: 'Dr. James Brown', specialty: 'ORAL_SURGERY', city: dubai, country: uae, clinic: 'Dubai Dental Hospital', license: 'DHA-D5678', fee: 500, exp: 18 },
    { name: 'Dr. Apinya Bangkok', specialty: 'COSMETIC_DENTISTRY', city: bangkok, country: thailand, clinic: 'Bangkok Dental Spa', license: 'TMC-D6789', fee: 3500, exp: 14 },
    { name: 'Dr. Thana Smile', specialty: 'GENERAL_DENTISTRY', city: bangkok, country: thailand, clinic: 'Thonglor Dental Clinic', license: 'TMC-D7890', fee: 2500, exp: 12 },
    { name: 'Dr. Ana Cruz', specialty: 'ORTHODONTICS', city: manila, country: philippines, clinic: 'Manila Orthodontic Center', license: 'PRC-D8901', fee: 3000, exp: 11 },
    { name: 'Dr. Pedro Garcia', specialty: 'GENERAL_DENTISTRY', city: manila, country: philippines, clinic: 'Makati Dental Clinic', license: 'PRC-D9012', fee: 2000, exp: 13 },
    { name: 'Dr. Sophie Martin', specialty: 'COSMETIC_DENTISTRY', city: dubai, country: uae, clinic: 'Elite Dental Studio', license: 'DHA-D0123', fee: 450, exp: 16 },
  ];

  let dentistCount = 0;
  for (const d of dentistsData) {
    try {
      const user = await prisma.user.create({
        data: {
          email: `${d.name.toLowerCase().replace(/\s+/g, '.')}@dentist.com`,
          name: d.name,
          role: 'PROVIDER',
        },
      });

      await prisma.dentist.create({
        data: {
          userId: user.id,
          firstName: d.name.split(' ')[1],
          lastName: d.name.split(' ').slice(2).join(' '),
          cityId: d.city.id,
          countryId: d.country.id,
          specialty: d.specialty,
          licenseNumber: d.license,
          bio: `${d.specialty.replace('_', ' ')} specialist at ${d.clinic} with ${d.exp} years of experience. Advanced dental care with latest technology.`,
          consultationFee: d.fee,
          yearsExperience: d.exp,
          languages: ['en'],
          address: d.clinic,
          countries: [d.country.code],
          certifications: ['DDS', 'Board Certified'],
          education: ['Dental School', `${d.specialty} Specialization`],
        },
      });
      dentistCount++;
    } catch (e: any) {
      console.log(`   ⚠️  ${d.name}:`, e.message.split('\n')[0]);
    }
  }
  console.log(`   ✅ ${dentistCount} dentists\n`);

  // 4. LAWYERS (Real data style)
  console.log('⚖️  Creating Lawyers (Real data)...');
  const lawyersData = [
    { name: 'Mohammed Al Hashimi', specialty: 'CORPORATE_LAW', city: dubai, country: uae, firm: 'Al Hashimi Legal Consultants', license: 'DLC-1234', rate: 500, exp: 20 },
    { name: 'Sarah Williams', specialty: 'FAMILY_LAW', city: dubai, country: uae, firm: 'Williams & Associates', license: 'DLC-2345', rate: 400, exp: 15 },
    { name: 'Ahmed Khalifa', specialty: 'REAL_ESTATE_LAW', city: dubai, country: uae, firm: 'Khalifa Law Firm', license: 'DLC-3456', rate: 450, exp: 18 },
    { name: 'Fatima Al Mansoori', specialty: 'LABOR_LAW', city: abuDhabi, country: uae, firm: 'Al Mansoori Legal', license: 'ADLC-4567', rate: 420, exp: 12 },
    { name: 'David Johnson', specialty: 'CRIMINAL_LAW', city: dubai, country: uae, firm: 'Johnson Legal Services', license: 'DLC-5678', rate: 550, exp: 22 },
    { name: 'Somchai Legal', specialty: 'CORPORATE_LAW', city: bangkok, country: thailand, firm: 'Bangkok Law Partners', license: 'TLC-6789', rate: 8000, exp: 16 },
    { name: 'Niran Sukhumvit', specialty: 'REAL_ESTATE_LAW', city: bangkok, country: thailand, firm: 'Sukhumvit Legal', license: 'TLC-7890', rate: 7000, exp: 14 },
    { name: 'Maria Santos', specialty: 'FAMILY_LAW', city: manila, country: philippines, firm: 'Santos Law Office', license: 'PLC-8901', rate: 5000, exp: 13 },
    { name: 'Carlos Reyes', specialty: 'CORPORATE_LAW', city: manila, country: philippines, firm: 'Reyes & Partners', license: 'PLC-9012', rate: 6000, exp: 17 },
    { name: 'Lisa Chen', specialty: 'INTELLECTUAL_PROPERTY', city: dubai, country: uae, firm: 'Chen IP Law', license: 'DLC-0123', rate: 480, exp: 11 },
  ];

  let lawyerCount = 0;
  for (const l of lawyersData) {
    try {
      const user = await prisma.user.create({
        data: {
          email: `${l.name.toLowerCase().replace(/\s+/g, '.')}@lawyer.com`,
          name: l.name,
          role: 'PROVIDER',
        },
      });

      await prisma.lawyer.create({
        data: {
          userId: user.id,
          firstName: l.name.split(' ')[0],
          lastName: l.name.split(' ').slice(1).join(' '),
          cityId: l.city.id,
          countryId: l.country.id,
          specialty: l.specialty,
          barNumber: l.license,
          bio: `${l.specialty.replace('_', ' ')} specialist at ${l.firm} with ${l.exp} years of experience. Providing expert legal services.`,
          hourlyRate: l.rate,
          yearsExperience: l.exp,
          languages: ['en', l.country.code === 'AE' ? 'ar' : 'en'],
          address: l.firm,
          countries: [l.country.code],
          certifications: ['LLB', 'Bar Association Member'],
          education: ['Law School', `${l.specialty} Specialization`],
          specializations: [l.specialty],
        },
      });
      lawyerCount++;
    } catch (e: any) {
      console.log(`   ⚠️  ${l.name}:`, e.message.split('\n')[0]);
    }
  }
  console.log(`   ✅ ${lawyerCount} lawyers\n`);

  // 5. BUILDINGS (Real data style)
  console.log('🏢 Creating Buildings...');
  const buildingsData = [
    { name: 'Burj Khalifa', city: dubai, country: uae, address: 'Downtown Dubai', type: 'RESIDENTIAL', units: 900, floors: 163, yearBuilt: 2010 },
    { name: 'Marina Heights', city: dubai, country: uae, address: 'Dubai Marina', type: 'RESIDENTIAL', units: 350, floors: 50, yearBuilt: 2015 },
    { name: 'Business Bay Tower', city: dubai, country: uae, address: 'Business Bay', type: 'COMMERCIAL', units: 200, floors: 40, yearBuilt: 2018 },
    { name: 'The Residences', city: abuDhabi, country: uae, address: 'Al Reem Island', type: 'RESIDENTIAL', units: 400, floors: 45, yearBuilt: 2016 },
    { name: 'Makati Square One', city: manila, country: philippines, address: 'Makati CBD', type: 'MIXED', units: 500, floors: 55, yearBuilt: 2019 },
    { name: 'Bangkok Sky Tower', city: bangkok, country: thailand, address: 'Sukhumvit', type: 'RESIDENTIAL', units: 600, floors: 60, yearBuilt: 2017 },
  ];

  let buildingCount = 0;
  for (const b of buildingsData) {
    try {
      await prisma.building.create({
        data: {
          name: b.name,
          nameAr: b.name,
          description: `${b.type} building in ${b.city.name} with ${b.units} units across ${b.floors} floors. Built in ${b.yearBuilt}.`,
          cityId: b.city.id,
          countryId: b.country.id,
          address: b.address,
          buildingType: b.type,
          totalUnits: b.units,
          totalFloors: b.floors,
          yearBuilt: b.yearBuilt,
          isActive: true,
          images: [],
          amenities: ['Gym', 'Pool', 'Parking', 'Security 24/7'],
        },
      });
      buildingCount++;
    } catch (e: any) {
      console.log(`   ⚠️  ${b.name}:`, e.message.split('\n')[0]);
    }
  }
  console.log(`   ✅ ${buildingCount} buildings\n`);

  // Summary
  const finalCounts = {
    transfers: await prisma.transfer.count(),
    doctors: await prisma.doctor.count(),
    dentists: await prisma.dentist.count(),
    lawyers: await prisma.lawyer.count(),
    buildings: await prisma.building.count(),
  };

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ REAL DATA SEED COMPLETED!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Database Summary:
  🚐 ${finalCounts.transfers} Transfers
  👨‍⚕️ ${finalCounts.doctors} Doctors
  🦷 ${finalCounts.dentists} Dentists
  ⚖️  ${finalCounts.lawyers} Lawyers
  🏢 ${finalCounts.buildings} Buildings
  ━━━━━━━━━━━━━━━━━━━━━━━━
  Total New: ${transferCount + doctorCount + dentistCount + lawyerCount + buildingCount}

🌐 Test URLs:
  http://localhost:3000/api/transfers
  http://localhost:3000/api/doctors
  http://localhost:3000/api/dentists
  http://localhost:3000/api/lawyers
  http://localhost:3000/api/buildings

🎉 Real data loaded successfully!
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
