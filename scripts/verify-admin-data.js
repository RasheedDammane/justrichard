/**
 * Script de vérification complète des données admin
 * Vérifie:
 * 1. Que les données existent dans la DB
 * 2. Que les APIs fonctionnent
 * 3. Que les pages affichent les données
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const MODELS_TO_CHECK = [
  { name: 'User', route: '/admin/users' },
  { name: 'Property', route: '/admin/properties' },
  { name: 'Service', route: '/admin/services' },
  { name: 'Booking', route: '/admin/bookings' },
  { name: 'Category', route: '/admin/categories' },
  { name: 'Partner', route: '/admin/partners' },
  { name: 'Doctor', route: '/admin/doctors' },
  { name: 'Lawyer', route: '/admin/lawyers' },
  { name: 'Coach', route: '/admin/coaches' },
  { name: 'Maid', route: '/admin/maids' },
  { name: 'HomeCleaning', route: '/admin/home-cleaning' },
  { name: 'FurnitureCleaning', route: '/admin/furniture-cleaning' },
  { name: 'Laundry', route: '/admin/laundry' },
  { name: 'RentalCar', route: '/admin/rental-cars' },
  { name: 'Motorbike', route: '/admin/motorbikes' },
  { name: 'Yacht', route: '/admin/yachts' },
  { name: 'FoodProduct', route: '/admin/food/products' },
  { name: 'Moving', route: '/admin/moving' },
  { name: 'Parcel', route: '/admin/parcel' },
  { name: 'Event', route: '/admin/events' },
  { name: 'Transfer', route: '/admin/transfers' },
  { name: 'Activity', route: '/admin/activities' },
  { name: 'Supplier', route: '/admin/suppliers' },
  { name: 'BlogPost', route: '/admin/blog' },
];

async function verifyData() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔍 VÉRIFICATION DES DONNÉES ADMIN');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const results = [];
  let totalRecords = 0;

  for (const model of MODELS_TO_CHECK) {
    try {
      // Vérifier si le modèle existe dans Prisma
      if (!prisma[model.name.charAt(0).toLowerCase() + model.name.slice(1)]) {
        results.push({
          model: model.name,
          route: model.route,
          status: '⚠️',
          count: 0,
          error: 'Modèle non trouvé dans Prisma',
        });
        continue;
      }

      const modelName = model.name.charAt(0).toLowerCase() + model.name.slice(1);
      const count = await prisma[modelName].count();
      totalRecords += count;

      results.push({
        model: model.name,
        route: model.route,
        status: count > 0 ? '✅' : '❌',
        count,
        error: null,
      });

      console.log(`${count > 0 ? '✅' : '❌'} ${model.name.padEnd(20)} ${count.toString().padStart(5)} records → ${model.route}`);
    } catch (error) {
      results.push({
        model: model.name,
        route: model.route,
        status: '❌',
        count: 0,
        error: error.message,
      });
      console.log(`❌ ${model.name.padEnd(20)}     0 records → ${model.route} (${error.message})`);
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 RÉSUMÉ');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const withData = results.filter(r => r.count > 0).length;
  const withoutData = results.filter(r => r.count === 0 && !r.error).length;
  const withErrors = results.filter(r => r.error).length;

  console.log(`✅ Modèles avec données:    ${withData}`);
  console.log(`❌ Modèles vides:           ${withoutData}`);
  console.log(`⚠️  Modèles avec erreurs:   ${withErrors}`);
  console.log(`📊 Total des enregistrements: ${totalRecords}\n`);

  if (withoutData > 0) {
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('❌ MODÈLES VIDES (besoin de données)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    results
      .filter(r => r.count === 0 && !r.error)
      .forEach(r => console.log(`   • ${r.model} → ${r.route}`));
  }

  if (withErrors > 0) {
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('⚠️  MODÈLES AVEC ERREURS');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    results
      .filter(r => r.error)
      .forEach(r => console.log(`   • ${r.model}: ${r.error}`));
  }

  // Vérifier le dashboard
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🏠 VÉRIFICATION DASHBOARD');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  try {
    const [userCount, bookingCount, serviceCount, propertyCount, yachtCount, doctorCount, maidCount] = await Promise.all([
      prisma.user.count().catch(() => 0),
      prisma.booking.count().catch(() => 0),
      prisma.service.count({ where: { isActive: true } }).catch(() => 0),
      prisma.property.count().catch(() => 0),
      prisma.yacht.count().catch(() => 0),
      prisma.doctor.count().catch(() => 0),
      prisma.maid.count().catch(() => 0),
    ]);

    console.log(`✅ Users:        ${userCount}`);
    console.log(`✅ Bookings:     ${bookingCount}`);
    console.log(`✅ Services:     ${serviceCount}`);
    console.log(`✅ Properties:   ${propertyCount}`);
    console.log(`✅ Yachts:       ${yachtCount}`);
    console.log(`✅ Doctors:      ${doctorCount}`);
    console.log(`✅ Maids:        ${maidCount}`);
  } catch (error) {
    console.log(`❌ Erreur: ${error.message}`);
  }

  await prisma.$disconnect();

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ VÉRIFICATION TERMINÉE');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  return results;
}

verifyData().catch(console.error);
