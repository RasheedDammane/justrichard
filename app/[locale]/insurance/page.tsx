'use client';

import { useState } from 'react';
import insuranceData from '@/app/data/insurance.json';
import carBrandsData from '@/app/data/car-brands-complete.json';

type InsuranceType = keyof typeof insuranceData.insurance_types;

// Icon options for button selection
const maritalStatusOptions = [
  { value: 'Single', label: 'Single', icon: '👤' },
  { value: 'Married', label: 'Married', icon: '💑' },
  { value: 'Divorced', label: 'Divorced', icon: '💔' },
  { value: 'Widowed', label: 'Widowed', icon: '🖤' }
];

const genderOptions = [
  { value: 'Male', label: 'Male', icon: '👨' },
  { value: 'Female', label: 'Female', icon: '👩' },
  { value: 'Other', label: 'Other', icon: '🧑' }
];

const vehicleUsageOptions = [
  { value: 'Personal', label: 'Personal', icon: '🏠' },
  { value: 'Business', label: 'Business', icon: '💼' },
  { value: 'Commute', label: 'Commute', icon: '🚗' },
  { value: 'Taxi/Ride-sharing', label: 'Taxi/Ride-sharing', icon: '🚕' },
  { value: 'Delivery', label: 'Delivery', icon: '📦' }
];

// Currency by country
const currencyByCountry: Record<string, { symbol: string; code: string }> = {
  'Thailand': { symbol: '฿', code: 'THB' },
  'UAE': { symbol: 'AED', code: 'AED' },
  'Saudi Arabia': { symbol: 'SAR', code: 'SAR' },
  'Qatar': { symbol: 'QAR', code: 'QAR' },
  'Vietnam': { symbol: '₫', code: 'VND' },
  'USA': { symbol: '$', code: 'USD' },
  'Europe': { symbol: '€', code: 'EUR' }
};

// Generate age options
const generateAgeOptions = () => {
  const ages = [];
  for (let age = 18; age <= 99; age++) {
    ages.push(age);
  }
  return ages;
};

// Generate driving experience options
const generateExperienceOptions = () => {
  const experiences = [];
  for (let exp = 0; exp <= 50; exp++) {
    experiences.push(exp);
  }
  return experiences;
};

export default function InsurancePage() {
  const [selectedType, setSelectedType] = useState<InsuranceType | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [selectedCoverages, setSelectedCoverages] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('Thailand');

  const insuranceTypes = Object.entries(insuranceData.insurance_types).map(([key, value]) => ({
    key: key as InsuranceType,
    ...value,
  }));

  const selectedInsurance = selectedType ? insuranceData.insurance_types[selectedType] : null;

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    // Update country if country field changes
    if (fieldName === 'country') {
      setSelectedCountry(value);
    }
    setCalculatedPrice(null); // Reset price when form changes
  };

  const getCurrency = () => {
    return currencyByCountry[selectedCountry] || { symbol: '$', code: 'USD' };
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    const brandData = carBrandsData.car_brands.find(b => b.brand === brand);
    setAvailableModels(brandData?.models || []);
    setFormData(prev => ({ ...prev, car_make: brand, car_model: '' }));
    setCalculatedPrice(null);
  };

  const handleModelChange = (model: string) => {
    setFormData(prev => ({ ...prev, car_model: model }));
    setCalculatedPrice(null);
  };

  const handleCoverageChange = (coverageName: string, checked: boolean) => {
    if (checked) {
      setSelectedCoverages(prev => [...prev, coverageName]);
    } else {
      setSelectedCoverages(prev => prev.filter(c => c !== coverageName));
    }
    setCalculatedPrice(null);
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 1990; year--) {
      years.push(year);
    }
    return years;
  };

  const calculatePrice = () => {
    if (!selectedInsurance) return;

    const formula = selectedInsurance.calculation_formula;
    let price = formula.base;

    // Apply coverage multipliers for car insurance
    if (selectedType === 'car' && 'coverage_options' in selectedInsurance) {
      const coverageOptions = (selectedInsurance as any).coverage_options;
      selectedCoverages.forEach(coverageName => {
        const coverage = coverageOptions.find((c: any) => c.name === coverageName);
        if (coverage) {
          price *= coverage.base_multiplier;
        }
      });
    }

    // Apply factors
    Object.entries(formData).forEach(([key, value]) => {
      const factor = (formula.factors as any)[key];
      
      if (!factor) return;

      if (typeof factor === 'number') {
        // Simple multiplier
        if (value === true) {
          price *= factor;
        }
      } else if (typeof factor === 'object') {
        if ('per_day' in factor) {
          price *= value * factor.per_day;
        } else if ('per_employee' in factor) {
          price *= (1 + value * factor.per_employee);
        } else if ('per_100k' in factor) {
          price *= (1 + (value / 100000) * factor.per_100k);
        } else if ('per_10' in factor) {
          price *= (1 + (value / 10) * factor.per_10);
        } else if ('per_10sqm' in factor) {
          price *= (1 + (value / 10) * factor.per_10sqm);
        } else {
          // Age ranges or select options
          if (key === 'age') {
            const age = parseInt(value);
            if (age <= 30) price *= factor['18-30'];
            else if (age <= 45) price *= factor['31-45'];
            else if (age <= 60) price *= factor['46-60'];
            else price *= factor['60+'];
          } else if (key === 'year') {
            const year = parseInt(value);
            const currentYear = new Date().getFullYear();
            if (currentYear - year > 10) price *= factor.old;
            else if (currentYear - year <= 3) price *= factor.new;
            else price *= factor.normal;
          } else if (value in factor) {
            price *= factor[value as keyof typeof factor];
          }
        }
      }
    });

    setCalculatedPrice(Math.round(price * 100) / 100);
  };

  const getPriceRange = () => {
    if (!calculatedPrice) return null;
    return {
      low: Math.round(calculatedPrice * 0.85),
      high: Math.round(calculatedPrice * 1.15),
    };
  };

  const resetSimulator = () => {
    setSelectedType(null);
    setFormData({});
    setCalculatedPrice(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16 px-4">
        <div className="container mx-auto max-w-7xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">🛡️ Compare & Get Insurance in Minutes</h1>
          <p className="text-2xl text-blue-100 mb-8">
            Health, Car, Business, Property & Travel Insurance
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-lg">
              Simulate Now ↓
            </button>
            <a
              href="https://wa.me/971XXXXXXXX"
              className="px-8 py-4 bg-green-500 text-white rounded-xl font-bold text-lg hover:bg-green-600 transition-all shadow-lg flex items-center gap-2"
            >
              <span>💬</span> WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-12">
        {/* Insurance Types */}
        {!selectedType && (
          <section className="mb-16">
            <h2 className="text-4xl font-bold mb-8 text-center">Choose Your Insurance Type</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {insuranceTypes.map((insurance) => (
                <div
                  key={insurance.key}
                  onClick={() => setSelectedType(insurance.key)}
                  className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all cursor-pointer hover:scale-105 border-2 border-transparent hover:border-blue-500"
                >
                  <div className="text-6xl mb-4 text-center">{insurance.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-center text-gray-900">{insurance.title}</h3>
                  <p className="text-sm text-gray-600 text-center mb-4">{insurance.description}</p>
                  <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Simulate →
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Simulator */}
        {selectedType && selectedInsurance && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl">{selectedInsurance.icon}</span>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">{selectedInsurance.title}</h2>
                      <p className="text-gray-600">{selectedInsurance.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={resetSimulator}
                    className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-semibold"
                  >
                    ← Change
                  </button>
                </div>

                {/* Required Fields */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Required Information</h3>
                  <div className="space-y-4">
                    {selectedInsurance.required_fields.map((field) => (
                      <div key={field.name}>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                          {field.label} *
                        </label>
                        {field.type === 'select' && field.name === 'year' ? (
                          <select
                            value={formData[field.name] || ''}
                            onChange={(e) => handleInputChange(field.name, parseInt(e.target.value))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select Year</option>
                            {generateYearOptions().map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        ) : field.name === 'marital_status' ? (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {maritalStatusOptions.map((option) => (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => handleInputChange(field.name, option.value)}
                                className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl transition-all ${
                                  formData[field.name] === option.value
                                    ? 'border-blue-600 bg-blue-50 shadow-lg scale-105'
                                    : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                                }`}
                              >
                                <span className="text-3xl mb-2">{option.icon}</span>
                                <span className="text-sm font-semibold text-gray-900">{option.label}</span>
                              </button>
                            ))}
                          </div>
                        ) : field.name === 'gender' ? (
                          <div className="grid grid-cols-3 gap-3">
                            {genderOptions.map((option) => (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => handleInputChange(field.name, option.value)}
                                className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl transition-all ${
                                  formData[field.name] === option.value
                                    ? 'border-blue-600 bg-blue-50 shadow-lg scale-105'
                                    : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                                }`}
                              >
                                <span className="text-3xl mb-2">{option.icon}</span>
                                <span className="text-sm font-semibold text-gray-900">{option.label}</span>
                              </button>
                            ))}
                          </div>
                        ) : field.name === 'usage' ? (
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                            {vehicleUsageOptions.map((option) => (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => handleInputChange(field.name, option.value)}
                                className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl transition-all ${
                                  formData[field.name] === option.value
                                    ? 'border-blue-600 bg-blue-50 shadow-lg scale-105'
                                    : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                                }`}
                              >
                                <span className="text-3xl mb-2">{option.icon}</span>
                                <span className="text-xs font-semibold text-gray-900 text-center">{option.label}</span>
                              </button>
                            ))}
                          </div>
                        ) : field.type === 'select' && 'options' in field ? (
                          <select
                            value={formData[field.name] || ''}
                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select {field.label}</option>
                            {field.options?.map((option: string) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : field.name === 'driver_age' ? (
                          <select
                            value={formData[field.name] || ''}
                            onChange={(e) => handleInputChange(field.name, parseInt(e.target.value))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select Age</option>
                            {generateAgeOptions().map((age) => (
                              <option key={age} value={age}>
                                {age} years old
                              </option>
                            ))}
                          </select>
                        ) : field.name === 'driving_experience' ? (
                          <select
                            value={formData[field.name] || ''}
                            onChange={(e) => handleInputChange(field.name, parseInt(e.target.value))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select Experience</option>
                            {generateExperienceOptions().map((exp) => (
                              <option key={exp} value={exp}>
                                {exp} {exp === 1 ? 'year' : 'years'}
                              </option>
                            ))}
                          </select>
                        ) : field.name === 'car_value' ? (
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-semibold">
                              {getCurrency().symbol}
                            </span>
                            <input
                              type="number"
                              value={formData[field.name] || ''}
                              onChange={(e) => handleInputChange(field.name, parseFloat(e.target.value) || 0)}
                              min={'min' in field ? field.min : undefined}
                              max={'max' in field ? field.max : undefined}
                              placeholder={`Enter value in ${getCurrency().code}`}
                              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                              {getCurrency().code}
                            </span>
                          </div>
                        ) : field.type === 'number' ? (
                          <input
                            type="number"
                            value={formData[field.name] || ''}
                            onChange={(e) => handleInputChange(field.name, parseFloat(e.target.value) || 0)}
                            min={'min' in field ? field.min : undefined}
                            max={'max' in field ? field.max : undefined}
                            placeholder={'placeholder' in field ? field.placeholder : ''}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : field.name === 'car_make' ? (
                          <select
                            value={selectedBrand}
                            onChange={(e) => handleBrandChange(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select Car Brand</option>
                            {carBrandsData.car_brands.map((brand) => (
                              <option key={brand.brand} value={brand.brand}>
                                {brand.brand}
                              </option>
                            ))}
                          </select>
                        ) : field.name === 'car_model' ? (
                          <select
                            value={formData[field.name] || ''}
                            onChange={(e) => handleModelChange(e.target.value)}
                            disabled={!selectedBrand}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                          >
                            <option value="">
                              {selectedBrand ? 'Select Car Model' : 'Select a brand first'}
                            </option>
                            {availableModels.map((model) => (
                              <option key={model} value={model}>
                                {model}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type="text"
                            value={formData[field.name] || ''}
                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                            placeholder={'placeholder' in field ? field.placeholder : ''}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coverage Options for Car Insurance */}
                {selectedType === 'car' && 'coverage_options' in selectedInsurance && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4 text-gray-900">Coverage Type *</h3>
                    <p className="text-sm text-gray-600 mb-4">Select one or more coverage options</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(selectedInsurance as any).coverage_options.map((coverage: any, index: number) => {
                        const icons = ['🛡️', '🔒', '💥', '🚨'];
                        return (
                          <button
                            key={coverage.name}
                            type="button"
                            onClick={() => handleCoverageChange(coverage.name, !selectedCoverages.includes(coverage.name))}
                            className={`flex flex-col items-start p-5 border-2 rounded-xl transition-all text-left ${
                              selectedCoverages.includes(coverage.name)
                                ? 'border-blue-600 bg-blue-50 shadow-lg scale-105'
                                : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center justify-between w-full mb-2">
                              <span className="text-4xl">{icons[index % icons.length]}</span>
                              <span className={`text-lg font-bold ${
                                selectedCoverages.includes(coverage.name) ? 'text-blue-600' : 'text-gray-600'
                              }`}>
                                ×{coverage.base_multiplier}
                              </span>
                            </div>
                            <h4 className="font-bold text-gray-900 mb-1">{coverage.label}</h4>
                            {'description' in coverage && (
                              <p className="text-sm text-gray-600">{coverage.description}</p>
                            )}
                            {selectedCoverages.includes(coverage.name) && (
                              <div className="mt-2 flex items-center gap-1 text-blue-600 text-sm font-semibold">
                                <span>✓</span>
                                <span>Selected</span>
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Optional Fields */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Optional Coverage</h3>
                  <div className="space-y-3">
                    {selectedInsurance.optional_fields.map((field) => (
                      <label
                        key={field.name}
                        className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData[field.name] ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData[field.name] || false}
                          onChange={(e) => handleInputChange(field.name, e.target.checked)}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 mt-0.5"
                        />
                        <div className="flex-1">
                          <span className="font-semibold text-gray-900">{field.label}</span>
                          {'description' in field && (
                            <p className="text-sm text-gray-600 mt-1">{field.description}</p>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={calculatePrice}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
                >
                  Calculate Price
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 text-white sticky top-4">
                <h3 className="text-2xl font-bold mb-6">💰 Your Quote</h3>

                {calculatedPrice === null ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📊</div>
                    <p className="text-blue-100">Fill the form and click "Calculate Price" to see your quote</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <p className="text-sm text-blue-100 mb-2">Estimated Monthly Premium</p>
                      <div className="text-5xl font-bold mb-4">${calculatedPrice}</div>
                      {getPriceRange() && (
                        <p className="text-sm text-blue-100">
                          Range: ${getPriceRange()?.low} - ${getPriceRange()?.high}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3 mb-8">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <p className="text-sm mb-1">Annual Premium</p>
                        <p className="text-2xl font-bold">${Math.round(calculatedPrice * 12)}</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <p className="text-sm mb-1">You Save (vs standard)</p>
                        <p className="text-2xl font-bold text-green-300">15%</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button className="w-full py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg">
                        Get Official Quote
                      </button>
                      <button className="w-full py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold hover:bg-white/30 transition-all border-2 border-white">
                        Download PDF
                      </button>
                      <a
                        href="https://wa.me/971XXXXXXXX"
                        className="w-full py-4 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                      >
                        <span>💬</span> WhatsApp Us
                      </a>
                    </div>

                    <div className="mt-6 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                      <p className="text-sm">
                        <span className="font-semibold">✓ Instant Coverage</span><br />
                        <span className="text-xs opacity-90">Activate your policy within 24 hours</span>
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Features */}
        <section className="mt-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl shadow-xl p-12">
          <h3 className="text-3xl font-bold mb-8 text-center">Why Choose Us?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h4 className="font-bold text-xl mb-2">Instant Quotes</h4>
              <p className="text-gray-600">Get your quote in seconds, not days</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h4 className="font-bold text-xl mb-2">Best Prices</h4>
              <p className="text-gray-600">Compare multiple insurers automatically</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🛡️</div>
              <h4 className="font-bold text-xl mb-2">Full Coverage</h4>
              <p className="text-gray-600">Comprehensive protection for all needs</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
