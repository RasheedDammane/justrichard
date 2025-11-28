import { authOptions } from '../lib/auth';

async function testAuth() {
  console.log('\n🔍 TEST CONFIGURATION NEXTAUTH\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  // Vérifier la configuration
  console.log('📋 Configuration:');
  console.log(`   Secret: ${authOptions.secret ? '✅ Défini' : '❌ Manquant'}`);
  console.log(`   Session strategy: ${authOptions.session?.strategy || 'N/A'}`);
  console.log(`   Session maxAge: ${authOptions.session?.maxAge || 'N/A'} secondes`);
  console.log(`   Debug: ${authOptions.debug ? '✅ Activé' : '❌ Désactivé'}`);
  console.log(`   Providers: ${authOptions.providers?.length || 0}`);
  
  if (authOptions.providers && authOptions.providers.length > 0) {
    console.log(`   Provider type: ${authOptions.providers[0].type}`);
    console.log(`   Provider name: ${authOptions.providers[0].name}`);
  }
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔐 Test de la fonction authorize\n');
  
  // Tester la fonction authorize directement
  const credentialsProvider = authOptions.providers?.find(p => p.type === 'credentials') as any;
  
  if (credentialsProvider && credentialsProvider.authorize) {
    console.log('📧 Test avec: admin@communityhub.com / admin123\n');
    
    const result = await credentialsProvider.authorize({
      email: 'admin@communityhub.com',
      password: 'admin123'
    }, {} as any);
    
    if (result) {
      console.log('✅ AUTHENTIFICATION RÉUSSIE!\n');
      console.log('   Résultat:');
      console.log(`   - ID: ${result.id}`);
      console.log(`   - Email: ${result.email}`);
      console.log(`   - Name: ${result.name}`);
      console.log(`   - Role: ${result.role}`);
      console.log(`   - Image: ${result.image || 'N/A'}`);
    } else {
      console.log('❌ ÉCHEC: authorize() a retourné null/undefined');
      console.log('   Vérifiez les logs [AUTH] ci-dessus pour voir l\'erreur');
    }
  } else {
    console.log('❌ Provider credentials non trouvé!');
  }
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📝 VARIABLES D\'ENVIRONNEMENT\n');
  console.log(`   NEXTAUTH_URL: ${process.env.NEXTAUTH_URL || '❌ Non défini'}`);
  console.log(`   NEXTAUTH_SECRET: ${process.env.NEXTAUTH_SECRET ? '✅ Défini' : '❌ Non défini'}`);
  console.log(`   DATABASE_URL: ${process.env.DATABASE_URL ? '✅ Défini' : '❌ Non défini'}`);
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

testAuth().catch(console.error);
