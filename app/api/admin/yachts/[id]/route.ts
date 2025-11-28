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
    
    // Convert string numbers to actual numbers if present
    const yachtData: any = { ...data };
    if (data.year) yachtData.year = parseInt(data.year);
    if (data.length) yachtData.length = parseFloat(data.length);
    if (data.capacity) yachtData.capacity = parseInt(data.capacity);
    if (data.cabins) yachtData.cabins = parseInt(data.cabins);
    if (data.bathrooms) yachtData.bathrooms = parseInt(data.bathrooms);
    if (data.crew) yachtData.crew = parseInt(data.crew);
    if (data.speed) yachtData.speed = parseFloat(data.speed);
    if (data.pricePerHour) yachtData.pricePerHour = parseFloat(data.pricePerHour);
    if (data.price2Hours) yachtData.price2Hours = parseFloat(data.price2Hours);
    if (data.price3Hours) yachtData.price3Hours = parseFloat(data.price3Hours);
    if (data.price4Hours) yachtData.price4Hours = parseFloat(data.price4Hours);

    const yacht = await prisma.yacht.update({
      where: { id: params.id },
      data: {
        ...yachtData,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(yacht);
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

    await prisma.yacht.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
