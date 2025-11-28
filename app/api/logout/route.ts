import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  console.log('[LOGOUT] Deleting session cookie...');
  
  const cookieStore = await cookies();
  cookieStore.delete('next-auth.session-token');
  
  console.log('[LOGOUT] ✅ Logged out successfully');
  
  return NextResponse.json({ success: true });
}

export async function GET() {
  // Support GET aussi pour faciliter
  return POST();
}
