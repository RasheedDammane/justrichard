'use client';

import { useState } from 'react';
import { Video, Youtube, ExternalLink, X } from 'lucide-react';

interface VideoInputProps {
  video: string | null;
  onChange: (video: string | null) => void;
}

export default function VideoInput({ video, onChange }: VideoInputProps) {
  const [showInput, setShowInput] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  const addVideo = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput('');
      setShowInput(false);
    }
  };

  const removeVideo = () => {
    onChange(null);
  };

  const getVideoType = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
    if (url.includes('vimeo.com')) return 'vimeo';
    if (url.includes('dailymotion.com')) return 'dailymotion';
    return 'other';
  };

  const getVideoThumbnail = (url: string) => {
    const type = getVideoType(url);
    
    if (type === 'youtube') {
      const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
      if (videoId) return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    
    return null;
  };

  return (
    <div className="space-y-4">
      {!video ? (
        <>
          {!showInput ? (
            <button
              type="button"
              onClick={() => setShowInput(true)}
              className="inline-flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 text-gray-600 hover:text-gray-700 transition-colors"
            >
              <Video className="w-5 h-5" />
              Add Video URL
            </button>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video URL
                </label>
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && addVideo()}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Supports: YouTube, Vimeo, Dailymotion, or direct video links
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={addVideo}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Add Video
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowInput(false);
                    setUrlInput('');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="flex items-start gap-4">
            {/* Video Thumbnail/Icon */}
            <div className="flex-shrink-0">
              {getVideoThumbnail(video) ? (
                <img
                  src={getVideoThumbnail(video) || ''}
                  alt="Video thumbnail"
                  className="w-32 h-20 object-cover rounded"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-32 h-20 bg-gray-200 rounded flex items-center justify-center">
                  {getVideoType(video) === 'youtube' && <Youtube className="w-8 h-8 text-red-600" />}
                  {getVideoType(video) === 'vimeo' && <Video className="w-8 h-8 text-blue-600" />}
                  {getVideoType(video) === 'other' && <Video className="w-8 h-8 text-gray-600" />}
                </div>
              )}
            </div>

            {/* Video Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {getVideoType(video) === 'youtube' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded">
                        <Youtube className="w-3 h-3" />
                        YouTube
                      </span>
                    )}
                    {getVideoType(video) === 'vimeo' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                        <Video className="w-3 h-3" />
                        Vimeo
                      </span>
                    )}
                    {getVideoType(video) === 'other' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                        <Video className="w-3 h-3" />
                        Video
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 truncate" title={video}>
                    {video}
                  </p>
                  <a
                    href={video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 mt-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Open in new tab
                  </a>
                </div>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={removeVideo}
                  className="flex-shrink-0 p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                  title="Remove video"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
