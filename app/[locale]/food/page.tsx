import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Food & Grocery - Premium Gourmet Products',
  description: 'Discover our selection of premium food products including artisan cheeses, luxury chocolates, and gourmet delicacies.',
};

export default async function FoodPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Premium Food & Grocery Delivery
            </h1>
            <p className="text-xl mb-8 text-emerald-50">
              Artisan cheeses, luxury chocolates, gourmet delicacies and more delivered to your door. Fresh, premium, authentic.
            </p>
            <div className="flex gap-4">
              <Link
                href="/en/food/products"
                className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
              >
                Shop Now
              </Link>
              <Link
                href="/en/food/categories"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our carefully curated selection of premium food products
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: 'Dairy & Cheese', icon: '🧀', slug: 'dairy-cheese' },
              { name: 'Ice Cream', icon: '🍦', slug: 'frozen-desserts' },
              { name: 'Chocolates', icon: '🍫', slug: 'chocolates-sweets' },
              { name: 'Gourmet', icon: '🍽️', slug: 'gourmet-delicacies' },
              { name: 'Cakes', icon: '🎂', slug: 'cakes-pastries' },
              { name: 'Catering', icon: '🍱', slug: 'party-catering' },
            ].map((category) => (
              <Link
                key={category.slug}
                href={`/en/food/categories/${category.slug}`}
                className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-5xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-sm">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
              <p className="text-gray-600">Handpicked selection of premium items</p>
            </div>
            <Link
              href="/en/food/products?featured=true"
              className="text-emerald-600 hover:text-emerald-700 font-semibold"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Placeholder cards */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div className="aspect-square bg-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1">Product Name</h3>
                  <p className="text-sm text-gray-500 mb-3">Category</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-emerald-600">0 AED</span>
                    </div>
                    <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-semibold">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">Premium Quality</h3>
              <p className="text-gray-600">Only the finest products from trusted sources</p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Same-day delivery available in selected areas</p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">Best Prices</h3>
              <p className="text-gray-600">Competitive pricing with regular discounts</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Start Your Gourmet Journey Today</h2>
            <p className="text-emerald-50 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers enjoying premium food products delivered fresh to their door
            </p>
            <Link
              href="/en/food/products"
              className="inline-block bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
            >
              Shop All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
