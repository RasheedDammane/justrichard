import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const prisma = new PrismaClient();

const SOURCE_DIR = '/Users/richard/CascadeProjects/windsurf-project/web_scraper/scraped_data/allrayong_enriched_20251116_231747';
const CSV_FILE = path.join(SOURCE_DIR, 'houzez_import_html.csv');

// Helper to slugify feature names
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function main() {
  console.log('🎯 Starting features import...\n');

  // Read CSV
  const csvContent = fs.readFileSync(CSV_FILE, 'utf-8');
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
  });

  console.log(`Found ${records.length} records in CSV\n`);

  let propertiesUpdated = 0;
  let featuresCreated = 0;
  let linksCreated = 0;

  for (const record of records.slice(0, 250)) {
    try {
      const rec = record as any;
      const title = rec.property_title?.trim();
      if (!title) continue;

      // Generate slug
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .substring(0, 100);

      // Find property
      const property = await prisma.property.findUnique({
        where: { slug },
        include: {
          features: true,
        },
      });

      if (!property) {
        continue;
      }

      // Skip if already has features
      if (property.features.length > 0) {
        continue;
      }

      // Parse features from CSV
      const featuresStr = rec.property_features?.trim();
      if (!featuresStr || featuresStr === '') {
        continue;
      }

      console.log(`\n📦 Processing: ${title}`);
      console.log(`  Features string: ${featuresStr.substring(0, 100)}...`);

      // Split features (pipe separated)
      const featureNames = featuresStr
        .split('|')
        .map((f: string) => f.trim())
        .filter((f: string) => f.length > 0 && f.length < 50);

      if (featureNames.length === 0) {
        console.log(`  ⏭️  No valid features`);
        continue;
      }

      console.log(`  Found ${featureNames.length} features`);

      let linkedCount = 0;
      for (const featureName of featureNames) {
        try {
          const featureKey = slugify(featureName);
          
          // Find or create feature
          let feature = await prisma.propertyFeature.findFirst({
            where: { key: featureKey },
          });

          if (!feature) {
            feature = await prisma.propertyFeature.create({
              data: {
                id: `feature-${featureKey}-${Date.now()}`,
                key: featureName, // Use original name as key
                group: 'AMENITY',
                icon: '✓',
                isActive: true,
              },
            });
            featuresCreated++;
            console.log(`    ✨ Created feature: ${featureName}`);
          }

          // Check if link already exists
          const existingLink = await prisma.propertyPropertyFeature.findFirst({
            where: {
              propertyId: property.id,
              featureId: feature.id,
            },
          });

          if (!existingLink) {
            // Link feature to property
            await prisma.propertyPropertyFeature.create({
              data: {
                propertyId: property.id,
                featureId: feature.id,
              },
            });
            linkedCount++;
            linksCreated++;
          }
        } catch (error) {
          console.log(`    ⚠️  Error with feature "${featureName}":`, (error as Error).message);
        }
      }

      if (linkedCount > 0) {
        console.log(`  ✅ Linked ${linkedCount} features`);
        propertiesUpdated++;
      }

    } catch (error) {
      console.error(`  ❌ Error:`, error);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 FEATURES IMPORT SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Properties updated: ${propertiesUpdated}`);
  console.log(`✨ Features created: ${featuresCreated}`);
  console.log(`🔗 Links created: ${linksCreated}`);
  console.log('='.repeat(60) + '\n');

  if (propertiesUpdated > 0) {
    console.log('🎉 Features import completed successfully!\n');
  }
}

main()
  .catch((e) => {
    console.error('\n❌ Fatal error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
