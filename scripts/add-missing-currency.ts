import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addMissingCurrency() {
  console.log('💰 Ajout de la devise BHD...\n');

  try {
    // Vérifier si BHD existe
    const existing = await prisma.currency.findFirst({
      where: { code: 'BHD' }
    });

    if (existing) {
      console.log('✅ BHD existe déjà:', existing.name);
      return;
    }

    // Créer BHD
    const bhd = await prisma.currency.create({
      data: {
        id: `curr-bhd`,
        code: 'BHD',
        name: 'Bahraini Dinar',
        symbol: 'BD',
        exchangeRate: 1.0,
        isActive: true,
        isDefault: false,
        decimalPlaces: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    });

    console.log('✨ Devise BHD créée avec succès!');
    console.log(JSON.stringify(bhd, null, 2));

  } catch (error: any) {
    console.error('❌ Erreur:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

addMissingCurrency();
