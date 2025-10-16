/**
 * SEO-friendly slug generator
 * Similar to RankMath slug optimization
 */

/**
 * Generate SEO-friendly slug from text
 */
export function generateSlug(text: string, options?: {
  maxLength?: number;
  separator?: string;
  lowercase?: boolean;
}): string {
  const {
    maxLength = 60,
    separator = '-',
    lowercase = true,
  } = options || {};

  let slug = text;

  // Convert to lowercase if needed
  if (lowercase) {
    slug = slug.toLowerCase();
  }

  // Remove accents and special characters
  slug = slug
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  // Replace spaces and special characters with separator
  slug = slug
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, separator)
    .replace(new RegExp(`${separator}+`, 'g'), separator);

  // Remove leading/trailing separators
  slug = slug.replace(new RegExp(`^${separator}+|${separator}+$`, 'g'), '');

  // Truncate to max length
  if (slug.length > maxLength) {
    slug = slug.substring(0, maxLength);
    // Remove trailing separator if truncation created one
    slug = slug.replace(new RegExp(`${separator}+$`), '');
  }

  return slug;
}

/**
 * Generate unique slug by checking database
 */
export async function generateUniqueSlug(
  text: string,
  checkExists: (slug: string) => Promise<boolean>,
  options?: {
    maxLength?: number;
    separator?: string;
  }
): Promise<string> {
  let slug = generateSlug(text, options);
  let counter = 1;
  let uniqueSlug = slug;

  while (await checkExists(uniqueSlug)) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
}

/**
 * Generate slug from multilingual text
 */
export function generateMultilingualSlug(
  texts: Record<string, string>,
  primaryLocale: string = 'en'
): string {
  const primaryText = texts[primaryLocale] || texts['en'] || Object.values(texts)[0];
  return generateSlug(primaryText);
}

/**
 * Validate slug format
 */
export function isValidSlug(slug: string): boolean {
  // Check if slug contains only lowercase letters, numbers, and hyphens
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
}

/**
 * Optimize slug for SEO
 */
export function optimizeSlug(slug: string, keywords?: string[]): string {
  let optimizedSlug = generateSlug(slug);

  // If keywords provided, try to include them
  if (keywords && keywords.length > 0) {
    const slugWords = optimizedSlug.split('-');
    const hasKeyword = keywords.some(keyword =>
      slugWords.includes(keyword.toLowerCase())
    );

    // If no keyword found, prepend the first keyword
    if (!hasKeyword) {
      const firstKeyword = generateSlug(keywords[0]);
      optimizedSlug = `${firstKeyword}-${optimizedSlug}`;
    }
  }

  return optimizedSlug;
}

/**
 * Generate slug variations for A/B testing
 */
export function generateSlugVariations(text: string, count: number = 3): string[] {
  const baseSlug = generateSlug(text);
  const words = text.toLowerCase().split(/\s+/);
  const variations: string[] = [baseSlug];

  // Variation 1: Short version (first 3-4 words)
  if (words.length > 4) {
    variations.push(generateSlug(words.slice(0, 4).join(' ')));
  }

  // Variation 2: With location/category prefix
  const importantWords = words.filter(w => w.length > 3);
  if (importantWords.length > 2) {
    variations.push(generateSlug(importantWords.slice(0, 3).join(' ')));
  }

  // Variation 3: Keyword-focused
  const keywords = words.filter(w => w.length > 4);
  if (keywords.length > 0) {
    variations.push(generateSlug(keywords.slice(0, 3).join(' ')));
  }

  return variations.slice(0, count);
}
