'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Home, 
  Plus, 
  Edit, 
  Eye, 
  Trash2,
  MapPin,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  Star,
  Search,
  Filter,
  Upload,
  MoreVertical,
} from 'lucide-react';

interface Property {
  id: string;
  slug: string;
  title: string | null;
  subtitle: string | null;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  type: 'RENT' | 'SALE' | 'DAILY' | 'HOURLY' | 'INVESTMENT';
  isFeatured: boolean;
  price: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  areaSize: number | null;
  areaUnit: string;
  views: number;
  bookings: number;
  city: {
    name: string;
  } | null;
  country: {
    name: string;
  } | null;
  priceCurrency: {
    code: string;
    symbol: string;
  } | null;
  owner: {
    firstName: string | null;
    lastName: string | null;
    email: string;
  } | null;
  _count: {
    media: number;
    features: number;
    floorPlans: number;
  };
  createdAt: string;
  publishedAt: string | null;
}

interface Stats {
  DRAFT?: number;
  PUBLISHED?: number;
  ARCHIVED?: number;
}

export default function PropertiesClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<Property[]>([]);
  const [stats, setStats] = useState<Stats>({});
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredFilter, setFeaturedFilter] = useState<boolean | null>(null);

  useEffect(() => {
    fetchProperties();
  }, [page, statusFilter, typeFilter, searchQuery, featuredFilter]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.append('status', statusFilter);
      if (typeFilter) params.append('type', typeFilter);
      if (searchQuery) params.append('search', searchQuery);
      if (featuredFilter !== null) params.append('featured', String(featuredFilter));
      params.append('page', String(page));
      params.append('pageSize', '20');

      const response = await fetch(`/api/admin/properties?${params}`, {
        credentials: 'include',
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setProperties(data.properties || []);
        setStats(data.stats || {});
        setTotal(data.total || 0);
        setTotalPages(data.totalPages || 1);
      } else {
        console.error('Error:', data);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;

    try {
      const response = await fetch(`/api/admin/properties/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        fetchProperties();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete property');
      }
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Failed to delete property');
    }
  };

  const handlePublish = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/properties/${id}/publish`, {
        method: 'POST',
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        alert('Property published successfully!');
        fetchProperties();
      } else {
        alert(data.error || 'Failed to publish property');
      }
    } catch (error) {
      console.error('Error publishing property:', error);
      alert('Failed to publish property');
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      DRAFT: { bg: 'bg-gray-100', text: 'text-gray-800', icon: Clock },
      PUBLISHED: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      ARCHIVED: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle },
    };
    const badge = badges[status as keyof typeof badges] || badges.DRAFT;
    const Icon = badge.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
        <Icon className="w-3 h-3" />
        {status}
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    const badges = {
      RENT: 'bg-blue-100 text-blue-800',
      SALE: 'bg-purple-100 text-purple-800',
      DAILY: 'bg-cyan-100 text-cyan-800',
      HOURLY: 'bg-teal-100 text-teal-800',
      INVESTMENT: 'bg-amber-100 text-amber-800',
    };
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${badges[type as keyof typeof badges] || 'bg-gray-100 text-gray-800'}`}>
        {type}
      </span>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Home className="w-6 h-6" />
            Properties
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage your property listings
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/en/admin/properties/import"
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Upload className="w-4 h-4" />
            Import/Export
          </Link>
          <Link
            href="/en/admin/properties/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Property
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{total}</p>
            </div>
            <Home className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Draft</p>
              <p className="text-2xl font-bold text-gray-900">{stats.DRAFT || 0}</p>
            </div>
            <Clock className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Published</p>
              <p className="text-2xl font-bold text-green-600">{stats.PUBLISHED || 0}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Archived</p>
              <p className="text-2xl font-bold text-red-600">{stats.ARCHIVED || 0}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-400" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="RENT">Rent</option>
              <option value="SALE">Sale</option>
              <option value="DAILY">Daily</option>
              <option value="HOURLY">Hourly</option>
              <option value="INVESTMENT">Investment</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Featured
            </label>
            <select
              value={featuredFilter === null ? '' : String(featuredFilter)}
              onChange={(e) => setFeaturedFilter(e.target.value === '' ? null : e.target.value === 'true')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All</option>
              <option value="true">Featured Only</option>
              <option value="false">Not Featured</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stats
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    Loading properties...
                  </td>
                </tr>
              ) : properties.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    No properties found
                  </td>
                </tr>
              ) : (
                properties.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Home className="w-6 h-6 text-gray-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-gray-900">
                              {property.title || 'Untitled'}
                            </p>
                            {property.isFeatured && (
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            )}
                          </div>
                          {property.subtitle && (
                            <p className="text-xs text-gray-500">{property.subtitle}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getTypeBadge(property.type)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-900">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{property.city?.name || 'N/A'}</span>
                      </div>
                      {property.country && (
                        <p className="text-xs text-gray-500">{property.country.name}</p>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {property.price ? (
                        <div className="flex items-center gap-1 text-sm font-medium text-gray-900">
                          <DollarSign className="w-4 h-4 text-gray-400" />
                          <span>
                            {property.priceCurrency?.symbol || '$'}
                            {property.price.toLocaleString()}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {property.bedrooms && `${property.bedrooms} bed`}
                        {property.bedrooms && property.bathrooms && ' • '}
                        {property.bathrooms && `${property.bathrooms} bath`}
                      </div>
                      {property.areaSize && (
                        <div className="text-xs text-gray-500">
                          {property.areaSize} {property.areaUnit}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(property.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-xs text-gray-500 space-y-1">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {property.views} views
                        </div>
                        <div className="flex items-center gap-1">
                          <Upload className="w-3 h-3" />
                          {property._count.media} photos
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/en/properties/${property.slug}`}
                          target="_blank"
                          className="text-gray-600 hover:text-gray-900"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/en/admin/properties/${property.id}/edit`}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        {property.status === 'DRAFT' && (
                          <button
                            onClick={() => handlePublish(property.id)}
                            className="text-green-600 hover:text-green-900"
                            title="Publish"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(property.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing page {page} of {totalPages} ({total} total)
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
