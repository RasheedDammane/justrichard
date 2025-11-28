import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('💪 Starting Coaches seeding...\n');

  // Get countries
  const thailand = await prisma.country.findFirst({ where: { code: 'TH' } });
  const uae = await prisma.country.findFirst({ where: { code: 'AE' } });

  if (!thailand || !uae) {
    console.log('❌ Countries not found. Please seed countries first.');
    return;
  }

  // Get cities
  const bangkok = await prisma.city.findFirst({ where: { slug: 'bangkok' } });
  const pattaya = await prisma.city.findFirst({ where: { slug: 'pattaya' } });
  const phuket = await prisma.city.findFirst({ where: { slug: 'phuket' } });
  const dubai = await prisma.city.findFirst({ where: { slug: 'dubai' } });

  const coaches = [
    // MMA & Combat Sports Coach - Bangkok
    {
      id: 'coach-mike-anderson',
      name: 'Mike Anderson',
      slug: 'mike-anderson-mma-coach',
      title: 'Professional MMA & Combat Sports Coach',
      bio: 'Former professional MMA fighter with 10 years of cage experience and 8 years of coaching. Specialized in striking, grappling, and fight preparation. I\'ve trained multiple champions and helped dozens of fighters reach their potential. Whether you\'re preparing for your first amateur fight or looking to go pro, I provide comprehensive training covering all aspects of MMA.',
      mainCategory: 'sport_coaching',
      specializations: JSON.stringify(['mma', 'boxing', 'muay_thai', 'bjj']),
      tags: JSON.stringify(['fight_prep', 'conditioning', 'strength', 'discipline', 'confidence_boost']),
      experience: 8,
      education: JSON.stringify([
        { degree: 'Professional MMA Fighter License', institution: 'ONE Championship', year: 2015 },
        { degree: 'BJJ Black Belt', institution: 'Gracie Barra', year: 2018 },
        { degree: 'Certified Strength & Conditioning Coach', institution: 'NSCA', year: 2016 },
      ]),
      certifications: JSON.stringify([
        'ONE Championship Fighter',
        'BJJ Black Belt (Gracie Barra)',
        'Muay Thai Kru Certification',
        'NSCA Certified Strength Coach',
      ]),
      achievements: JSON.stringify([
        '15-3 Professional MMA Record',
        'ONE Championship Contender',
        'National Muay Thai Champion 2014',
        'Trained 5 Professional Champions',
      ]),
      languages: JSON.stringify(['English', 'Thai']),
      coachingFormats: JSON.stringify(['in_person', 'private_session', 'group_class', 'online']),
      targetAudience: JSON.stringify(['men', 'women', 'athletes', 'teenagers']),
      clientLevels: JSON.stringify(['beginner', 'intermediate', 'advanced', 'professional_fighter']),
      sessionFee: 2000,
      hourlyRate: 2500,
      packagePricing: JSON.stringify([
        { name: '10 Sessions Package', price: 18000, sessions: 10 },
        { name: '20 Sessions Package', price: 34000, sessions: 20 },
        { name: 'Monthly Unlimited', price: 25000, period: 'month' },
      ]),
      currency: 'THB',
      cityId: bangkok?.id || 'city-bangkok',
      countryId: thailand.id,
      locations: JSON.stringify([
        { type: 'gym', name: 'Tiger Muay Thai Bangkok', address: 'Sukhumvit Road, Bangkok' },
        { type: 'gym', name: 'Fairtex Training Center', address: 'Phra Khanong, Bangkok' },
        { type: 'online', platform: 'Zoom / Google Meet' },
      ]),
      latitude: 13.7367,
      longitude: 100.5608,
      availableDays: JSON.stringify(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']),
      workingHours: JSON.stringify({ start: '06:00', end: '21:00' }),
      bookingTypes: JSON.stringify(['in_person', 'gym_session', 'online_session']),
      email: 'mike@mmacoachbkk.com',
      phone: '+66 89 123 4567',
      website: 'https://www.mmacoachbkk.com',
      instagram: '@mikeanderson_mma',
      image: '🥊',
      totalClients: 150,
      successRate: 92.0,
      rating: 4.9,
      reviewCount: 87,
      programs: JSON.stringify([
        { name: 'Fight Prep Program', duration: '12 weeks', focus: 'Competition preparation' },
        { name: 'MMA Fundamentals', duration: '8 weeks', focus: 'Beginner to intermediate' },
        { name: 'Striking Mastery', duration: '10 weeks', focus: 'Boxing & Muay Thai' },
      ]),
      metaTitle: 'Mike Anderson - Professional MMA Coach in Bangkok | JustRichard',
      metaDescription: 'Train with former ONE Championship fighter Mike Anderson. 8+ years coaching MMA, Boxing, Muay Thai & BJJ in Bangkok.',
      isFeatured: true,
      isActive: true,
      isVerified: true,
      isAvailable: true,
      acceptsOnline: true,
      acceptsInPerson: true,
      updatedAt: new Date(),
    },

    // Nutrition Coach - Bangkok
    {
      id: 'coach-sarah-williams',
      name: 'Sarah Williams',
      slug: 'sarah-williams-nutrition-coach',
      title: 'Sports Nutritionist & Weight Loss Specialist',
      bio: 'Certified sports nutritionist with 12 years of experience helping athletes and everyday people achieve their body goals. I specialize in sustainable nutrition strategies for fat loss, muscle gain, and performance optimization. My approach combines science-based nutrition with practical meal planning that fits your lifestyle.',
      mainCategory: 'nutrition_coaching',
      specializations: JSON.stringify(['sports_nutrition', 'weight_loss_nutrition', 'muscle_gain_nutrition', 'meal_plan', 'women_nutrition']),
      tags: JSON.stringify(['weight_loss', 'fat_burning', 'muscle_gain', 'clean_eating', 'high_protein', 'meal_plan']),
      experience: 12,
      education: JSON.stringify([
        { degree: 'M.Sc. in Sports Nutrition', institution: 'Loughborough University', year: 2011 },
        { degree: 'B.Sc. in Dietetics', institution: 'King\'s College London', year: 2009 },
      ]),
      certifications: JSON.stringify([
        'Registered Dietitian (RD)',
        'ISSN Certified Sports Nutritionist',
        'Precision Nutrition Level 2',
        'Women\'s Health Specialist',
      ]),
      achievements: JSON.stringify([
        'Helped 500+ clients achieve their goals',
        'Featured in Men\'s Health & Women\'s Fitness',
        'Nutrition consultant for Thai National Team',
      ]),
      languages: JSON.stringify(['English', 'Thai']),
      coachingFormats: JSON.stringify(['online', 'in_person', 'hybrid']),
      targetAudience: JSON.stringify(['men', 'women', 'athletes', 'busy_professionals', 'postpartum_women']),
      clientLevels: JSON.stringify(['beginner', 'intermediate', 'advanced', 'athlete']),
      sessionFee: 1800,
      hourlyRate: 2200,
      packagePricing: JSON.stringify([
        { name: '4-Week Meal Plan', price: 6000, duration: '4 weeks' },
        { name: '8-Week Transformation', price: 11000, duration: '8 weeks' },
        { name: '12-Week Complete Program', price: 15000, duration: '12 weeks' },
      ]),
      currency: 'THB',
      cityId: bangkok?.id || 'city-bangkok',
      countryId: thailand.id,
      locations: JSON.stringify([
        { type: 'online', platform: 'Zoom / WhatsApp Video' },
        { type: 'office', name: 'Nutrition Clinic Bangkok', address: 'Thonglor, Bangkok' },
      ]),
      latitude: 13.7367,
      longitude: 100.5608,
      availableDays: JSON.stringify(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']),
      workingHours: JSON.stringify({ start: '09:00', end: '19:00' }),
      bookingTypes: JSON.stringify(['online_session', 'in_person']),
      email: 'sarah@nutritionbkk.com',
      phone: '+66 92 234 5678',
      website: 'https://www.nutritionbkk.com',
      instagram: '@sarahwilliams_nutrition',
      image: '🥗',
      totalClients: 520,
      successRate: 94.5,
      rating: 4.8,
      reviewCount: 156,
      programs: JSON.stringify([
        { name: 'Fat Loss Transformation', duration: '12 weeks', focus: 'Sustainable fat loss' },
        { name: 'Muscle Gain Protocol', duration: '10 weeks', focus: 'Lean muscle building' },
        { name: 'Performance Nutrition', duration: '8 weeks', focus: 'Athletic performance' },
      ]),
      metaTitle: 'Sarah Williams - Sports Nutritionist in Bangkok | JustRichard',
      metaDescription: 'Expert sports nutritionist with 12+ years experience. Specializing in weight loss, muscle gain, and performance nutrition.',
      isFeatured: true,
      isActive: true,
      isVerified: true,
      isAvailable: true,
      acceptsOnline: true,
      acceptsInPerson: true,
      updatedAt: new Date(),
    },

    // Strength & Conditioning Coach - Pattaya
    {
      id: 'coach-tom-richards',
      name: 'Tom Richards',
      slug: 'tom-richards-strength-coach',
      title: 'Strength & Conditioning Specialist',
      bio: 'Former powerlifter and strength coach with 10 years of experience. I help people build real strength, muscle, and confidence. Whether you want to get stronger, build muscle, or improve your athletic performance, I create customized programs based on your goals and abilities.',
      mainCategory: 'sport_coaching',
      specializations: JSON.stringify(['strength_training', 'crossfit', 'functional_training', 'fitness']),
      tags: JSON.stringify(['muscle_gain', 'strength', 'body_toning', 'conditioning']),
      experience: 10,
      education: JSON.stringify([
        { degree: 'B.Sc. in Exercise Science', institution: 'University of Queensland', year: 2013 },
        { degree: 'CSCS Certification', institution: 'NSCA', year: 2014 },
      ]),
      certifications: JSON.stringify([
        'NSCA Certified Strength & Conditioning Specialist',
        'CrossFit Level 2 Trainer',
        'USA Powerlifting Coach',
      ]),
      achievements: JSON.stringify([
        'National Powerlifting Champion 2015',
        'Trained 200+ clients',
        'Head Coach at Elite Fitness Pattaya',
      ]),
      languages: JSON.stringify(['English', 'Thai']),
      coachingFormats: JSON.stringify(['in_person', 'private_session', 'group_class', 'online']),
      targetAudience: JSON.stringify(['men', 'women', 'athletes', 'busy_professionals']),
      clientLevels: JSON.stringify(['beginner', 'intermediate', 'advanced']),
      sessionFee: 1500,
      hourlyRate: 1800,
      packagePricing: JSON.stringify([
        { name: '10 Sessions', price: 13500, sessions: 10 },
        { name: '20 Sessions', price: 25000, sessions: 20 },
        { name: 'Monthly Unlimited', price: 18000, period: 'month' },
      ]),
      currency: 'THB',
      cityId: pattaya?.id || 'city-pattaya',
      countryId: thailand.id,
      locations: JSON.stringify([
        { type: 'gym', name: 'Elite Fitness Pattaya', address: 'Beach Road, Pattaya' },
        { type: 'online', platform: 'Zoom' },
      ]),
      latitude: 12.9236,
      longitude: 100.8825,
      availableDays: JSON.stringify(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']),
      workingHours: JSON.stringify({ start: '06:00', end: '20:00' }),
      bookingTypes: JSON.stringify(['in_person', 'gym_session', 'online_session']),
      email: 'tom@strengthpattaya.com',
      phone: '+66 87 345 6789',
      website: 'https://www.strengthpattaya.com',
      instagram: '@tomrichards_strength',
      image: '💪',
      totalClients: 210,
      successRate: 91.0,
      rating: 4.7,
      reviewCount: 92,
      programs: JSON.stringify([
        { name: '12-Week Muscle Gain', duration: '12 weeks', focus: 'Hypertrophy & strength' },
        { name: '8-Week Strength Program', duration: '8 weeks', focus: 'Powerlifting basics' },
        { name: 'Body Recomposition', duration: '10 weeks', focus: 'Fat loss + muscle gain' },
      ]),
      metaTitle: 'Tom Richards - Strength Coach in Pattaya | JustRichard',
      metaDescription: 'Build strength and muscle with certified strength coach Tom Richards. 10+ years experience in Pattaya.',
      isFeatured: true,
      isActive: true,
      isVerified: true,
      isAvailable: true,
      acceptsOnline: true,
      acceptsInPerson: true,
      updatedAt: new Date(),
    },

    // Emotional & Mindset Coach - Dubai
    {
      id: 'coach-layla-hassan',
      name: 'Layla Hassan',
      slug: 'layla-hassan-mindset-coach',
      title: 'Emotional Intelligence & Mindset Coach',
      bio: 'Certified life coach and emotional intelligence specialist with 9 years of experience. I help people overcome mental blocks, build confidence, manage stress, and develop a winning mindset. My coaching combines psychology, mindfulness, and practical strategies for lasting change.',
      mainCategory: 'emotional_coaching',
      specializations: JSON.stringify(['confidence', 'stress_management', 'emotional_balance', 'discipline_habits', 'sport_mindset']),
      tags: JSON.stringify(['confidence_boost', 'stress_reduction', 'emotional_balance', 'discipline']),
      experience: 9,
      education: JSON.stringify([
        { degree: 'M.A. in Psychology', institution: 'American University of Dubai', year: 2014 },
        { degree: 'Life Coach Certification', institution: 'ICF Accredited Program', year: 2015 },
      ]),
      certifications: JSON.stringify([
        'ICF Certified Professional Coach (PCC)',
        'Emotional Intelligence Practitioner',
        'NLP Master Practitioner',
        'Mindfulness-Based Stress Reduction (MBSR)',
      ]),
      achievements: JSON.stringify([
        'Coached 300+ clients',
        'TEDx Speaker on Emotional Intelligence',
        'Featured in Gulf News & Khaleej Times',
      ]),
      languages: JSON.stringify(['Arabic', 'English', 'French']),
      coachingFormats: JSON.stringify(['online', 'in_person', 'hybrid']),
      targetAudience: JSON.stringify(['men', 'women', 'athletes', 'busy_professionals', 'teenagers']),
      clientLevels: JSON.stringify(['beginner', 'intermediate', 'advanced']),
      sessionFee: 400,
      hourlyRate: 500,
      packagePricing: JSON.stringify([
        { name: '6 Sessions Package', price: 2200, sessions: 6 },
        { name: '12 Sessions Package', price: 4000, sessions: 12 },
        { name: '3-Month Transformation', price: 5500, duration: '3 months' },
      ]),
      currency: 'AED',
      cityId: dubai?.id || 'city-dubai',
      countryId: uae.id,
      locations: JSON.stringify([
        { type: 'online', platform: 'Zoom / WhatsApp Video / Google Meet' },
        { type: 'office', name: 'Mindset Coaching Dubai', address: 'Business Bay, Dubai' },
      ]),
      latitude: 25.1872,
      longitude: 55.2631,
      availableDays: JSON.stringify(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday']),
      workingHours: JSON.stringify({ start: '09:00', end: '20:00' }),
      bookingTypes: JSON.stringify(['online_session', 'in_person']),
      email: 'layla@mindsetdubai.ae',
      phone: '+971 50 123 4567',
      website: 'https://www.mindsetdubai.ae',
      instagram: '@laylahassan_coach',
      image: '🧠',
      totalClients: 310,
      successRate: 96.0,
      rating: 4.9,
      reviewCount: 124,
      programs: JSON.stringify([
        { name: 'Confidence Breakthrough', duration: '8 weeks', focus: 'Build unshakeable confidence' },
        { name: 'Stress Mastery', duration: '6 weeks', focus: 'Stress management techniques' },
        { name: 'Mindset Transformation', duration: '12 weeks', focus: 'Complete mindset shift' },
      ]),
      metaTitle: 'Layla Hassan - Mindset Coach in Dubai | JustRichard',
      metaDescription: 'Transform your mindset with certified coach Layla Hassan. 9+ years experience in emotional intelligence and confidence coaching.',
      isFeatured: true,
      isActive: true,
      isVerified: true,
      isAvailable: true,
      acceptsOnline: true,
      acceptsInPerson: true,
      updatedAt: new Date(),
    },

    // Yoga & Holistic Coach - Phuket
    {
      id: 'coach-anna-bergman',
      name: 'Anna Bergman',
      slug: 'anna-bergman-yoga-coach',
      title: 'Yoga Instructor & Holistic Wellness Coach',
      bio: 'Certified yoga instructor with 11 years of experience in Hatha, Vinyasa, and Yin yoga. I combine traditional yoga practices with modern wellness coaching to help you find balance, flexibility, and inner peace. Perfect for beginners and advanced practitioners.',
      mainCategory: 'holistic_coaching',
      specializations: JSON.stringify(['yoga', 'meditation', 'breathwork', 'mindfulness']),
      tags: JSON.stringify(['stress_reduction', 'emotional_balance', 'mobility', 'clean_eating']),
      experience: 11,
      education: JSON.stringify([
        { degree: '500-Hour Yoga Teacher Training', institution: 'Yoga Alliance', year: 2013 },
        { degree: 'Holistic Health Coach Certification', institution: 'IIN', year: 2015 },
      ]),
      certifications: JSON.stringify([
        'E-RYT 500 (Experienced Registered Yoga Teacher)',
        'Yin Yoga Certification',
        'Meditation Teacher Training',
        'Breathwork Facilitator',
      ]),
      achievements: JSON.stringify([
        'Taught 5,000+ yoga classes',
        'Retreat leader in Thailand & Bali',
        'Featured in Yoga Journal',
      ]),
      languages: JSON.stringify(['English', 'Swedish', 'Thai']),
      coachingFormats: JSON.stringify(['in_person', 'online', 'group_class', 'private_session']),
      targetAudience: JSON.stringify(['men', 'women', 'seniors', 'busy_professionals']),
      clientLevels: JSON.stringify(['beginner', 'intermediate', 'advanced']),
      sessionFee: 1200,
      hourlyRate: 1500,
      packagePricing: JSON.stringify([
        { name: '10 Classes Package', price: 10000, sessions: 10 },
        { name: 'Monthly Unlimited', price: 12000, period: 'month' },
        { name: '7-Day Yoga Retreat', price: 35000, duration: '7 days' },
      ]),
      currency: 'THB',
      cityId: phuket?.id || 'city-phuket',
      countryId: thailand.id,
      locations: JSON.stringify([
        { type: 'studio', name: 'Phuket Yoga Studio', address: 'Rawai Beach, Phuket' },
        { type: 'outdoor', name: 'Beach Yoga Sessions', address: 'Various beaches in Phuket' },
        { type: 'online', platform: 'Zoom' },
      ]),
      latitude: 7.8804,
      longitude: 98.3923,
      availableDays: JSON.stringify(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
      workingHours: JSON.stringify({ start: '06:00', end: '19:00' }),
      bookingTypes: JSON.stringify(['in_person', 'online_session', 'group_class']),
      email: 'anna@yogaphuket.com',
      phone: '+66 81 456 7890',
      website: 'https://www.yogaphuket.com',
      instagram: '@annabergman_yoga',
      image: '🧘‍♀️',
      totalClients: 450,
      successRate: 95.0,
      rating: 4.8,
      reviewCount: 178,
      programs: JSON.stringify([
        { name: 'Beginner Yoga Journey', duration: '4 weeks', focus: 'Yoga fundamentals' },
        { name: 'Flexibility & Mobility', duration: '6 weeks', focus: 'Improve flexibility' },
        { name: 'Mindfulness & Meditation', duration: '8 weeks', focus: 'Inner peace' },
      ]),
      metaTitle: 'Anna Bergman - Yoga Instructor in Phuket | JustRichard',
      metaDescription: 'Find balance with certified yoga instructor Anna Bergman. 11+ years experience in Phuket. Hatha, Vinyasa, Yin yoga.',
      isFeatured: false,
      isActive: true,
      isVerified: true,
      isAvailable: true,
      acceptsOnline: true,
      acceptsInPerson: true,
      updatedAt: new Date(),
    },

    // CrossFit & HIIT Coach - Dubai
    {
      id: 'coach-alex-martinez',
      name: 'Alex Martinez',
      slug: 'alex-martinez-crossfit-coach',
      title: 'CrossFit & HIIT Specialist',
      bio: 'CrossFit Level 3 coach with 7 years of experience. I specialize in high-intensity training, functional fitness, and body transformation. My programs are designed to push your limits while keeping you safe and injury-free. Perfect for those who want results fast.',
      mainCategory: 'sport_coaching',
      specializations: JSON.stringify(['crossfit', 'hiit', 'functional_training', 'fitness']),
      tags: JSON.stringify(['fat_burning', 'conditioning', 'strength', 'endurance', 'body_toning']),
      experience: 7,
      education: JSON.stringify([
        { degree: 'CrossFit Level 3 Trainer', institution: 'CrossFit HQ', year: 2017 },
        { degree: 'B.Sc. in Kinesiology', institution: 'University of Miami', year: 2015 },
      ]),
      certifications: JSON.stringify([
        'CrossFit Level 3 Trainer',
        'HIIT Specialist',
        'Olympic Weightlifting Coach',
        'First Aid & CPR Certified',
      ]),
      achievements: JSON.stringify([
        'CrossFit Regional Competitor',
        'Coached 150+ transformations',
        'Owner of CrossFit Dubai Box',
      ]),
      languages: JSON.stringify(['English', 'Spanish', 'Arabic']),
      coachingFormats: JSON.stringify(['in_person', 'group_class', 'private_session', 'online']),
      targetAudience: JSON.stringify(['men', 'women', 'athletes', 'busy_professionals']),
      clientLevels: JSON.stringify(['beginner', 'intermediate', 'advanced']),
      sessionFee: 350,
      hourlyRate: 450,
      packagePricing: JSON.stringify([
        { name: '10 Sessions', price: 3200, sessions: 10 },
        { name: 'Monthly Unlimited', price: 1200, period: 'month' },
        { name: '8-Week Transformation', price: 4500, duration: '8 weeks' },
      ]),
      currency: 'AED',
      cityId: dubai?.id || 'city-dubai',
      countryId: uae.id,
      locations: JSON.stringify([
        { type: 'gym', name: 'CrossFit Dubai', address: 'Al Quoz, Dubai' },
        { type: 'online', platform: 'Zoom' },
      ]),
      latitude: 25.1372,
      longitude: 55.2087,
      availableDays: JSON.stringify(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Saturday']),
      workingHours: JSON.stringify({ start: '05:00', end: '21:00' }),
      bookingTypes: JSON.stringify(['in_person', 'gym_session', 'group_class', 'online_session']),
      email: 'alex@crossfitdubai.ae',
      phone: '+971 52 234 5678',
      website: 'https://www.crossfitdubai.ae',
      instagram: '@alexmartinez_crossfit',
      image: '🏋️',
      totalClients: 180,
      successRate: 89.0,
      rating: 4.7,
      reviewCount: 95,
      programs: JSON.stringify([
        { name: 'Fat Loss Bootcamp', duration: '8 weeks', focus: 'Rapid fat loss' },
        { name: 'CrossFit Fundamentals', duration: '6 weeks', focus: 'Learn the basics' },
        { name: 'Competition Prep', duration: '12 weeks', focus: 'CrossFit competitions' },
      ]),
      metaTitle: 'Alex Martinez - CrossFit Coach in Dubai | JustRichard',
      metaDescription: 'Get fit fast with CrossFit Level 3 coach Alex Martinez. 7+ years experience in Dubai. HIIT & functional training.',
      isFeatured: false,
      isActive: true,
      isVerified: true,
      isAvailable: true,
      acceptsOnline: true,
      acceptsInPerson: true,
      updatedAt: new Date(),
    },
  ];

  for (const coach of coaches) {
    await prisma.coach.upsert({
      where: { id: coach.id },
      update: coach,
      create: coach,
    });
    console.log(`✅ Created/Updated: ${coach.name} (${coach.mainCategory})`);
  }

  console.log(`\n🎉 Successfully seeded ${coaches.length} coaches!`);
  console.log(`   - Sport Coaching: 3 coaches`);
  console.log(`   - Nutrition Coaching: 1 coach`);
  console.log(`   - Emotional Coaching: 1 coach`);
  console.log(`   - Holistic Coaching: 2 coaches`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding coaches:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
