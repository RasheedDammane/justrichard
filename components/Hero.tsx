'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

interface HeroProps {
  title: string;
  subtitle?: string;
  tagline?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  icon?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

export default function Hero({
  title,
  subtitle,
  tagline,
  description,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  backgroundImage,
  backgroundColor = 'from-blue-600 to-blue-800',
  icon,
  breadcrumbs,
}: HeroProps) {
  const params = useParams();
  const locale = params.locale as string;

  return (
    <section
      className={`relative py-16 md:py-24 px-4 ${
        backgroundImage ? 'bg-cover bg-center' : `bg-gradient-to-br ${backgroundColor}`
      } text-white`}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
    >
      {backgroundImage && (
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      )}
      
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-6 text-sm">
            <ol className="flex items-center space-x-2">
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && <span className="mx-2 text-blue-200">/</span>}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="text-blue-100 hover:text-white transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white font-medium">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="text-center max-w-4xl mx-auto">
          {/* Icon */}
          {icon && (
            <div className="text-6xl md:text-7xl mb-6 animate-bounce">
              {icon}
            </div>
          )}

          {/* Tagline */}
          {tagline && (
            <p className="text-blue-200 text-sm md:text-base uppercase tracking-wider font-semibold mb-3">
              {tagline}
            </p>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <h2 className="text-xl md:text-2xl lg:text-3xl font-medium mb-6 text-blue-100">
              {subtitle}
            </h2>
          )}

          {/* Description */}
          {description && (
            <p className="text-lg md:text-xl mb-8 text-blue-50 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          )}

          {/* CTAs */}
          {(ctaText || secondaryCtaText) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {ctaText && ctaLink && (
                <Link
                  href={ctaLink}
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                >
                  {ctaText}
                </Link>
              )}
              {secondaryCtaText && secondaryCtaLink && (
                <Link
                  href={secondaryCtaLink}
                  className="bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors text-lg border-2 border-white shadow-lg"
                >
                  {secondaryCtaText}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
