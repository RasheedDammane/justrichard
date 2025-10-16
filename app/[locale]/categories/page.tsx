import { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import Hero from '@/components/Hero';

interface CategoriesPageProps {
  params: {
    locale: string;
  };
}

export const metadata: Metadata = {
  title: 'All Service Categories | CommunityHub',
  description: 'Browse all service categories available on CommunityHub. From home services to professional consultations.',
};

export default async function CategoriesPage({ params }: CategoriesPageProps) {
  const { locale } = params;

  // Fetch all active categories
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    include: {
      translations: {
        where: { locale },
      },
      services: {
        where: { isActive: true },
        select: { id: true },
      },
    },
    orderBy: { order: 'asc' },
  });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <Hero
        icon="🏪"
        tagline="Explore Our Services"
        title="All Categories"
        subtitle="Find the perfect service for your needs"
        description="Browse through our wide range of professional services. From home maintenance to business consultations, we've got you covered."
        breadcrumbs={[
          { label: 'Home', href: `/${locale}` },
          { label: 'Categories' },
        ]}
      />

      {/* Categories Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const translation = category.translations[0];
              if (!translation) return null;

              const serviceCount = category.services.length;

              return (
                <Link
                  key={category.id}
                  href={`/${locale}/categories/${category.slug}`}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all transform hover:-translate-y-1 text-center group"
                >
                  {/* Icon */}
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>

                  {/* Name */}
                  <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {translation.name}
                  </h3>

                  {/* Description */}
                  {translation.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {translation.description}
                    </p>
                  )}

                  {/* Service Count */}
                  <div className="text-sm text-blue-600 font-medium">
                    {serviceCount} {serviceCount === 1 ? 'service' : 'services'}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Most Popular Categories
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {categories.slice(0, 3).map((category) => {
              const translation = category.translations[0];
              if (!translation) return null;

              return (
                <Link
                  key={category.id}
                  href={`/${locale}/categories/${category.slug}`}
                  className="bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <div className="text-4xl mr-4">{category.icon}</div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900">
                        {translation.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {category.services.length} services available
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {translation.description}
                  </p>
                  <span className="text-blue-600 font-medium hover:underline">
                    Explore {translation.name} →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
