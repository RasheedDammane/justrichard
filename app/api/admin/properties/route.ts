import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    
    // Filters
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const cityId = searchParams.get('cityId');
    const countryId = searchParams.get('countryId');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');
    const skip = (page - 1) * pageSize;

    // Build where clause
    const where: any = {};
    
    if (status) where.status = status;
    if (type) where.type = type;
    if (cityId) where.cityId = cityId;
    if (countryId) where.countryId = countryId;
    if (featured === 'true') where.isFeatured = true;
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { propertyCode: { contains: search, mode: 'insensitive' } },
        { addressLine1: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    // Fetch properties with relations
    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        include: {
          city: true,
          country: true,
          state: true,
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
          _count: {
            select: {
              media: true,
              features: true,
              floorPlans: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: pageSize,
      }),
      prisma.property.count({ where }),
    ]);

    // Stats
    const stats = await prisma.property.groupBy({
      by: ['status'],
      _count: true,
    });

    return NextResponse.json({
      properties,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
      stats: stats.reduce((acc, s) => ({ ...acc, [s.status]: s._count }), {}),
    });
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
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Generate slug from title if not provided
    const slugGenerated = body.slug || 
      (body.title ? body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : `property-${Date.now()}`);

    // Create property with new schema
    const property = await prisma.property.create({
      data: {
        slug: slugGenerated,
        title: body.title || 'Untitled Property',
        subtitle: body.subtitle,
        description: body.description,
        status: body.status || 'DRAFT',
        type: body.type || 'RENT',
        isFeatured: body.isFeatured || false,
        visibility: body.visibility || 'PUBLIC',
        
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
        areaUnit: body.areaUnit || 'sqft',
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
        ownerId: body.ownerId || session.user.id,
        contactPhone: body.contactPhone,
        contactEmail: body.contactEmail,
        contactWhatsapp: body.contactWhatsapp,
        showOwnerOnFront: body.showOwnerOnFront !== false,
        
        // Hierarchy
        parentPropertyId: body.parentPropertyId,
      },
      include: {
        city: true,
        country: true,
        priceCurrency: true,
      },
    });

    return NextResponse.json({ property }, { status: 201 });
  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    );
  }
}
