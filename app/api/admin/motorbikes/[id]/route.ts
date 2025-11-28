import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const motorbike = await prisma.rentalMotorbike.update({
      where: { id: params.id },
      data: {
        ...data,
        pricePerDay: parseFloat(data.pricePerDay),
        pricePerWeek: data.pricePerWeek ? parseFloat(data.pricePerWeek) : null,
        pricePerMonth: data.pricePerMonth ? parseFloat(data.pricePerMonth) : null,
        year: parseInt(data.year),
        seats: parseInt(data.seats),
        engineSize: parseInt(data.engineSize),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(motorbike);
  } catch (error: any) {
    console.error('Error updating motorbike:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.rentalMotorbike.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting motorbike:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
