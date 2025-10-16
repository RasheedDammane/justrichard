import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const specialty = searchParams.get('specialty');
    const countryId = searchParams.get('countryId');
    const cityId = searchParams.get('cityId');
    const acceptsEmergency = searchParams.get('acceptsEmergency') === 'true';
    const acceptsTelemedicine = searchParams.get('acceptsTelemedicine') === 'true';
    const acceptsHomeVisit = searchParams.get('acceptsHomeVisit') === 'true';
    const acceptsInsurance = searchParams.get('acceptsInsurance') === 'true';
    const verifiedOnly = searchParams.get('verifiedOnly') === 'true';
    const availableOnly = searchParams.get('availableOnly') === 'true';

    let whereClause: any = {};
    if (specialty) whereClause.specialty = specialty;
    if (countryId) whereClause.countryId = countryId;
    if (cityId) whereClause.cityId = cityId;
    if (acceptsEmergency) whereClause.acceptsEmergency = true;
    if (acceptsTelemedicine) whereClause.acceptsTelemedicine = true;
    if (acceptsHomeVisit) whereClause.acceptsHomeVisit = true;
    if (acceptsInsurance) whereClause.acceptsInsurance = true;
    if (verifiedOnly) whereClause.verified = true;
    if (availableOnly) whereClause.isAvailable = true;

    const doctors = await prisma.doctor.findMany({
      where: whereClause,
      include: {
        city: true,
        _count: {
          select: {
            appointments: true,
          },
        },
      },
      orderBy: [
        { verified: 'desc' },
        { rating: 'desc' },
        { totalAppointments: 'desc' },
      ],
    });

    return NextResponse.json({ doctors });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch doctors' },
      { status: 500 }
    );
  }
}
