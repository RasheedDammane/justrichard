import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { BookingStatus, PaymentStatus } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';

    const bookings = await prisma.booking.findMany({
      where: { userId: session.user.id },
      include: {
        service: {
          include: { translations: { where: { locale } } },
        },
        address: true,
        addons: {
          include: {
            addon: {
              include: { translations: { where: { locale } } },
            },
          },
        },
        payment: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      serviceId,
      addressId,
      scheduledDate,
      scheduledTime,
      addonIds = [],
      promoCode,
      notes,
    } = body;

    // Validate required fields
    if (!serviceId || !addressId || !scheduledDate || !scheduledTime) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Fetch service details
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
      include: { addons: true },
    });

    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    // Calculate pricing
    let subtotal = service.basePrice;
    let duration = service.duration;

    const selectedAddons = service.addons.filter((addon) => addonIds.includes(addon.id));
    for (const addon of selectedAddons) {
      subtotal += addon.price;
      if (addon.duration) duration += addon.duration;
    }

    // Apply promo code if provided
    let discount = 0;
    if (promoCode) {
      const promo = await prisma.promotion.findUnique({
        where: { code: promoCode, isActive: true },
      });

      if (promo && new Date() >= promo.startsAt && new Date() <= promo.expiresAt) {
        if (promo.type === 'PERCENTAGE') {
          discount = (subtotal * promo.value) / 100;
          if (promo.maxDiscount) {
            discount = Math.min(discount, promo.maxDiscount);
          }
        } else if (promo.type === 'FIXED') {
          discount = promo.value;
        }

        // Update promo usage
        await prisma.promotion.update({
          where: { id: promo.id },
          data: { usageCount: { increment: 1 } },
        });
      }
    }

    const taxRate = 0.05; // 5% tax
    const tax = (subtotal - discount) * taxRate;
    const total = subtotal - discount + tax;

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        userId: session.user.id,
        serviceId,
        addressId,
        scheduledDate: new Date(scheduledDate),
        scheduledTime,
        duration,
        status: BookingStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        subtotal,
        tax,
        discount,
        total,
        currency: service.currency,
        promoCode,
        notes,
        addons: {
          create: selectedAddons.map((addon) => ({
            addonId: addon.id,
            quantity: 1,
            price: addon.price,
          })),
        },
      },
      include: {
        service: {
          include: { translations: true },
        },
        address: true,
        addons: {
          include: {
            addon: {
              include: { translations: true },
            },
          },
        },
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
