'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, X, CheckCircle, XCircle, Star, Award, Shield, Package } from 'lucide-react';

interface Supplier {
  id: string;
  name: string;
  slug: string;
  companyName: string;
  businessType: string;
  yearEstablished: number | null;
  numberOfEmployees: string | null;
  mainCategory: string;
  logo: string | null;
  minOrderQuantity: string | null;
  priceRange: string | null;
  deliveryTime: string | null;
  paymentTerms: string[];
  certifications: string[];
  capabilities: string[];
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

export default function CompareSuppliers() {
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = params.locale as string;

  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ids = searchParams.get('ids')?.split(',') || [];
    if (ids.length > 0) {
      fetchSuppliers(ids);
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  const fetchSuppliers = async (ids: string[]) => {
    try {
      const promises = ids.map((slug) =>
        fetch(`/api/suppliers/${slug}`).then((res) => res.json())
      );
      const data = await Promise.all(promises);
      setSuppliers(data.filter((s) => s && !s.error));
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeSupplier = (slug: string) => {
    const remaining = suppliers.filter((s) => s.slug !== slug);
    setSuppliers(remaining);
    
    // Update URL
    const newIds = remaining.map((s) => s.slug).join(',');
    const newUrl = `/${locale}/suppliers/compare${newIds ? `?ids=${newIds}` : ''}`;
    window.history.pushState({}, '', newUrl);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading comparison...</p>
        </div>
      </div>
    );
  }

  if (suppliers.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <Link
            href={`/${locale}/suppliers`}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Suppliers
          </Link>
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Suppliers to Compare</h2>
            <p className="text-gray-600 mb-6">
              Select suppliers from the list to compare them side by side
            </p>
            <Link
              href={`/${locale}/suppliers`}
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Browse Suppliers
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const comparisonRows = [
    { label: 'Company Name', key: 'companyName' },
    { label: 'Business Type', key: 'businessType' },
    { label: 'Year Established', key: 'yearEstablished' },
    { label: 'Employees', key: 'numberOfEmployees' },
    { label: 'Location', key: 'location' },
    { label: 'Main Category', key: 'mainCategory' },
    { label: 'Verified', key: 'isVerified', type: 'boolean' },
    { label: 'Gold Supplier', key: 'isGoldSupplier', type: 'boolean' },
    { label: 'Halal Certified', key: 'isHalalCertified', type: 'boolean' },
    { label: 'Organic Certified', key: 'isOrganicCertified', type: 'boolean' },
    { label: 'Rating', key: 'rating', type: 'rating' },
    { label: 'Reviews', key: 'reviews' },
    { label: 'Response Rate', key: 'responseRate', type: 'percentage' },
    { label: 'Response Time', key: 'responseTime' },
    { label: 'MOQ', key: 'minOrderQuantity' },
    { label: 'Price Range', key: 'priceRange' },
    { label: 'Delivery Time', key: 'deliveryTime' },
    { label: 'Payment Terms', key: 'paymentTerms', type: 'array' },
    { label: 'Certifications', key: 'certifications', type: 'array' },
    { label: 'Capabilities', key: 'capabilities', type: 'array' },
  ];

  const getValue = (supplier: Supplier, row: any) => {
    if (row.key === 'location') {
      return `${supplier.City.name}, ${supplier.Country.name}`;
    }

    const value = (supplier as any)[row.key];

    if (row.type === 'boolean') {
      return value ? (
        <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
      ) : (
        <XCircle className="w-5 h-5 text-gray-300 mx-auto" />
      );
    }

    if (row.type === 'rating') {
      return (
        <div className="flex items-center justify-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="font-semibold">{value}</span>
        </div>
      );
    }

    if (row.type === 'percentage') {
      return `${value}%`;
    }

    if (row.type === 'array') {
      return value && value.length > 0 ? (
        <div className="flex flex-wrap gap-1 justify-center">
          {value.slice(0, 3).map((item: string, idx: number) => (
            <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
              {item}
            </span>
          ))}
          {value.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{value.length - 3}
            </span>
          )}
        </div>
      ) : (
        <span className="text-gray-400">-</span>
      );
    }

    return value || <span className="text-gray-400">-</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <Link
            href={`/${locale}/suppliers`}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Suppliers
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            Compare Suppliers ({suppliers.length})
          </h1>
          <p className="text-gray-600 mt-2">
            Compare features, pricing, and capabilities side by side
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left bg-gray-50 sticky left-0 z-10 min-w-[200px]">
                  <span className="text-sm font-semibold text-gray-700">Feature</span>
                </th>
                {suppliers.map((supplier) => (
                  <th key={supplier.id} className="p-4 text-center min-w-[250px] relative">
                    <button
                      onClick={() => removeSupplier(supplier.slug)}
                      className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full"
                      title="Remove from comparison"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                    <div className="flex flex-col items-center gap-2">
                      <div className="text-4xl">{supplier.logo}</div>
                      <div>
                        <Link
                          href={`/${locale}/suppliers/${supplier.slug}`}
                          className="font-bold text-gray-900 hover:text-blue-600"
                        >
                          {supplier.name}
                        </Link>
                        <div className="flex items-center justify-center gap-2 mt-2">
                          {supplier.isGoldSupplier && (
                            <Award className="w-4 h-4 text-yellow-500" title="Gold Supplier" />
                          )}
                          {supplier.isVerified && (
                            <CheckCircle className="w-4 h-4 text-blue-600" title="Verified" />
                          )}
                          {supplier.isHalalCertified && (
                            <Shield className="w-4 h-4 text-green-600" title="Halal Certified" />
                          )}
                        </div>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="p-4 font-medium text-gray-700 sticky left-0 z-10 bg-inherit border-r">
                    {row.label}
                  </td>
                  {suppliers.map((supplier) => (
                    <td key={supplier.id} className="p-4 text-center text-sm text-gray-600">
                      {getValue(supplier, row)}
                    </td>
                  ))}
                </tr>
              ))}
              {/* Action Row */}
              <tr className="border-t-2">
                <td className="p-4 font-medium text-gray-700 sticky left-0 z-10 bg-white border-r">
                  Actions
                </td>
                {suppliers.map((supplier) => (
                  <td key={supplier.id} className="p-4 text-center">
                    <div className="flex flex-col gap-2">
                      <Link
                        href={`/${locale}/suppliers/${supplier.slug}`}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                      >
                        View Details
                      </Link>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                        Send Inquiry
                      </button>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Add More Suppliers */}
        <div className="mt-6 text-center">
          <Link
            href={`/${locale}/suppliers`}
            className="inline-block px-6 py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors"
          >
            + Add More Suppliers to Compare
          </Link>
        </div>
      </div>
    </div>
  );
}
