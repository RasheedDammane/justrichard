'use client';

import { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';

interface BrandModelSelectorProps {
  brands: { name: string; models: string[] }[];
  selectedBrand: string;
  selectedModel: string;
  onBrandChange: (brand: string) => void;
  onModelChange: (model: string) => void;
  brandLabel?: string;
  modelLabel?: string;
}

export default function BrandModelSelector({
  brands,
  selectedBrand,
  selectedModel,
  onBrandChange,
  onModelChange,
  brandLabel = 'Brand',
  modelLabel = 'Model'
}: BrandModelSelectorProps) {
  const [showCustomBrand, setShowCustomBrand] = useState(false);
  const [showCustomModel, setShowCustomModel] = useState(false);
  const [customBrand, setCustomBrand] = useState('');
  const [customModel, setCustomModel] = useState('');
  const [availableModels, setAvailableModels] = useState<string[]>([]);

  // Mettre à jour les modèles disponibles quand la marque change
  useEffect(() => {
    if (selectedBrand) {
      const brand = brands.find(b => b.name === selectedBrand);
      if (brand) {
        setAvailableModels(brand.models);
        setShowCustomBrand(false);
      } else {
        // Marque personnalisée
        setAvailableModels([]);
        setShowCustomModel(true);
      }
    } else {
      setAvailableModels([]);
    }
  }, [selectedBrand, brands]);

  const handleBrandSelect = (brand: string) => {
    if (brand === 'custom') {
      setShowCustomBrand(true);
      onBrandChange('');
      onModelChange('');
    } else {
      setShowCustomBrand(false);
      onBrandChange(brand);
      onModelChange(''); // Reset model when brand changes
    }
  };

  const handleCustomBrandAdd = () => {
    if (customBrand.trim()) {
      onBrandChange(customBrand.trim());
      setCustomBrand('');
      setShowCustomBrand(false);
      setShowCustomModel(true);
    }
  };

  const handleModelSelect = (model: string) => {
    if (model === 'custom') {
      setShowCustomModel(true);
      onModelChange('');
    } else {
      setShowCustomModel(false);
      onModelChange(model);
    }
  };

  const handleCustomModelAdd = () => {
    if (customModel.trim()) {
      onModelChange(customModel.trim());
      setCustomModel('');
      setShowCustomModel(false);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Brand Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {brandLabel} <span className="text-red-500">*</span>
        </label>
        
        {!showCustomBrand ? (
          <select
            value={selectedBrand}
            onChange={(e) => handleBrandSelect(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select {brandLabel}</option>
            {brands.map((brand) => (
              <option key={brand.name} value={brand.name}>
                {brand.name}
              </option>
            ))}
            <option value="custom">➕ Add Custom {brandLabel}</option>
          </select>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={customBrand}
              onChange={(e) => setCustomBrand(e.target.value)}
              placeholder={`Enter custom ${brandLabel.toLowerCase()}`}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleCustomBrandAdd())}
            />
            <button
              type="button"
              onClick={handleCustomBrandAdd}
              className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Plus className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setShowCustomBrand(false)}
              className="px-3 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Model Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {modelLabel} <span className="text-red-500">*</span>
        </label>
        
        {!showCustomModel ? (
          <select
            value={selectedModel}
            onChange={(e) => handleModelSelect(e.target.value)}
            required
            disabled={!selectedBrand}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">Select {modelLabel}</option>
            {availableModels.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
            {selectedBrand && <option value="custom">➕ Add Custom {modelLabel}</option>}
          </select>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={customModel}
              onChange={(e) => setCustomModel(e.target.value)}
              placeholder={`Enter custom ${modelLabel.toLowerCase()}`}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleCustomModelAdd())}
            />
            <button
              type="button"
              onClick={handleCustomModelAdd}
              className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Plus className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setShowCustomModel(false)}
              className="px-3 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
