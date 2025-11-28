import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const currency = await prisma.currency.findUnique({
      where: { id: params.id },
      include: {
        exchangeRatesFrom: {
          include: {
            toCurrency: true,
          },
        },
        exchangeRatesTo: {
          include: {
            fromCurrency: true,
          },
        },
      },
    });

    if (!currency) {
      return NextResponse.json({ error: 'Currency not found' }, { status: 404 });
    }

    return NextResponse.json({ currency });
  } catch (error) {
    console.error('Error fetching currency:', error);
    return NextResponse.json(
      { error: 'Failed to fetch currency' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    console.log('Session:', session?.user);
    console.log('User role:', session?.user?.role);
    
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    
    if (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER') {
      return NextResponse.json({ error: 'Unauthorized - Admin or Manager role required' }, { status: 403 });
    }

    const body = await request.json();
    const { name, symbol, isActive, isDefault, decimalPlaces } = body;

    console.log('Updating currency:', params.id, body);

    // If setting as default, unset other defaults
    if (isDefault) {
      await prisma.currency.updateMany({
        where: { 
          isDefault: true,
          NOT: { id: params.id },
        },
        data: { isDefault: false },
      });
    }

    const currency = await prisma.currency.update({
      where: { id: params.id },
      data: {
        name: name !== undefined ? name : undefined,
        symbol: symbol !== undefined ? symbol : undefined,
        isActive: isActive !== undefined ? isActive : undefined,
        isDefault: isDefault !== undefined ? isDefault : undefined,
        decimalPlaces: decimalPlaces !== undefined ? decimalPlaces : undefined,
      },
    });

    console.log('Currency updated successfully:', currency.code);

    return NextResponse.json({ currency });
  } catch (error) {
    console.error('Error updating currency:', error);
    return NextResponse.json(
      { error: 'Failed to update currency: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if it's the default currency
    const currency = await prisma.currency.findUnique({
      where: { id: params.id },
    });

    if (currency?.isDefault) {
      return NextResponse.json(
        { error: 'Cannot delete the default currency' },
        { status: 400 }
      );
    }

    await prisma.currency.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Currency deleted successfully' });
  } catch (error) {
    console.error('Error deleting currency:', error);
    return NextResponse.json(
      { error: 'Failed to delete currency' },
      { status: 500 }
    );
  }
}
