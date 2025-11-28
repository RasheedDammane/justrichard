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
  { id: 'ac-repair', name: 'AC Repair', description: 'Fix cooling issues, strange noises, leaks', price: 200, duration: '1-2 hours' },
  { id: 'ac-install', name: 'AC Installation', description: 'Install new AC units professionally', price: 400, duration: '3-4 hours' },
  { id: 'ac-cleaning', name: 'AC Cleaning & Deep Cleaning', description: 'Deep clean filters, coils, and ducts', price: 150, duration: '1-2 hours' },
  { id: 'ac-gas-refill', name: 'AC Gas Refill', description: 'Refill refrigerant gas for optimal cooling', price: 180, duration: '1 hour' },
  { id: 'ac-maintenance', name: 'AC Maintenance Service', description: 'Regular maintenance and inspection', price: 120, duration: '1 hour' },
  { id: 'ac-compressor', name: 'AC Compressor Repair', description: 'Fix or replace AC compressor', price: 350, duration: '2-3 hours' },
  { id: 'ac-filter', name: 'AC Filter Replacement', description: 'Replace air filters for better air quality', price: 80, duration: '30 min' },
  { id: 'hvac-troubleshoot', name: 'HVAC Troubleshooting', description: 'Diagnose and fix HVAC system issues', price: 150, duration: '1-2 hours' },
];

export default function ACRepairPage() {
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
    sessionStorage.setItem('handymanCategory', 'ac-repair');
    router.push('/en/handyman/booking');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <button onClick={() => router.push('/en/handyman')} className="text-white/80 hover:text-white mb-4">← Back</button>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">❄️ AC Repair & Maintenance</h1>
          <p className="text-xl text-cyan-100">Professional AC services for Dubai's hot climate</p>
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
                  <div key={service.id} className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 border-2 ${isSelected ? 'border-cyan-500 bg-cyan-50' : 'border-gray-100'}`}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 mb-1">{service.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>⏱️ {service.duration}</span>
                          <span>💰 Starting from AED {service.price}</span>
                        </div>
                      </div>
                      <button onClick={() => isSelected ? removeService(service.id) : addService(service)} className={`ml-4 px-6 py-3 rounded-lg font-semibold transition-colors ${isSelected ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-cyan-500 hover:bg-cyan-600 text-white'}`}>
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
                  <div className="text-5xl mb-3">❄️</div>
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
                          <span className="font-bold text-cyan-600">AED {service.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total:</span>
                      <span className="text-cyan-600">AED {getTotalPrice()}</span>
                    </div>
                  </div>
                  <button onClick={proceedToBooking} className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-4 rounded-lg font-bold hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg">
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
