import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== Role.ADMIN && session.user.role !== Role.MANAGER)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30'; // days

    const daysAgo = parseInt(period);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysAgo);

    // Parallel queries for better performance
    const [
      totalUsers,
      newUsers,
      totalBookings,
      newBookings,
      totalRevenue,
      revenueData,
      totalServices,
      totalPartners,
      activePartners,
      totalChatbots,
      totalPromotions,
      activePromotions,
      totalPages,
      bookingsByStatus,
      topServices,
      recentBookings,
    ] = await Promise.all([
      // Users
      prisma.user.count(),
      prisma.user.count({
        where: { createdAt: { gte: startDate } },
      }),
      
      // Bookings
      prisma.booking.count(),
      prisma.booking.count({
        where: { createdAt: { gte: startDate } },
      }),
      
      // Revenue
      prisma.booking.aggregate({
        where: { 
          paymentStatus: 'PAID',
        },
        _sum: { total: true },
      }),
      prisma.booking.aggregate({
        where: { 
          paymentStatus: 'PAID',
          createdAt: { gte: startDate },
        },
        _sum: { total: true },
      }),
      
      // Services
      prisma.service.count(),
      
      // Partners
      prisma.partner.count(),
      prisma.partner.count({
        where: { status: 'ACTIVE' },
      }),
      
      // Chatbots
      prisma.chatbot.count(),
      
      // Promotions
      prisma.promotion.count(),
      prisma.promotion.count({
        where: {
          isActive: true,
          startsAt: { lte: new Date() },
          expiresAt: { gte: new Date() },
        },
      }),
      
      // CMS Pages
      prisma.cMSPage.count(),
      
      // Bookings by status
      prisma.booking.groupBy({
        by: ['status'],
        _count: true,
      }),
      
      // Top services
      prisma.booking.groupBy({
        by: ['serviceId'],
        _count: true,
        orderBy: { _count: { serviceId: 'desc' } },
        take: 5,
      }),
      
      // Recent bookings
      prisma.booking.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { name: true, email: true } },
          service: {
            include: {
              translations: {
                where: { locale: 'fr' },
                take: 1,
              },
            },
          },
        },
      }),
    ]);

    // Get service details for top services
    const topServiceIds = topServices.map(s => s.serviceId);
    const serviceDetails = await prisma.service.findMany({
      where: { id: { in: topServiceIds } },
      include: {
        translations: {
          where: { locale: 'fr' },
          take: 1,
        },
      },
    });

    const topServicesWithDetails = topServices.map(ts => {
      const service = serviceDetails.find(s => s.id === ts.serviceId);
      return {
        serviceId: ts.serviceId,
        count: ts._count,
        name: service?.translations[0]?.name || 'Unknown',
        bookings: ts._count,
      };
    });

    // Calculate growth rates
    const userGrowth = totalUsers > 0 ? ((newUsers / totalUsers) * 100).toFixed(1) : '0';
    const bookingGrowth = totalBookings > 0 ? ((newBookings / totalBookings) * 100).toFixed(1) : '0';
    const revenueGrowth = totalRevenue._sum.total 
      ? ((((revenueData._sum.total || 0) / totalRevenue._sum.total) * 100)).toFixed(1)
      : '0';

    const analytics = {
      overview: {
        totalUsers,
        newUsers,
        userGrowth: parseFloat(userGrowth),
        totalBookings,
        newBookings,
        bookingGrowth: parseFloat(bookingGrowth),
        totalRevenue: totalRevenue._sum.total || 0,
        periodRevenue: revenueData._sum.total || 0,
        revenueGrowth: parseFloat(revenueGrowth),
        totalServices,
        totalPartners,
        activePartners,
        totalChatbots,
        totalPromotions,
        activePromotions,
        totalPages,
      },
      bookingsByStatus: bookingsByStatus.map(b => ({
        status: b.status,
        count: b._count,
      })),
      topServices: topServicesWithDetails,
      recentBookings: recentBookings.map(b => ({
        id: b.id,
        user: b.user.name || b.user.email,
        service: b.service.translations[0]?.name || 'Unknown',
        total: b.total,
        status: b.status,
        paymentStatus: b.paymentStatus,
        createdAt: b.createdAt,
      })),
    };

    return NextResponse.json({ analytics });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
