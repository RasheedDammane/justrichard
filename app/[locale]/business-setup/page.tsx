'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import businessData from '@/app/data/business-setup.json';

const countries = [
  { code: 'thailand', name: 'Thailand', flag: '🇹🇭', color: 'from-red-500 to-blue-600' },
  { code: 'uae', name: 'UAE', flag: '🇦🇪', color: 'from-green-500 to-red-600' },
  { code: 'saudi_arabia', name: 'Saudi Arabia', flag: '🇸🇦', color: 'from-green-600 to-green-800' },
  { code: 'qatar', name: 'Qatar', flag: '🇶🇦', color: 'from-maroon-600 to-maroon-800' },
  { code: 'vietnam', name: 'Vietnam', flag: '🇻🇳', color: 'from-red-600 to-yellow-500' },
];

export default function BusinessSetupPage() {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState('uae');
  const [selectedStructure, setSelectedStructure] = useState('');
  const [selectedVisa, setSelectedVisa] = useState('');
  const [numberOfVisas, setNumberOfVisas] = useState(1);
  const [additionalServices, setAdditionalServices] = useState({
    bankAccount: false,
    office: false,
    accounting: false,
    proCertificate: false,
  });

  const countryData = businessData.business_setup_data[selectedCountry as keyof typeof businessData.business_setup_data];

  const calculateTotal = () => {
    let total = 0;

    // Company structure cost
    if (selectedStructure) {
      const structure = countryData.company_structures.find(s => s.code === selectedStructure);
      if (structure && 'base_cost_usd' in structure) {
        total += structure.base_cost_usd;
      }
    }

    // Visa cost
    if (selectedVisa) {
      const visa = countryData.visa_packages.find(v => v.code === selectedVisa);
      if (visa && 'cost_usd' in visa) {
        total += visa.cost_usd * numberOfVisas;
      }
    }

    // Additional services
    if (additionalServices.bankAccount) total += 500;
    if (additionalServices.office) total += 2000;
    if (additionalServices.accounting) total += 1200;
    if (additionalServices.proCertificate) total += 300;

    return total;
  };

  const getEstimatedTime = () => {
    if (!selectedStructure) return 0;
    const structure = countryData.company_structures.find(s => s.code === selectedStructure);
    return structure?.typical_setup_time_weeks || 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">🌍 Business Setup & Visa Services</h1>
          <p className="text-2xl text-blue-100 mb-8">
            Set up your company and get your business visa in 5 countries
          </p>
          <div className="flex flex-wrap gap-4">
            {countries.map(country => (
              <button
                key={country.code}
                onClick={() => {
                  setSelectedCountry(country.code);
                  setSelectedStructure('');
                  setSelectedVisa('');
                }}
                className={`px-6 py-3 rounded-xl font-bold text-lg transition-all ${
                  selectedCountry === country.code
                    ? 'bg-white text-blue-600 shadow-xl scale-105'
                    : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                {country.flag} {country.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-12">
        {/* Country Info */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4">{countryData.hero_title}</h2>
          <p className="text-xl text-gray-600">{countryData.hero_subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calculator Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Company Structure Selection */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="text-3xl">🏢</span>
                Choose Company Structure
              </h3>
              <div className="space-y-4">
                {countryData.company_structures.map(structure => (
                  <div
                    key={structure.code}
                    onClick={() => setSelectedStructure(structure.code)}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedStructure === structure.code
                        ? 'border-blue-600 bg-blue-50 shadow-lg'
                        : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{structure.label}</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          <span className="font-semibold">Ownership:</span> {structure.foreign_ownership}
                        </p>
                        {structure.min_capital_hint && (
                          <p className="text-sm text-gray-600 mb-2">
                            <span className="font-semibold">Capital:</span> {structure.min_capital_hint}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-2 mt-3">
                          {structure.ideal_for.map((use, idx) => (
                            <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                              {use}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          ${'base_cost_usd' in structure ? structure.base_cost_usd.toLocaleString() : 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500">{structure.typical_setup_time_weeks} weeks</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visa Selection */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="text-3xl">✈️</span>
                Choose Visa Package
              </h3>
              <div className="space-y-4">
                {countryData.visa_packages.map(visa => (
                  <div
                    key={visa.code}
                    onClick={() => setSelectedVisa(visa.code)}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedVisa === visa.code
                        ? 'border-green-600 bg-green-50 shadow-lg'
                        : 'border-gray-200 hover:border-green-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{visa.label}</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          <span className="font-semibold">Duration:</span> {visa.duration}
                        </p>
                        {visa.includes_work_permit && (
                          <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                            ✓ Includes Work Permit
                          </span>
                        )}
                      </div>
                      <div className="ml-4 text-right">
                        <div className="text-2xl font-bold text-green-600">
                          ${'cost_usd' in visa ? visa.cost_usd.toLocaleString() : 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500">per visa</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedVisa && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <label className="block text-sm font-semibold mb-2">Number of Visas</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={numberOfVisas}
                    onChange={(e) => setNumberOfVisas(parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>

            {/* Additional Services */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="text-3xl">➕</span>
                Additional Services
              </h3>
              <div className="space-y-4">
                {[
                  { key: 'bankAccount', label: 'Bank Account Opening', price: 500 },
                  { key: 'office', label: 'Office Space (1 year)', price: 2000 },
                  { key: 'accounting', label: 'Accounting Services (1 year)', price: 1200 },
                  { key: 'proCertificate', label: 'PRO Services & Certificates', price: 300 },
                ].map(service => (
                  <label
                    key={service.key}
                    className="flex items-center justify-between p-4 rounded-lg border-2 border-gray-200 hover:border-blue-300 cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={additionalServices[service.key as keyof typeof additionalServices]}
                        onChange={(e) =>
                          setAdditionalServices({
                            ...additionalServices,
                            [service.key]: e.target.checked,
                          })
                        }
                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="font-semibold">{service.label}</span>
                    </div>
                    <span className="text-lg font-bold text-gray-700">${service.price}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 text-white sticky top-4">
              <h3 className="text-2xl font-bold mb-6">💰 Cost Summary</h3>

              <div className="space-y-4 mb-6">
                {selectedStructure && (
                  <div className="flex justify-between pb-3 border-b border-white/20">
                    <span>Company Setup</span>
                    <span className="font-bold">
                      ${countryData.company_structures.find(s => s.code === selectedStructure)?.base_cost_usd?.toLocaleString() || 0}
                    </span>
                  </div>
                )}
                {selectedVisa && (
                  <div className="flex justify-between pb-3 border-b border-white/20">
                    <span>Visa ({numberOfVisas}x)</span>
                    <span className="font-bold">
                      ${((countryData.visa_packages.find(v => v.code === selectedVisa)?.cost_usd || 0) * numberOfVisas).toLocaleString()}
                    </span>
                  </div>
                )}
                {Object.entries(additionalServices).map(([key, value]) => {
                  if (!value) return null;
                  const prices: Record<string, number> = { bankAccount: 500, office: 2000, accounting: 1200, proCertificate: 300 };
                  const labels: Record<string, string> = {
                    bankAccount: 'Bank Account',
                    office: 'Office Space',
                    accounting: 'Accounting',
                    proCertificate: 'PRO Services',
                  };
                  return (
                    <div key={key} className="flex justify-between pb-3 border-b border-white/20">
                      <span>{labels[key]}</span>
                      <span className="font-bold">${prices[key]}</span>
                    </div>
                  );
                })}
              </div>

              <div className="border-t-2 border-white/40 pt-6 mb-6">
                <div className="flex justify-between items-center text-2xl font-bold mb-2">
                  <span>Total</span>
                  <span>${calculateTotal().toLocaleString()}</span>
                </div>
                {getEstimatedTime() > 0 && (
                  <div className="text-sm opacity-90">
                    ⏱️ Estimated time: {getEstimatedTime()} weeks
                  </div>
                )}
              </div>

              <button
                onClick={() => router.push(`/en/business-setup/${countryData.slug}`)}
                disabled={!selectedStructure}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  selectedStructure
                    ? 'bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl'
                    : 'bg-white/20 text-white/50 cursor-not-allowed'
                }`}
              >
                {selectedStructure ? 'Get Started →' : 'Select a structure first'}
              </button>

              <div className="mt-6 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                <p className="text-sm">
                  <span className="font-semibold">✓ All-inclusive package</span><br />
                  <span className="text-xs opacity-90">Government fees, legal documents, and support included</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-3xl font-bold mb-8 text-center">📋 Setup Process</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {countryData.process_steps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg">
                    {step.order}
                  </div>
                  <h4 className="font-bold text-lg mb-2">{step.label}</h4>
                  <p className="text-sm text-gray-600">{step.duration}</p>
                </div>
                {idx < countryData.process_steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 -ml-8" style={{ width: 'calc(100% - 4rem)' }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl shadow-xl p-8">
          <h3 className="text-3xl font-bold mb-8 text-center">❓ Frequently Asked Questions</h3>
          <div className="space-y-4 max-w-4xl mx-auto">
            {countryData.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-md">
                <h4 className="font-bold text-lg mb-2 text-blue-600">{faq.q}</h4>
                <p className="text-gray-700">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
