#!/usr/bin/env tsx

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🏍️ Seeding Pattaya Swiss-Bike Scooters...\n');

  const countries = await prisma.country.findMany();
  const cities = await prisma.city.findMany();
  const users = await prisma.user.findMany({ take: 20 });

  const thailand = countries.find(c => c.code === 'TH');
  const pattaya = cities.find(c => c.name === 'Pattaya');

  if (!thailand || !pattaya) {
    console.log('❌ Thailand or Pattaya not found');
    return;
  }

  // Données réelles de Swiss-Bike Pattaya
  const swissBikeScooters = [
    // 125cc - Budget
    { name: 'Honda Click 125cc Low Cost', brand: 'Honda', model: 'Click 125', cc: 125, year: 2022, priceDay: 150, priceWeek: 900, priceMonth: 3000 },
    { name: 'Honda Click 125cc Standard', brand: 'Honda', model: 'Click 125', cc: 125, year: 2023, priceDay: 180, priceWeek: 1100, priceMonth: 3500 },
    { name: 'Honda Click 125cc 2024/2025', brand: 'Honda', model: 'Click 125', cc: 125, year: 2024, priceDay: 200, priceWeek: 1200, priceMonth: 4000 },
    { name: 'Honda Giorno 125cc 2024/2025', brand: 'Honda', model: 'Giorno', cc: 125, year: 2024, priceDay: 200, priceWeek: 1200, priceMonth: 4000 },
    { name: 'Yamaha Grand Filano 125cc Standard', brand: 'Yamaha', model: 'Grand Filano', cc: 125, year: 2023, priceDay: 180, priceWeek: 1100, priceMonth: 3500 },
    { name: 'Yamaha Grand Filano ABS 125cc 2025', brand: 'Yamaha', model: 'Grand Filano ABS', cc: 125, year: 2025, priceDay: 220, priceWeek: 1300, priceMonth: 4200 },
    
    // 150-160cc - Mid Range
    { name: 'Honda Click 160cc 2024/2025', brand: 'Honda', model: 'Click 160', cc: 160, year: 2024, priceDay: 220, priceWeek: 1300, priceMonth: 4200 },
    { name: 'Honda PCX 150cc 2020 Keyless', brand: 'Honda', model: 'PCX 150', cc: 150, year: 2020, priceDay: 250, priceWeek: 1500, priceMonth: 5000 },
    { name: 'Honda PCX 160cc 2023/24', brand: 'Honda', model: 'PCX 160', cc: 160, year: 2023, priceDay: 280, priceWeek: 1700, priceMonth: 5500 },
    { name: 'Honda PCX 160cc ABS 2025', brand: 'Honda', model: 'PCX 160 ABS', cc: 160, year: 2025, priceDay: 300, priceWeek: 1800, priceMonth: 6000 },
    { name: 'Honda ADV 150cc 2021/2022', brand: 'Honda', model: 'ADV 150', cc: 150, year: 2021, priceDay: 280, priceWeek: 1700, priceMonth: 5500 },
    { name: 'Honda ADV 160cc 2024/2025', brand: 'Honda', model: 'ADV 160', cc: 160, year: 2024, priceDay: 320, priceWeek: 1900, priceMonth: 6500 },
    { name: 'Yamaha Aerox 155cc 2021/2023', brand: 'Yamaha', model: 'Aerox 155', cc: 155, year: 2021, priceDay: 280, priceWeek: 1700, priceMonth: 5500 },
    { name: 'Yamaha Aerox 155cc 2024/2025', brand: 'Yamaha', model: 'Aerox 155', cc: 155, year: 2024, priceDay: 300, priceWeek: 1800, priceMonth: 6000 },
    { name: 'Yamaha NMAX 155cc Low Cost', brand: 'Yamaha', model: 'NMAX 155', cc: 155, year: 2020, priceDay: 250, priceWeek: 1500, priceMonth: 5000 },
    { name: 'Yamaha NMAX 155cc Standard', brand: 'Yamaha', model: 'NMAX 155', cc: 155, year: 2022, priceDay: 270, priceWeek: 1600, priceMonth: 5300 },
    { name: 'Yamaha NMAX 155cc 2022/2023', brand: 'Yamaha', model: 'NMAX 155', cc: 155, year: 2023, priceDay: 280, priceWeek: 1700, priceMonth: 5500 },
    { name: 'Yamaha NMAX 155cc 2024/2025', brand: 'Yamaha', model: 'NMAX 155', cc: 155, year: 2024, priceDay: 300, priceWeek: 1800, priceMonth: 6000 },
    
    // 300-350cc - Premium
    { name: 'Yamaha X-Max 300cc Keyless', brand: 'Yamaha', model: 'X-Max 300', cc: 300, year: 2023, priceDay: 450, priceWeek: 2700, priceMonth: 9000 },
    { name: 'Honda Forza 350cc Keyless', brand: 'Honda', model: 'Forza 350', cc: 350, year: 2023, priceDay: 500, priceWeek: 3000, priceMonth: 10000 },
    { name: 'Honda ADV 350cc Keyless', brand: 'Honda', model: 'ADV 350', cc: 350, year: 2023, priceDay: 550, priceWeek: 3300, priceMonth: 11000 },
  ];

  console.log('🏍️ Creating Swiss-Bike Scooters...');
  let count = 0;

  for (const scooter of swissBikeScooters) {
    try {
      await prisma.vehicle.create({
        data: {
          ownerId: users[Math.floor(Math.random() * users.length)]?.id || users[0].id,
          name: scooter.name,
          description: `${scooter.brand} ${scooter.model} ${scooter.cc}cc (${scooter.year}) - Premium scooter rental from Swiss-Bike Pattaya. Well-maintained, reliable, and perfect for exploring Pattaya.`,
          vehicleType: scooter.cc >= 300 ? 'MOTORCYCLE' : 'SCOOTER',
          brand: scooter.brand,
          model: scooter.model,
          year: scooter.year,
          cityId: pattaya.id,
          countryId: thailand.id,
          pricePerDay: scooter.priceDay,
          pricePerWeek: scooter.priceWeek,
          pricePerMonth: scooter.priceMonth,
          isAvailable: true,
          images: [],
          features: ['Helmet Included', 'Insurance Available', 'Free Delivery', 'Well Maintained'],
        },
      });
      count++;
    } catch (e: any) {
      if (!e.message.includes('Unique')) {
        console.log(`   ⚠️  ${scooter.name}:`, e.message.split('\n')[0]);
      }
    }
  }

  console.log(`   ✅ ${count} scooters created\n`);

  // Summary
  const totalVehicles = await prisma.vehicle.count();
  const pattayaVehicles = await prisma.vehicle.count({
    where: { cityId: pattaya.id }
  });

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ SWISS-BIKE PATTAYA SEED COMPLETED!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Summary:
  🏍️ ${count} Swiss-Bike scooters added
  🚗 ${pattayaVehicles} total vehicles in Pattaya
  🌍 ${totalVehicles} total vehicles in database

📋 Scooter Categories:
  • 125cc Budget: 6 models (150-220 THB/day)
  • 150-160cc Mid: 12 models (220-320 THB/day)
  • 300-350cc Premium: 3 models (450-550 THB/day)

🌐 Test:
  curl "http://localhost:3000/api/vehicles?city=pattaya" | jq

🎉 Real Swiss-Bike Pattaya data loaded!
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
