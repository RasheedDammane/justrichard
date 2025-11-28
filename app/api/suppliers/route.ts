import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const certification = searchParams.get('certification');
    const search = searchParams.get('search');

    const where: any = {
      isActive: true,
    };

    if (category && category !== 'all') {
      where.mainCategory = category;
    }

    if (certification === 'halal') {
      where.isHalalCertified = true;
    } else if (certification === 'organic') {
      where.isOrganicCertified = true;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { mainProducts: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const suppliers = await prisma.supplier.findMany({
      where,
      include: {
        City: {
          select: {
            name: true,
          },
        },
        Country: {
          select: {
            name: true,
            code: true,
          },
        },
      },
      orderBy: [
        { isGoldSupplier: 'desc' },
        { isFeatured: 'desc' },
        { rating: 'desc' },
      ],
    });

    // Parse JSON fields
    const suppliersWithParsedData = suppliers.map((supplier: any) => {
      try {
        return {
          ...supplier,
          categories: typeof supplier.categories === 'string' ? JSON.parse(supplier.categories) : supplier.categories,
          products: typeof supplier.products === 'string' ? JSON.parse(supplier.products) : supplier.products,
          tags: typeof supplier.tags === 'string' ? JSON.parse(supplier.tags) : supplier.tags,
          certifications: supplier.certifications ? (typeof supplier.certifications === 'string' ? JSON.parse(supplier.certifications) : supplier.certifications) : [],
          capabilities: supplier.capabilities ? (typeof supplier.capabilities === 'string' ? JSON.parse(supplier.capabilities) : supplier.capabilities) : [],
          paymentTerms: supplier.paymentTerms ? (typeof supplier.paymentTerms === 'string' ? JSON.parse(supplier.paymentTerms) : supplier.paymentTerms) : [],
          images: supplier.images ? (typeof supplier.images === 'string' ? JSON.parse(supplier.images) : supplier.images) : [],
          tradeShows: supplier.tradeShows ? (typeof supplier.tradeShows === 'string' ? JSON.parse(supplier.tradeShows) : supplier.tradeShows) : [],
        };
      } catch (parseError) {
        console.error('Error parsing supplier data:', parseError, supplier);
        return supplier;
      }
    });

    return NextResponse.json(suppliersWithParsedData);
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    return NextResponse.json({ error: 'Failed to fetch suppliers', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
