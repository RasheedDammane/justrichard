/**
 * Script de seed pour ajouter la France, la Suisse et la Belgique
 * avec leurs principales villes
 * 
 * Exécution :
 * npx ts-node prisma/seed-europe.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌍 Ajout de la France, Suisse et Belgique...\n');

  // ========================================
  // 🇫🇷 FRANCE
  // ========================================
  console.log('🇫🇷 Création de la France...');
  
  const france = await prisma.country.upsert({
    where: { code: 'FR' },
    update: {},
    create: {
      code: 'FR',
      name: 'France',
      nameAr: 'فرنسا',
      nameFr: 'France',
      nameEs: 'Francia',
      nameDe: 'Frankreich',
      nameIt: 'Francia',
      namePt: 'França',
      nameRu: 'Франция',
      nameJa: 'フランス',
      nameKo: '프랑스',
      nameTh: 'ฝรั่งเศส',
      nameVi: 'Pháp',
      nameTr: 'Fransa',
      slug: 'france',
      description: 'La France, pays d\'Europe occidentale, est réputée pour sa culture, sa gastronomie et son patrimoine historique.',
      dialCode: '+33',
      currency: 'EUR',
      flag: '🇫🇷',
      icon: '🇫🇷',
      keywords: ['France', 'Paris', 'Europe', 'Gastronomie', 'Culture'],
      metaTitle: 'France - Services Professionnels en France',
      metaDescription: 'Trouvez des services professionnels en France : immobilier, transferts, artisans, et plus encore.',
      isActive: true,
    },
  });

  console.log(`✅ France créée (ID: ${france.id})`);

  // Régions de France
  const ileDefrance = await prisma.region.upsert({
    where: { id: 'region-idf' },
    update: {},
    create: {
      id: 'region-idf',
      countryId: france.id,
      name: 'Île-de-France',
      nameFr: 'Île-de-France',
      nameAr: 'إيل دو فرانس',
      code: 'IDF',
      isActive: true,
    },
  });

  const paca = await prisma.region.upsert({
    where: { id: 'region-paca' },
    update: {},
    create: {
      id: 'region-paca',
      countryId: france.id,
      name: 'Provence-Alpes-Côte d\'Azur',
      nameFr: 'Provence-Alpes-Côte d\'Azur',
      nameAr: 'بروفانس ألب كوت دازور',
      code: 'PACA',
      isActive: true,
    },
  });

  const auverneRhoneAlpes = await prisma.region.upsert({
    where: { id: 'region-ara' },
    update: {},
    create: {
      id: 'region-ara',
      countryId: france.id,
      name: 'Auvergne-Rhône-Alpes',
      nameFr: 'Auvergne-Rhône-Alpes',
      nameAr: 'أوفيرن رون ألب',
      code: 'ARA',
      isActive: true,
    },
  });

  const occitanie = await prisma.region.upsert({
    where: { id: 'region-occitanie' },
    update: {},
    create: {
      id: 'region-occitanie',
      countryId: france.id,
      name: 'Occitanie',
      nameFr: 'Occitanie',
      nameAr: 'أوكسيتانيا',
      code: 'OCC',
      isActive: true,
    },
  });

  const nouvelleAquitaine = await prisma.region.upsert({
    where: { id: 'region-naq' },
    update: {},
    create: {
      id: 'region-naq',
      countryId: france.id,
      name: 'Nouvelle-Aquitaine',
      nameFr: 'Nouvelle-Aquitaine',
      nameAr: 'نوفيل آكيتين',
      code: 'NAQ',
      isActive: true,
    },
  });

  // Villes principales de France
  const frenchCities = [
    // Île-de-France
    {
      name: 'Paris',
      nameFr: 'Paris',
      nameAr: 'باريس',
      slug: 'paris',
      regionId: ileDefrance.id,
      latitude: 48.8566,
      longitude: 2.3522,
      description: 'Capitale de la France, ville lumière connue pour la Tour Eiffel, le Louvre et sa culture.',
      icon: '🗼',
      keywords: ['Paris', 'Tour Eiffel', 'Louvre', 'Capitale'],
    },
    {
      name: 'Versailles',
      nameFr: 'Versailles',
      nameAr: 'فرساي',
      slug: 'versailles',
      regionId: ileDefrance.id,
      latitude: 48.8014,
      longitude: 2.1301,
      description: 'Ville historique célèbre pour son château et ses jardins.',
      icon: '👑',
      keywords: ['Versailles', 'Château', 'Louis XIV'],
    },
    // PACA
    {
      name: 'Marseille',
      nameFr: 'Marseille',
      nameAr: 'مرسيليا',
      slug: 'marseille',
      regionId: paca.id,
      latitude: 43.2965,
      longitude: 5.3698,
      description: 'Deuxième ville de France, port méditerranéen avec une riche histoire.',
      icon: '⚓',
      keywords: ['Marseille', 'Port', 'Méditerranée', 'Vieux-Port'],
    },
    {
      name: 'Nice',
      nameFr: 'Nice',
      nameAr: 'نيس',
      slug: 'nice',
      regionId: paca.id,
      latitude: 43.7102,
      longitude: 7.2620,
      description: 'Station balnéaire de la Côte d\'Azur, célèbre pour la Promenade des Anglais.',
      icon: '🏖️',
      keywords: ['Nice', 'Côte d\'Azur', 'Promenade des Anglais'],
    },
    {
      name: 'Cannes',
      nameFr: 'Cannes',
      nameAr: 'كان',
      slug: 'cannes',
      regionId: paca.id,
      latitude: 43.5528,
      longitude: 7.0174,
      description: 'Ville glamour connue pour son festival du film international.',
      icon: '🎬',
      keywords: ['Cannes', 'Festival', 'Film', 'Croisette'],
    },
    {
      name: 'Monaco',
      nameFr: 'Monaco',
      nameAr: 'موناكو',
      slug: 'monaco',
      regionId: paca.id,
      latitude: 43.7384,
      longitude: 7.4246,
      description: 'Principauté indépendante sur la Côte d\'Azur.',
      icon: '🎰',
      keywords: ['Monaco', 'Monte-Carlo', 'Casino', 'F1'],
    },
    // Auvergne-Rhône-Alpes
    {
      name: 'Lyon',
      nameFr: 'Lyon',
      nameAr: 'ليون',
      slug: 'lyon',
      regionId: auverneRhoneAlpes.id,
      latitude: 45.7640,
      longitude: 4.8357,
      description: 'Troisième ville de France, capitale de la gastronomie française.',
      icon: '🍽️',
      keywords: ['Lyon', 'Gastronomie', 'Confluence', 'Bouchons'],
    },
    {
      name: 'Grenoble',
      nameFr: 'Grenoble',
      nameAr: 'غرونوبل',
      slug: 'grenoble',
      regionId: auverneRhoneAlpes.id,
      latitude: 45.1885,
      longitude: 5.7245,
      description: 'Ville alpine, porte des Alpes françaises.',
      icon: '⛰️',
      keywords: ['Grenoble', 'Alpes', 'Montagne', 'Innovation'],
    },
    // Occitanie
    {
      name: 'Toulouse',
      nameFr: 'Toulouse',
      nameAr: 'تولوز',
      slug: 'toulouse',
      regionId: occitanie.id,
      latitude: 43.6047,
      longitude: 1.4442,
      description: 'La ville rose, capitale européenne de l\'aéronautique et de l\'espace.',
      icon: '🚀',
      keywords: ['Toulouse', 'Airbus', 'Espace', 'Ville Rose'],
    },
    {
      name: 'Montpellier',
      nameFr: 'Montpellier',
      nameAr: 'مونبلييه',
      slug: 'montpellier',
      regionId: occitanie.id,
      latitude: 43.6108,
      longitude: 3.8767,
      description: 'Ville universitaire dynamique du sud de la France.',
      icon: '🎓',
      keywords: ['Montpellier', 'Université', 'Méditerranée'],
    },
    // Nouvelle-Aquitaine
    {
      name: 'Bordeaux',
      nameFr: 'Bordeaux',
      nameAr: 'بوردو',
      slug: 'bordeaux',
      regionId: nouvelleAquitaine.id,
      latitude: 44.8378,
      longitude: -0.5792,
      description: 'Capitale mondiale du vin, ville portuaire élégante.',
      icon: '🍷',
      keywords: ['Bordeaux', 'Vin', 'Patrimoine', 'Garonne'],
    },
  ];

  console.log(`\n📍 Création de ${frenchCities.length} villes françaises...`);
  
  for (const city of frenchCities) {
    await prisma.city.upsert({
      where: { slug: city.slug },
      update: {},
      create: {
        ...city,
        countryId: france.id,
        isActive: true,
      },
    });
    console.log(`  ✅ ${city.name} créée`);
  }

  // ========================================
  // 🇨🇭 SUISSE
  // ========================================
  console.log('\n🇨🇭 Création de la Suisse...');
  
  const switzerland = await prisma.country.upsert({
    where: { code: 'CH' },
    update: {},
    create: {
      code: 'CH',
      name: 'Switzerland',
      nameAr: 'سويسرا',
      nameFr: 'Suisse',
      nameEs: 'Suiza',
      nameDe: 'Schweiz',
      nameIt: 'Svizzera',
      namePt: 'Suíça',
      nameRu: 'Швейцария',
      nameJa: 'スイス',
      nameKo: '스위스',
      nameTh: 'สวิตเซอร์แลนด์',
      nameVi: 'Thụy Sĩ',
      nameTr: 'İsviçre',
      slug: 'switzerland',
      description: 'La Suisse, pays alpin d\'Europe centrale, est célèbre pour ses montagnes, ses banques et ses chocolats.',
      dialCode: '+41',
      currency: 'CHF',
      flag: '🇨🇭',
      icon: '🇨🇭',
      keywords: ['Suisse', 'Alpes', 'Banque', 'Chocolat', 'Montres'],
      metaTitle: 'Suisse - Services Professionnels en Suisse',
      metaDescription: 'Trouvez des services professionnels en Suisse : immobilier, transferts, artisans, et plus encore.',
      isActive: true,
    },
  });

  console.log(`✅ Suisse créée (ID: ${switzerland.id})`);

  // Villes principales de Suisse
  const swissCities = [
    {
      name: 'Zurich',
      nameFr: 'Zurich',
      nameDe: 'Zürich',
      nameAr: 'زيورخ',
      slug: 'zurich',
      latitude: 47.3769,
      longitude: 8.5417,
      description: 'Plus grande ville de Suisse, centre financier et culturel.',
      icon: '🏦',
      keywords: ['Zurich', 'Finance', 'Banque', 'Lac'],
    },
    {
      name: 'Geneva',
      nameFr: 'Genève',
      nameDe: 'Genf',
      nameAr: 'جنيف',
      slug: 'geneva',
      latitude: 46.2044,
      longitude: 6.1432,
      description: 'Ville internationale, siège de nombreuses organisations internationales.',
      icon: '🌐',
      keywords: ['Genève', 'ONU', 'International', 'Lac Léman'],
    },
    {
      name: 'Basel',
      nameFr: 'Bâle',
      nameDe: 'Basel',
      nameAr: 'بازل',
      slug: 'basel',
      latitude: 47.5596,
      longitude: 7.5886,
      description: 'Ville frontalière, centre culturel et pharmaceutique.',
      icon: '🎨',
      keywords: ['Bâle', 'Art', 'Pharma', 'Rhin'],
    },
    {
      name: 'Bern',
      nameFr: 'Berne',
      nameDe: 'Bern',
      nameAr: 'برن',
      slug: 'bern',
      latitude: 46.9480,
      longitude: 7.4474,
      description: 'Capitale de la Suisse, ville médiévale UNESCO.',
      icon: '🏛️',
      keywords: ['Berne', 'Capitale', 'UNESCO', 'Médiéval'],
    },
    {
      name: 'Lausanne',
      nameFr: 'Lausanne',
      nameDe: 'Lausanne',
      nameAr: 'لوزان',
      slug: 'lausanne',
      latitude: 46.5197,
      longitude: 6.6323,
      description: 'Ville olympique sur les rives du lac Léman.',
      icon: '⛵',
      keywords: ['Lausanne', 'Olympique', 'Lac Léman', 'CIO'],
    },
    {
      name: 'Lucerne',
      nameFr: 'Lucerne',
      nameDe: 'Luzern',
      nameAr: 'لوسيرن',
      slug: 'lucerne',
      latitude: 47.0502,
      longitude: 8.3093,
      description: 'Ville touristique pittoresque au bord du lac des Quatre-Cantons.',
      icon: '🌉',
      keywords: ['Lucerne', 'Lac', 'Tourisme', 'Pont Chapel'],
    },
  ];

  console.log(`\n📍 Création de ${swissCities.length} villes suisses...`);
  
  for (const city of swissCities) {
    await prisma.city.upsert({
      where: { slug: city.slug },
      update: {},
      create: {
        ...city,
        countryId: switzerland.id,
        isActive: true,
      },
    });
    console.log(`  ✅ ${city.name} créée`);
  }

  // ========================================
  // 🇧🇪 BELGIQUE
  // ========================================
  console.log('\n🇧🇪 Création de la Belgique...');
  
  const belgium = await prisma.country.upsert({
    where: { code: 'BE' },
    update: {},
    create: {
      code: 'BE',
      name: 'Belgium',
      nameAr: 'بلجيكا',
      nameFr: 'Belgique',
      nameEs: 'Bélgica',
      nameDe: 'Belgien',
      nameIt: 'Belgio',
      namePt: 'Bélgica',
      nameRu: 'Бельгия',
      nameJa: 'ベルギー',
      nameKo: '벨기에',
      nameTh: 'เบลเยียม',
      nameVi: 'Bỉ',
      nameTr: 'Belçika',
      slug: 'belgium',
      description: 'La Belgique, pays d\'Europe occidentale, est célèbre pour ses chocolats, ses bières et son patrimoine médiéval.',
      dialCode: '+32',
      currency: 'EUR',
      flag: '🇧🇪',
      icon: '🇧🇪',
      keywords: ['Belgique', 'Chocolat', 'Bière', 'Bruxelles', 'Europe'],
      metaTitle: 'Belgique - Services Professionnels en Belgique',
      metaDescription: 'Trouvez des services professionnels en Belgique : immobilier, transferts, artisans, et plus encore.',
      isActive: true,
    },
  });

  console.log(`✅ Belgique créée (ID: ${belgium.id})`);

  // Régions de Belgique
  const bruxelles = await prisma.region.upsert({
    where: { id: 'region-bruxelles' },
    update: {},
    create: {
      id: 'region-bruxelles',
      countryId: belgium.id,
      name: 'Brussels-Capital Region',
      nameFr: 'Région de Bruxelles-Capitale',
      nameAr: 'منطقة بروكسل العاصمة',
      code: 'BRU',
      isActive: true,
    },
  });

  const flanders = await prisma.region.upsert({
    where: { id: 'region-flanders' },
    update: {},
    create: {
      id: 'region-flanders',
      countryId: belgium.id,
      name: 'Flanders',
      nameFr: 'Flandre',
      nameAr: 'فلاندرز',
      code: 'VLG',
      isActive: true,
    },
  });

  const wallonia = await prisma.region.upsert({
    where: { id: 'region-wallonia' },
    update: {},
    create: {
      id: 'region-wallonia',
      countryId: belgium.id,
      name: 'Wallonia',
      nameFr: 'Wallonie',
      nameAr: 'والونيا',
      code: 'WAL',
      isActive: true,
    },
  });

  // Villes principales de Belgique
  const belgianCities = [
    {
      name: 'Brussels',
      nameFr: 'Bruxelles',
      nameAr: 'بروكسل',
      slug: 'brussels',
      regionId: bruxelles.id,
      latitude: 50.8503,
      longitude: 4.3517,
      description: 'Capitale de la Belgique et de l\'Union européenne.',
      icon: '🏛️',
      keywords: ['Bruxelles', 'UE', 'Capitale', 'Atomium', 'Grand-Place'],
    },
    {
      name: 'Antwerp',
      nameFr: 'Anvers',
      nameAr: 'أنتويرب',
      slug: 'antwerp',
      regionId: flanders.id,
      latitude: 51.2194,
      longitude: 4.4025,
      description: 'Ville portuaire, capitale mondiale du diamant.',
      icon: '💎',
      keywords: ['Anvers', 'Diamant', 'Port', 'Mode'],
    },
    {
      name: 'Ghent',
      nameFr: 'Gand',
      nameAr: 'غنت',
      slug: 'ghent',
      regionId: flanders.id,
      latitude: 51.0543,
      longitude: 3.7174,
      description: 'Ville médiévale avec un riche patrimoine architectural.',
      icon: '🏰',
      keywords: ['Gand', 'Médiéval', 'Université', 'Canal'],
    },
    {
      name: 'Bruges',
      nameFr: 'Bruges',
      nameAr: 'بروج',
      slug: 'bruges',
      regionId: flanders.id,
      latitude: 51.2093,
      longitude: 3.2247,
      description: 'Ville médiévale pittoresque, surnommée "Venise du Nord".',
      icon: '🌉',
      keywords: ['Bruges', 'Médiéval', 'UNESCO', 'Canaux', 'Chocolat'],
    },
    {
      name: 'Liège',
      nameFr: 'Liège',
      nameAr: 'لييج',
      slug: 'liege',
      regionId: wallonia.id,
      latitude: 50.6292,
      longitude: 5.5797,
      description: 'Ville wallonne importante, carrefour européen.',
      icon: '🚄',
      keywords: ['Liège', 'Wallonie', 'Gare', 'Meuse'],
    },
    {
      name: 'Charleroi',
      nameFr: 'Charleroi',
      nameAr: 'شارلروا',
      slug: 'charleroi',
      regionId: wallonia.id,
      latitude: 50.4108,
      longitude: 4.4446,
      description: 'Ville industrielle du sud de la Belgique.',
      icon: '🏭',
      keywords: ['Charleroi', 'Industrie', 'Aéroport'],
    },
  ];

  console.log(`\n📍 Création de ${belgianCities.length} villes belges...`);
  
  for (const city of belgianCities) {
    await prisma.city.upsert({
      where: { slug: city.slug },
      update: {},
      create: {
        ...city,
        countryId: belgium.id,
        isActive: true,
      },
    });
    console.log(`  ✅ ${city.name} créée`);
  }

  // ========================================
  // RÉSUMÉ
  // ========================================
  console.log('\n' + '='.repeat(60));
  console.log('✅ SEED EUROPE TERMINÉ AVEC SUCCÈS !');
  console.log('='.repeat(60));
  
  console.log('\n📊 RÉSUMÉ :');
  console.log(`  🇫🇷 France : ${frenchCities.length} villes`);
  console.log(`  🇨🇭 Suisse : ${swissCities.length} villes`);
  console.log(`  🇧🇪 Belgique : ${belgianCities.length} villes`);
  console.log(`  📍 TOTAL : ${frenchCities.length + swissCities.length + belgianCities.length} villes\n`);
}

main()
  .catch((e) => {
    console.error('❌ Erreur:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
