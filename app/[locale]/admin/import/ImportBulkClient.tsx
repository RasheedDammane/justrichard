'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Upload, FileText, Home, Car, Bike, Ship, Calendar, 
  Users, ShoppingBag, Plane, Package, Stethoscope, Gavel,
  Dumbbell, UserCog, Download, AlertCircle, CheckCircle,
  ArrowLeft
} from 'lucide-react';

interface ImportType {
  id: string;
  name: string;
  icon: any;
  description: string;
  endpoint: string;
  templateUrl: string;
  fields: string[];
}

export default function ImportBulkClient({ locale }: { locale: string }) {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; count?: number } | null>(null);

  const importTypes: ImportType[] = [
    {
      id: 'properties',
      name: 'Properties',
      icon: Home,
      description: 'Import properties (apartments, villas, etc.)',
      endpoint: '/api/import/properties',
      templateUrl: '/templates/properties-template.csv',
      fields: ['title', 'description', 'price', 'bedrooms', 'bathrooms', 'area', 'city', 'address']
    },
    {
      id: 'rental-cars',
      name: 'Rental Cars',
      icon: Car,
      description: 'Import rental cars',
      endpoint: '/api/import/rental-cars',
      templateUrl: '/templates/rental-cars-template.csv',
      fields: ['brand', 'model', 'year', 'pricePerDay', 'city', 'fuelType', 'transmission']
    },
    {
      id: 'motorbikes',
      name: 'Motorbikes',
      icon: Bike,
      description: 'Import rental motorbikes',
      endpoint: '/api/import/motorbikes',
      templateUrl: '/templates/motorbikes-template.csv',
      fields: ['brand', 'model', 'year', 'pricePerDay', 'city', 'engineSize']
    },
    {
      id: 'yachts',
      name: 'Yachts',
      icon: Ship,
      description: 'Import yachts for rental',
      endpoint: '/api/import/yachts',
      templateUrl: '/templates/yachts-template.csv',
      fields: ['name', 'capacity', 'length', 'pricePerHour', 'city', 'amenities']
    },
    {
      id: 'events',
      name: 'Events',
      icon: Calendar,
      description: 'Import events',
      endpoint: '/api/import/events',
      templateUrl: '/templates/events-template.csv',
      fields: ['title', 'description', 'startDate', 'endDate', 'location', 'price', 'capacity']
    },
    {
      id: 'doctors',
      name: 'Doctors',
      icon: Stethoscope,
      description: 'Import doctors profiles',
      endpoint: '/api/import/doctors',
      templateUrl: '/templates/doctors-template.csv',
      fields: ['firstName', 'lastName', 'specialty', 'city', 'phone', 'email', 'consultationFee']
    },
    {
      id: 'lawyers',
      name: 'Lawyers',
      icon: Gavel,
      description: 'Import lawyers profiles',
      endpoint: '/api/import/lawyers',
      templateUrl: '/templates/lawyers-template.csv',
      fields: ['firstName', 'lastName', 'specialty', 'city', 'phone', 'email', 'consultationFee']
    },
    {
      id: 'coaches',
      name: 'Coaches',
      icon: Dumbbell,
      description: 'Import coaches profiles',
      endpoint: '/api/import/coaches',
      templateUrl: '/templates/coaches-template.csv',
      fields: ['firstName', 'lastName', 'specialty', 'city', 'phone', 'email', 'sessionFee']
    },
    {
      id: 'maids',
      name: 'Maids',
      icon: UserCog,
      description: 'Import maids profiles',
      endpoint: '/api/import/maids',
      templateUrl: '/templates/maids-template.csv',
      fields: ['firstName', 'lastName', 'services', 'city', 'phone', 'hourlyRate']
    },
    {
      id: 'activities',
      name: 'Activities',
      icon: Plane,
      description: 'Import activities & tours',
      endpoint: '/api/import/activities',
      templateUrl: '/templates/activities-template.csv',
      fields: ['title', 'description', 'price', 'duration', 'city', 'category']
    },
    {
      id: 'suppliers',
      name: 'Suppliers',
      icon: Package,
      description: 'Import suppliers',
      endpoint: '/api/import/suppliers',
      templateUrl: '/templates/suppliers-template.csv',
      fields: ['name', 'category', 'city', 'phone', 'email', 'website']
    },
    {
      id: 'food-products',
      name: 'Food Products',
      icon: ShoppingBag,
      description: 'Import food & grocery products',
      endpoint: '/api/import/food-products',
      templateUrl: '/templates/food-products-template.csv',
      fields: ['name', 'description', 'price', 'category', 'unit', 'inStock']
    },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleImport = async () => {
    if (!file || !selectedType) return;

    setImporting(true);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', selectedType);

    try {
      const type = importTypes.find(t => t.id === selectedType);
      const response = await fetch(type?.endpoint || '/api/import', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setResult({ success: true, message: data.message, count: data.count });
        setFile(null);
      } else {
        setResult({ success: false, message: data.error || 'Import failed' });
      }
    } catch (error) {
      setResult({ success: false, message: 'Network error. Please try again.' });
    } finally {
      setImporting(false);
    }
  };

  const selectedImportType = importTypes.find(t => t.id === selectedType);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <Link 
          href={`/${locale}/admin`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Import Bulk Data</h1>
        <p className="text-gray-600 mt-2">
          Import data in bulk from CSV or Excel files. Download templates to ensure correct format.
        </p>
      </div>

      {/* Result Alert */}
      {result && (
        <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
          result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          {result.success ? (
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          )}
          <div>
            <h3 className={`font-semibold ${result.success ? 'text-green-900' : 'text-red-900'}`}>
              {result.success ? 'Import Successful!' : 'Import Failed'}
            </h3>
            <p className={result.success ? 'text-green-700' : 'text-red-700'}>
              {result.message}
            </p>
            {result.count && (
              <p className="text-green-600 text-sm mt-1">
                {result.count} items imported successfully
              </p>
            )}
          </div>
        </div>
      )}

      {/* Import Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {importTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedType === type.id;
          
          return (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`p-6 rounded-lg border-2 transition-all text-left ${
                isSelected
                  ? 'border-blue-600 bg-blue-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  isSelected ? 'bg-blue-600' : 'bg-gray-100'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    isSelected ? 'text-white' : 'text-gray-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold mb-1 ${
                    isSelected ? 'text-blue-900' : 'text-gray-900'
                  }`}>
                    {type.name}
                  </h3>
                  <p className={`text-sm ${
                    isSelected ? 'text-blue-700' : 'text-gray-600'
                  }`}>
                    {type.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Import Section */}
      {selectedImportType && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Upload className="w-6 h-6 text-blue-600" />
            Import {selectedImportType.name}
          </h2>

          {/* Template Download */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">📥 Download Template</h3>
            <p className="text-sm text-blue-700 mb-3">
              Use this template to ensure your data is in the correct format
            </p>
            <a
              href={selectedImportType.templateUrl}
              download
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Download className="w-4 h-4" />
              Download CSV Template
            </a>
          </div>

          {/* Required Fields */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Required Fields:</h3>
            <div className="flex flex-wrap gap-2">
              {selectedImportType.fields.map((field) => (
                <span
                  key={field}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  {field}
                </span>
              ))}
            </div>
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload File (CSV or Excel)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
                className="flex-1 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {file && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <FileText className="w-4 h-4" />
                  {file.name}
                </div>
              )}
            </div>
          </div>

          {/* Import Button */}
          <button
            onClick={handleImport}
            disabled={!file || importing}
            className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
              !file || importing
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <Upload className="w-5 h-5" />
            {importing ? 'Importing...' : 'Import Data'}
          </button>
        </div>
      )}
    </div>
  );
}
