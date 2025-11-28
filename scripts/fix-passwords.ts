import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('\n🔐 Mise à jour des mots de passe...\n');
  
  // Hash pour "admin123"
  const passwordHash = await bcrypt.hash('admin123', 10);
  console.log(`✅ Hash créé pour "admin123"\n`);
  
  const users = [
    'admin@communityhub.com',
    'customer@test.com',
    'provider@test.com',
    'manager@test.com',
  ];
  
  for (const email of users) {
    const result = await prisma.user.update({
      where: { email },
      data: { password: passwordHash },
    });
    console.log(`✅ ${email} - mot de passe mis à jour`);
  }
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ TOUS LES MOTS DE PASSE SONT MAINTENANT: admin123');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  // Test de vérification
  console.log('🧪 Vérification...\n');
  
  for (const email of users) {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { email: true, password: true },
    });
    
    if (user?.password) {
      const isValid = await bcrypt.compare('admin123', user.password);
      console.log(`${isValid ? '✅' : '❌'} ${email}: ${isValid ? 'OK' : 'ERREUR'}`);
    }
  }
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🎉 VOUS POUVEZ MAINTENANT VOUS CONNECTER!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
