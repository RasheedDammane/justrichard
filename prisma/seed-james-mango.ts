#!/usr/bin/env tsx

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🏍️ Seeding James Rental Samui + Mango Clean Pattaya...\n');

  const countries = await prisma.country.findMany();
  const cities = await prisma.city.findMany();
  const users = await prisma.user.findMany({ take: 20 });

  const thailand = countries.find(c => c.code === 'TH');
  const kohSamui = cities.find(c => c.name === 'Koh Samui');
  const pattaya = cities.find(c => c.name === 'Pattaya');

  if (!thailand || !kohSamui || !pattaya) {
    console.log('❌ Thailand, Koh Samui or Pattaya not found');
    return;
  }

  // 1. JAMES RENTAL SAMUI - Scooters
  console.log('🏍️ Creating James Rental Samui Scooters...');
  const jamesScooters = [
    // Premium 750cc
    { name: 'Honda X-ADV 750 2025', brand: 'Honda', model: 'X-ADV 750', cc: 750, year: 2025, priceDay: 2900, priceWeek: 2600 },
    { name: 'Honda X-ADV 750 2023', brand: 'Honda', model: 'X-ADV 750', cc: 750, year: 2023, priceDay: 2700, priceWeek: 2300 },
    
    // Premium 500-560cc
    { name: 'Yamaha T-Max 530cc', brand: 'Yamaha', model: 'T-Max', cc: 530, year: 2023, priceDay: 1490, priceWeek: 1300 },
    { name: 'Yamaha T-Max 560cc 2022', brand: 'Yamaha', model: 'T-Max', cc: 560, year: 2022, priceDay: 1999, priceWeek: 1700 },
    
    // 350cc
    { name: 'Honda ADV 350', brand: 'Honda', model: 'ADV 350', cc: 350, year: 2023, priceDay: 999, priceWeek: 850 },
    { name: 'Yamaha X-Max 350 2023', brand: 'Yamaha', model: 'X-Max 350', cc: 350, year: 2023, priceDay: 990, priceWeek: 900 },
    { name: 'Honda Forza 350 2022', brand: 'Honda', model: 'Forza 350', cc: 350, year: 2022, priceDay: 999, priceWeek: 800 },
    
    // 300cc
    { name: 'Yamaha X-Max 300 2022', brand: 'Yamaha', model: 'X-Max 300', cc: 300, year: 2022, priceDay: 800, priceWeek: 700 },
    { name: 'Honda Forza 300', brand: 'Honda', model: 'Forza 300', cc: 300, year: 2023, priceDay: 800, priceWeek: 700 },
    { name: 'Honda CRF 300 2023', brand: 'Honda', model: 'CRF 300', cc: 300, year: 2023, priceDay: 890, priceWeek: 750 },
    
    // 150-160cc
    { name: 'Honda ADV 160', brand: 'Honda', model: 'ADV 160', cc: 160, year: 2023, priceDay: 499, priceWeek: 450 },
    { name: 'Yamaha N-Max 155cc 2022', brand: 'Yamaha', model: 'N-Max', cc: 155, year: 2022, priceDay: 400, priceWeek: 350 },
    { name: 'Yamaha N-Max 155cc', brand: 'Yamaha', model: 'N-Max', cc: 155, year: 2023, priceDay: 350, priceWeek: 300 },
    { name: 'Honda ADV 150', brand: 'Honda', model: 'ADV 150', cc: 150, year: 2023, priceDay: 400, priceWeek: 350 },
    { name: 'Honda PCX 150', brand: 'Honda', model: 'PCX 150', cc: 150, year: 2023, priceDay: 350, priceWeek: 300 },
    
    // 110-125cc
    { name: 'Yamaha Filano 125cc 2023', brand: 'Yamaha', model: 'Filano', cc: 125, year: 2023, priceDay: 300, priceWeek: 270 },
    { name: 'Honda Click 125', brand: 'Honda', model: 'Click 125', cc: 125, year: 2023, priceDay: 200, priceWeek: 160 },
    { name: 'Honda Zoomer 125', brand: 'Honda', model: 'Zoomer', cc: 125, year: 2023, priceDay: 200, priceWeek: 160 },
    { name: 'Honda Scoopy 110', brand: 'Honda', model: 'Scoopy', cc: 110, year: 2023, priceDay: 200, priceWeek: 160 },
  ];

  let scooterCount = 0;
  for (const scooter of jamesScooters) {
    try {
      await prisma.vehicle.create({
        data: {
          ownerId: users[Math.floor(Math.random() * users.length)]?.id || users[0].id,
          name: scooter.name,
          description: `${scooter.brand} ${scooter.model} ${scooter.cc}cc (${scooter.year}) - Premium rental from James Rental Samui. 180 motorbikes fleet, governmental insurance included.`,
          vehicleType: scooter.cc >= 300 ? 'MOTORCYCLE' : 'SCOOTER',
          brand: scooter.brand,
          model: scooter.model,
          year: scooter.year,
          cityId: kohSamui.id,
          countryId: thailand.id,
          pricePerDay: scooter.priceDay,
          pricePerWeek: scooter.priceWeek * 7,
          pricePerMonth: scooter.priceWeek * 30,
          isAvailable: true,
          images: [],
          features: ['Automatic Gear', 'Governmental Insurance', 'Front & Rear Disc Brake', 'Helmet Included'],
        },
      });
      scooterCount++;
    } catch (e: any) {
      if (!e.message.includes('Unique')) {
        console.log(`   ⚠️  ${scooter.name}`);
      }
    }
  }
  console.log(`   ✅ ${scooterCount} James Rental scooters\n`);

  // 2. MANGO CLEAN PATTAYA - Services
  console.log('🧹 Creating Mango Clean Services...');
  
  // Get or create Home Cleaning category
  let cleaningCategory = await prisma.category.findFirst({
    where: { slug: 'home-cleaning' }
  });

  if (!cleaningCategory) {
    cleaningCategory = await prisma.category.create({
      data: {
        slug: 'home-cleaning',
        icon: '🧹',
        order: 1,
        isActive: true,
      },
    });
    
    await prisma.categoryTranslation.create({
      data: {
        categoryId: cleaningCategory.id,
        locale: 'en',
        name: 'Home Cleaning',
        description: 'Professional home cleaning services',
      },
    });
  }

  const mangoServices = [
    // Regular Cleaning
    { name: 'Studio Cleaning (20-30 sqm)', type: 'REGULAR', size: '20-30', price: 490 },
    { name: 'Big Studio Cleaning (30-45 sqm)', type: 'REGULAR', size: '30-45', price: 590 },
    { name: '1 Bedroom Cleaning (35-45 sqm)', type: 'REGULAR', size: '35-45', price: 690 },
    { name: '1 Bedroom Cleaning (45-60 sqm)', type: 'REGULAR', size: '45-60', price: 850 },
    { name: '2 Bedroom Cleaning (60-80 sqm)', type: 'REGULAR', size: '60-80', price: 990 },
    { name: '2-3 Bedroom Cleaning (80-100 sqm)', type: 'REGULAR', size: '80-100', price: 1190 },
    { name: '2-3 Bedroom Cleaning (100-140 sqm)', type: 'REGULAR', size: '100-140', price: 1390 },
    { name: '3-4 Bedroom Cleaning (140-160 sqm)', type: 'REGULAR', size: '140-160', price: 1590 },
    { name: 'House Cleaning (70-100 sqm)', type: 'REGULAR', size: '70-100', price: 1490 },
    { name: 'House Cleaning (100-130 sqm)', type: 'REGULAR', size: '100-130', price: 1850 },
    { name: 'Villa Cleaning (300+ sqm)', type: 'REGULAR', size: '300+', price: 5250 },
    
    // Deep Cleaning
    { name: 'Studio Deep Cleaning (20-30 sqm)', type: 'DEEP', size: '20-30', price: 750 },
    { name: '1 Bedroom Deep Cleaning (35-45 sqm)', type: 'DEEP', size: '35-45', price: 1090 },
    { name: '2 Bedroom Deep Cleaning (60-80 sqm)', type: 'DEEP', size: '60-80', price: 1890 },
    { name: 'House Deep Cleaning (70-100 sqm)', type: 'DEEP', size: '70-100', price: 2990 },
    { name: 'Villa Deep Cleaning (300+ sqm)', type: 'DEEP', size: '300+', price: 10500 },
    
    // Mattress & Sofa
    { name: 'Mattress Cleaning (120-160 cm)', type: 'MATTRESS', size: '120-160', price: 1290 },
    { name: 'Mattress Cleaning (160-170 cm)', type: 'MATTRESS', size: '160-170', price: 1590 },
    { name: 'Mattress Cleaning (180-200 cm)', type: 'MATTRESS', size: '180-200', price: 1890 },
    { name: 'Sofa Cleaning (2 Seaters)', type: 'SOFA', size: '2 seats', price: 1390 },
    { name: 'Sofa Cleaning (3 Seaters)', type: 'SOFA', size: '3 seats', price: 2190 },
    { name: 'Sofa Cleaning (L-shape)', type: 'SOFA', size: 'L-shape', price: 2590 },
  ];

  let serviceCount = 0;
  for (const svc of mangoServices) {
    try {
      const service = await prisma.service.create({
        data: {
          categoryId: cleaningCategory.id,
          slug: `mango-clean-${svc.type.toLowerCase()}-${svc.size.replace(/[^a-z0-9]/gi, '-')}`,
          icon: svc.type === 'REGULAR' ? '🧹' : svc.type === 'DEEP' ? '✨' : svc.type === 'MATTRESS' ? '🛏️' : '🛋️',
          duration: svc.type === 'DEEP' ? 240 : 120,
          isActive: true,
          basePrice: svc.price,
          currency: 'THB',
        },
      });

      await prisma.serviceTranslation.create({
        data: {
          serviceId: service.id,
          locale: 'en',
          name: svc.name,
          description: `Professional ${svc.type.toLowerCase()} cleaning service by Mango Clean Pattaya. Size: ${svc.size} sqm.`,
        },
      });

      serviceCount++;
    } catch (e: any) {
      if (!e.message.includes('Unique')) {
        console.log(`   ⚠️  ${svc.name}`);
      }
    }
  }
  console.log(`   ✅ ${serviceCount} Mango Clean services\n`);

  // Summary
  const totalVehicles = await prisma.vehicle.count();
  const totalServices = await prisma.service.count();
  const samuiVehicles = await prisma.vehicle.count({ where: { cityId: kohSamui.id } });

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ JAMES RENTAL + MANGO CLEAN COMPLETED!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Summary:
  🏍️ ${scooterCount} James Rental scooters (Koh Samui)
  🧹 ${serviceCount} Mango Clean services (Pattaya)
  
  🚗 ${samuiVehicles} total vehicles in Koh Samui
  🛠️ ${totalServices} total services in database
  🌍 ${totalVehicles} total vehicles in database

🌐 Test:
  curl "http://localhost:3000/api/vehicles?city=koh-samui" | jq
  curl "http://localhost:3000/api/services?category=home-cleaning" | jq

🎉 Real data from James Rental Samui & Mango Clean Pattaya loaded!
  `);
}

main()
  .catch((e) => {
    console.error('\n❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
