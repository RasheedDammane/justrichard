import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const amenities = [
  // Interior
  {
    name: 'Air Conditioning',
    nameAr: 'تكييف',
    nameFr: 'Climatisation',
    nameTh: 'เครื่องปรับอากาศ',
    nameRu: 'Кондиционер',
    nameKo: '에어컨',
    nameEs: 'Aire Acondicionado',
    nameVi: 'Điều hòa',
    nameTl: 'Air Conditioning',
    icon: '❄️',
    category: 'Interior',
  },
  {
    name: 'Central Heating',
    nameAr: 'تدفئة مركزية',
    nameFr: 'Chauffage Central',
    nameTh: 'เครื่องทำความร้อนกลาง',
    nameRu: 'Центральное отопление',
    nameKo: '중앙 난방',
    nameEs: 'Calefacción Central',
    nameVi: 'Hệ thống sưởi trung tâm',
    nameTl: 'Central Heating',
    icon: '🔥',
    category: 'Interior',
  },
  {
    name: 'Built-in Wardrobes',
    nameAr: 'خزائن مدمجة',
    nameFr: 'Placards Intégrés',
    nameTh: 'ตู้เสื้อผ้าบิวท์อิน',
    nameRu: 'Встроенные шкафы',
    nameKo: '붙박이장',
    nameEs: 'Armarios Empotrados',
    nameVi: 'Tủ âm tường',
    nameTl: 'Built-in na Aparador',
    icon: '🚪',
    category: 'Interior',
  },
  {
    name: 'Kitchen Appliances',
    nameAr: 'أجهزة المطبخ',
    nameFr: 'Électroménager',
    nameTh: 'เครื่องใช้ในครัว',
    nameRu: 'Кухонная техника',
    nameKo: '주방 가전',
    nameEs: 'Electrodomésticos',
    nameVi: 'Thiết bị nhà bếp',
    nameTl: 'Kagamitan sa Kusina',
    icon: '🍳',
    category: 'Interior',
  },
  {
    name: 'Fireplace',
    nameAr: 'مدفأة',
    nameFr: 'Cheminée',
    nameTh: 'เตาผิง',
    nameRu: 'Камин',
    nameKo: '벽난로',
    nameEs: 'Chimenea',
    nameVi: 'Lò sưởi',
    nameTl: 'Fireplace',
    icon: '🔥',
    category: 'Interior',
  },
  {
    name: 'Storage Room',
    nameAr: 'غرفة تخزين',
    nameFr: 'Débarras',
    nameTh: 'ห้องเก็บของ',
    nameRu: 'Кладовая',
    nameKo: '창고',
    nameEs: 'Trastero',
    nameVi: 'Phòng kho',
    nameTl: 'Bodega',
    icon: '📦',
    category: 'Interior',
  },

  // Exterior
  {
    name: 'Balcony',
    nameAr: 'شرفة',
    nameFr: 'Balcon',
    icon: '🏛️',
    category: 'Exterior',
  },
  {
    name: 'Terrace',
    nameAr: 'تراس',
    nameFr: 'Terrasse',
    icon: '🌅',
    category: 'Exterior',
  },
  {
    name: 'Garden',
    nameAr: 'حديقة',
    nameFr: 'Jardin',
    icon: '🌳',
    category: 'Exterior',
  },
  {
    name: 'Private Pool',
    nameAr: 'مسبح خاص',
    nameFr: 'Piscine Privée',
    icon: '🏊',
    category: 'Exterior',
  },
  {
    name: 'BBQ Area',
    nameAr: 'منطقة شواء',
    nameFr: 'Espace BBQ',
    icon: '🍖',
    category: 'Exterior',
  },
  {
    name: 'Garage',
    nameAr: 'مرآب',
    nameFr: 'Garage',
    icon: '🚗',
    category: 'Exterior',
  },

  // Building
  {
    name: 'Elevator',
    nameAr: 'مصعد',
    nameFr: 'Ascenseur',
    icon: '🛗',
    category: 'Building',
  },
  {
    name: 'Concierge',
    nameAr: 'بواب',
    nameFr: 'Concierge',
    icon: '👨‍💼',
    category: 'Building',
  },
  {
    name: 'Security',
    nameAr: 'أمن',
    nameFr: 'Sécurité',
    icon: '🔒',
    category: 'Building',
  },
  {
    name: 'CCTV',
    nameAr: 'كاميرات مراقبة',
    nameFr: 'Vidéosurveillance',
    icon: '📹',
    category: 'Building',
  },
  {
    name: 'Shared Pool',
    nameAr: 'مسبح مشترك',
    nameFr: 'Piscine Commune',
    icon: '🏊',
    category: 'Building',
  },
  {
    name: 'Gym',
    nameAr: 'صالة رياضية',
    nameFr: 'Salle de Sport',
    icon: '💪',
    category: 'Building',
  },
  {
    name: 'Playground',
    nameAr: 'ملعب أطفال',
    nameFr: 'Aire de Jeux',
    icon: '🎪',
    category: 'Building',
  },

  // Neighborhood
  {
    name: 'Near Metro',
    nameAr: 'قريب من المترو',
    nameFr: 'Proche Métro',
    icon: '🚇',
    category: 'Neighborhood',
  },
  {
    name: 'Near Schools',
    nameAr: 'قريب من المدارس',
    nameFr: 'Proche Écoles',
    icon: '🏫',
    category: 'Neighborhood',
  },
  {
    name: 'Near Shopping',
    nameAr: 'قريب من التسوق',
    nameFr: 'Proche Commerces',
    icon: '🛒',
    category: 'Neighborhood',
  },
  {
    name: 'Near Hospital',
    nameAr: 'قريب من المستشفى',
    nameFr: 'Proche Hôpital',
    icon: '🏥',
    category: 'Neighborhood',
  },
  {
    name: 'Near Beach',
    nameAr: 'قريب من الشاطئ',
    nameFr: 'Proche Plage',
    icon: '🏖️',
    category: 'Neighborhood',
  },
  {
    name: 'Near Park',
    nameAr: 'قريب من الحديقة',
    nameFr: 'Proche Parc',
    icon: '🌳',
    category: 'Neighborhood',
  },
];

async function seedAmenities() {
  console.log('🏠 Seeding amenities...\n');

  for (const amenity of amenities) {
    const existing = await prisma.amenity.findFirst({
      where: { name: amenity.name },
    });

    if (!existing) {
      await prisma.amenity.create({
        data: amenity,
      });
      console.log(`✅ Created amenity: ${amenity.name} (${amenity.category})`);
    } else {
      console.log(`⏭️  Amenity already exists: ${amenity.name}`);
    }
  }

  console.log('\n✨ Amenity seeding completed!\n');

  // Display statistics
  const stats = await prisma.amenity.groupBy({
    by: ['category'],
    _count: true,
  });

  console.log('📊 Statistics by category:');
  stats.forEach(stat => {
    console.log(`   ${stat.category}: ${stat._count}`);
  });
}

seedAmenities()
  .catch((error) => {
    console.error('❌ Error seeding amenities:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
