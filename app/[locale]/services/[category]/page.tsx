import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Star, MapPin, Clock, TrendingUp } from 'lucide-react';

interface CategoryPageProps {
  params: {
    locale: string;
    category: string;
  };
}

async function getCategoryData(slug: string, locale: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/categories/${slug}?locale=${locale}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const data = await getCategoryData(params.category, params.locale);

  if (!data || !data.category) {
    notFound();
  }

  const { category } = data;
  const translation = category.translations[0];
  const services = category.services || [];
  const featuredServices = services.filter((s: any) => s.isFeatured).slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-5xl">{category.icon}</span>
              <h1 className="text-4xl md:text-5xl font-bold">
                {translation?.name || category.slug}
              </h1>
            </div>
            <p className="text-xl text-primary-100 mb-6">
              {translation?.description}
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm">Verified Pros</span>
                </div>
                <p className="text-2xl font-bold mt-1">{category._count.services}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5" />
                  <span className="text-sm">Avg Rating</span>
                </div>
                <p className="text-2xl font-bold mt-1">4.8</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-sm">Bookings</span>
                </div>
                <p className="text-2xl font-bold mt-1">10k+</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm">Fast Response</span>
                </div>
                <p className="text-2xl font-bold mt-1">&lt;2h</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      {featuredServices.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className="text-3xl font-bold mb-8">Featured Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredServices.map((service: any) => {
                const serviceTranslation = service.translations[0];
                return (
                  <Link
                    key={service.id}
                    href={`/${params.locale}/services/${params.category}/${service.slug}`}
                    className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
                      <span className="text-5xl">{category.icon}</span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary-600 line-clamp-2">
                        {serviceTranslation?.name}
                      </h3>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{service.rating || '4.8'}</span>
                        </div>
                        <span className="text-primary-600 font-semibold">
                          ${service.basePrice}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {serviceTranslation?.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* How it Works */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="font-semibold text-xl mb-2">Choose a Service</h3>
              <p className="text-gray-600">Browse our verified professionals and select the perfect service for your needs</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="font-semibold text-xl mb-2">Book & Schedule</h3>
              <p className="text-gray-600">Pick your preferred date and time, and confirm your booking instantly</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="font-semibold text-xl mb-2">Get It Done</h3>
              <p className="text-gray-600">Our professional arrives on time and delivers quality service</p>
            </div>
          </div>
        </div>
      </section>

      {/* All Services List */}
      <section className="py-12 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold mb-8">
            All {translation?.name} Services ({services.length})
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service: any) => {
              const serviceTranslation = service.translations[0];
              return (
                <Link
                  key={service.id}
                  href={`/${params.locale}/services/${params.category}/${service.slug}`}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all group"
                >
                  <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 group-hover:text-primary-600 truncate">
                      {serviceTranslation?.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>From ${service.basePrice}</span>
                      {service.rating && (
                        <>
                          <span>•</span>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                            <span>{service.rating}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Verified Professionals</h3>
              <p className="text-gray-600">All service providers are thoroughly vetted and verified</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">100% satisfaction guaranteed or your money back</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Fast Response</h3>
              <p className="text-gray-600">Get quotes and confirmations within 2 hours</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Local Experts</h3>
              <p className="text-gray-600">Trusted professionals in your area</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Browse our {category._count.services}+ verified professionals and book your service today
          </p>
          <Link
            href={`/${params.locale}/services`}
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            View All Services
          </Link>
        </div>
      </section>
    </div>
  );
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const data = await getCategoryData(params.category, params.locale);
  
  if (!data || !data.category) {
    return {
      title: 'Category Not Found',
    };
  }

  const translation = data.category.translations[0];

  return {
    title: translation?.seoTitle || `${translation?.name} Services | CommunityHub`,
    description: translation?.seoDescription || translation?.description,
  };
}
