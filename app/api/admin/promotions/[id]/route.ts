import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== Role.ADMIN && session.user.role !== Role.MANAGER)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const promotion = await prisma.promotion.findUnique({
      where: { id: params.id },
    });

    if (!promotion) {
      return NextResponse.json({ error: 'Promotion not found' }, { status: 404 });
    }

    // Calculate status
    const now = new Date();
    const status = 
      !promotion.isActive ? 'inactive' :
      now < promotion.startsAt ? 'scheduled' :
      now > promotion.expiresAt ? 'expired' :
      promotion.usageLimit && promotion.usageCount >= promotion.usageLimit ? 'limit_reached' :
      'active';

    return NextResponse.json({ 
      promotion: {
        ...promotion,
        status,
      }
    });
  } catch (error) {
    console.error('Error fetching promotion:', error);
    return NextResponse.json(
      { error: 'Failed to fetch promotion' },
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
    
    if (!session || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { code, type, value, minAmount, maxDiscount, usageLimit, startsAt, expiresAt, isActive } = body;

    // Check if promotion exists
    const existing = await prisma.promotion.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Promotion not found' }, { status: 404 });
    }

    // Check if code is being changed and if new code already exists
    if (code && code.toUpperCase() !== existing.code) {
      const codeExists = await prisma.promotion.findUnique({
        where: { code: code.toUpperCase() },
      });

      if (codeExists) {
        return NextResponse.json(
          { error: 'Un code promo avec ce code existe déjà' },
          { status: 400 }
        );
      }
    }

    // Validate dates if provided
    if (startsAt && expiresAt) {
      const start = new Date(startsAt);
      const end = new Date(expiresAt);
      
      if (end <= start) {
        return NextResponse.json(
          { error: 'La date de fin doit être après la date de début' },
          { status: 400 }
        );
      }
    }

    // Update promotion
    const promotion = await prisma.promotion.update({
      where: { id: params.id },
      data: {
        code: code ? code.toUpperCase() : undefined,
        type: type || undefined,
        value: value ? parseFloat(value) : undefined,
        minAmount: minAmount !== undefined ? (minAmount ? parseFloat(minAmount) : null) : undefined,
        maxDiscount: maxDiscount !== undefined ? (maxDiscount ? parseFloat(maxDiscount) : null) : undefined,
        usageLimit: usageLimit !== undefined ? (usageLimit ? parseInt(usageLimit) : null) : undefined,
        startsAt: startsAt ? new Date(startsAt) : undefined,
        expiresAt: expiresAt ? new Date(expiresAt) : undefined,
        isActive: isActive !== undefined ? isActive : undefined,
      },
    });

    return NextResponse.json({ promotion });
  } catch (error) {
    console.error('Error updating promotion:', error);
    return NextResponse.json(
      { error: 'Failed to update promotion' },
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
    
    if (!session || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if promotion exists
    const existing = await prisma.promotion.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Promotion not found' }, { status: 404 });
    }

    // Delete promotion
    await prisma.promotion.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Promotion deleted successfully' });
  } catch (error) {
    console.error('Error deleting promotion:', error);
    return NextResponse.json(
      { error: 'Failed to delete promotion' },
      { status: 500 }
    );
  }
}
