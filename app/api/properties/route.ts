import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const propertyType = searchParams.get('propertyType');
    const listingType = searchParams.get('listingType');
    const countryId = searchParams.get('countryId');
    const cityId = searchParams.get('cityId');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const bedrooms = searchParams.get('bedrooms');
    const featured = searchParams.get('featured') === 'true';
    const limit = parseInt(searchParams.get('limit') || '20');

    let whereClause: any = {
      status: 'PUBLISHED',
    };

    if (propertyType) whereClause.propertyType = propertyType;
    if (listingType) whereClause.listingType = listingType;
    if (countryId) whereClause.countryId = countryId;
    if (cityId) whereClause.cityId = cityId;
    if (featured) whereClause.featured = true;
    if (bedrooms) whereClause.bedrooms = { gte: parseInt(bedrooms) };

    // Price filtering (for sale or rent)
    if (minPrice || maxPrice) {
      const priceFilter: any = {};
      if (minPrice) priceFilter.gte = parseFloat(minPrice);
      if (maxPrice) priceFilter.lte = parseFloat(maxPrice);
      
      whereClause.OR = [
        { salePrice: priceFilter },
        { rentPrice: priceFilter },
      ];
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
      },
      orderBy: [
        { featured: 'desc' },
        { publishedAt: 'desc' },
      ],
      take: limit,
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
