'use client';

import { Ruler } from 'lucide-react';

export default function DetailsSection({ formData, setFormData }: any) {
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value === '' ? null : value,
    }));
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Ruler className="w-5 h-5" />
        Property Details
      </h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bedrooms
            </label>
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms || ''}
              onChange={handleChange}
              min="0"
              placeholder="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bathrooms
            </label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms || ''}
              onChange={handleChange}
              min="0"
              step="0.5"
              placeholder="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parking
            </label>
            <input
              type="number"
              name="parkingSpaces"
              value={formData.parkingSpaces || ''}
              onChange={handleChange}
              min="0"
              placeholder="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Garages
            </label>
            <input
              type="number"
              name="garages"
              value={formData.garages || ''}
              onChange={handleChange}
              min="0"
              placeholder="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Area Size
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                name="areaSize"
                value={formData.areaSize || ''}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="1200"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select
                name="areaUnit"
                value={formData.areaUnit}
                onChange={handleChange}
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="sqft">sq ft</option>
                <option value="sqm">sq m</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Land Area
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                name="landArea"
                value={formData.landArea || ''}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="5000"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select
                name="landAreaUnit"
                value={formData.landAreaUnit}
                onChange={handleChange}
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="sqft">sq ft</option>
                <option value="sqm">sq m</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Garage Size
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                name="garageSize"
                value={formData.garageSize || ''}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="300"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select
                name="garageSizeUnit"
                value={formData.garageSizeUnit}
                onChange={handleChange}
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="sqft">sq ft</option>
                <option value="sqm">sq m</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year Built
            </label>
            <input
              type="number"
              name="yearBuilt"
              value={formData.yearBuilt || ''}
              onChange={handleChange}
              min="1800"
              max={new Date().getFullYear() + 5}
              placeholder="2020"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Code / ID
          </label>
          <input
            type="text"
            name="propertyCode"
            value={formData.propertyCode}
            onChange={handleChange}
            placeholder="HZ-001"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">
            Internal reference code for your agency
          </p>
        </div>
      </div>
    </div>
  );
}
