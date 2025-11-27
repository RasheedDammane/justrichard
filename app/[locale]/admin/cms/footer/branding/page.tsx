'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Save, ArrowLeft } from 'lucide-react';

interface FooterBranding {
  id: string;
  locale: string;
  platformName?: string;
  tagline?: string;
  copyright?: string;
  registrationInfo?: string;
  disclaimer?: string;
  isActive: boolean;
}

export default function FooterBrandingPage() {
  const [branding, setBranding] = useState<FooterBranding | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [locale, setLocale] = useState('en');
  
  const [formData, setFormData] = useState({
    platformName: '',
    tagline: '',
    copyright: '',
    registrationInfo: '',
    disclaimer: '',
  });

  useEffect(() => {
    fetchBranding();
  }, [locale]);

  const fetchBranding = async () => {
    try {
      const res = await fetch(`/api/admin/cms/footer/branding?locale=${locale}`);
      const data = await res.json();
      if (data) {
        setBranding(data);
        setFormData({
          platformName: data.platformName || '',
          tagline: data.tagline || '',
          copyright: data.copyright || '',
          registrationInfo: data.registrationInfo || '',
          disclaimer: data.disclaimer || '',
        });
      }
    } catch (error) {
      console.error('Error fetching footer branding:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const res = await fetch('/api/admin/cms/footer/branding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, locale }),
      });

      if (res.ok) {
        alert('Footer branding saved successfully!');
        await fetchBranding();
      } else {
        alert('Error saving footer branding');
      }
    } catch (error) {
      console.error('Error saving footer branding:', error);
      alert('Error saving footer branding');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link 
          href="/en/admin/cms"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to CMS Dashboard
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Footer Branding</h1>
          <p className="text-gray-600 mt-2">Manage footer branding information and legal text</p>
        </div>
      </div>

      {/* Language Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
        <select
          value={locale}
          onChange={(e) => setLocale(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="ar">العربية</option>
        </select>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Platform Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Platform Name
            </label>
            <input
              type="text"
              value={formData.platformName}
              onChange={(e) => setFormData({ ...formData, platformName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="JustRichard"
            />
            <p className="text-sm text-gray-500 mt-1">The main brand name displayed in the footer</p>
          </div>

          {/* Tagline */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tagline
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Your trusted service platform"
            />
            <p className="text-sm text-gray-500 mt-1">A short description or slogan</p>
          </div>

          {/* Copyright */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Copyright Text
            </label>
            <input
              type="text"
              value={formData.copyright}
              onChange={(e) => setFormData({ ...formData, copyright: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="© 2024 JustRichard. All rights reserved."
            />
            <p className="text-sm text-gray-500 mt-1">Copyright notice (use {'{year}'} for dynamic year)</p>
          </div>

          {/* Registration Info */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Registration Information
            </label>
            <textarea
              value={formData.registrationInfo}
              onChange={(e) => setFormData({ ...formData, registrationInfo: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Company registration number, tax ID, etc."
            />
            <p className="text-sm text-gray-500 mt-1">Legal registration information</p>
          </div>

          {/* Disclaimer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Disclaimer
            </label>
            <textarea
              value={formData.disclaimer}
              onChange={(e) => setFormData({ ...formData, disclaimer: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Legal disclaimer text..."
            />
            <p className="text-sm text-gray-500 mt-1">Legal disclaimer or important notice</p>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Branding'}
            </button>
            <Link
              href="/en/admin/cms"
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 inline-flex items-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>

      {/* Preview */}
      <div className="mt-8 bg-gray-50 rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
        <div className="bg-gray-900 text-gray-300 p-8 rounded-lg">
          <div className="max-w-6xl mx-auto">
            {/* Brand Section */}
            {(formData.platformName || formData.tagline) && (
              <div className="mb-6">
                {formData.platformName && (
                  <h3 className="text-white text-xl font-bold mb-2">
                    {formData.platformName}
                  </h3>
                )}
                {formData.tagline && (
                  <p className="text-sm text-gray-400">{formData.tagline}</p>
                )}
              </div>
            )}

            {/* Copyright & Registration */}
            <div className="border-t border-gray-700 pt-6 mt-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                {formData.copyright && (
                  <p className="text-sm text-gray-400">
                    {formData.copyright.replace('{year}', new Date().getFullYear().toString())}
                  </p>
                )}
                {formData.registrationInfo && (
                  <p className="text-xs text-gray-500">
                    {formData.registrationInfo}
                  </p>
                )}
              </div>
              
              {formData.disclaimer && (
                <p className="text-xs text-gray-500 mt-4 max-w-4xl">
                  {formData.disclaimer}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
