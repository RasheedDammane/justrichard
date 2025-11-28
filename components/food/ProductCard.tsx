'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Heart } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    image?: string | null;
    sellingPrice: number;
    compareAtPrice?: number | null;
    currency: string;
    unit: string;
    stock: number;
    isOnSale?: boolean;
    isFeatured?: boolean;
    isOrganic?: boolean;
    isVegan?: boolean;
    isGlutenFree?: boolean;
    category?: {
      name: string;
    };
    brand?: {
      name: string;
    };
  };
  locale?: string;
  onAddToCart?: (productId: string) => void;
}

export default function ProductCard({ 
  product, 
  locale = 'en',
  onAddToCart 
}: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      if (onAddToCart) {
        onAddToCart(product.id);
      } else {
        // Default behavior
        const response = await fetch('/api/food/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId: product.id,
            quantity: 1,
          }),
        });
        
        if (response.ok) {
          // Show success message or update cart icon
          console.log('Product added to cart');
        }
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const discountPercentage = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.sellingPrice) / product.compareAtPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group">
      {/* Image Container */}
      <Link href={`/${locale}/food/products/${product.slug}`} className="block relative">
        <div className="aspect-square bg-gray-100 relative overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-300">
              <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isOnSale && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                -{discountPercentage}%
              </span>
            )}
            {product.isFeatured && (
              <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                Featured
              </span>
            )}
          </div>

          {/* Tags */}
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            {product.isOrganic && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">🌱 Organic</span>
            )}
            {product.isVegan && (
              <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded">🌿 Vegan</span>
            )}
            {product.isGlutenFree && (
              <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded">Gluten Free</span>
            )}
          </div>

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
          >
            <Heart
              className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            />
          </button>

          {/* Stock Badge */}
          {product.stock <= 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold">
                Out of Stock
              </span>
            </div>
          )}
          {product.stock > 0 && product.stock <= 5 && (
            <div className="absolute bottom-2 left-2">
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">
                Only {product.stock} left!
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        {/* Category/Brand */}
        {(product.category || product.brand) && (
          <p className="text-xs text-gray-500 mb-1">
            {product.brand?.name || product.category?.name}
          </p>
        )}

        {/* Product Name */}
        <Link href={`/${locale}/food/products/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-emerald-600 transition-colors min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-emerald-600">
                {product.sellingPrice.toFixed(2)} {product.currency}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {product.compareAtPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500">per {product.unit}</span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isLoading || product.stock <= 0}
          className={`w-full py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
            product.stock <= 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95'
          }`}
        >
          <ShoppingCart className="w-5 h-5" />
          {isLoading ? 'Adding...' : product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
