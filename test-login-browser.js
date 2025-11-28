/**
 * Test automatisé du login avec Playwright
 * Lance un navigateur, se connecte, et vérifie la redirection
 */

const { chromium } = require('playwright');

async function testLogin() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🧪 TEST AUTOMATISÉ DU LOGIN');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  let browser;
  try {
    // Lancer le navigateur
    console.log('1️⃣  Lancement du navigateur...');
    browser = await chromium.launch({ 
      headless: false, // Mode visible pour voir ce qui se passe
      slowMo: 500 // Ralentir pour voir les actions
    });
    
    const context = await browser.newContext();
    const page = await context.newPage();

    // Activer les logs console du navigateur
    page.on('console', msg => {
      const text = msg.text();
      if (text.includes('[LOGIN]') || text.includes('[CUSTOM]')) {
        console.log('   📱 Console navigateur:', text);
      }
    });

    // Aller sur la page de login
    console.log('\n2️⃣  Navigation vers la page de login...');
    await page.goto('http://localhost:3254/en/auth/login');
    console.log('   ✅ Page chargée');

    // Attendre que la page soit complètement chargée
    await page.waitForLoadState('networkidle');

    // Prendre un screenshot
    await page.screenshot({ path: '/tmp/login-page.png' });
    console.log('   📸 Screenshot: /tmp/login-page.png');

    // Chercher le bouton "Login as Admin"
    console.log('\n3️⃣  Recherche du bouton "Login as Admin"...');
    const adminButton = await page.locator('button:has-text("Login as Admin")').first();
    
    if (await adminButton.count() === 0) {
      console.log('   ❌ Bouton non trouvé! Voici les boutons disponibles:');
      const buttons = await page.locator('button').all();
      for (const btn of buttons) {
        const text = await btn.textContent();
        console.log('      -', text?.trim());
      }
      throw new Error('Bouton "Login as Admin" non trouvé');
    }
    
    console.log('   ✅ Bouton trouvé');

    // Vérifier les cookies AVANT le login
    console.log('\n4️⃣  Cookies AVANT login:');
    const cookiesBefore = await context.cookies();
    console.log('   Nombre de cookies:', cookiesBefore.length);
    cookiesBefore.forEach(c => {
      console.log(`   - ${c.name}: ${c.value.substring(0, 50)}...`);
    });

    // Cliquer sur le bouton
    console.log('\n5️⃣  Clic sur "Login as Admin"...');
    await adminButton.click();
    console.log('   ✅ Bouton cliqué');

    // Attendre un peu pour que la requête se fasse
    await page.waitForTimeout(2000);

    // Vérifier les cookies APRÈS le login
    console.log('\n6️⃣  Cookies APRÈS login:');
    const cookiesAfter = await context.cookies();
    console.log('   Nombre de cookies:', cookiesAfter.length);
    cookiesAfter.forEach(c => {
      console.log(`   - ${c.name}: ${c.value.substring(0, 50)}...`);
    });

    // Vérifier si le cookie de session existe
    const sessionCookie = cookiesAfter.find(c => c.name === 'next-auth.session-token');
    if (sessionCookie) {
      console.log('\n   ✅ Cookie de session trouvé!');
      console.log('   📋 Détails:');
      console.log('      - httpOnly:', sessionCookie.httpOnly);
      console.log('      - secure:', sessionCookie.secure);
      console.log('      - sameSite:', sessionCookie.sameSite);
      console.log('      - path:', sessionCookie.path);
      console.log('      - domain:', sessionCookie.domain);
    } else {
      console.log('\n   ❌ Cookie de session NON trouvé!');
    }

    // Attendre la navigation
    console.log('\n7️⃣  Attente de la redirection...');
    await page.waitForTimeout(2000);

    // Vérifier l'URL actuelle
    const currentUrl = page.url();
    console.log('   URL actuelle:', currentUrl);

    // Prendre un screenshot après login
    await page.screenshot({ path: '/tmp/after-login.png' });
    console.log('   📸 Screenshot: /tmp/after-login.png');

    // Vérifier si on est sur la page admin
    if (currentUrl.includes('/admin')) {
      console.log('\n   ✅ SUCCÈS! Redirigé vers /admin');
    } else if (currentUrl.includes('/auth/login')) {
      console.log('\n   ❌ ÉCHEC! Toujours sur la page de login');
      console.log('   → Le cookie n\'est pas envoyé ou la session n\'est pas créée');
    } else {
      console.log('\n   ⚠️  Redirigé vers:', currentUrl);
    }

    // Essayer d'accéder directement à /admin
    console.log('\n8️⃣  Test d\'accès direct à /admin...');
    await page.goto('http://localhost:3254/en/admin');
    await page.waitForTimeout(2000);
    
    const finalUrl = page.url();
    console.log('   URL finale:', finalUrl);
    
    await page.screenshot({ path: '/tmp/admin-page.png' });
    console.log('   📸 Screenshot: /tmp/admin-page.png');

    if (finalUrl.includes('/admin')) {
      console.log('   ✅ Accès à /admin réussi!');
    } else {
      console.log('   ❌ Redirigé vers:', finalUrl);
    }

    // Garder le navigateur ouvert pour inspection
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ TEST TERMINÉ');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n📸 Screenshots sauvegardés:');
    console.log('   - /tmp/login-page.png');
    console.log('   - /tmp/after-login.png');
    console.log('   - /tmp/admin-page.png');
    console.log('\n⏸️  Le navigateur reste ouvert pour inspection...');
    console.log('   Appuyez sur Ctrl+C pour fermer\n');

    // Garder le navigateur ouvert
    await new Promise(() => {});

  } catch (error) {
    console.error('\n❌ ERREUR:', error.message);
    console.error(error.stack);
  } finally {
    // Le navigateur sera fermé manuellement
  }
}

// Vérifier si Playwright est installé
try {
  require.resolve('playwright');
  testLogin();
} catch (e) {
  console.log('\n❌ Playwright n\'est pas installé!');
  console.log('\n📦 Installation:');
  console.log('   npm install -D playwright');
  console.log('   npx playwright install chromium');
  console.log('\n💡 Ou utilisez le test manuel dans le navigateur\n');
  process.exit(1);
}
