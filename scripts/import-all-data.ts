import { PrismaClient } from '@prisma/client';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const prisma = new PrismaClient();

async function importAllData() {
  console.log('📥 Importing ALL database data...\n');

  const jsonDir = join(process.cwd(), 'exports', 'json');

  // Trouver le dernier fichier all-data
  const files = readdirSync(jsonDir).filter((f) => f.startsWith('all-data-'));
  
  if (files.length === 0) {
    console.error('❌ No backup file found in exports/json/');
    console.log('Run: npx tsx scripts/export-all-data.ts first');
    process.exit(1);
  }

  files.sort().reverse();
  const latestFile = files[0];
  const backupPath = join(jsonDir, latestFile);

  console.log(`📂 Loading backup: ${latestFile}\n`);

  const allData = JSON.parse(readFileSync(backupPath, 'utf-8'));

  // Ordre d'import (respecter les foreign keys)
  const importOrder = [
    'Country',
    'City',
    'User',
    'Yacht',
    'RentalCar',
    'RentalMotorbike',
    'Maid',
    'Property',
    'Doctor',
    'Lawyer',
    'Coach',
    'Transfer',
    'FoodCategory',
    'FoodBrand',
    'FoodProduct',
    'FoodZone',
    'FoodCoupon',
  ];

  let totalImported = 0;

  for (const tableName of importOrder) {
    if (!allData[tableName] || allData[tableName].length === 0) {
      console.log(`⚠️  ${tableName}: No data to import`);
      continue;
    }

    try {
      const data = allData[tableName];
      const model = (prisma as any)[tableName.charAt(0).toLowerCase() + tableName.slice(1)];

      if (!model) {
        console.log(`❌ ${tableName}: Model not found`);
        continue;
      }

      // Delete existing data
      await model.deleteMany({});

      // Import new data
      await model.createMany({
        data,
        skipDuplicates: true,
      });

      console.log(`✅ ${tableName}: ${data.length} records imported`);
      totalImported += data.length;
    } catch (error) {
      console.log(`❌ ${tableName}: Error -`, (error as Error).message);
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🎉 Import completed successfully!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log(`📊 Total records imported: ${totalImported}\n`);
}

importAllData()
  .catch((e) => {
    console.error('❌ Import error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
