#!/usr/bin/env tsx

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('⚕️ Seeding Doctors, Dentists & Lawyers (FIXED)...\n');

  const countries = await prisma.country.findMany();
  const cities = await prisma.city.findMany();

  const thailand = countries.find(c => c.code === 'TH');
  const uae = countries.find(c => c.code === 'AE');
  const philippines = countries.find(c => c.code === 'PH');

  const bangkok = cities.find(c => c.name === 'Bangkok');
  const pattaya = cities.find(c => c.name === 'Pattaya');
  const kohSamui = cities.find(c => c.name === 'Koh Samui');
  const dubai = cities.find(c => c.name === 'Dubai');
  const manila = cities.find(c => c.name === 'Manila');

  if (!thailand || !bangkok) {
    console.log('❌ Required cities not found');
    return;
  }

  // 1. DOCTORS (Real data style)
  console.log('👨‍⚕️ Creating Doctors...');
  const doctorsData = [
    { name: 'Dr. Ahmed Al Hashimi', specialty: 'GENERAL_PRACTITIONER', city: dubai, country: uae, clinic: 'Dubai Healthcare City', license: 'DHA-12345', fee: 300, phone: '+971501234567', email: 'ahmed.hashimi@clinic.ae' },
    { name: 'Dr. Sarah Johnson', specialty: 'PEDIATRICIAN', city: dubai, country: uae, clinic: 'Mediclinic City Hospital', license: 'DHA-23456', fee: 350, phone: '+971502345678', email: 'sarah.johnson@mediclinic.ae' },
    { name: 'Dr. Mohammed Hassan', specialty: 'CARDIOLOGIST', city: dubai, country: uae, clinic: 'American Hospital Dubai', license: 'DHA-34567', fee: 500, phone: '+971503456789', email: 'mohammed.hassan@ahdubai.com' },
    { name: 'Dr. Somchai Pattana', specialty: 'GENERAL_PRACTITIONER', city: bangkok, country: thailand, clinic: 'Bumrungrad Hospital', license: 'TMC-67890', fee: 2000, phone: '+66812345678', email: 'somchai@bumrungrad.com' },
    { name: 'Dr. Niran Sukhumvit', specialty: 'CARDIOLOGIST', city: bangkok, country: thailand, clinic: 'Bangkok Hospital', license: 'TMC-78901', fee: 3000, phone: '+66823456789', email: 'niran@bangkokhospital.com' },
    { name: 'Dr. Maria Santos', specialty: 'PEDIATRICIAN', city: manila, country: philippines, clinic: 'Makati Medical Center', license: 'PRC-89012', fee: 2500, phone: '+63912345678', email: 'maria.santos@makatimedical.com' },
  ];

  let doctorCount = 0;
  for (const d of doctorsData) {
    if (!d.city || !d.country) continue;
    try {
      await prisma.doctor.create({
        data: {
          firstName: d.name.split(' ')[1],
          lastName: d.name.split(' ').slice(2).join(' '),
          specialty: d.specialty as any,
          subSpecialties: [],
          licenseNumber: d.license,
          yearsExperience: 15,
          education: ['Medical School', 'Board Certified'],
          languages: ['en', d.country.code === 'AE' ? 'ar' : d.country.code === 'TH' ? 'th' : 'tl'],
          clinicName: d.clinic,
          countryId: d.country.id,
          cityId: d.city.id,
          address: d.clinic,
          phone: d.phone,
          email: d.email,
          isAvailable: true,
          acceptsEmergency: true,
          acceptsTelemedicine: true,
          acceptsHomeVisit: false,
          consultationFee: d.fee,
          currency: d.country.code === 'AE' ? 'AED' : d.country.code === 'TH' ? 'THB' : 'PHP',
          acceptsInsurance: true,
          insuranceProviders: ['International Insurance', 'Local Insurance'],
          verified: true,
        },
      });
      doctorCount++;
      console.log(`   ✅ ${d.name}`);
    } catch (e: any) {
      console.log(`   ❌ ${d.name}:`, e.message.split('\n')[0]);
    }
  }
  console.log(`   Total: ${doctorCount} doctors\n`);

  // 2. DENTISTS (Real data style)
  console.log('🦷 Creating Dentists...');
  const dentistsData = [
    { name: 'Dr. Khalid Al Zarooni', specialty: 'GENERAL_DENTIST', city: dubai, country: uae, clinic: 'Dubai Smile Dental Clinic', license: 'DHA-D1234', fee: 250, phone: '+971504567890', email: 'khalid@dubaismile.ae' },
    { name: 'Dr. Emma Wilson', specialty: 'COSMETIC_DENTIST', city: dubai, country: uae, clinic: 'Perfect Smile Dental Center', license: 'DHA-D2345', fee: 400, phone: '+971505678901', email: 'emma@perfectsmile.ae' },
    { name: 'Dr. Apinya Bangkok', specialty: 'COSMETIC_DENTIST', city: bangkok, country: thailand, clinic: 'Bangkok Dental Spa', license: 'TMC-D6789', fee: 3500, phone: '+66834567890', email: 'apinya@bangkokdental.com' },
    { name: 'Dr. Thana Smile', specialty: 'GENERAL_DENTIST', city: bangkok, country: thailand, clinic: 'Thonglor Dental Clinic', license: 'TMC-D7890', fee: 2500, phone: '+66845678901', email: 'thana@thonglordental.com' },
    { name: 'Dr. Ana Cruz', specialty: 'ORTHODONTIST', city: manila, country: philippines, clinic: 'Manila Orthodontic Center', license: 'PRC-D8901', fee: 3000, phone: '+63923456789', email: 'ana.cruz@manilaortho.com' },
  ];

  let dentistCount = 0;
  for (const d of dentistsData) {
    if (!d.city || !d.country) continue;
    try {
      await prisma.dentist.create({
        data: {
          firstName: d.name.split(' ')[1],
          lastName: d.name.split(' ').slice(2).join(' '),
          specialty: d.specialty as any,
          subSpecialties: [],
          licenseNumber: d.license,
          yearsExperience: 12,
          education: ['Dental School', 'Board Certified'],
          languages: ['en'],
          clinicName: d.clinic,
          countryId: d.country.id,
          cityId: d.city.id,
          address: d.clinic,
          phone: d.phone,
          email: d.email,
          isAvailable: true,
          acceptsEmergency: true,
          consultationFee: d.fee,
          currency: d.country.code === 'AE' ? 'AED' : d.country.code === 'TH' ? 'THB' : 'PHP',
          acceptsInsurance: true,
          insuranceProviders: ['International Insurance'],
          verified: true,
        },
      });
      dentistCount++;
      console.log(`   ✅ ${d.name}`);
    } catch (e: any) {
      console.log(`   ❌ ${d.name}:`, e.message.split('\n')[0]);
    }
  }
  console.log(`   Total: ${dentistCount} dentists\n`);

  // 3. LAWYERS (Real data from DFAT Thailand)
  console.log('⚖️ Creating Lawyers...');
  const lawyersData = [
    { name: 'Laurent Benoit', specialty: 'CORPORATE_LAW', city: bangkok, country: thailand, firm: 'Jus Laws and Consult', license: 'TH-BKK-001', phone: '+66814239627', email: 'bangkok@juslaws.com', address: 'Suite 901, One Pacific Place, 140 Sukhumvit Road' },
    { name: 'Khapmun Srinoikhao', specialty: 'CRIMINAL_LAW', city: bangkok, country: thailand, firm: 'Benjapol Law and Business', license: 'TH-BKK-002', phone: '+66818217510', email: 'kampun_s@yahoo.com', address: '225/4 Chang-akartutit Road' },
    { name: 'Luca Bernardinetti', specialty: 'CORPORATE_LAW', city: bangkok, country: thailand, firm: 'Mahanakorn Partners Group', license: 'TH-BKK-003', phone: '+6626515107', email: 'luca@mahanakornpartners.com', address: '9th floor, Kian Gwan House III, 152 Wireless Road' },
    { name: 'Kelvin Bamfield', specialty: 'CRIMINAL_LAW', city: pattaya, country: thailand, firm: 'Thai888 Law', license: 'TH-PTY-001', phone: '+66863760527', email: 'info@thai888.com', address: 'View Talay Condominium 5D, Thappraya Road' },
    { name: 'Joe Lynch', specialty: 'FAMILY_LAW', city: bangkok, country: thailand, firm: 'Lanna Lawyers', license: 'TH-CM-001', phone: '+66849047797', email: 'jlynch@lannalawyers.com', address: '298/15 Moo 5 Soi 28 Chottana Road' },
  ];

  let lawyerCount = 0;
  for (const l of lawyersData) {
    if (!l.city || !l.country) continue;
    try {
      await prisma.lawyer.create({
        data: {
          firstName: l.name.split(' ')[0],
          lastName: l.name.split(' ').slice(1).join(' '),
          specialty: l.specialty as any,
          subSpecialties: [],
          barNumber: l.license,
          yearsExperience: 15,
          education: ['Law School', 'Bar Association Member'],
          languages: ['en', 'th'],
          firmName: l.firm,
          countryId: l.country.id,
          cityId: l.city.id,
          address: l.address,
          phone: l.phone,
          email: l.email,
          isAvailable: true,
          acceptsEmergency: false,
          consultationFee: 3000,
          hourlyRate: 5000,
          currency: 'THB',
          courtAppearance: true,
          contractDrafting: true,
          legalAdvice: true,
          verified: true,
        },
      });
      lawyerCount++;
      console.log(`   ✅ ${l.name}`);
    } catch (e: any) {
      console.log(`   ❌ ${l.name}:`, e.message.split('\n')[0]);
    }
  }
  console.log(`   Total: ${lawyerCount} lawyers\n`);

  // Summary
  const finalCounts = {
    doctors: await prisma.doctor.count(),
    dentists: await prisma.dentist.count(),
    lawyers: await prisma.lawyer.count(),
  };

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ MEDICAL & LEGAL PROFESSIONALS SEED COMPLETED!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Database Summary:
  👨‍⚕️ ${finalCounts.doctors} Doctors
  🦷 ${finalCounts.dentists} Dentists
  ⚖️ ${finalCounts.lawyers} Lawyers
  ━━━━━━━━━━━━━━━━━━━━━━━━
  Total: ${finalCounts.doctors + finalCounts.dentists + finalCounts.lawyers} Professionals

🌐 Test:
  curl "http://localhost:3000/api/doctors" | jq
  curl "http://localhost:3000/api/dentists" | jq
  curl "http://localhost:3000/api/lawyers" | jq

🎉 All medical and legal professionals loaded!
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
