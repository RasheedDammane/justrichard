'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-16 h-16 text-red-600" />
          </div>
          <h1 className="text-6xl font-bold text-red-600 mb-2">Oops!</h1>
          <p className="text-2xl text-gray-700 font-semibold">Something went wrong</p>
        </div>

        {/* Error Details */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              We're sorry for the inconvenience
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              An unexpected error occurred while processing your request. Our team has been notified and is working on a fix.
            </p>
            
            {/* Error Message (for development) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
                <p className="text-sm font-mono text-red-800 break-all">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="text-xs text-red-600 mt-2">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => reset()}
              className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Try Again
            </button>
            <Link
              href="/en"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
            >
              <Home className="w-5 h-5 mr-2" />
              Go to Homepage
            </Link>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            What you can do:
          </h3>
          <ul className="text-left space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-red-600 mr-2">•</span>
              <span>Refresh the page and try again</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2">•</span>
              <span>Go back to the homepage and navigate from there</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2">•</span>
              <span>Clear your browser cache and cookies</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2">•</span>
              <span>Contact our support team if the problem persists</span>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <p className="mt-8 text-gray-600">
          Still having issues? <Link href="/en/contact" className="text-red-600 hover:underline font-semibold">Contact Support</Link>
        </p>
      </div>
    </div>
  );
}
