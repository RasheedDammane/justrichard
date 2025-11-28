import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Events...');

  // Get or create event category
  let category = await prisma.eventCategory.findFirst({
    where: { slug: 'technology' }
  });

  if (!category) {
    category = await prisma.eventCategory.create({
      data: {
        id: `cat_${Date.now()}`,
        name: 'Technology',
        slug: 'technology',
        description: 'Tech events and conferences',
        isActive: true,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    });
    console.log('✅ Created category: Technology');
  }

  // Get Dubai city
  const dubai = await prisma.city.findFirst({
    where: { name: 'Dubai' }
  });

  const cityId = dubai?.id || null;

  // Create Events
  const events = [
    {
      id: `event_${Date.now()}_1`,
      title: 'Tech Summit Dubai 2025',
      slug: 'tech-summit-dubai-2025',
      description: `Join us for the biggest technology conference in the Middle East! 

This 3-day event brings together industry leaders, innovators, and tech enthusiasts from around the world.

Topics include:
- Artificial Intelligence & Machine Learning
- Cloud Computing & DevOps
- Cybersecurity
- Blockchain & Web3
- Future of Work

Network with over 5000 attendees, attend workshops, and discover the latest innovations in technology.`,
      shortDescription: 'The biggest tech conference in the Middle East with 5000+ attendees',
      coverImage: '',
      categoryId: category.id,
      eventType: 'conference',
      startDate: new Date('2025-12-15T09:00:00'),
      endDate: new Date('2025-12-17T18:00:00'),
      locationType: 'physical',
      venueName: 'Dubai World Trade Centre',
      venueAddress: 'Sheikh Rashid Hall, Dubai World Trade Centre',
      cityId: cityId,
      capacity: 5000,
      isFree: false,
      isPaid: true,
      ticketPrice: 500,
      currency: 'AED',
      dressCode: 'business-casual',
      organizerName: 'Tech Events Middle East',
      organizerEmail: 'info@techsummit.ae',
      organizerPhone: '+971 4 123 4567',
      organizerWebsite: 'https://techsummit.ae',
      requiresApproval: false,
      maxAttendees: 5000,
      registrationDeadline: new Date('2025-12-10T23:59:59'),
      metaTitle: 'Tech Summit Dubai 2025 - Premier Technology Conference',
      metaDescription: 'Join 5000+ tech professionals at the biggest technology conference in the Middle East',
      status: 'published',
      isActive: true,
      isFeatured: true,
      views: 1250,
      totalRegistrations: 342,
      updatedAt: new Date(),
    },
    {
      id: `event_${Date.now()}_2`,
      title: 'AI & Machine Learning Workshop',
      slug: 'ai-machine-learning-workshop',
      description: `Hands-on workshop on Artificial Intelligence and Machine Learning.

Learn from industry experts and build real-world AI applications.

What you'll learn:
- Introduction to AI/ML concepts
- Python for Machine Learning
- Building Neural Networks
- Deep Learning with TensorFlow
- Real-world AI applications

Perfect for developers, data scientists, and tech enthusiasts looking to dive into AI.

Requirements:
- Basic programming knowledge
- Laptop with Python installed`,
      shortDescription: 'Hands-on AI/ML workshop with industry experts',
      coverImage: '',
      categoryId: category.id,
      eventType: 'workshop',
      startDate: new Date('2025-12-20T10:00:00'),
      endDate: new Date('2025-12-20T17:00:00'),
      locationType: 'hybrid',
      venueName: 'Innovation Hub Dubai',
      venueAddress: 'Dubai Internet City',
      cityId: cityId,
      meetingUrl: 'https://zoom.us/j/ai-workshop-2025',
      capacity: 100,
      isFree: false,
      isPaid: true,
      ticketPrice: 250,
      currency: 'AED',
      dressCode: 'casual',
      organizerName: 'AI Academy',
      organizerEmail: 'workshops@aiacademy.ae',
      organizerPhone: '+971 50 123 4567',
      requiresApproval: false,
      maxAttendees: 100,
      registrationDeadline: new Date('2025-12-18T23:59:59'),
      metaTitle: 'AI & Machine Learning Workshop - Learn from Experts',
      metaDescription: 'Hands-on workshop on AI and ML. Build real-world applications with industry experts.',
      status: 'published',
      isActive: true,
      isFeatured: true,
      views: 856,
      totalRegistrations: 67,
      updatedAt: new Date(),
    },
    {
      id: `event_${Date.now()}_3`,
      title: 'Startup Networking Night',
      slug: 'startup-networking-night',
      description: `Connect with fellow entrepreneurs, investors, and startup enthusiasts!

This monthly networking event is designed to help startups connect with potential investors, partners, and customers.

What to expect:
- Speed networking sessions
- Pitch opportunities (5 min per startup)
- Investor panel discussion
- Drinks & canapés
- Live music

Whether you're a founder, investor, or just interested in the startup ecosystem, this is the perfect opportunity to expand your network.

Dress code: Smart casual`,
      shortDescription: 'Monthly networking event for startups and investors',
      coverImage: '',
      categoryId: category.id,
      eventType: 'networking',
      startDate: new Date('2025-12-05T18:00:00'),
      endDate: new Date('2025-12-05T22:00:00'),
      locationType: 'physical',
      venueName: 'The Penthouse, FIVE Palm Jumeirah',
      venueAddress: 'FIVE Palm Jumeirah Hotel, Palm Jumeirah',
      cityId: cityId,
      capacity: 200,
      isFree: true,
      isPaid: false,
      dressCode: 'business-casual',
      organizerName: 'Dubai Startup Hub',
      organizerEmail: 'events@dubaistartups.com',
      organizerPhone: '+971 4 987 6543',
      organizerWebsite: 'https://dubaistartups.com',
      requiresApproval: true,
      maxAttendees: 200,
      registrationDeadline: new Date('2025-12-03T23:59:59'),
      metaTitle: 'Startup Networking Night Dubai - Connect with Investors',
      metaDescription: 'Free networking event for startups, investors, and entrepreneurs in Dubai',
      status: 'published',
      isActive: true,
      isFeatured: false,
      views: 543,
      totalRegistrations: 128,
      updatedAt: new Date(),
    },
    {
      id: `event_${Date.now()}_4`,
      title: 'Web Development Bootcamp',
      slug: 'web-development-bootcamp',
      description: `Intensive 5-day bootcamp to become a full-stack web developer!

Learn everything you need to build modern web applications from scratch.

Curriculum:
Day 1-2: HTML, CSS, JavaScript fundamentals
Day 3: React.js & Frontend development
Day 4: Node.js & Backend development
Day 5: Database, Deployment & Best practices

Includes:
- Daily hands-on coding sessions
- Real-world projects
- Certificate of completion
- Job placement assistance
- Lifetime access to course materials

Perfect for beginners and career switchers!`,
      shortDescription: 'Intensive 5-day full-stack web development bootcamp',
      coverImage: '',
      categoryId: category.id,
      eventType: 'workshop',
      startDate: new Date('2026-01-05T09:00:00'),
      endDate: new Date('2026-01-09T18:00:00'),
      locationType: 'online',
      meetingUrl: 'https://zoom.us/j/webdev-bootcamp-2025',
      capacity: 50,
      isFree: false,
      isPaid: true,
      ticketPrice: 1500,
      currency: 'AED',
      dressCode: 'casual',
      organizerName: 'Code Academy Dubai',
      organizerEmail: 'bootcamp@codeacademy.ae',
      organizerPhone: '+971 55 234 5678',
      organizerWebsite: 'https://codeacademy.ae',
      requiresApproval: false,
      maxAttendees: 50,
      registrationDeadline: new Date('2026-01-01T23:59:59'),
      metaTitle: 'Web Development Bootcamp - Become a Full-Stack Developer',
      metaDescription: '5-day intensive bootcamp to learn full-stack web development from scratch',
      status: 'published',
      isActive: true,
      isFeatured: true,
      views: 1024,
      totalRegistrations: 38,
      updatedAt: new Date(),
    },
    {
      id: `event_${Date.now()}_5`,
      title: 'Cybersecurity Awareness Seminar',
      slug: 'cybersecurity-awareness-seminar',
      description: `Free seminar on cybersecurity best practices for businesses.

In today's digital world, cybersecurity is more important than ever. Learn how to protect your business from cyber threats.

Topics covered:
- Common cyber threats and how to prevent them
- Password security & 2FA
- Phishing & social engineering
- Data protection & GDPR compliance
- Incident response planning
- Cybersecurity tools and resources

Ideal for:
- Business owners
- IT managers
- Security professionals
- Anyone interested in cybersecurity

Free attendance with certificate of participation!`,
      shortDescription: 'Free cybersecurity seminar for businesses',
      coverImage: '',
      categoryId: category.id,
      eventType: 'seminar',
      startDate: new Date('2025-12-28T14:00:00'),
      endDate: new Date('2025-12-28T17:00:00'),
      locationType: 'hybrid',
      venueName: 'Dubai Chamber of Commerce',
      venueAddress: 'Al Mankhool Road, Bur Dubai',
      cityId: cityId,
      meetingUrl: 'https://zoom.us/j/cybersecurity-seminar',
      capacity: 300,
      isFree: true,
      isPaid: false,
      dressCode: 'business',
      organizerName: 'UAE Cybersecurity Council',
      organizerEmail: 'info@cybersecurity.ae',
      organizerPhone: '+971 4 555 6789',
      organizerWebsite: 'https://cybersecurity.ae',
      requiresApproval: false,
      maxAttendees: 300,
      registrationDeadline: new Date('2025-12-26T23:59:59'),
      metaTitle: 'Free Cybersecurity Awareness Seminar - Protect Your Business',
      metaDescription: 'Learn cybersecurity best practices to protect your business from cyber threats',
      status: 'published',
      isActive: true,
      isFeatured: false,
      views: 687,
      totalRegistrations: 156,
      updatedAt: new Date(),
    },
  ];

  for (const event of events) {
    await prisma.event.upsert({
      where: { slug: event.slug },
      update: event,
      create: event,
    });
    console.log(`✅ Created/Updated: ${event.title}`);
  }

  console.log('');
  console.log('🎉 Seeding completed!');
  console.log('');
  console.log('📊 Summary:');
  console.log(`   - Events created: ${events.length}`);
  console.log(`   - Free events: ${events.filter(e => e.isFree).length}`);
  console.log(`   - Paid events: ${events.filter(e => e.isPaid).length}`);
  console.log(`   - Featured events: ${events.filter(e => e.isFeatured).length}`);
  console.log('');
  console.log('🔗 Test URLs:');
  console.log('   Admin Events: http://localhost:3100/en/admin/events');
  console.log('   Public Events: http://localhost:3100/en/events');
  console.log('   API Events: http://localhost:3100/api/events');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
