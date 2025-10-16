import { Locale, defaultLocale } from './config';
import en from './locales/en.json';
import ar from './locales/ar.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import de from './locales/de.json';
import ru from './locales/ru.json';
import th from './locales/th.json';
import vi from './locales/vi.json';
import ko from './locales/ko.json';

const translations: Record<Locale, any> = {
  en,
  ar,
  fr,
  es,
  de,
  ru,
  th,
  vi,
  ko,
};

export function getTranslations(locale: Locale = defaultLocale) {
  return translations[locale] || translations[defaultLocale];
}

export function translate(
  locale: Locale,
  key: string,
  params?: Record<string, string | number>
): string {
  const keys = key.split('.');
  let value: any = translations[locale] || translations[defaultLocale];

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to English if key not found
      value = translations[defaultLocale];
      for (const fallbackKey of keys) {
        if (value && typeof value === 'object' && fallbackKey in value) {
          value = value[fallbackKey];
        } else {
          return key; // Return key if not found
        }
      }
      break;
    }
  }

  if (typeof value !== 'string') {
    return key;
  }

  // Replace parameters
  if (params) {
    Object.entries(params).forEach(([paramKey, paramValue]) => {
      value = value.replace(new RegExp(`{{${paramKey}}}`, 'g'), String(paramValue));
    });
  }

  return value;
}

// Hook for client components
export function useTranslations(locale: Locale = defaultLocale) {
  return {
    t: (key: string, params?: Record<string, string | number>) =>
      translate(locale, key, params),
    locale,
  };
}
