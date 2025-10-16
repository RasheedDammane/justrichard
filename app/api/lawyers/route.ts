import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const specialty = searchParams.get('specialty');
    const countryId = searchParams.get('countryId');
    const cityId = searchParams.get('cityId');
    const acceptsEmergency = searchParams.get('acceptsEmergency') === 'true';
    const courtAppearance = searchParams.get('courtAppearance') === 'true';
    const contractDrafting = searchParams.get('contractDrafting') === 'true';
    const verifiedOnly = searchParams.get('verifiedOnly') === 'true';
    const availableOnly = searchParams.get('availableOnly') === 'true';

    let whereClause: any = {};
    if (specialty) whereClause.specialty = specialty;
    if (countryId) whereClause.countryId = countryId;
    if (cityId) whereClause.cityId = cityId;
    if (acceptsEmergency) whereClause.acceptsEmergency = true;
    if (courtAppearance) whereClause.courtAppearance = true;
    if (contractDrafting) whereClause.contractDrafting = true;
    if (verifiedOnly) whereClause.verified = true;
    if (availableOnly) whereClause.isAvailable = true;

    const lawyers = await prisma.lawyer.findMany({
      where: whereClause,
      include: {
        city: true,
        _count: {
          select: {
            consultations: true,
          },
        },
      },
      orderBy: [
        { verified: 'desc' },
        { rating: 'desc' },
        { totalCases: 'desc' },
      ],
    });

    return NextResponse.json({ lawyers });
  } catch (error) {
    console.error('Error fetching lawyers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lawyers' },
      { status: 500 }
    );
  }
}
