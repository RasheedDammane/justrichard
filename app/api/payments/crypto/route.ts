import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { bookingId, cryptocurrency, amount, walletAddress, network } = body;

    if (!cryptocurrency || !amount || !walletAddress) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get crypto price (in production, use real API like CoinGecko)
    const cryptoPrices: Record<string, number> = {
      BTC: 43000,
      ETH: 2300,
      USDT: 1,
      BNB: 310,
    };

    const amountCrypto = amount / (cryptoPrices[cryptocurrency] || 1);

    // Create crypto payment record
    const cryptoPayment = await prisma.cryptoPayment.create({
      data: {
        bookingId: bookingId || null,
        userId: session.user.id,
        cryptocurrency,
        amount,
        amountCrypto,
        walletAddress,
        network: network || 'mainnet',
        status: 'pending',
      },
    });

    // In production, integrate with blockchain API to monitor transaction

    return NextResponse.json({ 
      cryptoPayment,
      message: 'Crypto payment initiated. Please send the exact amount to the wallet address.',
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating crypto payment:', error);
    return NextResponse.json(
      { error: 'Failed to create crypto payment' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get('bookingId');

    let whereClause: any = { userId: session.user.id };
    if (bookingId) {
      whereClause.bookingId = bookingId;
    }

    const payments = await prisma.cryptoPayment.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ payments });
  } catch (error) {
    console.error('Error fetching crypto payments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch crypto payments' },
      { status: 500 }
    );
  }
}
