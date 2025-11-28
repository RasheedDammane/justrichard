import { PrismaClient } from '@prisma/client';
import { readdir, stat, readFile } from 'fs/promises';
import { join, extname, basename } from 'path';
import { existsSync } from 'fs';

const prisma = new PrismaClient();

interface MediaImport {
  path: string;
  category: string;
  altText?: string;
}

async function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): Promise<string[]> {
  const files = await readdir(dirPath);

  for (const file of files) {
    const filePath = join(dirPath, file);
    const fileStat = await stat(filePath);

    if (fileStat.isDirectory()) {
      arrayOfFiles = await getAllFiles(filePath, arrayOfFiles);
    } else {
      const ext = extname(file).toLowerCase();
      const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
      if (imageExts.includes(ext)) {
        arrayOfFiles.push(filePath);
      }
    }
  }

  return arrayOfFiles;
}

function getMimeType(ext: string): string {
  const mimeTypes: { [key: string]: string } = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
  };
  return mimeTypes[ext.toLowerCase()] || 'application/octet-stream';
}

function getCategoryFromPath(filePath: string): string {
  const pathLower = filePath.toLowerCase();
  
  if (pathLower.includes('/activities/')) return 'activities';
  if (pathLower.includes('/properties/')) return 'properties';
  if (pathLower.includes('/yachts/')) return 'yachts';
  if (pathLower.includes('/rental-cars/')) return 'rental-cars';
  if (pathLower.includes('/motorbikes/')) return 'motorbikes';
  if (pathLower.includes('/maids/')) return 'maids';
  if (pathLower.includes('/blog/')) return 'blog';
  if (pathLower.includes('/transfers/')) return 'transfers';
  if (pathLower.includes('/suppliers/')) return 'suppliers';
  if (pathLower.includes('/banners/')) return 'banners';
  if (pathLower.includes('/logos/')) return 'logos';
  
  return 'other';
}

function getAltTextFromFilename(filename: string): string {
  return filename
    .replace(/\.[^/.]+$/, '') // Remove extension
    .replace(/[-_]/g, ' ') // Replace - and _ with spaces
    .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize words
}

async function main() {
  console.log('🔍 Scanning for existing media files...\n');

  const publicDir = join(process.cwd(), 'public');
  const mediaDir = join(publicDir, 'media');
  
  if (!existsSync(mediaDir)) {
    console.log('❌ No media directory found at:', mediaDir);
    return;
  }

  // Get all image files
  const imageFiles = await getAllFiles(mediaDir);
  console.log(`📸 Found ${imageFiles.length} image files\n`);

  // Get all categories
  const categories = await prisma.mediaCategory.findMany();
  const categoryMap = new Map(categories.map(c => [c.slug, c.id]));

  let imported = 0;
  let skipped = 0;
  let errors = 0;

  for (const filePath of imageFiles) {
    try {
      const filename = basename(filePath);
      const ext = extname(filename);
      const relativePath = filePath.replace(publicDir, '');
      
      // Check if already imported
      const existing = await prisma.mediaFile.findFirst({
        where: { storagePath: relativePath },
      });

      if (existing) {
        console.log(`⏭️  Skipped (already exists): ${filename}`);
        skipped++;
        continue;
      }

      // Get file stats
      const stats = await stat(filePath);
      const fileSize = stats.size;

      // Determine category
      const categorySlug = getCategoryFromPath(filePath);
      const categoryId = categoryMap.get(categorySlug);

      // Generate alt text
      const altText = getAltTextFromFilename(filename);

      // Create media record
      const mediaFile = await prisma.mediaFile.create({
        data: {
          fileName: filename,
          slug: filename.replace(/\.[^/.]+$/, '').toLowerCase().replace(/[^a-z0-9-]/g, '-'),
          extension: ext.replace('.', ''),
          mimeType: getMimeType(ext),
          size: BigInt(fileSize),
          altText,
          storagePath: relativePath,
          storageProvider: 'local',
          visibility: 'public',
          categoryId: categoryId || null,
        },
      });

      console.log(`✅ Imported: ${filename} → ${categorySlug || 'uncategorized'}`);
      imported++;
    } catch (error) {
      console.error(`❌ Error importing ${basename(filePath)}:`, error);
      errors++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 IMPORT SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Imported: ${imported}`);
  console.log(`⏭️  Skipped:  ${skipped}`);
  console.log(`❌ Errors:   ${errors}`);
  console.log(`📁 Total:    ${imageFiles.length}`);
  console.log('='.repeat(60));
}

main()
  .catch((e) => {
    console.error('❌ Fatal error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
