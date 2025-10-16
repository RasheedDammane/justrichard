import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { transactionHash, confirmations, status } = body;

    // Update crypto payment
    const cryptoPayment = await prisma.cryptoPayment.update({
      where: { id: params.id },
      data: {
        transactionHash: transactionHash || undefined,
        confirmations: confirmations !== undefined ? confirmations : undefined,
        status: status || undefined,
      },
    });

    // If confirmed, update booking payment status
    if (status === 'confirmed' && cryptoPayment.bookingId) {
      await prisma.booking.update({
        where: { id: cryptoPayment.bookingId },
        data: { paymentStatus: 'PAID' },
      });
    }

    return NextResponse.json({ cryptoPayment });
  } catch (error) {
    console.error('Error verifying crypto payment:', error);
    return NextResponse.json(
      { error: 'Failed to verify crypto payment' },
      { status: 500 }
    );
  }
}
