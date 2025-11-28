import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    
    const where: any = { userId: session.user.id };
    if (status) {
      where.status = status;
    }

    const orders = await prisma.foodOrder.findMany({
      where,
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const body = await request.json();
    
    const {
      customerName,
      customerEmail,
      customerPhone,
      deliveryAddress,
      deliveryCity,
      deliveryState,
      deliveryPostalCode,
      deliveryCountry,
      deliveryNotes,
      paymentMethod = 'cash',
      couponCode,
    } = body;

    // Validate required fields
    if (!customerName || !customerEmail || !customerPhone || !deliveryAddress || !deliveryCity || !deliveryCountry) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get cart
    const sessionId = request.cookies.get('cart_session')?.value;
    const where: any = { status: 'active' };
    if (session?.user?.id) {
      where.userId = session.user.id;
    } else {
      where.sessionId = sessionId;
    }

    const cart = await prisma.foodCart.findFirst({
      where,
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Cart is empty' },
        { status: 400 }
      );
    }

    // Calculate totals
    let subtotal = 0;
    let taxAmount = 0;

    for (const item of cart.items) {
      const itemSubtotal = item.price * item.quantity;
      subtotal += itemSubtotal;
      
      if (item.product.taxRate) {
        taxAmount += itemSubtotal * (item.product.taxRate / 100);
      }
    }

    // Apply coupon
    let couponDiscount = 0;
    if (couponCode) {
      const coupon = await prisma.foodCoupon.findUnique({
        where: { code: couponCode, isActive: true },
      });

      if (coupon && new Date() >= coupon.validFrom && new Date() <= coupon.validUntil) {
        if (coupon.minOrderAmount && subtotal < coupon.minOrderAmount) {
          // Minimum order amount not met
        } else {
          if (coupon.discountType === 'percentage') {
            couponDiscount = (subtotal * coupon.discountValue) / 100;
            if (coupon.maxDiscountAmount) {
              couponDiscount = Math.min(couponDiscount, coupon.maxDiscountAmount);
            }
          } else if (coupon.discountType === 'fixed') {
            couponDiscount = coupon.discountValue;
          }
        }
      }
    }

    const total = subtotal + taxAmount - couponDiscount;

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // Create order
    const order = await prisma.foodOrder.create({
      data: {
        orderNumber,
        userId: session?.user?.id,
        customerName,
        customerEmail,
        customerPhone,
        deliveryAddress,
        deliveryCity,
        deliveryState,
        deliveryPostalCode,
        deliveryCountry,
        deliveryNotes,
        subtotal,
        taxAmount,
        discountAmount: couponDiscount,
        total,
        currency: cart.items[0]?.product.currency || 'AED',
        paymentMethod,
        paymentStatus: 'pending',
        status: 'pending',
        couponCode: couponCode || undefined,
        couponDiscount: couponDiscount > 0 ? couponDiscount : undefined,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            productName: item.product.name,
            quantity: item.quantity,
            price: item.price,
            taxRate: item.product.taxRate || 0,
            subtotal: item.price * item.quantity,
            total: item.price * item.quantity * (1 + (item.product.taxRate || 0) / 100),
          })),
        },
        statusHistory: {
          create: {
            status: 'pending',
            note: 'Order created',
          },
        },
      },
      include: {
        items: true,
      },
    });

    // Update coupon usage
    if (couponCode && couponDiscount > 0) {
      await prisma.foodCoupon.update({
        where: { code: couponCode },
        data: { usageCount: { increment: 1 } },
      });
    }

    // Update product stock and sales
    for (const item of cart.items) {
      await prisma.foodProduct.update({
        where: { id: item.productId },
        data: {
          stock: { decrement: item.quantity },
          sales: { increment: item.quantity },
        },
      });

      // Create inventory log
      await prisma.foodInventoryLog.create({
        data: {
          productId: item.productId,
          type: 'sale',
          quantity: -item.quantity,
          stockBefore: item.product.stock,
          stockAfter: item.product.stock - item.quantity,
          reference: order.orderNumber,
          notes: `Sale from order ${order.orderNumber}`,
        },
      });
    }

    // Mark cart as converted
    await prisma.foodCart.update({
      where: { id: cart.id },
      data: { status: 'converted' },
    });

    return NextResponse.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
