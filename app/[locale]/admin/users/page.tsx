import { prisma } from '@/lib/prisma';
import UsersClient from './UsersClient';

export default async function AdminUsersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin
  

  const users = await prisma.user.findMany({
    include: {
      UserRole: {
        include: {
          Role: true,
        },
      },
      _count: {
        select: { 
          Booking: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  // Get role for each user
  const usersWithRoles = users.map(user => {
    const primaryRole = user.UserRole.sort((a, b) => b.Role.level - a.Role.level)[0]?.Role;
    return {
      ...user,
      roleName: primaryRole?.name || 'CUSTOMER',
    };
  });

  const stats = {
    total: usersWithRoles.length,
    customers: usersWithRoles.filter((u) => u.roleName === 'CUSTOMER').length,
    providers: usersWithRoles.filter((u) => u.roleName === 'PROVIDER').length,
    admins: usersWithRoles.filter((u) => u.roleName === 'ADMIN' || u.roleName === 'MANAGER').length,
  };

  return <UsersClient users={usersWithRoles} stats={stats} />;
}
