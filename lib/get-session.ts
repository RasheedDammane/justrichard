import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || 'fallback-secret');

export async function getCustomSession() {
  try {
    console.log('[GET_SESSION] Checking session...');
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    console.log('[GET_SESSION] All cookies:', allCookies.map(c => c.name).join(', '));
    
    const token = cookieStore.get('next-auth.session-token')?.value;
    console.log('[GET_SESSION] Token found:', !!token);

    if (!token) {
      console.log('[GET_SESSION] No token, returning null');
      return null;
    }

    console.log('[GET_SESSION] Verifying token...');
    const { payload } = await jwtVerify(token, secret);
    console.log('[GET_SESSION] Token verified, user:', payload.email);

    return {
      user: {
        id: payload.id as string,
        email: payload.email as string,
        name: payload.name as string,
        role: payload.role as string,
      },
    };
  } catch (error: any) {
    console.error('[GET_SESSION] Error:', error.message);
    return null;
  }
}
