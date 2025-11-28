import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;

    const supplier = await prisma.supplier.findUnique({
      where: { slug },
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
    });

    if (!supplier) {
      return NextResponse.json({ error: 'Supplier not found' }, { status: 404 });
    }

    // Increment view count
    await prisma.supplier.update({
      where: { id: supplier.id },
      data: { views: { increment: 1 } },
    });

    // Parse JSON fields
    const supplierWithParsedData = {
      ...supplier,
      categories: JSON.parse(supplier.categories as string),
      products: JSON.parse(supplier.products as string),
      tags: JSON.parse(supplier.tags as string),
      certifications: supplier.certifications ? JSON.parse(supplier.certifications as string) : [],
      capabilities: supplier.capabilities ? JSON.parse(supplier.capabilities as string) : [],
      paymentTerms: supplier.paymentTerms ? JSON.parse(supplier.paymentTerms as string) : [],
      images: supplier.images ? JSON.parse(supplier.images as string) : [],
      tradeShows: supplier.tradeShows ? JSON.parse(supplier.tradeShows as string) : [],
    };

    return NextResponse.json(supplierWithParsedData);
  } catch (error) {
    console.error('Error fetching supplier:', error);
    return NextResponse.json({ error: 'Failed to fetch supplier' }, { status: 500 });
  }
}
