#!/usr/bin/env node

/**
 * Test direct avec Prisma pour vérifier que tout fonctionne
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ log: ['error'] });

async function testAPIs() {
  console.log('🧪 Testing Prisma Direct Access...\n');
  
  try {
    // Test CoachBooking
    console.log('1. Testing CoachBooking...');
    const coachBookings = await prisma.coachBooking.findMany({ take: 5 });
    console.log(`   ✅ Found ${coachBookings.length} coach bookings`);
    
    // Test YachtBooking
    console.log('2. Testing YachtBooking...');
    const yachtBookings = await prisma.yachtBooking.findMany({ take: 5 });
    console.log(`   ✅ Found ${yachtBookings.length} yacht bookings`);
    
    // Test DoctorAppointment
    console.log('3. Testing DoctorAppointment...');
    const doctorAppointments = await prisma.doctorAppointment.findMany({ take: 5 });
    console.log(`   ✅ Found ${doctorAppointments.length} doctor appointments`);
    
    // Test LawyerConsultation
    console.log('4. Testing LawyerConsultation...');
    const lawyerConsultations = await prisma.lawyerConsultation.findMany({ take: 5 });
    console.log(`   ✅ Found ${lawyerConsultations.length} lawyer consultations`);
    
    // Test ActivityBooking
    console.log('5. Testing ActivityBooking...');
    const activityBookings = await prisma.activityBooking.findMany({ take: 5 });
    console.log(`   ✅ Found ${activityBookings.length} activity bookings`);
    
    // Test PropertyBooking
    console.log('6. Testing PropertyBooking...');
    const propertyBookings = await prisma.propertyBooking.findMany({ take: 5 });
    console.log(`   ✅ Found ${propertyBookings.length} property bookings`);
    
    // Test MaidBooking
    console.log('7. Testing MaidBooking...');
    const maidBookings = await prisma.maidBooking.findMany({ take: 5 });
    console.log(`   ✅ Found ${maidBookings.length} maid bookings`);
    
    // Test ScooterBooking
    console.log('8. Testing ScooterBooking...');
    const scooterBookings = await prisma.scooterBooking.findMany({ take: 5 });
    console.log(`   ✅ Found ${scooterBookings.length} scooter bookings`);
    
    console.log('\n✅ All Prisma models work correctly!');
    console.log('\n📝 The issue is likely that Next.js needs to be restarted.');
    console.log('   Run: npm run dev (restart the server)');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\nFull error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testAPIs();
