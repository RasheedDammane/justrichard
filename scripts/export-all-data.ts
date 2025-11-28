import { PrismaClient } from '@prisma/client';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const prisma = new PrismaClient();

async function exportAllData() {
  console.log('📦 Exporting ALL database data...\n');

  const exportDir = join(process.cwd(), 'exports');
  const csvDir = join(exportDir, 'csv');
  const jsonDir = join(exportDir, 'json');

  // Créer les dossiers
  mkdirSync(exportDir, { recursive: true });
  mkdirSync(csvDir, { recursive: true });
  mkdirSync(jsonDir, { recursive: true });

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

  // Liste des tables à exporter
  const tables = [
    { name: 'Country', model: prisma.country },
    { name: 'City', model: prisma.city },
    { name: 'Yacht', model: prisma.yacht },
    { name: 'RentalCar', model: prisma.rentalCar },
    { name: 'RentalMotorbike', model: prisma.rentalMotorbike },
    { name: 'Maid', model: prisma.maid },
    { name: 'Property', model: prisma.property },
    { name: 'Doctor', model: prisma.doctor },
    { name: 'Lawyer', model: prisma.lawyer },
    { name: 'Coach', model: prisma.coach },
    { name: 'Transfer', model: prisma.transfer },
    { name: 'FoodCategory', model: prisma.foodCategory },
    { name: 'FoodBrand', model: prisma.foodBrand },
    { name: 'FoodProduct', model: prisma.foodProduct },
    { name: 'FoodZone', model: prisma.foodZone },
    { name: 'FoodCoupon', model: prisma.foodCoupon },
    { name: 'User', model: prisma.user },
  ];

  const allData: any = {};
  let totalRecords = 0;

  for (const table of tables) {
    try {
      const data = await table.model.findMany();
      const count = data.length;
      totalRecords += count;

      if (count > 0) {
        console.log(`✅ ${table.name}: ${count} records`);

        // Export JSON
        const jsonPath = join(jsonDir, `${table.name}.json`);
        writeFileSync(jsonPath, JSON.stringify(data, null, 2));

        // Export CSV
        if (data.length > 0) {
          const headers = Object.keys(data[0]);
          const csvContent = [
            headers.join(','),
            ...data.map((row: any) =>
              headers
                .map((header) => {
                  const value = row[header];
                  if (value === null || value === undefined) return '';
                  if (typeof value === 'object') return JSON.stringify(value);
                  if (typeof value === 'string' && value.includes(','))
                    return `"${value}"`;
                  return value;
                })
                .join(',')
            ),
          ].join('\n');

          const csvPath = join(csvDir, `${table.name}.csv`);
          writeFileSync(csvPath, csvContent);
        }

        allData[table.name] = data;
      } else {
        console.log(`⚠️  ${table.name}: 0 records (skipped)`);
      }
    } catch (error) {
      console.log(`❌ ${table.name}: Error -`, (error as Error).message);
    }
  }

  // Export complet JSON
  const allDataPath = join(jsonDir, `all-data-${timestamp}.json`);
  writeFileSync(allDataPath, JSON.stringify(allData, null, 2));

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🎉 Export completed successfully!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log(`📊 Total records exported: ${totalRecords}`);
  console.log(`📁 CSV files: ${csvDir}`);
  console.log(`📁 JSON files: ${jsonDir}`);
  console.log(`📁 Complete backup: ${allDataPath}\n`);
}

exportAllData()
  .catch((e) => {
    console.error('❌ Export error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
