import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Role, PartnerStatus } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { partners } = body;

    if (!partners || !Array.isArray(partners)) {
      return NextResponse.json(
        { error: 'Invalid data format. Expected { partners: [] }' },
        { status: 400 }
      );
    }

    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[],
      created: [] as any[],
    };

    for (const partnerData of partners) {
      try {
        // Check if partner already exists
        const existing = await prisma.partner.findUnique({
          where: { email: partnerData.email },
        });

        if (existing) {
          results.failed++;
          results.errors.push(`Partner with email ${partnerData.email} already exists`);
          continue;
        }

        // Extract services array if present
        const servicesSlugs = partnerData.services || [];
        delete partnerData.services;

        // Create partner
        const partner = await prisma.partner.create({
          data: {
            ...partnerData,
            status: PartnerStatus.PENDING,
            isVerified: false,
          },
        });

        // Link services if provided
        if (servicesSlugs.length > 0) {
          const services = await prisma.service.findMany({
            where: {
              slug: { in: servicesSlugs },
            },
          });

          if (services.length > 0) {
            await prisma.partnerService.createMany({
              data: services.map((service) => ({
                partnerId: partner.id,
                serviceId: service.id,
                isActive: true,
              })),
            });
          }
        }

        results.success++;
        results.created.push({
          id: partner.id,
          name: partner.name,
          email: partner.email,
        });
      } catch (error: any) {
        results.failed++;
        results.errors.push(`Failed to create partner ${partnerData.email}: ${error.message}`);
      }
    }

    return NextResponse.json({
      message: `Import completed: ${results.success} succeeded, ${results.failed} failed`,
      ...results,
    });
  } catch (error) {
    console.error('Partner import error:', error);
    return NextResponse.json(
      { error: 'Failed to import partners' },
      { status: 500 }
    );
  }
}
