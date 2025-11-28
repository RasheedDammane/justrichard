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

    // Convert string numbers to actual numbers
    const yachtData = {
      ...data,
      year: data.year ? parseInt(data.year) : null,
      length: data.length ? parseFloat(data.length) : null,
      capacity: data.capacity ? parseInt(data.capacity) : null,
      cabins: data.cabins ? parseInt(data.cabins) : null,
      bathrooms: data.bathrooms ? parseInt(data.bathrooms) : null,
      crew: data.crew ? parseInt(data.crew) : null,
      speed: data.speed ? parseFloat(data.speed) : null,
      pricePerHour: data.pricePerHour ? parseFloat(data.pricePerHour) : null,
      price2Hours: data.price2Hours ? parseFloat(data.price2Hours) : null,
      price3Hours: data.price3Hours ? parseFloat(data.price3Hours) : null,
      price4Hours: data.price4Hours ? parseFloat(data.price4Hours) : null,
    };

    const yacht = await prisma.yacht.create({
      data: {
        id: nanoid(),
        ...yachtData,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(yacht);
  } catch (error: any) {
    console.error('Error creating yacht:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
