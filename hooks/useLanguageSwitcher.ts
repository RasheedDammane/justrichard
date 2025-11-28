'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

type Locale = 'en' | 'fr';

const SUPPORTED_LOCALES: Locale[] = ['en', 'fr'];

interface UseLanguageSwitcherReturn {
  currentLocale: Locale;
  availableLocales: Locale[];
  changeLanguage: (newLocale: Locale) => void;
  isChanging: boolean;
  error: string | null;
}

/**
 * Hook for managing language switching with page reload
 * Supports EN and FR locales
 * Handles URL reconstruction and error handling
 */
export function useLanguageSwitcher(): UseLanguageSwitcherReturn {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isChanging, setIsChanging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Extract current locale from pathname (e.g., /en/... or /fr/...)
  const getCurrentLocale = useCallback((): Locale => {
    const segments = pathname.split('/').filter(Boolean);
    const localeSegment = segments[0] as Locale;
    
    if (SUPPORTED_LOCALES.includes(localeSegment)) {
      return localeSegment;
    }
    
    // Fallback to 'en' if locale is invalid
    console.warn(`Invalid locale "${localeSegment}" detected, falling back to "en"`);
    return 'en';
  }, [pathname]);

  const currentLocale = getCurrentLocale();

  /**
   * Changes the application language
   * - Sets a cookie via document.cookie
   * - Reconstructs the URL with the new locale
   * - Uses window.location for full page reload
   */
  const changeLanguage = useCallback(
    (newLocale: Locale) => {
      console.log('🔄 changeLanguage called with:', newLocale);
      
      // Validation
      if (!SUPPORTED_LOCALES.includes(newLocale)) {
        const errorMsg = `Unsupported locale: ${newLocale}`;
        console.error('❌', errorMsg);
        setError(errorMsg);
        return;
      }

      // Don't change if already on this locale
      if (newLocale === currentLocale) {
        console.log('⚠️ Already on locale:', newLocale);
        return;
      }

      setIsChanging(true);
      setError(null);

      try {
        console.log('✅ Starting language switch...');
        
        // Set cookie using native document.cookie
        const maxAge = 365 * 24 * 60 * 60; // 365 days in seconds
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${maxAge}; SameSite=Lax`;
        console.log('✅ Cookie set:', `NEXT_LOCALE=${newLocale}`);

        // Reconstruct URL with new locale
        const segments = pathname.split('/').filter(Boolean);
        
        // Replace the first segment (current locale) with new locale
        if (segments.length > 0 && SUPPORTED_LOCALES.includes(segments[0] as Locale)) {
          segments[0] = newLocale;
        } else {
          // If no locale in path, prepend new locale
          segments.unshift(newLocale);
        }

        // Rebuild path
        const newPath = '/' + segments.join('/');
        
        // Preserve query parameters
        const queryString = searchParams.toString();
        const newUrl = queryString ? `${newPath}?${queryString}` : newPath;

        console.log('✅ Redirecting to:', newUrl);

        // Use window.location for full page reload
        window.location.href = newUrl;
        
      } catch (err) {
        const errorMsg = 'An error occurred while changing language. Please try again.';
        console.error('❌ Language switch error:', err);
        setError(errorMsg);
        setIsChanging(false);
      }
    },
    [currentLocale, pathname, searchParams]
  );

  return {
    currentLocale,
    availableLocales: SUPPORTED_LOCALES,
    changeLanguage,
    isChanging,
    error,
  };
}
