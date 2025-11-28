'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  BarChart3,
  Eye,
  MessageSquare,
  TrendingUp,
  Users,
  Package,
  Star,
  Clock,
  DollarSign,
  Globe,
  Award,
  CheckCircle,
} from 'lucide-react';

interface DashboardStats {
  totalViews: number;
  totalInquiries: number;
  responseRate: number;
  rating: number;
  reviews: number;
  viewsThisMonth: number;
  inquiriesThisMonth: number;
  conversionRate: number;
}

export default function SupplierDashboard() {
  const params = useParams();
  const locale = params.locale as string;

  const [stats, setStats] = useState<DashboardStats>({
    totalViews: 0,
    totalInquiries: 0,
    responseRate: 0,
    rating: 0,
    reviews: 0,
    viewsThisMonth: 0,
    inquiriesThisMonth: 0,
    conversionRate: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching dashboard stats
    setTimeout(() => {
      setStats({
        totalViews: 1245,
        totalInquiries: 87,
        responseRate: 95,
        rating: 4.8,
        reviews: 42,
        viewsThisMonth: 342,
        inquiriesThisMonth: 23,
        conversionRate: 7.0,
      });
      setLoading(false);
    }, 1000);
  }, []);

  const statCards = [
    {
      title: 'Total Views',
      value: stats.totalViews.toLocaleString(),
      change: '+12%',
      icon: Eye,
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      title: 'Total Inquiries',
      value: stats.totalInquiries.toLocaleString(),
      change: '+8%',
      icon: MessageSquare,
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      title: 'Response Rate',
      value: `${stats.responseRate}%`,
      change: '+2%',
      icon: TrendingUp,
      color: 'purple',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      title: 'Average Rating',
      value: stats.rating.toFixed(1),
      change: `${stats.reviews} reviews`,
      icon: Star,
      color: 'yellow',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
    },
  ];

  const monthlyStats = [
    {
      title: 'Views This Month',
      value: stats.viewsThisMonth.toLocaleString(),
      icon: Eye,
      color: 'blue',
    },
    {
      title: 'Inquiries This Month',
      value: stats.inquiriesThisMonth.toLocaleString(),
      icon: MessageSquare,
      color: 'green',
    },
    {
      title: 'Conversion Rate',
      value: `${stats.conversionRate}%`,
      icon: TrendingUp,
      color: 'purple',
    },
  ];

  const recentInquiries = [
    {
      id: 1,
      customerName: 'John Smith',
      companyName: 'ABC Trading Co.',
      productName: 'Cotton Fabric',
      quantity: '1000 meters',
      date: '2 hours ago',
      status: 'pending',
    },
    {
      id: 2,
      customerName: 'Sarah Johnson',
      companyName: 'Global Imports Ltd',
      productName: 'Polyester Blend',
      quantity: '2000 meters',
      date: '5 hours ago',
      status: 'replied',
    },
    {
      id: 3,
      customerName: 'Mohammed Ali',
      companyName: 'Emirates Textiles',
      productName: 'Silk Fabric',
      quantity: '500 meters',
      date: '1 day ago',
      status: 'replied',
    },
  ];

  const tips = [
    {
      icon: CheckCircle,
      title: 'Complete Your Profile',
      description: 'Add more product images and certifications to increase trust',
    },
    {
      icon: Clock,
      title: 'Respond Quickly',
      description: 'Reply to inquiries within 24 hours to maintain high response rate',
    },
    {
      icon: Award,
      title: 'Upgrade to Gold',
      description: 'Become a Gold Supplier to get featured placement and more visibility',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Supplier Dashboard</h1>
              <p className="text-blue-100">Manage your supplier profile and track performance</p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                Edit Profile
              </button>
              <button className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                Upgrade to Gold
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statCards.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 ${stat.bgColor} rounded-lg`}>
                      <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                    </div>
                    <span className="text-sm text-green-600 font-semibold">{stat.change}</span>
                  </div>
                  <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Monthly Performance */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                Monthly Performance
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {monthlyStats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <stat.icon className={`w-8 h-8 mx-auto mb-2 text-${stat.color}-600`} />
                    <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Inquiries */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-green-600" />
                  Recent Inquiries
                </h2>
                <div className="space-y-4">
                  {recentInquiries.map((inquiry) => (
                    <div
                      key={inquiry.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{inquiry.customerName}</h3>
                          <p className="text-sm text-gray-600">{inquiry.companyName}</p>
                        </div>
                        <span
                          className={`px-3 py-1 text-xs rounded-full ${
                            inquiry.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {inquiry.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Product:</p>
                          <p className="font-medium text-gray-900">{inquiry.productName}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Quantity:</p>
                          <p className="font-medium text-gray-900">{inquiry.quantity}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs text-gray-500">{inquiry.date}</span>
                        <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                          {inquiry.status === 'pending' ? 'Reply' : 'View'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors">
                  View All Inquiries
                </button>
              </div>

              {/* Tips & Recommendations */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Award className="w-6 h-6 text-purple-600" />
                  Tips to Improve
                </h2>
                <div className="space-y-4">
                  {tips.map((tip, index) => (
                    <div key={index} className="border-l-4 border-purple-500 pl-4 py-2">
                      <div className="flex items-start gap-3">
                        <tip.icon className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm mb-1">{tip.title}</h3>
                          <p className="text-xs text-gray-600">{tip.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="flex flex-col items-center gap-2 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                  <Package className="w-8 h-8 text-blue-600" />
                  <span className="text-sm font-medium text-gray-900">Add Products</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
                  <MessageSquare className="w-8 h-8 text-green-600" />
                  <span className="text-sm font-medium text-gray-900">View Messages</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
                  <BarChart3 className="w-8 h-8 text-purple-600" />
                  <span className="text-sm font-medium text-gray-900">Analytics</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-4 border-2 border-gray-200 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition-colors">
                  <Globe className="w-8 h-8 text-yellow-600" />
                  <span className="text-sm font-medium text-gray-900">View Profile</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
