import { PrismaClient } from '@prisma/client';
import { compare } from 'bcryptjs';

const prisma = new PrismaClient();

async function testLogin(email: string, password: string) {
  console.log(`\n🔐 Test de connexion pour: ${email}`);
  console.log(`   Mot de passe: ${password}\n`);
  
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      UserRole: {
        include: {
          Role: true,
        },
      },
    },
  });
  
  if (!user) {
    console.log('❌ Utilisateur non trouvé!\n');
    return;
  }
  
  console.log(`✅ Utilisateur trouvé:`);
  console.log(`   ID: ${user.id}`);
  console.log(`   Email: ${user.email}`);
  console.log(`   Nom: ${user.firstName} ${user.lastName}`);
  console.log(`   Role (champ): ${user.role}`);
  console.log(`   Active: ${user.isActive}`);
  console.log(`   Email vérifié: ${user.emailVerified ? 'Oui' : 'Non'}`);
  console.log(`   Password hash: ${user.password?.substring(0, 20)}...`);
  console.log(`   UserRole count: ${user.UserRole.length}`);
  
  if (user.UserRole.length > 0) {
    console.log(`   Roles (table):`);
    user.UserRole.forEach(ur => {
      console.log(`     - ${ur.Role.name} (level: ${ur.Role.level})`);
    });
  }
  
  if (!user.password) {
    console.log('\n❌ Pas de mot de passe défini!\n');
    return;
  }
  
  const isValid = await compare(password, user.password);
  
  if (isValid) {
    console.log(`\n✅ MOT DE PASSE VALIDE!`);
    console.log(`   Le hash correspond au mot de passe fourni.\n`);
  } else {
    console.log(`\n❌ MOT DE PASSE INVALIDE!`);
    console.log(`   Le hash ne correspond pas au mot de passe fourni.\n`);
  }
}

async function main() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🧪 TEST DE CONNEXION');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  await testLogin('admin@communityhub.com', 'admin123');
  await testLogin('customer@test.com', 'admin123');
  await testLogin('provider@test.com', 'admin123');
  await testLogin('manager@test.com', 'admin123');
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
