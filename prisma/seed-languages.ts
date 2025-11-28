import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const languages = [
  {
    id: 'lang-en',
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    isRTL: false,
    isDefault: true,
    isActive: true,
  },
  {
    id: 'lang-fr',
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    isRTL: false,
    isDefault: false,
    isActive: true,
  },
  {
    id: 'lang-ar',
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    isRTL: true,
    isDefault: false,
    isActive: true,
  },
  {
    id: 'lang-th',
    code: 'th',
    name: 'Thai',
    nativeName: 'ไทย',
    flag: '🇹🇭',
    isRTL: false,
    isDefault: false,
    isActive: true,
  },
  {
    id: 'lang-ru',
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    flag: '🇷🇺',
    isRTL: false,
    isDefault: false,
    isActive: false,
  },
  {
    id: 'lang-ko',
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    flag: '🇰🇷',
    isRTL: false,
    isDefault: false,
    isActive: false,
  },
  {
    id: 'lang-es',
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    isRTL: false,
    isDefault: false,
    isActive: false,
  },
  {
    id: 'lang-vi',
    code: 'vi',
    name: 'Vietnamese',
    nativeName: 'Tiếng Việt',
    flag: '🇻🇳',
    isRTL: false,
    isDefault: false,
    isActive: false,
  },
  {
    id: 'lang-tl',
    code: 'tl',
    name: 'Tagalog',
    nativeName: 'Tagalog',
    flag: '🇵🇭',
    isRTL: false,
    isDefault: false,
    isActive: false,
  },
];

async function seedLanguages() {
  console.log('🌐 Seeding languages...\n');

  for (const language of languages) {
    const existing = await prisma.language.findUnique({
      where: { code: language.code },
    });

    if (!existing) {
      await prisma.language.create({
        data: language,
      });
      console.log(`✅ Created language: ${language.name} (${language.nativeName})`);
    } else {
      console.log(`⏭️  Language already exists: ${language.name}`);
    }
  }

  console.log('\n✨ Language seeding completed!\n');

  // Display statistics
  const stats = await prisma.language.count();
  console.log(`📊 Total languages: ${stats}`);
}

seedLanguages()
  .catch((error) => {
    console.error('❌ Error seeding languages:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
