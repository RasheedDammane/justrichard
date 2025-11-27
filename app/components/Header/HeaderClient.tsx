'use client';

import LanguageSwitcher from '@/components/LanguageSwitcher';
import Link from 'next/link';

interface HeaderClientProps {
  title: string;
  description?: string;
  logoUrl?: string;
  logoText?: string;
  logoAlt?: string;
  ctaText?: string;
  ctaUrl?: string;
  ctaColor?: string;
  bgColor?: string;
  textColor?: string;
  isSticky?: boolean;
  showSearch?: boolean;
}

/**
 * Client-side Header component with language switcher
 * Used in the public layout with CMS data
 */
export default function HeaderClient({ 
  title, 
  description,
  logoUrl,
  logoText,
  logoAlt,
  ctaText,
  ctaUrl,
  ctaColor = '#3B82F6',
  bgColor = '#FFFFFF',
  textColor = '#1F2937',
  isSticky = false,
  showSearch = false,
}: HeaderClientProps) {
  return (
    <header 
      className={`border-b border-gray-200 ${isSticky ? 'sticky top-0 z-50' : ''}`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo/Title Section */}
          <div className="flex items-center space-x-4">
            {logoUrl && (
              <img 
                src={logoUrl} 
                alt={logoAlt || 'Logo'} 
                className="h-8 w-auto"
              />
            )}
            <div className="text-2xl font-bold" style={{ color: textColor }}>
              {logoText || title}
            </div>
            {description && (
              <div className="hidden md:block text-sm opacity-80">
                {description}
              </div>
            )}
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Bar (if enabled) */}
            {showSearch && (
              <div className="hidden md:block">
                <input
                  type="search"
                  placeholder="Search..."
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  style={{ color: '#1F2937' }}
                />
              </div>
            )}
            
            {/* CTA Button */}
            {ctaText && ctaUrl && (
              <Link
                href={ctaUrl}
                className="px-4 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
                style={{ backgroundColor: ctaColor }}
              >
                {ctaText}
              </Link>
            )}
            
            {/* Language Switcher */}
            <LanguageSwitcher variant="public" />
          </div>
        </div>
      </div>
    </header>
  );
}
