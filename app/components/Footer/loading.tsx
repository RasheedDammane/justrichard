export default function FooterLoading() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i}>
              <div className="h-6 w-24 bg-gray-800 animate-pulse rounded mb-4"></div>
              <div className="space-y-2">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="h-4 w-32 bg-gray-800 animate-pulse rounded"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 pt-8">
          <div className="h-4 w-64 bg-gray-800 animate-pulse rounded"></div>
        </div>
      </div>
    </footer>
  );
}
