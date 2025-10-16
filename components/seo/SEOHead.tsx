import Head from 'next/head';
import { MetaTags } from '@/lib/seo/meta-generator';

interface SEOHeadProps {
  meta: MetaTags;
  schema?: any | any[];
}

/**
 * SEO Head component
 * Injects meta tags and JSON-LD schema
 */
export default function SEOHead({ meta, schema }: SEOHeadProps) {
  const schemas = Array.isArray(schema) ? schema : schema ? [schema] : [];

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      {meta.keywords && meta.keywords.length > 0 && (
        <meta name="keywords" content={meta.keywords.join(', ')} />
      )}
      
      {/* Canonical URL */}
      {meta.canonical && <link rel="canonical" href={meta.canonical} />}
      
      {/* Robots */}
      {meta.robots && <meta name="robots" content={meta.robots} />}

      {/* Open Graph Tags */}
      {meta.ogTitle && <meta property="og:title" content={meta.ogTitle} />}
      {meta.ogDescription && <meta property="og:description" content={meta.ogDescription} />}
      {meta.ogImage && <meta property="og:image" content={meta.ogImage} />}
      {meta.ogType && <meta property="og:type" content={meta.ogType} />}
      {meta.ogUrl && <meta property="og:url" content={meta.ogUrl} />}
      <meta property="og:site_name" content="CommunityHub" />

      {/* Twitter Card Tags */}
      {meta.twitterCard && <meta name="twitter:card" content={meta.twitterCard} />}
      {meta.twitterTitle && <meta name="twitter:title" content={meta.twitterTitle} />}
      {meta.twitterDescription && <meta name="twitter:description" content={meta.twitterDescription} />}
      {meta.twitterImage && <meta name="twitter:image" content={meta.twitterImage} />}
      {meta.twitterSite && <meta name="twitter:site" content={meta.twitterSite} />}
      {meta.twitterCreator && <meta name="twitter:creator" content={meta.twitterCreator} />}

      {/* Alternate Language Links */}
      {meta.alternateLanguages && meta.alternateLanguages.map((alt) => (
        <link
          key={alt.lang}
          rel="alternate"
          hrefLang={alt.lang}
          href={alt.url}
        />
      ))}

      {/* JSON-LD Schema */}
      {schemas.map((schemaData, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData, null, 2),
          }}
        />
      ))}

      {/* Additional SEO Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="CommunityHub" />
    </Head>
  );
}
