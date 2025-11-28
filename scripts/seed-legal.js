const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding legal professionals...');

  const legalProfessionals = [
    {
      id: 'legal-1',
      slug: 'michael-brown-corporate-lawyer',
      type: 'LAWYER',
      status: 'PUBLISHED',
      name: 'Michael Brown',
      headline: 'Corporate Law Expert with 20+ years experience',
      bio: 'Specialized in corporate law, mergers & acquisitions, and business contracts. Helping businesses navigate complex legal landscapes.',
      profilePictureUrl: null,
      practiceAreas: ['Corporate Law', 'Contract Law', 'M&A'],
      languages: ['English', 'French'],
      yearsOfExperience: 20,
      city: 'Dubai',
      country: 'UAE',
      hourlyRateFrom: 500,
      hourlyRateTo: 1000,
      currency: 'AED',
      isActive: true,
      featured: true,
      priorityOrder: 1,
    },
    {
      id: 'legal-2',
      slug: 'layla-mansour-family-lawyer',
      type: 'LAWYER',
      status: 'PUBLISHED',
      name: 'Layla Mansour',
      headline: 'Family Law Specialist',
      bio: 'Compassionate family law attorney handling divorce, custody, and inheritance cases with care and professionalism.',
      profilePictureUrl: null,
      practiceAreas: ['Family Law', 'Divorce', 'Custody', 'Inheritance'],
      languages: ['Arabic', 'English'],
      yearsOfExperience: 12,
      city: 'Dubai',
      country: 'UAE',
      hourlyRateFrom: 400,
      hourlyRateTo: 800,
      currency: 'AED',
      isActive: true,
      featured: true,
      priorityOrder: 2,
    },
    {
      id: 'legal-3',
      slug: 'emirates-legal-partners',
      type: 'LAW_FIRM',
      status: 'PUBLISHED',
      name: 'Emirates Legal Partners',
      headline: 'Full-Service Law Firm',
      bio: 'Comprehensive legal services for businesses and individuals across the UAE. Our team of experienced lawyers covers all practice areas.',
      profilePictureUrl: null,
      practiceAreas: ['Corporate Law', 'Real Estate', 'Immigration', 'Litigation'],
      languages: ['English', 'Arabic', 'Hindi', 'French'],
      yearsOfExperience: 25,
      city: 'Dubai',
      country: 'UAE',
      hourlyRateFrom: 600,
      hourlyRateTo: 1500,
      currency: 'AED',
      isActive: true,
      featured: true,
      priorityOrder: 3,
    },
    {
      id: 'legal-4',
      slug: 'pierre-dubois-real-estate',
      type: 'LAWYER',
      status: 'PUBLISHED',
      name: 'Pierre Dubois',
      headline: 'Real Estate & Property Law Expert',
      bio: 'Specialized in property transactions, leasing, and real estate disputes. Extensive experience in UAE property law.',
      profilePictureUrl: null,
      practiceAreas: ['Property Law', 'Real Estate', 'Contract Law'],
      languages: ['French', 'English', 'Arabic'],
      yearsOfExperience: 15,
      city: 'Abu Dhabi',
      country: 'UAE',
      hourlyRateFrom: 450,
      hourlyRateTo: 900,
      currency: 'AED',
      isActive: true,
      featured: false,
      priorityOrder: 4,
    },
    {
      id: 'legal-5',
      slug: 'yasmin-khan-immigration',
      type: 'LEGAL_ADVISOR',
      status: 'PUBLISHED',
      name: 'Yasmin Khan',
      headline: 'Immigration & Employment Law Advisor',
      bio: 'Expert guidance on visa applications, work permits, and employment contracts. Helping individuals and companies with immigration matters.',
      profilePictureUrl: null,
      practiceAreas: ['Immigration Law', 'Employment Law', 'Labor Law'],
      languages: ['English', 'Urdu', 'Arabic'],
      yearsOfExperience: 10,
      city: 'Dubai',
      country: 'UAE',
      hourlyRateFrom: 350,
      hourlyRateTo: 700,
      currency: 'AED',
      isActive: true,
      featured: false,
      priorityOrder: 5,
    },
  ];

  for (const legal of legalProfessionals) {
    await prisma.legalProfessional.upsert({
      where: { id: legal.id },
      update: legal,
      create: legal,
    });
    console.log(`✅ Created/Updated: ${legal.name}`);
  }

  console.log(`\n🎉 Seeding completed! Added ${legalProfessionals.length} legal professionals`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
