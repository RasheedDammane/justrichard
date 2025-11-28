'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
}

const services: Service[] = [
  {
    "id": "garden-maintenance",
    "name": "Garden Maintenance",
    "description": "Regular garden care and upkeep",
    "price": 150,
    "duration": "2-3 hours"
  },
  {
    "id": "lawn-mowing",
    "name": "Lawn Mowing",
    "description": "Cut and maintain lawn",
    "price": 100,
    "duration": "1-2 hours"
  },
  {
    "id": "tree-trimming",
    "name": "Tree Trimming",
    "description": "Trim and prune trees",
    "price": 200,
    "duration": "2-4 hours"
  },
  {
    "id": "fence-repair",
    "name": "Fence Repair",
    "description": "Fix damaged fences",
    "price": 180,
    "duration": "2-3 hours"
  },
  {
    "id": "gate-repair",
    "name": "Gate Repair",
    "description": "Repair gates and hinges",
    "price": 150,
    "duration": "1-2 hours"
  },
  {
    "id": "outdoor-lighting",
    "name": "Outdoor Lighting Installation",
    "description": "Install garden and patio lights",
    "price": 160,
    "duration": "1-2 hours"
  },
  {
    "id": "patio-cleaning",
    "name": "Patio & Deck Cleaning",
    "description": "Pressure wash outdoor areas",
    "price": 140,
    "duration": "2-3 hours"
  }
];

export default function OutdoorGardenPage() {
  const router = useRouter();
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

  const addService = (service: Service) => {
    if (!selectedServices.find(s => s.id === service.id)) {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const removeService = (serviceId: string) => {
    setSelectedServices(selectedServices.filter(s => s.id !== serviceId));
  };

  const getTotalPrice = () => {
    return selectedServices.reduce((total, service) => total + service.price, 0);
  };

  const proceedToBooking = () => {
    if (selectedServices.length === 0) {
      alert('Please select at least one service');
      return;
    }
    sessionStorage.setItem('handymanServices', JSON.stringify(selectedServices));
    sessionStorage.setItem('handymanCategory', 'outdoor-garden');
    router.push('/en/handyman/booking');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-gradient-to-r from-lime-500 to-green-600 text-white py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <button onClick={() => router.push('/en/handyman')} className="text-white/80 hover:text-white mb-4">← Back</button>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">🏡 Outdoor & Garden Services</h1>
          <p className="text-xl opacity-90">Professional outdoor & garden services in Dubai</p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Select Services</h2>
            <div className="space-y-4">
              {services.map(service => {
                const isSelected = selectedServices.find(s => s.id === service.id);
                return (
                  <div key={service.id} className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 border-2 ${isSelected ? 'border-orange-500 bg-orange-50' : 'border-gray-100'}`}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 mb-1">{service.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>⏱️ {service.duration}</span>
                          <span>💰 Starting from AED {service.price}</span>
                        </div>
                      </div>
                      <button onClick={() => isSelected ? removeService(service.id) : addService(service)} className={`ml-4 px-6 py-3 rounded-lg font-semibold transition-colors ${isSelected ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-orange-600 hover:bg-orange-700 text-white'}`}>
                        {isSelected ? 'Remove' : 'Add'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Booking Summary</h3>
              {selectedServices.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <div className="text-5xl mb-3">🏡</div>
                  <p>No services selected</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    {selectedServices.map(service => (
                      <div key={service.id} className="border-b border-gray-100 pb-3">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-semibold text-sm">{service.name}</span>
                          <button onClick={() => removeService(service.id)} className="text-red-500 hover:text-red-700">✕</button>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">{service.duration}</span>
                          <span className="font-bold text-orange-600">AED {service.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total:</span>
                      <span className="text-orange-600">AED {getTotalPrice()}</span>
                    </div>
                  </div>
                  <button onClick={proceedToBooking} className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 rounded-lg font-bold hover:from-orange-700 hover:to-red-700 transition-all shadow-lg">
                    Book Now →
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
