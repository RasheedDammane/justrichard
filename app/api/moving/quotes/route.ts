import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/moving/quotes - Liste des devis
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const userId = searchParams.get('userId');

    const where: any = {};
    
    if (status) {
      where.status = status;
    }
    
    if (userId) {
      where.userId = userId;
    }

    const quotes = await prisma.movingQuote.findMany({
      where,
      include: {
        service: true,
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(quotes);
  } catch (error) {
    console.error('Error fetching moving quotes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch moving quotes' },
      { status: 500 }
    );
  }
}

// POST /api/moving/quotes - Créer une demande de devis (CTA)
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const session = await getServerSession(authOptions);

    const quoteNumber = `MQ${Date.now()}${Math.floor(Math.random() * 1000)}`;

    const quote = await prisma.movingQuote.create({
      data: {
        id: `quote_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        quoteNumber,
        serviceId: data.serviceId,
        userId: session?.user?.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        fromAddress: data.fromAddress,
        fromCity: data.fromCity,
        fromCountry: data.fromCountry,
        fromFloor: data.fromFloor ? parseInt(data.fromFloor) : null,
        fromElevator: data.fromElevator || false,
        toAddress: data.toAddress,
        toCity: data.toCity,
        toCountry: data.toCountry,
        toFloor: data.toFloor ? parseInt(data.toFloor) : null,
        toElevator: data.toElevator || false,
        distance: data.distance ? parseFloat(data.distance) : null,
        preferredDate: data.preferredDate ? new Date(data.preferredDate) : null,
        preferredTime: data.preferredTime,
        estimatedVolume: data.estimatedVolume ? parseFloat(data.estimatedVolume) : null,
        numberOfRooms: data.numberOfRooms ? parseInt(data.numberOfRooms) : null,
        itemsList: data.itemsList || [],
        needPacking: data.needPacking || false,
        needUnpacking: data.needUnpacking || false,
        needAssembly: data.needAssembly || false,
        needStorage: data.needStorage || false,
        storageDuration: data.storageDuration ? parseInt(data.storageDuration) : null,
        vehicleType: data.vehicleType,
        estimatedPrice: data.estimatedPrice ? parseFloat(data.estimatedPrice) : null,
        currency: data.currency || 'AED',
        status: 'pending',
        specialInstructions: data.specialInstructions,
        updatedAt: new Date(),
      },
    });

    // TODO: Envoyer email de confirmation au client
    // TODO: Notifier l'admin

    return NextResponse.json(quote, { status: 201 });
  } catch (error) {
    console.error('Error creating moving quote:', error);
    return NextResponse.json(
      { error: 'Failed to create moving quote' },
      { status: 500 }
    );
  }
}
