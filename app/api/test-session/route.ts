import { NextRequest, NextResponse } from 'next/server';
import { getCustomSession } from '@/lib/get-session';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  console.log('[TEST SESSION] Testing custom session...');
  
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  console.log('[TEST SESSION] All cookies:', allCookies.map(c => c.name).join(', '));
  
  const session = await getCustomSession();
  console.log('[TEST SESSION] Session result:', !!session);
  
  return NextResponse.json({
    hasSession: !!session,
    session: session,
    user: session?.user || null,
    cookies: allCookies.map(c => ({ name: c.name, hasValue: !!c.value })),
    timestamp: new Date().toISOString(),
  });
}
