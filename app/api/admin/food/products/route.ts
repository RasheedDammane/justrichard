import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET - Liste des produits pour l'admin
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search');
    const categoryId = searchParams.get('categoryId');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } },
        { barcode: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (status === 'active') {
      where.isActive = true;
    } else if (status === 'inactive') {
      where.isActive = false;
    }

    // Get products with stats
    const [products, total, activeCount, lowStockCount] = await Promise.all([
      prisma.foodProduct.findMany({
        where,
        include: {
          category: true,
          brand: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.foodProduct.count({ where }),
      prisma.foodProduct.count({ where: { isActive: true } }),
      prisma.foodProduct.count({
        where: {
          stock: { lte: prisma.foodProduct.fields.lowStockThreshold },
        },
      }),
    ]);

    // Calculate total inventory value
    const allProducts = await prisma.foodProduct.findMany({
      select: { sellingPrice: true, stock: true },
    });
    const totalValue = allProducts.reduce(
      (sum, p) => sum + p.sellingPrice * p.stock,
      0
    );

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      stats: {
        total,
        active: activeCount,
        lowStock: lowStockCount,
        totalValue: totalValue.toFixed(2),
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST - Créer un nouveau produit
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await request.json();
    
    // Generate slug from name
    const slug = data.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    // Check if slug already exists
    const existingProduct = await prisma.foodProduct.findUnique({
      where: { slug },
    });
    
    if (existingProduct) {
      return NextResponse.json(
        { success: false, error: 'A product with this name already exists' },
        { status: 400 }
      );
    }

    // Create product
    const product = await prisma.foodProduct.create({
      data: {
        ...data,
        slug,
        tags: data.tags || [],
        images: data.images || [],
      },
      include: {
        category: true,
        brand: true,
      },
    });

    // Create initial inventory log
    if (data.stock > 0) {
      await prisma.foodInventoryLog.create({
        data: {
          productId: product.id,
          type: 'adjustment',
          quantity: data.stock,
          stockBefore: 0,
          stockAfter: data.stock,
          notes: 'Initial stock',
          createdBy: session.user.id,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: product,
      message: 'Product created successfully',
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
