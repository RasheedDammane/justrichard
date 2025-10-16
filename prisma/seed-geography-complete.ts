import { PrismaClient } from '@prisma/client';
import { generateSlug } from '../lib/seo/slug-generator';

const prisma = new PrismaClient();

async function main() {
  console.log('🌍 Seeding geography with complete data...');

  // UAE
  const uae = await prisma.country.upsert({
    where: { code: 'AE' },
    update: {},
    create: {
      code: 'AE',
      name: 'United Arab Emirates',
      nameAr: 'الإمارات العربية المتحدة',
      nameFr: 'Émirats arabes unis',
      nameEs: 'Emiratos Árabes Unidos',
      nameDe: 'Vereinigte Arabische Emirate',
      nameRu: 'Объединенные Арабские Эмираты',
      nameTh: 'สหรัฐอาหรับเอมิเรตส์',
      nameVi: 'Các Tiểu vương quốc Ả Rập Thống nhất',
      nameKo: '아랍에미리트',
      nameTl: 'United Arab Emirates',
      nameIt: 'Emirati Arabi Uniti',
      nameNo: 'De forente arabiske emirater',
      nameTr: 'Birleşik Arap Emirlikleri',
      namePt: 'Emirados Árabes Unidos',
      nameAf: 'Verenigde Arabiese Emirate',
      nameJa: 'アラブ首長国連邦',
      
      slug: generateSlug('United Arab Emirates'),
      description: 'The United Arab Emirates is a federation of seven emirates located in the Arabian Peninsula. Known for its modern architecture, luxury shopping, and vibrant nightlife.',
      
      dialCode: '+971',
      currency: 'AED',
      
      flag: '🇦🇪',
      icon: '🏙️',
      thumbnail: '/images/countries/uae-thumb.jpg',
      images: [
        '/images/countries/uae-burj-khalifa.jpg',
        '/images/countries/uae-sheikh-zayed-mosque.jpg',
        '/images/countries/uae-dubai-marina.jpg',
      ],
      
      metaTitle: 'United Arab Emirates - Services & Living Guide | CommunityHub',
      metaDescription: 'Discover services, properties, and professional help in the UAE. From Dubai to Abu Dhabi, find everything you need for life in the Emirates.',
      keywords: ['UAE', 'Dubai', 'Abu Dhabi', 'Emirates', 'Middle East', 'expat life'],
    },
  });

  // Dubai
  const dubai = await prisma.city.upsert({
    where: { id: 'dubai-city-id' },
    update: {},
    create: {
      id: 'dubai-city-id',
      countryId: uae.id,
      name: 'Dubai',
      nameAr: 'دبي',
      nameFr: 'Dubaï',
      nameEs: 'Dubái',
      nameDe: 'Dubai',
      nameRu: 'Дубай',
      nameTh: 'ดูไบ',
      nameVi: 'Dubai',
      nameKo: '두바이',
      nameTl: 'Dubai',
      nameIt: 'Dubai',
      nameNo: 'Dubai',
      nameTr: 'Dubai',
      namePt: 'Dubai',
      nameAf: 'Dubai',
      nameJa: 'ドバイ',
      
      slug: generateSlug('Dubai UAE'),
      description: 'Dubai is the most populous city in the UAE and a global hub for business, tourism, and innovation. Home to the world\'s tallest building, largest shopping mall, and stunning beaches.',
      
      latitude: 25.2048,
      longitude: 55.2708,
      
      icon: '🏙️',
      thumbnail: '/images/cities/dubai-thumb.jpg',
      images: [
        '/images/cities/dubai-burj-khalifa.jpg',
        '/images/cities/dubai-palm-jumeirah.jpg',
        '/images/cities/dubai-marina.jpg',
        '/images/cities/dubai-old-town.jpg',
      ],
      
      metaTitle: 'Dubai - Services, Properties & Living Guide | CommunityHub',
      metaDescription: 'Find the best services, properties, and professionals in Dubai. From Downtown to Palm Jumeirah, discover everything Dubai has to offer.',
      keywords: ['Dubai', 'UAE', 'expat', 'services', 'properties', 'living'],
    },
  });

  // Abu Dhabi
  const abuDhabi = await prisma.city.upsert({
    where: { id: 'abu-dhabi-city-id' },
    update: {},
    create: {
      id: 'abu-dhabi-city-id',
      countryId: uae.id,
      name: 'Abu Dhabi',
      nameAr: 'أبو ظبي',
      nameFr: 'Abou Dabi',
      nameEs: 'Abu Dabi',
      nameDe: 'Abu Dhabi',
      nameRu: 'Абу-Даби',
      nameTh: 'อาบูดาบี',
      nameVi: 'Abu Dhabi',
      nameKo: '아부다비',
      nameTl: 'Abu Dhabi',
      nameIt: 'Abu Dhabi',
      nameNo: 'Abu Dhabi',
      nameTr: 'Abu Dabi',
      namePt: 'Abu Dhabi',
      nameAf: 'Abu Dhabi',
      nameJa: 'アブダビ',
      
      slug: generateSlug('Abu Dhabi UAE'),
      description: 'Abu Dhabi is the capital of the UAE, known for its cultural landmarks, beautiful corniche, and the stunning Sheikh Zayed Grand Mosque.',
      
      latitude: 24.4539,
      longitude: 54.3773,
      
      icon: '🕌',
      thumbnail: '/images/cities/abu-dhabi-thumb.jpg',
      images: [
        '/images/cities/abu-dhabi-mosque.jpg',
        '/images/cities/abu-dhabi-corniche.jpg',
        '/images/cities/abu-dhabi-louvre.jpg',
      ],
      
      metaTitle: 'Abu Dhabi - Capital City Services & Living | CommunityHub',
      metaDescription: 'Explore Abu Dhabi, the UAE capital. Find services, properties, and professionals in this cultural and business hub.',
      keywords: ['Abu Dhabi', 'UAE capital', 'services', 'expat life'],
    },
  });

  // Philippines
  const philippines = await prisma.country.upsert({
    where: { code: 'PH' },
    update: {},
    create: {
      code: 'PH',
      name: 'Philippines',
      nameAr: 'الفلبين',
      nameFr: 'Philippines',
      nameEs: 'Filipinas',
      nameDe: 'Philippinen',
      nameRu: 'Филиппины',
      nameTh: 'ฟิลิปปินส์',
      nameVi: 'Philippines',
      nameKo: '필리핀',
      nameTl: 'Pilipinas',
      nameIt: 'Filippine',
      nameNo: 'Filippinene',
      nameTr: 'Filipinler',
      namePt: 'Filipinas',
      nameAf: 'Filippyne',
      nameJa: 'フィリピン',
      
      slug: generateSlug('Philippines'),
      description: 'The Philippines is an archipelago of over 7,000 islands in Southeast Asia. Known for its beautiful beaches, friendly people, and vibrant culture.',
      
      dialCode: '+63',
      currency: 'PHP',
      
      flag: '🇵🇭',
      icon: '🏝️',
      thumbnail: '/images/countries/philippines-thumb.jpg',
      images: [
        '/images/countries/philippines-boracay.jpg',
        '/images/countries/philippines-palawan.jpg',
        '/images/countries/philippines-manila.jpg',
      ],
      
      metaTitle: 'Philippines - Services & Living Guide | CommunityHub',
      metaDescription: 'Discover services and opportunities in the Philippines. From Manila to Cebu, find everything you need.',
      keywords: ['Philippines', 'Manila', 'Cebu', 'Southeast Asia', 'islands'],
    },
  });

  // Manila
  const manila = await prisma.city.upsert({
    where: { id: 'manila-city-id' },
    update: {},
    create: {
      id: 'manila-city-id',
      countryId: philippines.id,
      name: 'Manila',
      nameAr: 'مانيلا',
      nameFr: 'Manille',
      nameEs: 'Manila',
      nameDe: 'Manila',
      nameRu: 'Манила',
      nameTh: 'มะนิลา',
      nameVi: 'Manila',
      nameKo: '마닐라',
      nameTl: 'Maynila',
      nameIt: 'Manila',
      nameNo: 'Manila',
      nameTr: 'Manila',
      namePt: 'Manila',
      nameAf: 'Manila',
      nameJa: 'マニラ',
      
      slug: generateSlug('Manila Philippines'),
      description: 'Manila is the capital of the Philippines, a bustling metropolis with rich history, vibrant culture, and modern amenities.',
      
      latitude: 14.5995,
      longitude: 120.9842,
      
      icon: '🏙️',
      thumbnail: '/images/cities/manila-thumb.jpg',
      images: [
        '/images/cities/manila-skyline.jpg',
        '/images/cities/manila-intramuros.jpg',
        '/images/cities/manila-bay.jpg',
      ],
      
      metaTitle: 'Manila - Capital City Services | CommunityHub',
      metaDescription: 'Find services and opportunities in Manila, the heart of the Philippines.',
      keywords: ['Manila', 'Philippines', 'capital', 'services'],
    },
  });

  // Thailand
  const thailand = await prisma.country.upsert({
    where: { code: 'TH' },
    update: {},
    create: {
      code: 'TH',
      name: 'Thailand',
      nameAr: 'تايلاند',
      nameFr: 'Thaïlande',
      nameEs: 'Tailandia',
      nameDe: 'Thailand',
      nameRu: 'Таиланд',
      nameTh: 'ประเทศไทย',
      nameVi: 'Thái Lan',
      nameKo: '태국',
      nameTl: 'Thailand',
      nameIt: 'Thailandia',
      nameNo: 'Thailand',
      nameTr: 'Tayland',
      namePt: 'Tailândia',
      nameAf: 'Thailand',
      nameJa: 'タイ',
      
      slug: generateSlug('Thailand'),
      description: 'Thailand is known as the Land of Smiles, famous for its tropical beaches, ancient temples, and delicious cuisine.',
      
      dialCode: '+66',
      currency: 'THB',
      
      flag: '🇹🇭',
      icon: '🏯',
      thumbnail: '/images/countries/thailand-thumb.jpg',
      images: [
        '/images/countries/thailand-bangkok.jpg',
        '/images/countries/thailand-phuket.jpg',
        '/images/countries/thailand-temples.jpg',
      ],
      
      metaTitle: 'Thailand - Services & Living Guide | CommunityHub',
      metaDescription: 'Discover services in Thailand. From Bangkok to Phuket, find everything you need.',
      keywords: ['Thailand', 'Bangkok', 'expat', 'Southeast Asia'],
    },
  });

  // Bangkok
  const bangkok = await prisma.city.upsert({
    where: { id: 'bangkok-city-id' },
    update: {},
    create: {
      id: 'bangkok-city-id',
      countryId: thailand.id,
      name: 'Bangkok',
      nameAr: 'بانكوك',
      nameFr: 'Bangkok',
      nameEs: 'Bangkok',
      nameDe: 'Bangkok',
      nameRu: 'Бангкок',
      nameTh: 'กรุงเทพมหานคร',
      nameVi: 'Bangkok',
      nameKo: '방콕',
      nameTl: 'Bangkok',
      nameIt: 'Bangkok',
      nameNo: 'Bangkok',
      nameTr: 'Bangkok',
      namePt: 'Banguecoque',
      nameAf: 'Bangkok',
      nameJa: 'バンコク',
      
      slug: generateSlug('Bangkok Thailand'),
      description: 'Bangkok is Thailand\'s capital, a vibrant city known for its ornate temples, bustling street markets, and modern skyscrapers.',
      
      latitude: 13.7563,
      longitude: 100.5018,
      
      icon: '🏯',
      thumbnail: '/images/cities/bangkok-thumb.jpg',
      images: [
        '/images/cities/bangkok-grand-palace.jpg',
        '/images/cities/bangkok-wat-arun.jpg',
        '/images/cities/bangkok-skyline.jpg',
      ],
      
      metaTitle: 'Bangkok - Capital City Services | CommunityHub',
      metaDescription: 'Find services in Bangkok, Thailand\'s vibrant capital city.',
      keywords: ['Bangkok', 'Thailand', 'capital', 'expat'],
    },
  });

  console.log('✅ Geography seeded with complete data!');
  console.log(`   Countries: UAE, Philippines, Thailand`);
  console.log(`   Cities: Dubai, Abu Dhabi, Manila, Bangkok`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding geography:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
