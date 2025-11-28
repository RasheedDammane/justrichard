import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import bcrypt from 'bcryptjs';
import csv from 'csv-parser';

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => rl.question(query, resolve));
}

interface ImportOptions {
  file: string;
  type: string;
  format: 'json' | 'csv';
  includeImages: boolean;
  includePrices: boolean;
  includeBookings: boolean;
}

const IMPORT_TYPES = [
  'User',
  'Country',
  'City',
  'Currency',
  'Language',
  'Property',
  'Yacht',
  'RentalCar',
  'Doctor',
  'Lawyer',
  'Coach',
  'Maid',
  'Transfer',
  'FoodCategory',
  'FoodBrand',
  'FoodProduct',
];

async function readJSONFile(filePath: string): Promise<any[]> {
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

async function readCSVFile(filePath: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const results: any[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
}

async function importUsers(data: any[], options: ImportOptions) {
  console.log('\n👥 Importing Users...');
  let count = 0;

  for (const item of data) {
    try {
      const hashedPassword = item.password 
        ? await bcrypt.hash(item.password, 10)
        : await bcrypt.hash('password123', 10);

      await prisma.user.create({
        data: {
          id: `user-${Date.now()}-${count}`,
          email: item.email,
          password: hashedPassword,
          firstName: item.firstName,
          lastName: item.lastName,
          phone: item.phone,
          locale: item.locale || 'en',
          isActive: item.isActive !== false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      count++;
      console.log(`  ✅ Created user: ${item.email}`);
    } catch (error: any) {
      console.log(`  ❌ Error creating ${item.email}: ${error.message}`);
    }
  }

  console.log(`\n✅ Imported ${count} users`);
}

async function importProperties(data: any[], options: ImportOptions) {
  console.log('\n🏠 Importing Properties...');
  let count = 0;

  for (const item of data) {
    try {
      const propertyData: any = {
        title: item.title,
        slug: item.slug,
        description: item.description,
        type: item.type,
        status: item.status,
        bedrooms: parseInt(item.bedrooms),
        bathrooms: parseInt(item.bathrooms),
        area: parseFloat(item.area),
        cityId: item.cityId,
        countryId: item.countryId,
        isAvailable: item.isAvailable !== false,
        isFeatured: item.isFeatured === true,
        updatedAt: new Date(),
      };

      if (options.includePrices && item.price) {
        propertyData.price = parseFloat(item.price);
        propertyData.currency = item.currency || 'AED';
      }

      if (options.includeImages && item.images) {
        propertyData.images = Array.isArray(item.images) ? item.images : JSON.parse(item.images);
      }

      if (item.features) {
        propertyData.features = Array.isArray(item.features) ? item.features : JSON.parse(item.features);
      }

      if (item.latitude) propertyData.latitude = parseFloat(item.latitude);
      if (item.longitude) propertyData.longitude = parseFloat(item.longitude);

      await prisma.property.create({ data: propertyData });
      count++;
      console.log(`  ✅ Created property: ${item.title}`);
    } catch (error: any) {
      console.log(`  ❌ Error creating ${item.title}: ${error.message}`);
    }
  }

  console.log(`\n✅ Imported ${count} properties`);
}

async function importYachts(data: any[], options: ImportOptions) {
  console.log('\n⛵ Importing Yachts...');
  let count = 0;

  for (const item of data) {
    try {
      const yachtData: any = {
        id: `yacht-${Date.now()}-${count}`,
        name: item.name,
        slug: item.slug,
        brand: item.brand,
        model: item.model,
        year: item.year ? parseInt(item.year) : undefined,
        length: item.length ? parseFloat(item.length) : undefined,
        capacity: item.capacity ? parseInt(item.capacity) : undefined,
        cabins: item.cabins ? parseInt(item.cabins) : undefined,
        bathrooms: item.bathrooms ? parseInt(item.bathrooms) : undefined,
        crew: item.crew ? parseInt(item.crew) : undefined,
        description: item.description,
        cityId: item.cityId,
        countryId: item.countryId,
        isActive: item.isActive !== false,
        isFeatured: item.isFeatured === true,
        isAvailable: item.isAvailable !== false,
        updatedAt: new Date(),
      };

      if (options.includePrices) {
        if (item.pricePerHour) yachtData.pricePerHour = parseFloat(item.pricePerHour);
        if (item.priceFor2Hours) yachtData.priceFor2Hours = parseFloat(item.priceFor2Hours);
        if (item.priceFor4Hours) yachtData.priceFor4Hours = parseFloat(item.priceFor4Hours);
        if (item.pricePerDay) yachtData.pricePerDay = parseFloat(item.pricePerDay);
        yachtData.currency = item.currency || 'AED';
      }

      if (options.includeImages && item.images) {
        yachtData.images = Array.isArray(item.images) ? item.images : JSON.parse(item.images);
      }

      if (item.features) {
        yachtData.features = Array.isArray(item.features) ? item.features : JSON.parse(item.features);
      }
      if (item.amenities) {
        yachtData.amenities = Array.isArray(item.amenities) ? item.amenities : JSON.parse(item.amenities);
      }
      if (item.included) {
        yachtData.included = Array.isArray(item.included) ? item.included : JSON.parse(item.included);
      }
      if (item.notIncluded) {
        yachtData.notIncluded = Array.isArray(item.notIncluded) ? item.notIncluded : JSON.parse(item.notIncluded);
      }

      await prisma.yacht.create({ data: yachtData });
      count++;
      console.log(`  ✅ Created yacht: ${item.name}`);
    } catch (error: any) {
      console.log(`  ❌ Error creating ${item.name}: ${error.message}`);
    }
  }

  console.log(`\n✅ Imported ${count} yachts`);
}

async function importRentalCars(data: any[], options: ImportOptions) {
  console.log('\n🚗 Importing Rental Cars...');
  let count = 0;

  for (const item of data) {
    try {
      const carData: any = {
        id: `car-${Date.now()}-${count}`,
        name: item.name,
        slug: item.slug,
        brand: item.brand,
        model: item.model,
        year: parseInt(item.year),
        category: item.category,
        description: item.description,
        transmission: item.transmission || 'AUTOMATIC',
        fuelType: item.fuelType || 'PETROL',
        color: item.color || 'Black',
        seats: parseInt(item.seats),
        cityId: item.cityId,
        countryId: item.countryId,
        isActive: item.isActive !== false,
        isFeatured: item.isFeatured === true,
        isAvailable: item.isAvailable !== false,
        updatedAt: new Date(),
      };

      if (options.includePrices) {
        if (item.pricePerDay) carData.pricePerDay = parseFloat(item.pricePerDay);
        if (item.pricePerWeek) carData.pricePerWeek = parseFloat(item.pricePerWeek);
        if (item.pricePerMonth) carData.pricePerMonth = parseFloat(item.pricePerMonth);
        if (item.deposit) carData.deposit = parseFloat(item.deposit);
        carData.currency = item.currency || 'AED';
      }

      if (options.includeImages && item.images) {
        carData.images = Array.isArray(item.images) ? item.images : JSON.parse(item.images);
      }

      if (item.features) {
        carData.features = Array.isArray(item.features) ? item.features : JSON.parse(item.features);
      }

      await prisma.rentalCar.create({ data: carData });
      count++;
      console.log(`  ✅ Created car: ${item.name}`);
    } catch (error: any) {
      console.log(`  ❌ Error creating ${item.name}: ${error.message}`);
    }
  }

  console.log(`\n✅ Imported ${count} rental cars`);
}

async function importDoctors(data: any[], options: ImportOptions) {
  console.log('\n👨‍⚕️ Importing Doctors...');
  let count = 0;

  for (const item of data) {
    try {
      const doctorData: any = {
        id: `doctor-${Date.now()}-${count}`,
        slug: item.slug,
        firstName: item.firstName,
        lastName: item.lastName,
        title: item.title || 'Dr.',
        gender: item.gender || 'Male',
        specialty: item.specialty,
        subSpecialties: item.subSpecialties || [],
        licenseNumber: item.licenseNumber,
        yearsOfExperience: parseInt(item.yearsOfExperience) || 0,
        education: item.education || [],
        certifications: item.certifications || [],
        languages: item.languages || ['English'],
        workingDays: item.workingDays || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        workingHours: item.workingHours || { start: '09:00', end: '17:00' },
        services: item.services || [],
        treatmentAreas: item.treatmentAreas || [],
        phone: item.phone,
        email: item.email,
        cityId: item.cityId,
        countryId: item.countryId,
        isActive: item.isActive !== false,
        isAcceptingPatients: item.isAcceptingPatients !== false,
        updatedAt: new Date(),
      };

      if (options.includePrices && item.consultationFee) {
        doctorData.consultationFee = parseFloat(item.consultationFee);
      }

      await prisma.doctor.create({ data: doctorData });
      count++;
      console.log(`  ✅ Created doctor: ${item.firstName} ${item.lastName}`);
    } catch (error: any) {
      console.log(`  ❌ Error creating ${item.firstName}: ${error.message}`);
    }
  }

  console.log(`\n✅ Imported ${count} doctors`);
}

async function importLawyers(data: any[], options: ImportOptions) {
  console.log('\n⚖️ Importing Lawyers...');
  let count = 0;

  for (const item of data) {
    try {
      const lawyerData: any = {
        id: `lawyer-${Date.now()}-${count}`,
        slug: item.slug,
        name: item.name,
        title: item.title,
        specialization: item.specialization,
        experience: parseInt(item.experience),
        cityId: item.cityId,
        countryId: item.countryId,
        isActive: item.isActive !== false,
        isAvailable: item.isAvailable !== false,
        isFeatured: item.isFeatured === true,
        updatedAt: new Date(),
      };

      if (item.bio) lawyerData.bio = item.bio;
      if (item.email) lawyerData.email = item.email;
      if (item.phone) lawyerData.phone = item.phone;
      if (item.education) lawyerData.education = item.education;
      if (item.practiceAreas) lawyerData.practiceAreas = item.practiceAreas;
      if (item.languages) lawyerData.languages = item.languages;

      if (options.includePrices) {
        if (item.hourlyRate) lawyerData.hourlyRate = parseFloat(item.hourlyRate);
        if (item.consultationFee) lawyerData.consultationFee = parseFloat(item.consultationFee);
        lawyerData.currency = item.currency || 'AED';
      }

      await prisma.lawyer.create({ data: lawyerData });
      count++;
      console.log(`  ✅ Created lawyer: ${item.name}`);
    } catch (error: any) {
      console.log(`  ❌ Error creating ${item.name}: ${error.message}`);
    }
  }

  console.log(`\n✅ Imported ${count} lawyers`);
}

async function importCoaches(data: any[], options: ImportOptions) {
  console.log('\n🏋️ Importing Coaches...');
  let count = 0;

  for (const item of data) {
    try {
      const coachData: any = {
        id: `coach-${Date.now()}-${count}`,
        slug: item.slug,
        name: item.name,
        title: item.title,
        mainCategory: item.mainCategory,
        experience: parseInt(item.experience),
        cityId: item.cityId,
        countryId: item.countryId,
        isActive: item.isActive !== false,
        isAvailable: item.isAvailable !== false,
        isFeatured: item.isFeatured === true,
        updatedAt: new Date(),
      };

      if (item.bio) coachData.bio = item.bio;
      if (item.email) coachData.email = item.email;
      if (item.phone) coachData.phone = item.phone;
      if (item.specializations) coachData.specializations = item.specializations;
      if (item.certifications) coachData.certifications = item.certifications;
      if (item.languages) coachData.languages = item.languages;

      if (options.includePrices) {
        if (item.hourlyRate) coachData.hourlyRate = parseFloat(item.hourlyRate);
        if (item.sessionFee) coachData.sessionFee = parseFloat(item.sessionFee);
        coachData.currency = item.currency || 'AED';
      }

      await prisma.coach.create({ data: coachData });
      count++;
      console.log(`  ✅ Created coach: ${item.name}`);
    } catch (error: any) {
      console.log(`  ❌ Error creating ${item.name}: ${error.message}`);
    }
  }

  console.log(`\n✅ Imported ${count} coaches`);
}

async function main() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🚀 INTERACTIVE IMPORT TOOL');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Step 1: Choose import type
  console.log('📋 Available import types:');
  IMPORT_TYPES.forEach((type, index) => {
    console.log(`  ${index + 1}. ${type}`);
  });

  const typeChoice = await question('\n👉 Choose type (1-' + IMPORT_TYPES.length + '): ');
  const typeIndex = parseInt(typeChoice) - 1;
  
  if (typeIndex < 0 || typeIndex >= IMPORT_TYPES.length) {
    console.log('❌ Invalid choice');
    rl.close();
    return;
  }

  const importType = IMPORT_TYPES[typeIndex];

  // Step 2: Choose file format
  const formatChoice = await question('\n📄 File format (1=JSON, 2=CSV): ');
  const format = formatChoice === '2' ? 'csv' : 'json';

  // Step 3: Enter file path
  const defaultPath = `import-templates/${importType.toLowerCase()}s.json`;
  const filePath = await question(`\n📂 File path (default: ${defaultPath}): `) || defaultPath;

  if (!fs.existsSync(filePath)) {
    console.log('❌ File not found:', filePath);
    rl.close();
    return;
  }

  // Step 4: Options
  const includeImages = (await question('\n🖼️  Include images? (y/n, default: y): ')).toLowerCase() !== 'n';
  const includePrices = (await question('💰 Include prices? (y/n, default: y): ')).toLowerCase() !== 'n';
  const includeBookings = (await question('📅 Include bookings? (y/n, default: n): ')).toLowerCase() === 'y';

  const options: ImportOptions = {
    file: filePath,
    type: importType,
    format,
    includeImages,
    includePrices,
    includeBookings,
  };

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('⚙️  IMPORT CONFIGURATION');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Type: ${importType}`);
  console.log(`File: ${filePath}`);
  console.log(`Format: ${format.toUpperCase()}`);
  console.log(`Images: ${includeImages ? '✅' : '❌'}`);
  console.log(`Prices: ${includePrices ? '✅' : '❌'}`);
  console.log(`Bookings: ${includeBookings ? '✅' : '❌'}`);

  const confirm = await question('\n✅ Proceed with import? (y/n): ');
  if (confirm.toLowerCase() !== 'y') {
    console.log('❌ Import cancelled');
    rl.close();
    return;
  }

  // Read file
  console.log('\n📖 Reading file...');
  let data: any[];
  try {
    data = format === 'json' 
      ? await readJSONFile(filePath)
      : await readCSVFile(filePath);
    console.log(`✅ Found ${data.length} records`);
  } catch (error: any) {
    console.log('❌ Error reading file:', error.message);
    rl.close();
    return;
  }

  // Import based on type
  try {
    switch (importType) {
      case 'User':
        await importUsers(data, options);
        break;
      case 'Property':
        await importProperties(data, options);
        break;
      case 'Yacht':
        await importYachts(data, options);
        break;
      case 'RentalCar':
        await importRentalCars(data, options);
        break;
      case 'Doctor':
        await importDoctors(data, options);
        break;
      case 'Lawyer':
        await importLawyers(data, options);
        break;
      case 'Coach':
        await importCoaches(data, options);
        break;
      default:
        console.log('❌ Import type not yet implemented:', importType);
    }
  } catch (error: any) {
    console.log('❌ Import error:', error.message);
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ IMPORT COMPLETED!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  rl.close();
}

main()
  .catch((e) => {
    console.error('❌ Fatal error:', e);
    rl.close();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
