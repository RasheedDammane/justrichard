'use client';
import { Settings, Calendar, Lock, FileText, Zap } from 'lucide-react';

export default function SettingsSection({ formData, setFormData }: any) {
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Status & Visibility */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Settings
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Lock className="w-4 h-4" />
              Visibility
            </label>
            <select
              name="visibility"
              value={formData.visibility}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="PUBLIC">Public</option>
              <option value="LOGGED_IN">Logged In Users Only</option>
              <option value="PRIVATE">Private</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              {formData.visibility === 'PUBLIC' && 'Visible to everyone'}
              {formData.visibility === 'LOGGED_IN' && 'Only visible to logged in users'}
              {formData.visibility === 'PRIVATE' && 'Only visible to admins'}
            </p>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Featured Property
              </span>
            </label>
            <p className="text-xs text-gray-500 ml-6 mt-1">
              Featured properties appear first in listings
            </p>
          </div>
        </div>
      </div>

      {/* Expiration */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Property Expiration
        </h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expiration Date
          </label>
          <input
            type="date"
            name="expirationDate"
            value={formData.expirationDate ? new Date(formData.expirationDate).toISOString().split('T')[0] : ''}
            onChange={(e) => setFormData((prev: any) => ({ 
              ...prev, 
              expirationDate: e.target.value ? new Date(e.target.value) : null 
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Property will be automatically archived after this date
          </p>
        </div>
      </div>

      {/* Energy Class */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4" />
          Energy Efficiency
        </h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Energy Class
          </label>
          <select
            name="energyClass"
            value={formData.energyClass}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Not specified</option>
            <option value="A+">A+ (Most Efficient)</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
            <option value="G">G (Least Efficient)</option>
          </select>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Internal Notes
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Private Note
            </label>
            <textarea
              name="privateNote"
              value={formData.privateNote}
              onChange={handleChange}
              rows={3}
              placeholder="Internal notes (not visible to public)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Only visible to admins
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Disclaimer
            </label>
            <textarea
              name="disclaimer"
              value={formData.disclaimer}
              onChange={handleChange}
              rows={2}
              placeholder="Legal disclaimer text (visible on property page)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Displayed at the bottom of property page
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800 font-medium mb-2">
          💡 Quick Tips:
        </p>
        <ul className="text-xs text-blue-700 space-y-1 ml-4 list-disc">
          <li>Set status to DRAFT to work on property before publishing</li>
          <li>Featured properties get 3x more views</li>
          <li>Set expiration date for temporary listings</li>
          <li>Energy class is required in some countries</li>
        </ul>
      </div>
    </div>
  );
}
