import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      supplierId,
      productName,
      quantity,
      targetPrice,
      message,
      customerName,
      customerEmail,
      customerPhone,
      companyName,
      country,
    } = body;

    // Validate required fields
    if (!supplierId || !productName || !quantity || !message || !customerName || !customerEmail || !country) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create inquiry
    const inquiry = await prisma.supplierInquiry.create({
      data: {
        id: `inquiry-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        supplierId,
        productName,
        quantity,
        targetPrice: targetPrice || null,
        message,
        customerName,
        customerEmail,
        customerPhone: customerPhone || null,
        companyName: companyName || null,
        country,
        status: 'pending',
        updatedAt: new Date(),
      },
    });

    // Increment inquiries count for supplier
    await prisma.supplier.update({
      where: { id: supplierId },
      data: { inquiries: { increment: 1 } },
    });

    // Send email notification to supplier (async, don't wait)
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3100'}/api/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: 'supplier@example.com', // In production, get from supplier record
        subject: `New Inquiry for ${productName}`,
        message: `
          New inquiry from ${customerName} (${companyName || 'N/A'})
          Product: ${productName}
          Quantity: ${quantity}
          Target Price: ${targetPrice || 'Not specified'}
          Message: ${message}
          Contact: ${customerEmail} ${customerPhone ? `/ ${customerPhone}` : ''}
        `,
        type: 'inquiry_received',
      }),
    }).catch((err) => console.error('Failed to send email notification:', err));

    return NextResponse.json({ success: true, inquiry });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    return NextResponse.json({ error: 'Failed to create inquiry' }, { status: 500 });
  }
}
