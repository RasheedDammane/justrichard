"use client";

export default function NavbarError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.error("Navbar error:", error);

  return (
    <nav className="bg-red-50 shadow-sm border-b border-red-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <span className="text-red-600 text-sm">Navigation unavailable</span>
          <button
            onClick={() => reset()}
            className="px-3 py-1 text-xs text-red-600 border border-red-300 rounded hover:bg-red-100"
          >
            Retry
          </button>
        </div>
      </div>
    </nav>
  );
}
