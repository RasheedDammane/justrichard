'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function TransferFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [transferType, setTransferType] = useState(searchParams.get('type') || '');
  const [vehicleType, setVehicleType] = useState(searchParams.get('vehicle') || '');
  const [minPassengers, setMinPassengers] = useState(searchParams.get('minPassengers') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

  useEffect(() => {
    const params = new URLSearchParams();
    if (transferType) params.set('type', transferType);
    if (vehicleType) params.set('vehicle', vehicleType);
    if (minPassengers) params.set('minPassengers', minPassengers);
    if (maxPrice) params.set('maxPrice', maxPrice);

    const query = params.toString();
    router.push(query ? `?${query}` : window.location.pathname);
  }, [transferType, vehicleType, minPassengers, maxPrice, router]);

  const resetFilters = () => {
    setTransferType('');
    setVehicleType('');
    setMinPassengers('');
    setMaxPrice('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          onClick={resetFilters}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          Reset all
        </button>
      </div>

      {/* Transfer Type */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Transfer Type
        </label>
        <select
          value={transferType}
          onChange={(e) => setTransferType(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Types</option>
          <option value="AIRPORT">Airport Transfer</option>
          <option value="CITY">City Transfer</option>
          <option value="VIP">VIP Transfer</option>
          <option value="GROUP">Group Transfer</option>
          <option value="HOTEL">Hotel Transfer</option>
          <option value="PRIVATE_DRIVER">Private Driver</option>
        </select>
      </div>

      {/* Vehicle Type */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Vehicle Type
        </label>
        <select
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Vehicles</option>
          <option value="SEDAN">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="VAN">Van</option>
          <option value="LUXURY">Luxury</option>
          <option value="MINIBUS">Minibus</option>
          <option value="BUS">Bus</option>
        </select>
      </div>

      {/* Min Passengers */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Minimum Passengers
        </label>
        <select
          value={minPassengers}
          onChange={(e) => setMinPassengers(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Any</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="6">6+</option>
          <option value="8">8+</option>
          <option value="12">12+</option>
          <option value="15">15+</option>
        </select>
      </div>

      {/* Max Price */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Max Price (THB)
        </label>
        <select
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Any</option>
          <option value="500">Up to 500 THB</option>
          <option value="1000">Up to 1,000 THB</option>
          <option value="1500">Up to 1,500 THB</option>
          <option value="2000">Up to 2,000 THB</option>
          <option value="3000">Up to 3,000 THB</option>
        </select>
      </div>

      {/* Active Filters Count */}
      {(transferType || vehicleType || minPassengers || maxPrice) && (
        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            {[transferType, vehicleType, minPassengers, maxPrice].filter(Boolean).length} filter(s) active
          </p>
        </div>
      )}
    </div>
  );
}
