import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Toutes les devises nécessaires
const currencies = [
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', decimalPlaces: 2 },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', decimalPlaces: 2 },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', decimalPlaces: 0 },
  { code: 'BHD', name: 'Bahraini Dinar', symbol: 'BD', decimalPlaces: 3 },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', decimalPlaces: 0 },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', decimalPlaces: 2 },
  { code: 'MAD', name: 'Moroccan Dirham', symbol: 'DH', decimalPlaces: 2 },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', decimalPlaces: 2 },
  { code: 'QAR', name: 'Qatari Riyal', symbol: 'QR', decimalPlaces: 2 },
  { code: 'SAR', name: 'Saudi Riyal', symbol: 'SR', decimalPlaces: 2 },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', decimalPlaces: 2 },
  { code: 'EUR', name: 'Euro', symbol: '€', decimalPlaces: 2 },
  { code: 'USD', name: 'US Dollar', symbol: '$', decimalPlaces: 2 },
  { code: 'GBP', name: 'British Pound', symbol: '£', decimalPlaces: 2 },
];

async function addAllMissingCurrencies() {
  console.log('💰 Ajout de toutes les devises manquantes...\n');

  try {
    let added = 0;
    let existing = 0;
    let errors = 0;

    for (const currency of currencies) {
      try {
        // Vérifier si la devise existe
        const existingCurrency = await prisma.currency.findFirst({
          where: { code: currency.code }
        });

        if (existingCurrency) {
          console.log(`✓ ${currency.code} - ${currency.name} (existe déjà)`);
          existing++;
          continue;
        }

        // Créer la devise
        await prisma.currency.create({
          data: {
            id: `curr-${currency.code.toLowerCase()}`,
            code: currency.code,
            name: currency.name,
            symbol: currency.symbol,
            exchangeRate: 1.0,
            isActive: true,
            isDefault: currency.code === 'USD',
            decimalPlaces: currency.decimalPlaces,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        });

        console.log(`✨ ${currency.code} - ${currency.name} (créée)`);
        added++;

      } catch (error: any) {
        console.error(`❌ Erreur pour ${currency.code}:`, error.message);
        errors++;
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 RÉSUMÉ:');
    console.log(`   ✨ Créées: ${added}`);
    console.log(`   ✓ Existantes: ${existing}`);
    console.log(`   ❌ Erreurs: ${errors}`);
    console.log(`   📊 Total: ${currencies.length}`);
    console.log('='.repeat(60));
    console.log('\n✅ Terminé!\n');

  } catch (error: any) {
    console.error('❌ Erreur globale:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

addAllMissingCurrencies();
