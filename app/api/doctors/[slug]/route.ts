import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;

    const doctor = await prisma.doctor.findUnique({
      where: { slug },
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
    });

    if (!doctor) {
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
    }

    // Parse JSON fields
    const doctorWithParsedData = {
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
      breakTime: doctor.breakTime ? (typeof doctor.breakTime === 'string' ? JSON.parse(doctor.breakTime) : doctor.breakTime) : null,
    };

    return NextResponse.json(doctorWithParsedData);
  } catch (error) {
    console.error('Error fetching doctor:', error);
    return NextResponse.json({ error: 'Failed to fetch doctor' }, { status: 500 });
  }
}
