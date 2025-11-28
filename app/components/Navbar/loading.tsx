export default function NavbarLoading() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="h-8 w-32 bg-gray-200 animate-pulse rounded"></div>
          <div className="hidden md:flex items-center space-x-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-8 w-24 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    </nav>
  );
}
