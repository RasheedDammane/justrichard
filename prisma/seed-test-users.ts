import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Creating test users...');

  // First, create or get roles
  const adminRole = await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: {
      id: randomUUID(),
      name: 'ADMIN',
      description: 'Administrator with full access',
      level: 100,
      isActive: true,
      updatedAt: new Date(),
    },
  });

  const managerRole = await prisma.role.upsert({
    where: { name: 'MANAGER' },
    update: {},
    create: {
      id: randomUUID(),
      name: 'MANAGER',
      description: 'Manager with management access',
      level: 80,
      isActive: true,
      updatedAt: new Date(),
    },
  });

  const providerRole = await prisma.role.upsert({
    where: { name: 'PROVIDER' },
    update: {},
    create: {
      id: randomUUID(),
      name: 'PROVIDER',
      description: 'Service provider',
      level: 50,
      isActive: true,
      updatedAt: new Date(),
    },
  });

  const customerRole = await prisma.role.upsert({
    where: { name: 'CUSTOMER' },
    update: {},
    create: {
      id: randomUUID(),
      name: 'CUSTOMER',
      description: 'Regular customer',
      level: 10,
      isActive: true,
      updatedAt: new Date(),
    },
  });

  console.log('✅ Roles created/updated');

  // Create admin user
  const adminPassword = await hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@communityhub.com' },
    update: {
      password: adminPassword,
    },
    create: {
      id: randomUUID(),
      email: 'admin@communityhub.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      phone: '+1234567890',
      emailVerified: new Date(),
      updatedAt: new Date(),
    },
  });

  // Assign admin role
  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: admin.id,
        roleId: adminRole.id,
      },
    },
    update: {},
    create: {
      id: randomUUID(),
      userId: admin.id,
      roleId: adminRole.id,
    },
  });
  console.log('✅ Admin user created/updated:', admin.email);

  // Create test customer
  const customerPassword = await hash('customer123', 12);
  const customer = await prisma.user.upsert({
    where: { email: 'customer@test.com' },
    update: {
      password: customerPassword,
    },
    create: {
      id: randomUUID(),
      email: 'customer@test.com',
      password: customerPassword,
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567891',
      emailVerified: new Date(),
      updatedAt: new Date(),
    },
  });

  // Assign customer role
  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: customer.id,
        roleId: customerRole.id,
      },
    },
    update: {},
    create: {
      id: randomUUID(),
      userId: customer.id,
      roleId: customerRole.id,
    },
  });
  console.log('✅ Customer user created/updated:', customer.email);

  // Create test provider
  const providerPassword = await hash('provider123', 12);
  const provider = await prisma.user.upsert({
    where: { email: 'provider@test.com' },
    update: {
      password: providerPassword,
    },
    create: {
      id: randomUUID(),
      email: 'provider@test.com',
      password: providerPassword,
      firstName: 'Service',
      lastName: 'Provider',
      phone: '+1234567892',
      emailVerified: new Date(),
      updatedAt: new Date(),
    },
  });

  // Assign provider role
  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: provider.id,
        roleId: providerRole.id,
      },
    },
    update: {},
    create: {
      id: randomUUID(),
      userId: provider.id,
      roleId: providerRole.id,
    },
  });
  console.log('✅ Provider user created/updated:', provider.email);

  // Create test manager
  const managerPassword = await hash('manager123', 12);
  const manager = await prisma.user.upsert({
    where: { email: 'manager@test.com' },
    update: {
      password: managerPassword,
    },
    create: {
      id: randomUUID(),
      email: 'manager@test.com',
      password: managerPassword,
      firstName: 'Manager',
      lastName: 'User',
      phone: '+1234567893',
      emailVerified: new Date(),
      updatedAt: new Date(),
    },
  });

  // Assign manager role
  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: manager.id,
        roleId: managerRole.id,
      },
    },
    update: {},
    create: {
      id: randomUUID(),
      userId: manager.id,
      roleId: managerRole.id,
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
