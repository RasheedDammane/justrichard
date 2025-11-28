import { prisma } from '../lib/prisma';

async function listUsers() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('👥 LISTE DES UTILISATEURS');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });

    console.log(`📊 Total: ${users.length} utilisateurs\n`);

    users.forEach((user, index) => {
      console.log(`\n${index + 1}. ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
      console.log(`   🆔 ID: ${user.id}`);
      console.log(`   📧 Email: ${user.email}`);
      console.log(`   👤 Nom: ${user.firstName || 'N/A'} ${user.lastName || 'N/A'}`);
      console.log(`   📱 Téléphone: ${user.phone || 'N/A'}`);
      console.log(`   🎭 Rôle: ${user.role || 'N/A'}`);
      console.log(`   ✅ Actif: ${user.isActive ? 'Oui' : 'Non'}`);
      console.log(`   ✉️  Email vérifié: ${user.emailVerified ? 'Oui' : 'Non'}`);
      console.log(`   🖼️  Avatar: ${user.avatar ? 'Oui' : 'Non'}`);
      console.log(`   🌍 Locale: ${user.locale || 'N/A'}`);
      console.log(`   🕐 Timezone: ${user.timezone || 'N/A'}`);
      console.log(`   🔑 A un mot de passe: ${user.password ? 'Oui' : 'Non'}`);
      console.log(`   📅 Créé le: ${user.createdAt.toLocaleString('fr-FR')}`);
      console.log(`   🔄 Mis à jour: ${user.updatedAt.toLocaleString('fr-FR')}`);
    });

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 RÉSUMÉ PAR RÔLE');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    const roleCount: Record<string, number> = {};
    users.forEach(user => {
      const role = user.role || 'NO_ROLE';
      roleCount[role] = (roleCount[role] || 0) + 1;
    });

    Object.entries(roleCount).sort((a, b) => b[1] - a[1]).forEach(([role, count]) => {
      console.log(`   ${role.padEnd(15)} : ${count} utilisateur(s)`);
    });

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔐 COMPTES DE TEST POUR LOGIN');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    const testUsers = users.filter(u => 
      u.email?.includes('test.com') || 
      u.email?.includes('communityhub.com')
    );

    if (testUsers.length > 0) {
      console.log('📝 Comptes de test disponibles:\n');
      testUsers.forEach(user => {
        console.log(`   ┌─────────────────────────────────────────────────────`);
        console.log(`   │ Email:    ${user.email}`);
        console.log(`   │ Rôle:     ${user.role || 'N/A'}`);
        console.log(`   │ Actif:    ${user.isActive ? '✅ Oui' : '❌ Non'}`);
        console.log(`   │ Password: ${user.password ? '✅ Configuré' : '❌ Non configuré'}`);
        console.log(`   │ Test:     admin123`);
        console.log(`   └─────────────────────────────────────────────────────\n`);
      });
    } else {
      console.log('   ❌ Aucun compte de test trouvé\n');
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

listUsers();
