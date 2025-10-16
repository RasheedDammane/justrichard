#!/usr/bin/env tsx

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding MISSING data...\n');

  // 1. CURRENCIES
  console.log('💰 Creating Currencies...');
  const currenciesData = [
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', isDefault: true },
    { code: 'USD', name: 'US Dollar', symbol: '$', isDefault: false },
    { code: 'EUR', name: 'Euro', symbol: '€', isDefault: false },
    { code: 'GBP', name: 'British Pound', symbol: '£', isDefault: false },
    { code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س', isDefault: false },
    { code: 'QAR', name: 'Qatari Riyal', symbol: 'ر.ق', isDefault: false },
    { code: 'BHD', name: 'Bahraini Dinar', symbol: 'د.ب', isDefault: false },
    { code: 'OMR', name: 'Omani Rial', symbol: 'ر.ع', isDefault: false },
    { code: 'THB', name: 'Thai Baht', symbol: '฿', isDefault: false },
    { code: 'PHP', name: 'Philippine Peso', symbol: '₱', isDefault: false },
    { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', isDefault: false },
  ];

  let currencyCount = 0;
  for (const c of currenciesData) {
    try {
      await prisma.currency.upsert({
        where: { code: c.code },
        update: {},
        create: c,
      });
      currencyCount++;
    } catch (e: any) {
      if (!e.message.includes('Unique constraint')) {
        console.log(`   ❌ ${c.code}:`, e.message);
      }
    }
  }
  console.log(`   ✅ ${currencyCount} currencies\n`);

  // 2. LANGUAGES
  console.log('🌐 Creating Languages...');
  const languagesData = [
    { code: 'en', name: 'English', nativeName: 'English', isActive: true, isDefault: true },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', isActive: true, isDefault: false },
    { code: 'fr', name: 'French', nativeName: 'Français', isActive: true, isDefault: false },
    { code: 'es', name: 'Spanish', nativeName: 'Español', isActive: true, isDefault: false },
    { code: 'de', name: 'German', nativeName: 'Deutsch', isActive: true, isDefault: false },
    { code: 'ru', name: 'Russian', nativeName: 'Русский', isActive: true, isDefault: false },
    { code: 'th', name: 'Thai', nativeName: 'ไทย', isActive: true, isDefault: false },
    { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', isActive: true, isDefault: false },
    { code: 'ko', name: 'Korean', nativeName: '한국어', isActive: true, isDefault: false },
    { code: 'tl', name: 'Tagalog', nativeName: 'Tagalog', isActive: true, isDefault: false },
    { code: 'it', name: 'Italian', nativeName: 'Italiano', isActive: true, isDefault: false },
    { code: 'no', name: 'Norwegian', nativeName: 'Norsk', isActive: true, isDefault: false },
    { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', isActive: true, isDefault: false },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português', isActive: true, isDefault: false },
    { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans', isActive: true, isDefault: false },
    { code: 'ja', name: 'Japanese', nativeName: '日本語', isActive: true, isDefault: false },
  ];

  let languageCount = 0;
  for (const l of languagesData) {
    try {
      await prisma.language.upsert({
        where: { code: l.code },
        update: {},
        create: l,
      });
      languageCount++;
    } catch (e: any) {
      console.log(`   ⚠️  ${l.code}:`, e.message.split('\n')[0]);
    }
  }
  console.log(`   ✅ ${languageCount} languages\n`);

  // 3. NEW COUNTRIES
  console.log('🌍 Creating New Countries...');
  const newCountriesData = [
    { 
      code: 'SA', 
      name: 'Saudi Arabia',
      nameAr: 'المملكة العربية السعودية',
      nameFr: 'Arabie Saoudite',
      dialCode: '+966',
      currency: 'SAR',
      isActive: true,
    },
    { 
      code: 'QA', 
      name: 'Qatar',
      nameAr: 'قطر',
      nameFr: 'Qatar',
      dialCode: '+974',
      currency: 'QAR',
      isActive: true,
    },
    { 
      code: 'BH', 
      name: 'Bahrain',
      nameAr: 'البحرين',
      nameFr: 'Bahreïn',
      dialCode: '+973',
      currency: 'BHD',
      isActive: true,
    },
    { 
      code: 'OM', 
      name: 'Oman',
      nameAr: 'عُمان',
      nameFr: 'Oman',
      dialCode: '+968',
      currency: 'OMR',
      isActive: true,
    },
    { 
      code: 'VN', 
      name: 'Vietnam',
      nameAr: 'فيتنام',
      nameFr: 'Vietnam',
      dialCode: '+84',
      currency: 'VND',
      isActive: true,
    },
  ];

  let countryCount = 0;
  for (const c of newCountriesData) {
    try {
      await prisma.country.upsert({
        where: { code: c.code },
        update: {},
        create: c,
      });
      countryCount++;
    } catch (e: any) {
      if (!e.message.includes('Unique constraint')) {
        console.log(`   ❌ ${c.code}:`, e.message);
      }
    }
  }
  console.log(`   ✅ ${countryCount} new countries\n`);

  // 4. NEW CITIES
  console.log('🏙️ Creating New Cities...');
  const countries = await prisma.country.findMany();
  const sa = countries.find(c => c.code === 'SA');
  const qa = countries.find(c => c.code === 'QA');
  const bh = countries.find(c => c.code === 'BH');
  const om = countries.find(c => c.code === 'OM');
  const vn = countries.find(c => c.code === 'VN');

  const newCitiesData = [
    { name: 'Riyadh', nameAr: 'الرياض', country: sa, lat: 24.7136, lng: 46.6753 },
    { name: 'Jeddah', nameAr: 'جدة', country: sa, lat: 21.5433, lng: 39.1728 },
    { name: 'Doha', nameAr: 'الدوحة', country: qa, lat: 25.2854, lng: 51.5310 },
    { name: 'Manama', nameAr: 'المنامة', country: bh, lat: 26.2285, lng: 50.5860 },
    { name: 'Muscat', nameAr: 'مسقط', country: om, lat: 23.5880, lng: 58.3829 },
    { name: 'Ho Chi Minh City', nameAr: 'مدينة هوشي منه', country: vn, lat: 10.8231, lng: 106.6297 },
    { name: 'Hanoi', nameAr: 'هانوي', country: vn, lat: 21.0285, lng: 105.8542 },
  ];

  let cityCount = 0;
  for (const c of newCitiesData) {
    if (!c.country) continue;
    try {
      await prisma.city.create({
        data: {
          name: c.name,
          nameAr: c.nameAr,
          countryId: c.country.id,
          latitude: c.lat,
          longitude: c.lng,
          isActive: true,
        },
      });
      cityCount++;
    } catch (e: any) {
      if (!e.message.includes('Unique constraint')) {
        console.log(`   ⚠️  ${c.name}:`, e.message.split('\n')[0]);
      }
    }
  }
  console.log(`   ✅ ${cityCount} new cities\n`);

  // Summary
  const finalCounts = {
    countries: await prisma.country.count(),
    cities: await prisma.city.count(),
    currencies: await prisma.currency.count(),
    languages: await prisma.language.count(),
  };

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ MISSING DATA SEED COMPLETED!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Database Summary:
  🌍 ${finalCounts.countries} Countries (was 3, added 5)
  🏙️ ${finalCounts.cities} Cities (was 4, added 7)
  💰 ${finalCounts.currencies} Currencies (was 0, added 11)
  🌐 ${finalCounts.languages} Languages (was 0, added 16)

🎉 All missing data loaded successfully!
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
