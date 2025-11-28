'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export default function ImageUpload({ images, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true);
    
    try {
      const uploadPromises = acceptedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) throw new Error('Upload failed');
        
        const data = await response.json();
        return data.url;
      });
      
      const uploadedUrls = await Promise.all(uploadPromises);
      onChange([...images, ...uploadedUrls]);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload images. Please try again.');
    } finally {
      setUploading(false);
    }
  }, [images, onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: true
  });

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  const addImageUrl = () => {
    if (urlInput.trim()) {
      onChange([...images, urlInput.trim()]);
      setUrlInput('');
      setShowUrlInput(false);
    }
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    const newImages = [...images];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex >= 0 && newIndex < images.length) {
      [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];
      onChange(newImages);
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        {uploading ? (
          <p className="text-gray-600">Uploading...</p>
        ) : isDragActive ? (
          <p className="text-blue-600 font-medium">Drop images here...</p>
        ) : (
          <div>
            <p className="text-gray-600 font-medium mb-2">
              Drag & drop images here, or click to select
            </p>
            <p className="text-sm text-gray-500">
              Supports: JPG, PNG, GIF, WebP
            </p>
          </div>
        )}
      </div>

      {/* Add URL Button */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
        >
          <LinkIcon className="w-4 h-4" />
          Add Image URL
        </button>
      </div>

      {/* URL Input */}
      {showUrlInput && (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && addImageUrl()}
          />
          <button
            type="button"
            onClick={addImageUrl}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => {
              setShowUrlInput(false);
              setUrlInput('');
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Image Gallery */}
      {images.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Uploaded Images ({images.length})
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((url, index) => (
              <div
                key={index}
                className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200"
              >
                <img
                  src={url}
                  alt={`Property image ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999"%3ENo Image%3C/text%3E%3C/svg%3E';
                  }}
                />
                
                {/* Overlay with controls */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => moveImage(index, 'up')}
                    disabled={index === 0}
                    className="opacity-0 group-hover:opacity-100 p-2 bg-white rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                    title="Move up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="opacity-0 group-hover:opacity-100 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-opacity"
                    title="Remove"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveImage(index, 'down')}
                    disabled={index === images.length - 1}
                    className="opacity-0 group-hover:opacity-100 p-2 bg-white rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                    title="Move down"
                  >
                    ↓
                  </button>
                </div>
                
                {/* Image number badge */}
                <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  {index + 1}
                </div>
                
                {/* Main image badge */}
                {index === 0 && (
                  <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded font-medium">
                    Main
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            💡 Tip: The first image will be used as the main property image. Drag to reorder.
          </p>
        </div>
      )}
    </div>
  );
}
