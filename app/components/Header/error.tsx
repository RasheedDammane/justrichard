"use client";

export default function HeaderError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.error("Header error:", error);

  return (
    <header className="bg-red-50 border-b border-red-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-red-600 text-sm">Header unavailable</span>
          <button
            onClick={() => reset()}
            className="text-xs text-red-600 hover:underline"
          >
            Retry
          </button>
        </div>
      </div>
    </header>
  );
}
