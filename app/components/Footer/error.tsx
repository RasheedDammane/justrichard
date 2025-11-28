"use client";

export default function FooterError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.error("Footer error:", error);

  return (
    <footer className="bg-red-900 text-red-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <span className="text-sm">Footer unavailable</span>
          <button
            onClick={() => reset()}
            className="px-3 py-1 text-xs border border-red-300 rounded hover:bg-red-800"
          >
            Retry
          </button>
        </div>
      </div>
    </footer>
  );
}
