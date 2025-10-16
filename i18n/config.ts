export const locales = ['en', 'ar', 'fr', 'es', 'de', 'ru', 'th', 'vi', 'ko'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
  fr: 'Français',
  es: 'Español',
  de: 'Deutsch',
  ru: 'Русский',
  th: 'ไทย',
  vi: 'Tiếng Việt',
  ko: '한국어',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  ar: '🇸🇦',
  fr: '🇫🇷',
  es: '🇪🇸',
  de: '🇩🇪',
  ru: '🇷🇺',
  th: '🇹🇭',
  vi: '🇻🇳',
  ko: '🇰🇷',
};

export const rtlLocales: Locale[] = ['ar'];

export function isRTL(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}
