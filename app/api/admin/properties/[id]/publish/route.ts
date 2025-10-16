import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== Role.ADMIN && session.user.role !== Role.MANAGER)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const property = await prisma.property.findUnique({
      where: { id: params.id },
    });

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    // Validate property is ready for publication
    const validationErrors = [];

    if (!property.title || property.title.length < 10) {
      validationErrors.push('Title must be at least 10 characters');
    }
    if (!property.description || property.description.length < 50) {
      validationErrors.push('Description must be at least 50 characters');
    }
    if (property.images.length === 0) {
      validationErrors.push('At least one image is required');
    }
    if (property.listingType === 'FOR_SALE' && !property.salePrice) {
      validationErrors.push('Sale price is required');
    }
    if (property.listingType === 'FOR_RENT' && !property.rentPrice) {
      validationErrors.push('Rent price is required');
    }
    if (property.listingType === 'BOTH' && (!property.salePrice || !property.rentPrice)) {
      validationErrors.push('Both sale and rent prices are required');
    }

    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: 'Validation failed', errors: validationErrors },
        { status: 400 }
      );
    }

    // Update property status to published
    const updatedProperty = await prisma.property.update({
      where: { id: params.id },
      data: {
        status: 'PUBLISHED',
        publishedAt: new Date(),
      },
    });

    return NextResponse.json({
      property: updatedProperty,
      message: 'Property published successfully',
    });
  } catch (error) {
    console.error('Error publishing property:', error);
    return NextResponse.json(
      { error: 'Failed to publish property' },
      { status: 500 }
    );
  }
}
