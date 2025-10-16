import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const geographyData = {
  // Émirats Arabes Unis
  AE: {
    code: 'AE',
    name: 'United Arab Emirates',
    nameAr: 'الإمارات العربية المتحدة',
    nameFr: 'Émirats Arabes Unis',
    dialCode: '+971',
    currency: 'AED',
    regions: [
      {
        name: 'Abu Dhabi',
        nameAr: 'أبو ظبي',
        cities: ['Abu Dhabi City', 'Al Ain', 'Madinat Zayed'],
      },
      {
        name: 'Dubai',
        nameAr: 'دبي',
        cities: [
          'Dubai Marina',
          'Downtown Dubai',
          'Jumeirah',
          'Deira',
          'Bur Dubai',
          'Business Bay',
          'Palm Jumeirah',
          'JBR (Jumeirah Beach Residence)',
          'Dubai Silicon Oasis',
          'Dubai Sports City',
          'Dubai Internet City',
          'Dubai Media City',
          'Jumeirah Village Circle (JVC)',
          'Jumeirah Village Triangle (JVT)',
          'Arabian Ranches',
          'The Springs',
          'The Meadows',
          'Emirates Hills',
          'Al Barsha',
          'Al Quoz',
          'Motor City',
          'Discovery Gardens',
          'International City',
          'Dubai Investment Park',
          'Mirdif',
          'Festival City',
        ],
      },
      {
        name: 'Sharjah',
        nameAr: 'الشارقة',
        cities: ['Sharjah City', 'Kalba', 'Khor Fakkan'],
      },
      {
        name: 'Ajman',
        nameAr: 'عجمان',
        cities: ['Ajman City'],
      },
      {
        name: 'Ras Al Khaimah',
        nameAr: 'رأس الخيمة',
        cities: ['Ras Al Khaimah City'],
      },
    ],
  },

  // Philippines
  PH: {
    code: 'PH',
    name: 'Philippines',
    nameAr: 'الفلبين',
    nameFr: 'Philippines',
    dialCode: '+63',
    currency: 'PHP',
    regions: [
      {
        name: 'Metro Manila',
        cities: ['Manila', 'Quezon City', 'Makati', 'Taguig', 'Pasig', 'Mandaluyong'],
      },
      {
        name: 'Cebu',
        cities: ['Cebu City', 'Mandaue', 'Lapu-Lapu'],
      },
      {
        name: 'Davao',
        cities: ['Davao City', 'Tagum', 'Digos'],
      },
    ],
  },

  // Qatar
  QA: {
    code: 'QA',
    name: 'Qatar',
    nameAr: 'قطر',
    nameFr: 'Qatar',
    dialCode: '+974',
    currency: 'QAR',
    regions: [
      {
        name: 'Doha',
        nameAr: 'الدوحة',
        cities: ['Doha', 'West Bay', 'Al Sadd', 'Al Wakrah'],
      },
      {
        name: 'Al Rayyan',
        nameAr: 'الريان',
        cities: ['Al Rayyan', 'Al Wukair'],
      },
    ],
  },

  // Thaïlande
  TH: {
    code: 'TH',
    name: 'Thailand',
    nameAr: 'تايلاند',
    nameFr: 'Thaïlande',
    dialCode: '+66',
    currency: 'THB',
    regions: [
      {
        name: 'Bangkok',
        nameTh: 'กรุงเทพมหานคร',
        cities: [
          'Sukhumvit',
          'Silom',
          'Siam',
          'Sathorn',
          'Thonglor',
          'Ekkamai',
          'Phrom Phong',
          'Asoke',
          'Nana',
          'Ploenchit',
          'Chit Lom',
          'Ratchadamri',
          'Lumphini',
          'Rama 9',
          'Ratchada',
          'Huai Khwang',
          'Ari',
          'Phaya Thai',
          'Victory Monument',
          'Chatuchak',
          'Mo Chit',
          'Bang Na',
          'On Nut',
          'Bearing',
          'Samut Prakan',
        ],
      },
      {
        name: 'Phuket',
        nameTh: 'ภูเก็ต',
        cities: [
          'Phuket Town',
          'Patong',
          'Kata',
          'Karon',
          'Kamala',
          'Surin',
          'Bang Tao',
          'Nai Harn',
          'Rawai',
          'Chalong',
          'Mai Khao',
          'Nai Yang',
        ],
      },
      {
        name: 'Chiang Mai',
        nameTh: 'เชียงใหม่',
        cities: [
          'Old City',
          'Nimman',
          'Santitham',
          'Chang Phueak',
          'Hang Dong',
          'San Kamphaeng',
          'Mae Rim',
          'Doi Saket',
        ],
      },
      {
        name: 'Pattaya',
        nameTh: 'พัทยา',
        cities: [
          'Central Pattaya',
          'North Pattaya',
          'South Pattaya',
          'Jomtien',
          'Naklua',
          'Pratumnak',
          'Wong Amat',
          'Bang Saray',
        ],
      },
      {
        name: 'Koh Samui',
        nameTh: 'เกอะสมุย',
        cities: [
          'Chaweng',
          'Lamai',
          'Bophut',
          'Maenam',
          'Choeng Mon',
          'Bang Rak',
          'Lipa Noi',
          'Taling Ngam',
        ],
      },
      {
        name: 'Rayong',
        nameTh: 'ระยอง',
        cities: [
          'Rayong City',
          'Ban Phe',
          'Klaeng',
          'Map Ta Phut',
          'Pluak Daeng',
        ],
      },
    ],
  },

  // Arabie Saoudite
  SA: {
    code: 'SA',
    name: 'Saudi Arabia',
    nameAr: 'المملكة العربية السعودية',
    nameFr: 'Arabie Saoudite',
    dialCode: '+966',
    currency: 'SAR',
    regions: [
      {
        name: 'Riyadh',
        nameAr: 'الرياض',
        cities: ['Riyadh City', 'Al Olaya', 'Al Malaz', 'Diriyah'],
      },
      {
        name: 'Makkah',
        nameAr: 'مكة المكرمة',
        cities: ['Mecca', 'Jeddah', 'Taif'],
      },
      {
        name: 'Eastern Province',
        nameAr: 'المنطقة الشرقية',
        cities: ['Dammam', 'Khobar', 'Dhahran'],
      },
    ],
  },

  // Mexique
  MX: {
    code: 'MX',
    name: 'Mexico',
    nameAr: 'المكسيك',
    nameFr: 'Mexique',
    dialCode: '+52',
    currency: 'MXN',
    regions: [
      {
        name: 'Mexico City',
        cities: ['Mexico City', 'Polanco', 'Roma', 'Condesa'],
      },
      {
        name: 'Jalisco',
        cities: ['Guadalajara', 'Zapopan', 'Tlaquepaque'],
      },
      {
        name: 'Nuevo León',
        cities: ['Monterrey', 'San Pedro Garza García'],
      },
    ],
  },

  // Égypte
  EG: {
    code: 'EG',
    name: 'Egypt',
    nameAr: 'مصر',
    nameFr: 'Égypte',
    dialCode: '+20',
    currency: 'EGP',
    regions: [
      {
        name: 'Cairo',
        nameAr: 'القاهرة',
        cities: ['Cairo', 'Giza', 'Heliopolis', 'Nasr City', 'Maadi'],
      },
      {
        name: 'Alexandria',
        nameAr: 'الإسكندرية',
        cities: ['Alexandria', 'Borg El Arab'],
      },
      {
        name: 'Red Sea',
        nameAr: 'البحر الأحمر',
        cities: ['Hurghada', 'Sharm El Sheikh'],
      },
    ],
  },

  // Oman
  OM: {
    code: 'OM',
    name: 'Oman',
    nameAr: 'عمان',
    nameFr: 'Oman',
    dialCode: '+968',
    currency: 'OMR',
    regions: [
      {
        name: 'Muscat',
        nameAr: 'مسقط',
        cities: ['Muscat', 'Mutrah', 'Ruwi', 'Al Khuwair'],
      },
      {
        name: 'Dhofar',
        nameAr: 'ظفار',
        cities: ['Salalah'],
      },
    ],
  },

  // Bahrain
  BH: {
    code: 'BH',
    name: 'Bahrain',
    nameAr: 'البحرين',
    nameFr: 'Bahreïn',
    dialCode: '+973',
    currency: 'BHD',
    regions: [
      {
        name: 'Capital',
        nameAr: 'العاصمة',
        cities: ['Manama', 'Muharraq', 'Riffa'],
      },
    ],
  },

  // Vietnam
  VN: {
    code: 'VN',
    name: 'Vietnam',
    nameAr: 'فيتنام',
    nameFr: 'Vietnam',
    dialCode: '+84',
    currency: 'VND',
    regions: [
      {
        name: 'Ho Chi Minh City',
        cities: ['Ho Chi Minh City', 'District 1', 'District 3', 'Binh Thanh'],
      },
      {
        name: 'Hanoi',
        cities: ['Hanoi', 'Ba Dinh', 'Hoan Kiem', 'Dong Da'],
      },
      {
        name: 'Da Nang',
        cities: ['Da Nang', 'Hai Chau', 'Son Tra'],
      },
    ],
  },
};

async function seedGeography() {
  console.log('🌍 Seeding geography data...\n');

  for (const [countryCode, countryData] of Object.entries(geographyData)) {
    console.log(`📍 Processing ${countryData.name}...`);

    // Create or update country
    let country = await prisma.country.findUnique({
      where: { code: countryCode },
    });

    if (!country) {
      country = await prisma.country.create({
        data: {
          code: countryData.code,
          name: countryData.name,
          nameAr: countryData.nameAr,
          nameFr: countryData.nameFr,
          dialCode: countryData.dialCode,
          currency: countryData.currency,
        },
      });
      console.log(`  ✅ Created country: ${countryData.name}`);
    } else {
      console.log(`  ⏭️  Country already exists: ${countryData.name}`);
    }

    // Create regions and cities
    for (const regionData of countryData.regions) {
      let region = await prisma.region.findFirst({
        where: {
          countryId: country.id,
          name: regionData.name,
        },
      });

      if (!region) {
        region = await prisma.region.create({
          data: {
            countryId: country.id,
            name: regionData.name,
            nameAr: regionData.nameAr,
          },
        });
        console.log(`    ✅ Created region: ${regionData.name}`);
      } else {
        console.log(`    ⏭️  Region exists: ${regionData.name}`);
      }

      // Create cities
      for (const cityName of regionData.cities) {
        const existingCity = await prisma.city.findFirst({
          where: {
            countryId: country.id,
            regionId: region.id,
            name: cityName,
          },
        });

        if (!existingCity) {
          await prisma.city.create({
            data: {
              countryId: country.id,
              regionId: region.id,
              name: cityName,
            },
          });
          console.log(`      ✅ Created city: ${cityName}`);
        }
      }
    }
    console.log('');
  }

  console.log('✨ Geography seeding completed!\n');

  // Display statistics
  const stats = await Promise.all([
    prisma.country.count(),
    prisma.region.count(),
    prisma.city.count(),
  ]);

  console.log('📊 Statistics:');
  console.log(`   Countries: ${stats[0]}`);
  console.log(`   Regions: ${stats[1]}`);
  console.log(`   Cities: ${stats[2]}`);
}

seedGeography()
  .catch((error) => {
    console.error('❌ Error seeding geography:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
