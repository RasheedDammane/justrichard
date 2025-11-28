'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import businessData from '@/app/data/business-setup.json';

export default function BusinessSetupCountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();

  // Find country by slug
  const countryEntry = Object.entries(businessData.business_setup_data).find(
    ([_, data]) => data.slug === resolvedParams.slug
  );

  if (!countryEntry) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Country not found</h1>
          <button
            onClick={() => router.push('/en/business-setup')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Business Setup
          </button>
        </div>
      </div>
    );
  }

  const [countryCode, countryData] = countryEntry;

  const countryFlags: Record<string, string> = {
    thailand: '🇹🇭',
    uae: '🇦🇪',
    saudi_arabia: '🇸🇦',
    qatar: '🇶🇦',
    vietnam: '🇻🇳',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <button
            onClick={() => router.push('/en/business-setup')}
            className="mb-6 text-white/80 hover:text-white flex items-center gap-2"
          >
            ← Back to Calculator
          </button>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-6xl">{countryFlags[countryCode]}</span>
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-2">{countryData.hero_title}</h1>
              <p className="text-2xl text-blue-100">{countryData.hero_subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-12">
        {/* Company Structures */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <span className="text-4xl">🏢</span>
            Company Structures
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {countryData.company_structures.map((structure) => (
              <div key={structure.code} className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all">
                <h3 className="text-2xl font-bold mb-4 text-blue-600">{structure.label}</h3>
                <div className="space-y-3 mb-6">
                  <div>
                    <span className="text-sm font-semibold text-gray-600">Foreign Ownership:</span>
                    <p className="text-gray-900">{structure.foreign_ownership}</p>
                  </div>
                  {'min_capital_hint' in structure && structure.min_capital_hint && (
                    <div>
                      <span className="text-sm font-semibold text-gray-600">Minimum Capital:</span>
                      <p className="text-gray-900">{structure.min_capital_hint}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-sm font-semibold text-gray-600">Setup Time:</span>
                    <p className="text-gray-900">{structure.typical_setup_time_weeks} weeks</p>
                  </div>
                  {'base_cost_usd' in structure && (
                    <div>
                      <span className="text-sm font-semibold text-gray-600">Starting Price:</span>
                      <p className="text-2xl font-bold text-green-600">${structure.base_cost_usd.toLocaleString()}</p>
                    </div>
                  )}
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-600 mb-2 block">Ideal For:</span>
                  <div className="flex flex-wrap gap-2">
                    {structure.ideal_for.map((use, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                        {use}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Visa Packages */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <span className="text-4xl">✈️</span>
            Visa Packages
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {countryData.visa_packages.map((visa) => (
              <div key={visa.code} className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-green-700">{visa.label}</h3>
                <div className="space-y-3 mb-6">
                  <div>
                    <span className="text-sm font-semibold text-gray-600">Duration:</span>
                    <p className="text-lg text-gray-900">{visa.duration}</p>
                  </div>
                  {'includes_work_permit' in visa && visa.includes_work_permit && (
                    <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold">
                      ✓ Includes Work Permit
                    </div>
                  )}
                  {'cost_usd' in visa && (
                    <div>
                      <span className="text-sm font-semibold text-gray-600">Price:</span>
                      <p className="text-3xl font-bold text-green-600">${visa.cost_usd.toLocaleString()}</p>
                    </div>
                  )}
                  {'ideal_for' in visa && visa.ideal_for && (
                    <div>
                      <span className="text-sm font-semibold text-gray-600 mb-2 block">Ideal For:</span>
                      <div className="flex flex-wrap gap-2">
                        {visa.ideal_for.map((use: string, idx: number) => (
                          <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                            {use}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Process Steps */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <span className="text-4xl">📋</span>
            Setup Process
          </h2>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="space-y-6">
              {countryData.process_steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {step.order}
                  </div>
                  <div className="flex-1 pt-2">
                    <h4 className="text-xl font-bold mb-2">{step.label}</h4>
                    <p className="text-gray-600">Duration: {step.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Documents Required */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <span className="text-4xl">📄</span>
            Required Documents
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-blue-600">For Company Setup</h3>
              <ul className="space-y-3">
                {countryData.documents_required.company.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <span className="text-gray-700">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-green-600">For Visa Application</h3>
              <ul className="space-y-3">
                {countryData.documents_required.visa.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <span className="text-gray-700">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <span className="text-4xl">❓</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {countryData.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-xl p-8">
                <h4 className="text-xl font-bold mb-3 text-blue-600">{faq.q}</h4>
                <p className="text-gray-700 text-lg">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Let us help you set up your business in {countryData.country}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/en/business-setup')}
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-lg"
            >
              Use Calculator
            </button>
            <button
              onClick={() => router.push('/en/contact')}
              className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold text-lg hover:bg-white/30 transition-all border-2 border-white"
            >
              Contact Us
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
