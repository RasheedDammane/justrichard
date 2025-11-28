import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const property = await prisma.property.findUnique({
      where: { id: params.id },
      include: {
        media: true,
      },
    });

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    // Validate property is ready for publication
    const validationErrors = [];

    if (!property.title || property.title.length < 5) {
      validationErrors.push('Title is required (min 5 characters)');
    }
    if (!property.cityId) {
      validationErrors.push('City is required');
    }
    if (!property.price) {
      validationErrors.push('Price is required');
    }
    if (property.media.length === 0) {
      validationErrors.push('At least one image is required');
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
      include: {
        city: true,
        country: true,
        priceCurrency: true,
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
