import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const languages = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
    isDefault: true,
    isActive: true,
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    direction: 'ltr',
    isDefault: false,
    isActive: true,
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    direction: 'rtl',
    isDefault: false,
    isActive: true,
  },
  {
    code: 'th',
    name: 'Thai',
    nativeName: 'ไทย',
    direction: 'ltr',
    isDefault: false,
    isActive: true,
  },
  {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    direction: 'ltr',
    isDefault: false,
    isActive: true,
  },
  {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    direction: 'ltr',
    isDefault: false,
    isActive: true,
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    direction: 'ltr',
    isDefault: false,
    isActive: true,
  },
  {
    code: 'vi',
    name: 'Vietnamese',
    nativeName: 'Tiếng Việt',
    direction: 'ltr',
    isDefault: false,
    isActive: true,
  },
  {
    code: 'tl',
    name: 'Tagalog',
    nativeName: 'Tagalog',
    direction: 'ltr',
    isDefault: false,
    isActive: true,
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
