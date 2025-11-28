'use client';

import { useLanguageSwitcher } from '@/hooks/useLanguageSwitcher';
import { useEffect } from 'react';

interface LanguageSwitcherProps {
  variant?: 'public' | 'admin';
  className?: string;
}

/**
 * Language switcher component with EN/FR buttons
 * Reloads the page when language is changed
 * Displays error messages if language switch fails
 */
export default function LanguageSwitcher({ 
  variant = 'public',
  className = '' 
}: LanguageSwitcherProps) {
  const { currentLocale, availableLocales, changeLanguage, isChanging, error } = useLanguageSwitcher();

  // Log error to console (don't show alert immediately)
  useEffect(() => {
    if (error) {
      console.error('LanguageSwitcher error:', error);
    }
  }, [error]);

  const baseButtonClass = "px-3 py-1.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1";
  
  const activeClass = variant === 'admin'
    ? "bg-blue-600 text-white shadow-sm"
    : "bg-blue-600 text-white shadow-sm";
    
  const inactiveClass = variant === 'admin'
    ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300";

  const disabledClass = "opacity-50 cursor-not-allowed";

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {availableLocales.map((locale) => {
        const isActive = locale === currentLocale;
        const buttonClass = `
          ${baseButtonClass}
          ${isActive ? activeClass : inactiveClass}
          ${isChanging ? disabledClass : ''}
          ${locale === 'en' ? 'rounded-l-md' : ''}
          ${locale === 'fr' ? 'rounded-r-md' : ''}
        `.trim();

        return (
          <button
            key={locale}
            onClick={() => changeLanguage(locale)}
            disabled={isChanging || isActive}
            className={buttonClass}
            aria-label={`Switch to ${locale.toUpperCase()}`}
            aria-current={isActive ? 'true' : 'false'}
          >
            {locale.toUpperCase()}
          </button>
        );
      })}
      
      {isChanging && (
        <span className="ml-2 text-xs text-gray-500">
          Loading...
        </span>
      )}
    </div>
  );
}
