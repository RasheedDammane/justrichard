'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  Search, Filter, Star, MapPin, Award, TrendingUp, Package, CheckCircle, 
  Heart, GitCompare, X, DollarSign, Truck, Globe 
} from 'lucide-react';

interface Supplier {
  id: string;
  name: string;
  slug: string;
  companyName: string;
  businessType: string;
  mainCategory: string;
  categories: string[];
  tags: string[];
  logo: string;
  description: string;
  mainProducts: string;
  minOrderQuantity: string | null;
  priceRange: string | null;
  responseRate: number;
  responseTime: string | null;
  rating: number;
  reviews: number;
  isVerified: boolean;
  isGoldSupplier: boolean;
  isHalalCertified: boolean;
  isOrganicCertified: boolean;
  City: { name: string };
  Country: { name: string; code: string };
}

export default function SuppliersPageEnhanced() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCertification, setSelectedCertification] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [compareList, setCompareList] = useState<string[]>([]);

  useEffect(() => {
    fetchSuppliers();
    loadFavorites();
  }, []);

  useEffect(() => {
    filterSuppliers();
  }, [searchTerm, selectedCategory, selectedCertification, selectedCountry, minRating, suppliers]);

  const fetchSuppliers = async () => {
    try {
      const response = await fetch('/api/suppliers');
      const data = await response.json();
      setSuppliers(data);
      setFilteredSuppliers(data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = async () => {
    try {
      const response = await fetch('/api/supplier-favorites');
      const data = await response.json();
      const favoriteIds = new Set(data.map((fav: any) => fav.supplierId));
      setFavorites(favoriteIds);
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const toggleFavorite = async (supplierId: string) => {
    try {
      if (favorites.has(supplierId)) {
        await fetch(`/api/supplier-favorites?supplierId=${supplierId}`, { method: 'DELETE' });
        setFavorites(prev => {
          const newSet = new Set(prev);
          newSet.delete(supplierId);
          return newSet;
        });
      } else {
        await fetch('/api/supplier-favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ supplierId }),
        });
        setFavorites(prev => new Set(prev).add(supplierId));
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const toggleCompare = (slug: string) => {
    setCompareList(prev => {
      if (prev.includes(slug)) {
        return prev.filter(s => s !== slug);
      } else if (prev.length < 4) {
        return [...prev, slug];
      } else {
        alert('You can compare up to 4 suppliers at a time');
        return prev;
      }
    });
  };

  const goToCompare = () => {
    if (compareList.length < 2) {
      alert('Please select at least 2 suppliers to compare');
      return;
    }
    router.push(`/${locale}/suppliers/compare?ids=${compareList.join(',')}`);
  };

  const filterSuppliers = () => {
    let filtered = [...suppliers];

    if (searchTerm) {
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.mainProducts.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((s) => s.mainCategory === selectedCategory);
    }

    if (selectedCertification === 'halal') {
      filtered = filtered.filter((s) => s.isHalalCertified);
    } else if (selectedCertification === 'organic') {
      filtered = filtered.filter((s) => s.isOrganicCertified);
    }

    if (selectedCountry !== 'all') {
      filtered = filtered.filter((s) => s.Country.name === selectedCountry);
    }

    if (minRating > 0) {
      filtered = filtered.filter((s) => s.rating >= minRating);
    }

    setFilteredSuppliers(filtered);
  };

  const categories = Array.from(new Set(suppliers.map(s => s.mainCategory))).sort();
  const countries = Array.from(new Set(suppliers.map(s => s.Country.name))).sort();

  const popularTags = [
    'halal',
    'organic',
    'collagen',
    'healthy',
    'textile',
    'furniture',
    'chocolate',
    'cheese',
    'butcher',
    'cuisiniste',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Global Supplier Sourcing Platform
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Connect with verified suppliers for Textiles, Food & Beverage, Furniture, and more
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">{suppliers.length}+</div>
                <div className="text-sm text-blue-100">Verified Suppliers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">{categories.length}+</div>
                <div className="text-sm text-blue-100">Categories</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">{favorites.size}</div>
                <div className="text-sm text-blue-100">Your Favorites</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">{compareList.length}</div>
                <div className="text-sm text-blue-100">To Compare</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white border-b sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search suppliers, products, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <Filter className="w-5 h-5" />
              Filters {showFilters ? '▲' : '▼'}
            </button>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="hidden md:block px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              value={selectedCertification}
              onChange={(e) => setSelectedCertification(e.target.value)}
              className="hidden md:block px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Certifications</option>
              <option value="halal">Halal Certified</option>
              <option value="organic">Organic Certified</option>
            </select>

            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="hidden md:block px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Countries</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="md:hidden mt-4 space-y-3 pb-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <select
                value={selectedCertification}
                onChange={(e) => setSelectedCertification(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              >
                <option value="all">All Certifications</option>
                <option value="halal">Halal Certified</option>
                <option value="organic">Organic Certified</option>
              </select>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              >
                <option value="all">All Countries</option>
                {countries.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Rating: {minRating > 0 ? minRating : 'Any'}
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={minRating}
                  onChange={(e) => setMinRating(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {/* Popular Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Popular:</span>
            {popularTags.slice(0, 6).map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchTerm(tag)}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-blue-100 hover:text-blue-600 rounded-full transition-colors"
              >
                #{tag}
              </button>
            ))}
          </div>

          {/* Quick Links */}
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/suppliers/favorites`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-600 rounded-lg hover:bg-pink-100 transition-colors"
            >
              <Heart className="w-4 h-4" />
              My Favorites ({favorites.size})
            </Link>
            {compareList.length > 0 && (
              <button
                onClick={goToCompare}
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <GitCompare className="w-4 h-4" />
                Compare ({compareList.length})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredSuppliers.length} Suppliers Found
          </h2>
          <p className="text-gray-600">
            {selectedCategory !== 'all' && `in ${selectedCategory} `}
            {selectedCertification !== 'all' && `with ${selectedCertification} certification `}
            {selectedCountry !== 'all' && `from ${selectedCountry}`}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading suppliers...</p>
          </div>
        ) : filteredSuppliers.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No suppliers found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSuppliers.map((supplier) => (
              <div
                key={supplier.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group relative"
              >
                {/* Favorite & Compare Buttons */}
                <div className="absolute top-3 right-3 z-10 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(supplier.id);
                    }}
                    className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                      favorites.has(supplier.id)
                        ? 'bg-pink-500 text-white'
                        : 'bg-white/90 text-gray-600 hover:bg-pink-100 hover:text-pink-600'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${favorites.has(supplier.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleCompare(supplier.slug);
                    }}
                    className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                      compareList.includes(supplier.slug)
                        ? 'bg-purple-500 text-white'
                        : 'bg-white/90 text-gray-600 hover:bg-purple-100 hover:text-purple-600'
                    }`}
                  >
                    <GitCompare className="w-4 h-4" />
                  </button>
                </div>

                <Link href={`/${locale}/suppliers/${supplier.slug}`}>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-4xl">{supplier.logo}</div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
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
                      {supplier.isVerified && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          <CheckCircle className="w-3 h-3" />
                          Verified
                        </span>
                      )}
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

                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-1">Main Products:</p>
                      <p className="text-sm text-gray-700 line-clamp-2">{supplier.mainProducts}</p>
                    </div>

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
                      <span className="text-sm font-semibold text-blue-600">
                        {supplier.responseTime || '< 24h'}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Compare Bar (Sticky Bottom) */}
      {compareList.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-purple-600 text-white shadow-lg z-30">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <GitCompare className="w-6 h-6" />
                <span className="font-semibold">
                  {compareList.length} supplier{compareList.length > 1 ? 's' : ''} selected for comparison
                </span>
                <div className="hidden md:flex gap-2">
                  {compareList.map((slug) => {
                    const supplier = suppliers.find(s => s.slug === slug);
                    return supplier ? (
                      <div key={slug} className="flex items-center gap-2 bg-purple-700 px-3 py-1 rounded-full">
                        <span className="text-sm">{supplier.name}</span>
                        <button
                          onClick={() => toggleCompare(slug)}
                          className="hover:bg-purple-800 rounded-full p-1"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setCompareList([])}
                  className="px-4 py-2 bg-purple-700 hover:bg-purple-800 rounded-lg transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={goToCompare}
                  disabled={compareList.length < 2}
                  className="px-6 py-2 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Compare Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
