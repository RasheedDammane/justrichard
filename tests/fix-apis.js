#!/usr/bin/env node

/**
 * Script pour tester et déboguer les APIs de booking
 */

const http = require('http');

const BASE_URL = 'http://localhost:3100';
const APIs = [
  '/api/bookings/coach',
  '/api/bookings/yacht',
  '/api/bookings/doctor',
  '/api/bookings/lawyer',
  '/api/bookings/activity',
  '/api/bookings/property',
  '/api/bookings/maid',
  '/api/bookings/scooter',
];

async function testAPI(path) {
  return new Promise((resolve) => {
    const req = http.get(`${BASE_URL}${path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        resolve({
          path,
          status: res.statusCode,
          data: data.substring(0, 200),
        });
      });
    });
    
    req.on('error', (error) => {
      resolve({
        path,
        status: 'ERROR',
        data: error.message,
      });
    });
    
    req.setTimeout(5000, () => {
      req.destroy();
      resolve({
        path,
        status: 'TIMEOUT',
        data: 'Request timeout',
      });
    });
  });
}

async function main() {
  console.log('🔍 Testing Booking APIs...\n');
  
  for (const api of APIs) {
    const result = await testAPI(api);
    const icon = result.status === 200 ? '✅' : '❌';
    console.log(`${icon} ${api}`);
    console.log(`   Status: ${result.status}`);
    console.log(`   Response: ${result.data}`);
    console.log('');
  }
  
  console.log('✅ Test complete');
}

main();
