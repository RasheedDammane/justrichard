import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== Role.ADMIN && session.user.role !== Role.MANAGER)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let whereClause: any = {};
    if (status) {
      whereClause.status = status;
    }

    const properties = await prisma.property.findMany({
      where: whereClause,
      include: {
        city: true,
        amenities: {
          include: {
            amenity: true,
          },
        },
        _count: {
          select: {
            reviews: true,
            inquiries: true,
            viewingRequests: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ properties });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== Role.ADMIN && session.user.role !== Role.MANAGER)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      description,
      propertyType,
      listingType,
      countryId,
      regionId,
      cityId,
      address,
      latitude,
      longitude,
      salePrice,
      rentPrice,
      area,
      bedrooms,
      bathrooms,
      floors,
      parkingSpaces,
      yearBuilt,
      monthlyCharges,
      transferFees,
      agencyCommission,
      isFurnished,
      hasGarden,
      hasPool,
      hasElevator,
      hasBalcony,
      hasSecurity,
      images,
      videos,
      virtualTour,
      amenityIds,
      currency,
    } = body;

    // Validate required fields
    if (!title || !description || !propertyType || !listingType || !countryId || !address || !area || bedrooms === undefined || bathrooms === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate pricing based on listing type
    if (listingType === 'FOR_SALE' && !salePrice) {
      return NextResponse.json(
        { error: 'Sale price is required for properties for sale' },
        { status: 400 }
      );
    }
    if (listingType === 'FOR_RENT' && !rentPrice) {
      return NextResponse.json(
        { error: 'Rent price is required for properties for rent' },
        { status: 400 }
      );
    }
    if (listingType === 'BOTH' && (!salePrice || !rentPrice)) {
      return NextResponse.json(
        { error: 'Both sale and rent prices are required' },
        { status: 400 }
      );
    }

    // Calculate price per sqm
    const pricePerSqm = salePrice ? salePrice / area : rentPrice ? rentPrice / area : null;

    // Create property
    const property = await prisma.property.create({
      data: {
        title,
        description,
        propertyType,
        listingType,
        countryId,
        regionId: regionId || null,
        cityId: cityId || null,
        address,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        salePrice: salePrice ? parseFloat(salePrice) : null,
        rentPrice: rentPrice ? parseFloat(rentPrice) : null,
        pricePerSqm,
        currency: currency || 'MAD',
        area: parseFloat(area),
        bedrooms: parseInt(bedrooms),
        bathrooms: parseInt(bathrooms),
        floors: floors ? parseInt(floors) : null,
        parkingSpaces: parkingSpaces ? parseInt(parkingSpaces) : 0,
        yearBuilt: yearBuilt ? parseInt(yearBuilt) : null,
        monthlyCharges: monthlyCharges ? parseFloat(monthlyCharges) : null,
        transferFees: transferFees ? parseFloat(transferFees) : null,
        agencyCommission: agencyCommission ? parseFloat(agencyCommission) : null,
        isFurnished: isFurnished || false,
        hasGarden: hasGarden || false,
        hasPool: hasPool || false,
        hasElevator: hasElevator || false,
        hasBalcony: hasBalcony || false,
        hasSecurity: hasSecurity || false,
        images: images || [],
        videos: videos || [],
        virtualTour: virtualTour || null,
        ownerId: session.user.id,
        status: 'DRAFT',
      },
    });

    // Add amenities if provided
    if (amenityIds && amenityIds.length > 0) {
      await prisma.propertyAmenity.createMany({
        data: amenityIds.map((amenityId: string) => ({
          propertyId: property.id,
          amenityId,
        })),
      });
    }

    return NextResponse.json({ property }, { status: 201 });
  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    );
  }
}
