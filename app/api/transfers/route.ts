import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const transferType = searchParams.get('transferType');
    const countryId = searchParams.get('countryId');
    const fromCityId = searchParams.get('fromCityId');
    const toCityId = searchParams.get('toCityId');
    const availableOnly = searchParams.get('availableOnly') === 'true';

    let whereClause: any = {};
    if (transferType) whereClause.transferType = transferType;
    if (countryId) whereClause.countryId = countryId;
    if (fromCityId) whereClause.fromCityId = fromCityId;
    if (toCityId) whereClause.toCityId = toCityId;
    if (availableOnly) whereClause.isAvailable = true;

    const transfers = await prisma.transfer.findMany({
      where: whereClause,
      include: {
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ transfers });
  } catch (error) {
    console.error('Error fetching transfers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transfers' },
      { status: 500 }
    );
  }
}
