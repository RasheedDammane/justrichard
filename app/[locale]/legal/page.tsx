import { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import LegalListClient from './LegalListClient';

interface ServicePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export const metadata: Metadata = {
  title: 'Legal Services & Lawyers | JustRichard',
  description: 'Connect with experienced lawyers and legal professionals. Expert legal consultation, contract drafting, and court representation.',
};

export default async function LegalPage({ params }: ServicePageProps) {
  const { locale } = await params;

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

  // Legal services (static)
  const legalServices = [
    {
      id: 1,
      icon: '📋',
      title: 'Legal Consultation',
      description: 'Expert legal advice for personal and business matters. Get professional guidance on your legal questions.',
      features: ['Initial consultation', 'Legal assessment', 'Action plan', 'Follow-up support'],
      price: 'From 2,500 THB',
    },
    {
      id: 2,
      icon: '📝',
      title: 'Contract Drafting',
      description: 'Professional contract preparation and review services. Ensure your agreements are legally sound.',
      features: ['Contract creation', 'Legal review', 'Amendments', 'Notarization'],
      price: 'From 5,000 THB',
    },
    {
      id: 3,
      icon: '⚖️',
      title: 'Court Representation',
      description: 'Experienced lawyers to represent you in court proceedings. Protect your rights and interests.',
      features: ['Case preparation', 'Court appearances', 'Legal defense', 'Appeals'],
      price: 'Custom quote',
    },
    {
      id: 4,
      icon: '🏢',
      title: 'Corporate Law',
      description: 'Business legal services including company formation, compliance, and corporate governance.',
      features: ['Company setup', 'Compliance', 'M&A support', 'Corporate governance'],
      price: 'From 15,000 THB',
    },
    {
      id: 5,
      icon: '👨‍👩‍👧',
      title: 'Family Law',
      description: 'Sensitive handling of family matters including divorce, custody, and inheritance issues.',
      features: ['Divorce proceedings', 'Child custody', 'Inheritance', 'Prenuptial agreements'],
      price: 'From 8,000 THB',
    },
    {
      id: 6,
      icon: '🏠',
      title: 'Property Law',
      description: 'Real estate legal services for buying, selling, and leasing properties.',
      features: ['Property purchase', 'Lease agreements', 'Title verification', 'Dispute resolution'],
      price: 'From 10,000 THB',
    },
  ];

  const practiceAreas = [
    { icon: '📄', name: 'Contract Law' },
    { icon: '🏢', name: 'Corporate Law' },
    { icon: '👨‍👩‍👧', name: 'Family Law' },
    { icon: '🏠', name: 'Property Law' },
    { icon: '💼', name: 'Employment Law' },
    { icon: '🌐', name: 'Immigration Law' },
    { icon: '💰', name: 'Tax Law' },
    { icon: '🔒', name: 'Intellectual Property' },
    { icon: '🚗', name: 'Traffic Law' },
    { icon: '⚡', name: 'Criminal Defense' },
    { icon: '🏥', name: 'Medical Malpractice' },
    { icon: '🏗️', name: 'Construction Law' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto max-w-7xl px-4 py-16">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-blue-100 mb-6">
            <Link href={`/${locale}`} className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Legal Services</span>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className="text-6xl">⚖️</div>
            <div>
              <div className="text-blue-200 text-sm font-semibold mb-2">PROFESSIONAL LEGAL SERVICES</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Expert Lawyers & Legal Consultation
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl">
                Connect with experienced legal professionals. From contract drafting to court representation, we've got you covered.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-1">{professionals.length}+</div>
              <div className="text-blue-100 text-sm">Verified Lawyers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-1">1,200+</div>
              <div className="text-blue-100 text-sm">Cases Handled</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-1">4.8★</div>
              <div className="text-blue-100 text-sm">Average Rating</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-1">24/7</div>
              <div className="text-blue-100 text-sm">Support Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Services */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Legal Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive legal solutions for individuals and businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {legalServices.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200">
                {/* Icon */}
                <div className="text-5xl mb-4">{service.icon}</div>
                
                {/* Title & Description */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-700">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-blue-600">
                      {service.price}
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                      Learn More →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Lawyers with Filters */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Find Your Legal Professional
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Use filters to find the expert that matches your needs
            </p>
          </div>

          <LegalListClient professionals={professionals} locale={locale} />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Simple steps to get legal help
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🔍</span>
              </div>
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                1
              </div>
              <h3 className="font-bold text-lg mb-2">Choose Service</h3>
              <p className="text-gray-600 text-sm">
                Select the legal service you need from our comprehensive list
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">👨‍⚖️</span>
              </div>
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                2
              </div>
              <h3 className="font-bold text-lg mb-2">Select Lawyer</h3>
              <p className="text-gray-600 text-sm">
                Browse verified lawyers and choose based on expertise and reviews
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">📅</span>
              </div>
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                3
              </div>
              <h3 className="font-bold text-lg mb-2">Book Appointment</h3>
              <p className="text-gray-600 text-sm">
                Schedule a consultation at your convenience, online or in-person
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">✅</span>
              </div>
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                4
              </div>
              <h3 className="font-bold text-lg mb-2">Get Legal Help</h3>
              <p className="text-gray-600 text-sm">
                Receive expert legal advice and support for your case
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose JustRichard Legal Services?
            </h2>
            <p className="text-lg text-gray-600">
              Your trusted partner for legal matters
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🛡️</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Verified Lawyers</h3>
              <p className="text-gray-600 text-sm">
                All lawyers are licensed, background-checked, and verified professionals
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">⭐</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Top Rated</h3>
              <p className="text-gray-600 text-sm">
                Only the best legal professionals with proven track records and 4+ ratings
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">💰</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Transparent Pricing</h3>
              <p className="text-gray-600 text-sm">
                Clear, upfront pricing with no hidden fees. Know exactly what you'll pay
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🌍</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Multilingual</h3>
              <p className="text-gray-600 text-sm">
                Lawyers fluent in multiple languages including English, French, Arabic, and more
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Practice Areas
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive legal expertise across multiple domains
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {practiceAreas.map((area, idx) => (
              <div key={idx} className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow border border-gray-200">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{area.icon}</span>
                  <span className="font-semibold text-gray-900 text-sm">{area.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4">
            Need Legal Assistance?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Connect with our expert lawyers today and get the legal help you deserve
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-lg shadow-lg">
              Book Consultation
            </button>
            <button className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-400 transition-colors text-lg border-2 border-white">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
