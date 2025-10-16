/**
 * SEO Meta Tags Generator
 * Similar to RankMath meta optimization
 */

export interface MetaTags {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  ogUrl?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterSite?: string;
  twitterCreator?: string;
  alternateLanguages?: Array<{
    lang: string;
    url: string;
  }>;
}

/**
 * Generate optimized meta title
 */
export function generateMetaTitle(
  title: string,
  options?: {
    siteName?: string;
    separator?: string;
    maxLength?: number;
    appendSiteName?: boolean;
  }
): string {
  const {
    siteName = 'CommunityHub',
    separator = '|',
    maxLength = 60,
    appendSiteName = true,
  } = options || {};

  let metaTitle = title.trim();

  // Append site name if requested
  if (appendSiteName && siteName) {
    const fullTitle = `${metaTitle} ${separator} ${siteName}`;
    if (fullTitle.length <= maxLength) {
      metaTitle = fullTitle;
    }
  }

  // Truncate if too long
  if (metaTitle.length > maxLength) {
    metaTitle = metaTitle.substring(0, maxLength - 3) + '...';
  }

  return metaTitle;
}

/**
 * Generate optimized meta description
 */
export function generateMetaDescription(
  description: string,
  options?: {
    maxLength?: number;
    keywords?: string[];
  }
): string {
  const {
    maxLength = 160,
    keywords = [],
  } = options || {};

  let metaDescription = description.trim();

  // Try to include keywords if not present
  if (keywords.length > 0) {
    const lowerDesc = metaDescription.toLowerCase();
    const missingKeywords = keywords.filter(
      keyword => !lowerDesc.includes(keyword.toLowerCase())
    );

    if (missingKeywords.length > 0 && metaDescription.length < maxLength - 20) {
      const keywordPhrase = missingKeywords.slice(0, 2).join(', ');
      metaDescription = `${metaDescription} ${keywordPhrase}`;
    }
  }

  // Truncate if too long
  if (metaDescription.length > maxLength) {
    metaDescription = metaDescription.substring(0, maxLength - 3) + '...';
  }

  return metaDescription;
}

/**
 * Generate complete meta tags
 */
export function generateMetaTags(data: {
  title: string;
  description: string;
  keywords?: string[];
  url: string;
  image?: string;
  type?: string;
  siteName?: string;
  locale?: string;
  alternateLanguages?: Array<{
    lang: string;
    url: string;
  }>;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}): MetaTags {
  const metaTitle = generateMetaTitle(data.title, {
    siteName: data.siteName,
  });

  const metaDescription = generateMetaDescription(data.description, {
    keywords: data.keywords,
  });

  return {
    // Basic meta tags
    title: metaTitle,
    description: metaDescription,
    keywords: data.keywords,
    canonical: data.url,
    robots: 'index, follow',

    // Open Graph tags
    ogTitle: data.title,
    ogDescription: data.description,
    ogImage: data.image,
    ogType: data.type || 'website',
    ogUrl: data.url,

    // Twitter Card tags
    twitterCard: data.image ? 'summary_large_image' : 'summary',
    twitterTitle: data.title,
    twitterDescription: data.description,
    twitterImage: data.image,
    twitterSite: '@communityhub',
    twitterCreator: data.author ? `@${data.author}` : undefined,

    // Alternate languages
    alternateLanguages: data.alternateLanguages,
  };
}

/**
 * Generate meta tags for blog post
 */
export function generateBlogMetaTags(data: {
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  author: string;
  publishedDate: string;
  modifiedDate: string;
  featuredImage?: string;
  categories: string[];
  tags: string[];
  locale: string;
  baseUrl: string;
}): MetaTags {
  const url = `${data.baseUrl}/blog/${data.slug}`;
  
  // Extract keywords from categories and tags
  const keywords = [...data.categories, ...data.tags].slice(0, 10);

  // Generate description from excerpt or content
  const description = data.excerpt || data.content.substring(0, 160);

  return generateMetaTags({
    title: data.title,
    description,
    keywords,
    url,
    image: data.featuredImage,
    type: 'article',
    locale: data.locale,
    author: data.author,
    publishedTime: data.publishedDate,
    modifiedTime: data.modifiedDate,
  });
}

/**
 * Generate meta tags for service page
 */
export function generateServiceMetaTags(data: {
  name: string;
  description: string;
  slug: string;
  price?: number;
  currency?: string;
  rating?: number;
  reviewCount?: number;
  image?: string;
  category: string;
  locale: string;
  baseUrl: string;
}): MetaTags {
  const url = `${data.baseUrl}/services/${data.slug}`;
  
  // Build rich description
  let richDescription = data.description;
  if (data.price) {
    richDescription += ` Starting from ${data.currency} ${data.price}.`;
  }
  if (data.rating) {
    richDescription += ` Rated ${data.rating}/5 by ${data.reviewCount} customers.`;
  }

  const keywords = [
    data.name,
    data.category,
    'service',
    'professional',
    'Dubai',
  ];

  return generateMetaTags({
    title: `${data.name} - Professional Service`,
    description: richDescription,
    keywords,
    url,
    image: data.image,
    type: 'product',
    locale: data.locale,
  });
}

/**
 * Generate meta tags for partner/professional page
 */
export function generatePartnerMetaTags(data: {
  name: string;
  profession: string;
  description: string;
  slug: string;
  city: string;
  country: string;
  rating?: number;
  reviewCount?: number;
  image?: string;
  specializations?: string[];
  locale: string;
  baseUrl: string;
  partnerType: string;
}): MetaTags {
  const url = `${data.baseUrl}/${data.partnerType}/${data.slug}`;
  
  // Build rich description
  let richDescription = `${data.name} - ${data.profession} in ${data.city}, ${data.country}. ${data.description}`;
  if (data.rating) {
    richDescription += ` Rated ${data.rating}/5 stars by ${data.reviewCount} clients.`;
  }

  const keywords = [
    data.name,
    data.profession,
    data.city,
    data.country,
    ...(data.specializations || []),
  ];

  return generateMetaTags({
    title: `${data.name} - ${data.profession} in ${data.city}`,
    description: richDescription,
    keywords,
    url,
    image: data.image,
    type: 'profile',
    locale: data.locale,
  });
}

/**
 * Generate meta tags for building page
 */
export function generateBuildingMetaTags(data: {
  name: string;
  description: string;
  slug: string;
  developer?: string;
  city: string;
  country: string;
  buildingType: string;
  rating?: number;
  reviewCount?: number;
  images?: string[];
  amenities?: string[];
  locale: string;
  baseUrl: string;
}): MetaTags {
  const url = `${data.baseUrl}/buildings/${data.slug}`;
  
  // Build rich description
  let richDescription = `${data.name} - ${data.buildingType} in ${data.city}, ${data.country}.`;
  if (data.developer) {
    richDescription += ` Developed by ${data.developer}.`;
  }
  richDescription += ` ${data.description}`;
  if (data.rating) {
    richDescription += ` Rated ${data.rating}/5 by ${data.reviewCount} residents.`;
  }

  const keywords = [
    data.name,
    data.buildingType,
    data.city,
    data.country,
    data.developer || '',
    ...(data.amenities || []).slice(0, 5),
  ].filter(Boolean);

  return generateMetaTags({
    title: `${data.name} - ${data.buildingType} in ${data.city}`,
    description: richDescription,
    keywords,
    url,
    image: data.images?.[0],
    type: 'place',
    locale: data.locale,
  });
}

/**
 * Generate robots meta tag
 */
export function generateRobotsMeta(options: {
  index?: boolean;
  follow?: boolean;
  noarchive?: boolean;
  nosnippet?: boolean;
  noimageindex?: boolean;
}): string {
  const {
    index = true,
    follow = true,
    noarchive = false,
    nosnippet = false,
    noimageindex = false,
  } = options;

  const directives: string[] = [];
  
  directives.push(index ? 'index' : 'noindex');
  directives.push(follow ? 'follow' : 'nofollow');
  
  if (noarchive) directives.push('noarchive');
  if (nosnippet) directives.push('nosnippet');
  if (noimageindex) directives.push('noimageindex');

  return directives.join(', ');
}

/**
 * Extract keywords from text
 */
export function extractKeywords(text: string, count: number = 10): string[] {
  // Remove common words
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been',
    'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
    'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those',
  ]);

  // Extract words
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.has(word));

  // Count frequency
  const frequency = new Map<string, number>();
  words.forEach(word => {
    frequency.set(word, (frequency.get(word) || 0) + 1);
  });

  // Sort by frequency and return top keywords
  return Array.from(frequency.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([word]) => word);
}
