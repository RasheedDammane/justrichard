/**
 * Schema.org JSON-LD Generator for SEO
 * Similar to RankMath functionality
 */

export interface SchemaOrgBase {
  '@context': string;
  '@type': string;
}

export interface OrganizationSchema extends SchemaOrgBase {
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string;
  description?: string;
  address?: {
    '@type': 'PostalAddress';
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  contactPoint?: {
    '@type': 'ContactPoint';
    telephone?: string;
    contactType?: string;
    email?: string;
  };
  sameAs?: string[];
}

export interface LocalBusinessSchema extends SchemaOrgBase {
  '@type': 'LocalBusiness';
  name: string;
  image: string[];
  '@id': string;
  url: string;
  telephone?: string;
  priceRange?: string;
  address?: {
    '@type': 'PostalAddress';
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  geo?: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
  openingHoursSpecification?: Array<{
    '@type': 'OpeningHoursSpecification';
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }>;
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: number;
    reviewCount: number;
  };
}

export interface ArticleSchema extends SchemaOrgBase {
  '@type': 'Article' | 'BlogPosting';
  headline: string;
  image: string[];
  datePublished: string;
  dateModified: string;
  author: {
    '@type': 'Person';
    name: string;
    url?: string;
  };
  publisher: {
    '@type': 'Organization';
    name: string;
    logo: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  description?: string;
  mainEntityOfPage?: {
    '@type': 'WebPage';
    '@id': string;
  };
}

export interface ServiceSchema extends SchemaOrgBase {
  '@type': 'Service';
  name: string;
  description: string;
  provider: {
    '@type': 'Organization' | 'LocalBusiness';
    name: string;
  };
  areaServed?: {
    '@type': 'City' | 'Country';
    name: string;
  };
  offers?: {
    '@type': 'Offer';
    price: string;
    priceCurrency: string;
    availability?: string;
  };
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: number;
    reviewCount: number;
  };
}

export interface ProductSchema extends SchemaOrgBase {
  '@type': 'Product';
  name: string;
  image: string[];
  description: string;
  sku?: string;
  brand?: {
    '@type': 'Brand';
    name: string;
  };
  offers?: {
    '@type': 'Offer';
    url: string;
    priceCurrency: string;
    price: string;
    availability: string;
    priceValidUntil?: string;
  };
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: number;
    reviewCount: number;
  };
}

export interface FAQSchema extends SchemaOrgBase {
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

export interface BreadcrumbSchema extends SchemaOrgBase {
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }>;
}

export interface ReviewSchema extends SchemaOrgBase {
  '@type': 'Review';
  itemReviewed: {
    '@type': string;
    name: string;
  };
  author: {
    '@type': 'Person';
    name: string;
  };
  reviewRating: {
    '@type': 'Rating';
    ratingValue: number;
    bestRating?: number;
    worstRating?: number;
  };
  reviewBody: string;
  datePublished: string;
}

/**
 * Generate Organization Schema
 */
export function generateOrganizationSchema(data: {
  name: string;
  url: string;
  logo: string;
  description?: string;
  address?: {
    street?: string;
    city?: string;
    region?: string;
    postalCode?: string;
    country?: string;
  };
  phone?: string;
  email?: string;
  socialMedia?: string[];
}): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: data.name,
    url: data.url,
    logo: data.logo,
    description: data.description,
    address: data.address ? {
      '@type': 'PostalAddress',
      streetAddress: data.address.street,
      addressLocality: data.address.city,
      addressRegion: data.address.region,
      postalCode: data.address.postalCode,
      addressCountry: data.address.country,
    } : undefined,
    contactPoint: data.phone || data.email ? {
      '@type': 'ContactPoint',
      telephone: data.phone,
      contactType: 'customer service',
      email: data.email,
    } : undefined,
    sameAs: data.socialMedia,
  };
}

/**
 * Generate Local Business Schema
 */
export function generateLocalBusinessSchema(data: {
  name: string;
  images: string[];
  url: string;
  phone?: string;
  priceRange?: string;
  address?: {
    street?: string;
    city?: string;
    region?: string;
    postalCode?: string;
    country?: string;
  };
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  hours?: Array<{
    days: string[];
    opens: string;
    closes: string;
  }>;
  rating?: {
    value: number;
    count: number;
  };
}): LocalBusinessSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: data.name,
    image: data.images,
    '@id': data.url,
    url: data.url,
    telephone: data.phone,
    priceRange: data.priceRange,
    address: data.address ? {
      '@type': 'PostalAddress',
      streetAddress: data.address.street,
      addressLocality: data.address.city,
      addressRegion: data.address.region,
      postalCode: data.address.postalCode,
      addressCountry: data.address.country,
    } : undefined,
    geo: data.coordinates ? {
      '@type': 'GeoCoordinates',
      latitude: data.coordinates.latitude,
      longitude: data.coordinates.longitude,
    } : undefined,
    openingHoursSpecification: data.hours?.map(h => ({
      '@type': 'OpeningHoursSpecification' as const,
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    aggregateRating: data.rating ? {
      '@type': 'AggregateRating',
      ratingValue: data.rating.value,
      reviewCount: data.rating.count,
    } : undefined,
  };
}

/**
 * Generate Article/Blog Schema
 */
export function generateArticleSchema(data: {
  title: string;
  images: string[];
  publishedDate: string;
  modifiedDate: string;
  author: {
    name: string;
    url?: string;
  };
  publisher: {
    name: string;
    logo: string;
  };
  description?: string;
  url: string;
  type?: 'Article' | 'BlogPosting';
}): ArticleSchema {
  return {
    '@context': 'https://schema.org',
    '@type': data.type || 'Article',
    headline: data.title,
    image: data.images,
    datePublished: data.publishedDate,
    dateModified: data.modifiedDate,
    author: {
      '@type': 'Person',
      name: data.author.name,
      url: data.author.url,
    },
    publisher: {
      '@type': 'Organization',
      name: data.publisher.name,
      logo: {
        '@type': 'ImageObject',
        url: data.publisher.logo,
      },
    },
    description: data.description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': data.url,
    },
  };
}

/**
 * Generate Service Schema
 */
export function generateServiceSchema(data: {
  name: string;
  description: string;
  provider: {
    name: string;
    type?: 'Organization' | 'LocalBusiness';
  };
  area?: {
    name: string;
    type?: 'City' | 'Country';
  };
  price?: {
    amount: string;
    currency: string;
    availability?: string;
  };
  rating?: {
    value: number;
    count: number;
  };
}): ServiceSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.name,
    description: data.description,
    provider: {
      '@type': data.provider.type || 'Organization',
      name: data.provider.name,
    },
    areaServed: data.area ? {
      '@type': data.area.type || 'City',
      name: data.area.name,
    } : undefined,
    offers: data.price ? {
      '@type': 'Offer',
      price: data.price.amount,
      priceCurrency: data.price.currency,
      availability: data.price.availability || 'https://schema.org/InStock',
    } : undefined,
    aggregateRating: data.rating ? {
      '@type': 'AggregateRating',
      ratingValue: data.rating.value,
      reviewCount: data.rating.count,
    } : undefined,
  };
}

/**
 * Generate FAQ Schema
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): FAQSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question' as const,
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Breadcrumb Schema
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url?: string }>
): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem' as const,
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate Review Schema
 */
export function generateReviewSchema(data: {
  itemType: string;
  itemName: string;
  authorName: string;
  rating: number;
  reviewText: string;
  date: string;
  bestRating?: number;
  worstRating?: number;
}): ReviewSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': data.itemType,
      name: data.itemName,
    },
    author: {
      '@type': 'Person',
      name: data.authorName,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: data.rating,
      bestRating: data.bestRating || 5,
      worstRating: data.worstRating || 1,
    },
    reviewBody: data.reviewText,
    datePublished: data.date,
  };
}
