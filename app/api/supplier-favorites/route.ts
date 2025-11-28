import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

// Get user's favorites
export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const sessionId = cookieStore.get('sessionId')?.value;

    if (!sessionId) {
      return NextResponse.json([]);
    }

    const favorites = await prisma.supplierFavorite.findMany({
      where: { sessionId },
      include: {
        Supplier: {
          include: {
            City: { select: { name: true } },
            Country: { select: { name: true, code: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Parse JSON fields
    const favoritesWithParsedData = favorites.map((fav: any) => ({
      ...fav,
      Supplier: {
        ...fav.Supplier,
        categories: typeof fav.Supplier.categories === 'string' ? JSON.parse(fav.Supplier.categories) : fav.Supplier.categories,
        products: typeof fav.Supplier.products === 'string' ? JSON.parse(fav.Supplier.products) : fav.Supplier.products,
        tags: typeof fav.Supplier.tags === 'string' ? JSON.parse(fav.Supplier.tags) : fav.Supplier.tags,
      },
    }));

    return NextResponse.json(favoritesWithParsedData);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return NextResponse.json({ error: 'Failed to fetch favorites' }, { status: 500 });
  }
}

// Add to favorites
export async function POST(request: Request) {
  try {
    const { supplierId } = await request.json();

    if (!supplierId) {
      return NextResponse.json({ error: 'Supplier ID is required' }, { status: 400 });
    }

    // Get or create session ID
    const cookieStore = cookies();
    let sessionId = cookieStore.get('sessionId')?.value;

    if (!sessionId) {
      sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      // Set cookie for 30 days
      const response = NextResponse.json({ success: true });
      response.cookies.set('sessionId', sessionId, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        httpOnly: true,
        sameSite: 'lax',
      });
    }

    // Check if already favorited
    const existing = await prisma.supplierFavorite.findFirst({
      where: { supplierId, sessionId },
    });

    if (existing) {
      return NextResponse.json({ message: 'Already in favorites' }, { status: 200 });
    }

    // Add to favorites
    const favorite = await prisma.supplierFavorite.create({
      data: {
        id: `favorite-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        supplierId,
        sessionId,
      },
    });

    const response = NextResponse.json({ success: true, favorite });
    
    // Set session cookie if it was just created
    if (!cookieStore.get('sessionId')?.value) {
      response.cookies.set('sessionId', sessionId, {
        maxAge: 30 * 24 * 60 * 60,
        httpOnly: true,
        sameSite: 'lax',
      });
    }

    return response;
  } catch (error) {
    console.error('Error adding favorite:', error);
    return NextResponse.json({ error: 'Failed to add favorite' }, { status: 500 });
  }
}

// Remove from favorites
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const supplierId = searchParams.get('supplierId');

    if (!supplierId) {
      return NextResponse.json({ error: 'Supplier ID is required' }, { status: 400 });
    }

    const cookieStore = cookies();
    const sessionId = cookieStore.get('sessionId')?.value;

    if (!sessionId) {
      return NextResponse.json({ error: 'No session found' }, { status: 400 });
    }

    await prisma.supplierFavorite.deleteMany({
      where: { supplierId, sessionId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing favorite:', error);
    return NextResponse.json({ error: 'Failed to remove favorite' }, { status: 500 });
  }
}
