import Link from 'next/link';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import BackButton from './components/BackButton';

export default function NotFound() {
  return (
    <>
      <Header lang="en" />
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
          Oops! Page Not Found
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/en"
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
            Go to Homepage
          </Link>

          <BackButton label="Go Back" />
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Or explore our services:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/en/rental"
              className="px-4 py-2 bg-white text-gray-700 rounded-full hover:bg-orange-50 hover:text-orange-600 transition-colors border border-gray-200 text-sm font-medium"
            >
              🚗 Car Rental
            </Link>
            <Link
              href="/en/yachts"
              className="px-4 py-2 bg-white text-gray-700 rounded-full hover:bg-orange-50 hover:text-orange-600 transition-colors border border-gray-200 text-sm font-medium"
            >
              🚤 Yachts
            </Link>
            <Link
              href="/en/services/transfer"
              className="px-4 py-2 bg-white text-gray-700 rounded-full hover:bg-orange-50 hover:text-orange-600 transition-colors border border-gray-200 text-sm font-medium"
            >
              🚕 Transfers
            </Link>
            <Link
              href="/en/properties"
              className="px-4 py-2 bg-white text-gray-700 rounded-full hover:bg-orange-50 hover:text-orange-600 transition-colors border border-gray-200 text-sm font-medium"
            >
              🏠 Properties
            </Link>
            <Link
              href="/en/activities"
              className="px-4 py-2 bg-white text-gray-700 rounded-full hover:bg-orange-50 hover:text-orange-600 transition-colors border border-gray-200 text-sm font-medium"
            >
              🎯 Activities
            </Link>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-sm text-gray-500">
          <p>Need help? Contact us at <a href="mailto:support@justrichard.com" className="text-orange-600 hover:text-orange-700 underline">support@justrichard.com</a></p>
        </div>
      </div>
      </div>
      <Footer lang="en" />
    </>
  );
}
