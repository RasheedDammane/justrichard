import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import AdminLayoutComponent from '@/components/admin/AdminLayout';

interface AdminLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

/**
 * Layout Admin - Protège TOUTES les routes /admin/*
 * Gère l'authentification pour TOUS les types d'utilisateurs:
 * - ADMIN: Accès complet
 * - PROVIDER: Dashboard fournisseur + ses ressources
 * - USER: Dashboard utilisateur + ses données
 * 
 * Avantage: Une seule vérification ici = session persiste partout
 */
export default async function AdminLayout({ children, params }: AdminLayoutProps) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  // Vérification unique pour tous les utilisateurs
  if (!session?.user) {
    redirect(`/${locale}/auth/login?callbackUrl=/${locale}/admin`);
  }

  // Le rôle est transmis au layout component
  // Chaque type d'utilisateur voit son interface adaptée
  return (
    <AdminLayoutComponent 
      locale={locale}
      userName={session.user.name || undefined}
      userRole={session.user.role || undefined}
    >
      {children}
    </AdminLayoutComponent>
  );
}
