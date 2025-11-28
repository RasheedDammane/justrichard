import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { nanoid } from 'nanoid';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const car = await prisma.rentalCar.create({
      data: {
        id: nanoid(),
        ...data,
        year: parseInt(data.year),
        doors: parseInt(data.doors),
        seats: parseInt(data.seats),
        pricePerDay: parseFloat(data.pricePerDay),
        pricePerWeek: data.pricePerWeek ? parseFloat(data.pricePerWeek) : null,
        pricePerMonth: data.pricePerMonth ? parseFloat(data.pricePerMonth) : null,
        deposit: data.deposit ? parseFloat(data.deposit) : 0,
        mileagePerDay: parseInt(data.mileagePerDay || 250),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(car);
  } catch (error: any) {
    console.error('Error creating rental car:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
