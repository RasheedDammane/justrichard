import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const prisma = new PrismaClient();

const SOURCE_DIR = '/Users/richard/CascadeProjects/windsurf-project/web_scraper/scraped_data/allrayong_enriched_20251116_231747';
const CSV_FILE = path.join(SOURCE_DIR, 'houzez_import_html.csv');
const TARGET_IMAGES_DIR = path.join(process.cwd(), 'public', 'uploads', 'properties');

// Helper to copy images
function copyPropertyImages(propertyId: string, sourceFolder: string): string[] {
  const copiedImages: string[] = [];
  
  try {
    const sourcePath = path.join(SOURCE_DIR, sourceFolder, 'images');
    if (!fs.existsSync(sourcePath)) {
      console.log(`  ⏭️  No images folder for ${sourceFolder}`);
      return copiedImages;
    }

    const targetPath = path.join(TARGET_IMAGES_DIR, propertyId);
    if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(targetPath, { recursive: true });
    }

    const imageFiles = fs.readdirSync(sourcePath).filter(f => f.endsWith('.webp'));
    
    for (const imageFile of imageFiles) {
      const sourceFile = path.join(sourcePath, imageFile);
      const targetFile = path.join(targetPath, imageFile);
      
      fs.copyFileSync(sourceFile, targetFile);
      copiedImages.push(`/uploads/properties/${propertyId}/${imageFile}`);
    }

    console.log(`  📸 Copied ${copiedImages.length} images`);
  } catch (error) {
    console.error(`  ❌ Error copying images:`, error);
  }

  return copiedImages;
}

async function main() {
  console.log('🚀 Starting property import from source...\n');

  // Check if source files exist
  if (!fs.existsSync(CSV_FILE)) {
    console.error('❌ CSV file not found:', CSV_FILE);
    process.exit(1);
  }

  // Read and parse CSV
  console.log('📖 Reading CSV file...');
  const csvContent = fs.readFileSync(CSV_FILE, 'utf-8');
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
  });

  console.log(`✅ Found ${records.length} properties in CSV\n`);

  // Get default country and city (Thailand, Rayong)
  let country = await prisma.country.findFirst({ where: { code: 'TH' } });
  if (!country) {
    country = await prisma.country.findFirst();
  }

  let city = await prisma.city.findFirst({ where: { name: 'Rayong' } });
  if (!city && country) {
    city = await prisma.city.findFirst({ where: { countryId: country?.id } });
  }

  // Get THB currency (Thai Baht for Thailand properties)
  let currency = await prisma.currency.findFirst({ where: { code: 'THB' } });
  if (!currency) {
    // Fallback to USD if THB not found
    currency = await prisma.currency.findFirst({ where: { code: 'USD' } });
  }
  if (!currency) {
    currency = await prisma.currency.findFirst();
  }

  console.log('📍 Using defaults:');
  console.log(`  Country: ${country?.name || 'None'}`);
  console.log(`  City: ${city?.name || 'None'}`);
  console.log(`  Currency: ${currency?.code || 'None'}\n`);

  // Create target images directory
  if (!fs.existsSync(TARGET_IMAGES_DIR)) {
    fs.mkdirSync(TARGET_IMAGES_DIR, { recursive: true });
  }

  let imported = 0;
  let skipped = 0;
  let errors = 0;

  const LIMIT = 250; // Import up to 250 properties (covers all ~220 unique properties)
  console.log(`🎯 Importing up to ${LIMIT} properties...\n`);

  for (const record of records.slice(0, LIMIT)) {
    try {
      const rec = record as any;
      const title = rec.property_title?.trim();
      if (!title) {
        skipped++;
        continue;
      }

      console.log(`\n📦 Processing: ${title}`);

      // Generate slug
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .substring(0, 100);

      // Check if already exists
      const existing = await prisma.property.findUnique({ where: { slug } });
      if (existing) {
        console.log(`  ⏭️  Already exists, skipping`);
        skipped++;
        continue;
      }

      // Parse price
      const priceStr = rec.property_price?.replace(/[^0-9.]/g, '');
      const price = priceStr ? parseFloat(priceStr) : null;

      // Parse coordinates
      const lat = rec.property_lat ? parseFloat(rec.property_lat) : null;
      const lng = rec.property_lng ? parseFloat(rec.property_lng) : null;

      // Parse size
      const sizeStr = rec.property_size?.replace(/[^0-9.]/g, '');
      const areaSize = sizeStr ? parseFloat(sizeStr) : null;

      // Parse bedrooms/bathrooms
      const bedrooms = rec.property_bedrooms ? parseInt(rec.property_bedrooms) : null;
      const bathrooms = rec.property_bathrooms ? parseInt(rec.property_bathrooms) : null;

      // Determine type
      let type = 'SALE';
      const status = rec.property_status?.toLowerCase() || '';
      if (status.includes('rent')) type = 'RENT';
      else if (status.includes('daily')) type = 'DAILY';

      // Clean HTML description
      const description = rec.property_description
        ?.replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim()
        .substring(0, 2000);

      // Get property_id for folder name
      const propertyIdFromCSV = rec.property_id?.trim();
      const folderName = propertyIdFromCSV ? `${propertyIdFromCSV}_${title.replace(/[^a-zA-Z0-9]/g, '_')}` : null;

      // Generate unique ID
      const propertyId = `import-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Create property
      console.log(`  💾 Creating property record...`);
      const property = await prisma.property.create({
        data: {
          id: propertyId,
          title,
          description,
          slug,
          type: type as any,
          status: 'PUBLISHED',
          isFeatured: false,
          visibility: 'PUBLIC',
          addressLine1: rec.property_address || undefined,
          countryId: country?.id || undefined,
          cityId: city?.id || undefined,
          latitude: lat || undefined,
          longitude: lng || undefined,
          bedrooms: bedrooms || undefined,
          bathrooms: bathrooms || undefined,
          areaSize: areaSize || undefined,
          areaUnit: 'sqm',
          price: price || undefined,
          priceCurrencyId: currency?.id || undefined,
          pricePostfix: rec.property_price_postfix || undefined,
          updatedAt: new Date(),
        },
      });

      console.log(`  ✅ Property created: ${property.id}`);

      // Copy images and create Media records
      if (folderName) {
        console.log(`  📁 Looking for images in: ${folderName}`);
        const imagePaths = copyPropertyImages(property.id, folderName);
        
        if (imagePaths.length > 0) {
          console.log(`  🎨 Creating ${imagePaths.length} media records...`);
          
          for (let i = 0; i < imagePaths.length; i++) {
            const imagePath = imagePaths[i];
            
            // Create Media record
            const filename = path.basename(imagePath);
            const media = await prisma.media.create({
              data: {
                id: `media-${property.id}-${i}`,
                filename,
                originalName: filename,
                url: imagePath,
                title: `${title} - Image ${i + 1}`,
                alt: title || undefined,
                mimeType: 'image/webp',
                size: 0,
              },
            });

            // Link to property
            await prisma.propertyMedia.create({
              data: {
                id: `pm-${property.id}-${i}`,
                propertyId: property.id,
                mediaId: media.id,
                order: i,
                isCover: i === 0,
              },
            });
          }

          console.log(`  ✅ Created ${imagePaths.length} media records`);
        }
      }

      imported++;
      console.log(`  🎉 Successfully imported!`);

    } catch (error) {
      console.error(`  ❌ Error:`, error);
      errors++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 IMPORT SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Imported: ${imported}`);
  console.log(`⏭️  Skipped:  ${skipped}`);
  console.log(`❌ Errors:   ${errors}`);
  console.log(`📁 Total:    ${records.length} properties in CSV`);
  console.log('='.repeat(60) + '\n');

  if (imported > 0) {
    console.log('🎊 Import completed successfully!');
    console.log('\n📍 Next steps:');
    console.log('  1. Check: http://localhost:3100/en/admin/properties');
    console.log('  2. View:  http://localhost:3100/en/properties');
    console.log('  3. Edit properties and add more details\n');
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
