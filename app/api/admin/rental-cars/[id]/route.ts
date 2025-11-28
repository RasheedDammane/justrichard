import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const car = await prisma.rentalCar.update({
      where: { id: params.id },
      data: {
        ...data,
        year: parseInt(data.year),
        doors: parseInt(data.doors),
        seats: parseInt(data.seats),
        pricePerDay: parseFloat(data.pricePerDay),
        pricePerWeek: data.pricePerWeek ? parseFloat(data.pricePerWeek) : null,
        pricePerMonth: data.pricePerMonth ? parseFloat(data.pricePerMonth) : null,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(car);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.rentalCar.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
