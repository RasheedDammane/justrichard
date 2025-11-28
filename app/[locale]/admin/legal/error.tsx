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
    // Log error but don't crash the entire admin
    console.error('[Legal Admin Module Error]:', error);
    
    // Send to error tracking if available
    if (typeof window !== 'undefined' && (window as any).reportError) {
      (window as any).reportError(error);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Legal Module Error
          </h2>
          <p className="text-gray-600 mb-6">
            An error occurred in the legal professionals module. 
            Other admin sections are still working.
          </p>
          
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
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
                console.log('[Legal Admin Module] Attempting reset...');
                reset();
              }}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
            >
              🔄 Réessayer
            </button>
            <Link
              href="/fr/admin"
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold inline-block"
            >
              🏠 Retour Admin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
