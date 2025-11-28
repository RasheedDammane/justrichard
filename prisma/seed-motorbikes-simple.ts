import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🏍️ Starting simple motorbike seed...');

  // Get Thailand
  const thailand = await prisma.country.findFirst({ where: { code: 'TH' } });
  if (!thailand) {
    console.log('❌ Thailand not found. Run geography seed first.');
    return;
  }

  // Get Bangkok
  const bangkok = await prisma.city.findFirst({ where: { slug: 'bangkok' } });
  if (!bangkok) {
    console.log('❌ Bangkok not found. Creating it...');
  }

  // Create simple motorbikes
  const motorbikes = [
    {
      id: 'motorbike-honda-pcx-160',
      slug: 'honda-pcx-160-2024',
      brand: 'Honda',
      model: 'PCX 160',
      year: 2024,
      category: 'Scooter',
      pricePerDay: 350,
      pricePerWeek: 2100,
      pricePerMonth: 7500,
      currency: 'THB',
      seats: 2,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: 160,
      description: 'Popular scooter perfect for city riding',
      features: ['ABS', 'LED Lights', 'Digital Display'],
      images: ['/images/motorbikes/honda-pcx160.jpg'],
      available: true,
      cityId: bangkok?.id,
      countryId: thailand.id,
    },
    {
      id: 'motorbike-yamaha-aerox',
      slug: 'yamaha-aerox-155-2024',
      brand: 'Yamaha',
      model: 'Aerox 155',
      year: 2024,
      category: 'Scooter',
      pricePerDay: 400,
      pricePerWeek: 2400,
      pricePerMonth: 8500,
      currency: 'THB',
      seats: 2,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: 155,
      description: 'Sporty scooter with great performance',
      features: ['ABS', 'LED Lights', 'Smart Key'],
      images: ['/images/motorbikes/yamaha-aerox.jpg'],
      available: true,
      cityId: bangkok?.id,
      countryId: thailand.id,
    },
    {
      id: 'motorbike-honda-click',
      slug: 'honda-click-150-2024',
      brand: 'Honda',
      model: 'Click 150',
      year: 2024,
      category: 'Scooter',
      pricePerDay: 300,
      pricePerWeek: 1800,
      pricePerMonth: 6500,
      currency: 'THB',
      seats: 2,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: 150,
      description: 'Affordable and reliable daily scooter',
      features: ['LED Lights', 'Under-seat Storage'],
      images: ['/images/motorbikes/honda-click.jpg'],
      available: true,
      cityId: bangkok?.id,
      countryId: thailand.id,
    },
    {
      id: 'motorbike-kawasaki-ninja',
      slug: 'kawasaki-ninja-400-2024',
      brand: 'Kawasaki',
      model: 'Ninja 400',
      year: 2024,
      category: 'Sport',
      pricePerDay: 800,
      pricePerWeek: 5000,
      pricePerMonth: 18000,
      currency: 'THB',
      seats: 2,
      transmission: 'Manual',
      fuelType: 'Petrol',
      engineSize: 400,
      description: 'Sport bike with amazing performance',
      features: ['ABS', 'Slipper Clutch', 'LED Lights', 'Digital Display'],
      images: ['/images/motorbikes/kawasaki-ninja.jpg'],
      available: true,
      cityId: bangkok?.id,
      countryId: thailand.id,
    },
    {
      id: 'motorbike-honda-forza',
      slug: 'honda-forza-350-2024',
      brand: 'Honda',
      model: 'Forza 350',
      year: 2024,
      category: 'Maxi Scooter',
      pricePerDay: 600,
      pricePerWeek: 3600,
      pricePerMonth: 13000,
      currency: 'THB',
      seats: 2,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: 350,
      description: 'Premium maxi scooter for long rides',
      features: ['ABS', 'Traction Control', 'Smart Key', 'USB Charging'],
      images: ['/images/motorbikes/honda-forza.jpg'],
      available: true,
      cityId: bangkok?.id,
      countryId: thailand.id,
    },
    {
      id: 'motorbike-yamaha-nmax',
      slug: 'yamaha-nmax-155-2024',
      brand: 'Yamaha',
      model: 'NMAX 155',
      year: 2024,
      category: 'Scooter',
      pricePerDay: 380,
      pricePerWeek: 2280,
      pricePerMonth: 8000,
      currency: 'THB',
      seats: 2,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: 155,
      description: 'Premium scooter with excellent features',
      features: ['ABS', 'Smart Key', 'LED Lights', 'USB Charging'],
      images: ['/images/motorbikes/yamaha-nmax.jpg'],
      available: true,
      cityId: bangkok?.id,
      countryId: thailand.id,
    },
    {
      id: 'motorbike-honda-cbr',
      slug: 'honda-cbr-500r-2024',
      brand: 'Honda',
      model: 'CBR 500R',
      year: 2024,
      category: 'Sport',
      pricePerDay: 900,
      pricePerWeek: 5500,
      pricePerMonth: 20000,
      currency: 'THB',
      seats: 2,
      transmission: 'Manual',
      fuelType: 'Petrol',
      engineSize: 500,
      description: 'Sport touring bike for enthusiasts',
      features: ['ABS', 'LED Lights', 'Digital Display', 'Gear Indicator'],
      images: ['/images/motorbikes/honda-cbr.jpg'],
      available: true,
      cityId: bangkok?.id,
      countryId: thailand.id,
    },
    {
      id: 'motorbike-vespa-gts',
      slug: 'vespa-gts-300-2024',
      brand: 'Vespa',
      model: 'GTS 300',
      year: 2024,
      category: 'Scooter',
      pricePerDay: 700,
      pricePerWeek: 4200,
      pricePerMonth: 15000,
      currency: 'THB',
      seats: 2,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: 300,
      description: 'Classic Italian scooter with style',
      features: ['ABS', 'LED Lights', 'Digital Display', 'USB Charging'],
      images: ['/images/motorbikes/vespa-gts.jpg'],
      available: true,
      cityId: bangkok?.id,
      countryId: thailand.id,
    },
    {
      id: 'motorbike-suzuki-burgman',
      slug: 'suzuki-burgman-400-2024',
      brand: 'Suzuki',
      model: 'Burgman 400',
      year: 2024,
      category: 'Maxi Scooter',
      pricePerDay: 650,
      pricePerWeek: 3900,
      pricePerMonth: 14000,
      currency: 'THB',
      seats: 2,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: 400,
      description: 'Comfortable maxi scooter for touring',
      features: ['ABS', 'Large Storage', 'LED Lights', 'Digital Display'],
      images: ['/images/motorbikes/suzuki-burgman.jpg'],
      available: true,
      cityId: bangkok?.id,
      countryId: thailand.id,
    },
    {
      id: 'motorbike-ducati-monster',
      slug: 'ducati-monster-821-2024',
      brand: 'Ducati',
      model: 'Monster 821',
      year: 2024,
      category: 'Naked',
      pricePerDay: 1500,
      pricePerWeek: 9000,
      pricePerMonth: 32000,
      currency: 'THB',
      seats: 2,
      transmission: 'Manual',
      fuelType: 'Premium',
      engineSize: 821,
      description: 'Italian naked bike with incredible performance',
      features: ['ABS', 'Traction Control', 'Riding Modes', 'Quick Shifter'],
      images: ['/images/motorbikes/ducati-monster.jpg'],
      available: true,
      cityId: bangkok?.id,
      countryId: thailand.id,
    },
  ];

  console.log(`📝 Creating ${motorbikes.length} motorbikes...`);

  for (const motorbike of motorbikes) {
    const data = { ...motorbike, updatedAt: new Date() };
    await prisma.rentalMotorbike.upsert({
      where: { id: motorbike.id },
      update: data,
      create: data,
    });
    console.log(`✅ Created/Updated: ${motorbike.brand} ${motorbike.model}`);
  }

  console.log('✅ Motorbike seed completed!');
  console.log(`📊 Total motorbikes: ${motorbikes.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding motorbikes:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
