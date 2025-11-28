'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error but don't crash the app
    console.error('[Legal Module Error]:', error);
    
    // Send to error tracking if available
    if (typeof window !== 'undefined' && (window as any).reportError) {
      (window as any).reportError(error);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-2xl w-full mx-auto px-4">
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">⚖️</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Legal Services Temporarily Unavailable
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            We're experiencing a temporary issue with the legal services page. 
            The rest of the site is working normally.
          </p>
          
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-left">
              <p className="text-xs font-semibold text-red-900 mb-2">Development Error:</p>
              <p className="text-sm text-red-800 font-mono break-all">
                {error.message || 'Unknown error'}
              </p>
              {error.stack && (
                <details className="mt-2">
                  <summary className="text-xs text-red-700 cursor-pointer">Stack trace</summary>
                  <pre className="text-xs text-red-600 mt-2 overflow-auto max-h-40">
                    {error.stack}
                  </pre>
                </details>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                console.log('[Legal Module] Attempting reset...');
                reset();
              }}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              🔄 Try Again
            </button>
            <Link
              href="/"
              className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold inline-block"
            >
              🏠 Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
