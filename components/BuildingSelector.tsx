'use client';

import { useState, useEffect } from 'react';
import { Building2 } from 'lucide-react';

interface Building {
  id: string;
  name: string;
  nameAr?: string;
  nameTh?: string;
  developer?: string;
  totalFloors?: number;
  totalUnits?: number;
}

interface BuildingSelectorProps {
  cityId?: string;
  onBuildingChange: (buildingId: string) => void;
  selectedBuildingId?: string;
  locale?: string;
  className?: string;
}

export default function BuildingSelector({
  cityId,
  onBuildingChange,
  selectedBuildingId,
  locale = 'en',
  className = '',
}: BuildingSelectorProps) {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cityId) {
      fetchBuildings();
    } else {
      setBuildings([]);
    }
  }, [cityId]);

  const fetchBuildings = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/buildings?cityId=${cityId}&activeOnly=true`);
      const data = await response.json();
      if (response.ok) {
        setBuildings(data.buildings || []);
      }
    } catch (error) {
      console.error('Error fetching buildings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLocalizedName = (building: Building) => {
    if (locale === 'ar' && building.nameAr) return building.nameAr;
    if (locale === 'th' && building.nameTh) return building.nameTh;
    return building.name;
  };

  if (!cityId || buildings.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Building / Condominium (Optional)
      </label>
      <div className="flex items-center gap-2">
        <Building2 className="w-5 h-5 text-gray-600" />
        <select
          value={selectedBuildingId || ''}
          onChange={(e) => onBuildingChange(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          disabled={loading}
        >
          <option value="">Select a building...</option>
          {buildings.map((building) => (
            <option key={building.id} value={building.id}>
              {getLocalizedName(building)}
              {building.developer && ` - ${building.developer}`}
              {building.totalUnits && ` (${building.totalUnits} units)`}
            </option>
          ))}
        </select>
      </div>
      {loading && (
        <p className="text-xs text-gray-500 mt-1">Loading buildings...</p>
      )}
    </div>
  );
}
