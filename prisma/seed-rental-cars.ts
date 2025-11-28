import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚗 Seeding Rental Cars...');

  // Récupérer Dubai et UAE
  const dubai = await prisma.city.findFirst({
    where: { name: 'Dubai' },
  });

  const uae = await prisma.country.findFirst({
    where: { code: 'AE' },
  });

  if (!dubai || !uae) {
    console.error('❌ Dubai or UAE not found in database');
    return;
  }

  const rentalCars = [
    // 1. PORSCHE GT3 RS WEISSACH 2024 - SUPER
    {
      slug: 'porsche-gt3-rs-weissach-2024',
      name: 'PORSCHE GT3 RS WEISSACH 2024',
      brand: 'PORSCHE',
      model: 'GT3 RS WEISSACH',
      year: 2024,
      category: 'SUPER',
      description: 'Rent the PORSCHE GT3 RS WEISSACH 2024 in Dubai and enjoy a smooth blend of style, comfort, and performance. This 2024 model offers seating for 2 seats, with a PREMIUM engine that delivers up to 518 HP. With a top speed of 312 km/h and 4 cylinders, it\'s designed for confident drives. Finished in ACID GREEN, featuring 2 doors and luggage space ideal for everyday needs, this car is a great choice for city trips or weekend getaways.',
      shortDescription: 'Experience pure racing performance with the iconic GT3 RS',
      doors: 2,
      seats: 2,
      horsepower: 518,
      cylinders: 4,
      acceleration: '3.2 Sec',
      topSpeed: 312,
      fuelType: 'PREMIUM',
      transmission: 'AUTOMATIC',
      color: 'ACID GREEN',
      pricePerDay: 3799,
      pricePerWeek: 25499,
      pricePerMonth: 94999,
      currency: 'AED',
      deposit: 0,
      noDeposit: true,
      noDepositFee: 480,
      mileagePerDay: 250,
      mileagePerWeek: 1500,
      mileagePerMonth: 4500,
      extraKmFee: 25,
      freeDelivery: true,
      pickupFee: 0,
      dropoffFee: 0,
      minAge: 25,
      minDays: 1,
      instantBooking: true,
      features: JSON.stringify([
        'Cruise Control: Yes',
        'Tinted Windows',
        'Premium Audio',
        'Parking Assist',
        'Parking Sensors',
        'Reverse Camera',
        'Paddle Shift (Tiptronic)',
        'Apple Carplay'
      ]),
      images: JSON.stringify([
        '/images/rental/porsche-gt3-1.jpg',
        '/images/rental/porsche-gt3-2.jpg',
        '/images/rental/porsche-gt3-3.jpg'
      ]),
      mainImage: '/images/rental/porsche-gt3-main.jpg',
      brandLogo: '/images/brands/porsche.webp',
      cityId: dubai.id,
      countryId: uae.id,
      providerName: 'Jehad',
      providerRating: 5,
      providerReviews: 1,
      providerVerified: true,
      providerCarsCount: 13,
      isNewArrival: true,
      isFeatured: true,
      rating: 5,
      reviewCount: 1,
      deliveryLocations: JSON.stringify([
        { city: 'Dubai', pickupFee: 0, dropoffFee: 0 }
      ]),
      requiredDocuments: JSON.stringify(['Passport', 'Driving License', 'Visa']),
      faq: JSON.stringify([
        {
          question: 'How much does it cost to rent the PORSCHE GT3 RS WEISSACH 2024 in Dubai?',
          answer: 'The rental cost starts from AED 3799 per day, AED 25499 per week, and AED 94999 per month.'
        },
        {
          question: 'What is the minimum age required to rent PORSCHE GT3 RS WEISSACH 2024?',
          answer: 'The minimum age required is 25 years old.'
        },
        {
          question: 'What\'s included in the rental, and what are the mileage limits?',
          answer: 'The rental includes 250 km per day, 1500 km per week, or 4500 km per month. Extra kilometers are charged at AED 25/km.'
        },
        {
          question: 'Is there a minimum rental period for the PORSCHE GT3 RS WEISSACH 2024?',
          answer: 'Yes, the minimum rental period is 1 day.'
        },
        {
          question: 'What happens if I exceed the mileage limit?',
          answer: 'You will be charged AED 25 for every extra kilometer.'
        }
      ])
    },

    // 2. Range Rover Sport 2025 - LUXURY SUV
    {
      slug: 'range-rover-sport-2025',
      name: 'Range Rover Sport 2025',
      brand: 'LAND ROVER',
      model: 'Range Rover Sport',
      year: 2025,
      category: 'SUV',
      description: 'Experience luxury and performance with the Range Rover Sport 2025. Perfect for Dubai\'s roads with premium comfort and advanced technology.',
      shortDescription: 'Luxury SUV with exceptional comfort and performance',
      doors: 4,
      seats: 5,
      horsepower: 400,
      cylinders: 6,
      acceleration: '5.7 Sec',
      topSpeed: 225,
      fuelType: 'DIESEL',
      transmission: 'AUTOMATIC',
      color: 'BLACK',
      pricePerDay: 1299,
      pricePerWeek: 8500,
      pricePerMonth: 32000,
      currency: 'AED',
      deposit: 0,
      noDeposit: true,
      noDepositFee: 200,
      mileagePerDay: 260,
      mileagePerWeek: 1800,
      mileagePerMonth: 5000,
      extraKmFee: 20,
      freeDelivery: true,
      minAge: 25,
      minDays: 1,
      instantBooking: true,
      features: JSON.stringify([
        'Panoramic Sunroof',
        'Leather Seats',
        'Navigation System',
        'Parking Sensors',
        'Reverse Camera',
        '360 Camera',
        'Adaptive Cruise Control',
        'Heated Seats'
      ]),
      images: JSON.stringify([
        '/images/rental/range-rover-1.jpg',
        '/images/rental/range-rover-2.jpg'
      ]),
      mainImage: '/images/rental/range-rover-main.jpg',
      brandLogo: '/images/brands/land-rover.webp',
      cityId: dubai.id,
      countryId: uae.id,
      isNewArrival: true,
      isFeatured: true,
      rating: 5,
      reviewCount: 0
    },

    // 3. Cadillac Escalade 2025 - LUXURY SUV
    {
      slug: 'cadillac-escalade-2025',
      name: 'Cadillac Escalade 2025',
      brand: 'CADILLAC',
      model: 'Escalade',
      year: 2025,
      category: 'SUV',
      description: 'The ultimate American luxury SUV. Spacious, powerful, and loaded with premium features for the perfect Dubai experience.',
      shortDescription: 'American luxury at its finest',
      doors: 4,
      seats: 7,
      horsepower: 420,
      cylinders: 8,
      acceleration: '6.1 Sec',
      topSpeed: 210,
      fuelType: 'PETROL',
      transmission: 'AUTOMATIC',
      color: 'WHITE',
      pricePerDay: 900,
      pricePerWeek: 6000,
      pricePerMonth: 22000,
      currency: 'AED',
      deposit: 0,
      noDeposit: true,
      noDepositFee: 150,
      mileagePerDay: 260,
      freeDelivery: true,
      minAge: 25,
      minDays: 1,
      instantBooking: true,
      features: JSON.stringify([
        'Premium Sound System',
        'Rear Entertainment',
        'Cooled Seats',
        'Massage Seats',
        'Power Liftgate',
        'Wireless Charging'
      ]),
      images: JSON.stringify(['/images/rental/escalade-1.jpg']),
      mainImage: '/images/rental/escalade-main.jpg',
      brandLogo: '/images/brands/cadillac.webp',
      cityId: dubai.id,
      countryId: uae.id,
      isNewArrival: true,
      isFeatured: false,
      rating: 5
    },

    // 4. Mercedes S-Class 2024 - LUXURY SEDAN
    {
      slug: 'mercedes-s-class-2024',
      name: 'Mercedes S-Class 2024',
      brand: 'MERCEDES',
      model: 'S-Class',
      year: 2024,
      category: 'LUXURY',
      description: 'The pinnacle of luxury sedans. Unmatched comfort, cutting-edge technology, and elegant design.',
      shortDescription: 'The ultimate luxury sedan experience',
      doors: 4,
      seats: 5,
      horsepower: 429,
      cylinders: 6,
      acceleration: '4.9 Sec',
      topSpeed: 250,
      fuelType: 'PREMIUM',
      transmission: 'AUTOMATIC',
      color: 'SILVER',
      pricePerDay: 1500,
      pricePerWeek: 10000,
      pricePerMonth: 38000,
      currency: 'AED',
      deposit: 0,
      noDeposit: true,
      noDepositFee: 250,
      mileagePerDay: 250,
      freeDelivery: true,
      minAge: 25,
      minDays: 1,
      instantBooking: true,
      features: JSON.stringify([
        'MBUX System',
        'Burmester Sound',
        'Ambient Lighting',
        'Massage Seats',
        'Head-Up Display',
        'Night Vision'
      ]),
      images: JSON.stringify(['/images/rental/s-class-1.jpg']),
      mainImage: '/images/rental/s-class-main.jpg',
      brandLogo: '/images/brands/mercedes.webp',
      cityId: dubai.id,
      countryId: uae.id,
      isFeatured: true,
      rating: 5
    },

    // 5. BMW M4 Competition 2024 - SPORTS
    {
      slug: 'bmw-m4-competition-2024',
      name: 'BMW M4 Competition 2024',
      brand: 'BMW',
      model: 'M4 Competition',
      year: 2024,
      category: 'SPORTS',
      description: 'Pure driving pleasure. The M4 Competition delivers thrilling performance with BMW\'s legendary M-Power.',
      shortDescription: 'M-Power performance at its best',
      doors: 2,
      seats: 4,
      horsepower: 503,
      cylinders: 6,
      acceleration: '3.9 Sec',
      topSpeed: 290,
      fuelType: 'PREMIUM',
      transmission: 'AUTOMATIC',
      color: 'BLUE',
      pricePerDay: 1800,
      pricePerWeek: 12000,
      pricePerMonth: 45000,
      currency: 'AED',
      deposit: 0,
      noDeposit: true,
      noDepositFee: 300,
      mileagePerDay: 250,
      freeDelivery: true,
      minAge: 25,
      minDays: 1,
      instantBooking: true,
      features: JSON.stringify([
        'M Sport Exhaust',
        'Carbon Fiber Roof',
        'M Sport Seats',
        'Harman Kardon Sound',
        'Adaptive M Suspension'
      ]),
      images: JSON.stringify(['/images/rental/m4-1.jpg']),
      mainImage: '/images/rental/m4-main.jpg',
      brandLogo: '/images/brands/bmw.webp',
      cityId: dubai.id,
      countryId: uae.id,
      isFeatured: true,
      rating: 5
    },

    // 6. Toyota Camry 2024 - SEDAN
    {
      slug: 'toyota-camry-2024',
      name: 'Toyota Camry 2024',
      brand: 'TOYOTA',
      model: 'Camry',
      year: 2024,
      category: 'SEDAN',
      description: 'Reliable, comfortable, and fuel-efficient. Perfect for business trips and daily commutes in Dubai.',
      shortDescription: 'Reliable and comfortable sedan',
      doors: 4,
      seats: 5,
      horsepower: 203,
      cylinders: 4,
      acceleration: '8.4 Sec',
      topSpeed: 210,
      fuelType: 'PETROL',
      transmission: 'AUTOMATIC',
      color: 'WHITE',
      pricePerDay: 180,
      pricePerWeek: 1200,
      pricePerMonth: 4500,
      currency: 'AED',
      deposit: 1500,
      noDeposit: false,
      mileagePerDay: 300,
      freeDelivery: true,
      minAge: 23,
      minDays: 1,
      instantBooking: true,
      features: JSON.stringify([
        'Bluetooth',
        'USB Ports',
        'Backup Camera',
        'Lane Departure Warning',
        'Adaptive Cruise Control'
      ]),
      images: JSON.stringify(['/images/rental/camry-1.jpg']),
      mainImage: '/images/rental/camry-main.jpg',
      brandLogo: '/images/brands/toyota.webp',
      cityId: dubai.id,
      countryId: uae.id,
      rating: 4.8
    },

    // 7. Nissan Sunny 2024 - ECONOMY
    {
      slug: 'nissan-sunny-2024',
      name: 'Nissan Sunny 2024',
      brand: 'NISSAN',
      model: 'Sunny',
      year: 2024,
      category: 'ECONOMY',
      description: 'Budget-friendly and fuel-efficient. Perfect for tourists and budget-conscious travelers.',
      shortDescription: 'Affordable and efficient',
      doors: 4,
      seats: 5,
      horsepower: 118,
      cylinders: 4,
      acceleration: '11.2 Sec',
      topSpeed: 180,
      fuelType: 'PETROL',
      transmission: 'AUTOMATIC',
      color: 'SILVER',
      pricePerDay: 90,
      pricePerWeek: 600,
      pricePerMonth: 2200,
      currency: 'AED',
      deposit: 1000,
      noDeposit: false,
      mileagePerDay: 250,
      freeDelivery: true,
      minAge: 21,
      minDays: 1,
      instantBooking: true,
      features: JSON.stringify([
        'Air Conditioning',
        'Power Windows',
        'Central Locking',
        'ABS',
        'Airbags'
      ]),
      images: JSON.stringify(['/images/rental/sunny-1.jpg']),
      mainImage: '/images/rental/sunny-main.jpg',
      brandLogo: '/images/brands/nissan.webp',
      cityId: dubai.id,
      countryId: uae.id,
      rating: 4.5
    },

    // 8. Lamborghini Huracan EVO 2024 - SUPER
    {
      slug: 'lamborghini-huracan-evo-2024',
      name: 'Lamborghini Huracan EVO 2024',
      brand: 'LAMBORGHINI',
      model: 'Huracan EVO',
      year: 2024,
      category: 'SUPER',
      description: 'Italian supercar excellence. Experience the thrill of driving a Lamborghini in Dubai.',
      shortDescription: 'Italian supercar perfection',
      doors: 2,
      seats: 2,
      horsepower: 640,
      cylinders: 10,
      acceleration: '2.9 Sec',
      topSpeed: 325,
      fuelType: 'PREMIUM',
      transmission: 'AUTOMATIC',
      color: 'ORANGE',
      pricePerDay: 4500,
      pricePerWeek: 30000,
      pricePerMonth: 110000,
      currency: 'AED',
      deposit: 0,
      noDeposit: true,
      noDepositFee: 600,
      mileagePerDay: 200,
      freeDelivery: true,
      minAge: 25,
      minDays: 1,
      instantBooking: true,
      features: JSON.stringify([
        'Carbon Ceramic Brakes',
        'Sport Exhaust',
        'Alcantara Interior',
        'Lifting System',
        'Rear Camera'
      ]),
      images: JSON.stringify(['/images/rental/huracan-1.jpg']),
      mainImage: '/images/rental/huracan-main.jpg',
      brandLogo: '/images/brands/lamborghini.webp',
      cityId: dubai.id,
      countryId: uae.id,
      isFeatured: true,
      rating: 5
    },

    // 9. Tesla Model 3 2024 - ELECTRIC
    {
      slug: 'tesla-model-3-2024',
      name: 'Tesla Model 3 2024',
      brand: 'TESLA',
      model: 'Model 3',
      year: 2024,
      category: 'ELECTRIC',
      description: 'The future of driving. Zero emissions, cutting-edge technology, and incredible performance.',
      shortDescription: 'Electric performance sedan',
      doors: 4,
      seats: 5,
      horsepower: 480,
      cylinders: 0,
      acceleration: '3.1 Sec',
      topSpeed: 261,
      fuelType: 'ELECTRIC',
      transmission: 'AUTOMATIC',
      color: 'RED',
      pricePerDay: 450,
      pricePerWeek: 3000,
      pricePerMonth: 11000,
      currency: 'AED',
      deposit: 0,
      noDeposit: true,
      noDepositFee: 100,
      mileagePerDay: 300,
      freeDelivery: true,
      minAge: 23,
      minDays: 1,
      instantBooking: true,
      features: JSON.stringify([
        'Autopilot',
        'Premium Audio',
        'Glass Roof',
        'Supercharger Access',
        'Over-the-Air Updates'
      ]),
      images: JSON.stringify(['/images/rental/model3-1.jpg']),
      mainImage: '/images/rental/model3-main.jpg',
      brandLogo: '/images/brands/tesla.webp',
      cityId: dubai.id,
      countryId: uae.id,
      isFeatured: true,
      rating: 4.9
    },

    // 10. Audi RS6 Avant 2024 - SPORTS
    {
      slug: 'audi-rs6-avant-2024',
      name: 'Audi RS6 Avant 2024',
      brand: 'AUDI',
      model: 'RS6 Avant',
      year: 2024,
      category: 'SPORTS',
      description: 'The ultimate performance wagon. Supercar performance with practical everyday usability.',
      shortDescription: 'Performance wagon perfection',
      doors: 4,
      seats: 5,
      horsepower: 600,
      cylinders: 8,
      acceleration: '3.6 Sec',
      topSpeed: 305,
      fuelType: 'PREMIUM',
      transmission: 'AUTOMATIC',
      color: 'GREY',
      pricePerDay: 2200,
      pricePerWeek: 14000,
      pricePerMonth: 52000,
      currency: 'AED',
      deposit: 0,
      noDeposit: true,
      noDepositFee: 350,
      mileagePerDay: 250,
      freeDelivery: true,
      minAge: 25,
      minDays: 1,
      instantBooking: true,
      features: JSON.stringify([
        'Quattro AWD',
        'Sport Differential',
        'Bang & Olufsen Sound',
        'Matrix LED Headlights',
        'Virtual Cockpit'
      ]),
      images: JSON.stringify(['/images/rental/rs6-1.jpg']),
      mainImage: '/images/rental/rs6-main.jpg',
      brandLogo: '/images/brands/audi.webp',
      cityId: dubai.id,
      countryId: uae.id,
      isFeatured: true,
      rating: 5
    }
  ];

  for (const car of rentalCars) {
    try {
      await prisma.rentalCar.upsert({
        where: { slug: car.slug },
        update: car,
        create: car,
      });
      console.log(`✅ Created/Updated: ${car.name}`);
    } catch (error) {
      console.error(`❌ Error creating ${car.name}:`, error);
    }
  }

  console.log('✅ Rental Cars seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
