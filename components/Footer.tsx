'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, Send, DollarSign } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const params = useParams();
  const locale = params.locale as string;
  const [email, setEmail] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const t = useTranslations('footer');

  const countries = [
    { code: 'AE', flag: '🇦🇪', name: 'UAE', cities: ['Dubai', 'Abu Dhabi', 'Sharjah'], phone: '+971 4 123 4567' },
    { code: 'TH', flag: '🇹🇭', name: 'Thailand', cities: ['Bangkok', 'Pattaya', 'Phuket'], phone: '+66 2 123 4567' },
    { code: 'VN', flag: '🇻🇳', name: 'Vietnam', cities: ['Ho Chi Minh', 'Hanoi'], phone: '+84 28 123 4567' },
    { code: 'SA', flag: '🇸🇦', name: 'Saudi Arabia', cities: ['Riyadh', 'Jeddah'], phone: '+966 11 123 4567' },
    { code: 'QA', flag: '🇶🇦', name: 'Qatar', cities: ['Doha'], phone: '+974 4123 4567' },
  ];

  const languages = [
    { code: 'en', flag: '🇬🇧', name: 'English' },
    { code: 'fr', flag: '🇫🇷', name: 'Français' },
    { code: 'ar', flag: '🇸🇦', name: 'العربية' },
    { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
    { code: 'es', flag: '🇪🇸', name: 'Español' },
    { code: 'ru', flag: '🇷🇺', name: 'Русский' },
    { code: 'ko', flag: '🇰🇷', name: '한국어' },
    { code: 'th', flag: '🇹🇭', name: 'ไทย' },
    { code: 'vi', flag: '🇻🇳', name: 'Tiếng Việt' },
  ];

  const currencies = ['USD', 'EUR', 'GBP', 'AED', 'SAR', 'QAR', 'THB', 'VND', 'PHP', 'MYR', 'SGD'];

  const services = [
    { icon: '🏠', nameKey: 'services.homeServices', slug: 'home-services' },
    { icon: '🚗', nameKey: 'services.vehicleRental', slug: 'rental' },
    { icon: '🏢', nameKey: 'services.realEstate', slug: 'real-estate' },
    { icon: '⚖️', nameKey: 'services.legalServices', slug: 'legal' },
    { icon: '🚕', nameKey: 'services.transfers', slug: 'transfer' },
    { icon: '👨‍⚕️', nameKey: 'services.medical', slug: 'medical' },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t('newsletter.success'));
    setEmail('');
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* About & Newsletter */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-white mb-4">CommunityHub</h2>
            <p className="text-sm mb-6 leading-relaxed">
              {t('description')}
            </p>
            
            {/* Newsletter */}
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <h4 className="text-white font-semibold mb-3 flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                {t('newsletter.title')}
              </h4>
              <p className="text-xs mb-3">{t('newsletter.updates')}</p>
              <form onSubmit={handleNewsletterSubmit} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('newsletter.yourEmail')}
                  required
                  className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-white font-semibold mb-3">{t('connect.followUs')}</h4>
              <div className="flex space-x-3">
                <a href="https://facebook.com/communityhub" target="_blank" rel="noopener noreferrer" 
                   className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition-colors" aria-label="Facebook">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://twitter.com/communityhub" target="_blank" rel="noopener noreferrer"
                   className="bg-gray-800 p-2 rounded-full hover:bg-sky-500 transition-colors" aria-label="Twitter">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://instagram.com/communityhub" target="_blank" rel="noopener noreferrer"
                   className="bg-gray-800 p-2 rounded-full hover:bg-pink-600 transition-colors" aria-label="Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com/company/communityhub" target="_blank" rel="noopener noreferrer"
                   className="bg-gray-800 p-2 rounded-full hover:bg-blue-700 transition-colors" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://youtube.com/@communityhub" target="_blank" rel="noopener noreferrer"
                   className="bg-gray-800 p-2 rounded-full hover:bg-red-600 transition-colors" aria-label="YouTube">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Popular Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
              <span className="w-1 h-6 bg-blue-600 mr-3"></span>
              {t('services.popularServices')}
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/${locale}/services/${service.slug}`} 
                        className="text-sm hover:text-white hover:translate-x-1 transition-all inline-flex items-center">
                    <span className="mr-2">{service.icon}</span>
                    {t(service.nameKey)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={`/${locale}/services`} 
                      className="text-sm text-blue-400 hover:text-blue-300 font-semibold">
                  {t('services.viewAllServices')} →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
              <span className="w-1 h-6 bg-blue-600 mr-3"></span>
              {t('legal.companyLegal')}
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-white text-sm font-semibold mb-2">{t('company.title')}</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href={`/${locale}/about`} className="hover:text-white transition-colors">{t('company.about')}</Link></li>
                  <li><Link href={`/${locale}/careers`} className="hover:text-white transition-colors">{t('company.careers')}</Link></li>
                  <li><Link href={`/${locale}/blog`} className="hover:text-white transition-colors">{t('company.blog')}</Link></li>
                  <li><Link href={`/${locale}/press`} className="hover:text-white transition-colors">{t('company.pressMedia')}</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white text-sm font-semibold mb-2">{t('professionals.title')}</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href={`/${locale}/auth/signup-provider`} className="hover:text-white transition-colors">{t('professionals.becomeProvider')}</Link></li>
                  <li><Link href={`/${locale}/provider-benefits`} className="hover:text-white transition-colors">{t('professionals.providerBenefits')}</Link></li>
                  <li><Link href={`/${locale}/partnerships`} className="hover:text-white transition-colors">{t('professionals.partnerships')}</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
              <span className="w-1 h-6 bg-blue-600 mr-3"></span>
              {t('support.supportHelp')}
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-white text-sm font-semibold mb-2">{t('support.customerSupport')}</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href={`/${locale}/help`} className="hover:text-white transition-colors">{t('support.helpCenter')}</Link></li>
                  <li><Link href={`/${locale}/faq`} className="hover:text-white transition-colors">{t('support.faq')}</Link></li>
                  <li><Link href={`/${locale}/contact`} className="hover:text-white transition-colors">{t('support.contactUs')}</Link></li>
                  <li><Link href={`/${locale}/safety`} className="hover:text-white transition-colors">{t('support.safetyGuidelines')}</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white text-sm font-semibold mb-2">{t('legal.title')}</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href={`/${locale}/terms`} className="hover:text-white transition-colors">{t('support.terms')}</Link></li>
                  <li><Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">{t('support.privacy')}</Link></li>
                  <li><Link href={`/${locale}/cookies`} className="hover:text-white transition-colors">{t('support.cookies')}</Link></li>
                  <li><Link href={`/${locale}/legal-notice`} className="hover:text-white transition-colors">{t('support.legalNotice')}</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Countries & Languages Section */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Available Countries */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                {t('location.availableCountries')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {countries.map((country) => (
                  <div key={country.code} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-white font-semibold flex items-center">
                          <span className="text-2xl mr-2">{country.flag}</span>
                          {country.name}
                        </h4>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 mb-2">
                      {country.cities.join(' • ')}
                    </div>
                    <div className="flex items-center text-xs text-gray-400">
                      <Phone className="w-3 h-3 mr-1" />
                      {country.phone}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Languages & Currency */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">
                🌐 {t('location.availableLanguages')}
              </h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {languages.map((lang) => (
                  <Link
                    key={lang.code}
                    href={`/${lang.code}`}
                    className={`flex items-center p-3 rounded-lg transition-all ${
                      locale === lang.code
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-750'
                    }`}
                  >
                    <span className="text-2xl mr-3">{lang.flag}</span>
                    <span className="font-medium">{lang.name}</span>
                  </Link>
                ))}
              </div>

              {/* Currency Selector */}
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <h4 className="text-white font-semibold mb-3 flex items-center">
                  <DollarSign className="w-4 h-4 mr-2" />
                  {t('currency.title', { defaultValue: 'Currency' })}
                </h4>
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {currencies.map((curr) => (
                    <option key={curr} value={curr}>
                      {curr}
                    </option>
                  ))}
                </select>
              </div>

              {/* App Downloads */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-3">{t('app.downloadApp')}</h4>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="#" className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors">
                    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                    <div className="text-left">
                      <div className="text-xs">{t('app.downloadOn')}</div>
                      <div className="text-sm font-semibold">{t('app.appStore')}</div>
                    </div>
                  </a>
                  <a href="#" className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors">
                    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                    <div className="text-left">
                      <div className="text-xs">{t('app.getItOn')}</div>
                      <div className="text-sm font-semibold">{t('app.googlePlay')}</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Legal & Copyright */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-center md:text-left">
              <p className="mb-1">{t('copyright', { year: new Date().getFullYear() })}</p>
              <p className="text-xs text-gray-500">
                {t('registrationInfo')}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              <Link href={`/${locale}/terms`} className="hover:text-white transition-colors">{t('support.terms')}</Link>
              <span className="text-gray-600">•</span>
              <Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">{t('support.privacy')}</Link>
              <span className="text-gray-600">•</span>
              <Link href={`/${locale}/cookies`} className="hover:text-white transition-colors">{t('support.cookies')}</Link>
              <span className="text-gray-600">•</span>
              <Link href={`/${locale}/sitemap`} className="hover:text-white transition-colors">{t('support.sitemap')}</Link>
              <span className="text-gray-600">•</span>
              <Link href={`/${locale}/accessibility`} className="hover:text-white transition-colors">{t('support.accessibility')}</Link>
            </div>
          </div>
          
          {/* Legal Disclaimer */}
          <div className="mt-6 p-4 bg-gray-800 rounded-lg text-xs text-gray-400 leading-relaxed">
            <p className="mb-2">
              <strong className="text-gray-300">{t('disclaimer.title')}</strong> {t('disclaimer.text')}
            </p>
            <p>
              <strong className="text-gray-300">{t('disclaimer.paymentTitle')}</strong> {t('disclaimer.paymentText')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
