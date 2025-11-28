import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🏍️ Starting motorbike rental seed...');

  // Get or create Thailand
  let thailand = await prisma.country.findFirst({ where: { name: 'Thailand' } });
  if (!thailand) {
    console.log('Creating Thailand...');
    thailand = await prisma.country.create({
      data: {
        id: 'th',
        code: 'TH',
        name: 'Thailand',
        flag: '🇹🇭',
        isActive: true,
        updatedAt: new Date(),
      }
    });
  }

  // Get or create cities
  let bangkok = await prisma.city.findFirst({ where: { name: 'Bangkok' } });
  if (!bangkok) {
    console.log('Creating Bangkok...');
    bangkok = await prisma.city.create({
      data: {
        id: 'bangkok',
        countryId: thailand.id,
        name: 'Bangkok',
        slug: 'bangkok',
        isActive: true,
        updatedAt: new Date(),
      }
    });
  }

  let phuket = await prisma.city.findFirst({ where: { name: 'Phuket' } });
  if (!phuket) {
    console.log('Creating Phuket...');
    phuket = await prisma.city.create({
      data: {
        id: 'phuket',
        countryId: thailand.id,
        name: 'Phuket',
        slug: 'phuket',
        isActive: true,
        updatedAt: new Date(),
      }
    });
  }

  let pattaya = await prisma.city.findFirst({ where: { name: 'Pattaya' } });
  if (!pattaya) {
    console.log('Creating Pattaya...');
    pattaya = await prisma.city.create({
      data: {
        id: 'pattaya',
        countryId: thailand.id,
        name: 'Pattaya',
        slug: 'pattaya',
        isActive: true,
        updatedAt: new Date(),
      }
    });
  }

  let chiangMai = await prisma.city.findFirst({ where: { name: 'Chiang Mai' } });
  if (!chiangMai) {
    console.log('Creating Chiang Mai...');
    chiangMai = await prisma.city.create({
      data: {
        id: 'chiang-mai',
        countryId: thailand.id,
        name: 'Chiang Mai',
        slug: 'chiang-mai',
        isActive: true,
        updatedAt: new Date(),
      }
    });
  }

  const motorbikes = [
    // Honda Scooters
    {
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
      description: 'Popular and reliable scooter, perfect for city riding. Comfortable seat, under-seat storage, and excellent fuel economy.',
      features: ['ABS', 'LED Lights', 'Digital Display', 'USB Charging', 'Under-seat Storage'],
      images: ['/images/motorbikes/honda-pcx160.jpg'],
      available: true,
      cityId: bangkok?.id,
      countryId: thailand.id,
    },
    {
      brand: 'Honda',
      model: 'Click 160',
      year: 2024,
      category: 'Scooter',
      pricePerDay: 300,
      pricePerWeek: 1800,
      pricePerMonth: 6500,
      currency: 'THB',
      seats: 2,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: 160,
      description: 'Sporty and agile scooter with great handling. Perfect for navigating through traffic.',
      features: ['LED Lights', 'Digital Display', 'Spacious Storage', 'Eco Mode'],
      images: ['/images/motorbikes/honda-click160.jpg'],
      available: true,
      cityId: phuket?.id,
      countryId: thailand.id,
    },
    {
      brand: 'Honda',
      model: 'ADV 160',
      year: 2024,
      category: 'Adventure Scooter',
      pricePerDay: 400,
      pricePerWeek: 2400,
      pricePerMonth: 8500,
      currency: 'THB',
      seats: 2,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: 160,
      description: 'Adventure scooter with higher ground clearance. Great for exploring both city and countryside.',
      features: ['ABS', 'LED Lights', 'Large Wheels', 'USB Charging', 'Wind Screen'],
      images: ['/images/motorbikes/honda-adv160.jpg'],
      available: true,
      cityId: chiangMai?.id,
      countryId: thailand.id,
    },
    {
      brand: 'Honda',
      model: 'Scoopy',
      year: 2024,
      category: 'Scooter',
      pricePerDay: 250,
      pricePerWeek: 1500,
      pricePerMonth: 5500,
      currency: 'THB',
      seats: 2,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: 110,
      description: 'Cute and economical scooter, perfect for short trips and beginners.',
      features: ['LED Lights', 'Fuel Efficient', 'Compact Size', 'Easy Handling'],
      images: ['/images/motorbikes/honda-scoopy.jpg'],
      available: true,
      cityId: pattaya?.id,
      countryId: thailand.id,
    },

    // Yamaha Scooters
    {
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
      description: 'Premium scooter with sporty design and excellent performance. Very popular among riders.',
      features: ['ABS', 'Traction Control', 'LED Lights', 'Smart Key', 'USB Charging'],
      images: ['/images/motorbikes/yamaha-nmax155.jpg'],
      available: true,
      cityId: bangkok?.id,
      countryId: thailand.id,
    },
    {
      brand: 'Yamaha',
      model: 'Aerox 155',
      year: 2024,
      category: 'Sport Scooter',
      pricePerDay: 400,
      pricePerWeek: 2400,
      pricePerMonth: 8500,
      currency: 'THB',
      seats: 2,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: 155,
      description: 'Sporty scooter with aggressive styling and powerful engine. Great for enthusiasts.',
      features: ['ABS', 'Traction Control', 'LED Lights', 'Digital Display', 'Sport Mode'],
      images: ['/images/motorbikes/yamaha-aerox155.jpg'],
      available: true,
      cityId: phuket?.id,
      countryId: thailand.id,
    },
    {
      brand: 'Yamaha',
      model: 'Mio i125',
      year: 2024,
      category: 'Scooter',
      pricePerDay: 280,
      pricePerWeek: 1680,
      pricePerMonth: 6000,
      currency: 'THB',
      seats: 2,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: 125,
      description: 'Affordable and reliable scooter for daily commuting. Very fuel efficient.',
      features: ['LED Lights', 'Digital Display', 'Fuel Efficient', 'Comfortable Seat'],
      images: ['/images/motorbikes/yamaha-mio125.jpg'],
      available: true,
      cityId: chiangMai?.id,
      countryId: thailand.id,
    },
    {
      brand: 'Yamaha',
      model: 'Fino 125',
      year: 2024,
      category: 'Scooter',
      pricePerDay: 270,
      pricePerWeek: 1620,
      pricePerMonth: 5800,
      currency: 'THB',
      seats: 2,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: 125,
      description: 'Retro-styled scooter with modern features. Stylish and practical.',
      features: ['LED Lights', 'Retro Design', 'Comfortable', 'Easy to Ride'],
      images: ['/images/motorbikes/yamaha-fino125.jpg'],
      available: true,
      cityId: pattaya?.id,
      countryId: thailand.id,
    },

    // Suzuki Scooters
    {
      brand: 'Suzuki',
      model: 'Burgman Street 125',
      year: 2024,
      category: 'Scooter',
      pricePerDay: 320,
      pricePerWeek: 1920,
      pricePerMonth: 6800,
      currency: 'THB',
      seats: 2,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: 125,
      description: 'Maxi-scooter design with excellent comfort. Great for long rides.',
      features: ['LED Lights', 'Large Storage', 'Comfortable Seat', 'Wind Protection'],
      images: ['/images/motorbikes/suzuki-burgman125.jpg'],
      available: true,
      cityId: bangkok?.id,
      countryId: thailand.id,
    },
    {
      brand: 'Suzuki',
      model: 'Address 125',
      year: 2024,
      category: 'Scooter',
      pricePerDay: 290,
      pricePerWeek: 1740,
      pricePerMonth: 6200,
      currency: 'THB',
      seats: 2,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: 125,
      description: 'Practical and economical scooter for everyday use.',
      features: ['LED Lights', 'Fuel Efficient', 'Large Storage', 'Easy Handling'],
      images: ['/images/motorbikes/suzuki-address125.jpg'],
      available: true,
      cityId: phuket?.id,
      countryId: thailand.id,
    },

    // Vespa Scooters
    {
      brand: 'Vespa',
      model: 'Primavera 150',
      year: 2024,
      category: 'Classic Scooter',
      pricePerDay: 600,
      pricePerWeek: 3600,
      pricePerMonth: 12000,
      currency: 'THB',
      seats: 2,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: 150,
      description: 'Iconic Italian scooter with timeless design. Premium quality and style.',
      features: ['ABS', 'LED Lights', 'Classic Design', 'Premium Build', 'USB Charging'],
      images: ['/images/motorbikes/vespa-primavera150.jpg'],
      available: true,
      cityId: bangkok?.id,
      countryId: thailand.id,
    },
    {
      brand: 'Vespa',
      model: 'Sprint 150',
      year: 2024,
      category: 'Sport Classic Scooter',
      pricePerDay: 650,
      pricePerWeek: 3900,
      pricePerMonth: 13000,
      currency: 'THB',
      seats: 2,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: 150,
      description: 'Sporty Vespa with aggressive styling. Perfect blend of classic and modern.',
      features: ['ABS', 'LED Lights', 'Sport Design', 'Premium Build', 'Digital Display'],
      images: ['/images/motorbikes/vespa-sprint150.jpg'],
      available: true,
      cityId: phuket?.id,
      countryId: thailand.id,
    },

    // SYM Scooters
    {
      brand: 'SYM',
      model: 'Jet 14',
      year: 2024,
      category: 'Scooter',
      pricePerDay: 260,
      pricePerWeek: 1560,
      pricePerMonth: 5500,
      currency: 'THB',
      seats: 2,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: 125,
      description: 'Affordable and reliable scooter with good fuel economy.',
      features: ['LED Lights', 'Digital Display', 'Fuel Efficient', 'Spacious Storage'],
      images: ['/images/motorbikes/sym-jet14.jpg'],
      available: true,
      cityId: chiangMai?.id,
      countryId: thailand.id,
    },
    {
      brand: 'SYM',
      model: 'Maxsym 400i',
      year: 2024,
      category: 'Maxi Scooter',
      pricePerDay: 800,
      pricePerWeek: 4800,
      pricePerMonth: 16000,
      currency: 'THB',
      seats: 2,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: 400,
      description: 'Large maxi-scooter with powerful engine. Perfect for touring and highway riding.',
      features: ['ABS', 'Traction Control', 'LED Lights', 'Large Storage', 'Wind Screen', 'USB Charging'],
      images: ['/images/motorbikes/sym-maxsym400.jpg'],
      available: true,
      cityId: bangkok?.id,
      countryId: thailand.id,
    },

    // GPX Scooters
    {
      brand: 'GPX',
      model: 'Popz 110',
      year: 2024,
      category: 'Scooter',
      pricePerDay: 220,
      pricePerWeek: 1320,
      pricePerMonth: 4500,
      currency: 'THB',
      seats: 2,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: 110,
      description: 'Budget-friendly scooter, perfect for short trips and beginners.',
      features: ['LED Lights', 'Fuel Efficient', 'Lightweight', 'Easy to Ride'],
      images: ['/images/motorbikes/gpx-popz110.jpg'],
      available: true,
      cityId: pattaya?.id,
      countryId: thailand.id,
    },
    {
      brand: 'GPX',
      model: 'Drone 150',
      year: 2024,
      category: 'Scooter',
      pricePerDay: 300,
      pricePerWeek: 1800,
      pricePerMonth: 6300,
      currency: 'THB',
      seats: 2,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: 150,
      description: 'Modern scooter with good performance and value for money.',
      features: ['LED Lights', 'Digital Display', 'USB Charging', 'Comfortable Seat'],
      images: ['/images/motorbikes/gpx-drone150.jpg'],
      available: true,
      cityId: chiangMai?.id,
      countryId: thailand.id,
    },

    // Kymco Scooters
    {
      brand: 'Kymco',
      model: 'Like 125',
      year: 2024,
      category: 'Classic Scooter',
      pricePerDay: 310,
      pricePerWeek: 1860,
      pricePerMonth: 6600,
      currency: 'THB',
      seats: 2,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: 125,
      description: 'Retro-styled scooter with modern technology. Stylish and reliable.',
      features: ['LED Lights', 'Retro Design', 'Digital Display', 'Comfortable'],
      images: ['/images/motorbikes/kymco-like125.jpg'],
      available: true,
      cityId: bangkok?.id,
      countryId: thailand.id,
    },
    {
      brand: 'Kymco',
      model: 'X-Town 300i',
      year: 2024,
      category: 'Sport Scooter',
      pricePerDay: 700,
      pricePerWeek: 4200,
      pricePerMonth: 14000,
      currency: 'THB',
      seats: 2,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: 300,
      description: 'Powerful sport scooter with excellent performance. Great for long distance riding.',
      features: ['ABS', 'Traction Control', 'LED Lights', 'Large Storage', 'Sport Mode'],
      images: ['/images/motorbikes/kymco-xtown300.jpg'],
      available: true,
      cityId: phuket?.id,
      countryId: thailand.id,
    },

    // Piaggio Scooters
    {
      brand: 'Piaggio',
      model: 'Liberty 150',
      year: 2024,
      category: 'Scooter',
      pricePerDay: 450,
      pricePerWeek: 2700,
      pricePerMonth: 9500,
      currency: 'THB',
      seats: 2,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: 150,
      description: 'Italian scooter with elegant design and smooth ride. Premium quality.',
      features: ['ABS', 'LED Lights', 'Digital Display', 'USB Charging', 'Premium Build'],
      images: ['/images/motorbikes/piaggio-liberty150.jpg'],
      available: true,
      cityId: bangkok?.id,
      countryId: thailand.id,
    },
    {
      brand: 'Piaggio',
      model: 'Medley 150',
      year: 2024,
      category: 'Scooter',
      pricePerDay: 480,
      pricePerWeek: 2880,
      pricePerMonth: 10000,
      currency: 'THB',
      seats: 2,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: 150,
      description: 'Comfortable and practical scooter with large wheels. Great stability and handling.',
      features: ['ABS', 'LED Lights', 'Large Wheels', 'USB Charging', 'Spacious Storage'],
      images: ['/images/motorbikes/piaggio-medley150.jpg'],
      available: true,
      cityId: phuket?.id,
      countryId: thailand.id,
    },
  ];

  console.log(`📝 Creating ${motorbikes.length} motorbikes...`);

  for (let i = 0; i < motorbikes.length; i++) {
    const motorbike = motorbikes[i];
    const slug = `${motorbike.brand.toLowerCase()}-${motorbike.model.toLowerCase().replace(/\s+/g, '-')}-${motorbike.year}`;
    await prisma.rentalMotorbike.create({
      data: {
        ...motorbike,
        id: `motorbike-${slug}-${i + 1}`,
        slug,
      },
    });
  }

  console.log('✅ Motorbike rental seed completed!');
  console.log(`📊 Total motorbikes created: ${motorbikes.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding motorbikes:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
