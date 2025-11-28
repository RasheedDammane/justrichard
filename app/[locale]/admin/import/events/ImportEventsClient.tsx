'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Upload, Download, Calendar, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

export default function ImportEventsClient({ locale }: { locale: string }) {
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
      const response = await fetch('/api/import/events', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (response.ok) {
        setResult({
          success: true,
          message: `Successfully imported ${data.count || 0} events`,
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
    const csvContent = `title,description,category,startDate,endDate,location,city,country,price,capacity,organizerName,organizerEmail,organizerPhone,featured,status
Tech Conference 2024,Annual technology conference,Technology,2024-06-15T09:00:00Z,2024-06-17T18:00:00Z,Dubai World Trade Centre,Dubai,United Arab Emirates,500,1000,Tech Events Inc,info@techevents.com,+971501234567,true,published
Music Festival,Summer music festival,Music,2024-07-20T14:00:00Z,2024-07-22T23:00:00Z,Festival Ground,Dubai,United Arab Emirates,150,5000,Music Co,contact@musicco.ae,+971509876543,true,published`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'events-template.csv';
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
              <Calendar className="w-8 h-8 mr-3 text-purple-600" />
              Import Events
            </h1>
            <p className="text-gray-600 mt-1">
              Upload a CSV file to import multiple events at once
            </p>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-900 mb-2">📋 Instructions:</h3>
        <ol className="list-decimal list-inside space-y-1 text-blue-800 text-sm">
          <li>Download the CSV template below</li>
          <li>Fill in your events data (one row per event)</li>
          <li>Upload the completed CSV file</li>
          <li>Click "Import Events" to process</li>
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
          <span>Download Template</span>
        </button>
        <p className="text-sm text-gray-500 mt-2">
          Required columns: title, description, category, startDate, endDate, location, city, country, price, capacity
        </p>
      </div>

      {/* File Upload */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          2. Upload Your CSV File
        </h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
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
            className="cursor-pointer text-purple-600 hover:text-purple-700 font-medium"
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
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          {importing ? 'Importing...' : 'Import Events'}
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
