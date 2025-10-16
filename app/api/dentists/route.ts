import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const specialty = searchParams.get('specialty');
    const countryId = searchParams.get('countryId');
    const cityId = searchParams.get('cityId');
    const acceptsEmergency = searchParams.get('acceptsEmergency') === 'true';
    const acceptsInsurance = searchParams.get('acceptsInsurance') === 'true';
    const hasXRay = searchParams.get('hasXRay') === 'true';
    const has3DScanner = searchParams.get('has3DScanner') === 'true';
    const verifiedOnly = searchParams.get('verifiedOnly') === 'true';
    const availableOnly = searchParams.get('availableOnly') === 'true';

    let whereClause: any = {};
    if (specialty) whereClause.specialty = specialty;
    if (countryId) whereClause.countryId = countryId;
    if (cityId) whereClause.cityId = cityId;
    if (acceptsEmergency) whereClause.acceptsEmergency = true;
    if (acceptsInsurance) whereClause.acceptsInsurance = true;
    if (hasXRay) whereClause.hasXRay = true;
    if (has3DScanner) whereClause.has3DScanner = true;
    if (verifiedOnly) whereClause.verified = true;
    if (availableOnly) whereClause.isAvailable = true;

    const dentists = await prisma.dentist.findMany({
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

    return NextResponse.json({ dentists });
  } catch (error) {
    console.error('Error fetching dentists:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dentists' },
      { status: 500 }
    );
  }
}
