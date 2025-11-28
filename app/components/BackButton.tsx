'use client';

export default function BackButton({ label = 'Go Back' }: { label?: string }) {
  return (
    <button
      onClick={() => window.history.back()}
      className="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors border-2 border-gray-200 shadow hover:shadow-md"
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
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      {label}
    </button>
  );
}
