'use client';

import { useState } from 'react';
import { Plus, X, Check } from 'lucide-react';

interface ColorSelectorProps {
  colors: string[];
  selectedColor: string;
  onColorChange: (color: string) => void;
  label?: string;
}

const COLOR_MAP: Record<string, string> = {
  'Black': '#000000',
  'White': '#FFFFFF',
  'Silver': '#C0C0C0',
  'Gray': '#808080',
  'Red': '#FF0000',
  'Blue': '#0000FF',
  'Green': '#008000',
  'Yellow': '#FFFF00',
  'Orange': '#FFA500',
  'Brown': '#8B4513',
  'Gold': '#FFD700',
  'Bronze': '#CD7F32',
  'Beige': '#F5F5DC',
  'Purple': '#800080',
  'Pink': '#FFC0CB',
  'Matte Black': '#1a1a1a',
  'Matte White': '#f0f0f0',
  'Matte Gray': '#6b6b6b',
  'Matte Blue': '#1e3a8a',
  'Matte Red': '#7f1d1d'
};

export default function ColorSelector({
  colors,
  selectedColor,
  onColorChange,
  label = 'Color'
}: ColorSelectorProps) {
  const [showCustom, setShowCustom] = useState(false);
  const [customColor, setCustomColor] = useState('');
  const [allColors, setAllColors] = useState<string[]>(colors);

  const handleAddCustomColor = () => {
    if (customColor.trim() && !allColors.includes(customColor.trim())) {
      const newColor = customColor.trim();
      setAllColors([...allColors, newColor]);
      onColorChange(newColor);
      setCustomColor('');
      setShowCustom(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} <span className="text-red-500">*</span>
      </label>

      {/* Color Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 mb-3">
        {allColors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onColorChange(color)}
            className={`relative h-12 rounded-lg border-2 transition-all ${
              selectedColor === color
                ? 'border-blue-600 ring-2 ring-blue-200'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            style={{
              backgroundColor: COLOR_MAP[color] || '#cccccc',
              boxShadow: selectedColor === color ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : 'none'
            }}
            title={color}
          >
            {selectedColor === color && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Check
                  className="w-6 h-6"
                  style={{
                    color: ['White', 'Matte White', 'Beige', 'Yellow', 'Silver'].includes(color)
                      ? '#000000'
                      : '#FFFFFF'
                  }}
                />
              </div>
            )}
          </button>
        ))}

        {/* Add Custom Color Button */}
        <button
          type="button"
          onClick={() => setShowCustom(!showCustom)}
          className="h-12 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 flex items-center justify-center transition-colors"
          title="Add custom color"
        >
          <Plus className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Selected Color Display */}
      {selectedColor && (
        <div className="flex items-center gap-2 mb-3 p-2 bg-gray-50 rounded-lg">
          <div
            className="w-6 h-6 rounded border border-gray-300"
            style={{ backgroundColor: COLOR_MAP[selectedColor] || '#cccccc' }}
          />
          <span className="text-sm font-medium text-gray-700">{selectedColor}</span>
        </div>
      )}

      {/* Custom Color Input */}
      {showCustom && (
        <div className="flex gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <input
            type="text"
            value={customColor}
            onChange={(e) => setCustomColor(e.target.value)}
            placeholder="Enter custom color name"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomColor())}
          />
          <button
            type="button"
            onClick={handleAddCustomColor}
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
    </div>
  );
}
