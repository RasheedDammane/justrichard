import { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import Hero from '@/components/Hero';
import ProcessSteps from '@/components/ProcessSteps';

interface ServicePageProps {
  params: {
    locale: string;
  };
}

export const metadata: Metadata = {
  title: 'Translators | CommunityHub',
  description: 'Expert translation services in multiple languages',
};

export default async function translationPage({ params }: ServicePageProps) {
  const { locale } = params;

  // Process steps
  const processSteps = [
    {
      number: 1,
      icon: '🔍',
      title: 'Browse Professionals',
      description: 'Explore verified translators in your area.',
    },
    {
      number: 2,
      icon: '📅',
      title: 'Book Service',
      description: 'Select your preferred professional and schedule.',
    },
    {
      number: 3,
      icon: '✅',
      title: 'Get Confirmed',
      description: 'Receive instant confirmation with details.',
    },
    {
      number: 4,
      icon: '⭐',
      title: 'Rate & Review',
      description: 'Share your experience and help others.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <Hero
        icon="🌐"
        tagline="Professional Services"
        title="Translators"
        subtitle="Expert translation services in multiple languages"
        description="Connect with verified translators who are rated and reviewed by customers."
        ctaText="Browse Professionals"
        ctaLink={`/${locale}/api/translators`}
        secondaryCtaText="How It Works"
        secondaryCtaLink="#how-it-works"
        breadcrumbs={[
          { label: 'Home', href: `/${locale}` },
          { label: 'Services', href: `/${locale}/services` },
          { label: 'Translators' },
        ]}
      />

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Our Translators Services
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">🌐</div>
                <h3 className="text-xl font-bold text-gray-900">Document translation</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Professional document translation services by verified experts.
              </p>
              <Link
                href={`/${locale}/api/translators`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Find Professionals →
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">🌐</div>
                <h3 className="text-xl font-bold text-gray-900">Legal translation</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Professional legal translation services by verified experts.
              </p>
              <Link
                href={`/${locale}/api/translators`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Find Professionals →
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">🌐</div>
                <h3 className="text-xl font-bold text-gray-900">Medical translation</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Professional medical translation services by verified experts.
              </p>
              <Link
                href={`/${locale}/api/translators`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Find Professionals →
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">🌐</div>
                <h3 className="text-xl font-bold text-gray-900">Website translation</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Professional website translation services by verified experts.
              </p>
              <Link
                href={`/${locale}/api/translators`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Find Professionals →
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">🌐</div>
                <h3 className="text-xl font-bold text-gray-900">Interpretation</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Professional interpretation services by verified experts.
              </p>
              <Link
                href={`/${locale}/api/translators`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Find Professionals →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <div id="how-it-works">
        <ProcessSteps
          title="How It Works"
          subtitle="Booking translators is easy with CommunityHub"
          steps={processSteps}
        />
      </div>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Why Choose CommunityHub for Translators?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Verified Professionals</h3>
              <p className="text-gray-600">
                All translators are background-checked and verified
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

      {/* CTA */}
      <section className="bg-blue-600 text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Book Translators?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of satisfied customers who trust CommunityHub
          </p>
          <Link
            href={`/${locale}/api/translators`}
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-lg shadow-lg"
          >
            Browse All Professionals
          </Link>
        </div>
      </section>
    </div>
  );
}
