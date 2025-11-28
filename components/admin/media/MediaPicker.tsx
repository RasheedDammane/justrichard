'use client';

import { useState, useEffect } from 'react';
import { X, Search, Upload, Check } from 'lucide-react';

interface MediaFile {
  id: string;
  fileName: string;
  mimeType: string;
  size: number;
  storagePath: string;
  altText?: string;
}

interface MediaPickerProps {
  multiple?: boolean;
  allowedTypes?: string[]; // ['image', 'video', 'document']
  onSelect: (files: MediaFile | MediaFile[]) => void;
  onClose: () => void;
  category?: string;
}

export default function MediaPicker({
  multiple = false,
  allowedTypes = ['image'],
  onSelect,
  onClose,
  category,
}: MediaPickerProps) {
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<MediaFile[]>([]);

  useEffect(() => {
    fetchMedia();
  }, [search, allowedTypes]);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        limit: '50',
      });
      
      if (search) params.append('search', search);
      if (allowedTypes.length === 1) {
        params.append('type', allowedTypes[0]);
      }
      if (category) params.append('category', category);

      const response = await fetch(`/api/admin/media?${params}`);
      const data = await response.json();
      
      setMedia(data.items || []);
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (file: MediaFile) => {
    if (multiple) {
      const isSelected = selected.find(f => f.id === file.id);
      if (isSelected) {
        setSelected(selected.filter(f => f.id !== file.id));
      } else {
        setSelected([...selected, file]);
      }
    } else {
      onSelect(file);
      onClose();
    }
  };

  const handleConfirm = () => {
    if (multiple && selected.length > 0) {
      onSelect(selected);
      onClose();
    }
  };

  const getFilePreview = (file: MediaFile) => {
    if (file.mimeType.startsWith('image/')) {
      return (
        <img
          src={file.storagePath}
          alt={file.altText || file.fileName}
          className="w-full h-full object-cover"
        />
      );
    }
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <span className="text-xs text-gray-500">{file.fileName.split('.').pop()?.toUpperCase()}</span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Select Media</h2>
            <p className="text-sm text-gray-600 mt-1">
              {multiple ? 'Select one or more files' : 'Select a file'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-6 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search files..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Media Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : media.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No media files found</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {media.map((file) => {
                const isSelected = multiple && selected.find(f => f.id === file.id);
                return (
                  <div
                    key={file.id}
                    onClick={() => handleSelect(file)}
                    className={`relative bg-white rounded-lg border-2 overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                      isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                    }`}
                  >
                    <div className="aspect-square">
                      {getFilePreview(file)}
                    </div>
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className="p-2">
                      <p className="text-xs text-gray-900 truncate">{file.fileName}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <div className="text-sm text-gray-600">
            {multiple && selected.length > 0 && `${selected.length} file(s) selected`}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            {multiple && (
              <button
                onClick={handleConfirm}
                disabled={selected.length === 0}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Select {selected.length > 0 && `(${selected.length})`}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
