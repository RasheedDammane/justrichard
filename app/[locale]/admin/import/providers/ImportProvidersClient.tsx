'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Upload, Download, Users, Stethoscope, Gavel, Dumbbell, UserCog, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

type ProviderType = 'doctors' | 'lawyers' | 'coaches' | 'maids';

export default function ImportProvidersClient({ locale }: { locale: string }) {
  const [providerType, setProviderType] = useState<ProviderType>('doctors');
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; count?: number } | null>(null);

  const providerTypes = [
    { id: 'doctors' as ProviderType, name: 'Doctors', icon: Stethoscope, color: 'blue' },
    { id: 'lawyers' as ProviderType, name: 'Lawyers', icon: Gavel, color: 'purple' },
    { id: 'coaches' as ProviderType, name: 'Coaches', icon: Dumbbell, color: 'green' },
    { id: 'maids' as ProviderType, name: 'Maids', icon: UserCog, color: 'pink' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleImport = async () => {
    if (!file) return;

    setImporting(true);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`/api/import/${providerType}`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (response.ok) {
        setResult({
          success: true,
          message: `Successfully imported ${data.count || 0} ${providerType}`,
          count: data.count,
        });
        setFile(null);
      } else {
        setResult({
          success: false,
          message: data.error || 'Import failed',
        });
      }
    } catch (error) {
      setResult({
        success: false,
        message: 'Network error. Please try again.',
      });
    } finally {
      setImporting(false);
    }
  };

  const downloadTemplate = () => {
    const templates = {
      doctors: `name,specialization,licenseNumber,yearsExperience,education,phone,email,cityId,countryId,languages,consultationFee,available,bio
Dr. John Smith,Cardiology,DOC123456,15,Harvard Medical School,+971501234567,john@example.com,dubai,uae,"English,Arabic",500,true,Experienced cardiologist
Dr. Sarah Johnson,Pediatrics,DOC789012,10,Stanford University,+971509876543,sarah@example.com,dubai,uae,"English,French",400,true,Specialized in child care`,
      lawyers: `name,specialization,barNumber,yearsExperience,education,phone,email,cityId,countryId,languages,consultationFee,available,bio
Michael Brown,Corporate Law,LAW123456,20,Yale Law School,+971501111111,michael@example.com,dubai,uae,"English,Arabic",800,true,Corporate law expert
Emily Davis,Family Law,LAW789012,12,Oxford University,+971502222222,emily@example.com,dubai,uae,"English,French",600,true,Family law specialist`,
      coaches: `name,specialization,certification,yearsExperience,phone,email,cityId,countryId,languages,sessionFee,available,bio
Alex Turner,Personal Training,NASM-CPT,8,+971503333333,alex@example.com,dubai,uae,"English,Spanish",200,true,Certified personal trainer
Maria Garcia,Yoga,RYT-500,12,+971504444444,maria@example.com,dubai,uae,"English,Hindi",150,true,Experienced yoga instructor`,
      maids: `name,nationality,yearsExperience,languages,phone,email,cityId,countryId,specialties,hourlyRate,available,bio
Anna Williams,Philippines,10,"English,Tagalog",+971505555555,anna@example.com,dubai,uae,"Cleaning,Cooking",50,true,Experienced housemaid
Lisa Chen,Indonesia,8,"English,Indonesian",+971506666666,lisa@example.com,dubai,uae,"Cleaning,Laundry",45,true,Reliable and trustworthy`
    };

    const csvContent = templates[providerType];
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${providerType}-template.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const selectedType = providerTypes.find(t => t.id === providerType)!;
  const IconComponent = selectedType.icon;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href={`/${locale}/admin/import`}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Users className="w-8 h-8 mr-3 text-indigo-600" />
              Import Providers
            </h1>
            <p className="text-gray-600 mt-1">
              Upload a CSV file to import service providers
            </p>
          </div>
        </div>
      </div>

      {/* Type Selector */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Select Provider Type
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {providerTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => {
                  setProviderType(type.id);
                  setFile(null);
                  setResult(null);
                }}
                className={`flex flex-col items-center space-y-2 p-4 rounded-lg font-medium transition-colors ${
                  providerType === type.id
                    ? `bg-${type.color}-600 text-white`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={providerType === type.id ? {
                  backgroundColor: type.color === 'blue' ? '#2563eb' :
                                   type.color === 'purple' ? '#9333ea' :
                                   type.color === 'green' ? '#16a34a' : '#ec4899'
                } : undefined}
              >
                <Icon className="w-6 h-6" />
                <span>{type.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-900 mb-2">📋 Instructions:</h3>
        <ol className="list-decimal list-inside space-y-1 text-blue-800 text-sm">
          <li>Select provider type ({providerTypes.map(t => t.name).join(', ')})</li>
          <li>Download the CSV template for your selected type</li>
          <li>Fill in provider data</li>
          <li>Upload the completed CSV file</li>
          <li>Click "Import {selectedType.name}" to process</li>
        </ol>
      </div>

      {/* Template Download */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          1. Download CSV Template
        </h3>
        <button
          onClick={downloadTemplate}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Download className="w-5 h-5" />
          <span>Download {selectedType.name} Template</span>
        </button>
      </div>

      {/* File Upload */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          2. Upload Your CSV File
        </h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition-colors">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Click to upload CSV file
          </label>
          {file && (
            <div className="mt-3 text-sm text-gray-600">
              Selected: <span className="font-medium">{file.name}</span>
            </div>
          )}
        </div>
      </div>

      {/* Import Button */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          3. Import Data
        </h3>
        <button
          onClick={handleImport}
          disabled={!file || importing}
          className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
            !file || importing
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          <IconComponent className="w-5 h-5" />
          <span>{importing ? 'Importing...' : `Import ${selectedType.name}`}</span>
        </button>
      </div>

      {/* Result */}
      {result && (
        <div
          className={`rounded-lg p-4 ${
            result.success
              ? 'bg-green-50 border border-green-200'
              : 'bg-red-50 border border-red-200'
          }`}
        >
          <div className="flex items-center space-x-2">
            {result.success ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600" />
            )}
            <span
              className={`font-medium ${
                result.success ? 'text-green-900' : 'text-red-900'
              }`}
            >
              {result.message}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
