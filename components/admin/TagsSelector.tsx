'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface TagsSelectorProps {
  availableTags: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  label?: string;
}

export default function TagsSelector({
  availableTags,
  selectedTags,
  onTagsChange,
  label = 'Tags'
}: TagsSelectorProps) {
  const [showCustom, setShowCustom] = useState(false);
  const [customTag, setCustomTag] = useState('');
  const [allTags, setAllTags] = useState<string[]>(availableTags);

  const handleToggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const handleAddCustomTag = () => {
    if (customTag.trim() && !allTags.includes(customTag.trim())) {
      const newTag = customTag.trim();
      setAllTags([...allTags, newTag]);
      onTagsChange([...selectedTags, newTag]);
      setCustomTag('');
      setShowCustom(false);
    }
  };

  const handleRemoveTag = (tag: string) => {
    onTagsChange(selectedTags.filter(t => t !== tag));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded-full"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="hover:bg-blue-700 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Available Tags */}
      <div className="space-y-2 mb-3">
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleToggleTag(tag)}
              className={`px-3 py-1.5 text-sm rounded-lg border-2 transition-all ${
                selectedTags.includes(tag)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500 hover:bg-blue-50'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Add Custom Tag */}
      {!showCustom ? (
        <button
          type="button"
          onClick={() => setShowCustom(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 border-2 border-dashed border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Custom Tag
        </button>
      ) : (
        <div className="flex gap-2 p-3 bg-gray-50 rounded-lg border border-gray-300">
          <input
            type="text"
            value={customTag}
            onChange={(e) => setCustomTag(e.target.value)}
            placeholder="Enter custom tag"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomTag())}
          />
          <button
            type="button"
            onClick={handleAddCustomTag}
            className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setShowCustom(false)}
            className="px-3 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Help Text */}
      <p className="mt-2 text-xs text-gray-500">
        Select existing tags or add custom ones to categorize your listing
      </p>
    </div>
  );
}
