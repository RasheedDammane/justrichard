import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default async function ServicesPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: { category?: string };
}) {
  const services = await prisma.service.findMany({
    where: {
      isActive: true,
      ...(searchParams.category && {
        category: { slug: searchParams.category },
      }),
    },
    include: {
      translations: { where: { locale } },
      category: { include: { translations: { where: { locale } } } },
    },
    orderBy: { isFeatured: 'desc' },
  });

  const categories = await prisma.category.findMany({
    where: { isActive: true },
    include: { translations: { where: { locale } } },
    orderBy: { order: 'asc' },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-600 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold">Our Services</h1>
          <p className="text-primary-100 mt-2">Professional services at your doorstep</p>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-lg mb-4">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href={`/${locale}/services`}
                    className={`block px-3 py-2 rounded hover:bg-gray-100 ${
                      !searchParams.category ? 'bg-primary-50 text-primary-600' : ''
                    }`}
                  >
                    All Services
                  </Link>
                </li>
                {categories.map((category) => {
                  const translation = category.translations[0];
                  return (
                    <li key={category.id}>
                      <Link
                        href={`/${locale}/services?category=${category.slug}`}
                        className={`block px-3 py-2 rounded hover:bg-gray-100 ${
                          searchParams.category === category.slug
                            ? 'bg-primary-50 text-primary-600'
                            : ''
                        }`}
                      >
                        <span className="mr-2">{category.icon}</span>
                        {translation?.name || category.slug}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* Services Grid */}
          <main className="flex-1">
            <div className="mb-6">
              <p className="text-gray-600">{services.length} services found</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => {
                const translation = service.translations[0];
                const categoryTranslation = service.category.translations[0];
                return (
                  <Link
                    key={service.id}
                    href={`/${locale}/services/${service.slug}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600"></div>
                    <div className="p-6">
                      <div className="text-sm text-primary-600 mb-2">
                        {categoryTranslation?.name}
                      </div>
                      <h3 className="font-semibold text-xl mb-2">{translation?.name}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {translation?.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-2xl font-bold text-primary-600">
                            ${service.basePrice}
                          </span>
                          <span className="text-sm text-gray-500 ml-2">
                            {service.duration} min
                          </span>
                        </div>
                        {service.rating && (
                          <div className="flex items-center">
                            <span className="text-yellow-500">★</span>
                            <span className="ml-1 text-sm font-semibold">
                              {service.rating}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
