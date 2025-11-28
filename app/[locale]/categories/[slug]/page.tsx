import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import Hero from '@/components/Hero';
import ProcessSteps from '@/components/ProcessSteps';
import { generateMetaTags } from '@/lib/seo/meta-generator';
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/seo/schema-generator';

interface CategoryPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
    include: {
      translations: {
        where: { locale: params.locale },
      },
    },
  });

  if (!category || category.translations.length === 0) {
    return {
      title: 'Category Not Found',
    };
  }

  const translation = category.translations[0];
  
  return {
    title: translation.seoTitle || `${translation.name} | CommunityHub`,
    description: translation.seoDescription || translation.description,
    keywords: translation.name,
    openGraph: {
      title: translation.name,
      description: translation.description || '',
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { locale, slug } = await params;

  // Fetch category with services
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      translations: {
        where: { locale },
      },
      services: {
        where: { isActive: true },
        include: {
          translations: {
            where: { locale },
          },
        },
        take: 12,
      },
    },
  });

  if (!category || category.translations.length === 0) {
    notFound();
  }

  const translation = category.translations[0];

  // Group services by subcategory/specialty
  const servicesBySpecialty: Record<string, any[]> = {};
  category.services.forEach((service) => {
    const serviceTranslation = service.translations[0];
    if (serviceTranslation) {
      const specialty = 'General';
      if (!servicesBySpecialty[specialty]) {
        servicesBySpecialty[specialty] = [];
      }
      servicesBySpecialty[specialty].push({
        ...service,
        translation: serviceTranslation,
      });
    }
  });

  // Process steps
  const processSteps = [
    {
      number: 1,
      icon: '🔍',
      title: 'Browse Services',
      description: 'Explore our wide range of professional services in your area.',
    },
    {
      number: 2,
      icon: '📅',
      title: 'Book Online',
      description: 'Select your preferred date and time with just a few clicks.',
    },
    {
      number: 3,
      icon: '✅',
      title: 'Get Confirmed',
      description: 'Receive instant confirmation and professional details.',
    },
    {
      number: 4,
      icon: '⭐',
      title: 'Enjoy Service',
      description: 'Sit back and enjoy quality service from verified professionals.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        icon={category.icon || '🛠️'}
        tagline="Professional Services"
        title={translation.name}
        subtitle={translation.description || ''}
        description={`Find the best ${translation.name.toLowerCase()} services in your area. All professionals are verified and rated by customers.`}
        ctaText="Browse Services"
        ctaLink={`/${locale}/services?category=${slug}`}
        secondaryCtaText="How It Works"
        secondaryCtaLink="#how-it-works"
        breadcrumbs={[
          { label: 'Home', href: `/${locale}` },
          { label: 'Categories', href: `/${locale}/categories` },
          { label: translation.name },
        ]}
      />

      {/* Specialties Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Our {translation.name} Specialties
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(servicesBySpecialty).map(([specialty, services]) => (
              <div
                key={specialty}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{category.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900">{specialty}</h3>
                </div>
                <ul className="space-y-2">
                  {services.slice(0, 5).map((service) => (
                    <li key={service.id}>
                      <Link
                        href={`/${locale}/services/${service.slug}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                      >
                        <span className="mr-2">→</span>
                        {service.translation.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                {services.length > 5 && (
                  <Link
                    href={`/${locale}/services?category=${slug}&specialty=${specialty}`}
                    className="text-sm text-gray-500 hover:text-gray-700 mt-3 inline-block"
                  >
                    View all {services.length} services →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Popular Services</h2>
            <Link
              href={`/${locale}/services?category=${slug}`}
              className="text-blue-600 hover:underline"
            >
              View All →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {category.services.slice(0, 6).map((service) => {
              const serviceTranslation = service.translations[0];
              if (!serviceTranslation) return null;

              return (
                <Link
                  key={service.id}
                  href={`/${locale}/services/${service.slug}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {service.images?.[0] && (
                    <img
                      src={service.images[0]}
                      alt={serviceTranslation.name}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2">
                      {serviceTranslation.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {serviceTranslation.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-600 font-bold">
                        {service.currency} {service.basePrice}
                      </span>
                      <span className="text-sm text-gray-500">
                        {service.duration} min
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <div id="how-it-works">
        <ProcessSteps
          title="How It Works"
          subtitle={`Booking ${translation.name.toLowerCase()} services is easy with CommunityHub`}
          steps={processSteps}
        />
      </div>

      {/* Why Choose Us */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Why Choose CommunityHub for {translation.name}?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Verified Professionals</h3>
              <p className="text-gray-600">
                All service providers are background-checked and verified
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⭐</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Top Rated</h3>
              <p className="text-gray-600">
                Only the best professionals with 4+ star ratings
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Best Prices</h3>
              <p className="text-gray-600">
                Competitive pricing with transparent costs
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Customer support available anytime you need
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Book {translation.name}?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of satisfied customers who trust CommunityHub
          </p>
          <Link
            href={`/${locale}/services?category=${slug}`}
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-lg shadow-lg"
          >
            Browse All Services
          </Link>
        </div>
      </section>
    </div>
  );
}
