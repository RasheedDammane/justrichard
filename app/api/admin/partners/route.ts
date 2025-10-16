import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Role, PartnerStatus } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== Role.ADMIN && session.user.role !== Role.MANAGER)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const partners = await prisma.partner.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        type: true,
      },
      orderBy: { name: 'asc' },
    });

    return NextResponse.json({ partners });
  } catch (error) {
    console.error('Error fetching partners:', error);
    return NextResponse.json(
      { error: 'Failed to fetch partners' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { selectedServices, ...partnerData } = body;

    // Check if partner with email already exists
    const existing = await prisma.partner.findUnique({
      where: { email: partnerData.email },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Un partenaire avec cet email existe déjà' },
        { status: 400 }
      );
    }

    // Create partner
    const partner = await prisma.partner.create({
      data: {
        ...partnerData,
        status: PartnerStatus.PENDING,
        isVerified: false,
      },
    });

    // Link services if provided
    if (selectedServices && selectedServices.length > 0) {
      await prisma.partnerService.createMany({
        data: selectedServices.map((serviceId: string) => ({
          partnerId: partner.id,
          serviceId,
          isActive: true,
        })),
      });
    }

    return NextResponse.json({ partner }, { status: 201 });
  } catch (error) {
    console.error('Error creating partner:', error);
    return NextResponse.json(
      { error: 'Failed to create partner' },
      { status: 500 }
    );
  }
}
