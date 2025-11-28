/**
 * Script to generate test logs via direct DB insertion
 * Run with: node scripts/generate-test-logs.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const testLogs = [
  {
    level: 'INFO',
    category: 'auth',
    message: 'User logged in successfully',
    context: {
      userId: 'user_test_123',
      ip: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    },
    path: '/en/auth/login',
    method: 'POST',
    statusCode: 200,
    ip: '192.168.1.100',
  },
  {
    level: 'INFO',
    category: 'property',
    message: 'Property viewed',
    context: {
      propertyId: 'prop_789',
    },
    path: '/en/properties/luxury-villa-dubai',
    method: 'GET',
    statusCode: 200,
  },
  {
    level: 'INFO',
    category: 'booking',
    message: 'Booking created successfully',
    context: {
      bookingId: 'booking_abc',
      propertyId: 'prop_xyz',
      amount: 5000,
      currency: 'AED',
    },
    path: '/api/bookings',
    method: 'POST',
    statusCode: 201,
  },
  {
    level: 'WARN',
    category: 'system',
    message: 'Rate limit approaching',
    context: {
      requestCount: 95,
      limit: 100,
    },
    path: '/api/search',
    method: 'GET',
    ip: '1.2.3.4',
  },
  {
    level: 'WARN',
    category: 'auth',
    message: 'Suspicious login attempt detected',
    context: {
      email: 'suspicious@example.com',
      reason: 'Multiple failed attempts',
      attemptCount: 5,
    },
    path: '/en/auth/login',
    method: 'POST',
    statusCode: 401,
    ip: '5.6.7.8',
  },
  {
    level: 'ERROR',
    category: 'payment',
    message: 'Payment processing failed',
    context: {
      bookingId: 'booking_failed',
      amount: 3000,
      currency: 'AED',
      error: {
        name: 'StripeError',
        message: 'API timeout',
        code: 'timeout',
      },
    },
    path: '/api/payments',
    method: 'POST',
    statusCode: 500,
  },
  {
    level: 'ERROR',
    category: 'property',
    message: 'Property not found',
    context: {
      propertyId: 'prop_nonexistent',
      error: {
        name: 'NotFoundError',
        message: '404 Not Found',
      },
    },
    path: '/en/properties/nonexistent',
    method: 'GET',
    statusCode: 404,
  },
  {
    level: 'ERROR',
    category: 'system',
    message: 'Database query timeout',
    context: {
      query: 'SELECT * FROM properties WHERE ...',
      timeout: 30000,
      error: {
        name: 'QueryTimeoutError',
        message: 'Query timeout after 30s',
      },
    },
    path: '/api/properties',
    method: 'GET',
    statusCode: 500,
  },
  {
    level: 'FATAL',
    category: 'system',
    message: 'Database connection lost',
    context: {
      dbHost: 'localhost',
      dbPort: 5432,
      error: {
        name: 'ConnectionError',
        message: 'Connection refused',
        code: 'ECONNREFUSED',
      },
    },
    source: 'api',
  },
  {
    level: 'INFO',
    category: 'admin',
    message: 'Property deleted by admin',
    context: {
      propertyId: 'prop_deleted',
      reason: 'Duplicate listing',
    },
    path: '/api/admin/properties/prop_deleted',
    method: 'DELETE',
    statusCode: 200,
  },
  {
    level: 'INFO',
    category: 'admin',
    message: 'User role updated',
    context: {
      userId: 'user_test_789',
      oldRole: 'USER',
      newRole: 'PROVIDER',
    },
    path: '/api/admin/users/user_test_789/role',
    method: 'PUT',
    statusCode: 200,
  },
  {
    level: 'INFO',
    category: 'notification',
    message: 'Email sent successfully',
    context: {
      emailType: 'booking_confirmation',
      to: 'user@example.com',
      subject: 'Your booking is confirmed',
    },
  },
  {
    level: 'ERROR',
    category: 'notification',
    message: 'SMS delivery failed',
    context: {
      phone: '+971501234567',
      message: 'Your OTP is 123456',
      error: {
        name: 'TwilioError',
        message: 'Invalid phone number',
      },
    },
    statusCode: 500,
  },
];

async function generateLogs() {
  console.log('🚀 Generating test logs...\n');

  try {
    for (const log of testLogs) {
      await prisma.log.create({
        data: {
          ...log,
          source: log.source || 'api',
          environment: process.env.NODE_ENV || 'preprod',
        },
      });
      console.log(`✅ Created ${log.level} log: ${log.message}`);
    }

    console.log(`\n✅ Successfully created ${testLogs.length} test logs!`);
    console.log('📊 View them at: http://localhost:3100/en/admin/logs\n');
  } catch (error) {
    console.error('❌ Error generating logs:', error);
  } finally {
    await prisma.$disconnect();
  }
}

generateLogs();
