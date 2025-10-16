import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== Role.ADMIN && session.user.role !== Role.MANAGER)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status'); // 'active', 'expired', 'all'

    const now = new Date();
    
    let whereClause: any = {};
    
    if (status === 'active') {
      whereClause = {
        isActive: true,
        startsAt: { lte: now },
        expiresAt: { gte: now },
      };
    } else if (status === 'expired') {
      whereClause = {
        expiresAt: { lt: now },
      };
    }

    const promotions = await prisma.promotion.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ promotions });
  } catch (error) {
    console.error('Error fetching promotions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch promotions' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { code, type, value, minAmount, maxDiscount, usageLimit, startsAt, expiresAt, isActive } = body;

    // Validate required fields
    if (!code || !type || !value || !startsAt || !expiresAt) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if code already exists
    const existing = await prisma.promotion.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Un code promo avec ce code existe déjà' },
        { status: 400 }
      );
    }

    // Validate dates
    const start = new Date(startsAt);
    const end = new Date(expiresAt);
    
    if (end <= start) {
      return NextResponse.json(
        { error: 'La date de fin doit être après la date de début' },
        { status: 400 }
      );
    }

    // Create promotion
    const promotion = await prisma.promotion.create({
      data: {
        code: code.toUpperCase(),
        type,
        value: parseFloat(value),
        minAmount: minAmount ? parseFloat(minAmount) : null,
        maxDiscount: maxDiscount ? parseFloat(maxDiscount) : null,
        usageLimit: usageLimit ? parseInt(usageLimit) : null,
        startsAt: start,
        expiresAt: end,
        isActive: isActive ?? true,
        usageCount: 0,
      },
    });

    return NextResponse.json({ promotion }, { status: 201 });
  } catch (error) {
    console.error('Error creating promotion:', error);
    return NextResponse.json(
      { error: 'Failed to create promotion' },
      { status: 500 }
    );
  }
}
