'use client';
import { Image, Video, Upload, Star, Trash2, Link as LinkIcon } from 'lucide-react';
import { useState } from 'react';

export default function MediaSection({ formData, setFormData, propertyId }: any) {
  const [uploading, setUploading] = useState(false);

  const handleChange = (e: any) => {
    setFormData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const formData = new FormData();
      Array.from(files).forEach(file => {
        formData.append('files', file);
      });

      const response = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok && data.media) {
        setFormData((prev: any) => ({
          ...prev,
          mediaIds: [...prev.mediaIds, ...data.media.map((m: any) => m.id)]
        }));
        alert(`${data.media.length} image(s) uploaded successfully!`);
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const removeMedia = (mediaId: string) => {
    setFormData((prev: any) => ({
      ...prev,
      mediaIds: prev.mediaIds.filter((id: string) => id !== mediaId)
    }));
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Image className="w-5 h-5" />
        Media Gallery
      </h2>
      
      <div className="space-y-6">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Images *
          </label>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleMediaUpload}
              className="hidden"
              id="media-upload"
              disabled={uploading}
            />
            <label htmlFor="media-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600 mb-2">
                <span className="text-blue-600 font-medium">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF up to 10MB each (Max 50 images)
              </p>
            </label>
          </div>

          {uploading && (
            <div className="mt-4 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-sm text-gray-600 mt-2">Uploading...</p>
            </div>
          )}

          {formData.mediaIds && formData.mediaIds.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">
                {formData.mediaIds.length} image(s) selected
              </p>
              <div className="grid grid-cols-4 gap-4">
                {formData.mediaIds.map((mediaId: string, index: number) => (
                  <div key={mediaId} className="relative group">
                    <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center border-2 border-gray-300">
                      <Image className="w-8 h-8 text-gray-400" />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeMedia(mediaId)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {index === 0 && (
                      <div className="absolute top-2 left-2 p-1 bg-yellow-500 text-white rounded-full">
                        <Star className="w-4 h-4 fill-current" />
                      </div>
                    )}
                    <p className="text-xs text-center text-gray-500 mt-1">Image {index + 1}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Video URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <Video className="w-4 h-4" />
            Video URL (YouTube, Vimeo)
          </label>
          <input
            type="url"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Virtual Tour */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <LinkIcon className="w-4 h-4" />
            Virtual Tour URL (360° / Matterport)
          </label>
          <input
            type="url"
            name="virtualTourUrl"
            value={formData.virtualTourUrl}
            onChange={handleChange}
            placeholder="https://my.matterport.com/show/?m=..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            💡 <strong>Tip:</strong> First image will be used as cover. You can reorder images after upload.
          </p>
        </div>
      </div>
    </div>
  );
}
