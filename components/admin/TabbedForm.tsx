'use client';

import { useState, ReactNode } from 'react';
import Link from 'next/link';
import { Save, X } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: string;
  content: ReactNode;
}

interface TabbedFormProps {
  tabs: Tab[];
  onSubmit: (e: React.FormEvent) => void;
  onCancel: string; // URL to redirect on cancel
  loading?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
}

export default function TabbedForm({
  tabs,
  onSubmit,
  onCancel,
  loading = false,
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
}: TabbedFormProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');

  return (
    <div>
      {/* Tabs Navigation */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex flex-wrap -mb-px overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-4 md:px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap
                  ${activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="bg-white rounded-lg shadow p-6">
        {/* Tab Content */}
        {tabs.map((tab) => (
          <div key={tab.id} className={activeTab === tab.id ? 'block' : 'hidden'}>
            <div className="space-y-6">
              {tab.content}
            </div>
          </div>
        ))}

        {/* Actions - Always visible */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t mt-6">
          <Link
            href={onCancel}
            className="inline-flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
          >
            <X className="w-4 h-4" />
            {cancelLabel}
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
          >
            <Save className="w-4 h-4" />
            {loading ? 'Saving...' : submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
