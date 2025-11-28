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

    const motorbike = await prisma.rentalMotorbike.create({
      data: {
        id: nanoid(),
        ...data,
        pricePerDay: parseFloat(data.pricePerDay),
        pricePerWeek: data.pricePerWeek ? parseFloat(data.pricePerWeek) : null,
        pricePerMonth: data.pricePerMonth ? parseFloat(data.pricePerMonth) : null,
        year: parseInt(data.year),
        seats: parseInt(data.seats),
        engineSize: parseInt(data.engineSize),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(motorbike);
  } catch (error: any) {
    console.error('Error creating motorbike:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
