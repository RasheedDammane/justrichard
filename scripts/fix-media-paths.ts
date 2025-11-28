import { PrismaClient } from '@prisma/client';
import { copyFile, mkdir } from 'fs/promises';
import { join, dirname, basename } from 'path';
import { existsSync } from 'fs';

const prisma = new PrismaClient();

async function main() {
  console.log('🔧 Fixing media paths...\n');

  // Get all media files
  const mediaFiles = await prisma.mediaFile.findMany();
  console.log(`📸 Found ${mediaFiles.length} media files in database\n`);

  let fixed = 0;
  let errors = 0;

  for (const media of mediaFiles) {
    try {
      const oldPath = join(process.cwd(), 'public', media.storagePath);
      
      // New path in /uploads/media/
      const filename = basename(media.storagePath);
      const newRelativePath = `/uploads/media/${filename}`;
      const newPath = join(process.cwd(), 'public', newRelativePath);

      // Check if source file exists
      if (!existsSync(oldPath)) {
        console.log(`⚠️  Source not found: ${media.storagePath}`);
        continue;
      }

      // Create directory if needed
      const newDir = dirname(newPath);
      if (!existsSync(newDir)) {
        await mkdir(newDir, { recursive: true });
      }

      // Copy file to new location
      await copyFile(oldPath, newPath);

      // Update database
      await prisma.mediaFile.update({
        where: { id: media.id },
        data: { storagePath: newRelativePath },
      });

      console.log(`✅ Fixed: ${filename}`);
      console.log(`   Old: ${media.storagePath}`);
      console.log(`   New: ${newRelativePath}\n`);
      fixed++;
    } catch (error) {
      console.error(`❌ Error fixing ${media.fileName}:`, error);
      errors++;
    }
  }

  console.log('='.repeat(60));
  console.log('📊 SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Fixed:  ${fixed}`);
  console.log(`❌ Errors: ${errors}`);
  console.log(`📁 Total:  ${mediaFiles.length}`);
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
