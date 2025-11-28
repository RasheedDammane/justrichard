import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Cleaning imported properties without media...\n');

  // Find all imported properties
  const properties = await prisma.property.findMany({
    where: { id: { startsWith: 'import-' } },
    include: {
      media: true,
    },
  });

  console.log(`Found ${properties.length} imported properties`);

  let deleted = 0;
  for (const property of properties) {
    if (property.media.length === 0) {
      console.log(`Deleting: ${property.title} (no media)`);
      await prisma.property.delete({ where: { id: property.id } });
      deleted++;
    }
  }

  console.log(`\n✅ Deleted ${deleted} properties without media`);
  console.log(`✅ Kept ${properties.length - deleted} properties with media\n`);
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
