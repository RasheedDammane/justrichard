import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const buildingsData = {
  // Pattaya Buildings
  pattaya: [
    {
      name: 'The New Nordic',
      nameTh: 'เดอะ นิว นอร์ดิค',
      developer: 'Nova Group',
      city: 'Central Pattaya',
      yearBuilt: 2019,
      totalFloors: 8,
      totalUnits: 250,
      description: 'Modern condominium in Central Pattaya with Scandinavian design',
    },
    {
      name: 'Elysium Residences',
      nameTh: 'อีลิเซียม เรสซิเดนซ์',
      developer: 'Elysium Group',
      city: 'Central Pattaya',
      yearBuilt: 2020,
      totalFloors: 32,
      totalUnits: 400,
      description: 'Luxury high-rise condominium in the heart of Pattaya',
    },
    {
      name: 'The Point Pratumnak',
      nameTh: 'เดอะ พอยท์ พระตำหนัก',
      developer: 'Heights Holdings',
      city: 'Pratumnak',
      yearBuilt: 2018,
      totalFloors: 40,
      totalUnits: 500,
      description: 'Iconic tower on Pratumnak Hill with panoramic sea views',
    },
    {
      name: 'Lumpini Park Beach Jomtien',
      nameTh: 'ลุมพินี พาร์ค บีช จอมเทียน',
      developer: 'LPN Development',
      city: 'Jomtien',
      yearBuilt: 2017,
      totalFloors: 8,
      totalUnits: 320,
      description: 'Beachfront condominium in Jomtien',
    },
    {
      name: 'Lumpini Ville Naklua',
      nameTh: 'ลุมพินี วิลล์ นาเกลือ',
      developer: 'LPN Development',
      city: 'Naklua',
      yearBuilt: 2016,
      totalFloors: 8,
      totalUnits: 280,
      description: 'Affordable condominium in Naklua area',
    },
    {
      name: 'The Riviera Jomtien',
      nameTh: 'เดอะ ริเวียร่า จอมเทียน',
      developer: 'Winston Property',
      city: 'Jomtien',
      yearBuilt: 2015,
      totalFloors: 42,
      totalUnits: 600,
      description: 'Luxury beachfront development with multiple towers',
    },
    {
      name: 'The Riviera Monaco',
      nameTh: 'เดอะ ริเวียร่า โมนาโก',
      developer: 'Winston Property',
      city: 'Jomtien',
      yearBuilt: 2017,
      totalFloors: 38,
      totalUnits: 550,
      description: 'Part of the prestigious Riviera series',
    },
    {
      name: 'The Riviera Wongamat',
      nameTh: 'เดอะ ริเวียร่า วงศ์อมาตย์',
      developer: 'Winston Property',
      city: 'Wong Amat',
      yearBuilt: 2016,
      totalFloors: 46,
      totalUnits: 650,
      description: 'Beachfront luxury in exclusive Wongamat area',
    },
    {
      name: 'Copacabana Beach Jomtien',
      nameTh: 'โคปาคาบาน่า บีช จอมเทียน',
      developer: 'Nova Group',
      city: 'Jomtien',
      yearBuilt: 2014,
      totalFloors: 8,
      totalUnits: 300,
      description: 'Beachfront condominium with Brazilian-inspired design',
    },
    {
      name: 'Centara Avenue',
      nameTh: 'เซ็นทารา อเวนิว',
      developer: 'Centara Group',
      city: 'Central Pattaya',
      yearBuilt: 2019,
      totalFloors: 38,
      totalUnits: 480,
      description: 'Mixed-use development with hotel and residences',
    },
    {
      name: 'Arcadia Beach Resort',
      nameTh: 'อาร์เคเดีย บีช รีสอร์ท',
      developer: 'Heights Holdings',
      city: 'Central Pattaya',
      yearBuilt: 2018,
      totalFloors: 8,
      totalUnits: 350,
      description: 'Resort-style condominium near the beach',
    },
    {
      name: 'Dusit Grand Park',
      nameTh: 'ดุสิต แกรนด์ พาร์ค',
      developer: 'Dusit Group',
      city: 'Jomtien',
      yearBuilt: 2020,
      totalFloors: 42,
      totalUnits: 700,
      description: 'Large-scale development with multiple towers',
    },
  ],

  // Dubai Buildings
  dubai: [
    {
      name: 'DAMAC Maison Canal Views',
      nameAr: 'داماك ميزون كانال فيوز',
      developer: 'DAMAC Properties',
      city: 'Business Bay',
      yearBuilt: 2016,
      totalFloors: 40,
      totalUnits: 250,
      description: 'Luxury serviced apartments overlooking Dubai Water Canal',
    },
    {
      name: 'DAMAC Towers by Paramount',
      nameAr: 'أبراج داماك من بارامونت',
      developer: 'DAMAC Properties',
      city: 'Business Bay',
      yearBuilt: 2017,
      totalFloors: 4,
      totalUnits: 1200,
      description: 'Hollywood-themed towers with luxury amenities',
    },
    {
      name: 'DAMAC Heights',
      nameAr: 'داماك هايتس',
      developer: 'DAMAC Properties',
      city: 'Dubai Marina',
      yearBuilt: 2013,
      totalFloors: 86,
      totalUnits: 720,
      description: 'One of the tallest residential towers in Dubai Marina',
    },
    {
      name: 'Emaar Beachfront',
      nameAr: 'إعمار بيتش فرونت',
      developer: 'Emaar Properties',
      city: 'Dubai Marina',
      yearBuilt: 2021,
      totalFloors: 27,
      totalUnits: 800,
      description: 'Exclusive beachfront community',
    },
    {
      name: 'Emaar Boulevard Heights',
      nameAr: 'إعمار بوليفارد هايتس',
      developer: 'Emaar Properties',
      city: 'Downtown Dubai',
      yearBuilt: 2017,
      totalFloors: 43,
      totalUnits: 500,
      description: 'Premium towers in Downtown Dubai',
    },
    {
      name: 'Emaar The Address Dubai Marina',
      nameAr: 'ذا أدريس دبي مارينا',
      developer: 'Emaar Properties',
      city: 'Dubai Marina',
      yearBuilt: 2008,
      totalFloors: 63,
      totalUnits: 200,
      description: 'Luxury hotel and residences',
    },
    {
      name: 'Marina Gate',
      nameAr: 'مارينا جيت',
      developer: 'Select Group',
      city: 'Dubai Marina',
      yearBuilt: 2017,
      totalFloors: 52,
      totalUnits: 800,
      description: 'Twin towers in Dubai Marina',
    },
    {
      name: 'Princess Tower',
      nameAr: 'برج الأميرة',
      developer: 'Tameer',
      city: 'Dubai Marina',
      yearBuilt: 2012,
      totalFloors: 101,
      totalUnits: 763,
      description: 'One of the tallest residential buildings in the world',
    },
    {
      name: 'JBR Sadaf',
      nameAr: 'جي بي آر صدف',
      developer: 'Dubai Properties',
      city: 'JBR (Jumeirah Beach Residence)',
      yearBuilt: 2007,
      totalFloors: 40,
      totalUnits: 450,
      description: 'Beachfront living in JBR',
    },
    {
      name: 'JBR Murjan',
      nameAr: 'جي بي آر مرجان',
      developer: 'Dubai Properties',
      city: 'JBR (Jumeirah Beach Residence)',
      yearBuilt: 2008,
      totalFloors: 35,
      totalUnits: 400,
      description: 'Popular JBR tower with beach access',
    },
    {
      name: 'The Palm Tower',
      nameAr: 'برج النخلة',
      developer: 'Nakheel',
      city: 'Palm Jumeirah',
      yearBuilt: 2021,
      totalFloors: 52,
      totalUnits: 432,
      description: 'Iconic tower on Palm Jumeirah',
    },
    {
      name: 'Burj Khalifa',
      nameAr: 'برج خليفة',
      developer: 'Emaar Properties',
      city: 'Downtown Dubai',
      yearBuilt: 2010,
      totalFloors: 163,
      totalUnits: 900,
      description: 'The tallest building in the world',
    },
    {
      name: 'Dubai Creek Harbour',
      nameAr: 'دبي كريك هاربر',
      developer: 'Emaar Properties',
      city: 'Dubai Creek Harbour',
      yearBuilt: 2022,
      totalFloors: 40,
      totalUnits: 1500,
      description: 'New waterfront development',
    },
  ],
};

async function seedBuildings() {
  console.log('🏢 Seeding buildings...\n');

  // Get countries
  const uae = await prisma.country.findUnique({ where: { code: 'AE' } });
  const thailand = await prisma.country.findUnique({ where: { code: 'TH' } });

  if (!uae || !thailand) {
    console.error('❌ Countries not found. Please run seed-geography.ts first.');
    return;
  }

  // Seed Pattaya buildings
  console.log('🇹🇭 Seeding Pattaya buildings...');
  for (const buildingData of buildingsData.pattaya) {
    const city = await prisma.city.findFirst({
      where: {
        name: buildingData.city,
        countryId: thailand.id,
      },
    });

    if (!city) {
      console.log(`⚠️  City not found: ${buildingData.city}`);
      continue;
    }

    const existing = await prisma.building.findFirst({
      where: {
        name: buildingData.name,
        cityId: city.id,
      },
    });

    if (!existing) {
      await prisma.building.create({
        data: {
          name: buildingData.name,
          nameTh: buildingData.nameTh,
          developer: buildingData.developer,
          countryId: thailand.id,
          cityId: city.id,
          yearBuilt: buildingData.yearBuilt,
          totalFloors: buildingData.totalFloors,
          totalUnits: buildingData.totalUnits,
          description: buildingData.description,
        },
      });
      console.log(`  ✅ Created: ${buildingData.name}`);
    } else {
      console.log(`  ⏭️  Already exists: ${buildingData.name}`);
    }
  }

  // Seed Dubai buildings
  console.log('\n🇦🇪 Seeding Dubai buildings...');
  for (const buildingData of buildingsData.dubai) {
    const city = await prisma.city.findFirst({
      where: {
        name: buildingData.city,
        countryId: uae.id,
      },
    });

    if (!city) {
      console.log(`⚠️  City not found: ${buildingData.city}`);
      continue;
    }

    const existing = await prisma.building.findFirst({
      where: {
        name: buildingData.name,
        cityId: city.id,
      },
    });

    if (!existing) {
      await prisma.building.create({
        data: {
          name: buildingData.name,
          nameAr: buildingData.nameAr,
          developer: buildingData.developer,
          countryId: uae.id,
          cityId: city.id,
          yearBuilt: buildingData.yearBuilt,
          totalFloors: buildingData.totalFloors,
          totalUnits: buildingData.totalUnits,
          description: buildingData.description,
        },
      });
      console.log(`  ✅ Created: ${buildingData.name}`);
    } else {
      console.log(`  ⏭️  Already exists: ${buildingData.name}`);
    }
  }

  console.log('\n✨ Building seeding completed!\n');

  // Display statistics
  const stats = await Promise.all([
    prisma.building.count({ where: { countryId: thailand.id } }),
    prisma.building.count({ where: { countryId: uae.id } }),
    prisma.building.count(),
  ]);

  console.log('📊 Statistics:');
  console.log(`   Pattaya buildings: ${stats[0]}`);
  console.log(`   Dubai buildings: ${stats[1]}`);
  console.log(`   Total buildings: ${stats[2]}`);
}

seedBuildings()
  .catch((error) => {
    console.error('❌ Error seeding buildings:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
