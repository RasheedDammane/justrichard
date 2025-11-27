'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Plus, Save, Trash2, GripVertical } from 'lucide-react';
import Link from 'next/link';

interface FooterLink {
  id?: string;
  label: string;
  href: string;
  order: number;
  isActive: boolean;
  isExternal: boolean;
  openNewTab: boolean;
  icon?: string;
  badge?: string;
}

interface FooterSection {
  id?: string;
  locale: string;
  title: string;
  slug: string;
  icon?: string;
  order: number;
  isActive: boolean;
  displayOn: string;
  hideOnPages?: string;
  links: FooterLink[];
}

export default function EditFooterSectionPage() {
  const router = useRouter();
  const params = useParams();
  const sectionId = params?.id as string;
  const isNew = sectionId === 'new';

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [section, setSection] = useState<FooterSection>({
    locale: 'en',
    title: '',
    slug: '',
    order: 0,
    isActive: true,
    displayOn: 'all',
    links: [],
  });

  useEffect(() => {
    if (!isNew) {
      fetchSection();
    }
  }, [sectionId]);

  const fetchSection = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/cms/footer/sections/${sectionId}`);
      const data = await response.json();
      setSection(data);
    } catch (error) {
      console.error('Error fetching section:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      const url = isNew
        ? '/api/admin/cms/footer/sections'
        : `/api/admin/cms/footer/sections/${sectionId}`;
      
      const method = isNew ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(section),
      });

      if (response.ok) {
        router.push('/admin/cms/footer');
      }
    } catch (error) {
      console.error('Error saving section:', error);
    } finally {
      setSaving(false);
    }
  };

  const addLink = () => {
    setSection({
      ...section,
      links: [
        ...section.links,
        {
          label: '',
          href: '',
          order: section.links.length,
          isActive: true,
          isExternal: false,
          openNewTab: false,
        },
      ],
    });
  };

  const updateLink = (index: number, field: string, value: any) => {
    const newLinks = [...section.links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setSection({ ...section, links: newLinks });
  };

  const removeLink = (index: number) => {
    const newLinks = section.links.filter((_, i) => i !== index);
    setSection({ ...section, links: newLinks });
  };

  const moveLink = (index: number, direction: 'up' | 'down') => {
    const newLinks = [...section.links];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex < 0 || newIndex >= newLinks.length) return;
    
    [newLinks[index], newLinks[newIndex]] = [newLinks[newIndex], newLinks[index]];
    newLinks.forEach((link, i) => link.order = i);
    
    setSection({ ...section, links: newLinks });
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="space-y-4">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/cms/footer"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Footer</span>
        </Link>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isNew ? 'Create Footer Section' : 'Edit Footer Section'}
            </h1>
            <p className="text-gray-600">
              Configure section details and manage links
            </p>
          </div>
          
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            <Save className="w-5 h-5" />
            <span>{saving ? 'Saving...' : 'Save Section'}</span>
          </button>
        </div>
      </div>

      {/* Section Configuration */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Section Configuration
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              value={section.locale}
              onChange={(e) => setSection({ ...section, locale: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              disabled={!isNew}
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="ar">العربية</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Title *
            </label>
            <input
              type="text"
              value={section.title}
              onChange={(e) => setSection({ ...section, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Company, Professional Services"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug *
            </label>
            <input
              type="text"
              value={section.slug}
              onChange={(e) => setSection({ ...section, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., company, professional-services"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Order
            </label>
            <input
              type="number"
              value={section.order}
              onChange={(e) => setSection({ ...section, order: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Icon (optional)
            </label>
            <input
              type="text"
              value={section.icon || ''}
              onChange={(e) => setSection({ ...section, icon: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., lucide icon name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Display On
            </label>
            <select
              value={section.displayOn}
              onChange={(e) => setSection({ ...section, displayOn: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Pages</option>
              <option value="home">Home Only</option>
              <option value="specific">Specific Pages</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={section.isActive}
              onChange={(e) => setSection({ ...section, isActive: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
              Section Active
            </label>
          </div>
        </div>
      </div>

      {/* Links Management */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Section Links ({section.links.length})
          </h2>
          <button
            onClick={addLink}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Link</span>
          </button>
        </div>

        <div className="space-y-3">
          {section.links.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No links yet. Click "Add Link" to create one.
            </p>
          ) : (
            section.links.map((link, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex flex-col space-y-1 mt-2">
                  <button
                    onClick={() => moveLink(index, 'up')}
                    disabled={index === 0}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  >
                    ▲
                  </button>
                  <GripVertical className="w-4 h-4 text-gray-400" />
                  <button
                    onClick={() => moveLink(index, 'down')}
                    disabled={index === section.links.length - 1}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  >
                    ▼
                  </button>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) => updateLink(index, 'label', e.target.value)}
                    placeholder="Link Label"
                    className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={link.href}
                    onChange={(e) => updateLink(index, 'href', e.target.value)}
                    placeholder="URL/Path"
                    className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={link.badge || ''}
                    onChange={(e) => updateLink(index, 'badge', e.target.value)}
                    placeholder="Badge (optional)"
                    className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  
                  <div className="flex items-center space-x-4 col-span-3">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={link.isActive}
                        onChange={(e) => updateLink(index, 'isActive', e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">Active</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={link.isExternal}
                        onChange={(e) => updateLink(index, 'isExternal', e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">External</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={link.openNewTab}
                        onChange={(e) => updateLink(index, 'openNewTab', e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">New Tab</span>
                    </label>
                  </div>
                </div>

                <button
                  onClick={() => removeLink(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded mt-2"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
