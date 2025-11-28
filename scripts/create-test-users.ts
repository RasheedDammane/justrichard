import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('👥 Creating test users with working login...\n');

  // Password: "password123" for all users
  const hashedPassword = await bcrypt.hash('password123', 10);

  const users = [
    // 1. SUPER ADMIN
    {
      id: 'user-admin-super',
      email: 'admin@justrichard.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'Super',
      role: 'SUPER_ADMIN',
      isActive: true,
      emailVerified: new Date(),
    },
    
    // 2. ADMIN
    {
      id: 'user-admin-001',
      email: 'admin@test.com',
      password: hashedPassword,
      firstName: 'John',
      lastName: 'Admin',
      role: 'ADMIN',
      isActive: true,
      emailVerified: new Date(),
    },

    // 3. PROVIDER - Yacht Owner
    {
      id: 'user-yacht-001',
      email: 'yacht.owner@test.com',
      password: hashedPassword,
      firstName: 'Richard',
      lastName: 'YachtOwner',
      role: 'PROVIDER',
      isActive: true,
      emailVerified: new Date(),
    },

    // 4. PROVIDER - Property Owner
    {
      id: 'user-property-001',
      email: 'property.owner@test.com',
      password: hashedPassword,
      firstName: 'Sarah',
      lastName: 'PropertyOwner',
      role: 'PROVIDER',
      isActive: true,
      emailVerified: new Date(),
    },

    // 5. PROVIDER - Car Rental Owner
    {
      id: 'user-car-rental-001',
      email: 'car.rental@test.com',
      password: hashedPassword,
      firstName: 'Michael',
      lastName: 'CarRental',
      role: 'PROVIDER',
      isActive: true,
      emailVerified: new Date(),
    },

    // 6. DOCTOR
    {
      id: 'user-doctor-001',
      email: 'doctor@test.com',
      password: hashedPassword,
      firstName: 'Dr. Emma',
      lastName: 'Doctor',
      role: 'PROVIDER',
      isActive: true,
      emailVerified: new Date(),
    },

    // 7. LAWYER
    {
      id: 'user-lawyer-001',
      email: 'lawyer@test.com',
      password: hashedPassword,
      firstName: 'David',
      lastName: 'Lawyer',
      role: 'PROVIDER',
      isActive: true,
      emailVerified: new Date(),
    },

    // 8. COACH
    {
      id: 'user-coach-001',
      email: 'coach@test.com',
      password: hashedPassword,
      firstName: 'Lisa',
      lastName: 'Coach',
      role: 'PROVIDER',
      isActive: true,
      emailVerified: new Date(),
    },

    // 9-13. REGULAR USERS
    {
      id: 'user-customer-001',
      email: 'user1@test.com',
      password: hashedPassword,
      firstName: 'Alice',
      lastName: 'Customer',
      role: 'CUSTOMER',
      isActive: true,
      emailVerified: new Date(),
    },
    {
      id: 'user-customer-002',
      email: 'user2@test.com',
      password: hashedPassword,
      firstName: 'Bob',
      lastName: 'Customer',
      role: 'CUSTOMER',
      isActive: true,
      emailVerified: new Date(),
    },
    {
      id: 'user-customer-003',
      email: 'user3@test.com',
      password: hashedPassword,
      firstName: 'Charlie',
      lastName: 'Customer',
      role: 'CUSTOMER',
      isActive: true,
      emailVerified: new Date(),
    },
    {
      id: 'user-customer-004',
      email: 'user4@test.com',
      password: hashedPassword,
      firstName: 'Diana',
      lastName: 'Customer',
      role: 'CUSTOMER',
      isActive: true,
      emailVerified: new Date(),
    },
    {
      id: 'user-customer-005',
      email: 'user5@test.com',
      password: hashedPassword,
      firstName: 'Eric',
      lastName: 'Customer',
      role: 'CUSTOMER',
      isActive: true,
      emailVerified: new Date(),
    },
  ];

  console.log('📝 Creating users...\n');

  for (const userData of users) {
    try {
      const user = await prisma.user.upsert({
        where: { email: userData.email },
        update: {
          password: userData.password,
          firstName: userData.firstName,
          lastName: userData.lastName,
          role: userData.role,
          isActive: userData.isActive,
          emailVerified: userData.emailVerified,
        },
        create: userData,
      });

      console.log(`✅ ${userData.role.padEnd(15)} - ${userData.email.padEnd(30)} (${userData.firstName} ${userData.lastName})`);
    } catch (error: any) {
      console.log(`❌ ${userData.email}: ${error.message}`);
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🎉 TEST USERS CREATED SUCCESSFULLY!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log('📋 LOGIN CREDENTIALS:\n');
  console.log('All users use the same password: password123\n');

  console.log('🔐 ADMIN ACCOUNTS:');
  console.log('  • admin@justrichard.com (SUPER ADMIN)');
  console.log('  • admin@test.com (ADMIN)\n');

  console.log('👔 PROVIDER ACCOUNTS:');
  console.log('  • yacht.owner@test.com (Yacht Provider)');
  console.log('  • property.owner@test.com (Property Provider)');
  console.log('  • car.rental@test.com (Car Rental Provider)');
  console.log('  • doctor@test.com (Doctor)');
  console.log('  • lawyer@test.com (Lawyer)');
  console.log('  • coach@test.com (Coach)\n');

  console.log('👥 CUSTOMER ACCOUNTS:');
  console.log('  • user1@test.com (Alice)');
  console.log('  • user2@test.com (Bob)');
  console.log('  • user3@test.com (Charlie)');
  console.log('  • user4@test.com (Diana)');
  console.log('  • user5@test.com (Eric)\n');

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🌐 LOGIN URL: http://localhost:3254/en/login');
  console.log('⚙️  ADMIN URL: http://localhost:3254/en/admin');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const totalUsers = await prisma.user.count();
  console.log(`📊 Total users in database: ${totalUsers}\n`);
}

main()
  .catch((e) => {
    console.error('❌ Error creating users:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
