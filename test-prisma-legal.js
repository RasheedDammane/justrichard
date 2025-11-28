const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Test de connexion Prisma - LegalProfessional\n');
  
  try {
    // Test 1: Vérifier que le modèle existe
    console.log('1️⃣ Vérification du modèle...');
    const count = await prisma.legalProfessional.count();
    console.log(`✅ Modèle LegalProfessional existe`);
    console.log(`   Nombre de professionnels: ${count}\n`);
    
    // Test 2: Récupérer tous les professionnels
    console.log('2️⃣ Récupération des professionnels...');
    const professionals = await prisma.legalProfessional.findMany({
      take: 5,
    });
    console.log(`✅ Trouvé ${professionals.length} professionnel(s)`);
    
    if (professionals.length > 0) {
      console.log('\n📋 Premier professionnel:');
      const first = professionals[0];
      console.log(`   - ID: ${first.id}`);
      console.log(`   - Nom: ${first.name}`);
      console.log(`   - Slug: ${first.slug}`);
      console.log(`   - Type: ${first.type}`);
      console.log(`   - Status: ${first.status}`);
    } else {
      console.log('\n⚠️  Aucun professionnel en base de données');
      console.log('   Crée-en un via: http://localhost:3100/fr/admin/legal/new');
    }
    
    // Test 3: Vérifier les professionnels publiés
    console.log('\n3️⃣ Professionnels publiés...');
    const published = await prisma.legalProfessional.findMany({
      where: {
        status: 'PUBLISHED',
        isActive: true,
      },
    });
    console.log(`✅ ${published.length} professionnel(s) publié(s) et actif(s)\n`);
    
    console.log('✅ TOUS LES TESTS RÉUSSIS !');
    console.log('\n🚀 La page /en/legal devrait fonctionner maintenant.');
    console.log('   Redémarre le serveur et teste: http://localhost:3100/en/legal\n');
    
  } catch (error) {
    console.error('\n❌ ERREUR:', error.message);
    console.error('\n📝 Détails:', error);
    console.error('\n🔧 Solutions possibles:');
    console.error('   1. Vérifie que PostgreSQL tourne');
    console.error('   2. Vérifie DATABASE_URL dans .env');
    console.error('   3. Lance: npx prisma db push');
    console.error('   4. Lance: npx prisma generate\n');
  } finally {
    await prisma.$disconnect();
  }
}

main();
