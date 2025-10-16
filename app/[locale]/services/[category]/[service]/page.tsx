import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Star, Clock, DollarSign, Shield, Award, TrendingUp, Users } from 'lucide-react';

interface ServicePageProps {
  params: {
    locale: string;
    category: string;
    service: string;
  };
}

async function getServiceData(serviceSlug: string, locale: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(
    `${baseUrl}/api/services?locale=${locale}`,
    { cache: 'no-store' }
  );

  if (!res.ok) return null;

  const services = await res.json();
  const service = services.find((s: any) => s.slug === serviceSlug);
  
  return service || null;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const service = await getServiceData(params.service, params.locale);

  if (!service) {
    notFound();
  }

  const translation = service.translations[0];
  const categoryTranslation = service.category?.translations?.[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href={`/${params.locale}`} className="hover:text-primary-600">
              Home
            </Link>
            <span>/</span>
            <Link href={`/${params.locale}/services`} className="hover:text-primary-600">
              Services
            </Link>
            <span>/</span>
            <Link
              href={`/${params.locale}/services/${params.category}`}
              className="hover:text-primary-600"
            >
              {categoryTranslation?.name || params.category}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{translation?.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {translation?.name}
              </h1>
              <p className="text-xl text-primary-100 mb-6">
                {translation?.description}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{service.rating || '4.8'}</span>
                  <span className="text-primary-100">({service.totalReviews || 120} reviews)</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Users className="w-5 h-5" />
                  <span>{service.totalBookings || 500}+ bookings</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/${params.locale}/booking?service=${service.id}`}
                  className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
                >
                  <span>Book Now</span>
                  <DollarSign className="w-5 h-5" />
                </Link>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                  Get Quote
                </button>
              </div>
            </div>

            <div className="relative">
              {service.image && (
                <img
                  src={service.image}
                  alt={translation?.name}
                  className="rounded-lg shadow-2xl w-full h-96 object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-12 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">From ${service.basePrice}</h3>
              <p className="text-gray-600 text-sm">Transparent Pricing</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{service.duration} mins</h3>
              <p className="text-gray-600 text-sm">Service Duration</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">100% Guaranteed</h3>
              <p className="text-gray-600 text-sm">Quality Assurance</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Verified Pros</h3>
              <p className="text-gray-600 text-sm">Trusted Professionals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* What's Included */}
              <div className="bg-white rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                  What's Included
                </h2>
                <ul className="space-y-3">
                  {translation?.includes?.map((item: string, index: number) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What's Not Included */}
              {translation?.excludes && translation.excludes.length > 0 && (
                <div className="bg-white rounded-lg p-6 mb-6">
                  <h2 className="text-2xl font-bold mb-4">What's Not Included</h2>
                  <ul className="space-y-3">
                    {translation.excludes.map((item: string, index: number) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Description */}
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Service Description</h2>
                <div className="prose max-w-none text-gray-700">
                  <p>{translation?.description}</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Booking Card */}
              <div className="bg-white rounded-lg p-6 shadow-lg sticky top-4">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    ${service.basePrice}
                  </div>
                  <p className="text-gray-600">Starting price</p>
                </div>

                <Link
                  href={`/${params.locale}/booking?service=${service.id}`}
                  className="block w-full bg-primary-600 text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors mb-4"
                >
                  Book This Service
                </Link>

                <button className="w-full border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors mb-6">
                  Request Quote
                </button>

                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">Why Book With Us?</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Verified professionals</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Money-back guarantee</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>24/7 customer support</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Secure payment</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Services */}
      <section className="py-12 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold mb-8">Related Services</h2>
          <div className="text-center text-gray-600">
            <Link
              href={`/${params.locale}/services/${params.category}`}
              className="text-primary-600 hover:underline"
            >
              View all {categoryTranslation?.name} services →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export async function generateMetadata({ params }: ServicePageProps) {
  const service = await getServiceData(params.service, params.locale);
  
  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  const translation = service.translations[0];

  return {
    title: translation?.seoTitle || `${translation?.name} | Professional Services`,
    description: translation?.seoDescription || translation?.description,
    keywords: translation?.name,
  };
}
