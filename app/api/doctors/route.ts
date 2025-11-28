import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const specialty = searchParams.get('specialty');
    const search = searchParams.get('search');
    const acceptsInsurance = searchParams.get('acceptsInsurance') === 'true';
    const acceptsVideoConsult = searchParams.get('acceptsVideoConsult') === 'true';

    const where: any = {
      isActive: true,
    };

    if (specialty && specialty !== 'all') {
      where.specialty = specialty;
    }

    if (acceptsInsurance) {
      where.acceptsInsurance = true;
    }

    if (acceptsVideoConsult) {
      where.acceptsVideoConsult = true;
    }

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { specialty: { contains: search, mode: 'insensitive' } },
        { clinicName: { contains: search, mode: 'insensitive' } },
      ];
    }

    const doctors = await prisma.doctor.findMany({
      where,
      include: {
        City: {
          select: {
            name: true,
          },
        },
        Country: {
          select: {
            name: true,
            code: true,
          },
        },
      },
      orderBy: [
        { isPremium: 'desc' },
        { isVerified: 'desc' },
        { rating: 'desc' },
      ],
    });

    // Parse JSON fields
    const doctorsWithParsedData = doctors.map((doctor: any) => ({
      ...doctor,
      subSpecialties: typeof doctor.subSpecialties === 'string' ? JSON.parse(doctor.subSpecialties) : doctor.subSpecialties,
      education: typeof doctor.education === 'string' ? JSON.parse(doctor.education) : doctor.education,
      certifications: typeof doctor.certifications === 'string' ? JSON.parse(doctor.certifications) : doctor.certifications,
      languages: typeof doctor.languages === 'string' ? JSON.parse(doctor.languages) : doctor.languages,
      workingDays: typeof doctor.workingDays === 'string' ? JSON.parse(doctor.workingDays) : doctor.workingDays,
      workingHours: typeof doctor.workingHours === 'string' ? JSON.parse(doctor.workingHours) : doctor.workingHours,
      services: typeof doctor.services === 'string' ? JSON.parse(doctor.services) : doctor.services,
      treatmentAreas: typeof doctor.treatmentAreas === 'string' ? JSON.parse(doctor.treatmentAreas) : doctor.treatmentAreas,
      insuranceProviders: doctor.insuranceProviders ? (typeof doctor.insuranceProviders === 'string' ? JSON.parse(doctor.insuranceProviders) : doctor.insuranceProviders) : [],
    }));

    return NextResponse.json(doctorsWithParsedData);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 });
  }
}
