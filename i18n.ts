import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Temporarily restricted to EN, FR, AR for language switcher implementation
// Full list: ['en', 'ar', 'fr', 'es', 'de', 'ru', 'th', 'vi', 'ko', 'it', 'no', 'tr', 'pt', 'af', 'ja']
export const locales = ['en', 'fr', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound();

  try {
    // Load both frontend and admin translations
    const frontendMessages = (await import(`./messages/${locale}.json`)).default;
    
    let adminMessages = {};
    try {
      adminMessages = (await import(`./messages/admin/${locale}.json`)).default;
    } catch (e) {
      console.warn(`Admin messages not found for locale: ${locale}`);
    }

    return {
      messages: {
        ...frontendMessages,
        ...adminMessages,
      },
    };
  } catch (error) {
    console.error(`Error loading messages for locale: ${locale}`, error);
    // Return minimal messages to avoid crash
    return {
      messages: {
        common: {
          loading: 'Loading...',
          error: 'Error',
        },
      },
    };
  }
});
