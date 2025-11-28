import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting basic seed...');

  // Create admin user
  const adminPassword = await hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@justrichard.com' },
    update: {},
    create: {
      id: 'admin-user-001',
      email: 'admin@justrichard.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      phone: '+971501234567',
      isEmailVerified: true,
      updatedAt: new Date(),
    },
  });
  console.log('✅ Admin user created');

  // Create UAE country
  const uae = await prisma.country.upsert({
    where: { code: 'AE' },
    update: {},
    create: {
      id: 'country-uae',
      code: 'AE',
      name: 'United Arab Emirates',
      nameAr: 'الإمارات العربية المتحدة',
      nameFr: 'Émirats arabes unis',
      slug: 'united-arab-emirates',
      dialCode: '+971',
      currency: 'AED',
      flag: '🇦🇪',
      isActive: true,
      updatedAt: new Date(),
    },
  });
  console.log('✅ UAE country created');

  // Create Dubai city
  const dubai = await prisma.city.upsert({
    where: {
      countryId_slug: {
        countryId: uae.id,
        slug: 'dubai',
      },
    },
    update: {},
    create: {
      id: 'city-dubai',
      countryId: uae.id,
      name: 'Dubai',
      nameAr: 'دبي',
      nameFr: 'Dubaï',
      slug: 'dubai',
      latitude: 25.2048,
      longitude: 55.2708,
      isActive: true,
      updatedAt: new Date(),
    },
  });
  console.log('✅ Dubai city created');

  // Create Currency AED
  const aed = await prisma.currency.upsert({
    where: { code: 'AED' },
    update: {},
    create: {
      id: 'currency-aed',
      code: 'AED',
      name: 'UAE Dirham',
      symbol: 'د.إ',
      decimalPlaces: 2,
      isActive: true,
      isDefault: true,
    },
  });
  console.log('✅ AED currency created');

  // Create sample properties
  const propertyCount = 5;
  for (let i = 1; i <= propertyCount; i++) {
    await prisma.property.upsert({
      where: { id: `property-${i}` },
      update: {},
      create: {
        id: `property-${i}`,
        title: `Luxury Apartment ${i}`,
        slug: `luxury-apartment-${i}`,
        description: `Beautiful ${i}-bedroom apartment in Dubai`,
        propertyType: 'APARTMENT',
        bedrooms: i,
        bathrooms: i,
        area: 100 + i * 10,
        price: 5000 + i * 1000,
        currency: 'AED',
        cityId: dubai.id,
        countryId: uae.id,
        status: 'AVAILABLE',
        featured: i === 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
  console.log(`✅ ${propertyCount} properties created`);

  // Create sample doctors
  const doctorCount = 8;
  for (let i = 1; i <= doctorCount; i++) {
    await prisma.doctor.upsert({
      where: { id: `doctor-${i}` },
      update: {},
      create: {
        id: `doctor-${i}`,
        name: `Dr. Doctor ${i}`,
        slug: `dr-doctor-${i}`,
        specialization: ['Cardiology', 'Pediatrics', 'Dermatology'][i % 3],
        yearsExperience: 5 + i,
        consultationFee: 300 + i * 50,
        cityId: dubai.id,
        countryId: uae.id,
        available: true,
        rating: 4.5,
        reviewCount: 10 + i,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
  console.log(`✅ ${doctorCount} doctors created`);

  // Create sample lawyers
  const lawyerCount = 5;
  for (let i = 1; i <= lawyerCount; i++) {
    await prisma.lawyer.upsert({
      where: { id: `lawyer-${i}` },
      update: {},
      create: {
        id: `lawyer-${i}`,
        name: `Lawyer ${i}`,
        slug: `lawyer-${i}`,
        specialization: ['Corporate', 'Family', 'Criminal'][i % 3],
        yearsExperience: 8 + i,
        consultationFee: 500 + i * 100,
        cityId: dubai.id,
        countryId: uae.id,
        available: true,
        rating: 4.5,
        reviewCount: 5 + i,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
  console.log(`✅ ${lawyerCount} lawyers created`);

  // Create sample coaches
  const coachCount = 6;
  for (let i = 1; i <= coachCount; i++) {
    await prisma.coach.upsert({
      where: { id: `coach-${i}` },
      update: {},
      create: {
        id: `coach-${i}`,
        name: `Coach ${i}`,
        slug: `coach-${i}`,
        specialization: ['Personal Training', 'Yoga', 'Boxing'][i % 3],
        yearsExperience: 5 + i,
        sessionFee: 200 + i * 30,
        cityId: dubai.id,
        countryId: uae.id,
        available: true,
        rating: 4.5,
        reviewCount: 15 + i,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
  console.log(`✅ ${coachCount} coaches created`);

  // Create sample maids
  const maidCount = 20;
  for (let i = 1; i <= maidCount; i++) {
    await prisma.maid.upsert({
      where: { id: `maid-${i}` },
      update: {},
      create: {
        id: `maid-${i}`,
        name: `Maid ${i}`,
        slug: `maid-${i}`,
        nationality: ['Philippines', 'Indonesia', 'India'][i % 3],
        yearsExperience: 3 + i,
        hourlyRate: 40 + i * 2,
        cityId: dubai.id,
        countryId: uae.id,
        available: true,
        rating: 4.5,
        reviewCount: 8 + i,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
  console.log(`✅ ${maidCount} maids created`);

  // Create sample yachts
  const yachtCount = 10;
  for (let i = 1; i <= yachtCount; i++) {
    await prisma.yacht.upsert({
      where: { id: `yacht-${i}` },
      update: {},
      create: {
        id: `yacht-${i}`,
        name: `Yacht ${i}`,
        slug: `yacht-${i}`,
        capacity: 10 + i * 5,
        length: 40 + i * 5,
        pricePerHour: 1000 + i * 200,
        cityId: dubai.id,
        countryId: uae.id,
        available: true,
        featured: i <= 3,
        rating: 4.5,
        viewCount: 50 + i * 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
  console.log(`✅ ${yachtCount} yachts created`);

  // Create rental cars
  const rentalCarCount = 16;
  for (let i = 1; i <= rentalCarCount; i++) {
    await prisma.rentalCar.upsert({
      where: { id: `rental-car-${i}` },
      update: {},
      create: {
        id: `rental-car-${i}`,
        brand: ['Toyota', 'Honda', 'BMW', 'Mercedes'][i % 4],
        model: `Model ${i}`,
        slug: `car-${i}`,
        year: 2020 + (i % 4),
        pricePerDay: 100 + i * 20,
        cityId: dubai.id,
        countryId: uae.id,
        available: true,
        featured: i <= 3,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        seats: 5,
        rating: 4.5,
        viewCount: 30 + i * 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
  console.log(`✅ ${rentalCarCount} rental cars created`);

  // Create motorbikes
  const motorbikeCount = 11;
  for (let i = 1; i <= motorbikeCount; i++) {
    await prisma.rentalMotorbike.upsert({
      where: { id: `motorbike-${i}` },
      update: {},
      create: {
        id: `motorbike-${i}`,
        brand: ['Honda', 'Yamaha', 'Suzuki'][i % 3],
        model: `Model ${i}`,
        slug: `motorbike-${i}`,
        year: 2020 + (i % 4),
        pricePerDay: 50 + i * 10,
        cityId: dubai.id,
        countryId: uae.id,
        available: true,
        featured: i <= 2,
        engineSize: 300 + i * 50,
        rating: 4.5,
        viewCount: 20 + i * 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
  console.log(`✅ ${motorbikeCount} motorbikes created`);

  // Create food products
  const foodCount = 16;
  for (let i = 1; i <= foodCount; i++) {
    await prisma.foodProduct.upsert({
      where: { id: `food-${i}` },
      update: {},
      create: {
        id: `food-${i}`,
        name: `Food Product ${i}`,
        slug: `food-product-${i}`,
        description: `Delicious food item ${i}`,
        category: ['Fruits', 'Vegetables', 'Meat', 'Dairy'][i % 4],
        price: 10 + i * 5,
        unit: 'kg',
        cityId: dubai.id,
        countryId: uae.id,
        available: true,
        rating: 4.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
  console.log(`✅ ${foodCount} food products created`);

  // Create transfers
  const transferCount = 20;
  for (let i = 1; i <= transferCount; i++) {
    await prisma.transfer.upsert({
      where: { id: `transfer-${i}` },
      update: {},
      create: {
        id: `transfer-${i}`,
        name: `Transfer Service ${i}`,
        slug: `transfer-${i}`,
        vehicleType: ['Sedan', 'SUV', 'Van'][i % 3],
        pricePerKm: 2 + i * 0.5,
        cityId: dubai.id,
        countryId: uae.id,
        available: true,
        rating: 4.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
  console.log(`✅ ${transferCount} transfers created`);

  // Create activities
  const activityCount = 11;
  for (let i = 1; i <= activityCount; i++) {
    await prisma.activity.upsert({
      where: { id: `activity-${i}` },
      update: {},
      create: {
        id: `activity-${i}`,
        name: `Activity ${i}`,
        slug: `activity-${i}`,
        description: `Fun activity ${i}`,
        category: ['Adventure', 'Cultural', 'Water Sports'][i % 3],
        pricePerPerson: 100 + i * 20,
        cityId: dubai.id,
        countryId: uae.id,
        rating: 4.5,
        viewCount: 40 + i * 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
  console.log(`✅ ${activityCount} activities created`);

  // Create suppliers
  const supplierCount = 10;
  for (let i = 1; i <= supplierCount; i++) {
    await prisma.supplier.upsert({
      where: { id: `supplier-${i}` },
      update: {},
      create: {
        id: `supplier-${i}`,
        name: `Supplier ${i}`,
        slug: `supplier-${i}`,
        description: `Reliable supplier ${i}`,
        category: ['Food', 'Equipment', 'Furniture'][i % 3],
        cityId: dubai.id,
        countryId: uae.id,
        available: true,
        rating: 4.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
  console.log(`✅ ${supplierCount} suppliers created`);

  console.log('✅ Basic seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
