#!/usr/bin/env tsx

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 MEGA SEED - Pattaya, Koh Samui, Qatar, Oman...\n');

  const countries = await prisma.country.findMany();
  const cities = await prisma.city.findMany();

  const thailand = countries.find(c => c.code === 'TH');
  const qatar = countries.find(c => c.code === 'QA');
  const oman = countries.find(c => c.code === 'OM');

  // 1. CREATE NEW CITIES
  console.log('🏙️ Creating New Cities...');
  const newCities = [];
  
  if (thailand) {
    try {
      const pattaya = await prisma.city.create({
        data: {
          name: 'Pattaya',
          nameAr: 'باتايا',
          nameTh: 'พัทยา',
          countryId: thailand.id,
          latitude: 12.9236,
          longitude: 100.8825,
          isActive: true,
        },
      });
      newCities.push(pattaya);
      console.log('   ✅ Pattaya');
    } catch (e: any) {
      if (!e.message.includes('Unique')) console.log('   ⚠️  Pattaya exists');
    }

    try {
      const kohSamui = await prisma.city.create({
        data: {
          name: 'Koh Samui',
          nameAr: 'كوه ساموي',
          nameTh: 'เกาะสมุย',
          countryId: thailand.id,
          latitude: 9.5357,
          longitude: 100.0629,
          isActive: true,
        },
      });
      newCities.push(kohSamui);
      console.log('   ✅ Koh Samui');
    } catch (e: any) {
      if (!e.message.includes('Unique')) console.log('   ⚠️  Koh Samui exists');
    }
  }

  // Refresh cities
  const allCities = await prisma.city.findMany();
  const pattaya = allCities.find(c => c.name === 'Pattaya');
  const kohSamui = allCities.find(c => c.name === 'Koh Samui');
  const doha = allCities.find(c => c.name === 'Doha');
  const muscat = allCities.find(c => c.name === 'Muscat');
  const bangkok = allCities.find(c => c.name === 'Bangkok');

  console.log(`   Total: ${newCities.length} new cities\n`);

  // 2. VEHICLES for Pattaya & Koh Samui
  console.log('🚗 Creating Vehicles...');
  const vehiclesData = [
    // Pattaya
    { name: 'Honda PCX 150', type: 'SCOOTER', brand: 'Honda', model: 'PCX', year: 2024, city: pattaya, country: thailand, priceDay: 250, priceWeek: 1500, priceMonth: 5000 },
    { name: 'Yamaha Aerox 155', type: 'SCOOTER', brand: 'Yamaha', model: 'Aerox', year: 2024, city: pattaya, country: thailand, priceDay: 280, priceWeek: 1600, priceMonth: 5500 },
    { name: 'Toyota Yaris 2024', type: 'CAR', brand: 'Toyota', model: 'Yaris', year: 2024, city: pattaya, country: thailand, priceDay: 800, priceWeek: 5000, priceMonth: 18000 },
    { name: 'Honda City 2024', type: 'CAR', brand: 'Honda', model: 'City', year: 2024, city: pattaya, country: thailand, priceDay: 850, priceWeek: 5200, priceMonth: 19000 },
    { name: 'Yamaha MT-03', type: 'MOTORCYCLE', brand: 'Yamaha', model: 'MT-03', year: 2024, city: pattaya, country: thailand, priceDay: 400, priceWeek: 2400, priceMonth: 8000 },
    
    // Koh Samui
    { name: 'Honda Click 150', type: 'SCOOTER', brand: 'Honda', model: 'Click', year: 2024, city: kohSamui, country: thailand, priceDay: 300, priceWeek: 1800, priceMonth: 6000 },
    { name: 'Vespa Sprint 150', type: 'SCOOTER', brand: 'Vespa', model: 'Sprint', year: 2024, city: kohSamui, country: thailand, priceDay: 350, priceWeek: 2000, priceMonth: 7000 },
    { name: 'Suzuki Swift 2024', type: 'CAR', brand: 'Suzuki', model: 'Swift', year: 2024, city: kohSamui, country: thailand, priceDay: 900, priceWeek: 5500, priceMonth: 20000 },
    { name: 'Mazda 2 2024', type: 'CAR', brand: 'Mazda', model: '2', year: 2024, city: kohSamui, country: thailand, priceDay: 950, priceWeek: 5800, priceMonth: 21000 },
    { name: 'Mountain Bike Pro', type: 'BICYCLE', brand: 'Giant', model: 'ATX', year: 2024, city: kohSamui, country: thailand, priceDay: 150, priceWeek: 800, priceMonth: 2500 },
    
    // Doha
    { name: 'Toyota Land Cruiser 2024', type: 'CAR', brand: 'Toyota', model: 'Land Cruiser', year: 2024, city: doha, country: qatar, priceDay: 400, priceWeek: 2400, priceMonth: 8000 },
    { name: 'Nissan Patrol 2024', type: 'CAR', brand: 'Nissan', model: 'Patrol', year: 2024, city: doha, country: qatar, priceDay: 380, priceWeek: 2300, priceMonth: 7500 },
    { name: 'BMW X5 2024', type: 'CAR', brand: 'BMW', model: 'X5', year: 2024, city: doha, country: qatar, priceDay: 500, priceWeek: 3000, priceMonth: 10000 },
    
    // Muscat
    { name: 'Toyota Fortuner 2024', type: 'CAR', brand: 'Toyota', model: 'Fortuner', year: 2024, city: muscat, country: oman, priceDay: 350, priceWeek: 2100, priceMonth: 7000 },
    { name: 'Mitsubishi Pajero 2024', type: 'CAR', brand: 'Mitsubishi', model: 'Pajero', year: 2024, city: muscat, country: oman, priceDay: 380, priceWeek: 2300, priceMonth: 7500 },
    { name: 'Honda CBR650R', type: 'MOTORCYCLE', brand: 'Honda', model: 'CBR650R', year: 2024, city: muscat, country: oman, priceDay: 120, priceWeek: 700, priceMonth: 2500 },
  ];

  let vehicleCount = 0;
  const users = await prisma.user.findMany({ take: 20 });
  
  for (const v of vehiclesData) {
    if (!v.city || !v.country) continue;
    try {
      await prisma.vehicle.create({
        data: {
          ownerId: users[Math.floor(Math.random() * users.length)]?.id || users[0].id,
          name: v.name,
          description: `${v.brand} ${v.model} ${v.year} - Well maintained and ready to rent`,
          vehicleType: v.type as any,
          brand: v.brand,
          model: v.model,
          year: v.year,
          cityId: v.city.id,
          countryId: v.country.id,
          pricePerDay: v.priceDay,
          pricePerWeek: v.priceWeek,
          pricePerMonth: v.priceMonth,
          isAvailable: true,
          images: [],
          features: ['AC', 'GPS', 'Bluetooth'],
        },
      });
      vehicleCount++;
    } catch (e: any) {
      if (!e.message.includes('Unique')) console.log(`   ⚠️  ${v.name}`);
    }
  }
  console.log(`   ✅ ${vehicleCount} vehicles\n`);

  // 3. TRANSFERS
  console.log('🚐 Creating Transfers...');
  const transfersData = [
    // Pattaya
    { name: 'Pattaya Airport Transfer', from: 'U-Tapao Airport', to: 'Pattaya Beach', type: 'AIRPORT_PICKUP', city: pattaya, country: thailand, price: 600 },
    { name: 'Pattaya to Bangkok', from: 'Pattaya', to: 'Bangkok', type: 'CITY_TO_CITY', city: pattaya, country: thailand, price: 1500 },
    
    // Koh Samui
    { name: 'Samui Airport Transfer', from: 'Samui Airport', to: 'Chaweng Beach', type: 'AIRPORT_PICKUP', city: kohSamui, country: thailand, price: 500 },
    { name: 'Samui Island Tour', from: 'Hotel', to: 'Various', type: 'HOURLY', city: kohSamui, country: thailand, price: 400 },
    
    // Doha
    { name: 'Doha Airport Transfer', from: 'Hamad International Airport', to: 'West Bay', type: 'AIRPORT_PICKUP', city: doha, country: qatar, price: 150 },
    { name: 'Doha City Transfer', from: 'Souq Waqif', to: 'The Pearl', type: 'CITY_TO_CITY', city: doha, country: qatar, price: 80 },
    
    // Muscat
    { name: 'Muscat Airport Transfer', from: 'Muscat International Airport', to: 'Qurum', type: 'AIRPORT_PICKUP', city: muscat, country: oman, price: 120 },
    { name: 'Muscat to Nizwa', from: 'Muscat', to: 'Nizwa', type: 'CITY_TO_CITY', city: muscat, country: oman, price: 200 },
  ];

  let transferCount = 0;
  for (const t of transfersData) {
    if (!t.city || !t.country) continue;
    try {
      await prisma.transfer.create({
        data: {
          name: t.name,
          description: `Professional transfer service from ${t.from} to ${t.to}`,
          transferType: t.type as any,
          fromLocation: t.from,
          toLocation: t.to,
          countryId: t.country.id,
          price: t.price,
          vehicleType: 'Sedan',
          maxPassengers: 4,
          providerId: users[0]?.id || 'default',
          isAvailable: true,
          images: [],
          features: ['AC', 'WiFi', 'Water'],
        },
      });
      transferCount++;
    } catch (e: any) {
      if (!e.message.includes('Unique')) console.log(`   ⚠️  ${t.name}`);
    }
  }
  console.log(`   ✅ ${transferCount} transfers\n`);

  // 4. BUILDINGS
  console.log('🏢 Creating Buildings...');
  const buildingsData = [
    // Pattaya
    { name: 'Pattaya Beach Condos', city: pattaya, country: thailand, address: 'Beach Road', type: 'RESIDENTIAL', units: 200, floors: 30, year: 2020 },
    { name: 'Central Pattaya Tower', city: pattaya, country: thailand, address: 'Central Pattaya', type: 'MIXED', units: 150, floors: 25, year: 2019 },
    
    // Koh Samui
    { name: 'Samui Beach Resort', city: kohSamui, country: thailand, address: 'Chaweng Beach', type: 'RESIDENTIAL', units: 120, floors: 15, year: 2021 },
    { name: 'Lamai Heights', city: kohSamui, country: thailand, address: 'Lamai Beach', type: 'RESIDENTIAL', units: 80, floors: 12, year: 2022 },
    
    // Doha
    { name: 'The Pearl Towers', city: doha, country: qatar, address: 'The Pearl Qatar', type: 'RESIDENTIAL', units: 500, floors: 60, year: 2018 },
    { name: 'West Bay Business Center', city: doha, country: qatar, address: 'West Bay', type: 'COMMERCIAL', units: 300, floors: 45, year: 2019 },
    { name: 'Lusail Marina Tower', city: doha, country: qatar, address: 'Lusail', type: 'MIXED', units: 400, floors: 55, year: 2020 },
    
    // Muscat
    { name: 'Muscat Grand Mall', city: muscat, country: oman, address: 'Qurum', type: 'COMMERCIAL', units: 250, floors: 35, year: 2017 },
    { name: 'Al Mouj Residences', city: muscat, country: oman, address: 'Al Mouj', type: 'RESIDENTIAL', units: 350, floors: 40, year: 2019 },
    { name: 'Muscat Bay Towers', city: muscat, country: oman, address: 'Muscat Bay', type: 'RESIDENTIAL', units: 300, floors: 38, year: 2020 },
  ];

  let buildingCount = 0;
  for (const b of buildingsData) {
    if (!b.city || !b.country) continue;
    try {
      await prisma.building.create({
        data: {
          name: b.name,
          description: `${b.type} building in ${b.city.name} with ${b.units} units across ${b.floors} floors`,
          cityId: b.city.id,
          countryId: b.country.id,
          address: b.address,
          buildingType: b.type,
          totalUnits: b.units,
          totalFloors: b.floors,
          yearBuilt: b.year,
          isActive: true,
          images: [],
          amenities: ['Gym', 'Pool', 'Parking', 'Security 24/7'],
        },
      });
      buildingCount++;
    } catch (e: any) {
      if (!e.message.includes('Unique')) console.log(`   ⚠️  ${b.name}`);
    }
  }
  console.log(`   ✅ ${buildingCount} buildings\n`);

  // Summary
  const finalCounts = {
    cities: await prisma.city.count(),
    vehicles: await prisma.vehicle.count(),
    transfers: await prisma.transfer.count(),
    buildings: await prisma.building.count(),
  };

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ MEGA SEED COMPLETED!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Database Summary:
  🏙️ ${finalCounts.cities} Cities (added Pattaya, Koh Samui)
  🚗 ${finalCounts.vehicles} Vehicles (added ${vehicleCount})
  🚐 ${finalCounts.transfers} Transfers (added ${transferCount})
  🏢 ${finalCounts.buildings} Buildings (added ${buildingCount})

🎉 All data for Pattaya, Koh Samui, Qatar, Oman loaded!
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
