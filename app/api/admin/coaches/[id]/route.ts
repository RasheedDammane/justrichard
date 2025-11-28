import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// DELETE - Supprimer un coach
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    await prisma.coach.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting coach:', error);
    return NextResponse.json({ error: 'Failed to delete coach' }, { status: 500 });
  }
}

// PATCH - Mettre à jour le statut d'un coach
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { isActive } = body;

    const updatedCoach = await prisma.coach.update({
      where: { id },
      data: { isActive },
    });

    return NextResponse.json(updatedCoach);
  } catch (error) {
    console.error('Error updating coach:', error);
    return NextResponse.json({ error: 'Failed to update coach' }, { status: 500 });
  }
}

// PUT - Mettre à jour complètement un coach
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const updatedCoach = await prisma.coach.update({
      where: { id },
      data: {
        name: body.name,
        slug: body.slug,
        title: body.title,
        bio: body.bio,
        mainCategory: body.mainCategory,
        specializations: body.specializations,
        tags: body.tags,
        experience: body.experience,
        education: body.education,
        certifications: body.certifications,
        achievements: body.achievements,
        languages: body.languages,
        coachingFormats: body.coachingFormats,
        targetAudience: body.targetAudience,
        clientLevels: body.clientLevels,
        sessionFee: body.sessionFee,
        hourlyRate: body.hourlyRate,
        packagePricing: body.packagePricing,
        currency: body.currency,
        cityId: body.cityId,
        countryId: body.countryId,
        locations: body.locations,
        availableDays: body.availableDays,
        workingHours: body.workingHours,
        bookingTypes: body.bookingTypes,
        email: body.email,
        phone: body.phone,
        website: body.website,
        instagram: body.instagram,
        facebook: body.facebook,
        image: body.image,
        video: body.video,
        programs: body.programs,
        totalClients: body.totalClients,
        successRate: body.successRate,
        rating: body.rating,
        isActive: body.isActive,
        isFeatured: body.isFeatured,
        isVerified: body.isVerified,
        isAvailable: body.isAvailable,
        acceptsOnline: body.acceptsOnline,
        acceptsInPerson: body.acceptsInPerson,
        metaTitle: body.metaTitle,
        metaDescription: body.metaDescription,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedCoach);
  } catch (error) {
    console.error('Error updating coach:', error);
    return NextResponse.json({ error: 'Failed to update coach' }, { status: 500 });
  }
}
