import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Helper function to safely count
    const safeCount = async (fn: () => Promise<number>) => {
      try {
        return await fn();
      } catch (error) {
        return 0;
      }
    };

    // Helper function to safely fetch data
    const safeFetch = async (fn: () => Promise<any[]>) => {
      try {
        return await fn();
      } catch (error) {
        return [];
      }
    };

    // Get counts for all entities (without filters to get all data)
    const [
      countriesCount,
      citiesCount,
      districtsCount,
      carsCount,
      motorbikesCount,
      yachtsCount,
      propertiesCount,
      activitiesCount,
      maidsCount,
      doctorsCount,
      lawyersCount,
      coachesCount,
      suppliersCount
    ] = await Promise.all([
      safeCount(() => prisma.country.count()),
      safeCount(() => prisma.city.count()),
      safeCount(() => prisma.district.count()),
      safeCount(() => prisma.rentalCar.count()),
      safeCount(() => prisma.rentalMotorbike.count()),
      safeCount(() => prisma.yacht.count()),
      safeCount(() => prisma.property.count()),
      safeCount(() => prisma.activity.count()),
      safeCount(() => prisma.maid.count()),
      safeCount(() => prisma.doctor.count()),
      safeCount(() => prisma.lawyer.count()),
      safeCount(() => prisma.coach.count()),
      safeCount(() => prisma.supplier.count())
    ]);

    // Get sample data for each entity (without filters to get all data)
    const [
      countries,
      cities,
      districts,
      cars,
      motorbikes,
      yachts,
      properties,
      activities,
      maids,
      doctors,
      lawyers,
      coaches,
      suppliers
    ] = await Promise.all([
      safeFetch(() => prisma.country.findMany({ take: 10, orderBy: { name: 'asc' } })),
      safeFetch(() => prisma.city.findMany({ take: 10, include: { Country: true }, orderBy: { name: 'asc' } })),
      safeFetch(() => prisma.district.findMany({ take: 10, include: { City: true }, orderBy: { name: 'asc' } })),
      safeFetch(() => prisma.rentalCar.findMany({ take: 5, orderBy: { createdAt: 'desc' } })),
      safeFetch(() => prisma.rentalMotorbike.findMany({ take: 5, orderBy: { createdAt: 'desc' } })),
      safeFetch(() => prisma.yacht.findMany({ take: 5, orderBy: { createdAt: 'desc' } })),
      safeFetch(() => prisma.property.findMany({ take: 5, orderBy: { createdAt: 'desc' } })),
      safeFetch(() => prisma.activity.findMany({ take: 5, orderBy: { createdAt: 'desc' } })),
      safeFetch(() => prisma.maid.findMany({ take: 5, orderBy: { createdAt: 'desc' } })),
      safeFetch(() => prisma.doctor.findMany({ take: 5, orderBy: { createdAt: 'desc' } })),
      safeFetch(() => prisma.lawyer.findMany({ take: 5, orderBy: { createdAt: 'desc' } })),
      safeFetch(() => prisma.coach.findMany({ take: 5, orderBy: { createdAt: 'desc' } })),
      safeFetch(() => prisma.supplier.findMany({ take: 5, orderBy: { createdAt: 'desc' } }))
    ]);

    return NextResponse.json({
      counts: {
        countries: countriesCount,
        cities: citiesCount,
        districts: districtsCount,
        cars: carsCount,
        motorbikes: motorbikesCount,
        yachts: yachtsCount,
        properties: propertiesCount,
        activities: activitiesCount,
        maids: maidsCount,
        doctors: doctorsCount,
        lawyers: lawyersCount,
        coaches: coachesCount,
        suppliers: suppliersCount
      },
      data: {
        countries,
        cities,
        districts,
        cars,
        motorbikes,
        yachts,
        properties,
        activities,
        maids,
        doctors,
        lawyers,
        coaches,
        suppliers
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
