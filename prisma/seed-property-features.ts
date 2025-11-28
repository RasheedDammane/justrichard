import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const features = [
  // Indoor Features
  { key: 'air-conditioning', icon: 'wind', group: 'INDOOR', order: 1 },
  { key: 'heating', icon: 'flame', group: 'INDOOR', order: 2 },
  { key: 'furnished', icon: 'armchair', group: 'INDOOR', order: 3 },
  { key: 'fully-furnished', icon: 'home', group: 'INDOOR', order: 4 },
  { key: 'kitchen', icon: 'chef-hat', group: 'INDOOR', order: 5 },
  { key: 'modern-kitchen', icon: 'utensils', group: 'INDOOR', order: 6 },
  { key: 'laundry', icon: 'washing-machine', group: 'INDOOR', order: 7 },
  { key: 'dryer', icon: 'wind', group: 'INDOOR', order: 8 },
  { key: 'washer', icon: 'washing-machine', group: 'INDOOR', order: 9 },
  { key: 'microwave', icon: 'microwave', group: 'INDOOR', order: 10 },
  { key: 'refrigerator', icon: 'refrigerator', group: 'INDOOR', order: 11 },
  { key: 'tv-cable', icon: 'tv', group: 'INDOOR', order: 12 },
  { key: 'wifi', icon: 'wifi', group: 'INDOOR', order: 13 },
  { key: 'fireplace', icon: 'flame', group: 'INDOOR', order: 14 },
  { key: 'hardwood-floors', icon: 'square', group: 'INDOOR', order: 15 },
  { key: 'window-coverings', icon: 'blinds', group: 'INDOOR', order: 16 },
  
  // Outdoor Features
  { key: 'balcony', icon: 'door-open', group: 'OUTDOOR', order: 1 },
  { key: 'terrace', icon: 'home', group: 'OUTDOOR', order: 2 },
  { key: 'garden', icon: 'flower', group: 'OUTDOOR', order: 3 },
  { key: 'lawn', icon: 'grass', group: 'OUTDOOR', order: 4 },
  { key: 'pool', icon: 'waves', group: 'OUTDOOR', order: 5 },
  { key: 'swimming-pool', icon: 'waves', group: 'OUTDOOR', order: 6 },
  { key: 'private-pool', icon: 'waves', group: 'OUTDOOR', order: 7 },
  { key: 'beach-access', icon: 'umbrella-beach', group: 'OUTDOOR', order: 8 },
  { key: 'beach', icon: 'umbrella-beach', group: 'OUTDOOR', order: 9 },
  { key: 'barbecue', icon: 'grill', group: 'OUTDOOR', order: 10 },
  { key: 'outdoor-shower', icon: 'shower', group: 'OUTDOOR', order: 11 },
  { key: 'parking', icon: 'car', group: 'OUTDOOR', order: 12 },
  { key: 'garage', icon: 'warehouse', group: 'OUTDOOR', order: 13 },
  { key: 'covered-parking', icon: 'car', group: 'OUTDOOR', order: 14 },
  
  // Security Features
  { key: 'security', icon: 'shield', group: 'SECURITY', order: 1 },
  { key: 'security-system', icon: 'shield-check', group: 'SECURITY', order: 2 },
  { key: 'alarm', icon: 'bell', group: 'SECURITY', order: 3 },
  { key: 'cctv', icon: 'camera', group: 'SECURITY', order: 4 },
  { key: 'gated-community', icon: 'fence', group: 'SECURITY', order: 5 },
  { key: '24-7-security', icon: 'shield-check', group: 'SECURITY', order: 6 },
  { key: 'doorman', icon: 'user-check', group: 'SECURITY', order: 7 },
  { key: 'intercom', icon: 'phone', group: 'SECURITY', order: 8 },
  
  // Wellness & Recreation
  { key: 'gym', icon: 'dumbbell', group: 'WELLNESS', order: 1 },
  { key: 'fitness-center', icon: 'dumbbell', group: 'WELLNESS', order: 2 },
  { key: 'sauna', icon: 'thermometer', group: 'WELLNESS', order: 3 },
  { key: 'spa', icon: 'spa', group: 'WELLNESS', order: 4 },
  { key: 'jacuzzi', icon: 'bath', group: 'WELLNESS', order: 5 },
  { key: 'tennis-court', icon: 'tennis', group: 'WELLNESS', order: 6 },
  { key: 'playground', icon: 'baby', group: 'WELLNESS', order: 7 },
  { key: 'game-room', icon: 'gamepad', group: 'WELLNESS', order: 8 },
  
  // Building Amenities
  { key: 'elevator', icon: 'arrow-up-down', group: 'BUILDING', order: 1 },
  { key: 'concierge', icon: 'user-check', group: 'BUILDING', order: 2 },
  { key: 'storage', icon: 'archive', group: 'BUILDING', order: 3 },
  { key: 'bike-storage', icon: 'bike', group: 'BUILDING', order: 4 },
  { key: 'pet-friendly', icon: 'dog', group: 'BUILDING', order: 5 },
  { key: 'wheelchair-accessible', icon: 'accessibility', group: 'BUILDING', order: 6 },
  
  // Views & Location
  { key: 'sea-view', icon: 'waves', group: 'VIEWS', order: 1 },
  { key: 'ocean-view', icon: 'waves', group: 'VIEWS', order: 2 },
  { key: 'mountain-view', icon: 'mountain', group: 'VIEWS', order: 3 },
  { key: 'city-view', icon: 'building', group: 'VIEWS', order: 4 },
  { key: 'garden-view', icon: 'flower', group: 'VIEWS', order: 5 },
  { key: 'pool-view', icon: 'waves', group: 'VIEWS', order: 6 },
  { key: 'near-beach', icon: 'umbrella-beach', group: 'LOCATION', order: 1 },
  { key: 'near-shopping', icon: 'shopping-bag', group: 'LOCATION', order: 2 },
  { key: 'near-schools', icon: 'school', group: 'LOCATION', order: 3 },
  { key: 'near-hospital', icon: 'hospital', group: 'LOCATION', order: 4 },
  { key: 'near-transport', icon: 'bus', group: 'LOCATION', order: 5 },
];

async function seedPropertyFeatures() {
  console.log('🏠 Seeding property features...\n');

  try {
    let createdCount = 0;
    let existingCount = 0;

    for (const feature of features) {
      const existing = await prisma.propertyFeature.findUnique({
        where: { key: feature.key },
      });

      if (!existing) {
        await prisma.propertyFeature.create({
          data: feature,
        });
        console.log(`✅ Created feature: ${feature.key} (${feature.group})`);
        createdCount++;
      } else {
        console.log(`⏭️  Feature already exists: ${feature.key}`);
        existingCount++;
      }
    }

    console.log('\n✨ Property features seeding completed!');
    console.log(`📊 Created: ${createdCount}, Existing: ${existingCount}`);

    // Display statistics by group
    const groups = ['INDOOR', 'OUTDOOR', 'SECURITY', 'WELLNESS', 'BUILDING', 'VIEWS', 'LOCATION'];
    console.log(`\n📊 Features by group:`);
    for (const group of groups) {
      const count = await prisma.propertyFeature.count({ where: { group } });
      console.log(`   - ${group}: ${count}`);
    }
  } catch (error) {
    console.error('❌ Error seeding property features:', error);
    throw error;
  }
}

seedPropertyFeatures()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
