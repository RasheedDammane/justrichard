'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Search, Filter, Star, MapPin, Award, TrendingUp, Package, CheckCircle, Heart, GitCompare } from 'lucide-react';

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
  Country: { name: string };
}

export default function SuppliersPage() {
  const params = useParams();
  const locale = params.locale as string;
  
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCertification, setSelectedCertification] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  useEffect(() => {
    filterSuppliers();
  }, [searchTerm, selectedCategory, selectedCertification, suppliers]);

  const fetchSuppliers = async () => {
    try {
      // Simulated fetch - replace with actual API call
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

  const filterSuppliers = () => {
    let filtered = [...suppliers];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.mainProducts.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((s) => s.mainCategory === selectedCategory);
    }

    // Certification filter
    if (selectedCertification === 'halal') {
      filtered = filtered.filter((s) => s.isHalalCertified);
    } else if (selectedCertification === 'organic') {
      filtered = filtered.filter((s) => s.isOrganicCertified);
    }

    setFilteredSuppliers(filtered);
  };

  const categories = [
    'Textiles',
    'Food & Beverage',
    'Furniture',
    'Beverage',
    'Kitchen Equipment',
    'Chocolate',
    'Cheese',
    'Healthy Food',
    'Organic Food',
    'Butcher',
  ];

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
            
            {/* Stats */}
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
                <div className="text-3xl font-bold">98%</div>
                <div className="text-sm text-blue-100">Response Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">24h</div>
                <div className="text-sm text-blue-100">Avg Response</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
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

            {/* Filter Button (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>

            {/* Category Filter (Desktop) */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="hidden md:block px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Certification Filter (Desktop) */}
            <select
              value={selectedCertification}
              onChange={(e) => setSelectedCertification(e.target.value)}
              className="hidden md:block px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Certifications</option>
              <option value="halal">Halal Certified</option>
              <option value="organic">Organic Certified</option>
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
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
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
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Results Count */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredSuppliers.length} Suppliers Found
          </h2>
          <p className="text-gray-600">
            {selectedCategory !== 'all' && `in ${selectedCategory} `}
            {selectedCertification !== 'all' && `with ${selectedCertification} certification`}
          </p>
        </div>

        {/* Suppliers Grid */}
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
              <Link
                key={supplier.id}
                href={`/${locale}/suppliers/${supplier.slug}`}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group"
              >
                {/* Supplier Card */}
                <div className="p-6">
                  {/* Header */}
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
                      <Award className="w-6 h-6 text-yellow-500" />
                    )}
                  </div>

                  {/* Badges */}
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

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {supplier.description}
                  </p>

                  {/* Main Products */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">Main Products:</p>
                    <p className="text-sm text-gray-700 line-clamp-2">{supplier.mainProducts}</p>
                  </div>

                  {/* Stats */}
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

                  {/* Footer */}
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
