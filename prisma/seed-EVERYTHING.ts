#!/usr/bin/env tsx
/**
 * SEED MASTER - Charge TOUTES les données en base
 * Exécute tous les seeds dans le bon ordre
 */

import { execSync } from 'child_process';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 LOADING EVERYTHING INTO DATABASE...\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const seeds = [
    { name: 'Currencies', file: 'seed-currencies.ts' },
    { name: 'Languages', file: 'seed-languages.ts' },
    { name: 'Geography (Countries/Cities)', file: 'seed-thailand.ts' },
    { name: 'Geography (Dubai)', file: 'seed-dubai.ts' },
    { name: 'Geography (Europe)', file: 'seed-europe.ts' },
    { name: 'Property Features', file: 'seed-property-features.ts' },
    { name: 'Amenities', file: 'seed-amenities.ts' },
    { name: 'Themes', file: 'seed-themes.ts' },
    { name: 'Routes', file: 'seed-routes.ts' },
    { name: 'Media Categories', file: 'seed-media-categories.ts' },
    { name: 'CMS (Header/Footer)', file: 'seed-cms.ts' },
    { name: 'Doctors', file: 'seed-doctors.ts' },
    { name: 'Lawyers (Thailand)', file: 'seed-lawyers-thailand.ts' },
    { name: 'Lawyers', file: 'seed-lawyers.ts' },
    { name: 'Coaches', file: 'seed-coaches.ts' },
    { name: 'Maids', file: 'seed-maids.ts' },
    { name: 'Rental Cars', file: 'seed-rental-cars.ts' },
    { name: 'Motorbikes', file: 'seed-motorbikes.ts' },
    { name: 'Properties', file: 'seed-properties.ts' },
    { name: 'Transfers (Thailand)', file: 'seed-transfers-thailand.ts' },
    { name: 'Transfers', file: 'seed-transfers.ts' },
    { name: 'Activities', file: 'seed-activities.ts' },
    { name: 'Suppliers', file: 'seed-suppliers.ts' },
    { name: 'Partners', file: 'seed-partners.ts' },
    { name: 'Blog', file: 'seed-blog.ts' },
    { name: 'Food & Grocery', file: 'seeds/food-products.ts' },
  ];

  let successCount = 0;
  let failedCount = 0;
  const failed: string[] = [];

  for (const seed of seeds) {
    const filePath = `prisma/${seed.file}`;
    
    try {
      console.log(`📦 ${seed.name}...`);
      
      execSync(`npx tsx ${filePath}`, {
        stdio: 'pipe',
        cwd: process.cwd(),
      });
      
      console.log(`   ✅ ${seed.name} loaded\n`);
      successCount++;
    } catch (error: any) {
      const errorMessage = error.stdout?.toString() || error.stderr?.toString() || error.message;
      
      // Ignorer les erreurs "already exists" ou "duplicate"
      if (errorMessage.includes('Unique constraint') ||
          errorMessage.includes('already exists') ||
          errorMessage.includes('duplicate')) {
        console.log(`   ⚠️  ${seed.name} (already exists, skipped)\n`);
        successCount++;
      } else {
        console.log(`   ❌ ${seed.name} FAILED`);
        console.log(`      ${errorMessage.split('\n')[0]}\n`);
        failedCount++;
        failed.push(seed.name);
      }
    }
  }

  // Vérifier les counts
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 VERIFYING DATABASE...\n');

  const counts = {
    countries: await prisma.country.count(),
    cities: await prisma.city.count(),
    languages: await prisma.language.count(),
    currencies: await prisma.currency.count(),
    yachts: await prisma.yacht.count(),
    rentalCars: await prisma.rentalCar.count(),
    motorbikes: await prisma.rentalMotorbike.count(),
    maids: await prisma.maid.count(),
    properties: await prisma.property.count(),
    doctors: await prisma.doctor.count(),
    lawyers: await prisma.lawyer.count(),
    coaches: await prisma.coach.count(),
    transfers: await prisma.transfer.count(),
    foodProducts: await prisma.foodProduct.count(),
    foodCategories: await prisma.foodCategory.count(),
  };

  console.log('🌍 Geography:');
  console.log(`   • Countries: ${counts.countries}`);
  console.log(`   • Cities: ${counts.cities}`);
  console.log(`   • Languages: ${counts.languages}`);
  console.log(`   • Currencies: ${counts.currencies}\n`);

  console.log('🚗 Rentals & Vehicles:');
  console.log(`   • Yachts: ${counts.yachts}`);
  console.log(`   • Rental Cars: ${counts.rentalCars}`);
  console.log(`   • Motorbikes: ${counts.motorbikes}\n`);

  console.log('🏠 Services:');
  console.log(`   • Properties: ${counts.properties}`);
  console.log(`   • Transfers: ${counts.transfers}`);
  console.log(`   • Maids: ${counts.maids}\n`);

  console.log('👨‍⚕️ Professionals:');
  console.log(`   • Doctors: ${counts.doctors}`);
  console.log(`   • Lawyers: ${counts.lawyers}`);
  console.log(`   • Coaches: ${counts.coaches}\n`);

  console.log('🍽️ Food & Grocery:');
  console.log(`   • Categories: ${counts.foodCategories}`);
  console.log(`   • Products: ${counts.foodProducts}\n`);

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🎉 SEED COMPLETED!\n');
  console.log(`✅ Success: ${successCount}/${seeds.length}`);
  
  if (failedCount > 0) {
    console.log(`❌ Failed: ${failedCount}`);
    console.log(`   ${failed.join(', ')}`);
  }
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

main()
  .catch((e) => {
    console.error('❌ Fatal error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
