'use client';

import LanguageSwitcher from '@/components/LanguageSwitcher';
import Link from 'next/link';
import { useParams } from 'next/navigation';

/**
 * Admin Header component with language switcher
 * Displayed on all admin pages
 */
export default function AdminHeader() {
  const params = useParams();
  const locale = params.locale as string;

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Logo & Title */}
          <div className="flex items-center space-x-4">
            <Link href={`/${locale}/admin`} className="flex items-center space-x-2">
              <div className="text-xl font-bold text-blue-600">
                JustRichard
              </div>
              <span className="px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800 rounded">
                ADMIN
              </span>
            </Link>
          </div>

          {/* Right: Language Switcher */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher variant="admin" />
          </div>
        </div>
      </div>
    </header>
  );
}
