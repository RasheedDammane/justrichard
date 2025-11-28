import { Suspense } from 'react';
import ProductCard from '@/components/food/ProductCard';
import CategoryCard from '@/components/food/CategoryCard';

export const metadata = {
  title: 'Shop Food & Grocery Products',
  description: 'Browse our selection of premium food and grocery products',
};

async function getProducts() {
  // This will be replaced with actual API call
  return [];
}

async function getCategories() {
  // This will be replaced with actual API call
  return [];
}

export default async function FoodProductsPage() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Shop Food & Grocery</h1>
          <p className="text-gray-600">
            Discover our premium selection of artisan products
          </p>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category: any) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </section>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <input
                type="search"
                placeholder="Search products..."
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500">
              <option value="">All Categories</option>
            </select>
            <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500">
              <option value="">Sort by</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name</option>
              <option value="newest">Newest</option>
            </select>
            <div className="flex gap-2">
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                🌱 Organic
              </button>
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                🌿 Vegan
              </button>
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                ⭐ Featured
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-2xl font-bold mb-2">No Products Yet</h3>
            <p className="text-gray-600 mb-6">
              Products will appear here once the database is seeded.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto text-left">
              <p className="font-semibold text-blue-900 mb-2">💡 To see products:</p>
              <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                <li>Run: <code className="bg-blue-100 px-2 py-1 rounded">npx prisma migrate dev</code></li>
                <li>Run: <code className="bg-blue-100 px-2 py-1 rounded">npx ts-node prisma/seeds/food-products.ts</code></li>
                <li>Refresh this page</li>
              </ol>
            </div>
          </div>
        )}

        {/* Pagination (placeholder) */}
        {products.length > 0 && (
          <div className="mt-12 flex justify-center gap-2">
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Previous</button>
            <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg">1</button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">2</button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">3</button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Next</button>
          </div>
        )}
      </div>
    </div>
  );
}
