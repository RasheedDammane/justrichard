'use client';

import { useState } from 'react';
import { Upload, Download, FileText, CheckCircle, XCircle, Loader } from 'lucide-react';

export default function PropertyImportClient({ locale }: { locale: string }) {
  const [importing, setImporting] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleImportFromSource = async () => {
    if (!confirm('Import all properties from the scraped data source? This will take several minutes.')) {
      return;
    }

    setImporting(true);
    setResult(null);

    try {
      const response = await fetch('/api/admin/properties/import-from-source', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          message: `Successfully imported ${data.imported} properties!`,
          details: data,
        });
      } else {
        setResult({
          success: false,
          message: data.error || 'Import failed',
        });
      }
    } catch (error) {
      setResult({
        success: false,
        message: 'Import failed: ' + (error as Error).message,
      });
    } finally {
      setImporting(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
  };

  const handleImportCSV = async () => {
    if (!file) {
      alert('Please select a CSV file first');
      return;
    }

    setImporting(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/properties/import-csv', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          message: `Successfully imported ${data.imported} properties!`,
          details: data,
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
        message: 'Import failed: ' + (error as Error).message,
      });
    } finally {
      setImporting(false);
    }
  };

  const handleExport = async () => {
    setExporting(true);

    try {
      const response = await fetch('/api/admin/properties/export-csv');
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `properties_export_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        setResult({
          success: true,
          message: 'Export completed successfully!',
        });
      } else {
        const data = await response.json();
        setResult({
          success: false,
          message: data.error || 'Export failed',
        });
      }
    } catch (error) {
      setResult({
        success: false,
        message: 'Export failed: ' + (error as Error).message,
      });
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Property Import/Export</h1>
        <p className="text-gray-600 mt-1">Import properties from CSV or export existing properties</p>
      </div>

      {/* Result Message */}
      {result && (
        <div className={`rounded-lg p-4 ${result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <div className="flex items-start gap-3">
            {result.success ? (
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
            )}
            <div className="flex-1">
              <p className={`font-medium ${result.success ? 'text-green-900' : 'text-red-900'}`}>
                {result.message}
              </p>
              {result.details && (
                <div className="mt-2 text-sm text-gray-700">
                  <p>Imported: {result.details.imported}</p>
                  <p>Skipped: {result.details.skipped}</p>
                  <p>Errors: {result.details.errors}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Import from Source */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Upload className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Import from Scraped Data
            </h2>
            <p className="text-gray-600 mb-4">
              Import all properties from the scraped data source located at:
              <code className="block mt-2 p-2 bg-gray-100 rounded text-sm">
                /Users/richard/CascadeProjects/windsurf-project/web_scraper/scraped_data/allrayong_enriched_20251116_231747/
              </code>
            </p>
            <p className="text-sm text-gray-500 mb-4">
              This will import properties from <strong>houzez_import_html.csv</strong> and copy all images.
            </p>
            <button
              onClick={handleImportFromSource}
              disabled={importing}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {importing ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Import from Source
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Upload CSV */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <FileText className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Upload CSV File
            </h2>
            <p className="text-gray-600 mb-4">
              Upload a CSV file with property data to import
            </p>
            
            <div className="space-y-4">
              <div>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
                {file && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
                  </p>
                )}
              </div>

              <button
                onClick={handleImportCSV}
                disabled={!file || importing}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {importing ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Importing...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Import CSV
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Export */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-purple-100 rounded-lg">
            <Download className="w-6 h-6 text-purple-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Export Properties
            </h2>
            <p className="text-gray-600 mb-4">
              Export all properties to a CSV file
            </p>
            <button
              onClick={handleExport}
              disabled={exporting}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {exporting ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Export to CSV
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* CSV Format Guide */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">CSV Format Guide</h3>
        <p className="text-sm text-gray-600 mb-3">
          Your CSV file should include the following columns:
        </p>
        <div className="bg-white rounded p-4 text-xs font-mono overflow-x-auto">
          <p>property_title, property_description, property_price, property_price_postfix,</p>
          <p>property_status, property_type, property_address, property_city, property_state,</p>
          <p>property_country, property_lat, property_lng, property_size, property_bedrooms,</p>
          <p>property_bathrooms, property_features, property_images, property_featured_image</p>
        </div>
      </div>
    </div>
  );
}
