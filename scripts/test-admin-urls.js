/**
 * Script pour tester automatiquement toutes les URLs admin
 * et identifier les erreurs "Cannot read properties of undefined (reading 'findMany')"
 */

const http = require('http');

const BASE_URL = 'http://localhost:3254';

const ADMIN_URLS = [
  '/en/admin',
  '/en/admin/users',
  '/en/admin/properties',
  '/en/admin/services',
  '/en/admin/bookings',
  '/en/admin/categories',
  '/en/admin/partners',
  '/en/admin/doctors',
  '/en/admin/lawyers',
  '/en/admin/coaches',
  '/en/admin/maids',
  '/en/admin/home-cleaning',
  '/en/admin/furniture-cleaning',
  '/en/admin/laundry',
  '/en/admin/rental-cars',
  '/en/admin/motorbikes',
  '/en/admin/yachts',
  '/en/admin/food/products',
  '/en/admin/moving',
  '/en/admin/parcel',
  '/en/admin/events',
  '/en/admin/transfers',
  '/en/admin/activities',
  '/en/admin/suppliers',
  '/en/admin/blog',
  '/en/admin/chatbots',
  '/en/admin/notifications',
  '/en/admin/analytics',
  '/en/admin/promotions',
  '/en/admin/cms',
  '/en/admin/cms-pages',
  '/en/admin/media',
  '/en/admin/data',
  '/en/admin/simulators',
  '/en/admin/crypto-payments',
  '/en/admin/logs',
  '/en/admin/currencies',
  '/en/admin/geography',
  '/en/admin/exchange-rates',
  '/en/admin/styles',
  '/en/admin/routes',
];

async function testUrl(url) {
  return new Promise((resolve) => {
    const fullUrl = `${BASE_URL}${url}`;
    
    http.get(fullUrl, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const hasError = data.includes('Cannot read properties of undefined') ||
                        data.includes('prisma') && data.includes('undefined') ||
                        data.includes('An unexpected error occurred');
        
        resolve({
          url,
          status: res.statusCode,
          hasError,
          errorType: hasError ? (data.match(/Cannot read properties of undefined \(reading '(\w+)'\)/) || [])[1] : null,
        });
      });
    }).on('error', (err) => {
      resolve({
        url,
        status: 0,
        hasError: true,
        errorType: 'CONNECTION_ERROR',
        error: err.message,
      });
    });
  });
}

async function testAllUrls() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🧪 TEST DES URLs ADMIN');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Total URLs à tester: ${ADMIN_URLS.length}\n`);

  const results = [];
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < ADMIN_URLS.length; i++) {
    const url = ADMIN_URLS[i];
    process.stdout.write(`[${i + 1}/${ADMIN_URLS.length}] Testing ${url}... `);
    
    const result = await testUrl(url);
    results.push(result);
    
    if (result.hasError) {
      console.log(`❌ ERROR (${result.errorType || 'UNKNOWN'})`);
      errorCount++;
    } else if (result.status === 200) {
      console.log('✅ OK');
      successCount++;
    } else {
      console.log(`⚠️  ${result.status}`);
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 RÉSULTATS');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  console.log(`✅ Succès: ${successCount}`);
  console.log(`❌ Erreurs: ${errorCount}`);
  console.log(`⚠️  Autres: ${ADMIN_URLS.length - successCount - errorCount}\n`);

  if (errorCount > 0) {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('❌ URLs AVEC ERREURS');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    const errorsByType = {};
    
    results
      .filter(r => r.hasError)
      .forEach(r => {
        const errorType = r.errorType || 'UNKNOWN';
        if (!errorsByType[errorType]) {
          errorsByType[errorType] = [];
        }
        errorsByType[errorType].push(r.url);
      });
    
    Object.keys(errorsByType).forEach(errorType => {
      console.log(`\n🔴 ${errorType}:`);
      errorsByType[errorType].forEach(url => {
        console.log(`   • ${url}`);
      });
    });
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ TEST TERMINÉ');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  return results;
}

testAllUrls().catch(console.error);
