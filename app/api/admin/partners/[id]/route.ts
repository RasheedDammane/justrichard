import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== Role.ADMIN && session.user.role !== Role.MANAGER)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const partner = await prisma.partner.findUnique({
      where: { id: params.id },
      include: {
        services: {
          include: {
            service: {
              include: {
                translations: {
                  where: { locale: 'fr' },
                  take: 1,
                },
              },
            },
          },
        },
        documents: true,
        chatbots: true,
        _count: {
          select: {
            services: true,
            documents: true,
            chatbots: true,
          },
        },
      },
    });

    if (!partner) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
    }

    return NextResponse.json({ partner });
  } catch (error) {
    console.error('Error fetching partner:', error);
    return NextResponse.json(
      { error: 'Failed to fetch partner' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { selectedServices, ...partnerData } = body;

    // Check if partner exists
    const existing = await prisma.partner.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
    }

    // Update partner
    const partner = await prisma.partner.update({
      where: { id: params.id },
      data: partnerData,
    });

    // Update services if provided
    if (selectedServices !== undefined) {
      // Delete existing service links
      await prisma.partnerService.deleteMany({
        where: { partnerId: params.id },
      });

      // Create new service links
      if (selectedServices.length > 0) {
        await prisma.partnerService.createMany({
          data: selectedServices.map((serviceId: string) => ({
            partnerId: params.id,
            serviceId,
            isActive: true,
          })),
        });
      }
    }

    return NextResponse.json({ partner });
  } catch (error) {
    console.error('Error updating partner:', error);
    return NextResponse.json(
      { error: 'Failed to update partner' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if partner exists
    const existing = await prisma.partner.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
    }

    // Delete partner (cascade will handle related records)
    await prisma.partner.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Partner deleted successfully' });
  } catch (error) {
    console.error('Error deleting partner:', error);
    return NextResponse.json(
      { error: 'Failed to delete partner' },
      { status: 500 }
    );
  }
}
