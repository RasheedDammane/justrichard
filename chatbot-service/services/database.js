const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['error', 'warn'],
});

async function initializeDatabase() {
  try {
    await prisma.$connect();
    console.log('✅ Prisma connected to database');
    return prisma;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
}

async function getCategories() {
  return await prisma.category.findMany({
    include: {
      services: {
        take: 5,
        where: { published: true },
      },
    },
  });
}

async function getServices(filters = {}) {
  const where = { published: true };
  
  if (filters.categoryId) {
    where.categoryId = filters.categoryId;
  }
  
  if (filters.cityId) {
    where.cityId = filters.cityId;
  }
  
  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search, mode: 'insensitive' } },
      { description: { contains: filters.search, mode: 'insensitive' } },
    ];
  }

  return await prisma.service.findMany({
    where,
    include: {
      category: true,
      city: {
        include: {
          country: true,
        },
      },
      provider: {
        select: {
          name: true,
          email: true,
          phone: true,
        },
      },
    },
    take: filters.limit || 10,
  });
}

async function getServiceById(id) {
  return await prisma.service.findUnique({
    where: { id },
    include: {
      category: true,
      city: {
        include: {
          country: true,
        },
      },
      provider: {
        select: {
          name: true,
          email: true,
          phone: true,
          businessName: true,
        },
      },
    },
  });
}

async function getCities() {
  return await prisma.city.findMany({
    include: {
      country: true,
    },
  });
}

async function createBookingIntent(data) {
  // Store booking intent for follow-up
  return await prisma.bookingIntent.create({
    data: {
      serviceId: data.serviceId,
      userId: data.userId,
      sessionId: data.sessionId,
      status: 'PENDING',
      data: data.metadata || {},
    },
  });
}

async function saveChatMessage(message, userId, sessionId, isBot = false) {
  try {
    return await prisma.chatMessage.create({
      data: {
        message,
        userId,
        sessionId,
        isBot,
        timestamp: new Date(),
      },
    });
  } catch (error) {
    console.error('Error saving chat message:', error);
    return null;
  }
}

async function getChatHistory(sessionId, limit = 10) {
  try {
    return await prisma.chatMessage.findMany({
      where: { sessionId },
      orderBy: { timestamp: 'desc' },
      take: limit,
    });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return [];
  }
}

module.exports = {
  prisma,
  initializeDatabase,
  getCategories,
  getServices,
  getServiceById,
  getCities,
  createBookingIntent,
  saveChatMessage,
  getChatHistory,
};
