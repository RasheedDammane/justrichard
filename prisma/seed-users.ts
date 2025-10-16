import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Creating test users...');

  // Create admin user
  const adminPassword = await hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@communityhub.com' },
    update: {
      password: adminPassword,
      role: Role.ADMIN,
    },
    create: {
      email: 'admin@communityhub.com',
      password: adminPassword,
      name: 'Admin User',
      role: Role.ADMIN,
      phone: '+1234567890',
      emailVerified: new Date(),
    },
  });
  console.log('✅ Admin user created/updated:', admin.email);

  // Create test customer
  const customerPassword = await hash('customer123', 12);
  const customer = await prisma.user.upsert({
    where: { email: 'customer@test.com' },
    update: {
      password: customerPassword,
      role: Role.CUSTOMER,
    },
    create: {
      email: 'customer@test.com',
      password: customerPassword,
      name: 'John Doe',
      role: Role.CUSTOMER,
      phone: '+1234567891',
      emailVerified: new Date(),
    },
  });
  console.log('✅ Customer user created/updated:', customer.email);

  // Create test provider
  const providerPassword = await hash('provider123', 12);
  const provider = await prisma.user.upsert({
    where: { email: 'provider@test.com' },
    update: {
      password: providerPassword,
      role: Role.PROVIDER,
    },
    create: {
      email: 'provider@test.com',
      password: providerPassword,
      name: 'Service Provider',
      role: Role.PROVIDER,
      phone: '+1234567892',
      emailVerified: new Date(),
    },
  });
  console.log('✅ Provider user created/updated:', provider.email);

  // Create test manager
  const managerPassword = await hash('manager123', 12);
  const manager = await prisma.user.upsert({
    where: { email: 'manager@test.com' },
    update: {
      password: managerPassword,
      role: Role.MANAGER,
    },
    create: {
      email: 'manager@test.com',
      password: managerPassword,
      name: 'Manager User',
      role: Role.MANAGER,
      phone: '+1234567893',
      emailVerified: new Date(),
    },
  });
  console.log('✅ Manager user created/updated:', manager.email);

  console.log('\n🎉 Test users created successfully!');
  console.log('\n📝 Login credentials:');
  console.log('Admin:    admin@communityhub.com / admin123');
  console.log('Customer: customer@test.com / customer123');
  console.log('Provider: provider@test.com / provider123');
  console.log('Manager:  manager@test.com / manager123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
