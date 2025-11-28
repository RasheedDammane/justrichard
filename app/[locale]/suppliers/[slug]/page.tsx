'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Globe,
  MessageCircle,
  Star,
  Award,
  CheckCircle,
  Package,
  TrendingUp,
  Clock,
  DollarSign,
  Truck,
  Shield,
  Building2,
  Users,
  Calendar,
  Send,
} from 'lucide-react';

interface Supplier {
  id: string;
  name: string;
  slug: string;
  companyName: string;
  businessType: string;
  yearEstablished: number | null;
  numberOfEmployees: string | null;
  annualRevenue: string | null;
  mainCategory: string;
  categories: string[];
  products: any[];
  tags: string[];
  certifications: string[];
  isHalalCertified: boolean;
  isOrganicCertified: boolean;
  description: string;
  mainProducts: string;
  capabilities: string[];
  minOrderQuantity: string | null;
  priceRange: string | null;
  paymentTerms: string[];
  deliveryTime: string | null;
  address: string | null;
  contactPerson: string | null;
  phone: string | null;
  email: string | null;
  whatsapp: string | null;
  website: string | null;
  logo: string | null;
  images: string[];
  video: string | null;
  brochure: string | null;
  tradeShows: string[];
  responseRate: number;
  responseTime: string | null;
  totalTransactions: number;
  rating: number;
  reviews: number;
  isVerified: boolean;
  isGoldSupplier: boolean;
  City: { name: string };
  Country: { name: string; code: string };
}

export default function SupplierDetailPage() {
  const params = useParams();
  const locale = params.locale as string;
  const slug = params.slug as string;

  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [loading, setLoading] = useState(true);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [inquiryData, setInquiryData] = useState({
    productName: '',
    quantity: '',
    targetPrice: '',
    message: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    companyName: '',
    country: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchSupplier();
  }, [slug]);

  const fetchSupplier = async () => {
    try {
      const response = await fetch(`/api/suppliers/${slug}`);
      const data = await response.json();
      setSupplier(data);
    } catch (error) {
      console.error('Error fetching supplier:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/supplier-inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...inquiryData,
          supplierId: supplier?.id,
        }),
      });

      if (response.ok) {
        alert('Inquiry sent successfully! The supplier will contact you soon.');
        setShowInquiryForm(false);
        setInquiryData({
          productName: '',
          quantity: '',
          targetPrice: '',
          message: '',
          customerName: '',
          customerEmail: '',
          customerPhone: '',
          companyName: '',
          country: '',
        });
      } else {
        alert('Failed to send inquiry. Please try again.');
      }
    } catch (error) {
      console.error('Error sending inquiry:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading supplier details...</p>
        </div>
      </div>
    );
  }

  if (!supplier) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Supplier not found</h2>
          <Link href={`/${locale}/suppliers`} className="text-blue-600 hover:underline">
            Back to suppliers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href={`/${locale}`} className="text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href={`/${locale}/suppliers`} className="text-gray-600 hover:text-blue-600">
              Suppliers
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{supplier.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Header */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="text-6xl">{supplier.logo}</div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{supplier.name}</h1>
                    <p className="text-lg text-gray-600">{supplier.companyName}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {supplier.City.name}, {supplier.Country.name}
                      </span>
                    </div>
                  </div>
                </div>
                {supplier.isGoldSupplier && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <Award className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm font-semibold text-yellow-700">Gold Supplier</span>
                  </div>
                )}
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {supplier.isVerified && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                    <CheckCircle className="w-4 h-4" />
                    Verified Supplier
                  </span>
                )}
                {supplier.isHalalCertified && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                    Halal Certified
                  </span>
                )}
                {supplier.isOrganicCertified && (
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm rounded-full">
                    Organic Certified
                  </span>
                )}
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
                  {supplier.businessType}
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-yellow-500 mb-1">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="text-xl font-bold text-gray-900">{supplier.rating}</span>
                  </div>
                  <p className="text-sm text-gray-600">{supplier.reviews} Reviews</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-xl font-bold text-gray-900">{supplier.responseRate}%</span>
                  </div>
                  <p className="text-sm text-gray-600">Response Rate</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
                    <Clock className="w-5 h-5" />
                    <span className="text-xl font-bold text-gray-900">{supplier.responseTime}</span>
                  </div>
                  <p className="text-sm text-gray-600">Response Time</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-purple-600 mb-1">
                    <Package className="w-5 h-5" />
                    <span className="text-xl font-bold text-gray-900">{supplier.totalTransactions}</span>
                  </div>
                  <p className="text-sm text-gray-600">Transactions</p>
                </div>
              </div>
            </div>

            {/* Company Description */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Company Profile</h2>
              <p className="text-gray-700 leading-relaxed mb-4">{supplier.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {supplier.yearEstablished && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Established</p>
                      <p className="font-semibold text-gray-900">{supplier.yearEstablished}</p>
                    </div>
                  </div>
                )}
                {supplier.numberOfEmployees && (
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Employees</p>
                      <p className="font-semibold text-gray-900">{supplier.numberOfEmployees}</p>
                    </div>
                  </div>
                )}
                {supplier.annualRevenue && (
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Annual Revenue</p>
                      <p className="font-semibold text-gray-900">{supplier.annualRevenue}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Business Type</p>
                    <p className="font-semibold text-gray-900">{supplier.businessType}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Products */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Main Products</h2>
              <p className="text-gray-700 leading-relaxed">{supplier.mainProducts}</p>
            </div>

            {/* Products List */}
            {supplier.products && supplier.products.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Catalog</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {supplier.products.map((product: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                      <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                      <div className="space-y-1 text-sm">
                        <p className="text-gray-600">
                          <span className="font-medium">MOQ:</span> {product.moq}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Price:</span> {product.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trade Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Trade Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {supplier.minOrderQuantity && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Minimum Order Quantity</p>
                    <p className="font-semibold text-gray-900">{supplier.minOrderQuantity}</p>
                  </div>
                )}
                {supplier.priceRange && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Price Range</p>
                    <p className="font-semibold text-gray-900">{supplier.priceRange}</p>
                  </div>
                )}
                {supplier.deliveryTime && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Delivery Time</p>
                    <p className="font-semibold text-gray-900">{supplier.deliveryTime}</p>
                  </div>
                )}
                {supplier.paymentTerms && supplier.paymentTerms.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Payment Terms</p>
                    <p className="font-semibold text-gray-900">{supplier.paymentTerms.join(', ')}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Certifications */}
            {supplier.certifications && supplier.certifications.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-blue-600" />
                  Certifications
                </h2>
                <div className="flex flex-wrap gap-3">
                  {supplier.certifications.map((cert: string, index: number) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg font-medium"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Capabilities */}
            {supplier.capabilities && supplier.capabilities.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Capabilities</h2>
                <div className="flex flex-wrap gap-3">
                  {supplier.capabilities.map((cap: string, index: number) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-purple-50 border border-purple-200 text-purple-700 rounded-lg font-medium"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Trade Shows */}
            {supplier.tradeShows && supplier.tradeShows.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Trade Shows & Exhibitions</h2>
                <ul className="space-y-2">
                  {supplier.tradeShows.map((show: string, index: number) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      {show}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* Contact Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Supplier</h3>
                
                <button
                  onClick={() => setShowInquiryForm(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg mb-4 flex items-center justify-center gap-2 transition-colors"
                >
                  <Send className="w-5 h-5" />
                  Send Inquiry
                </button>

                <div className="space-y-3">
                  {supplier.contactPerson && (
                    <div>
                      <p className="text-sm text-gray-600">Contact Person</p>
                      <p className="font-semibold text-gray-900">{supplier.contactPerson}</p>
                    </div>
                  )}
                  
                  {supplier.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <a href={`tel:${supplier.phone}`} className="text-blue-600 hover:underline">
                        {supplier.phone}
                      </a>
                    </div>
                  )}
                  
                  {supplier.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <a href={`mailto:${supplier.email}`} className="text-blue-600 hover:underline">
                        {supplier.email}
                      </a>
                    </div>
                  )}
                  
                  {supplier.whatsapp && (
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-gray-400" />
                      <a
                        href={`https://wa.me/${supplier.whatsapp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        WhatsApp
                      </a>
                    </div>
                  )}
                  
                  {supplier.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <a
                        href={`https://${supplier.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {supplier.categories.map((cat: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tags */}
              {supplier.tags && supplier.tags.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {supplier.tags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Form Modal */}
      {showInquiryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Send Inquiry to {supplier.name}</h2>
                <button
                  onClick={() => setShowInquiryForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiryData.customerName}
                      onChange={(e) => setInquiryData({ ...inquiryData, customerName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={inquiryData.customerEmail}
                      onChange={(e) => setInquiryData({ ...inquiryData, customerEmail: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={inquiryData.customerPhone}
                      onChange={(e) => setInquiryData({ ...inquiryData, customerPhone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={inquiryData.companyName}
                      onChange={(e) => setInquiryData({ ...inquiryData, companyName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country *
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryData.country}
                    onChange={(e) => setInquiryData({ ...inquiryData, country: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryData.productName}
                    onChange={(e) => setInquiryData({ ...inquiryData, productName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., 1000 units"
                      value={inquiryData.quantity}
                      onChange={(e) => setInquiryData({ ...inquiryData, quantity: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Target Price
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., $10/unit"
                      value={inquiryData.targetPrice}
                      onChange={(e) => setInquiryData({ ...inquiryData, targetPrice: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={inquiryData.message}
                    onChange={(e) => setInquiryData({ ...inquiryData, message: e.target.value })}
                    placeholder="Please provide details about your requirements..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowInquiryForm(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Sending...' : 'Send Inquiry'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
