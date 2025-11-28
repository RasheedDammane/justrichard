export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="animate-pulse">
        {/* Hero */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 h-96">
          <div className="container mx-auto max-w-7xl px-4 py-16">
            <div className="h-8 bg-white/20 rounded w-1/3 mb-4"></div>
            <div className="h-12 bg-white/20 rounded w-2/3 mb-4"></div>
            <div className="h-6 bg-white/20 rounded w-1/2"></div>
          </div>
        </div>

        {/* Services */}
        <div className="container mx-auto max-w-7xl px-4 py-16">
          <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-12"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg p-6 h-64"></div>
            ))}
          </div>
        </div>

        {/* Professionals */}
        <div className="container mx-auto max-w-7xl px-4 py-16">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-12"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg p-6 h-96"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
