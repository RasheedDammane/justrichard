import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    // Clear all authentication cookies
    const cookieStore = cookies();
    
    // Clear next-auth session cookie
    cookieStore.delete('next-auth.session-token');
    cookieStore.delete('__Secure-next-auth.session-token');
    
    // Clear any custom auth cookies if you have them
    cookieStore.delete('auth-token');
    
    return NextResponse.redirect(new URL('/en/auth/login?logout=success', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'));
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.redirect(new URL('/en', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'));
  }
}

export async function POST() {
  return GET();
}
