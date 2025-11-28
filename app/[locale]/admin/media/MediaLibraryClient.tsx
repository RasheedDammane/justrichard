'use client';

import { useState, useEffect } from 'react';
import { Upload, Search, Grid, List, Filter, X, Image as ImageIcon, Video, FileText, Download, Trash2, Eye } from 'lucide-react';

interface MediaFile {
  id: string;
  fileName: string;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  altText?: string;
  caption?: string;
  storagePath: string;
  visibility: string;
  createdAt: string;
  category?: {
    id: string;
    name: string;
  };
  uploadedBy?: {
    firstName?: string;
    lastName?: string;
  };
}

interface MediaLibraryClientProps {
  locale: string;
}

export default function MediaLibraryClient({ locale }: MediaLibraryClientProps) {
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<MediaFile | null>(null);
  const [uploading, setUploading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchMedia();
  }, [search, typeFilter, page]);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '24',
      });
      
      if (search) params.append('search', search);
      if (typeFilter) params.append('type', typeFilter);

      const response = await fetch(`/api/admin/media?${params}`);
      const data = await response.json();
      
      setMedia(data.items || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('visibility', 'public');

      try {
        const response = await fetch('/api/admin/media/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          fetchMedia();
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }

    setUploading(false);
    e.target.value = '';
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media?')) return;

    try {
      const response = await fetch(`/api/admin/media/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSelectedMedia(null);
        fetchMedia();
      }
    } catch (error) {
      console.error('Error deleting media:', error);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <ImageIcon className="w-5 h-5" />;
    if (mimeType.startsWith('video/')) return <Video className="w-5 h-5" />;
    return <FileText className="w-5 h-5" />;
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
    if (file.mimeType.startsWith('video/')) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-900">
          <Video className="w-12 h-12 text-white" />
        </div>
      );
    }
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <FileText className="w-12 h-12 text-gray-400" />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Media Library</h1>
          <p className="text-gray-600 mt-1">{total} files total</p>
        </div>
        <label className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
          <Upload className="w-4 h-4" />
          {uploading ? 'Uploading...' : 'Upload Files'}
          <input
            type="file"
            multiple
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
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

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
            <option value="document">Documents</option>
          </select>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Media Grid/List */}
      <div className="flex gap-6">
        <div className={`flex-1 ${selectedMedia ? 'lg:w-2/3' : 'w-full'}`}>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Loading media...</p>
            </div>
          ) : media.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No media files found</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {media.map((file) => (
                <div
                  key={file.id}
                  onClick={() => setSelectedMedia(file)}
                  className={`bg-white rounded-lg border-2 overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                    selectedMedia?.id === file.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                  }`}
                >
                  <div className="aspect-square">
                    {getFilePreview(file)}
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-gray-900 truncate">{file.fileName}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 divide-y">
              {media.map((file) => (
                <div
                  key={file.id}
                  onClick={() => setSelectedMedia(file)}
                  className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 ${
                    selectedMedia?.id === file.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                    {getFilePreview(file)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{file.fileName}</p>
                    <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(file.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar Details */}
        {selectedMedia && (
          <div className="hidden lg:block w-1/3">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Details</h3>
                <button
                  onClick={() => setSelectedMedia(null)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="aspect-square rounded-lg overflow-hidden mb-4 bg-gray-100">
                {getFilePreview(selectedMedia)}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">File Name</label>
                  <p className="text-sm text-gray-900 break-all">{selectedMedia.fileName}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Size</label>
                  <p className="text-sm text-gray-900">{formatFileSize(selectedMedia.size)}</p>
                </div>

                {selectedMedia.width && selectedMedia.height && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Dimensions</label>
                    <p className="text-sm text-gray-900">{selectedMedia.width} × {selectedMedia.height}</p>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-gray-700">Type</label>
                  <p className="text-sm text-gray-900">{selectedMedia.mimeType}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={selectedMedia.storagePath}
                      readOnly
                      className="flex-1 text-sm px-2 py-1 border border-gray-300 rounded bg-gray-50"
                    />
                    <button
                      onClick={() => navigator.clipboard.writeText(selectedMedia.storagePath)}
                      className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <a
                    href={selectedMedia.storagePath}
                    download
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                  <button
                    onClick={() => handleDelete(selectedMedia.id)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {total > 24 && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {page} of {Math.ceil(total / 24)}
          </span>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={page >= Math.ceil(total / 24)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
