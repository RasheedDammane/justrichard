'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Menu, X, Globe, User, MapPin, DollarSign } from 'lucide-react';
import { useState } from 'react';
import LocationSelector from './LocationSelector';
import CurrencySelector from './CurrencySelector';

export default function Navbar({ session }: { session: any }) {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations('nav');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const locales = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'th', name: 'ไทย', flag: '🇹🇭' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  ];

  const handleCurrencyChange = (currency: any) => {
    setSelectedCurrency(currency.code);
    localStorage.setItem('selectedCurrency', currency.code);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="text-2xl font-bold text-primary-600">
            CommunityHub
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href={`/${locale}`} className="text-gray-700 hover:text-primary-600">
              {t('home')}
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-primary-600 flex items-center">
                {t('services')}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                <Link href={`/${locale}/services`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  All Services
                </Link>
                <Link href={`/${locale}/categories`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Categories
                </Link>
                <div className="border-t my-1"></div>
                <Link href={`/${locale}/services/rental`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  🚗 Vehicle Rentals
                </Link>
                <Link href={`/${locale}/services/transfer`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  🚐 Transfers
                </Link>
                <Link href={`/${locale}/services/real-estate`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  🏠 Real Estate
                </Link>
                <Link href={`/${locale}/services/medical`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  👨‍⚕️ Medical
                </Link>
                <Link href={`/${locale}/food`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  🍽️ Food & Grocery
                </Link>
              </div>
            </div>
            
            <Link href={`/${locale}/blog`} className="text-gray-700 hover:text-primary-600">
              Blog
            </Link>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Location Selector */}
            <LocationSelector currentLocale={locale} />
            
            {/* Currency Selector */}
            <div className="relative group">
              <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">
                <DollarSign className="w-5 h-5" />
                <span className="text-sm font-medium">{selectedCurrency}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 hidden group-hover:block max-h-64 overflow-y-auto">
                {['USD', 'EUR', 'GBP', 'AED', 'SAR', 'QAR', 'THB', 'VND', 'PHP', 'MYR', 'SGD'].map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setSelectedCurrency(curr)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      selectedCurrency === curr ? 'bg-primary-50 text-primary-600 font-semibold' : 'text-gray-700'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Language Switcher */}
            <div className="relative group">
              <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600">
                <Globe className="w-5 h-5" />
                <span className="text-sm">{locale.toUpperCase()}</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block max-h-80 overflow-y-auto">
                {locales.map((l) => (
                  <Link
                    key={l.code}
                    href={`/${l.code}`}
                    className={`flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 ${
                      locale === l.code ? 'bg-primary-50 text-primary-600 font-semibold' : 'text-gray-700'
                    }`}
                  >
                    <span className="text-lg">{l.flag}</span>
                    {l.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* User Menu */}
            {session ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600">
                  <User className="w-5 h-5" />
                  <span className="text-sm">{session.user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                  <Link
                    href={`/${locale}/profile`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    href={`/${locale}/bookings`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Bookings
                  </Link>
                  {(session.user.role === 'ADMIN' || session.user.role === 'MANAGER') && (
                    <Link
                      href={`/${locale}/admin`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <Link
                    href={`/${locale}/auth/logout`}
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href={`/${locale}/auth/login`}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-primary-600 border border-gray-300 rounded-md hover:border-primary-600 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </Link>
                <div className="relative group">
                  <Link
                    href={`/${locale}/auth/signup`}
                    className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center"
                  >
                    Sign Up
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                    <Link
                      href={`/${locale}/auth/signup`}
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 border-l-4 border-transparent hover:border-blue-500"
                    >
                      <div className="font-semibold text-blue-600">Customer Account</div>
                      <div className="text-xs text-gray-500">For booking services</div>
                    </Link>
                    <Link
                      href={`/${locale}/auth/signup-provider`}
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 border-l-4 border-transparent hover:border-green-500"
                    >
                      <div className="font-semibold text-green-600">Provider Account</div>
                      <div className="text-xs text-gray-500">For offering services</div>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href={`/${locale}`} className="text-gray-700 hover:text-primary-600">
                {t('home')}
              </Link>
              <Link href={`/${locale}/services`} className="text-gray-700 hover:text-primary-600">
                {t('services')}
              </Link>
              <div className="pl-4 flex flex-col space-y-2 border-l-2 border-gray-200">
                <Link href={`/${locale}/services/rental`} className="text-gray-600 hover:text-primary-600 text-sm">
                  🚗 Vehicle Rentals
                </Link>
                <Link href={`/${locale}/services/transfer`} className="text-gray-600 hover:text-primary-600 text-sm">
                  🚐 Transfers
                </Link>
                <Link href={`/${locale}/services/real-estate`} className="text-gray-600 hover:text-primary-600 text-sm">
                  🏠 Real Estate
                </Link>
                <Link href={`/${locale}/services/medical`} className="text-gray-600 hover:text-primary-600 text-sm">
                  👨‍⚕️ Medical
                </Link>
              </div>
              <Link href={`/${locale}/blog`} className="text-gray-700 hover:text-primary-600">
                Blog
              </Link>
              
              {/* Location, Currency & Language Selectors */}
              <div className="border-t pt-4 space-y-3">
                <div className="text-xs font-semibold text-gray-500 px-2">LOCATION, CURRENCY & LANGUAGE</div>
                <LocationSelector currentLocale={locale} />
                
                {/* Currency Selector Mobile */}
                <div className="px-2">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <DollarSign className="w-4 h-4" />
                    <select
                      value={selectedCurrency}
                      onChange={(e) => setSelectedCurrency(e.target.value)}
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500"
                    >
                      {['USD', 'EUR', 'GBP', 'AED', 'SAR', 'QAR', 'THB', 'VND', 'PHP', 'MYR', 'SGD'].map((curr) => (
                        <option key={curr} value={curr}>{curr}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex gap-2 flex-wrap px-2">
                  {locales.map((l) => (
                    <Link
                      key={l.code}
                      href={`/${l.code}`}
                      className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm ${
                        locale === l.code
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <span>{l.flag}</span>
                      {l.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              {session ? (
                <>
                  <Link href={`/${locale}/profile`} className="text-gray-700 hover:text-primary-600">
                    Profile
                  </Link>
                  <Link href={`/${locale}/bookings`} className="text-gray-700 hover:text-primary-600">
                    My Bookings
                  </Link>
                  {(session.user.role === 'ADMIN' || session.user.role === 'MANAGER') && (
                    <Link href={`/${locale}/admin`} className="text-gray-700 hover:text-primary-600">
                      Admin
                    </Link>
                  )}
                  <Link href={`/${locale}/auth/logout`} className="text-red-600">
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    href={`/${locale}/auth/login`} 
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 border border-gray-300 rounded-md px-4 py-2"
                  >
                    <User className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                  <div className="border-t pt-2 space-y-2">
                    <div className="text-xs font-semibold text-gray-500 px-2">SIGN UP AS:</div>
                    <Link
                      href={`/${locale}/auth/signup`}
                      className="bg-blue-600 text-white px-4 py-3 rounded-md text-center block hover:bg-blue-700"
                    >
                      <div className="font-semibold">Customer</div>
                      <div className="text-xs opacity-90">Book services</div>
                    </Link>
                    <Link
                      href={`/${locale}/auth/signup-provider`}
                      className="bg-green-600 text-white px-4 py-3 rounded-md text-center block hover:bg-green-700"
                    >
                      <div className="font-semibold">Professional</div>
                      <div className="text-xs opacity-90">Offer services</div>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
