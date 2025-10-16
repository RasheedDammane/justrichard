/**
 * Get localized name from an object with multiple language fields
 * Supports: EN (default), FR, AR, TH, RU, KO, ES, VI, TL
 */
export function getLocalizedName(
  item: any,
  locale: string = 'en',
  fallbackToEnglish: boolean = true
): string {
  if (!item) return '';

  // Map locale codes to field names
  const localeFieldMap: Record<string, string> = {
    en: 'name',
    fr: 'nameFr',
    ar: 'nameAr',
    th: 'nameTh',
    ru: 'nameRu',
    ko: 'nameKo',
    es: 'nameEs',
    vi: 'nameVi',
    tl: 'nameTl',
  };

  const fieldName = localeFieldMap[locale.toLowerCase()] || 'name';
  const localizedValue = item[fieldName];

  // Return localized value if exists
  if (localizedValue) {
    return localizedValue;
  }

  // Fallback to English if enabled
  if (fallbackToEnglish && item.name) {
    return item.name;
  }

  // Last resort: return first available translation
  for (const field of Object.values(localeFieldMap)) {
    if (item[field]) {
      return item[field];
    }
  }

  return '';
}

/**
 * Get all available translations for an item
 */
export function getAllTranslations(item: any): Record<string, string> {
  if (!item) return {};

  return {
    en: item.name || '',
    fr: item.nameFr || '',
    ar: item.nameAr || '',
    th: item.nameTh || '',
    ru: item.nameRu || '',
    ko: item.nameKo || '',
    es: item.nameEs || '',
    vi: item.nameVi || '',
    tl: item.nameTl || '',
  };
}

/**
 * Check if an item has translation for a specific locale
 */
export function hasTranslation(item: any, locale: string): boolean {
  if (!item) return false;

  const localeFieldMap: Record<string, string> = {
    en: 'name',
    fr: 'nameFr',
    ar: 'nameAr',
    th: 'nameTh',
    ru: 'nameRu',
    ko: 'nameKo',
    es: 'nameEs',
    vi: 'nameVi',
    tl: 'nameTl',
  };

  const fieldName = localeFieldMap[locale.toLowerCase()];
  return fieldName ? !!item[fieldName] : false;
}

/**
 * Get translation completeness percentage
 */
export function getTranslationCompleteness(item: any): number {
  if (!item) return 0;

  const translations = getAllTranslations(item);
  const totalLanguages = Object.keys(translations).length;
  const completedTranslations = Object.values(translations).filter(v => v !== '').length;

  return Math.round((completedTranslations / totalLanguages) * 100);
}

/**
 * Supported languages
 */
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', direction: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', direction: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', direction: 'rtl' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', direction: 'ltr' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', direction: 'ltr' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', direction: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', direction: 'ltr' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', direction: 'ltr' },
  { code: 'tl', name: 'Tagalog', nativeName: 'Tagalog', direction: 'ltr' },
];
