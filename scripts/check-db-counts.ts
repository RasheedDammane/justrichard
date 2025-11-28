import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkCounts() {
  console.log('🔍 Vérification des compteurs en DB...\n');

  const counts = {
    doctors: await prisma.doctor.count(),
    lawyers: await prisma.lawyer.count(),
    coaches: await prisma.coach.count(),
    maids: await prisma.maid.count(),
    motorbikes: await prisma.rentalMotorbike.count(),
    rentalCars: await prisma.rentalCar.count(),
    yachts: await prisma.yacht.count(),
    transfers: await prisma.transfer.count(),
    activities: await prisma.activity.count(),
    suppliers: await prisma.supplier.count(),
    currencies: await prisma.currency.count(),
    countries: await prisma.country.count(),
    exchangeRates: await prisma.exchangeRate.count(),
    properties: await prisma.property.count(),
    foodProducts: await prisma.foodProduct.count(),
    events: await prisma.event.count(),
  };

  console.log('📊 COMPTEURS EN BASE DE DONNÉES:\n');
  console.log('👥 PROVIDERS:');
  console.log(`   Doctors:        ${counts.doctors}`);
  console.log(`   Lawyers:        ${counts.lawyers}`);
  console.log(`   Coaches:        ${counts.coaches}`);
  console.log(`   Maids:          ${counts.maids}`);
  
  console.log('\n🚗 VÉHICULES:');
  console.log(`   Motorbikes:     ${counts.motorbikes}`);
  console.log(`   Rental Cars:    ${counts.rentalCars}`);
  console.log(`   Yachts:         ${counts.yachts}`);
  
  console.log('\n🎯 SERVICES:');
  console.log(`   Transfers:      ${counts.transfers}`);
  console.log(`   Activities:     ${counts.activities}`);
  console.log(`   Suppliers:      ${counts.suppliers}`);
  
  console.log('\n💱 SYSTÈME:');
  console.log(`   Currencies:     ${counts.currencies}`);
  console.log(`   Countries:      ${counts.countries}`);
  console.log(`   Exchange Rates: ${counts.exchangeRates}`);
  
  console.log('\n🏠 AUTRES:');
  console.log(`   Properties:     ${counts.properties}`);
  console.log(`   Food Products:  ${counts.foodProducts}`);
  console.log(`   Events:         ${counts.events}`);
  
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  console.log(`\n✅ TOTAL: ${total} enregistrements`);

  await prisma.$disconnect();
}

checkCounts()
  .catch((e) => {
    console.error('❌ Erreur:', e);
    process.exit(1);
  });
