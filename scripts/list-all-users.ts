import { prisma } from '../lib/prisma';

async function listAllUsers() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('👥 LISTE COMPLÈTE DES UTILISATEURS');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  try {
    // Récupérer tous les users avec leurs relations
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        isActive: true,
        emailVerified: true,
        avatar: true,
        locale: true,
        timezone: true,
        createdAt: true,
        updatedAt: true,
        UserRole: {
          select: {
            Role: {
              select: {
                name: true,
                level: true,
              },
            },
          },
        },
        _count: {
          select: {
            bookings: true,
            reviews: true,
            properties: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    console.log(`📊 Total: ${users.length} utilisateurs\n`);

    users.forEach((user, index) => {
      console.log(`\n${index + 1}. ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
      console.log(`   🆔 ID: ${user.id}`);
      console.log(`   📧 Email: ${user.email}`);
      console.log(`   👤 Nom: ${user.firstName || 'N/A'} ${user.lastName || 'N/A'}`);
      console.log(`   📱 Téléphone: ${user.phone || 'N/A'}`);
      console.log(`   🎭 Rôle direct: ${user.role || 'N/A'}`);
      
      if (user.UserRole && user.UserRole.length > 0) {
        console.log(`   🎭 Rôles (table UserRole):`);
        user.UserRole.forEach((ur) => {
          console.log(`      - ${ur.Role.name} (niveau ${ur.Role.level})`);
        });
      }
      
      console.log(`   ✅ Actif: ${user.isActive ? 'Oui' : 'Non'}`);
      console.log(`   ✉️  Email vérifié: ${user.emailVerified ? 'Oui' : 'Non'}`);
      console.log(`   🖼️  Avatar: ${user.avatar ? 'Oui' : 'Non'}`);
      console.log(`   🌍 Locale: ${user.locale || 'N/A'}`);
      console.log(`   🕐 Timezone: ${user.timezone || 'N/A'}`);
      
      // Statistiques
      console.log(`   📊 Statistiques:`);
      console.log(`      - Réservations: ${user._count.Booking}`);
      console.log(`      - Avis: ${user._count.Review}`);
      console.log(`      - Propriétés: ${user._count.Property}`);
      
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

    Object.entries(roleCount).forEach(([role, count]) => {
      console.log(`   ${role}: ${count} utilisateur(s)`);
    });

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔐 UTILISATEURS DE TEST POUR LOGIN');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    const testUsers = users.filter(u => 
      u.email?.includes('test.com') || 
      u.email?.includes('communityhub.com')
    );

    if (testUsers.length > 0) {
      console.log('📝 Comptes de test disponibles:\n');
      testUsers.forEach(user => {
        console.log(`   Email: ${user.email}`);
        console.log(`   Rôle: ${user.role || 'N/A'}`);
        console.log(`   Actif: ${user.isActive ? '✅' : '❌'}`);
        console.log(`   Mot de passe: admin123 (si configuré)`);
        console.log('');
      });
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

listAllUsers();
