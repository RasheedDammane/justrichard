'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Home, 
  Plus, 
  Edit, 
  Eye, 
  MapPin,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
} from 'lucide-react';

interface Property {
  id: string;
  title: string;
  propertyType: string;
  listingType: string;
  status: string;
  salePrice: number | null;
  rentPrice: number | null;
  pricePerSqm: number | null;
  currency: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  views: number;
  featured: boolean;
  city: {
    name: string;
  } | null;
  country: {
    name: string;
  };
  _count: {
    reviews: number;
    inquiries: number;
    viewingRequests: number;
  };
  createdAt: string;
}

export default function PropertiesPage() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;

  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<Property[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchProperties();
  }, [filter]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const url = filter === 'all' 
        ? '/api/admin/properties'
        : `/api/admin/properties?status=${filter}`;
      
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setProperties(data.properties || []);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      DRAFT: 'bg-gray-100 text-gray-800',
      PENDING_REVIEW: 'bg-yellow-100 text-yellow-800',
      PUBLISHED: 'bg-green-100 text-green-800',
      RENTED: 'bg-blue-100 text-blue-800',
      SOLD: 'bg-purple-100 text-purple-800',
      ARCHIVED: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return <CheckCircle className="w-4 h-4" />;
      case 'PENDING_REVIEW':
        return <Clock className="w-4 h-4" />;
      case 'ARCHIVED':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Edit className="w-4 h-4" />;
    }
  };

  const formatPrice = (price: number | null, currency: string) => {
    if (!price) return 'N/A';
    return `${price.toLocaleString()} ${currency}`;
  };

  const stats = {
    total: properties.length,
    draft: properties.filter(p => p.status === 'DRAFT').length,
    published: properties.filter(p => p.status === 'PUBLISHED').length,
    sold: properties.filter(p => p.status === 'SOLD').length,
    rented: properties.filter(p => p.status === 'RENTED').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-600 text-white py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Home className="w-8 h-8" />
                Gestion Immobilière
              </h1>
              <p className="text-primary-100 mt-1">
                {stats.total} propriété(s) • {stats.published} publiée(s)
              </p>
            </div>
            <Link
              href={`/${locale}/admin/properties/new`}
              className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Ajouter une propriété
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Home className="w-12 h-12 text-primary-600 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Brouillons</p>
                <p className="text-2xl font-bold text-gray-600">{stats.draft}</p>
              </div>
              <Edit className="w-12 h-12 text-gray-600 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Publiées</p>
                <p className="text-2xl font-bold text-green-600">{stats.published}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-600 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Vendues</p>
                <p className="text-2xl font-bold text-purple-600">{stats.sold}</p>
              </div>
              <DollarSign className="w-12 h-12 text-purple-600 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Louées</p>
                <p className="text-2xl font-bold text-blue-600">{stats.rented}</p>
              </div>
              <Home className="w-12 h-12 text-blue-600 opacity-20" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filter === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Toutes ({stats.total})
          </button>
          <button
            onClick={() => setFilter('DRAFT')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filter === 'DRAFT'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Brouillons ({stats.draft})
          </button>
          <button
            onClick={() => setFilter('PUBLISHED')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filter === 'PUBLISHED'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Publiées ({stats.published})
          </button>
          <button
            onClick={() => setFilter('SOLD')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filter === 'SOLD'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Vendues ({stats.sold})
          </button>
          <button
            onClick={() => setFilter('RENTED')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filter === 'RENTED'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Louées ({stats.rented})
          </button>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
              {/* Image */}
              <div className="relative h-48 bg-gray-200">
                {property.images.length > 0 ? (
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Home className="w-16 h-16 text-gray-400" />
                  </div>
                )}
                {property.featured && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    ⭐ Featured
                  </div>
                )}
                <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 ${getStatusColor(property.status)}`}>
                  {getStatusIcon(property.status)}
                  {property.status}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 line-clamp-1">{property.title}</h3>
                
                <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span className="line-clamp-1">
                    {property.city?.name}, {property.country.name}
                  </span>
                </div>

                {/* Price */}
                <div className="mb-3">
                  {property.listingType === 'FOR_SALE' && (
                    <div>
                      <p className="text-2xl font-bold text-primary-600">
                        {formatPrice(property.salePrice, property.currency)}
                      </p>
                      {property.pricePerSqm && (
                        <p className="text-xs text-gray-500">
                          {property.pricePerSqm.toFixed(0)} {property.currency}/m²
                        </p>
                      )}
                    </div>
                  )}
                  {property.listingType === 'FOR_RENT' && (
                    <div>
                      <p className="text-2xl font-bold text-blue-600">
                        {formatPrice(property.rentPrice, property.currency)}/mois
                      </p>
                      {property.pricePerSqm && (
                        <p className="text-xs text-gray-500">
                          {property.pricePerSqm.toFixed(0)} {property.currency}/m²
                        </p>
                      )}
                    </div>
                  )}
                  {property.listingType === 'BOTH' && (
                    <div>
                      <p className="text-lg font-bold text-primary-600">
                        Vente: {formatPrice(property.salePrice, property.currency)}
                      </p>
                      <p className="text-lg font-bold text-blue-600">
                        Location: {formatPrice(property.rentPrice, property.currency)}/mois
                      </p>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span>🛏️ {property.bedrooms}</span>
                  <span>🚿 {property.bathrooms}</span>
                  <span>📐 {property.area}m²</span>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {property.views}
                  </span>
                  <span>💬 {property._count.inquiries}</span>
                  <span>📅 {property._count.viewingRequests}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    href={`/${locale}/admin/properties/${property.id}`}
                    className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-center text-sm font-medium"
                  >
                    Voir
                  </Link>
                  <Link
                    href={`/${locale}/admin/properties/${property.id}/edit`}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-center text-sm font-medium"
                  >
                    Modifier
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {properties.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucune propriété
            </h3>
            <p className="text-gray-500 mb-4">
              Commencez par ajouter votre première propriété
            </p>
            <Link
              href={`/${locale}/admin/properties/new`}
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700"
            >
              <Plus className="w-5 h-5" />
              Ajouter une propriété
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
