import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface TestResult {
  table: string;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
  error?: string;
}

const results: TestResult[] = [];

async function testCRUD(
  tableName: string,
  createData: any,
  updateData: any,
  model: any
) {
  const result: TestResult = {
    table: tableName,
    create: false,
    read: false,
    update: false,
    delete: false,
  };

  try {
    // CREATE
    console.log(`\n📝 Testing ${tableName}...`);
    const created = await model.create({ data: createData });
    result.create = true;
    console.log(`  ✅ CREATE: OK`);

    // READ
    const read = await model.findUnique({ where: { id: created.id } });
    if (read) {
      result.read = true;
      console.log(`  ✅ READ: OK`);
    }

    // UPDATE
    const updated = await model.update({
      where: { id: created.id },
      data: updateData,
    });
    if (updated) {
      result.update = true;
      console.log(`  ✅ UPDATE: OK`);
    }

    // DELETE
    await model.delete({ where: { id: created.id } });
    result.delete = true;
    console.log(`  ✅ DELETE: OK`);

  } catch (error: any) {
    result.error = error.message;
    console.log(`  ❌ ERROR: ${error.message.substring(0, 100)}`);
  }

  results.push(result);
}

async function main() {
  console.log('🧪 STARTING COMPLETE CRUD TESTS...\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const testId = Date.now().toString();

  // 1. USER
  await testCRUD(
    'User',
    {
      id: `test-user-${testId}`,
      email: `test${testId}@test.com`,
      firstName: 'Test',
      lastName: 'User',
      password: 'password123',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { firstName: 'Updated' },
    prisma.user
  );

  // 2. COUNTRY
  await testCRUD(
    'Country',
    {
      id: `test-country-${testId}`,
      code: `T${testId.substring(0, 1)}`,
      name: 'Test Country',
      slug: `test-country-${testId}`,
      currency: 'USD',
      dialCode: '+999',
      updatedAt: new Date(),
    },
    { name: 'Updated Country' },
    prisma.country
  );

  // 3. CITY (needs country) - Create a country that will be used for all tests
  const testCountry = await prisma.country.create({
    data: {
      id: `country-test-${testId}`,
      code: 'TT',
      name: 'Test Country',
      slug: `test-country-${testId}`,
      currency: 'USD',
      dialCode: '+888',
      updatedAt: new Date(),
    },
  });

  await testCRUD(
    'City',
    {
      id: `test-city-${testId}`,
      name: 'Test City',
      slug: `test-city-${testId}`,
      countryId: testCountry.id,
      latitude: 0,
      longitude: 0,
      updatedAt: new Date(),
    },
    { name: 'Updated City' },
    prisma.city
  );

  // 4. CURRENCY
  await testCRUD(
    'Currency',
    {
      id: `test-currency-${testId}`,
      code: `TC${testId.substring(0, 1)}`,
      name: 'Test Currency',
      symbol: '₮',
      isActive: true,
      updatedAt: new Date(),
    },
    { name: 'Updated Currency' },
    prisma.currency
  );

  // 5. LANGUAGE
  await testCRUD(
    'Language',
    {
      id: `test-lang-${testId}`,
      code: `tl${testId.substring(0, 1)}`,
      name: 'Test Language',
      nativeName: 'Test',
      isRTL: false,
    },
    { name: 'Updated Language' },
    prisma.language
  );

  // 6. YACHT
  const cityForYacht = await prisma.city.create({
    data: {
      id: `city-yacht-${testId}`,
      name: 'Test City Yacht',
      slug: `test-city-yacht-${testId}`,
      countryId: testCountry.id,
      latitude: 0,
      longitude: 0,
      updatedAt: new Date(),
    },
  });

  await testCRUD(
    'Yacht',
    {
      id: `test-yacht-${testId}`,
      name: 'Test Yacht',
      slug: `test-yacht-${testId}`,
      brand: 'TestBrand',
      model: 'TestModel',
      year: 2024,
      length: 50,
      capacity: 10,
      pricePerHour: 1000,
      cityId: cityForYacht.id,
      countryId: testCountry.id,
      description: 'Test yacht',
      isAvailable: true,
      updatedAt: new Date(),
    },
    { name: 'Updated Yacht' },
    prisma.yacht
  );

  await prisma.city.delete({ where: { id: cityForYacht.id } });

  // 7. RENTAL CAR
  const cityForCar = await prisma.city.create({
    data: {
      id: `city-car-${testId}`,
      name: 'Test City Car',
      slug: `test-city-car-${testId}`,
      countryId: testCountry.id,
      latitude: 0,
      longitude: 0,
      updatedAt: new Date(),
    },
  });

  await testCRUD(
    'RentalCar',
    {
      id: `test-car-${testId}`,
      name: 'Test Car',
      slug: `test-car-${testId}`,
      brand: 'TestBrand',
      model: 'TestModel',
      year: 2024,
      category: 'ECONOMY',
      transmission: 'AUTOMATIC',
      fuelType: 'PETROL',
      color: 'Black',
      seats: 4,
      pricePerDay: 100,
      cityId: cityForCar.id,
      countryId: testCountry.id,
      description: 'Test car',
      isAvailable: true,
      updatedAt: new Date(),
    },
    { name: 'Updated Car' },
    prisma.rentalCar
  );

  await prisma.city.delete({ where: { id: cityForCar.id } });

  // 8. DOCTOR
  const cityForDoctor = await prisma.city.create({
    data: {
      id: `city-doctor-${testId}`,
      name: 'Test City Doctor',
      slug: `test-city-doctor-${testId}`,
      countryId: testCountry.id,
      latitude: 0,
      longitude: 0,
      updatedAt: new Date(),
    },
  });

  await testCRUD(
    'Doctor',
    {
      id: `test-doctor-${testId}`,
      slug: `test-doctor-${testId}`,
      firstName: 'John',
      lastName: 'Smith',
      title: 'Dr.',
      gender: 'Male',
      specialty: 'General Practice',
      subSpecialties: [],
      licenseNumber: `LIC-${testId}`,
      yearsOfExperience: 5,
      education: [],
      certifications: [],
      languages: ['English'],
      workingDays: ['Monday', 'Tuesday'],
      workingHours: { start: '09:00', end: '17:00' },
      services: ['Consultation'],
      treatmentAreas: ['General'],
      phone: '+1234567890',
      email: `test${testId}@test.com`,
      consultationFee: 200,
      cityId: cityForDoctor.id,
      countryId: testCountry.id,
      isActive: true,
      isAcceptingPatients: true,
      updatedAt: new Date(),
    },
    { firstName: 'Jane' },
    prisma.doctor
  );

  await prisma.city.delete({ where: { id: cityForDoctor.id } });

  // 9. LAWYER
  const cityForLawyer = await prisma.city.create({
    data: {
      id: `city-lawyer-${testId}`,
      name: 'Test City Lawyer',
      slug: `test-city-lawyer-${testId}`,
      countryId: testCountry.id,
      latitude: 0,
      longitude: 0,
      updatedAt: new Date(),
    },
  });

  await testCRUD(
    'Lawyer',
    {
      id: `test-lawyer-${testId}`,
      slug: `test-lawyer-${testId}`,
      name: 'Test Lawyer',
      title: 'Attorney at Law',
      specialization: 'Corporate Law',
      experience: 5,
      hourlyRate: 300,
      cityId: cityForLawyer.id,
      countryId: testCountry.id,
      isAvailable: true,
      updatedAt: new Date(),
    },
    { name: 'Updated Lawyer' },
    prisma.lawyer
  );

  await prisma.city.delete({ where: { id: cityForLawyer.id } });

  // 10. COACH
  const cityForCoach = await prisma.city.create({
    data: {
      id: `city-coach-${testId}`,
      name: 'Test City Coach',
      slug: `test-city-coach-${testId}`,
      countryId: testCountry.id,
      latitude: 0,
      longitude: 0,
      updatedAt: new Date(),
    },
  });

  await testCRUD(
    'Coach',
    {
      id: `test-coach-${testId}`,
      slug: `test-coach-${testId}`,
      name: 'Test Coach',
      title: 'Certified Fitness Coach',
      mainCategory: 'FITNESS',
      experience: 5,
      hourlyRate: 100,
      cityId: cityForCoach.id,
      countryId: testCountry.id,
      isAvailable: true,
      updatedAt: new Date(),
    },
    { name: 'Updated Coach' },
    prisma.coach
  );

  await prisma.city.delete({ where: { id: cityForCoach.id } });

  // 11. MAID
  const cityForMaid = await prisma.city.create({
    data: {
      id: `city-maid-${testId}`,
      name: 'Test City Maid',
      slug: `test-city-maid-${testId}`,
      countryId: testCountry.id,
      latitude: 0,
      longitude: 0,
      updatedAt: new Date(),
    },
  });

  await testCRUD(
    'Maid',
    {
      id: `test-maid-${testId}`,
      slug: `test-maid-${testId}`,
      name: 'Test Maid',
      nationality: 'Philippines',
      age: 30,
      cityId: cityForMaid.id,
      countryId: testCountry.id,
      isAvailable: true,
      updatedAt: new Date(),
    },
    { name: 'Updated Maid' },
    prisma.maid
  );

  await prisma.city.delete({ where: { id: cityForMaid.id } });

  // 12. TRANSFER
  const cityForTransfer = await prisma.city.create({
    data: {
      id: `city-transfer-${testId}`,
      name: 'Test City Transfer',
      slug: `test-city-transfer-${testId}`,
      countryId: testCountry.id,
      latitude: 0,
      longitude: 0,
      updatedAt: new Date(),
    },
  });

  await testCRUD(
    'Transfer',
    {
      id: `test-transfer-${testId}`,
      name: 'Test Transfer',
      slug: `test-transfer-${testId}`,
      description: 'Airport to hotel transfer',
      transferType: 'AIRPORT',
      fromLocation: 'Airport',
      toLocation: 'Hotel',
      vehicleType: 'SEDAN',
      price: 100,
      maxPassengers: 4,
      cityId: cityForTransfer.id,
      countryId: testCountry.id,
      isAvailable: true,
      updatedAt: new Date(),
    },
    { name: 'Updated Transfer' },
    prisma.transfer
  );

  await prisma.city.delete({ where: { id: cityForTransfer.id } });

  // Cleanup test country
  await prisma.country.delete({ where: { id: testCountry.id } });

  // 13. FOOD CATEGORY
  await testCRUD(
    'FoodCategory',
    {
      id: `test-food-cat-${testId}`,
      name: 'Test Food Category',
      slug: `test-food-cat-${testId}`,
      description: 'Test category',
      isActive: true,
      updatedAt: new Date(),
    },
    { name: 'Updated Category' },
    prisma.foodCategory
  );

  // 14. FOOD BRAND
  await testCRUD(
    'FoodBrand',
    {
      id: `test-brand-${testId}`,
      name: 'Test Brand',
      slug: `test-brand-${testId}`,
      description: 'Test brand',
      isActive: true,
      updatedAt: new Date(),
    },
    { name: 'Updated Brand' },
    prisma.foodBrand
  );

  // 15. FOOD PRODUCT
  const foodCategory = await prisma.foodCategory.create({
    data: {
      id: `cat-for-product-${testId}`,
      name: 'Test Category',
      slug: `test-cat-${testId}`,
      isActive: true,
      updatedAt: new Date(),
    },
  });

  await testCRUD(
    'FoodProduct',
    {
      name: 'Test Product',
      slug: `test-product-${testId}`,
      categoryId: foodCategory.id,
      sellingPrice: 15,
      stock: 100,
      isActive: true,
      updatedAt: new Date(),
    },
    { name: 'Updated Product' },
    prisma.foodProduct
  );

  await prisma.foodCategory.delete({ where: { id: foodCategory.id } });

  // FINAL REPORT
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 FINAL TEST REPORT');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const passed = results.filter(r => r.create && r.read && r.update && r.delete).length;
  const failed = results.length - passed;

  console.log(`✅ PASSED: ${passed}/${results.length}`);
  console.log(`❌ FAILED: ${failed}/${results.length}\n`);

  console.log('DETAILED RESULTS:\n');
  console.log('Table'.padEnd(20) + 'C  R  U  D  Status');
  console.log('─'.repeat(50));

  results.forEach(r => {
    const c = r.create ? '✅' : '❌';
    const re = r.read ? '✅' : '❌';
    const u = r.update ? '✅' : '❌';
    const d = r.delete ? '✅' : '❌';
    const status = (r.create && r.read && r.update && r.delete) ? '✅ OK' : '❌ FAIL';
    
    console.log(`${r.table.padEnd(20)}${c}  ${re}  ${u}  ${d}  ${status}`);
    
    if (r.error) {
      console.log(`  └─ Error: ${r.error.substring(0, 70)}`);
    }
  });

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`🎯 SUCCESS RATE: ${Math.round((passed / results.length) * 100)}%`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  if (failed > 0) {
    console.log('❌ FAILED TABLES:\n');
    results
      .filter(r => !(r.create && r.read && r.update && r.delete))
      .forEach(r => {
        console.log(`  • ${r.table}`);
        if (r.error) console.log(`    Error: ${r.error}`);
      });
    console.log('');
  }
}

main()
  .catch((e) => {
    console.error('❌ Fatal error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
