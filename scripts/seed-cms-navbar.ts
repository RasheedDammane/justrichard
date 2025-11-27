import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Navbar Actions...');

  // English Navbar Actions
  console.log('Creating navbar actions for en...');
  await prisma.navbarAction.upsert({
    where: {
      id: 'navbar-en-login',
    },
    update: {
      locale: 'en',
      label: 'Login',
      href: '/en/auth/login',
      type: 'secondary',
      order: 1,
      isActive: true,
    },
    create: {
      id: 'navbar-en-login',
      locale: 'en',
      label: 'Login',
      href: '/en/auth/login',
      type: 'secondary',
      order: 1,
      isActive: true,
    },
  });

  await prisma.navbarAction.upsert({
    where: {
      id: 'navbar-en-signup',
    },
    update: {
      locale: 'en',
      label: 'Sign Up',
      href: '/en/auth/register',
      type: 'primary',
      order: 2,
      isActive: true,
    },
    create: {
      id: 'navbar-en-signup',
      locale: 'en',
      label: 'Sign Up',
      href: '/en/auth/register',
      type: 'primary',
      order: 2,
      isActive: true,
    },
  });

  // French Navbar Actions
  console.log('Creating navbar actions for fr...');
  await prisma.navbarAction.upsert({
    where: {
      id: 'navbar-fr-login',
    },
    update: {
      locale: 'fr',
      label: 'Connexion',
      href: '/fr/auth/login',
      type: 'secondary',
      order: 1,
      isActive: true,
    },
    create: {
      id: 'navbar-fr-login',
      locale: 'fr',
      label: 'Connexion',
      href: '/fr/auth/login',
      type: 'secondary',
      order: 1,
      isActive: true,
    },
  });

  await prisma.navbarAction.upsert({
    where: {
      id: 'navbar-fr-signup',
    },
    update: {
      locale: 'fr',
      label: 'S\'inscrire',
      href: '/fr/auth/register',
      type: 'primary',
      order: 2,
      isActive: true,
    },
    create: {
      id: 'navbar-fr-signup',
      locale: 'fr',
      label: 'S\'inscrire',
      href: '/fr/auth/register',
      type: 'primary',
      order: 2,
      isActive: true,
    },
  });

  // Arabic Navbar Actions
  console.log('Creating navbar actions for ar...');
  await prisma.navbarAction.upsert({
    where: {
      id: 'navbar-ar-login',
    },
    update: {
      locale: 'ar',
      label: 'تسجيل الدخول',
      href: '/ar/auth/login',
      type: 'secondary',
      order: 1,
      isActive: true,
    },
    create: {
      id: 'navbar-ar-login',
      locale: 'ar',
      label: 'تسجيل الدخول',
      href: '/ar/auth/login',
      type: 'secondary',
      order: 1,
      isActive: true,
    },
  });

  await prisma.navbarAction.upsert({
    where: {
      id: 'navbar-ar-signup',
    },
    update: {
      locale: 'ar',
      label: 'إنشاء حساب',
      href: '/ar/auth/register',
      type: 'primary',
      order: 2,
      isActive: true,
    },
    create: {
      id: 'navbar-ar-signup',
      locale: 'ar',
      label: 'إنشاء حساب',
      href: '/ar/auth/register',
      type: 'primary',
      order: 2,
      isActive: true,
    },
  });

  console.log('✅ Navbar actions seeded successfully!');
  console.log('   - English: 2 actions');
  console.log('   - French: 2 actions');
  console.log('   - Arabic: 2 actions');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
