import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/parcel/quotes
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

    const quotes = await prisma.parcelQuote.findMany({
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
    console.error('Error fetching parcel quotes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch parcel quotes' },
      { status: 500 }
    );
  }
}

// POST /api/parcel/quotes - Créer une demande de devis (CTA)
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const session = await getServerSession(authOptions);

    const quoteNumber = `PQ${Date.now()}${Math.floor(Math.random() * 1000)}`;

    // Calculer le volume
    const volume = (data.length || 0) * (data.width || 0) * (data.height || 0);

    const quote = await prisma.parcelQuote.create({
      data: {
        id: `pquote_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        quoteNumber,
        serviceId: data.serviceId,
        userId: session?.user?.id,
        senderName: data.senderName,
        senderEmail: data.senderEmail,
        senderPhone: data.senderPhone,
        senderAddress: data.senderAddress,
        senderCity: data.senderCity,
        senderCountry: data.senderCountry,
        recipientName: data.recipientName,
        recipientPhone: data.recipientPhone,
        recipientAddress: data.recipientAddress,
        recipientCity: data.recipientCity,
        recipientCountry: data.recipientCountry,
        weight: parseFloat(data.weight),
        length: parseFloat(data.length),
        width: parseFloat(data.width),
        height: parseFloat(data.height),
        volume,
        parcelType: data.parcelType,
        contents: data.contents,
        declaredValue: data.declaredValue ? parseFloat(data.declaredValue) : null,
        deliveryType: data.deliveryType,
        estimatedPrice: data.estimatedPrice ? parseFloat(data.estimatedPrice) : null,
        currency: data.currency || 'AED',
        status: 'pending',
        specialInstructions: data.specialInstructions,
        updatedAt: new Date(),
      },
    });

    // TODO: Envoyer email de confirmation
    // TODO: Notifier l'admin

    return NextResponse.json(quote, { status: 201 });
  } catch (error) {
    console.error('Error creating parcel quote:', error);
    return NextResponse.json(
      { error: 'Failed to create parcel quote' },
      { status: 500 }
    );
  }
}
