import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Always return success (security best practice)
    // Don't reveal if email exists or not
    if (!user) {
      return NextResponse.json(
        { message: 'If an account exists, a reset link will be sent' },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    // In production, you would:
    // 1. Store the reset token in database
    // 2. Send email with reset link
    // For now, we'll just log it
    console.log('Password reset token:', resetToken);
    console.log('Reset link:', `http://localhost:3000/auth/reset-password?token=${resetToken}`);

    // TODO: Send email with reset link
    // await sendPasswordResetEmail(email, resetToken);

    return NextResponse.json(
      { message: 'Password reset link sent to your email' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
