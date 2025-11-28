import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    const sessionId = request.cookies.get('cart_session')?.value;

    if (!session?.user?.id && !sessionId) {
      return NextResponse.json({
        success: true,
        data: { items: [], subtotal: 0, total: 0 },
      });
    }

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
            product: {
              include: {
                category: true,
                brand: true,
              },
            },
          },
        },
      },
    });

    if (!cart) {
      return NextResponse.json({
        success: true,
        data: { items: [], subtotal: 0, total: 0 },
      });
    }

    // Calculate totals
    const subtotal = cart.items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    return NextResponse.json({
      success: true,
      data: {
        cart,
        subtotal,
        total: subtotal,
      },
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const body = await request.json();
    const { productId, quantity = 1, action = 'add' } = body;

    if (!productId) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Get product
    const product = await prisma.foodProduct.findUnique({
      where: { id: productId },
    });

    if (!product || !product.isActive || !product.canPurchase) {
      return NextResponse.json(
        { success: false, error: 'Product not available' },
        { status: 400 }
      );
    }

    // Check stock
    if (product.stock < quantity) {
      return NextResponse.json(
        { success: false, error: 'Insufficient stock' },
        { status: 400 }
      );
    }

    // Get or create cart
    let sessionId = request.cookies.get('cart_session')?.value;
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2);
    }

    const where: any = { status: 'active' };
    if (session?.user?.id) {
      where.userId = session.user.id;
    } else {
      where.sessionId = sessionId;
    }

    let cart = await prisma.foodCart.findFirst({ where });

    if (!cart) {
      cart = await prisma.foodCart.create({
        data: {
          userId: session?.user?.id,
          sessionId: !session?.user?.id ? sessionId : undefined,
          status: 'active',
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        },
      });
    }

    // Add or update cart item
    const existingItem = await prisma.foodCartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    let cartItem;
    if (existingItem) {
      if (action === 'remove') {
        await prisma.foodCartItem.delete({ where: { id: existingItem.id } });
        cartItem = null;
      } else if (action === 'update') {
        cartItem = await prisma.foodCartItem.update({
          where: { id: existingItem.id },
          data: { quantity },
        });
      } else {
        cartItem = await prisma.foodCartItem.update({
          where: { id: existingItem.id },
          data: { quantity: { increment: quantity } },
        });
      }
    } else {
      cartItem = await prisma.foodCartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
          price: product.sellingPrice,
        },
      });
    }

    // Get updated cart
    const updatedCart = await prisma.foodCart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    const response = NextResponse.json({
      success: true,
      data: updatedCart,
    });

    // Set session cookie
    if (!session?.user?.id) {
      response.cookies.set('cart_session', sessionId!, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });
    }

    return response;
  } catch (error) {
    console.error('Error updating cart:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update cart' },
      { status: 500 }
    );
  }
}
