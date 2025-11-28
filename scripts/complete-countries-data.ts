import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Données complètes pour chaque pays
const countriesData = [
  {
    code: 'AE',
    name: 'United Arab Emirates',
    slug: 'united-arab-emirates',
    description: 'The United Arab Emirates is a federation of seven emirates known for its modern architecture, luxury shopping, and vibrant nightlife. Dubai and Abu Dhabi are major business and tourism hubs.',
    dialCode: '+971',
    currencyCode: 'AED',
    flag: '🇦🇪',
    icon: '🏙️',
    thumbnail: '/images/countries/uae-thumb.jpg',
    images: [
      '/images/countries/uae-burj-khalifa.jpg',
      '/images/countries/uae-sheikh-zayed-mosque.jpg',
      '/images/countries/uae-dubai-marina.jpg'
    ],
    metaTitle: 'United Arab Emirates - Services & Living Guide',
    metaDescription: 'Discover services, properties, and professional help in the UAE. From Dubai to Abu Dhabi, find everything you need.',
    keywords: ['UAE', 'Dubai', 'Abu Dhabi', 'Emirates', 'Middle East']
  },
  {
    code: 'TH',
    name: 'Thailand',
    slug: 'thailand',
    description: 'Thailand is known for its tropical beaches, opulent royal palaces, ancient ruins, and ornate temples. Bangkok, the capital, is a vibrant city with street food, nightlife, and cultural attractions.',
    dialCode: '+66',
    currencyCode: 'THB',
    flag: '🇹🇭',
    icon: '🏯',
    thumbnail: '/images/countries/thailand-thumb.jpg',
    images: [
      '/images/countries/thailand-bangkok.jpg',
      '/images/countries/thailand-phuket.jpg',
      '/images/countries/thailand-temple.jpg'
    ],
    metaTitle: 'Thailand - Services & Living Guide',
    metaDescription: 'Explore Thailand services, properties, and professional help. From Bangkok to Phuket, find everything you need.',
    keywords: ['Thailand', 'Bangkok', 'Phuket', 'Southeast Asia', 'expat']
  },
  {
    code: 'VN',
    name: 'Vietnam',
    slug: 'vietnam',
    description: 'Vietnam is a Southeast Asian country known for its beaches, rivers, Buddhist pagodas, and bustling cities. Hanoi and Ho Chi Minh City are major economic and cultural centers.',
    dialCode: '+84',
    currencyCode: 'VND',
    flag: '🇻🇳',
    icon: '🏮',
    thumbnail: '/images/countries/vietnam-thumb.jpg',
    images: [
      '/images/countries/vietnam-hanoi.jpg',
      '/images/countries/vietnam-halong-bay.jpg',
      '/images/countries/vietnam-hcmc.jpg'
    ],
    metaTitle: 'Vietnam - Services & Living Guide',
    metaDescription: 'Find services, properties, and professional help in Vietnam. From Hanoi to Ho Chi Minh City.',
    keywords: ['Vietnam', 'Hanoi', 'Ho Chi Minh', 'Southeast Asia']
  },
  {
    code: 'BH',
    name: 'Bahrain',
    slug: 'bahrain',
    description: 'Bahrain is an island nation in the Persian Gulf known for its financial services sector and pearl diving heritage. Manama is the capital and largest city.',
    dialCode: '+973',
    currencyCode: 'BHD',
    flag: '🇧🇭',
    icon: '🏛️',
    thumbnail: '/images/countries/bahrain-thumb.jpg',
    images: [
      '/images/countries/bahrain-manama.jpg',
      '/images/countries/bahrain-fort.jpg'
    ],
    metaTitle: 'Bahrain - Services & Living Guide',
    metaDescription: 'Discover services and properties in Bahrain. Find professional help in Manama and beyond.',
    keywords: ['Bahrain', 'Manama', 'Middle East', 'Gulf']
  },
  {
    code: 'ID',
    name: 'Indonesia',
    slug: 'indonesia',
    description: 'Indonesia is the worlds largest archipelago with over 17,000 islands. Known for its diverse cultures, beautiful beaches, and vibrant cities like Jakarta and Bali.',
    dialCode: '+62',
    currencyCode: 'IDR',
    flag: '🇮🇩',
    icon: '🏝️',
    thumbnail: '/images/countries/indonesia-thumb.jpg',
    images: [
      '/images/countries/indonesia-jakarta.jpg',
      '/images/countries/indonesia-bali.jpg',
      '/images/countries/indonesia-temple.jpg'
    ],
    metaTitle: 'Indonesia - Services & Living Guide',
    metaDescription: 'Explore Indonesia services and properties. From Jakarta to Bali, find everything you need.',
    keywords: ['Indonesia', 'Jakarta', 'Bali', 'Southeast Asia']
  },
  {
    code: 'MY',
    name: 'Malaysia',
    slug: 'malaysia',
    description: 'Malaysia is a Southeast Asian country known for its beaches, rainforests, and mix of Malay, Chinese, Indian, and European cultural influences. Kuala Lumpur is the capital.',
    dialCode: '+60',
    currencyCode: 'MYR',
    flag: '🇲🇾',
    icon: '🏙️',
    thumbnail: '/images/countries/malaysia-thumb.jpg',
    images: [
      '/images/countries/malaysia-kl.jpg',
      '/images/countries/malaysia-petronas.jpg',
      '/images/countries/malaysia-penang.jpg'
    ],
    metaTitle: 'Malaysia - Services & Living Guide',
    metaDescription: 'Find services and properties in Malaysia. From Kuala Lumpur to Penang.',
    keywords: ['Malaysia', 'Kuala Lumpur', 'Penang', 'Southeast Asia']
  },
  {
    code: 'MA',
    name: 'Morocco',
    slug: 'morocco',
    description: 'Morocco is a North African country known for its rich history, diverse culture, and stunning landscapes. From the bustling medinas of Marrakech to the blue streets of Chefchaouen.',
    dialCode: '+212',
    currencyCode: 'MAD',
    flag: '🇲🇦',
    icon: '🕌',
    thumbnail: '/images/countries/morocco-thumb.jpg',
    images: [
      '/images/countries/morocco-marrakech.jpg',
      '/images/countries/morocco-casablanca.jpg',
      '/images/countries/morocco-chefchaouen.jpg'
    ],
    metaTitle: 'Morocco - Services & Living Guide',
    metaDescription: 'Discover services in Morocco. From Marrakech to Casablanca, find professional help.',
    keywords: ['Morocco', 'Marrakech', 'Casablanca', 'North Africa']
  },
  {
    code: 'PH',
    name: 'Philippines',
    slug: 'philippines',
    description: 'The Philippines is an archipelago of over 7,000 islands known for its beautiful beaches, diving spots, and friendly people. Manila is the bustling capital.',
    dialCode: '+63',
    currencyCode: 'PHP',
    flag: '🇵🇭',
    icon: '🏖️',
    thumbnail: '/images/countries/philippines-thumb.jpg',
    images: [
      '/images/countries/philippines-manila.jpg',
      '/images/countries/philippines-boracay.jpg',
      '/images/countries/philippines-palawan.jpg'
    ],
    metaTitle: 'Philippines - Services & Living Guide',
    metaDescription: 'Find services in the Philippines. From Manila to Boracay, discover everything you need.',
    keywords: ['Philippines', 'Manila', 'Boracay', 'Southeast Asia']
  },
  {
    code: 'QA',
    name: 'Qatar',
    slug: 'qatar',
    description: 'Qatar is a peninsular Arab country known for its futuristic skyscrapers, ultramodern architecture, and rich cultural heritage. Doha is the capital and economic center.',
    dialCode: '+974',
    currencyCode: 'QAR',
    flag: '🇶🇦',
    icon: '🏗️',
    thumbnail: '/images/countries/qatar-thumb.jpg',
    images: [
      '/images/countries/qatar-doha.jpg',
      '/images/countries/qatar-skyline.jpg',
      '/images/countries/qatar-museum.jpg'
    ],
    metaTitle: 'Qatar - Services & Living Guide',
    metaDescription: 'Explore services in Qatar. Find professional help in Doha and beyond.',
    keywords: ['Qatar', 'Doha', 'Middle East', 'Gulf']
  },
  {
    code: 'SA',
    name: 'Saudi Arabia',
    slug: 'saudi-arabia',
    description: 'Saudi Arabia is the largest country in the Middle East, known for its oil wealth, Islamic heritage, and rapid modernization. Riyadh and Jeddah are major cities.',
    dialCode: '+966',
    currencyCode: 'SAR',
    flag: '🇸🇦',
    icon: '🕋',
    thumbnail: '/images/countries/saudi-thumb.jpg',
    images: [
      '/images/countries/saudi-riyadh.jpg',
      '/images/countries/saudi-jeddah.jpg',
      '/images/countries/saudi-neom.jpg'
    ],
    metaTitle: 'Saudi Arabia - Services & Living Guide',
    metaDescription: 'Discover services in Saudi Arabia. From Riyadh to Jeddah, find everything you need.',
    keywords: ['Saudi Arabia', 'Riyadh', 'Jeddah', 'Middle East']
  },
  {
    code: 'SG',
    name: 'Singapore',
    slug: 'singapore',
    description: 'Singapore is a sovereign city-state and island country known for its cleanliness, efficiency, and multicultural society. A global financial hub with world-class infrastructure.',
    dialCode: '+65',
    currencyCode: 'SGD',
    flag: '🇸🇬',
    icon: '🦁',
    thumbnail: '/images/countries/singapore-thumb.jpg',
    images: [
      '/images/countries/singapore-marina-bay.jpg',
      '/images/countries/singapore-gardens.jpg',
      '/images/countries/singapore-skyline.jpg'
    ],
    metaTitle: 'Singapore - Services & Living Guide',
    metaDescription: 'Find services and properties in Singapore. Discover professional help in this global city.',
    keywords: ['Singapore', 'Marina Bay', 'Southeast Asia', 'city-state']
  }
];

async function completeCountriesData() {
  console.log('🚀 Mise à jour complète des pays...\n');

  try {
    // 1. Récupérer toutes les devises
    const currencies = await prisma.currency.findMany();
    const currencyMap = new Map(currencies.map(c => [c.code, c.id]));
    console.log(`✅ ${currencies.length} devises chargées\n`);

    let updated = 0;
    let created = 0;
    let errors = 0;

    // 2. Traiter chaque pays
    for (const countryData of countriesData) {
      try {
        const currencyId = currencyMap.get(countryData.currencyCode);
        
        if (!currencyId) {
          console.log(`⚠️  ${countryData.name}: Devise ${countryData.currencyCode} non trouvée`);
          errors++;
          continue;
        }

        // Vérifier si le pays existe
        const existing = await prisma.country.findFirst({
          where: { code: countryData.code }
        });

        const data = {
          code: countryData.code,
          name: countryData.name,
          slug: countryData.slug,
          description: countryData.description,
          dialCode: countryData.dialCode,
          currencyId: currencyId,
          flag: countryData.flag,
          icon: countryData.icon,
          thumbnail: countryData.thumbnail,
          images: countryData.images,
          metaTitle: countryData.metaTitle,
          metaDescription: countryData.metaDescription,
          keywords: countryData.keywords,
          isActive: true,
          updatedAt: new Date(),
        };

        if (existing) {
          // Mise à jour
          await prisma.country.update({
            where: { id: existing.id },
            data: data
          });
          console.log(`✅ Mis à jour: ${countryData.name} (${countryData.code})`);
          updated++;
        } else {
          // Création
          await prisma.country.create({
            data: {
              id: `country-${countryData.code.toLowerCase()}-${Date.now()}`,
              ...data,
              createdAt: new Date(),
            }
          });
          console.log(`✨ Créé: ${countryData.name} (${countryData.code})`);
          created++;
        }
      } catch (error: any) {
        console.error(`❌ Erreur pour ${countryData.name}:`, error.message);
        errors++;
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 RÉSUMÉ:');
    console.log(`   ✅ Mis à jour: ${updated}`);
    console.log(`   ✨ Créés: ${created}`);
    console.log(`   ❌ Erreurs: ${errors}`);
    console.log('='.repeat(60));
    console.log('\n✨ Terminé!\n');

  } catch (error: any) {
    console.error('❌ Erreur globale:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

completeCountriesData();
