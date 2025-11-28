import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
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
        country: true,
        state: true,
        city: true,
        area: true,
        priceCurrency: true,
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        parent: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
        children: {
          select: {
            id: true,
            title: true,
            slug: true,
            status: true,
            bedrooms: true,
            bathrooms: true,
            price: true,
            priceCurrency: true,
          },
        },
        media: {
          include: {
            media: true,
          },
          orderBy: { order: 'asc' },
        },
        documents: {
          include: {
            media: true,
          },
        },
        features: {
          include: {
            feature: true,
          },
        },
        floorPlans: {
          include: {
            image: true,
            priceCurrency: true,
          },
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json({ property });
  } catch (error) {
    console.error('Error fetching property:', error);
    return NextResponse.json({ error: 'Failed to fetch property' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Update property
    const property = await prisma.property.update({
      where: { id: params.id },
      data: {
        title: body.title,
        subtitle: body.subtitle,
        description: body.description,
        status: body.status,
        type: body.type,
        isFeatured: body.isFeatured,
        visibility: body.visibility,
        
        // Location
        addressLine1: body.addressLine1,
        addressLine2: body.addressLine2,
        zipCode: body.zipCode,
        countryId: body.countryId,
        stateId: body.stateId,
        cityId: body.cityId,
        areaId: body.areaId,
        latitude: body.latitude ? parseFloat(body.latitude) : null,
        longitude: body.longitude ? parseFloat(body.longitude) : null,
        mapZoom: body.mapZoom ? parseInt(body.mapZoom) : null,
        
        // Physical Details
        bedrooms: body.bedrooms ? parseInt(body.bedrooms) : null,
        bathrooms: body.bathrooms ? parseInt(body.bathrooms) : null,
        parkingSpaces: body.parkingSpaces ? parseInt(body.parkingSpaces) : null,
        garages: body.garages ? parseInt(body.garages) : null,
        garageSize: body.garageSize ? parseFloat(body.garageSize) : null,
        garageSizeUnit: body.garageSizeUnit,
        areaSize: body.areaSize ? parseFloat(body.areaSize) : null,
        areaUnit: body.areaUnit,
        landArea: body.landArea ? parseFloat(body.landArea) : null,
        landAreaUnit: body.landAreaUnit,
        yearBuilt: body.yearBuilt ? parseInt(body.yearBuilt) : null,
        propertyCode: body.propertyCode,
        
        // Pricing
        price: body.price ? parseFloat(body.price) : null,
        priceCurrencyId: body.priceCurrencyId,
        pricePostfix: body.pricePostfix,
        oldPrice: body.oldPrice ? parseFloat(body.oldPrice) : null,
        secondaryPriceLabel: body.secondaryPriceLabel,
        rentalDetails: body.rentalDetails,
        
        // Taxonomy
        propertyTypeId: body.propertyTypeId,
        categoryIds: body.categoryIds,
        labelIds: body.labelIds,
        tagIds: body.tagIds,
        
        // Meta
        expirationDate: body.expirationDate ? new Date(body.expirationDate) : null,
        energyClass: body.energyClass,
        layout: body.layout,
        privateNote: body.privateNote,
        disclaimer: body.disclaimer,
        
        // SEO
        seoTitle: body.seoTitle,
        seoDescription: body.seoDescription,
        seoMeta: body.seoMeta,
        
        // Media
        coverImageId: body.coverImageId,
        videoUrl: body.videoUrl,
        virtualTourUrl: body.virtualTourUrl,
        
        // Contact
        ownerId: body.ownerId,
        contactPhone: body.contactPhone,
        contactEmail: body.contactEmail,
        contactWhatsapp: body.contactWhatsapp,
        showOwnerOnFront: body.showOwnerOnFront,
        
        // Hierarchy
        parentPropertyId: body.parentPropertyId,
      },
      include: {
        city: true,
        country: true,
        priceCurrency: true,
      },
    });

    return NextResponse.json({ property });
  } catch (error) {
    console.error('Error updating property:', error);
    return NextResponse.json({ error: 'Failed to update property' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if property has children
    const property = await prisma.property.findUnique({
      where: { id: params.id },
      include: {
        children: true,
      },
    });

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    if (property.children.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete property with sub-listings. Delete sub-listings first.' },
        { status: 400 }
      );
    }

    // Delete property (cascade will handle media, documents, features, floor plans)
    await prisma.property.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 });
  }
}
