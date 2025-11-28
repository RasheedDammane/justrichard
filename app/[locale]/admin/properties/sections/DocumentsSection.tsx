'use client';
import { FileText, Upload, Trash2, Download } from 'lucide-react';
import { useState } from 'react';

export default function DocumentsSection({ formData, setFormData, propertyId }: any) {
  const [uploading, setUploading] = useState(false);

  const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const formDataUpload = new FormData();
      Array.from(files).forEach(file => {
        formDataUpload.append('files', file);
      });

      const response = await fetch('/api/admin/documents/upload', {
        method: 'POST',
        body: formDataUpload,
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok && data.documents) {
        setFormData((prev: any) => ({
          ...prev,
          documentIds: [...prev.documentIds, ...data.documents.map((d: any) => d.id)]
        }));
        alert(`${data.documents.length} document(s) uploaded successfully!`);
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const removeDocument = (docId: string) => {
    setFormData((prev: any) => ({
      ...prev,
      documentIds: prev.documentIds.filter((id: string) => id !== docId)
    }));
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <FileText className="w-5 h-5" />
        Property Documents
      </h2>
      
      <div className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx"
            onChange={handleDocumentUpload}
            className="hidden"
            id="document-upload"
            disabled={uploading}
          />
          <label htmlFor="document-upload" className="cursor-pointer">
            <FileText className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
              onClick={() => document.getElementById('document-upload')?.click()}
            >
              <Upload className="w-4 h-4" />
              Upload Documents
            </button>
            <p className="text-xs text-gray-500 mt-2">
              PDF, DOC, DOCX up to 20MB each
            </p>
          </label>
        </div>

        {uploading && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-sm text-gray-600 mt-2">Uploading documents...</p>
          </div>
        )}

        {formData.documentIds && formData.documentIds.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700">Uploaded Documents ({formData.documentIds.length})</h3>
            {formData.documentIds.map((docId: string, index: number) => (
              <div key={docId} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Document {index + 1}</p>
                    <p className="text-xs text-gray-500">PDF • Uploaded</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeDocument(docId)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">
            <strong>Document Types:</strong> Floor plans, brochures, contracts, certificates, title deeds, etc.
          </p>
        </div>
      </div>
    </div>
  );
}
