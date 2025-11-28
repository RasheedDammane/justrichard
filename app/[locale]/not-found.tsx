import Link from 'next/link';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import BackButton from '../components/BackButton';

const translations = {
  en: {
    title: 'Oops! Page Not Found',
    description: "The page you're looking for doesn't exist or has been moved.",
    home: 'Go to Homepage',
    back: 'Go Back',
    explore: 'Or explore our services:',
    carRental: 'Car Rental',
    yachts: 'Yachts',
    transfers: 'Transfers',
    properties: 'Properties',
    activities: 'Activities',
    help: 'Need help? Contact us at',
  },
  fr: {
    title: 'Oups ! Page Introuvable',
    description: "La page que vous recherchez n'existe pas ou a été déplacée.",
    home: "Aller à l'Accueil",
    back: 'Retour',
    explore: 'Ou explorez nos services :',
    carRental: 'Location de Voitures',
    yachts: 'Yachts',
    transfers: 'Transferts',
    properties: 'Propriétés',
    activities: 'Activités',
    help: 'Besoin d\'aide ? Contactez-nous à',
  },
  th: {
    title: 'อ๊ะ! ไม่พบหน้านี้',
    description: 'หน้าที่คุณกำลังมองหาไม่มีอยู่หรือถูกย้ายแล้ว',
    home: 'ไปหน้าแรก',
    back: 'ย้อนกลับ',
    explore: 'หรือสำรวจบริการของเรา:',
    carRental: 'เช่ารถยนต์',
    yachts: 'เรือยอชท์',
    transfers: 'รถรับส่ง',
    properties: 'อสังหาริมทรัพย์',
    activities: 'กิจกรรม',
    help: 'ต้องการความช่วยเหลือ? ติดต่อเราที่',
  },
};

export default function LocaleNotFound({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as keyof typeof translations;
  const t = translations[locale] || translations.en;

  return (
    <>
      <Header lang={locale} />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Animation */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-orange-500 mb-4 animate-bounce">
            404
          </h1>
          <div className="text-6xl mb-4">🔍</div>
        </div>

        {/* Message */}
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          {t.title}
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          {t.description}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            {t.home}
          </Link>

          <BackButton label={t.back} />
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">{t.explore}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href={`/${locale}/rental`}
              className="px-4 py-2 bg-white text-gray-700 rounded-full hover:bg-orange-50 hover:text-orange-600 transition-colors border border-gray-200 text-sm font-medium"
            >
              🚗 {t.carRental}
            </Link>
            <Link
              href={`/${locale}/yachts`}
              className="px-4 py-2 bg-white text-gray-700 rounded-full hover:bg-orange-50 hover:text-orange-600 transition-colors border border-gray-200 text-sm font-medium"
            >
              🚤 {t.yachts}
            </Link>
            <Link
              href={`/${locale}/services/transfer`}
              className="px-4 py-2 bg-white text-gray-700 rounded-full hover:bg-orange-50 hover:text-orange-600 transition-colors border border-gray-200 text-sm font-medium"
            >
              🚕 {t.transfers}
            </Link>
            <Link
              href={`/${locale}/properties`}
              className="px-4 py-2 bg-white text-gray-700 rounded-full hover:bg-orange-50 hover:text-orange-600 transition-colors border border-gray-200 text-sm font-medium"
            >
              🏠 {t.properties}
            </Link>
            <Link
              href={`/${locale}/activities`}
              className="px-4 py-2 bg-white text-gray-700 rounded-full hover:bg-orange-50 hover:text-orange-600 transition-colors border border-gray-200 text-sm font-medium"
            >
              🎯 {t.activities}
            </Link>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-sm text-gray-500">
          <p>
            {t.help}{' '}
            <a
              href="mailto:support@justrichard.com"
              className="text-orange-600 hover:text-orange-700 underline"
            >
              support@justrichard.com
            </a>
          </p>
        </div>
      </div>
      </div>
      <Footer lang={locale} />
    </>
  );
}
