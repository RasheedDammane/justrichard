'use client';
import { Search } from 'lucide-react';

export default function SEOSection({ formData, setFormData }: any) {
  const handleChange = (e: any) => {
    setFormData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const previewUrl = formData.title 
    ? `yoursite.com/properties/${generateSlug(formData.title)}`
    : 'yoursite.com/properties/property-slug';

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Search className="w-5 h-5" />
        SEO Settings
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            SEO Title
          </label>
          <input
            type="text"
            name="seoTitle"
            value={formData.seoTitle}
            onChange={handleChange}
            placeholder={formData.title || 'Property title for search engines'}
            maxLength={60}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-between items-center mt-1">
            <p className="text-xs text-gray-500">
              {formData.seoTitle.length}/60 characters
            </p>
            {formData.seoTitle.length > 60 && (
              <p className="text-xs text-red-600">Too long!</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            SEO Description
          </label>
          <textarea
            name="seoDescription"
            value={formData.seoDescription}
            onChange={handleChange}
            placeholder="Brief description for search engine results (recommended 150-160 characters)"
            rows={3}
            maxLength={160}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-between items-center mt-1">
            <p className="text-xs text-gray-500">
              {formData.seoDescription.length}/160 characters
            </p>
            {formData.seoDescription.length > 160 && (
              <p className="text-xs text-red-600">Too long!</p>
            )}
          </div>
        </div>

        {/* Google Preview */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-3 font-medium">Search Engine Preview:</p>
          <div className="space-y-1">
            <p className="text-blue-600 text-lg font-medium hover:underline cursor-pointer">
              {formData.seoTitle || formData.title || 'Property Title'}
            </p>
            <p className="text-green-700 text-sm">
              {previewUrl}
            </p>
            <p className="text-gray-600 text-sm">
              {formData.seoDescription || formData.description?.substring(0, 160) || 'Property description will appear here. This is what users will see in search results.'}
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>💡 SEO Tips:</strong>
          </p>
          <ul className="text-xs text-blue-700 mt-2 space-y-1 ml-4 list-disc">
            <li>Include location and property type in title</li>
            <li>Keep title under 60 characters</li>
            <li>Write compelling description (150-160 chars)</li>
            <li>Include key features and benefits</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
