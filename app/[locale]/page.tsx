import Link from "next/link";
import { loadLocalJson } from "@/app/utils/loadJson";
import { getHomepageData, getPopularCategories, getLatestBlogPosts } from "@/app/services/homepage";

type HomepageStatic = {
  seo?: {
    title?: string;
    description?: string;
  };
  hero?: {
    headline?: string;
    subheadline?: string;
    ctaLabel?: string;
    ctaHref?: string;
  };
  features?: {
    title?: string;
    items?: Array<{
      id: string;
      icon: string;
      title: string;
      description: string;
    }>;
  };
  specialServices?: {
    title?: string;
    subtitle?: string;
    items?: Array<{
      id: string;
      icon: string;
      title: string;
      subtitle: string;
      href: string;
    }>;
  };
  processSteps?: {
    title?: string;
    subtitle?: string;
    steps?: Array<{
      number: number;
      icon: string;
      title: string;
      description: string;
    }>;
  };
  stats?: {
    title?: string;
    items?: Array<{
      value: string;
      label: string;
    }>;
  };
  cta?: {
    title?: string;
    subtitle?: string;
    primaryButton?: {
      label: string;
      href: string;
    };
    secondaryButton?: {
      label: string;
      href: string;
    };
  };
};

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const lang = params.locale || "en";
  const staticData = await loadLocalJson<HomepageStatic>(lang, "homepage.json");
  
  return {
    title: staticData?.seo?.title || "JustRichard",
    description: staticData?.seo?.description || "Your trusted service platform",
  };
}

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const lang = params.locale || "en";

  // Charger les données statiques (toujours disponibles)
  const staticData = await loadLocalJson<HomepageStatic>(lang, "homepage.json");

  // Tenter de charger les données dynamiques (fallback si erreur)
  let dynamicData: Partial<HomepageStatic> | null = null;
  let categories: any[] = [];
  let blogPosts: any[] = [];

  try {
    dynamicData = await getHomepageData(lang);
  } catch (e) {
    console.warn("⚠️ Impossible de charger les données dynamiques de la homepage");
  }

  try {
    categories = await getPopularCategories(lang, 12);
  } catch (e) {
    console.warn("⚠️ Impossible de charger les catégories");
  }

  try {
    blogPosts = await getLatestBlogPosts(3);
  } catch (e) {
    console.warn("⚠️ Impossible de charger les articles de blog");
  }

  // Merge: données dynamiques prioritaires, fallback sur statiques
  const data: HomepageStatic = {
    ...staticData,
    ...dynamicData,
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {data.hero?.headline || "Find Trusted Professionals"}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            {data.hero?.subheadline || "Connect with verified service providers"}
          </p>
          {data.hero?.ctaLabel && data.hero?.ctaHref && (
            <Link
              href={data.hero.ctaHref}
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              {data.hero.ctaLabel}
            </Link>
          )}
        </div>
      </section>

      {/* Features Section */}
      {data.features?.items && data.features.items.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              {data.features.title || "Why Choose Us"}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.features.items.map((feature) => (
                <div key={feature.id} className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">{feature.icon}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Special Services Section */}
      {data.specialServices?.items && data.specialServices.items.length > 0 && (
        <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {data.specialServices.title || "Special Services"}
              </h2>
              <p className="text-gray-600 text-lg">
                {data.specialServices.subtitle || "Premium services for all your needs"}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {data.specialServices.items.map((service) => (
                <Link
                  key={service.id}
                  href={service.href}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:-translate-y-2 text-center group border-2 border-transparent hover:border-blue-500"
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs text-gray-500">{service.subtitle}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold">Popular Categories</h2>
              <Link href={`/${lang}/categories`} className="text-blue-600 hover:underline">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/${lang}/categories/${category.slug}`}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all transform hover:-translate-y-1 text-center group"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                    {category.icon || "📁"}
                  </div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <div className="text-sm text-gray-500 mt-1">
                    {category.serviceCount} services
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Steps Section */}
      {data.processSteps?.steps && data.processSteps.steps.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {data.processSteps.title || "How It Works"}
              </h2>
              <p className="text-gray-600 text-lg">
                {data.processSteps.subtitle || "Book professional services in simple steps"}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.processSteps.steps.map((step) => (
                <div key={step.number} className="text-center">
                  <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {step.number}
                  </div>
                  <div className="text-4xl mb-3">{step.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      {data.stats?.items && data.stats.items.length > 0 && (
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              {data.stats.title || "Platform Statistics"}
            </h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {data.stats.items.map((stat, index) => (
                <div key={index}>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Section */}
      {blogPosts.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold">Latest from Blog</h2>
              <Link href={`/${lang}/blog`} className="text-blue-600 hover:underline">
                View All →
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/${lang}/blog/${post.slug}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {post.coverImage && (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{new Date(post.publishedAt!).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {data.cta && (
        <section className="bg-blue-600 text-white py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold mb-4">{data.cta.title}</h2>
            <p className="text-xl mb-8 text-blue-100">{data.cta.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {data.cta.primaryButton && (
                <Link
                  href={data.cta.primaryButton.href}
                  className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  {data.cta.primaryButton.label}
                </Link>
              )}
              {data.cta.secondaryButton && (
                <Link
                  href={data.cta.secondaryButton.href}
                  className="inline-block bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors border-2 border-white"
                >
                  {data.cta.secondaryButton.label}
                </Link>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
