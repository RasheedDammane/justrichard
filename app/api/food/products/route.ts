import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Filters
    const categorySlug = searchParams.get('category');
    const brandSlug = searchParams.get('brand');
    const search = searchParams.get('search');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const isOnSale = searchParams.get('isOnSale');
    const isFeatured = searchParams.get('isFeatured');
    const isBestSeller = searchParams.get('isBestSeller');
    const isOrganic = searchParams.get('isOrganic');
    const isVegan = searchParams.get('isVegan');
    const isGlutenFree = searchParams.get('isGlutenFree');
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;
    
    // Sorting
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Build where clause
    const where: any = {
      isActive: true,
      canPurchase: true,
    };

    if (categorySlug) {
      const category = await prisma.foodCategory.findUnique({
        where: { slug: categorySlug },
      });
      if (category) {
        where.categoryId = category.id;
      }
    }

    if (brandSlug) {
      const brand = await prisma.foodBrand.findUnique({
        where: { slug: brandSlug },
      });
      if (brand) {
        where.brandId = brand.id;
      }
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { shortDescription: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (minPrice) {
      where.sellingPrice = { ...where.sellingPrice, gte: parseFloat(minPrice) };
    }

    if (maxPrice) {
      where.sellingPrice = { ...where.sellingPrice, lte: parseFloat(maxPrice) };
    }

    if (isOnSale === 'true') where.isOnSale = true;
    if (isFeatured === 'true') where.isFeatured = true;
    if (isBestSeller === 'true') where.isBestSeller = true;
    if (isOrganic === 'true') where.isOrganic = true;
    if (isVegan === 'true') where.isVegan = true;
    if (isGlutenFree === 'true') where.isGlutenFree = true;

    // Get products
    const [products, total] = await Promise.all([
      prisma.foodProduct.findMany({
        where,
        include: {
          category: true,
          brand: true,
          city: true,
          country: true,
        },
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit,
      }),
      prisma.foodProduct.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching food products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
