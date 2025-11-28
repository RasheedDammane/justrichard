import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import DashboardClient from './DashboardClient';

// Simple logger fallback
const logger = {
  error: (message: string, error?: any, context?: any) => {
    console.error(message, error, context);
  }
};

export default async function AdminDashboard({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  // Temporairement désactivé pour test - À RÉACTIVER EN PRODUCTION
  // if (!session?.user) {
  //   redirect(`/${locale}/auth/login?callbackUrl=/${locale}/admin`);
  // }

  const user = session?.user || { id: 'guest', email: 'guest@test.com' };

  // Fetch dashboard stats with error handling
  let totalUsers = 0;
  let totalBookings = 0;
  let totalServices = 0;
  let totalDoctors = 0;
  let totalLawyers = 0;
  let totalCoaches = 0;
  let totalMaids = 0;
  let totalYachts = 0;
  let totalFoodProducts = 0;
  let totalTransfers = 0;
  let totalActivities = 0;
  let totalSuppliers = 0;
  let totalProperties = 0;
  let totalMotorbikes = 0;
  let totalRentalCars = 0;
  let totalEvents = 0;
  let totalCurrencies = 0;
  let totalCountries = 0;
  let totalExchangeRates = 0;
  let totalRoutes = 0;
  let totalSimulators = 0;
  let totalMovingServices = 0;
  let totalParcelServices = 0;
  let totalHomeCleaning = 0;
  let totalFurnitureCleaning = 0;
  let totalLaundry = 0;
  let recentBookings: any[] = [];
  let errorLogs: any[] = [];
  let bookingsByType: { type: string; count: number }[] = [];
  let bookingsByStatus: { status: string; count: number }[] = [];
  let totalRevenue = 0;

  try {
    const results = await Promise.all([
      prisma.user.count().catch(() => 0),
      prisma.booking.count().catch(() => 0),
      prisma.service.count({ where: { isActive: true } }).catch(() => 0),
      prisma.doctor.count().catch(() => 0),
      prisma.lawyer.count().catch(() => 0),
      prisma.coach.count().catch(() => 0),
      prisma.maid.count().catch(() => 0),
      prisma.yacht.count().catch(() => 0),
      prisma.foodProduct.count().catch(() => 0),
      prisma.transfer.count().catch(() => 0),
      prisma.activity.count().catch(() => 0),
      prisma.supplier.count().catch(() => 0),
      prisma.property.count().catch(() => 0),
      prisma.rentalMotorbike.count().catch(() => 0),
      prisma.rentalCar.count().catch(() => 0),
      prisma.event.count().catch(() => 0),
      prisma.currency.count().catch(() => 0),
      prisma.country.count().catch(() => 0),
      prisma.exchangeRate.count().catch(() => 0),
      prisma.route.count().catch(() => 0),
      prisma.simulator.count().catch(() => 0),
      prisma.movingService.count().catch(() => 0),
      prisma.parcelService.count().catch(() => 0),
      prisma.homeCleaning.count().catch(() => 0),
      prisma.furnitureCleaning.count().catch(() => 0),
      prisma.laundry.count().catch(() => 0),
      prisma.booking
        .findMany({
          take: 10,
          orderBy: { createdAt: 'desc' },
          include: {
            user: { select: { firstName: true, lastName: true, email: true } },
          },
        })
        .catch((err: Error) => {
          logger.error('Failed to fetch recent bookings', err, { userId: user.id });
          return [];
        }),
      // errorLog table doesn't exist yet, skip for now
      Promise.resolve([]),
      // Bookings by type
      prisma.booking
        .groupBy({
          by: ['type'],
          _count: { type: true },
        })
        .catch((err: Error) => {
          logger.error('Failed to group bookings by type', err, { userId: user.id });
          return [];
        }),
      // Bookings by status
      prisma.booking
        .groupBy({
          by: ['status'],
          _count: { status: true },
        })
        .catch((err: Error) => {
          logger.error('Failed to group bookings by status', err, { userId: user.id });
          return [];
        }),
      // Total revenue
      prisma.booking
        .aggregate({
          _sum: { totalPrice: true },
          where: { status: { in: ['confirmed', 'completed'] } },
        })
        .catch((err: Error) => {
          logger.error('Failed to calculate revenue', err, { userId: user.id });
          return { _sum: { totalPrice: 0 } };
        }),
    ]);

    [
      totalUsers,
      totalBookings,
      totalServices,
      totalDoctors,
      totalLawyers,
      totalCoaches,
      totalMaids,
      totalYachts,
      totalFoodProducts,
      totalTransfers,
      totalActivities,
      totalSuppliers,
      totalProperties,
      totalMotorbikes,
      totalRentalCars,
      totalEvents,
      totalCurrencies,
      totalCountries,
      totalExchangeRates,
      totalRoutes,
      totalSimulators,
      totalMovingServices,
      totalParcelServices,
      totalHomeCleaning,
      totalFurnitureCleaning,
      totalLaundry,
      recentBookings,
      errorLogs,
      bookingsByType,
      bookingsByStatus,
    ] = results;
    totalRevenue = (results[33] as any)?._sum?.totalPrice || 0;

    // Transform groupBy results
    bookingsByType = (bookingsByType as any[]).map((item: any) => ({
      type: item.type,
      count: item._count.type,
    }));
    bookingsByStatus = (bookingsByStatus as any[]).map((item: any) => ({
      status: item.status,
      count: item._count.status,
    }));
  } catch (error) {
    console.error('Error loading dashboard:', error);
  }

  return (
    <DashboardClient
      userName={user.firstName || user.email || 'User'}
      totalUsers={totalUsers}
      totalBookings={totalBookings}
      totalServices={totalServices}
      totalDoctors={totalDoctors}
      totalLawyers={totalLawyers}
      totalCoaches={totalCoaches}
      totalMaids={totalMaids}
      totalYachts={totalYachts}
      totalFoodProducts={totalFoodProducts}
      totalTransfers={totalTransfers}
      totalActivities={totalActivities}
      totalSuppliers={totalSuppliers}
      totalProperties={totalProperties}
      totalMotorbikes={totalMotorbikes}
      totalRentalCars={totalRentalCars}
      totalEvents={totalEvents}
      totalCurrencies={totalCurrencies}
      totalCountries={totalCountries}
      totalExchangeRates={totalExchangeRates}
      totalRoutes={totalRoutes}
      totalSimulators={totalSimulators}
      totalMovingServices={totalMovingServices}
      totalParcelServices={totalParcelServices}
      totalHomeCleaning={totalHomeCleaning}
      totalFurnitureCleaning={totalFurnitureCleaning}
      totalLaundry={totalLaundry}
      totalRevenue={totalRevenue}
      bookingsByType={bookingsByType}
      bookingsByStatus={bookingsByStatus}
      recentBookings={recentBookings}
      errorLogs={errorLogs}
      locale={locale}
    />
  );
}
