import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🏠 Starting Maids seeding...\n');

  // Get or create UAE
  let uae = await prisma.country.findFirst({ where: { code: 'AE' } });
  if (!uae) {
    console.log('Creating UAE...');
    uae = await prisma.country.create({
      data: {
        id: 'ae',
        code: 'AE',
        name: 'United Arab Emirates',
        flag: '🇦🇪',
        isActive: true,
        updatedAt: new Date(),
      }
    });
  }

  // Get or create Dubai
  let dubai = await prisma.city.findFirst({ where: { slug: 'dubai' } });
  if (!dubai) {
    console.log('Creating Dubai...');
    dubai = await prisma.city.create({
      data: {
        id: 'dubai',
        countryId: uae.id,
        name: 'Dubai',
        slug: 'dubai',
        isActive: true,
        updatedAt: new Date(),
      }
    });
  }

  const maids = [
    // 1. Ethiopian
    {
      id: 'maid-emebet-abay-negash',
      name: 'EMEBET ABAY NEGASH',
      slug: 'emebet-abay-negash',
      refNo: 'AYAN',
      nationality: 'Ethiopia',
      dateOfBirth: new Date('1995-03-15'),
      placeOfBirth: 'Ethiopia',
      age: 30,
      sex: 'Female',
      height: 170,
      weight: 63,
      complexion: 'Medium',
      religion: 'Christian',
      maritalStatus: 'Married',
      numberOfChildren: 1,
      qualification: 'Secondary',
      englishLevel: 'Beginner',
      arabicLevel: 'Fluent',
      passportNo: 'EP7695737',
      passportExpiry: new Date('2025-03-05'),
      passportIssuePlace: 'Ethiopia',
      yearsOfExperience: 10,
      experienceCountry: 'Dubai',
      currentLocation: 'Dubai',
      contractType: 'Monthly',
      monthlyFee: 1800,
      currency: 'AED',
      elderlyCare: false,
      specialNeedsCare: false,
      babysittingOlderThan1Year: true,
      babysittingYoungerThan1Year: true,
      cookingSyrianLebanese: false,
      cookingGulf: true,
      cookingInternational: false,
      privateRoom: true,
      liveOut: false,
      workingOnDayOff: false,
      hasCat: false,
      hasDog: false,
      image: '👩🏾',
      phone: '0588442597',
      notes: 'She can do general household chores like cleaning, washing, and ironing.',
      duties: JSON.stringify(['Cleaning', 'Washing', 'Ironing', 'Cooking', 'Babysitting']),
      cityId: dubai?.id || 'city-dubai',
      countryId: uae.id,
      isActive: true,
      isFeatured: true,
      isVerified: true,
      isAvailable: true,
      updatedAt: new Date(),
    },
    // 2. Filipino
    {
      id: 'maid-brenda-floreda-matol',
      name: 'BRENDA FLOREDA MATOL',
      slug: 'brenda-floreda-matol',
      refNo: 'BREN',
      nationality: 'Philippines',
      dateOfBirth: new Date('1992-08-20'),
      placeOfBirth: 'Philippines',
      age: 32,
      sex: 'Female',
      height: 158,
      weight: 55,
      complexion: 'Fair',
      religion: 'Christian',
      maritalStatus: 'Single',
      numberOfChildren: 0,
      qualification: 'High School',
      englishLevel: 'Fluent',
      arabicLevel: 'Beginner',
      passportNo: 'PH8234567',
      passportExpiry: new Date('2026-12-15'),
      passportIssuePlace: 'Philippines',
      yearsOfExperience: 8,
      experienceCountry: 'Saudi Arabia',
      currentLocation: 'Saudi Arabia',
      contractType: 'Monthly',
      monthlyFee: 2000,
      currency: 'AED',
      elderlyCare: true,
      specialNeedsCare: false,
      babysittingOlderThan1Year: true,
      babysittingYoungerThan1Year: true,
      cookingSyrianLebanese: false,
      cookingGulf: false,
      cookingInternational: true,
      privateRoom: false,
      liveOut: false,
      workingOnDayOff: true,
      hasCat: true,
      hasDog: false,
      image: '👩🏻',
      phone: '0501234567',
      notes: 'Experienced with elderly care and international cooking.',
      duties: JSON.stringify(['Cleaning', 'Cooking', 'Elderly Care', 'Babysitting']),
      cityId: dubai?.id || 'city-dubai',
      countryId: uae.id,
      isActive: true,
      isFeatured: true,
      isVerified: true,
      isAvailable: true,
      updatedAt: new Date(),
    },
    // 3. Indonesian
    {
      id: 'maid-ijah-hodijah-ajat-suhaemi',
      name: 'IJAH HODIJAH AJAT SUHAEMI',
      slug: 'ijah-hodijah-ajat-suhaemi',
      refNo: 'IJAH',
      nationality: 'Indonesia',
      dateOfBirth: new Date('1993-05-10'),
      placeOfBirth: 'Indonesia',
      age: 31,
      sex: 'Female',
      height: 160,
      weight: 58,
      complexion: 'Medium',
      religion: 'Muslim',
      maritalStatus: 'Married',
      numberOfChildren: 2,
      qualification: 'Primary',
      englishLevel: 'Beginner',
      arabicLevel: 'Intermediate',
      passportNo: 'ID9876543',
      passportExpiry: new Date('2027-06-20'),
      passportIssuePlace: 'Indonesia',
      yearsOfExperience: 6,
      experienceCountry: 'UAE Abu Dhabi',
      currentLocation: 'UAE Abu Dhabi',
      contractType: 'Monthly',
      monthlyFee: 1700,
      currency: 'AED',
      elderlyCare: false,
      specialNeedsCare: false,
      babysittingOlderThan1Year: true,
      babysittingYoungerThan1Year: false,
      cookingSyrianLebanese: false,
      cookingGulf: true,
      cookingInternational: true,
      privateRoom: true,
      liveOut: false,
      workingOnDayOff: false,
      hasCat: false,
      hasDog: false,
      image: '👩🏽',
      phone: '0523456789',
      notes: 'Good with children and household management.',
      duties: JSON.stringify(['Cleaning', 'Washing', 'Ironing', 'Cooking', 'Babysitting']),
      cityId: dubai.id,
      countryId: uae.id,
      isActive: true,
      isFeatured: false,
      isVerified: true,
      isAvailable: true,
      updatedAt: new Date(),
    },
  ];

  // Continue with more maids...
  const additionalMaids = generateAdditionalMaids(dubai, uae);
  maids.push(...additionalMaids);

  for (const maid of maids) {
    await prisma.maid.upsert({
      where: { id: maid.id },
      update: maid,
      create: maid,
    });
    console.log(`✅ Created/Updated: ${maid.name} (${maid.nationality})`);
  }

  console.log(`\n🎉 Successfully seeded ${maids.length} maids!`);
}

function generateAdditionalMaids(dubai: any, uae: any) {
  const nationalities = [
    { name: 'Kenya', emoji: '👩🏿', complexion: 'Dark' },
    { name: 'Sri Lanka', emoji: '👩🏽', complexion: 'Medium' },
    { name: 'Uganda', emoji: '👩🏿', complexion: 'Dark' },
    { name: 'Nepal', emoji: '👩🏻', complexion: 'Fair' },
    { name: 'Bangladesh', emoji: '👩🏽', complexion: 'Medium' },
    { name: 'India', emoji: '👩🏻', complexion: 'Fair' },
    { name: 'Ghana', emoji: '👩🏿', complexion: 'Dark' },
    { name: 'Tanzania', emoji: '👩🏿', complexion: 'Dark' },
    { name: 'Cameroon', emoji: '👩🏿', complexion: 'Dark' },
    { name: 'Myanmar', emoji: '👩🏻', complexion: 'Fair' },
    { name: 'Nigeria', emoji: '👩🏿', complexion: 'Dark' },
    { name: 'Pakistan', emoji: '👩🏽', complexion: 'Medium' },
    { name: 'Rwanda', emoji: '👩🏿', complexion: 'Dark' },
    { name: 'Madagascar', emoji: '👩🏾', complexion: 'Medium' },
    { name: 'Zambia', emoji: '👩🏿', complexion: 'Dark' },
    { name: 'Morocco', emoji: '👩🏽', complexion: 'Fair' },
    { name: 'Sudan', emoji: '👩🏿', complexion: 'Dark' },
  ];

  const firstNames = ['Mary', 'Sarah', 'Fatima', 'Priya', 'Sunita', 'Amina', 'Grace', 'Rose', 'Aisha', 'Nadia', 'Zainab', 'Mercy', 'Joy', 'Peace', 'Hope', 'Faith', 'Charity'];
  const lastNames = ['Kamau', 'Fernando', 'Nakato', 'Tamang', 'Begum', 'Sharma', 'Mensah', 'Hassan', 'Ngono', 'Aung', 'Okafor', 'Ali', 'Uwase', 'Razak', 'Mwamba', 'Benali', 'Ibrahim'];

  const maids = [];

  for (let i = 0; i < 17; i++) {
    const nat = nationalities[i];
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[i % lastNames.length];
    const fullName = `${firstName.toUpperCase()} ${lastName.toUpperCase()}`;
    const slug = `${firstName.toLowerCase()}-${lastName.toLowerCase()}`;
    const age = 25 + Math.floor(Math.random() * 15);

    maids.push({
      id: `maid-${slug}`,
      name: fullName,
      slug,
      refNo: firstName.substring(0, 4).toUpperCase(),
      nationality: nat.name,
      dateOfBirth: new Date(1990 + Math.floor(Math.random() * 10), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
      placeOfBirth: nat.name,
      age,
      sex: 'Female',
      height: 155 + Math.floor(Math.random() * 20),
      weight: 50 + Math.floor(Math.random() * 20),
      complexion: nat.complexion,
      religion: i % 3 === 0 ? 'Muslim' : i % 3 === 1 ? 'Christian' : 'Hindu',
      maritalStatus: i % 2 === 0 ? 'Married' : 'Single',
      numberOfChildren: i % 2 === 0 ? Math.floor(Math.random() * 3) : 0,
      qualification: i % 3 === 0 ? 'Primary' : i % 3 === 1 ? 'Secondary' : 'High School',
      englishLevel: i % 3 === 0 ? 'Beginner' : i % 3 === 1 ? 'Intermediate' : 'Fluent',
      arabicLevel: i % 3 === 0 ? 'Fluent' : i % 3 === 1 ? 'Intermediate' : 'Beginner',
      passportNo: `${nat.name.substring(0, 2).toUpperCase()}${Math.floor(Math.random() * 9000000) + 1000000}`,
      passportExpiry: new Date(2025 + Math.floor(Math.random() * 3), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
      passportIssuePlace: nat.name,
      yearsOfExperience: 3 + Math.floor(Math.random() * 12),
      experienceCountry: i % 2 === 0 ? 'Dubai' : 'Abu Dhabi',
      currentLocation: i % 2 === 0 ? 'Dubai' : 'Abu Dhabi',
      contractType: 'Monthly',
      monthlyFee: 1500 + Math.floor(Math.random() * 600),
      currency: 'AED',
      elderlyCare: i % 3 === 0,
      specialNeedsCare: i % 5 === 0,
      babysittingOlderThan1Year: true,
      babysittingYoungerThan1Year: i % 2 === 0,
      cookingSyrianLebanese: i % 4 === 0,
      cookingGulf: i % 2 === 0,
      cookingInternational: i % 3 === 0,
      privateRoom: i % 2 === 0,
      liveOut: false,
      workingOnDayOff: i % 4 === 0,
      hasCat: i % 3 === 0,
      hasDog: i % 5 === 0,
      image: nat.emoji,
      phone: `05${Math.floor(Math.random() * 90000000) + 10000000}`,
      notes: `Experienced domestic worker from ${nat.name}.`,
      duties: JSON.stringify(['Cleaning', 'Washing', 'Ironing', 'Cooking', 'Babysitting']),
      cityId: dubai.id,
      countryId: uae.id,
      isActive: true,
      isFeatured: i % 5 === 0,
      isVerified: true,
      isAvailable: true,
      updatedAt: new Date(),
    });
  }

  return maids;
}

main()
  .catch((e) => {
    console.error('❌ Error seeding maids:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
