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

    const provider = await prisma.provider.create({
      data: {
        id: nanoid(),
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(provider);
  } catch (error: any) {
    console.error('Error creating provider:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
