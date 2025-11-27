'use client';

import { useState, useEffect } from 'react';
import { Save, Upload } from 'lucide-react';

interface HeaderConfig {
  locale: string;
  logoUrl?: string;
  logoText?: string;
  logoAlt?: string;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
  ctaColor?: string;
  isSticky: boolean;
  showSearch: boolean;
  bgColor?: string;
  textColor?: string;
  isActive: boolean;
}

export default function HeaderManagementPage() {
  const [locale, setLocale] = useState('en');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [config, setConfig] = useState<HeaderConfig>({
    locale: 'en',
    isSticky: true,
    showSearch: false,
    bgColor: '#FFFFFF',
    textColor: '#1F2937',
    ctaColor: '#3B82F6',
    isActive: true,
  });

  useEffect(() => {
    fetchHeaderConfig();
  }, [locale]);

  const fetchHeaderConfig = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/cms/header?locale=${locale}`);
      const data = await response.json();
      if (data && Object.keys(data).length > 0) {
        setConfig(data);
      } else {
        setConfig({ ...config, locale });
      }
    } catch (error) {
      console.error('Error fetching header config:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await fetch('/api/admin/cms/header', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      alert('Header configuration saved successfully!');
    } catch (error) {
      console.error('Error saving header config:', error);
      alert('Failed to save header configuration');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Header Configuration
            </h1>
            <p className="text-gray-600">
              Configure your website header settings
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="ar">العربية</option>
            </select>
            
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            >
              <Save className="w-5 h-5" />
              <span>{saving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Branding Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Branding
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo URL
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={config.logoUrl || ''}
                onChange={(e) => setConfig({ ...config, logoUrl: e.target.value })}
                placeholder="/images/logo.png"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                <Upload className="w-4 h-4" />
                <span>Upload</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo Text
              </label>
              <input
                type="text"
                value={config.logoText || ''}
                onChange={(e) => setConfig({ ...config, logoText: e.target.value })}
                placeholder="JustRichard"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo Alt Text
              </label>
              <input
                type="text"
                value={config.logoAlt || ''}
                onChange={(e) => setConfig({ ...config, logoAlt: e.target.value })}
                placeholder="JustRichard Logo"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={config.title || ''}
              onChange={(e) => setConfig({ ...config, title: e.target.value })}
              placeholder="Your trusted service platform"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={config.description || ''}
              onChange={(e) => setConfig({ ...config, description: e.target.value })}
              placeholder="A brief description..."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* CTA Button Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Call-to-Action Button
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CTA Text
            </label>
            <input
              type="text"
              value={config.ctaText || ''}
              onChange={(e) => setConfig({ ...config, ctaText: e.target.value })}
              placeholder="Get Started"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CTA URL
            </label>
            <input
              type="text"
              value={config.ctaUrl || ''}
              onChange={(e) => setConfig({ ...config, ctaUrl: e.target.value })}
              placeholder="/signup"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CTA Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={config.ctaColor || '#3B82F6'}
                onChange={(e) => setConfig({ ...config, ctaColor: e.target.value })}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={config.ctaColor || '#3B82F6'}
                onChange={(e) => setConfig({ ...config, ctaColor: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Styling Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Styling
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Background Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={config.bgColor || '#FFFFFF'}
                onChange={(e) => setConfig({ ...config, bgColor: e.target.value })}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={config.bgColor || '#FFFFFF'}
                onChange={(e) => setConfig({ ...config, bgColor: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={config.textColor || '#1F2937'}
                onChange={(e) => setConfig({ ...config, textColor: e.target.value })}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={config.textColor || '#1F2937'}
                onChange={(e) => setConfig({ ...config, textColor: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Settings Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Settings
        </h2>
        
        <div className="space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={config.isSticky}
              onChange={(e) => setConfig({ ...config, isSticky: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <div>
              <div className="text-sm font-medium text-gray-900">Sticky Header</div>
              <div className="text-xs text-gray-500">Header stays fixed at top when scrolling</div>
            </div>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={config.showSearch}
              onChange={(e) => setConfig({ ...config, showSearch: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <div>
              <div className="text-sm font-medium text-gray-900">Show Search Bar</div>
              <div className="text-xs text-gray-500">Display search functionality in header</div>
            </div>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={config.isActive}
              onChange={(e) => setConfig({ ...config, isActive: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <div>
              <div className="text-sm font-medium text-gray-900">Active</div>
              <div className="text-xs text-gray-500">Enable/disable this header configuration</div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
