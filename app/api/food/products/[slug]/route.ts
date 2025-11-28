import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const product = await prisma.foodProduct.findUnique({
      where: { slug },
      include: {
        category: true,
        brand: true,
        city: true,
        country: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    // Increment views
    await prisma.foodProduct.update({
      where: { slug },
      data: { views: { increment: 1 } },
    });

    // Get related products (same category)
    const relatedProducts = await prisma.foodProduct.findMany({
      where: {
        categoryId: product.categoryId,
        id: { not: product.id },
        isActive: true,
        canPurchase: true,
      },
      include: {
        category: true,
        brand: true,
      },
      take: 4,
      orderBy: { sales: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: {
        product,
        relatedProducts,
      },
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
