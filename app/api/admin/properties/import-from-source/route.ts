import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const SOURCE_DIR = '/Users/richard/CascadeProjects/windsurf-project/web_scraper/scraped_data/allrayong_enriched_20251116_231747';
const CSV_FILE = path.join(SOURCE_DIR, 'houzez_import_html.csv');
const TARGET_IMAGES_DIR = path.join(process.cwd(), 'public', 'uploads', 'properties');

// Helper to copy images
async function copyPropertyImages(propertyId: string, sourceFolder: string): Promise<string[]> {
  const copiedImages: string[] = [];
  
  try {
    const sourcePath = path.join(SOURCE_DIR, sourceFolder, 'images');
    if (!fs.existsSync(sourcePath)) {
      console.log(`No images folder for ${propertyId}`);
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

    console.log(`Copied ${copiedImages.length} images for ${propertyId}`);
  } catch (error) {
    console.error(`Error copying images for ${propertyId}:`, error);
  }

  return copiedImages;
}

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if source files exist
    if (!fs.existsSync(CSV_FILE)) {
      return NextResponse.json({ error: 'CSV file not found at source location' }, { status: 404 });
    }

    // Read and parse CSV
    const csvContent = fs.readFileSync(CSV_FILE, 'utf-8');
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      relax_column_count: true,
    });

    console.log(`Found ${records.length} properties to import`);

    // Get default country and city (Thailand, Bangkok)
    let country = await prisma.country.findFirst({ where: { code: 'TH' } });
    if (!country) {
      country = await prisma.country.findFirst();
    }

    let city = await prisma.city.findFirst({ where: { name: 'Rayong' } });
    if (!city && country) {
      city = await prisma.city.findFirst({ where: { countryId: country?.id } });
    }

    // Get USD currency
    let currency = await prisma.currency.findFirst({ where: { code: 'USD' } });
    if (!currency) {
      currency = await prisma.currency.findFirst();
    }

    // Create target images directory
    if (!fs.existsSync(TARGET_IMAGES_DIR)) {
      fs.mkdirSync(TARGET_IMAGES_DIR, { recursive: true });
    }

    let imported = 0;
    let skipped = 0;
    let errors = 0;

    for (const record of records.slice(0, 50)) { // Limit to 50 for now
      try {
        const title = record.property_title?.trim();
        if (!title) {
          skipped++;
          continue;
        }

        // Generate slug
        const slug = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
          .substring(0, 100);

        // Check if already exists
        const existing = await prisma.property.findUnique({ where: { slug } });
        if (existing) {
          skipped++;
          continue;
        }

        // Parse price
        const priceStr = record.property_price?.replace(/[^0-9.]/g, '');
        const price = priceStr ? parseFloat(priceStr) : null;

        // Parse coordinates
        const lat = record.property_lat ? parseFloat(record.property_lat) : null;
        const lng = record.property_lng ? parseFloat(record.property_lng) : null;

        // Parse size
        const sizeStr = record.property_size?.replace(/[^0-9.]/g, '');
        const areaSize = sizeStr ? parseFloat(sizeStr) : null;

        // Parse bedrooms/bathrooms
        const bedrooms = record.property_bedrooms ? parseInt(record.property_bedrooms) : null;
        const bathrooms = record.property_bathrooms ? parseInt(record.property_bathrooms) : null;

        // Determine type
        let type = 'SALE';
        const status = record.property_status?.toLowerCase() || '';
        if (status.includes('rent')) type = 'RENT';
        else if (status.includes('daily')) type = 'DAILY';

        // Clean HTML description
        const description = record.property_description
          ?.replace(/<[^>]*>/g, '')
          .replace(/&nbsp;/g, ' ')
          .trim()
          .substring(0, 2000);

        // Get property_id for folder name
        const propertyIdFromCSV = record.property_id?.trim();
        const folderName = propertyIdFromCSV ? `${propertyIdFromCSV}_${title.replace(/[^a-zA-Z0-9]/g, '_')}` : null;

        // Create property
        const property = await prisma.property.create({
          data: {
            id: `import-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            title,
            description,
            slug,
            type,
            status: 'PUBLISHED',
            isFeatured: false,
            visibility: 'PUBLIC',
            addressLine1: record.property_address || null,
            countryId: country?.id || null,
            cityId: city?.id || null,
            latitude: lat,
            longitude: lng,
            bedrooms,
            bathrooms,
            areaSize,
            areaUnit: 'sqm',
            price,
            priceCurrencyId: currency?.id || null,
            pricePostfix: record.property_price_postfix || null,
            updatedAt: new Date(),
          },
        });

        // Copy images and create Media records
        if (folderName) {
          const imagePaths = await copyPropertyImages(property.id, folderName);
          
          for (let i = 0; i < imagePaths.length; i++) {
            const imagePath = imagePaths[i];
            
            // Create Media record
            const media = await prisma.media.create({
              data: {
                id: `media-${property.id}-${i}`,
                url: imagePath,
                type: 'IMAGE',
                title: `${title} - Image ${i + 1}`,
                alt: title,
                mimeType: 'image/webp',
                size: 0, // We don't have size info
                updatedAt: new Date(),
              },
            });

            // Link to property
            await prisma.propertyMedia.create({
              data: {
                id: `pm-${property.id}-${i}`,
                propertyId: property.id,
                mediaId: media.id,
                order: i,
                isCover: i === 0, // First image is cover
              },
            });
          }

          console.log(`Created ${imagePaths.length} media records for ${title}`);
        }

        imported++;
        console.log(`Imported: ${title}`);

      } catch (error) {
        console.error(`Error importing property:`, error);
        errors++;
      }
    }

    return NextResponse.json({
      success: true,
      imported,
      skipped,
      errors,
      total: records.length,
    });

  } catch (error) {
    console.error('Import error:', error);
    return NextResponse.json(
      { error: 'Import failed: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
