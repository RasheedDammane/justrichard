import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding partner profiles...');

  // Get cities
  const dubai = await prisma.city.findFirst({ where: { slug: 'dubai' } });
  const abuDhabi = await prisma.city.findFirst({ where: { slug: 'abu-dhabi' } });
  const bangkok = await prisma.city.findFirst({ where: { slug: 'bangkok' } });
  const paris = await prisma.city.findFirst({ where: { slug: 'paris' } });

  if (!dubai || !abuDhabi || !bangkok || !paris) {
    console.error('❌ Cities not found. Please run seed-geography.ts first');
    return;
  }

  // Create test users
  const users = [];
  for (let i = 1; i <= 50; i++) {
    const user = await prisma.user.upsert({
      where: { email: `partner${i}@communityhub.com` },
      update: {},
      create: {
        email: `partner${i}@communityhub.com`,
        name: `Partner ${i}`,
        role: 'PARTNER',
      },
    });
    users.push(user);
  }

  console.log(`✅ Created ${users.length} test users`);

  // 1. Real Estate Agents
  console.log('🏠 Creating Real Estate Agents...');
  const realEstateAgents = [
    {
      userId: users[0].id,
      firstName: 'Ahmed',
      lastName: 'Al Maktoum',
      email: 'ahmed.realestate@communityhub.com',
      phone: '+971501234567',
      cityId: dubai.id,
      licenseNumber: 'RE-DXB-12345',
      agency: 'Dubai Properties Elite',
      specialties: ['LUXURY_PROPERTIES', 'RESIDENTIAL_SALE'],
      languages: ['en', 'ar'],
      yearsExperience: 15,
      bio: 'Luxury property specialist in Dubai with 15 years of experience',
      salesCommission: 2.5,
      rentalCommission: 5,
      countries: ['AE'],
      verified: true,
      status: 'approved',
      rating: 4.8,
    },
    {
      userId: users[1].id,
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.realestate@communityhub.com',
      phone: '+971502345678',
      cityId: abuDhabi.id,
      licenseNumber: 'RE-AUH-23456',
      agency: 'Capital Real Estate',
      specialties: ['COMMERCIAL_SALE', 'INVESTMENT'],
      languages: ['en', 'fr'],
      yearsExperience: 10,
      bio: 'Commercial real estate expert in Abu Dhabi',
      salesCommission: 3,
      rentalCommission: 6,
      countries: ['AE'],
      verified: true,
      status: 'approved',
      rating: 4.6,
    },
    {
      userId: users[2].id,
      firstName: 'Pierre',
      lastName: 'Dubois',
      email: 'pierre.realestate@communityhub.com',
      phone: '+33612345678',
      cityId: paris.id,
      licenseNumber: 'RE-PAR-34567',
      agency: 'Paris Prestige Immobilier',
      specialties: ['LUXURY_PROPERTIES', 'RESIDENTIAL_RENT'],
      languages: ['fr', 'en'],
      yearsExperience: 12,
      bio: 'Spécialiste de l\'immobilier de luxe à Paris',
      salesCommission: 4,
      rentalCommission: 8,
      countries: ['FR'],
      verified: true,
      status: 'approved',
      rating: 4.9,
    },
  ];

  for (const agent of realEstateAgents) {
    await prisma.realEstateAgent.upsert({
      where: { email: agent.email },
      update: agent,
      create: agent,
    });
  }

  // 2. Accountants
  console.log('💼 Creating Accountants...');
  const accountants = [
    {
      userId: users[3].id,
      firstName: 'Marie',
      lastName: 'Dubois',
      email: 'marie.accountant@communityhub.com',
      phone: '+971503456789',
      cityId: dubai.id,
      firmName: 'Dubois & Associates',
      specializations: ['TAX_DECLARATION', 'AUDIT', 'TAX_CONSULTING'],
      certifications: ['CPA', 'CA'],
      languages: ['en', 'fr', 'ar'],
      yearsExperience: 12,
      hourlyRate: 150,
      monthlyRetainer: 2000,
      softwareUsed: ['QuickBooks', 'Xero', 'SAP'],
      acceptsNewClients: true,
      countries: ['AE', 'FR'],
      verified: true,
      status: 'approved',
      rating: 4.7,
    },
    {
      userId: users[4].id,
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.accountant@communityhub.com',
      phone: '+971504567890',
      cityId: abuDhabi.id,
      firmName: 'Smith Accounting Services',
      specializations: ['BOOKKEEPING', 'PAYROLL', 'VAT'],
      certifications: ['CPA'],
      languages: ['en'],
      yearsExperience: 8,
      hourlyRate: 120,
      monthlyRetainer: 1500,
      softwareUsed: ['QuickBooks', 'Xero'],
      acceptsNewClients: true,
      countries: ['AE'],
      verified: true,
      status: 'approved',
      rating: 4.5,
    },
  ];

  for (const accountant of accountants) {
    await prisma.accountant.upsert({
      where: { email: accountant.email },
      update: accountant,
      create: accountant,
    });
  }

  // 3. Translators
  console.log('🌐 Creating Translators...');
  const translators = [
    {
      userId: users[5].id,
      firstName: 'Fatima',
      lastName: 'Hassan',
      email: 'fatima.translator@communityhub.com',
      phone: '+971505678901',
      cityId: dubai.id,
      specializations: ['CERTIFIED', 'SWORN', 'MEDICAL'],
      languagePairs: [
        { from: 'en', to: 'ar', certified: true },
        { from: 'ar', to: 'en', certified: true },
        { from: 'fr', to: 'ar', certified: false },
      ],
      nativeLanguages: ['ar'],
      languages: ['en', 'ar', 'fr'],
      yearsExperience: 8,
      pricePerWord: 0.15,
      pricePerPage: 25,
      pricePerHour: 80,
      turnaroundDays: 3,
      offersCertified: true,
      offersSworn: true,
      offersUrgent: true,
      countries: ['AE', 'SA', 'QA'],
      verified: true,
      status: 'approved',
      rating: 4.9,
    },
    {
      userId: users[6].id,
      firstName: 'Somchai',
      lastName: 'Pattana',
      email: 'somchai.translator@communityhub.com',
      phone: '+66812345678',
      cityId: bangkok.id,
      specializations: ['TECHNICAL', 'BUSINESS', 'LEGAL'],
      languagePairs: [
        { from: 'en', to: 'th', certified: true },
        { from: 'th', to: 'en', certified: true },
      ],
      nativeLanguages: ['th'],
      languages: ['en', 'th'],
      yearsExperience: 10,
      pricePerWord: 0.12,
      pricePerPage: 20,
      pricePerHour: 60,
      turnaroundDays: 2,
      offersCertified: true,
      offersSworn: false,
      offersUrgent: true,
      countries: ['TH'],
      verified: true,
      status: 'approved',
      rating: 4.7,
    },
  ];

  for (const translator of translators) {
    await prisma.translator.upsert({
      where: { email: translator.email },
      update: translator,
      create: translator,
    });
  }

  // 4. Visa Agents
  console.log('🛂 Creating Visa Agents...');
  const visaAgents = [
    {
      userId: users[7].id,
      firstName: 'Khalid',
      lastName: 'Al Rashid',
      email: 'khalid.visa@communityhub.com',
      phone: '+971506789012',
      cityId: dubai.id,
      agency: 'UAE Visa Solutions',
      servicesOffered: ['GOLDEN_VISA', 'RESIDENCE_VISA', 'WORK_VISA', 'INVESTOR_VISA'],
      countries: ['AE'],
      languages: ['en', 'ar'],
      yearsExperience: 10,
      successRate: 98.5,
      avgProcessingTime: 14,
      consultationFee: 200,
      serviceFees: {
        GOLDEN_VISA: 5000,
        RESIDENCE_VISA: 1500,
        WORK_VISA: 2000,
      },
      verified: true,
      status: 'approved',
      rating: 4.8,
    },
    {
      userId: users[8].id,
      firstName: 'Nattapong',
      lastName: 'Srisuk',
      email: 'nattapong.visa@communityhub.com',
      phone: '+66823456789',
      cityId: bangkok.id,
      agency: 'Thailand Visa Center',
      servicesOffered: ['TOURIST_VISA', 'BUSINESS_VISA', 'RETIREMENT_VISA', 'WORK_PERMIT'],
      countries: ['TH'],
      languages: ['en', 'th'],
      yearsExperience: 8,
      successRate: 96,
      avgProcessingTime: 10,
      consultationFee: 100,
      serviceFees: {
        TOURIST_VISA: 300,
        BUSINESS_VISA: 800,
        WORK_PERMIT: 1200,
      },
      verified: true,
      status: 'approved',
      rating: 4.6,
    },
  ];

  for (const agent of visaAgents) {
    await prisma.visaAgent.upsert({
      where: { email: agent.email },
      update: agent,
      create: agent,
    });
  }

  // 5. Business Consultants
  console.log('🏢 Creating Business Consultants...');
  const businessConsultants = [
    {
      userId: users[9].id,
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.business@communityhub.com',
      phone: '+971507890123',
      cityId: dubai.id,
      firmName: 'Dubai Business Setup Experts',
      servicesOffered: ['LLC', 'FREE_ZONE_COMPANY', 'OFFSHORE_COMPANY'],
      industries: ['Technology', 'Real Estate', 'Trading', 'Consulting'],
      countries: ['AE'],
      languages: ['en', 'ar'],
      yearsExperience: 12,
      avgSetupTime: 21,
      consultationFee: 500,
      offersVisa: true,
      offersBankAccount: true,
      offersOffice: true,
      offersAccounting: true,
      verified: true,
      status: 'approved',
      rating: 4.9,
    },
  ];

  for (const consultant of businessConsultants) {
    await prisma.businessConsultant.upsert({
      where: { email: consultant.email },
      update: consultant,
      create: consultant,
    });
  }

  // 6. Architects
  console.log('🏗️ Creating Architects...');
  const architects = [
    {
      userId: users[10].id,
      firstName: 'Layla',
      lastName: 'Al Mansoori',
      email: 'layla.architect@communityhub.com',
      phone: '+971508901234',
      cityId: dubai.id,
      firmName: 'Modern Design Studio',
      licenseNumber: 'ARCH-DXB-789',
      specialties: ['RESIDENTIAL', 'INTERIOR_DESIGN', 'SUSTAINABLE_DESIGN'],
      languages: ['en', 'ar'],
      yearsExperience: 15,
      offersDesign: true,
      offersPlanning: true,
      offersSupervision: true,
      offers3DRendering: true,
      pricePerSqm: 150,
      hourlyRate: 200,
      countries: ['AE'],
      verified: true,
      status: 'approved',
      rating: 4.8,
    },
  ];

  for (const architect of architects) {
    await prisma.architect.upsert({
      where: { email: architect.email },
      update: architect,
      create: architect,
    });
  }

  // 7. Photographers
  console.log('📸 Creating Photographers...');
  const photographers = [
    {
      userId: users[11].id,
      firstName: 'Alex',
      lastName: 'Martinez',
      email: 'alex.photo@communityhub.com',
      phone: '+971509012345',
      cityId: dubai.id,
      specialties: ['REAL_ESTATE', 'ARCHITECTURAL', 'DRONE'],
      languages: ['en', 'es'],
      yearsExperience: 8,
      equipment: ['Canon EOS R5', 'DJI Mavic 3 Pro', 'Profoto Lighting'],
      hasDrone: true,
      hasStudio: true,
      offersEditing: true,
      offersVideo: true,
      hourlyRate: 150,
      halfDayRate: 500,
      fullDayRate: 900,
      deliveryDays: 7,
      rushAvailable: true,
      countries: ['AE'],
      verified: true,
      status: 'approved',
      rating: 4.7,
    },
  ];

  for (const photographer of photographers) {
    await prisma.photographer.upsert({
      where: { email: photographer.email },
      update: photographer,
      create: photographer,
    });
  }

  // 8. Coaches
  console.log('💪 Creating Coaches...');
  const coaches = [
    {
      userId: users[12].id,
      firstName: 'David',
      lastName: 'Williams',
      email: 'david.coach@communityhub.com',
      phone: '+971500123456',
      cityId: dubai.id,
      specialties: ['FITNESS', 'NUTRITION', 'WEIGHT_LOSS'],
      certifications: ['NASM-CPT', 'Precision Nutrition Level 1'],
      languages: ['en'],
      yearsExperience: 10,
      hourlyRate: 100,
      packageRates: {
        '10_sessions': 900,
        '20_sessions': 1700,
      },
      offersOnline: true,
      offersHome: true,
      offersGym: true,
      countries: ['AE'],
      verified: true,
      status: 'approved',
      rating: 4.9,
    },
    {
      userId: users[13].id,
      firstName: 'Yuki',
      lastName: 'Tanaka',
      email: 'yuki.coach@communityhub.com',
      phone: '+66834567890',
      cityId: bangkok.id,
      specialties: ['YOGA', 'MEDITATION', 'WELLNESS'],
      certifications: ['RYT-500', 'Meditation Teacher'],
      languages: ['en', 'th'],
      yearsExperience: 12,
      hourlyRate: 80,
      packageRates: {
        '10_sessions': 700,
        '20_sessions': 1300,
      },
      offersOnline: true,
      offersHome: true,
      offersGym: false,
      countries: ['TH'],
      verified: true,
      status: 'approved',
      rating: 4.8,
    },
  ];

  for (const coach of coaches) {
    await prisma.coach.upsert({
      where: { email: coach.email },
      update: coach,
      create: coach,
    });
  }

  // 9. Doctors
  console.log('👨‍⚕️ Creating Doctors...');
  const doctors = [
    {
      userId: users[14].id,
      firstName: 'Dr. Amira',
      lastName: 'Al Zaabi',
      email: 'amira.doctor@communityhub.com',
      phone: '+971501234560',
      cityId: dubai.id,
      specialties: ['GENERAL_PRACTICE', 'FAMILY_MEDICINE'],
      licenseNumber: 'DOC-DXB-1001',
      hospital: 'Dubai Health Center',
      languages: ['en', 'ar'],
      yearsExperience: 15,
      consultationFee: 200,
      acceptsInsurance: true,
      offersHomeVisit: true,
      offersOnlineConsultation: true,
      countries: ['AE'],
      verified: true,
      status: 'approved',
      rating: 4.9,
    },
    {
      userId: users[15].id,
      firstName: 'Dr. Somchai',
      lastName: 'Wongsakul',
      email: 'somchai.doctor@communityhub.com',
      phone: '+66845678901',
      cityId: bangkok.id,
      specialties: ['CARDIOLOGY', 'INTERNAL_MEDICINE'],
      licenseNumber: 'DOC-BKK-2001',
      hospital: 'Bangkok International Hospital',
      languages: ['en', 'th'],
      yearsExperience: 20,
      consultationFee: 150,
      acceptsInsurance: true,
      offersHomeVisit: false,
      offersOnlineConsultation: true,
      countries: ['TH'],
      verified: true,
      status: 'approved',
      rating: 4.8,
    },
  ];

  for (const doctor of doctors) {
    await prisma.doctor.upsert({
      where: { email: doctor.email },
      update: doctor,
      create: doctor,
    });
  }

  // 10. Dentists
  console.log('🦷 Creating Dentists...');
  const dentists = [
    {
      userId: users[16].id,
      firstName: 'Dr. Omar',
      lastName: 'Hassan',
      email: 'omar.dentist@communityhub.com',
      phone: '+971502345671',
      cityId: dubai.id,
      specialties: ['GENERAL_DENTISTRY', 'COSMETIC_DENTISTRY'],
      licenseNumber: 'DENT-DXB-3001',
      clinic: 'Dubai Smile Clinic',
      languages: ['en', 'ar'],
      yearsExperience: 12,
      consultationFee: 150,
      acceptsInsurance: true,
      offersEmergency: true,
      countries: ['AE'],
      verified: true,
      status: 'approved',
      rating: 4.7,
    },
  ];

  for (const dentist of dentists) {
    await prisma.dentist.upsert({
      where: { email: dentist.email },
      update: dentist,
      create: dentist,
    });
  }

  // 11. Lawyers
  console.log('⚖️ Creating Lawyers...');
  const lawyers = [
    {
      userId: users[17].id,
      firstName: 'Adv. Mohammed',
      lastName: 'Al Hashimi',
      email: 'mohammed.lawyer@communityhub.com',
      phone: '+971503456782',
      cityId: dubai.id,
      specialties: ['CORPORATE_LAW', 'REAL_ESTATE_LAW', 'COMMERCIAL_LAW'],
      licenseNumber: 'LAW-DXB-4001',
      firmName: 'Al Hashimi Legal Consultants',
      languages: ['en', 'ar'],
      yearsExperience: 18,
      hourlyRate: 300,
      consultationFee: 500,
      acceptsLegalAid: false,
      countries: ['AE'],
      verified: true,
      status: 'approved',
      rating: 4.9,
    },
  ];

  for (const lawyer of lawyers) {
    await prisma.lawyer.upsert({
      where: { email: lawyer.email },
      update: lawyer,
      create: lawyer,
    });
  }

  // 12. Vehicles
  console.log('🚗 Creating Vehicles...');
  const vehicles = [
    {
      userId: users[18].id,
      type: 'CAR',
      make: 'Toyota',
      model: 'Camry',
      year: 2023,
      cityId: dubai.id,
      pricePerDay: 150,
      pricePerWeek: 900,
      pricePerMonth: 3000,
      available: true,
      verified: true,
      status: 'approved',
      rating: 4.7,
    },
    {
      userId: users[19].id,
      type: 'MOTORCYCLE',
      make: 'Honda',
      model: 'CBR500R',
      year: 2023,
      cityId: dubai.id,
      pricePerDay: 80,
      pricePerWeek: 500,
      pricePerMonth: 1800,
      available: true,
      verified: true,
      status: 'approved',
      rating: 4.6,
    },
    {
      userId: users[20].id,
      type: 'SCOOTER',
      make: 'Vespa',
      model: 'Primavera 150',
      year: 2023,
      cityId: bangkok.id,
      pricePerDay: 30,
      pricePerWeek: 180,
      pricePerMonth: 600,
      available: true,
      verified: true,
      status: 'approved',
      rating: 4.8,
    },
    {
      userId: users[21].id,
      type: 'BICYCLE',
      make: 'Trek',
      model: 'FX 3',
      year: 2023,
      cityId: paris.id,
      pricePerDay: 20,
      pricePerWeek: 100,
      pricePerMonth: 300,
      available: true,
      verified: true,
      status: 'approved',
      rating: 4.5,
    },
  ];

  for (const vehicle of vehicles) {
    await prisma.vehicle.create({
      data: vehicle,
    });
  }

  console.log('✅ Partner profiles seeded successfully!');
  console.log(`
📊 Summary:
- Real Estate Agents: 3
- Accountants: 2
- Translators: 2
- Visa Agents: 2
- Business Consultants: 1
- Architects: 1
- Photographers: 1
- Coaches: 2
- Doctors: 2
- Dentists: 1
- Lawyers: 1
- Vehicles: 4
━━━━━━━━━━━━━━━━━━━━━━━━
Total: 24 profiles
  `);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding partners:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
