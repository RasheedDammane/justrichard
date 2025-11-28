'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Upload, Download, Car, Bike, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

type RentalType = 'cars' | 'motorbikes';

export default function ImportRentalsClient({ locale }: { locale: string }) {
  const [rentalType, setRentalType] = useState<RentalType>('cars');
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; count?: number } | null>(null);

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
      const endpoint = rentalType === 'cars' ? '/api/import/rental-cars' : '/api/import/motorbikes';
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (response.ok) {
        setResult({
          success: true,
          message: `Successfully imported ${data.count || 0} ${rentalType}`,
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
      cars: `brand,model,year,pricePerDay,pricePerWeek,pricePerMonth,cityId,countryId,fuelType,transmission,seats,doors,luggage,color,mileage,features,images,available
Toyota,Camry,2023,150,900,3000,dubai,uae,Petrol,Automatic,5,4,2,White,Unlimited,"Air Conditioning,Bluetooth,GPS","[car1.jpg]",true
Honda,Civic,2024,120,700,2500,dubai,uae,Petrol,Automatic,5,4,2,Black,Unlimited,"Air Conditioning,Bluetooth","[car2.jpg]",true`,
      motorbikes: `brand,model,year,pricePerDay,pricePerWeek,pricePerMonth,cityId,countryId,engineSize,fuelType,transmission,color,mileage,features,images,available
Honda,CBR500R,2023,80,450,1500,dubai,uae,500,Petrol,Manual,Red,Unlimited,"ABS,LED Lights","[bike1.jpg]",true
Yamaha,MT-07,2024,90,500,1700,dubai,uae,700,Petrol,Manual,Blue,Unlimited,"ABS,Digital Display","[bike2.jpg]",true`
    };

    const csvContent = templates[rentalType];
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${rentalType}-template.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

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
              {rentalType === 'cars' ? (
                <Car className="w-8 h-8 mr-3 text-blue-600" />
              ) : (
                <Bike className="w-8 h-8 mr-3 text-orange-600" />
              )}
              Import Rentals
            </h1>
            <p className="text-gray-600 mt-1">
              Upload a CSV file to import rental cars or motorbikes
            </p>
          </div>
        </div>
      </div>

      {/* Type Selector */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Select Rental Type
        </h3>
        <div className="flex space-x-4">
          <button
            onClick={() => {
              setRentalType('cars');
              setFile(null);
              setResult(null);
            }}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              rentalType === 'cars'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Car className="w-5 h-5" />
            <span>Rental Cars</span>
          </button>
          <button
            onClick={() => {
              setRentalType('motorbikes');
              setFile(null);
              setResult(null);
            }}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              rentalType === 'motorbikes'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Bike className="w-5 h-5" />
            <span>Motorbikes</span>
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-900 mb-2">📋 Instructions:</h3>
        <ol className="list-decimal list-inside space-y-1 text-blue-800 text-sm">
          <li>Select rental type (Cars or Motorbikes)</li>
          <li>Download the CSV template for your selected type</li>
          <li>Fill in your rental data</li>
          <li>Upload the completed CSV file</li>
          <li>Click "Import {rentalType}" to process</li>
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
          <span>Download {rentalType} Template</span>
        </button>
      </div>

      {/* File Upload */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          2. Upload Your CSV File
        </h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
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
            className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium"
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
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            !file || importing
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {importing ? 'Importing...' : `Import ${rentalType}`}
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
