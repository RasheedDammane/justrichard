'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Heart, ArrowLeft, Star, MapPin, Award, TrendingUp, Package, X } from 'lucide-react';

interface Supplier {
  id: string;
  name: string;
  slug: string;
  companyName: string;
  businessType: string;
  mainCategory: string;
  logo: string;
  description: string;
  mainProducts: string;
  responseRate: number;
  responseTime: string | null;
  rating: number;
  reviews: number;
  isVerified: boolean;
  isGoldSupplier: boolean;
  isHalalCertified: boolean;
  isOrganicCertified: boolean;
  City: { name: string };
  Country: { name: string };
}

interface Favorite {
  id: string;
  supplierId: string;
  createdAt: string;
  Supplier: Supplier;
}

export default function FavoritesPage() {
  const params = useParams();
  const locale = params.locale as string;
  
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await fetch('/api/supplier-favorites');
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (supplierId: string) => {
    try {
      await fetch(`/api/supplier-favorites?supplierId=${supplierId}`, { method: 'DELETE' });
      setFavorites(prev => prev.filter(fav => fav.supplierId !== supplierId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-pink-800 text-white py-12">
        <div className="container mx-auto px-4">
          <Link
            href={`/${locale}/suppliers`}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Suppliers
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-10 h-10 fill-current" />
            <h1 className="text-4xl font-bold">My Favorite Suppliers</h1>
          </div>
          <p className="text-pink-100">
            {favorites.length} supplier{favorites.length !== 1 ? 's' : ''} saved for later
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
            <p className="mt-4 text-gray-600">Loading your favorites...</p>
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No favorites yet</h3>
            <p className="text-gray-600 mb-6">
              Start adding suppliers to your favorites to keep track of them
            </p>
            <Link
              href={`/${locale}/suppliers`}
              className="inline-block px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
            >
              Browse Suppliers
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite) => {
              const supplier = favorite.Supplier;
              return (
                <div
                  key={favorite.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group relative"
                >
                  {/* Remove Button */}
                  <button
                    onClick={() => removeFavorite(supplier.id)}
                    className="absolute top-3 right-3 z-10 p-2 bg-white/90 hover:bg-red-100 text-gray-600 hover:text-red-600 rounded-full backdrop-blur-sm transition-colors"
                    title="Remove from favorites"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <Link href={`/${locale}/suppliers/${supplier.slug}`}>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="text-4xl">{supplier.logo}</div>
                          <div>
                            <h3 className="font-bold text-lg text-gray-900 group-hover:text-pink-600 transition-colors">
                              {supplier.name}
                            </h3>
                            <p className="text-sm text-gray-600">{supplier.businessType}</p>
                          </div>
                        </div>
                        {supplier.isGoldSupplier && (
                          <Award className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {supplier.isHalalCertified && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                            Halal
                          </span>
                        )}
                        {supplier.isOrganicCertified && (
                          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">
                            Organic
                          </span>
                        )}
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                          {supplier.mainCategory}
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {supplier.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t">
                        <div>
                          <div className="flex items-center gap-1 text-yellow-500 mb-1">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm font-semibold text-gray-900">{supplier.rating}</span>
                          </div>
                          <p className="text-xs text-gray-500">{supplier.reviews} reviews</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-1 text-green-600 mb-1">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-sm font-semibold text-gray-900">{supplier.responseRate}%</span>
                          </div>
                          <p className="text-xs text-gray-500">Response rate</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-1 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{supplier.City.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-pink-600">
                          {supplier.responseTime || '< 24h'}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        {/* Actions */}
        {favorites.length > 0 && (
          <div className="mt-8 text-center">
            <Link
              href={`/${locale}/suppliers`}
              className="inline-block px-6 py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-pink-500 hover:text-pink-600 transition-colors"
            >
              + Add More Suppliers to Favorites
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
