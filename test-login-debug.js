/**
 * Test de login avec traces détaillées
 */
const { chromium } = require('playwright');

async function testLoginWithTraces() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🧪 TEST LOGIN AVEC TRACES DÉTAILLÉES');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  let browser;
  try {
    // Lancer le navigateur en mode visible
    console.log('1️⃣  Lancement du navigateur...');
    browser = await chromium.launch({ 
      headless: false,
      slowMo: 1000 // Ralentir pour voir
    });
    
    const context = await browser.newContext();
    const page = await context.newPage();

    // Tracer toutes les requêtes réseau
    page.on('request', request => {
      console.log('   📤 REQUEST:', request.method(), request.url());
    });

    page.on('response', async response => {
      const url = response.url();
      const status = response.status();
      console.log(`   📥 RESPONSE: ${status} ${url}`);
      
      // Si c'est une redirection
      if (status >= 300 && status < 400) {
        const location = response.headers()['location'];
        console.log(`      ↪️  REDIRECT TO: ${location}`);
      }
    });

    // Tracer les erreurs console
    page.on('console', msg => {
      const type = msg.type();
      if (type === 'error' || type === 'warning') {
        console.log(`   🔴 CONSOLE ${type.toUpperCase()}:`, msg.text());
      }
    });

    // Aller sur la page de login
    console.log('\n2️⃣  Navigation vers /en/auth/login...');
    await page.goto('http://localhost:3254/en/auth/login');
    await page.waitForLoadState('networkidle');
    console.log('   ✅ Page chargée');

    // Vérifier les cookies AVANT login
    console.log('\n3️⃣  Cookies AVANT login:');
    const cookiesBefore = await context.cookies();
    if (cookiesBefore.length === 0) {
      console.log('   ℹ️  Aucun cookie');
    } else {
      cookiesBefore.forEach(c => {
        console.log(`   🍪 ${c.name}: ${c.value.substring(0, 30)}...`);
      });
    }

    // Chercher le bouton "Login as Admin"
    console.log('\n4️⃣  Recherche du bouton Login as Admin...');
    const adminButton = page.locator('button:has-text("Login as Admin")').first();
    
    const buttonCount = await adminButton.count();
    if (buttonCount === 0) {
      console.log('   ❌ Bouton non trouvé!');
      await page.screenshot({ path: '/tmp/login-page-error.png' });
      throw new Error('Bouton Login as Admin non trouvé');
    }
    console.log('   ✅ Bouton trouvé');

    // Cliquer sur le bouton
    console.log('\n5️⃣  Clic sur Login as Admin...');
    await adminButton.click();
    console.log('   ✅ Bouton cliqué');

    // Attendre un peu pour voir les requêtes
    console.log('\n6️⃣  Attente des requêtes réseau (3 secondes)...');
    await page.waitForTimeout(3000);

    // Vérifier les cookies APRÈS login
    console.log('\n7️⃣  Cookies APRÈS login:');
    const cookiesAfter = await context.cookies();
    if (cookiesAfter.length === 0) {
      console.log('   ❌ Aucun cookie créé!');
    } else {
      cookiesAfter.forEach(c => {
        console.log(`   🍪 ${c.name}:`);
        console.log(`      Value: ${c.value.substring(0, 50)}...`);
        console.log(`      Domain: ${c.domain}`);
        console.log(`      Path: ${c.path}`);
        console.log(`      HttpOnly: ${c.httpOnly}`);
        console.log(`      Secure: ${c.secure}`);
        console.log(`      SameSite: ${c.sameSite}`);
      });
    }

    // Vérifier le cookie de session NextAuth
    const sessionCookie = cookiesAfter.find(c => 
      c.name === 'next-auth.session-token' || 
      c.name === '__Secure-next-auth.session-token'
    );

    if (sessionCookie) {
      console.log('\n   ✅ Cookie de session NextAuth trouvé!');
    } else {
      console.log('\n   ❌ Cookie de session NextAuth PAS trouvé!');
      console.log('   📋 Cookies disponibles:', cookiesAfter.map(c => c.name).join(', '));
    }

    // Vérifier l'URL actuelle
    console.log('\n8️⃣  URL actuelle:', page.url());

    // Essayer d'aller sur /admin
    console.log('\n9️⃣  Tentative d\'accès à /en/admin...');
    await page.goto('http://localhost:3254/en/admin');
    await page.waitForTimeout(2000);

    const finalUrl = page.url();
    console.log('   URL finale:', finalUrl);

    // Screenshot final
    await page.screenshot({ path: '/tmp/final-page.png' });
    console.log('   📸 Screenshot: /tmp/final-page.png');

    // Résultat
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    if (finalUrl.includes('/admin')) {
      console.log('✅ SUCCÈS! Vous êtes sur /admin');
    } else if (finalUrl.includes('/login')) {
      console.log('❌ ÉCHEC! Redirigé vers login (boucle)');
    } else {
      console.log('⚠️  Sur une autre page:', finalUrl);
    }
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Garder le navigateur ouvert pour inspection
    console.log('⏸️  Navigateur reste ouvert pour inspection...');
    console.log('   Appuyez sur Ctrl+C pour fermer\n');
    await new Promise(() => {}); // Attendre indéfiniment

  } catch (error) {
    console.error('\n❌ ERREUR:', error.message);
    if (error.stack) {
      console.error('Stack:', error.stack);
    }
  }
}

// Vérifier si Playwright est installé
try {
  require.resolve('playwright');
  testLoginWithTraces();
} catch (e) {
  console.log('\n❌ Playwright n\'est pas installé!');
  console.log('\n📦 Installez-le avec:');
  console.log('   npm install -D playwright');
  console.log('   npx playwright install chromium\n');
  process.exit(1);
}
