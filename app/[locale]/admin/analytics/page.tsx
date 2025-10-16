'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
  Package,
  Building2,
  Bot,
  Tag,
  FileText,
  Calendar,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';

interface Analytics {
  overview: {
    totalUsers: number;
    newUsers: number;
    userGrowth: number;
    totalBookings: number;
    newBookings: number;
    bookingGrowth: number;
    totalRevenue: number;
    periodRevenue: number;
    revenueGrowth: number;
    totalServices: number;
    totalPartners: number;
    activePartners: number;
    totalChatbots: number;
    totalPromotions: number;
    activePromotions: number;
    totalPages: number;
  };
  bookingsByStatus: Array<{ status: string; count: number }>;
  topServices: Array<{ serviceId: string; name: string; bookings: number }>;
  recentBookings: Array<any>;
}

export default function AnalyticsPage() {
  const params = useParams();
  const locale = params.locale as string;

  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('30');
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/analytics?period=${period}`);
      const data = await response.json();
      if (response.ok) {
        setAnalytics(data.analytics);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      CONFIRMED: 'bg-blue-100 text-blue-800',
      IN_PROGRESS: 'bg-purple-100 text-purple-800',
      COMPLETED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800',
      REFUNDED: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPaymentStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      PAID: 'bg-green-100 text-green-800',
      FAILED: 'bg-red-100 text-red-800',
      REFUNDED: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading || !analytics) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des statistiques...</p>
        </div>
      </div>
    );
  }

  const { overview, bookingsByStatus, topServices, recentBookings } = analytics;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-600 text-white py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
              <p className="text-primary-100 mt-1">Vue d'ensemble des performances</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPeriod('7')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  period === '7'
                    ? 'bg-white text-primary-600'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                7 jours
              </button>
              <button
                onClick={() => setPeriod('30')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  period === '30'
                    ? 'bg-white text-primary-600'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                30 jours
              </button>
              <button
                onClick={() => setPeriod('90')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  period === '90'
                    ? 'bg-white text-primary-600'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                90 jours
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Main Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Users */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              {overview.userGrowth > 0 ? (
                <div className="flex items-center gap-1 text-green-600">
                  <ArrowUp className="w-4 h-4" />
                  <span className="text-sm font-semibold">{overview.userGrowth}%</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-red-600">
                  <ArrowDown className="w-4 h-4" />
                  <span className="text-sm font-semibold">{Math.abs(overview.userGrowth)}%</span>
                </div>
              )}
            </div>
            <div className="text-2xl font-bold text-gray-900">{overview.totalUsers}</div>
            <div className="text-sm text-gray-500 mt-1">Utilisateurs totaux</div>
            <div className="text-xs text-gray-400 mt-2">
              +{overview.newUsers} nouveaux ({period} jours)
            </div>
          </div>

          {/* Bookings */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-purple-600" />
              </div>
              {overview.bookingGrowth > 0 ? (
                <div className="flex items-center gap-1 text-green-600">
                  <ArrowUp className="w-4 h-4" />
                  <span className="text-sm font-semibold">{overview.bookingGrowth}%</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-red-600">
                  <ArrowDown className="w-4 h-4" />
                  <span className="text-sm font-semibold">{Math.abs(overview.bookingGrowth)}%</span>
                </div>
              )}
            </div>
            <div className="text-2xl font-bold text-gray-900">{overview.totalBookings}</div>
            <div className="text-sm text-gray-500 mt-1">Réservations totales</div>
            <div className="text-xs text-gray-400 mt-2">
              +{overview.newBookings} nouvelles ({period} jours)
            </div>
          </div>

          {/* Revenue */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              {overview.revenueGrowth > 0 ? (
                <div className="flex items-center gap-1 text-green-600">
                  <ArrowUp className="w-4 h-4" />
                  <span className="text-sm font-semibold">{overview.revenueGrowth}%</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-red-600">
                  <ArrowDown className="w-4 h-4" />
                  <span className="text-sm font-semibold">{Math.abs(overview.revenueGrowth)}%</span>
                </div>
              )}
            </div>
            <div className="text-2xl font-bold text-gray-900">
              ${overview.totalRevenue.toFixed(0)}
            </div>
            <div className="text-sm text-gray-500 mt-1">Revenu total</div>
            <div className="text-xs text-gray-400 mt-2">
              ${overview.periodRevenue.toFixed(0)} ({period} jours)
            </div>
          </div>

          {/* Services */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Package className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{overview.totalServices}</div>
            <div className="text-sm text-gray-500 mt-1">Services actifs</div>
          </div>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3">
              <Building2 className="w-8 h-8 text-primary-600" />
              <div>
                <div className="text-2xl font-bold">{overview.totalPartners}</div>
                <div className="text-sm text-gray-500">Partenaires</div>
                <div className="text-xs text-green-600 mt-1">
                  {overview.activePartners} actifs
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3">
              <Bot className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{overview.totalChatbots}</div>
                <div className="text-sm text-gray-500">Chatbots</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3">
              <Tag className="w-8 h-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">{overview.totalPromotions}</div>
                <div className="text-sm text-gray-500">Promotions</div>
                <div className="text-xs text-green-600 mt-1">
                  {overview.activePromotions} actives
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-gray-600" />
              <div>
                <div className="text-2xl font-bold">{overview.totalPages}</div>
                <div className="text-sm text-gray-500">Pages CMS</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Bookings by Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Réservations par statut</h2>
            <div className="space-y-3">
              {bookingsByStatus.map((item) => {
                const total = bookingsByStatus.reduce((sum, b) => sum + b.count, 0);
                const percentage = ((item.count / total) * 100).toFixed(1);
                return (
                  <div key={item.status}>
                    <div className="flex justify-between items-center mb-1">
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                      <span className="text-sm font-semibold">{item.count} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Services */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Services les plus populaires</h2>
            <div className="space-y-3">
              {topServices.map((service, index) => (
                <div key={service.serviceId} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-bold text-sm">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{service.name}</div>
                    <div className="text-sm text-gray-500">{service.bookings} réservations</div>
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold">Réservations récentes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paiement</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.service}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      ${booking.total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${getPaymentStatusColor(booking.paymentStatus)}`}>
                        {booking.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(booking.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
