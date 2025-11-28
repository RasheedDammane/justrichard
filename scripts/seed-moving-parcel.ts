import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Moving and Parcel services...');

  // Create Moving Services
  const movingServices = [
    {
      id: `moving_${Date.now()}_1`,
      name: 'Premium Moving Service',
      slug: 'premium-moving-service',
      description: 'Professional moving service with experienced team and modern equipment. We handle your belongings with care and ensure safe transportation.',
      shortDescription: 'Professional moving with care and safety',
      partnerName: 'Dubai Movers Pro',
      basePrice: 500,
      pricePerKm: 10,
      pricePerCubicM: 50,
      pricePerHour: 100,
      currency: 'AED',
      packingIncluded: true,
      unpackingIncluded: true,
      assemblyIncluded: true,
      storageAvailable: true,
      vehicleTypes: ['Small Van', 'Large Van', 'Small Truck', 'Large Truck'],
      coverageAreas: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman'],
      availableDays: [1, 2, 3, 4, 5, 6, 0],
      workingHours: { start: '08:00', end: '20:00' },
      images: [],
      logo: '',
      metaTitle: 'Premium Moving Service in Dubai - Professional Movers',
      metaDescription: 'Reliable and professional moving service in Dubai with experienced team',
      isActive: true,
      isFeatured: true,
      rating: 4.8,
      totalBookings: 150,
      updatedAt: new Date(),
    },
    {
      id: `moving_${Date.now()}_2`,
      name: 'Express Moving Solutions',
      slug: 'express-moving-solutions',
      description: 'Fast and efficient moving service for urgent relocations. Same-day service available.',
      shortDescription: 'Fast moving for urgent needs',
      partnerName: 'Express Movers UAE',
      basePrice: 400,
      pricePerKm: 8,
      pricePerCubicM: 45,
      currency: 'AED',
      packingIncluded: false,
      unpackingIncluded: false,
      assemblyIncluded: false,
      storageAvailable: false,
      vehicleTypes: ['Small Van', 'Large Van'],
      coverageAreas: ['Dubai', 'Sharjah'],
      availableDays: [1, 2, 3, 4, 5, 6, 0],
      workingHours: { start: '07:00', end: '22:00' },
      images: [],
      logo: '',
      metaTitle: 'Express Moving Solutions - Same Day Moving Service',
      metaDescription: 'Fast and efficient moving service with same-day availability',
      isActive: true,
      isFeatured: false,
      rating: 4.5,
      totalBookings: 85,
      updatedAt: new Date(),
    },
    {
      id: `moving_${Date.now()}_3`,
      name: 'Budget Friendly Movers',
      slug: 'budget-friendly-movers',
      description: 'Affordable moving service without compromising quality. Perfect for students and small apartments.',
      shortDescription: 'Affordable moving for everyone',
      partnerName: 'Budget Movers',
      basePrice: 250,
      pricePerKm: 5,
      pricePerCubicM: 30,
      currency: 'AED',
      packingIncluded: false,
      unpackingIncluded: false,
      assemblyIncluded: false,
      storageAvailable: false,
      vehicleTypes: ['Small Van'],
      coverageAreas: ['Dubai', 'Sharjah', 'Ajman'],
      availableDays: [1, 2, 3, 4, 5],
      workingHours: { start: '09:00', end: '18:00' },
      images: [],
      logo: '',
      metaTitle: 'Budget Friendly Movers - Affordable Moving Service',
      metaDescription: 'Quality moving service at affordable prices',
      isActive: true,
      isFeatured: false,
      rating: 4.2,
      totalBookings: 120,
      updatedAt: new Date(),
    },
  ];

  for (const service of movingServices) {
    await prisma.movingService.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
    console.log(`✅ Created/Updated: ${service.name}`);
  }

  // Create Parcel Services
  const parcelServices = [
    {
      id: `parcel_${Date.now()}_1`,
      name: 'Express Parcel Delivery',
      slug: 'express-parcel-delivery',
      description: 'Fast and reliable parcel delivery service with same-day and next-day options. Track your parcel in real-time.',
      shortDescription: 'Fast delivery with real-time tracking',
      partnerName: 'DHL Express UAE',
      basePrice: 50,
      pricePerKg: 5,
      pricePerKm: 2,
      currency: 'AED',
      maxWeight: 30,
      maxLength: 120,
      maxWidth: 80,
      maxHeight: 80,
      expressAvailable: true,
      sameDay: true,
      nextDay: true,
      international: false,
      trackingAvailable: true,
      insuranceAvailable: true,
      coverageAreas: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'RAK', 'Fujairah'],
      logo: '',
      metaTitle: 'Express Parcel Delivery - Same Day Delivery in UAE',
      metaDescription: 'Fast and reliable parcel delivery with real-time tracking',
      isActive: true,
      isFeatured: true,
      rating: 4.9,
      totalDeliveries: 5000,
      updatedAt: new Date(),
    },
    {
      id: `parcel_${Date.now()}_2`,
      name: 'International Shipping',
      slug: 'international-shipping',
      description: 'Worldwide parcel delivery service with customs clearance assistance. Ship to over 200 countries.',
      shortDescription: 'Ship worldwide with ease',
      partnerName: 'FedEx International',
      basePrice: 100,
      pricePerKg: 15,
      currency: 'AED',
      maxWeight: 50,
      maxLength: 150,
      maxWidth: 100,
      maxHeight: 100,
      expressAvailable: true,
      sameDay: false,
      nextDay: false,
      international: true,
      trackingAvailable: true,
      insuranceAvailable: true,
      coverageAreas: ['Worldwide', 'UAE', 'Europe', 'Asia', 'Americas'],
      logo: '',
      metaTitle: 'International Shipping - Ship Worldwide from UAE',
      metaDescription: 'Reliable international parcel delivery to over 200 countries',
      isActive: true,
      isFeatured: true,
      rating: 4.7,
      totalDeliveries: 3500,
      updatedAt: new Date(),
    },
    {
      id: `parcel_${Date.now()}_3`,
      name: 'Economy Parcel Service',
      slug: 'economy-parcel-service',
      description: 'Affordable parcel delivery for non-urgent shipments. Standard delivery in 3-5 days.',
      shortDescription: 'Affordable delivery option',
      partnerName: 'Aramex Economy',
      basePrice: 30,
      pricePerKg: 3,
      currency: 'AED',
      maxWeight: 20,
      maxLength: 100,
      maxWidth: 60,
      maxHeight: 60,
      expressAvailable: false,
      sameDay: false,
      nextDay: false,
      international: false,
      trackingAvailable: true,
      insuranceAvailable: false,
      coverageAreas: ['Dubai', 'Abu Dhabi', 'Sharjah'],
      logo: '',
      metaTitle: 'Economy Parcel Service - Affordable Delivery',
      metaDescription: 'Budget-friendly parcel delivery in 3-5 days',
      isActive: true,
      isFeatured: false,
      rating: 4.3,
      totalDeliveries: 2000,
      updatedAt: new Date(),
    },
  ];

  for (const service of parcelServices) {
    await prisma.parcelService.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
    console.log(`✅ Created/Updated: ${service.name}`);
  }

  console.log('');
  console.log('🎉 Seeding completed!');
  console.log('');
  console.log('📊 Summary:');
  console.log(`   - Moving Services: ${movingServices.length}`);
  console.log(`   - Parcel Services: ${parcelServices.length}`);
  console.log('');
  console.log('🔗 Test URLs:');
  console.log('   Admin Moving: http://localhost:3100/en/admin/moving');
  console.log('   Admin Parcel: http://localhost:3100/en/admin/parcel');
  console.log('   Public Moving: http://localhost:3100/en/services/moving');
  console.log('   Public Parcel: http://localhost:3100/en/services/parcel');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
