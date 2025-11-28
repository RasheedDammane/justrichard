import { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import Hero from '@/components/Hero';
import ProcessSteps from '@/components/ProcessSteps';
import LegalListClient from './LegalListClient';

interface ServicePageProps {
  params: {
    locale: string;
  };
}

export const metadata: Metadata = {
  title: 'Legal Services & Lawyers | JustRichard',
  description: 'Connect with experienced lawyers and legal professionals. Expert legal consultation, contract drafting, and court representation.',
};

export default async function LegalServicesPage({ params }: ServicePageProps) {
  const { locale } = params;

  // Fetch legal professionals from database
  let professionals: any[] = [];
  
  try {
    professionals = await prisma.legalProfessional.findMany({
      where: {
        status: 'PUBLISHED',
        isActive: true,
      },
      orderBy: [
        { featured: 'desc' },
        { priorityOrder: 'asc' },
        { name: 'asc' },
      ],
    });
  } catch (error) {
    console.error('Error fetching legal professionals:', error);
    // Continue with empty array if error
  }

  // Process steps
  const processSteps = [
    {
      number: 1,
      icon: '🔍',
      title: 'Browse Lawyers',
      description: 'Explore verified legal professionals in your area.',
    },
    {
      number: 2,
      icon: '📅',
      title: 'Book Consultation',
      description: 'Select your preferred lawyer and schedule.',
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
        icon="⚖️"
        tagline="Professional Legal Services"
        title="Lawyers & Legal Consultation"
        subtitle="Expert legal advice for personal and business matters"
        description="Connect with experienced lawyers who are rated and reviewed by clients."
        ctaText="Browse Lawyers"
        ctaLink="#lawyers"
        secondaryCtaText="How It Works"
        secondaryCtaLink="#how-it-works"
        breadcrumbs={[
          { label: 'Home', href: `/${locale}` },
          { label: 'Services', href: `/${locale}/services` },
          { label: 'Legal Services' },
        ]}
      />

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Our Legal Services
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">📋</div>
                <h3 className="text-xl font-bold text-gray-900">Legal Consultation</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Expert legal advice for personal and business matters. Get professional guidance on your legal questions.
              </p>
              <a
                href="#lawyers"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Find Lawyers →
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">📝</div>
                <h3 className="text-xl font-bold text-gray-900">Contract Drafting</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Professional contract preparation and review services. Ensure your agreements are legally sound.
              </p>
              <a
                href="#lawyers"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Find Lawyers →
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">⚖️</div>
                <h3 className="text-xl font-bold text-gray-900">Court Representation</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Experienced lawyers to represent you in court proceedings. Protect your rights and interests.
              </p>
              <a
                href="#lawyers"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Find Lawyers →
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">🏢</div>
                <h3 className="text-xl font-bold text-gray-900">Corporate Law</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Business legal services including company formation, compliance, and corporate governance.
              </p>
              <a
                href="#lawyers"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Find Lawyers →
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">👨‍👩‍👧</div>
                <h3 className="text-xl font-bold text-gray-900">Family Law</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Sensitive handling of family matters including divorce, custody, and inheritance issues.
              </p>
              <a
                href="#lawyers"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Find Lawyers →
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">🏠</div>
                <h3 className="text-xl font-bold text-gray-900">Property Law</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Real estate legal services for buying, selling, and leasing properties.
              </p>
              <a
                href="#lawyers"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Find Lawyers →
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Lawyers */}
      <section id="lawyers" className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Find Your Legal Professional
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our verified lawyers and find the expert that matches your needs
            </p>
          </div>

          <LegalListClient professionals={professionals} locale={locale} />
        </div>
      </section>

      {/* How It Works */}
      <div id="how-it-works">
        <ProcessSteps
          title="How It Works"
          subtitle="Getting legal help is easy with JustRichard"
          steps={processSteps}
        />
      </div>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Why Choose JustRichard for Legal Services?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Verified Lawyers</h3>
              <p className="text-gray-600">
                All lawyers are licensed, background-checked and verified
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⭐</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Top Rated</h3>
              <p className="text-gray-600">
                Only the best legal professionals with 4+ star ratings
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Transparent Pricing</h3>
              <p className="text-gray-600">
                Clear, upfront pricing with no hidden fees
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
            Need Legal Assistance?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Connect with our expert lawyers today and get the legal help you deserve
          </p>
          <a
            href="#lawyers"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-lg shadow-lg"
          >
            Browse All Lawyers
          </a>
        </div>
      </section>
    </div>
  );
}
