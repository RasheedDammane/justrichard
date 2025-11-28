'use client';

import { MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function LocationSection({ formData, setFormData, countries, cities, states, areas }: any) {
  const [filteredCities, setFilteredCities] = useState<any[]>([]);
  const [filteredStates, setFilteredStates] = useState<any[]>([]);
  const [filteredAreas, setFilteredAreas] = useState<any[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingAreas, setLoadingAreas] = useState(false);

  // Fetch cities and states when country changes
  useEffect(() => {
    if (formData.countryId) {
      fetchCitiesAndStates(formData.countryId);
    } else {
      setFilteredCities([]);
      setFilteredStates([]);
    }
  }, [formData.countryId]);

  // Fetch areas when city changes
  useEffect(() => {
    if (formData.cityId) {
      fetchAreas(formData.cityId);
    } else {
      setFilteredAreas([]);
    }
  }, [formData.cityId]);

  const fetchCitiesAndStates = async (countryId: string) => {
    setLoadingCities(true);
    setLoadingStates(true);
    
    try {
      const [citiesRes, statesRes] = await Promise.all([
        fetch(`/api/geography/cities?countryId=${countryId}`),
        fetch(`/api/states?countryId=${countryId}`)
      ]);

      const [citiesData, statesData] = await Promise.all([
        citiesRes.json(),
        statesRes.json()
      ]);

      setFilteredCities(citiesData.cities || []);
      setFilteredStates(statesData.states || []);
    } catch (error) {
      console.error('Error fetching cities/states:', error);
    } finally {
      setLoadingCities(false);
      setLoadingStates(false);
    }
  };

  const fetchAreas = async (cityId: string) => {
    setLoadingAreas(true);
    
    try {
      const response = await fetch(`/api/areas?cityId=${cityId}`);
      const data = await response.json();
      setFilteredAreas(data.areas || []);
    } catch (error) {
      console.error('Error fetching areas:', error);
    } finally {
      setLoadingAreas(false);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    
    // Reset dependent fields when parent changes
    if (name === 'countryId') {
      setFormData((prev: any) => ({
        ...prev,
        countryId: value,
        stateId: '',
        cityId: '',
        areaId: '',
      }));
    } else if (name === 'cityId') {
      setFormData((prev: any) => ({
        ...prev,
        cityId: value,
        areaId: '',
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5" />
        Location
      </h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country *
            </label>
            <select
              name="countryId"
              value={formData.countryId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Country</option>
              {countries.map((c: any) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State/Province
            </label>
            <select
              name="stateId"
              value={formData.stateId}
              onChange={handleChange}
              disabled={!formData.countryId || loadingStates}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">
                {!formData.countryId ? 'Select country first' : loadingStates ? 'Loading...' : 'Select State'}
              </option>
              {filteredStates.map((s: any) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            {filteredStates.length === 0 && formData.countryId && !loadingStates && (
              <p className="text-xs text-gray-500 mt-1">No states available for this country</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City *
            </label>
            <select
              name="cityId"
              value={formData.cityId}
              onChange={handleChange}
              required
              disabled={!formData.countryId || loadingCities}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">
                {!formData.countryId ? 'Select country first' : loadingCities ? 'Loading cities...' : 'Select City'}
              </option>
              {filteredCities.map((c: any) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            {filteredCities.length > 0 && (
              <p className="text-xs text-gray-500 mt-1">{filteredCities.length} cities available</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Area/Neighborhood
            </label>
            <select
              name="areaId"
              value={formData.areaId}
              onChange={handleChange}
              disabled={!formData.cityId || loadingAreas}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">
                {!formData.cityId ? 'Select city first' : loadingAreas ? 'Loading...' : 'Select Area'}
              </option>
              {filteredAreas.map((a: any) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
            {filteredAreas.length === 0 && formData.cityId && !loadingAreas && (
              <p className="text-xs text-gray-500 mt-1">No areas available for this city</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address Line 1
          </label>
          <input
            type="text"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
            placeholder="123 Main Street"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address Line 2
          </label>
          <input
            type="text"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleChange}
            placeholder="Apt 4B, Building C"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Zip Code
            </label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              placeholder="10001"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Latitude
            </label>
            <input
              type="number"
              name="latitude"
              value={formData.latitude || ''}
              onChange={handleChange}
              step="any"
              placeholder="40.7128"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Longitude
            </label>
            <input
              type="number"
              name="longitude"
              value={formData.longitude || ''}
              onChange={handleChange}
              step="any"
              placeholder="-74.0060"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">
            💡 <strong>Tip:</strong> Enter the address above and use a map service to get precise coordinates
          </p>
        </div>
      </div>
    </div>
  );
}
