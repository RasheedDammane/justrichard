import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixCountrySlugs() {
  console.log('🔧 Correction des slugs des pays...\n');

  try {
    // Récupérer tous les pays
    const countries = await prisma.country.findMany();
    console.log(`📊 ${countries.length} pays trouvés\n`);

    let fixed = 0;
    let errors = 0;

    for (const country of countries) {
      try {
        // Générer le slug correct à partir du nom
        const correctSlug = country.name
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '');

        // Vérifier si le slug est incorrect
        if (country.slug !== correctSlug) {
          console.log(`❌ ${country.name} (${country.code})`);
          console.log(`   Slug actuel: "${country.slug}"`);
          console.log(`   Slug correct: "${correctSlug}"`);

          // Mettre à jour
          await prisma.country.update({
            where: { id: country.id },
            data: { 
              slug: correctSlug,
              updatedAt: new Date()
            }
          });

          console.log(`   ✅ Corrigé\n`);
          fixed++;
        } else {
          console.log(`✅ ${country.name} (${country.code}) - Slug OK: "${country.slug}"`);
        }
      } catch (error: any) {
        console.error(`❌ Erreur pour ${country.name}:`, error.message);
        errors++;
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 RÉSUMÉ:');
    console.log(`   ✅ Corrigés: ${fixed}`);
    console.log(`   ✓ Déjà OK: ${countries.length - fixed - errors}`);
    console.log(`   ❌ Erreurs: ${errors}`);
    console.log('='.repeat(60));
    console.log('\n✨ Terminé!\n');

  } catch (error: any) {
    console.error('❌ Erreur globale:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

fixCountrySlugs();
