'use client';

import { useState, useEffect } from 'react';
import { 
  Building2, Search, Filter, Eye, CheckCircle, XCircle, 
  Clock, MapPin, Phone, Mail, Globe, Calendar, User 
} from 'lucide-react';
import Link from 'next/link';

interface BusinessClaim {
  id: string;
  businessName: string;
  googlePlaceId?: string;
  address?: string;
  city?: string;
  country?: string;
  phone?: string;
  website?: string;
  claimantName: string;
  claimantEmail: string;
  claimantPhone?: string;
  claimantRole: string;
  status: string;
  verificationMethod: string;
  rating?: number;
  userRatingsTotal?: number;
  createdAt: string;
  verifiedAt?: string;
  claimantUser?: {
    id: string;
    firstName?: string;
    lastName?: string;
    email: string;
  };
}

export default function ClaimsListClient({ locale }: { locale: string }) {
  const [claims, setClaims] = useState<BusinessClaim[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchClaims();
  }, [filter]);

  const fetchClaims = async () => {
    setLoading(true);
    try {
      const url = filter === 'all' 
        ? '/api/business-claims' 
        : `/api/business-claims?status=${filter}`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setClaims(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching claims:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (claimId: string, newStatus: string, rejectionReason?: string) => {
    try {
      const response = await fetch(`/api/business-claims/${claimId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          status: newStatus,
          ...(rejectionReason && { rejectionReason })
        }),
      });

      const data = await response.json();

      if (data.success) {
        fetchClaims();
        alert('Claim status updated successfully');
      } else {
        alert(data.error || 'Failed to update claim');
      }
    } catch (error) {
      console.error('Error updating claim:', error);
      alert('Failed to update claim');
    }
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { color: string; icon: any; label: string }> = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Pending' },
      verified: { color: 'bg-blue-100 text-blue-800', icon: CheckCircle, label: 'Verified' },
      approved: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Approved' },
      rejected: { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Rejected' },
    };

    const badge = badges[status] || badges.pending;
    const Icon = badge.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        <Icon className="h-3 w-3" />
        {badge.label}
      </span>
    );
  };

  const filteredClaims = claims.filter(claim => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      claim.businessName.toLowerCase().includes(query) ||
      claim.claimantName.toLowerCase().includes(query) ||
      claim.claimantEmail.toLowerCase().includes(query) ||
      claim.city?.toLowerCase().includes(query) ||
      claim.country?.toLowerCase().includes(query)
    );
  });

  const stats = {
    total: claims.length,
    pending: claims.filter(c => c.status === 'pending').length,
    verified: claims.filter(c => c.status === 'verified').length,
    approved: claims.filter(c => c.status === 'approved').length,
    rejected: claims.filter(c => c.status === 'rejected').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Business Claims</h1>
          <p className="text-gray-600 mt-1">Manage business ownership claims</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">Total Claims</div>
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
        </div>
        <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-4">
          <div className="text-sm text-yellow-700 mb-1">Pending</div>
          <div className="text-2xl font-bold text-yellow-900">{stats.pending}</div>
        </div>
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
          <div className="text-sm text-blue-700 mb-1">Verified</div>
          <div className="text-2xl font-bold text-blue-900">{stats.verified}</div>
        </div>
        <div className="bg-green-50 rounded-lg border border-green-200 p-4">
          <div className="text-sm text-green-700 mb-1">Approved</div>
          <div className="text-2xl font-bold text-green-900">{stats.approved}</div>
        </div>
        <div className="bg-red-50 rounded-lg border border-red-200 p-4">
          <div className="text-sm text-red-700 mb-1">Rejected</div>
          <div className="text-2xl font-bold text-red-900">{stats.rejected}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by business name, claimant, city..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg font-medium ${
                filter === 'pending'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('verified')}
              className={`px-4 py-2 rounded-lg font-medium ${
                filter === 'verified'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Verified
            </button>
            <button
              onClick={() => setFilter('approved')}
              className={`px-4 py-2 rounded-lg font-medium ${
                filter === 'approved'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Approved
            </button>
          </div>
        </div>
      </div>

      {/* Claims List */}
      {loading ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading claims...</p>
        </div>
      ) : filteredClaims.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No claims found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredClaims.map((claim) => (
            <div key={claim.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex-shrink-0">
                    <Building2 className="h-10 w-10 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{claim.businessName}</h3>
                      {getStatusBadge(claim.status)}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                      {claim.address && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{claim.address}</span>
                        </div>
                      )}
                      {claim.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 flex-shrink-0" />
                          <span>{claim.phone}</span>
                        </div>
                      )}
                      {claim.website && (
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 flex-shrink-0" />
                          <a 
                            href={claim.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline truncate"
                          >
                            {claim.website}
                          </a>
                        </div>
                      )}
                      {claim.rating && (
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-500">★</span>
                          <span>{claim.rating} ({claim.userRatingsTotal} reviews)</span>
                        </div>
                      )}
                    </div>

                    {claim.googlePlaceId && (
                      <div className="mt-2">
                        <code className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          Google Place ID: {claim.googlePlaceId}
                        </code>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Claimant Info */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500 mb-2">Claimant Information</div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{claim.claimantName}</span>
                        <span className="text-gray-500">({claim.claimantRole})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{claim.claimantEmail}</span>
                      </div>
                      {claim.claimantPhone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span>{claim.claimantPhone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-2">Claim Details</div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>Submitted: {new Date(claim.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Verification: {claim.verificationMethod}</span>
                      </div>
                      {claim.verifiedAt && (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Verified: {new Date(claim.verifiedAt).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-gray-200 pt-4 mt-4 flex items-center gap-2">
                <Link
                  href={`/${locale}/admin/claims/${claim.id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  View Details
                </Link>
                
                {claim.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleUpdateStatus(claim.id, 'verified')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Verify
                    </button>
                    <button
                      onClick={() => {
                        const reason = prompt('Rejection reason:');
                        if (reason) handleUpdateStatus(claim.id, 'rejected', reason);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                    >
                      <XCircle className="h-4 w-4" />
                      Reject
                    </button>
                  </>
                )}
                
                {claim.status === 'verified' && (
                  <button
                    onClick={() => handleUpdateStatus(claim.id, 'approved')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Approve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
