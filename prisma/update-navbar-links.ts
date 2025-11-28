import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Mise à jour des liens de navigation...\n');

  // Supprimer tous les liens existants
  await prisma.$executeRaw`DELETE FROM "NavbarLink"`;
  console.log('✅ Anciens liens supprimés\n');

  // Nouveaux liens EN
  const linksEN = [
    { locale: 'en', label: 'Home', href: '/en', order: 1 },
    { locale: 'en', label: 'Properties', href: '/en/properties', order: 2 },
    { locale: 'en', label: 'Rental', href: '/en/services/rental', order: 3 },
    { locale: 'en', label: 'Transfer', href: '/en/services/transfer', order: 4 },
    { locale: 'en', label: 'Activities', href: '/en/activities', order: 5 },
  ];

  // Nouveaux liens FR
  const linksFR = [
    { locale: 'fr', label: 'Accueil', href: '/fr', order: 1 },
    { locale: 'fr', label: 'Propriétés', href: '/fr/properties', order: 2 },
    { locale: 'fr', label: 'Location', href: '/fr/services/rental', order: 3 },
    { locale: 'fr', label: 'Transfert', href: '/fr/services/transfer', order: 4 },
    { locale: 'fr', label: 'Activités', href: '/fr/activities', order: 5 },
  ];

  // Nouveaux liens TH
  const linksTH = [
    { locale: 'th', label: 'หน้าแรก', href: '/th', order: 1 },
    { locale: 'th', label: 'อสังหาริมทรัพย์', href: '/th/properties', order: 2 },
    { locale: 'th', label: 'เช่า', href: '/th/services/rental', order: 3 },
    { locale: 'th', label: 'รถรับส่ง', href: '/th/services/transfer', order: 4 },
    { locale: 'th', label: 'กิจกรรม', href: '/th/activities', order: 5 },
  ];

  // Insérer tous les nouveaux liens
  const allLinks = [...linksEN, ...linksFR, ...linksTH];

  for (const link of allLinks) {
    await prisma.$executeRaw`
      INSERT INTO "NavbarLink" (id, locale, label, href, "order", "isActive", "createdAt", "updatedAt")
      VALUES (
        ${`navbar-${link.locale}-${link.order}`},
        ${link.locale},
        ${link.label},
        ${link.href},
        ${link.order},
        true,
        NOW(),
        NOW()
      )
    `;
    console.log(`✅ Créé: ${link.locale} - ${link.label}`);
  }

  console.log('\n🎉 Mise à jour terminée !');
  console.log(`📊 Total: ${allLinks.length} liens créés`);
}

main()
  .catch((e) => {
    console.error('❌ Erreur:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
