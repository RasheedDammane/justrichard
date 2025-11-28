import { headers } from 'next/headers';

export interface User {
  id: string;
  email: string;
  role: string;
  name?: string;
}

export async function getUserFromHeaders(): Promise<User | null> {
  const headersList = await headers();
  
  const userId = headersList.get('x-user-id');
  const userEmail = headersList.get('x-user-email');
  const userRole = headersList.get('x-user-role');
  const userName = headersList.get('x-user-name');
  
  if (!userId || !userEmail || !userRole) {
    return null;
  }
  
  return {
    id: userId,
    email: userEmail,
    role: userRole,
    name: userName || undefined,
  };
}
