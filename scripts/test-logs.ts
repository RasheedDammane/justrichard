/**
 * Script to generate test logs for the monitoring system
 * Run with: npx ts-node scripts/test-logs.ts
 */

import { logger } from '../lib/logger';

async function generateTestLogs() {
  console.log('🚀 Generating test logs...\n');

  // INFO logs
  logger.info('User logged in successfully', {
    category: 'auth',
    userId: 'user_test_123',
    ip: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    path: '/en/auth/login',
    method: 'POST',
    statusCode: 200,
  });

  logger.info('Property viewed', {
    category: 'property',
    userId: 'user_test_456',
    propertyId: 'prop_789',
    path: '/en/properties/luxury-villa-dubai',
    method: 'GET',
    statusCode: 200,
  });

  logger.info('Booking created', {
    category: 'booking',
    userId: 'user_test_789',
    bookingId: 'booking_abc',
    propertyId: 'prop_xyz',
    amount: 5000,
    currency: 'AED',
    path: '/api/bookings',
    method: 'POST',
    statusCode: 201,
  });

  // WARN logs
  logger.warn('Rate limit approaching', {
    category: 'system',
    userId: 'user_test_spammer',
    ip: '1.2.3.4',
    path: '/api/search',
    requestCount: 95,
    limit: 100,
  });

  logger.warn('Suspicious login attempt', {
    category: 'auth',
    ip: '5.6.7.8',
    email: 'suspicious@example.com',
    reason: 'Multiple failed attempts',
    path: '/en/auth/login',
    method: 'POST',
    statusCode: 401,
  });

  // ERROR logs
  logger.error('Payment processing failed', new Error('Stripe API timeout'), {
    category: 'payment',
    userId: 'user_test_payment',
    bookingId: 'booking_failed',
    amount: 3000,
    currency: 'AED',
    path: '/api/payments',
    method: 'POST',
    statusCode: 500,
  });

  logger.error('Property not found', new Error('404 Not Found'), {
    category: 'property',
    propertyId: 'prop_nonexistent',
    path: '/en/properties/nonexistent',
    method: 'GET',
    statusCode: 404,
  });

  logger.error('Database query timeout', new Error('Query timeout after 30s'), {
    category: 'system',
    query: 'SELECT * FROM properties WHERE ...',
    path: '/api/properties',
    method: 'GET',
    statusCode: 500,
  });

  // FATAL log
  logger.fatal('Database connection lost', new Error('Connection refused'), {
    category: 'system',
    source: 'api',
    dbHost: 'localhost',
    dbPort: 5432,
  });

  // Admin action logs
  logger.info('Property deleted by admin', {
    category: 'admin',
    adminId: 'admin_test_123',
    propertyId: 'prop_deleted',
    path: '/api/admin/properties/prop_deleted',
    method: 'DELETE',
    statusCode: 200,
  });

  logger.info('User role updated', {
    category: 'admin',
    adminId: 'admin_test_123',
    userId: 'user_test_789',
    oldRole: 'USER',
    newRole: 'PROVIDER',
    path: '/api/admin/users/user_test_789/role',
    method: 'PUT',
    statusCode: 200,
  });

  // Notification logs
  logger.info('Email sent successfully', {
    category: 'notification',
    userId: 'user_test_123',
    emailType: 'booking_confirmation',
    to: 'user@example.com',
    subject: 'Your booking is confirmed',
  });

  logger.error('SMS delivery failed', new Error('Twilio API error'), {
    category: 'notification',
    userId: 'user_test_456',
    phone: '+971501234567',
    message: 'Your OTP is 123456',
  });

  console.log('\n✅ Test logs generated successfully!');
  console.log('📊 Check them at: http://localhost:3100/en/admin/logs\n');
  
  // Wait a bit for async logs to be persisted
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  process.exit(0);
}

generateTestLogs().catch((error) => {
  console.error('❌ Error generating test logs:', error);
  process.exit(1);
});
