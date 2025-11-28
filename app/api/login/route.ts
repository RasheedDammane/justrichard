import { NextRequest, NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || 'fallback-secret');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log('[CUSTOM LOGIN] Attempting login for:', email);

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        firstName: true,
        lastName: true,
        role: true,
        avatar: true,
        isActive: true,
      },
    });

    console.log('[CUSTOM LOGIN] User found:', !!user);

    if (!user || !user.password) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { error: 'Account is not active' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await compare(password, user.password);
    console.log('[CUSTOM LOGIN] Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = await new SignJWT({
      id: user.id,
      email: user.email,
      role: user.role || 'viewer',
      name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('30d')
      .sign(secret);

    console.log('[CUSTOM LOGIN] Token created');

    console.log('[CUSTOM LOGIN] Cookie set: next-auth.session-token');
    console.log('[CUSTOM LOGIN] ✅ Login successful!');

    // Créer la réponse de redirection avec le cookie
    const response = NextResponse.redirect(
      new URL('/en/admin', request.url),
      { status: 302 }
    );

    // Définir le cookie dans la réponse HTTP
    response.cookies.set('next-auth.session-token', token, {
      httpOnly: true,
      secure: false, // false pour localhost
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('[CUSTOM LOGIN] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
