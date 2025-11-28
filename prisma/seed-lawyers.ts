import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('⚖️  Starting Lawyers seeding...\n');

  // Get countries
  const thailand = await prisma.country.findFirst({ where: { code: 'TH' } });
  const uae = await prisma.country.findFirst({ where: { code: 'AE' } });

  if (!thailand || !uae) {
    console.log('❌ Countries not found. Please seed countries first.');
    return;
  }

  // Get cities
  const bangkok = await prisma.city.findFirst({ where: { slug: 'bangkok' } });
  const phuket = await prisma.city.findFirst({ where: { slug: 'phuket' } });
  const dubai = await prisma.city.findFirst({ where: { slug: 'dubai' } });

  // Thailand Lawyers
  const thailandLawyers = [
    {
      id: 'lawyer-somchai-pattana',
      name: 'Somchai Pattana',
      slug: 'somchai-pattana',
      title: 'Senior Legal Counsel',
      bio: 'Somchai Pattana is a highly experienced corporate lawyer with over 15 years of practice in Thailand. He specializes in business law, mergers and acquisitions, and international trade. Somchai has successfully represented numerous multinational corporations and local businesses in complex legal matters. He is known for his strategic thinking and ability to navigate the intricacies of Thai corporate law.',
      specialization: 'Corporate & Business Law',
      experience: 15,
      education: JSON.stringify([
        { degree: 'LL.M. in Corporate Law', institution: 'Harvard Law School', year: 2008 },
        { degree: 'LL.B. in Law', institution: 'Chulalongkorn University', year: 2005 },
      ]),
      certifications: JSON.stringify([
        'Thai Bar Association Member',
        'Certified Corporate Lawyer',
        'International Trade Law Certificate',
      ]),
      languages: JSON.stringify(['Thai', 'English', 'Chinese']),
      practiceAreas: JSON.stringify([
        'Corporate Law',
        'Mergers & Acquisitions',
        'Contract Law',
        'International Trade',
        'Business Formation',
        'Compliance',
      ]),
      consultationFee: 2500,
      hourlyRate: 5000,
      currency: 'THB',
      cityId: bangkok?.id || 'city-bangkok',
      countryId: thailand.id,
      officeAddress: '999 Silom Road, Bangrak, Bangkok 10500',
      latitude: 13.7307,
      longitude: 100.5418,
      email: 'somchai@legalthailand.com',
      phone: '+66 2 123 4567',
      website: 'https://www.legalthailand.com/somchai',
      availableDays: JSON.stringify(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']),
      workingHours: JSON.stringify({ start: '09:00', end: '18:00' }),
      image: '👨‍💼',
      casesHandled: 250,
      successRate: 94.5,
      rating: 4.9,
      reviewCount: 127,
      metaTitle: 'Somchai Pattana - Corporate Lawyer in Bangkok | JustRichard',
      metaDescription: 'Experienced corporate lawyer in Bangkok. 15+ years in business law, M&A, and international trade. Book a consultation today.',
      isFeatured: true,
      isActive: true,
      isVerified: true,
      isAvailable: true,
      updatedAt: new Date(),
    },
    {
      id: 'lawyer-niran-wongsuwan',
      name: 'Niran Wongsuwan',
      slug: 'niran-wongsuwan',
      title: 'Family Law Specialist',
      bio: 'Niran Wongsuwan is a compassionate family law attorney with 12 years of experience handling sensitive family matters. He specializes in divorce proceedings, child custody, inheritance disputes, and prenuptial agreements. Niran is known for his empathetic approach and ability to find amicable solutions while protecting his clients\' interests.',
      specialization: 'Family & Inheritance Law',
      experience: 12,
      education: JSON.stringify([
        { degree: 'LL.M. in Family Law', institution: 'Thammasat University', year: 2011 },
        { degree: 'LL.B. in Law', institution: 'Ramkhamhaeng University', year: 2009 },
      ]),
      certifications: JSON.stringify([
        'Thai Bar Association Member',
        'Certified Family Law Mediator',
        'Child Custody Specialist',
      ]),
      languages: JSON.stringify(['Thai', 'English']),
      practiceAreas: JSON.stringify([
        'Family Law',
        'Divorce',
        'Child Custody',
        'Inheritance',
        'Prenuptial Agreements',
        'Adoption',
      ]),
      consultationFee: 2000,
      hourlyRate: 4000,
      currency: 'THB',
      cityId: bangkok?.id || 'city-bangkok',
      countryId: thailand.id,
      officeAddress: '123 Sukhumvit Road, Klongtoey, Bangkok 10110',
      latitude: 13.7367,
      longitude: 100.5608,
      email: 'niran@familylawthailand.com',
      phone: '+66 2 234 5678',
      website: 'https://www.familylawthailand.com/niran',
      availableDays: JSON.stringify(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']),
      workingHours: JSON.stringify({ start: '09:00', end: '17:00' }),
      image: '👨‍⚖️',
      casesHandled: 180,
      successRate: 91.0,
      rating: 4.8,
      reviewCount: 89,
      metaTitle: 'Niran Wongsuwan - Family Lawyer in Bangkok | JustRichard',
      metaDescription: 'Compassionate family law attorney in Bangkok. 12+ years experience in divorce, custody, and inheritance. Schedule a consultation.',
      isFeatured: true,
      isActive: true,
      isVerified: true,
      isAvailable: true,
      updatedAt: new Date(),
    },
    {
      id: 'lawyer-apinya-srisawat',
      name: 'Apinya Srisawat',
      slug: 'apinya-srisawat',
      title: 'Property Law Expert',
      bio: 'Apinya Srisawat is a leading property law expert with 10 years of experience in real estate transactions and property disputes. She has extensive knowledge of Thai property laws and regulations, particularly regarding foreign ownership and condominium purchases. Apinya has helped hundreds of clients navigate the complexities of property acquisition in Thailand.',
      specialization: 'Property & Real Estate Law',
      experience: 10,
      education: JSON.stringify([
        { degree: 'LL.M. in Property Law', institution: 'Chulalongkorn University', year: 2013 },
        { degree: 'LL.B. in Law', institution: 'Kasetsart University', year: 2011 },
      ]),
      certifications: JSON.stringify([
        'Thai Bar Association Member',
        'Real Estate Law Specialist',
        'Property Title Verification Expert',
      ]),
      languages: JSON.stringify(['Thai', 'English', 'Japanese']),
      practiceAreas: JSON.stringify([
        'Property Law',
        'Real Estate Transactions',
        'Title Verification',
        'Lease Agreements',
        'Property Disputes',
        'Foreign Ownership',
      ]),
      consultationFee: 2200,
      hourlyRate: 4500,
      currency: 'THB',
      cityId: phuket?.id || 'city-phuket',
      countryId: thailand.id,
      officeAddress: '456 Phuket Road, Muang, Phuket 83000',
      latitude: 7.8804,
      longitude: 98.3923,
      email: 'apinya@propertylaw-phuket.com',
      phone: '+66 76 345 678',
      website: 'https://www.propertylaw-phuket.com',
      availableDays: JSON.stringify(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']),
      workingHours: JSON.stringify({ start: '09:00', end: '18:00' }),
      image: '👩‍💼',
      casesHandled: 220,
      successRate: 93.0,
      rating: 4.7,
      reviewCount: 95,
      metaTitle: 'Apinya Srisawat - Property Lawyer in Phuket | JustRichard',
      metaDescription: 'Expert property lawyer in Phuket. 10+ years in real estate law and foreign ownership. Book your consultation now.',
      isFeatured: true,
      isActive: true,
      isVerified: true,
      isAvailable: true,
      updatedAt: new Date(),
    },
  ];

  // Dubai Lawyers
  const dubaiLawyers = [
    {
      id: 'lawyer-ahmed-al-mansouri',
      name: 'Ahmed Al Mansouri',
      slug: 'ahmed-al-mansouri',
      title: 'International Legal Advisor',
      bio: 'Ahmed Al Mansouri is a distinguished international lawyer with 10 years of experience in cross-border transactions and property law. He specializes in helping expatriates and international businesses navigate UAE legal systems. Ahmed is fluent in multiple languages and has a deep understanding of both civil and common law systems.',
      specialization: 'International & Property Law',
      experience: 10,
      education: JSON.stringify([
        { degree: 'LL.M. in International Law', institution: 'University of London', year: 2013 },
        { degree: 'LL.B. in Law', institution: 'UAE University', year: 2011 },
      ]),
      certifications: JSON.stringify([
        'Dubai Bar Association Member',
        'International Trade Law Certificate',
        'Property Law Specialist',
      ]),
      languages: JSON.stringify(['Arabic', 'English', 'French']),
      practiceAreas: JSON.stringify([
        'International Law',
        'Property Law',
        'Business Formation',
        'Contract Law',
        'Immigration Law',
        'Dispute Resolution',
      ]),
      consultationFee: 500,
      hourlyRate: 1000,
      currency: 'AED',
      cityId: dubai?.id || 'city-dubai',
      countryId: uae.id,
      officeAddress: 'Dubai International Financial Centre, Gate Village 10, Dubai',
      latitude: 25.2048,
      longitude: 55.2708,
      email: 'ahmed@dubailegaladvisors.ae',
      phone: '+971 4 123 4567',
      website: 'https://www.dubailegaladvisors.ae',
      availableDays: JSON.stringify(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday']),
      workingHours: JSON.stringify({ start: '08:00', end: '17:00' }),
      image: '👨‍💼',
      casesHandled: 300,
      successRate: 95.0,
      rating: 4.9,
      reviewCount: 156,
      metaTitle: 'Ahmed Al Mansouri - International Lawyer in Dubai | JustRichard',
      metaDescription: 'Leading international lawyer in Dubai. 10+ years in property law and cross-border transactions. Multilingual legal services.',
      isFeatured: true,
      isActive: true,
      isVerified: true,
      isAvailable: true,
      updatedAt: new Date(),
    },
    {
      id: 'lawyer-fatima-hassan',
      name: 'Fatima Hassan',
      slug: 'fatima-hassan',
      title: 'Corporate Law Specialist',
      bio: 'Fatima Hassan is a dynamic corporate lawyer with 8 years of experience in UAE business law. She specializes in company formation, commercial contracts, and regulatory compliance. Fatima has helped numerous startups and established companies navigate the UAE business landscape successfully.',
      specialization: 'Corporate & Commercial Law',
      experience: 8,
      education: JSON.stringify([
        { degree: 'LL.M. in Corporate Law', institution: 'American University of Dubai', year: 2015 },
        { degree: 'LL.B. in Law', institution: 'Zayed University', year: 2013 },
      ]),
      certifications: JSON.stringify([
        'Dubai Bar Association Member',
        'Corporate Law Specialist',
        'Free Zone Business Expert',
      ]),
      languages: JSON.stringify(['Arabic', 'English']),
      practiceAreas: JSON.stringify([
        'Corporate Law',
        'Company Formation',
        'Commercial Contracts',
        'Compliance',
        'Free Zone Business',
        'Licensing',
      ]),
      consultationFee: 450,
      hourlyRate: 900,
      currency: 'AED',
      cityId: dubai?.id || 'city-dubai',
      countryId: uae.id,
      officeAddress: 'Business Bay, Bay Square Building 1, Dubai',
      latitude: 25.1872,
      longitude: 55.2631,
      email: 'fatima@corporatedubai.ae',
      phone: '+971 4 234 5678',
      website: 'https://www.corporatedubai.ae',
      availableDays: JSON.stringify(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday']),
      workingHours: JSON.stringify({ start: '08:30', end: '17:30' }),
      image: '👩‍💼',
      casesHandled: 150,
      successRate: 92.5,
      rating: 4.8,
      reviewCount: 78,
      metaTitle: 'Fatima Hassan - Corporate Lawyer in Dubai | JustRichard',
      metaDescription: 'Expert corporate lawyer in Dubai. 8+ years in company formation and commercial law. Free consultation available.',
      isFeatured: false,
      isActive: true,
      isVerified: true,
      isAvailable: true,
      updatedAt: new Date(),
    },
  ];

  // Create all lawyers
  const allLawyers = [...thailandLawyers, ...dubaiLawyers];

  for (const lawyer of allLawyers) {
    await prisma.lawyer.upsert({
      where: { id: lawyer.id },
      update: lawyer,
      create: lawyer,
    });
    console.log(`✅ Created/Updated: ${lawyer.name}`);
  }

  console.log(`\n🎉 Successfully seeded ${allLawyers.length} lawyers!`);
  console.log(`   - Thailand: ${thailandLawyers.length} lawyers`);
  console.log(`   - Dubai: ${dubaiLawyers.length} lawyers`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding lawyers:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
