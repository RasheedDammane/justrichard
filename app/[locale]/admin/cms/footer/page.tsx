'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, GripVertical } from 'lucide-react';
import Link from 'next/link';

interface FooterLink {
  id: string;
  label: string;
  href: string;
  order: number;
  isActive: boolean;
  isExternal: boolean;
  badge?: string;
}

interface FooterSection {
  id: string;
  title: string;
  slug: string;
  order: number;
  isActive: boolean;
  links: FooterLink[];
}

export default function FooterManagementPage() {
  const [locale, setLocale] = useState('en');
  const [sections, setSections] = useState<FooterSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  useEffect(() => {
    fetchSections();
  }, [locale]);

  const fetchSections = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/cms/footer/sections?locale=${locale}`);
      const data = await response.json();
      setSections(data);
    } catch (error) {
      console.error('Error fetching sections:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSectionActive = async (sectionId: string, isActive: boolean) => {
    try {
      await fetch(`/api/admin/cms/footer/sections/${sectionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive }),
      });
      fetchSections();
    } catch (error) {
      console.error('Error toggling section:', error);
    }
  };

  const toggleLinkActive = async (linkId: string, isActive: boolean) => {
    try {
      await fetch(`/api/admin/cms/footer/links/${linkId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive }),
      });
      fetchSections();
    } catch (error) {
      console.error('Error toggling link:', error);
    }
  };

  const deleteSection = async (sectionId: string) => {
    if (!confirm('Are you sure you want to delete this section?')) return;
    
    try {
      await fetch(`/api/admin/cms/footer/sections/${sectionId}`, {
        method: 'DELETE',
      });
      fetchSections();
    } catch (error) {
      console.error('Error deleting section:', error);
    }
  };

  const deleteLink = async (linkId: string) => {
    if (!confirm('Are you sure you want to delete this link?')) return;
    
    try {
      await fetch(`/api/admin/cms/footer/links/${linkId}`, {
        method: 'DELETE',
      });
      fetchSections();
    } catch (error) {
      console.error('Error deleting link:', error);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Footer Sections Management
          </h1>
          <p className="text-gray-600">
            Manage footer sections and links for your website
          </p>
        </div>
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="ar">العربية</option>
          </select>
          
          <Link
            href="/admin/cms/footer/sections/new"
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Section</span>
          </Link>
        </div>
      </div>

      {/* Sections Grid */}
      {sections.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">No sections found for this language</p>
          <Link
            href="/admin/cms/footer/sections/new"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Create First Section</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sections.map((section) => (
            <div
              key={section.id}
              className={`bg-white rounded-lg border-2 ${
                section.isActive ? 'border-green-200' : 'border-gray-200'
              } p-6 transition-all hover:shadow-md`}
            >
              {/* Section Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <GripVertical className="w-4 h-4 text-gray-400" />
                    <h3 className="font-semibold text-gray-900">
                      {section.title}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-500">{section.slug}</p>
                </div>
                
                <button
                  onClick={() => toggleSectionActive(section.id, section.isActive)}
                  className={`p-1 rounded ${
                    section.isActive
                      ? 'text-green-600 hover:bg-green-50'
                      : 'text-gray-400 hover:bg-gray-50'
                  }`}
                >
                  {section.isActive ? (
                    <Eye className="w-5 h-5" />
                  ) : (
                    <EyeOff className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Links List */}
              <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                {section.links.length === 0 ? (
                  <p className="text-sm text-gray-400 italic">No links</p>
                ) : (
                  section.links.map((link) => (
                    <div
                      key={link.id}
                      className={`flex items-center justify-between p-2 rounded text-sm ${
                        link.isActive ? 'bg-gray-50' : 'bg-gray-100 opacity-50'
                      }`}
                    >
                      <span className="flex-1 truncate">{link.label}</span>
                      <div className="flex items-center space-x-1">
                        {link.badge && (
                          <span className="px-1.5 py-0.5 bg-blue-100 text-blue-600 text-xs rounded">
                            {link.badge}
                          </span>
                        )}
                        <button
                          onClick={() => toggleLinkActive(link.id, link.isActive)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          {link.isActive ? (
                            <Eye className="w-3 h-3 text-green-600" />
                          ) : (
                            <EyeOff className="w-3 h-3 text-gray-400" />
                          )}
                        </button>
                        <button
                          onClick={() => deleteLink(link.id)}
                          className="p-1 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-3 h-3 text-red-600" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Section Actions */}
              <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
                <Link
                  href={`/admin/cms/footer/sections/${section.id}`}
                  className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors text-sm"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </Link>
                <button
                  onClick={() => deleteSection(section.id)}
                  className="px-3 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Links Count Badge */}
              <div className="mt-3 text-xs text-center text-gray-500">
                {section.links.length} link{section.links.length !== 1 ? 's' : ''}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
